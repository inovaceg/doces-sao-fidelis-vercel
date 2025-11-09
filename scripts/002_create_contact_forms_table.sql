-- Create contact forms table
create table if not exists public.contact_forms (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.contact_forms enable row level security;

-- Anyone can insert contact forms
create policy "contact_forms_insert_public"
  on public.contact_forms for insert
  with check (true);

-- Only authenticated users can view
create policy "contact_forms_select_auth"
  on public.contact_forms for select
  to authenticated
  using (true);

create policy "contact_forms_delete_auth"
  on public.contact_forms for delete
  to authenticated
  using (true);
