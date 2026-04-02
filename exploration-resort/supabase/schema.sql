-- Run in Supabase SQL Editor (Dashboard → SQL) before using the booking API.
-- Service-role inserts from Vercel bypass RLS; this keeps the table locked down.

create table if not exists public.booking_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  check_in date not null,
  check_out date not null,
  guests int not null check (guests >= 1 and guests <= 8),
  email text not null
);

alter table public.booking_requests enable row level security;

-- No policies: only the service role (server) can read/write. Anon cannot access this table.

create index if not exists booking_requests_created_at_idx
  on public.booking_requests (created_at desc);

comment on table public.booking_requests is 'Resort booking inquiries from the public site (written by Vercel API only).';
