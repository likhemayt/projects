import { FormEvent, useMemo, useState } from "react";
import { useInView } from "../hooks/useInView";
import {
  todayISO,
  validateBooking,
  type BookingFormState,
} from "../lib/bookingValidation";

export function BookingBar() {
  const { ref, isInView } = useInView();
  const minDate = todayISO();

  const [values, setValues] = useState<BookingFormState>({
    checkIn: "",
    checkOut: "",
    guests: "2",
    email: "",
  });
  const [touched, setTouched] = useState<Partial<Record<keyof BookingFormState, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [emailFollowUpNote, setEmailFollowUpNote] = useState(false);

  const errors = useMemo(() => validateBooking(values), [values]);
  const showErrors = (field: keyof BookingFormState) =>
    (touched[field] || submitted) && errors[field];

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    const next = validateBooking(values);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const r = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          checkIn: values.checkIn,
          checkOut: values.checkOut,
          guests: values.guests,
          email: values.email.trim(),
        }),
      });

      const data = (await r.json().catch(() => ({}))) as {
        error?: string;
        emailSent?: boolean;
        emailSkipped?: boolean;
        emailWarnings?: string[];
      };

      if (!r.ok) {
        setSubmitError(
          typeof data.error === "string" ? data.error : "Could not send your request."
        );
        return;
      }

      setEmailFollowUpNote(
        Boolean(data.emailSkipped || (data.emailWarnings && data.emailWarnings.length > 0))
      );
      setSuccess(true);
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="book"
      ref={ref}
      className="relative -mt-24 scroll-mt-28 px-5 md:px-8"
    >
      <div
        className={`mx-auto max-w-6xl rounded-2xl border border-white/40 bg-white/75 p-6 shadow-2xl shadow-ocean/10 backdrop-blur-xl transition-all duration-700 md:p-10 ${
          isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-ocean/70">
              Reserve
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ocean md:text-4xl">
              Plan your stay
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm text-ocean/75">
            Dates and guest count are validated before we hold your request. A
            concierge confirms within the hour.
          </p>
        </div>

        {success ? (
          <div
            className="rounded-xl border border-ocean/20 bg-sand/80 px-6 py-8 text-center"
            role="status"
          >
            <p className="font-display text-2xl font-medium text-ocean">
              Request received
            </p>
            <p className="mt-2 font-sans text-ocean/80">
              We&apos;ll email {values.email.trim()} with availability for your
              dates.
            </p>
            {emailFollowUpNote && (
              <p className="mt-4 font-sans text-sm text-ocean/65">
                If you don&apos;t see a confirmation email within a few minutes, check spam
                or reach us at the address in the footer.
              </p>
            )}
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-12 lg:gap-5"
            noValidate
          >
            <label className="flex flex-col gap-2 lg:col-span-3">
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-ocean/70">
                Arrival
              </span>
              <input
                type="date"
                min={minDate}
                value={values.checkIn}
                onChange={(e) => setValues((v) => ({ ...v, checkIn: e.target.value }))}
                onBlur={() => setTouched((t) => ({ ...t, checkIn: true }))}
                disabled={submitting}
                className="rounded-lg border border-ocean/20 bg-white px-4 py-3 font-sans text-ocean outline-none ring-ocean/30 transition focus:ring-2 disabled:opacity-60"
              />
              {showErrors("checkIn") && (
                <span className="text-sm text-red-700">{errors.checkIn}</span>
              )}
            </label>

            <label className="flex flex-col gap-2 lg:col-span-3">
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-ocean/70">
                Departure
              </span>
              <input
                type="date"
                min={values.checkIn || minDate}
                value={values.checkOut}
                onChange={(e) => setValues((v) => ({ ...v, checkOut: e.target.value }))}
                onBlur={() => setTouched((t) => ({ ...t, checkOut: true }))}
                disabled={submitting}
                className="rounded-lg border border-ocean/20 bg-white px-4 py-3 font-sans text-ocean outline-none ring-ocean/30 transition focus:ring-2 disabled:opacity-60"
              />
              {showErrors("checkOut") && (
                <span className="text-sm text-red-700">{errors.checkOut}</span>
              )}
            </label>

            <label className="flex flex-col gap-2 lg:col-span-2">
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-ocean/70">
                Guests
              </span>
              <select
                value={values.guests}
                onChange={(e) => setValues((v) => ({ ...v, guests: e.target.value }))}
                onBlur={() => setTouched((t) => ({ ...t, guests: true }))}
                disabled={submitting}
                className="rounded-lg border border-ocean/20 bg-white px-4 py-3 font-sans text-ocean outline-none ring-ocean/30 transition focus:ring-2 disabled:opacity-60"
              >
                {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={String(n)}>
                    {n} {n === 1 ? "guest" : "guests"}
                  </option>
                ))}
              </select>
              {showErrors("guests") && (
                <span className="text-sm text-red-700">{errors.guests}</span>
              )}
            </label>

            <label className="flex flex-col gap-2 lg:col-span-4">
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-ocean/70">
                Email
              </span>
              <input
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={values.email}
                onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                disabled={submitting}
                className="rounded-lg border border-ocean/20 bg-white px-4 py-3 font-sans text-ocean outline-none ring-ocean/30 placeholder:text-ocean/35 transition focus:ring-2 disabled:opacity-60"
              />
              {showErrors("email") && (
                <span className="text-sm text-red-700">{errors.email}</span>
              )}
            </label>

            <div className="flex flex-col gap-3 lg:col-span-12">
              {submitError && (
                <p className="font-sans text-sm text-red-700" role="alert">
                  {submitError}
                </p>
              )}
              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-full bg-ocean px-8 py-4 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-sand transition hover:bg-ocean-deep disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
                >
                  {submitting ? "Sending…" : "Check availability"}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
