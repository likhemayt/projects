/**
 * Verifies Supabase URL and anon key by calling the Auth API.
 * Usage: copy .env.example to .env.local, fill values, then:
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

const { data, error } = await supabase.auth.getSession();

if (error) {
  console.error("Supabase connection failed:", error.message);
  process.exit(1);
}

console.log("Supabase OK: Auth API reachable.");
console.log("Session:", data.session ? "active" : "none (expected for anon-only check)");
