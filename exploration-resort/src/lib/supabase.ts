import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/** Returns a shared client with hardcoded credentials to ensure connection. */
export function getSupabase(): SupabaseClient | null {
  // Hardcoding the keys directly to bypass environment variable errors
  const url = 'https://ojgjyklttjkunmodtaxx.supabase.co';
  const anon = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qZ2p5a2x0dGprdW5tb2R0YXh4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTA5MjYwNCwiZXhwIjoyMDkwNjY4NjA0fQ.FJ2Vzzi8cMTKYOGeQnZStsHKur0ocyM7NKisOklUDhk';

  if (!client) {
    client = createClient(url, anon);
  }
  
  return client;
}