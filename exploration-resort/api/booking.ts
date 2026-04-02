import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";
import type { BookingFormState } from "../src/lib/bookingValidation";
import { validateBooking } from "../src/lib/bookingValidation";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function json(res: VercelResponse, status: number, body: Record<string, unknown>) {
  res.status(status).json(body);
}

async function sendResend(params: {
  to: string;
  subject: string;
  html: string;
}): Promise<{ sent: boolean; skipped: boolean; error?: string }> {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return { sent: false, skipped: true };

  const from =
    process.env.RESEND_FROM_EMAIL?.trim() || "Exploration <onboarding@resend.dev>";

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [params.to],
      subject: params.subject,
      html: params.html,
    }),
  });

  if (!r.ok) {
    const text = await r.text();
    return { sent: false, skipped: false, error: `Resend ${r.status}: ${text}` };
  }
  return { sent: true, skipped: false };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    json(res, 405, { error: "Method not allowed" });
    return;
  }

  let body: unknown = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      json(res, 400, { error: "Invalid JSON" });
      return;
    }
  }

  if (!body || typeof body !== "object") {
    json(res, 400, { error: "Expected JSON body" });
    return;
  }

  const b = body as Record<string, unknown>;
  const values: BookingFormState = {
    checkIn: typeof b.checkIn === "string" ? b.checkIn : "",
    checkOut: typeof b.checkOut === "string" ? b.checkOut : "",
    guests: typeof b.guests === "string" ? b.guests : String(b.guests ?? ""),
    email: typeof b.email === "string" ? b.email : "",
  };

  const fieldErrors = validateBooking(values);
  if (Object.keys(fieldErrors).length > 0) {
    json(res, 400, { error: "Validation failed", fields: fieldErrors });
    return;
  }

  const url = process.env.SUPABASE_URL?.trim() || process.env.VITE_SUPABASE_URL?.trim();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !serviceKey) {
    json(res, 503, {
      error: "Server is missing Supabase configuration (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY).",
    });
    return;
  }

  const guestsNum = Number(values.guests);
  const admin = createClient(url, serviceKey);

  const { data: row, error: dbError } = await admin
    .schema("public")
    .from("booking_requests")
    .insert({
      check_in: values.checkIn,
      check_out: values.checkOut,
      guests: guestsNum,
      email: values.email.trim().toLowerCase(),
    })
    .select("id")
    .single();

  if (dbError) {
    console.error("booking_requests insert:", dbError);
    const e = dbError as any;
    json(res, 500, {
      error: "Could not save your request. Please try again.",
      detail: e?.message,
      code: e?.code,
      status: e?.status,
      details: e?.details,
      hint: e?.hint,
    });
    return;
  }

  if (!row?.id) {
    json(res, 500, { error: "Could not save your request. Please try again." });
    return;
  }

  const guestEmail = values.email.trim();
  const checkIn = values.checkIn;
  const checkOut = values.checkOut;

  const safeIn = escapeHtml(checkIn);
  const safeOut = escapeHtml(checkOut);
  const safeGuestEmail = escapeHtml(guestEmail);

  const guestHtml = `
    <p>Thank you for your interest in Exploration.</p>
    <p>We received your stay request:</p>
    <ul>
      <li><strong>Arrival:</strong> ${safeIn}</li>
      <li><strong>Departure:</strong> ${safeOut}</li>
      <li><strong>Guests:</strong> ${guestsNum}</li>
    </ul>
    <p>A concierge will follow up at this address with availability.</p>
  `;

  const notifyTo = process.env.NOTIFICATION_EMAIL?.trim();
  const notifyHtml = `
    <p><strong>New booking inquiry</strong> (id: ${String(row.id)})</p>
    <ul>
      <li>Email: ${safeGuestEmail}</li>
      <li>Arrival: ${safeIn}</li>
      <li>Departure: ${safeOut}</li>
      <li>Guests: ${guestsNum}</li>
    </ul>
  `;

  const emailErrors: string[] = [];

  const guestSend = await sendResend({
    to: guestEmail,
    subject: "We received your Exploration stay request",
    html: guestHtml,
  });
  if (!guestSend.skipped && !guestSend.sent && guestSend.error)
    emailErrors.push(`Guest: ${guestSend.error}`);

  let staffSend = { sent: true, skipped: true as boolean };
  if (notifyTo) {
    staffSend = await sendResend({
      to: notifyTo,
      subject: `[Exploration] Booking inquiry from ${guestEmail}`,
      html: notifyHtml,
    });
    if (!staffSend.skipped && !staffSend.sent && staffSend.error)
      emailErrors.push(`Staff: ${staffSend.error}`);
  }

  if (emailErrors.length > 0) {
    console.warn("Email partial failure:", emailErrors.join("; "));
  }

  json(res, 200, {
    ok: true,
    id: row.id,
    emailSent: guestSend.sent && (!notifyTo || staffSend.sent),
    emailStaffSent: notifyTo ? staffSend.sent : null,
    emailSkipped: guestSend.skipped,
    emailWarnings: emailErrors.length > 0 ? emailErrors : undefined,
  });
}
