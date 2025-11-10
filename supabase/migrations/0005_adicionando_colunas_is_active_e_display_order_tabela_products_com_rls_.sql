ALTER TABLE public.products
ADD COLUMN is_active BOOLEAN DEFAULT TRUE,
ADD COLUMN display_order INTEGER DEFAULT 0;

-- Update RLS policies to include new columns in checks if needed,
-- but for simple select/insert/update/delete, existing policies usually cover new columns.
-- Assuming existing policies allow authenticated users to manage all columns.
-- If specific RLS for these new columns is required, it would be added here.