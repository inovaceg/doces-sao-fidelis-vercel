-- Remove the check constraint and update category column to use UUID
ALTER TABLE public.products DROP CONSTRAINT IF EXISTS products_category_check;

-- Change category column to UUID type to reference categories table
ALTER TABLE public.products 
  ALTER COLUMN category TYPE uuid USING category::uuid;

-- Add foreign key constraint to categories table
ALTER TABLE public.products
  ADD CONSTRAINT products_category_fkey
  FOREIGN KEY (category)
  REFERENCES public.categories(id)
  ON DELETE RESTRICT;
