/**
 * 1) Verifies Supabase URL + anon key (Auth API).
 * 2) If SUPABASE_SERVICE_ROLE_KEY is set, verifies `booking_requests` read/write (insert + delete test row).
 *
 *   npm run test:supabase
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { resolve } from "node:path";

config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });

const url = process.env.VITE_SUPABASE_URL?.trim();
const anon = process.env.VITE_SUPABASE_ANON_KEY?.trim();

if (!url || !anon) {
  console.error(
    "Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY.\n" +
      "Create .env.local from .env.example and add your project credentials."
  );
  process.exit(1);
}

const supabase = createClient(url, anon);

const { error: authError } = await supabase.auth.getSession();

if (authError) {
  console.error("Supabase connection failed:", authError.message);
  process.exit(1);
}

console.log("Supabase OK: Auth API reachable (anon key).");

const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
if (!serviceKey) {
  console.log(
    "Skip DB test: set SUPABASE_SERVICE_ROLE_KEY in .env.local to verify booking_requests table."
  );
  if (process.env.RESEND_API_KEY?.trim()) {
    console.log("RESEND_API_KEY is set (emails are sent from Vercel /api/booking, not this script).");
  }
  process.exit(0);
}

const admin = createClient(url, serviceKey);

const testRow = {
  check_in: "2099-01-01",
  check_out: "2099-01-03",
  guests: 1,
  email: "supabase-test@example.com",
};

const { data: inserted, error: insertError } = await admin
  .from("booking_requests")
  .insert(testRow)
  .select("id")
  .single();

if (insertError) {
  console.error("booking_requests insert failed:", insertError.message);
  console.error(
    "Run supabase/schema.sql in the Supabase SQL Editor, then retry."
  );
  process.exit(1);
}

const { error: deleteError } = await admin.from("booking_requests").delete().eq("id", inserted.id);

if (deleteError) {
  console.warn("Test row inserted but delete failed:", deleteError.message, "id:", inserted.id);
  process.exit(1);
}

console.log("Supabase OK: booking_requests table readable/writable (service role).");

if (process.env.RESEND_API_KEY?.trim()) {
  console.log("RESEND_API_KEY is set — use npm run test:booking-api with Vercel dev or your deploy URL.");
}
