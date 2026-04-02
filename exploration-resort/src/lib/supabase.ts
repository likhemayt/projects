import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/** Returns a shared Supabase anon client.
 * Note: This is safe only for browser usage. Use SUPABASE_SERVICE_ROLE_KEY only on the server.
 */
export function getSupabase(): SupabaseClient | null {
  const url = import.meta.env.VITE_SUPABASE_URL?.trim();
  const anon = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();
  if (!url || !anon) return null;

  if (!client) client = createClient(url, anon);
  return client;
}