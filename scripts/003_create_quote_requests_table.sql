-- Create quote requests table
create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  contact_name text not null,
  email text not null,
  phone text not null,
  address text,
  city text,
  state text,
  product_interest text,
  quantity text,
  message text,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.quote_requests enable row level security;

-- Anyone can insert quote requests
create policy "quote_requests_insert_public"
  on public.quote_requests for insert
  with check (true);

-- Only authenticated users can view
create policy "quote_requests_select_auth"
  on public.quote_requests for select
  to authenticated
  using (true);

create policy "quote_requests_delete_auth"
  on public.quote_requests for delete
  to authenticated
  using (true);
