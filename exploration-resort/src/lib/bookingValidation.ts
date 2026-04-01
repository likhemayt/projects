export type BookingFormState = {
  checkIn: string;
  checkOut: string;
  guests: string;
  email: string;
};

export type BookingFieldErrors = Partial<Record<keyof BookingFormState, string>>;

/** Local calendar date as YYYY-MM-DD (matches `<input type="date">` values). */
export function todayISO(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function parseDate(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function validateBooking(values: BookingFormState): BookingFieldErrors {
  const errors: BookingFieldErrors = {};
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
