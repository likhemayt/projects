import { FormEvent, useMemo, useState } from "react";
import { useInView } from "../hooks/useInView";

type FormState = {
  checkIn: string;
  checkOut: string;
  guests: string;
  email: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

function todayISO() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}

function parseDate(s: string) {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function validate(values: FormState): FieldErrors {
  const errors: FieldErrors = {};
  const today = parseDate(todayISO());

  if (!values.checkIn) errors.checkIn = "Choose an arrival date.";
  if (!values.checkOut) errors.checkOut = "Choose a departure date.";
  if (!values.email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = "Enter a valid email address.";

  const guestsNum = Number(values.guests);
  if (!values.guests || Number.isNaN(guestsNum) || guestsNum < 1)
    errors.guests = "Select at least one guest.";
  else if (guestsNum > 8) errors.guests = "For larger parties, contact us directly.";

  if (values.checkIn) {
    const ci = parseDate(values.checkIn);
    if (ci < today) errors.checkIn = "Arrival cannot be in the past.";
  }

  if (values.checkIn && values.checkOut) {
    const ci = parseDate(values.checkIn);
    const co = parseDate(values.checkOut);
    if (co <= ci) errors.checkOut = "Departure must be after arrival.";
  }

  return errors;
}

export function BookingBar() {
  const { ref, isInView } = useInView();
  const minDate = todayISO();

  const [values, setValues] = useState<FormState>({
    checkIn: "",
    checkOut: "",
    guests: "2",
    email: "",
  });
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  const errors = useMemo(() => validate(values), [values]);
  const showErrors = (field: keyof FormState) =>
    (touched[field] || submitted) && errors[field];

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    const next = validate(values);
    if (Object.keys(next).length > 0) return;
    setSuccess(true);
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
                className="rounded-lg border border-ocean/20 bg-white px-4 py-3 font-sans text-ocean outline-none ring-ocean/30 transition focus:ring-2"
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
                className="rounded-lg border border-ocean/20 bg-white px-4 py-3 font-sans text-ocean outline-none ring-ocean/30 transition focus:ring-2"
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
                className="rounded-lg border border-ocean/20 bg-white px-4 py-3 font-sans text-ocean outline-none ring-ocean/30 transition focus:ring-2"
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
                className="rounded-lg border border-ocean/20 bg-white px-4 py-3 font-sans text-ocean outline-none ring-ocean/30 placeholder:text-ocean/35 transition focus:ring-2"
              />
              {showErrors("email") && (
                <span className="text-sm text-red-700">{errors.email}</span>
              )}
            </label>

            <div className="flex items-end lg:col-span-12">
              <button
                type="submit"
                className="w-full rounded-full bg-ocean px-8 py-4 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-sand transition hover:bg-ocean-deep md:w-auto"
              >
                Check availability
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
