-- Create products table for managing the catalog
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  category text not null check (category in ('bananada', 'goma')),
  weight text,
  price numeric(10, 2),
  image_url text,
  is_featured boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.products enable row level security;

-- Public can view products
create policy "products_select_public"
  on public.products for select
  using (true);

-- Only authenticated users can insert/update/delete
create policy "products_insert_auth"
  on public.products for insert
  to authenticated
  with check (true);

create policy "products_update_auth"
  on public.products for update
  to authenticated
  using (true);

create policy "products_delete_auth"
  on public.products for delete
  to authenticated
  using (true);
