ALTER TABLE public.products
ADD COLUMN units_per_package INTEGER;

ALTER TABLE public.products
ALTER COLUMN price DROP NOT NULL;