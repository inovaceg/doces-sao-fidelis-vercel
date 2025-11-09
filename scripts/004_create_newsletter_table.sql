-- Create newsletter subscribers table
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  subscribed_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.newsletter_subscribers enable row level security;

-- Anyone can subscribe
create policy "newsletter_insert_public"
  on public.newsletter_subscribers for insert
  with check (true);

-- Only authenticated users can view subscribers
create policy "newsletter_select_auth"
  on public.newsletter_subscribers for select
  to authenticated
  using (true);

create policy "newsletter_delete_auth"
  on public.newsletter_subscribers for delete
  to authenticated
  using (true);
