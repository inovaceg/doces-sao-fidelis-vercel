-- Remove the check constraint on products.category to allow dynamic categories
ALTER TABLE products DROP CONSTRAINT IF EXISTS products_category_check;

-- Add a new constraint that just checks the category is not empty
ALTER TABLE products ADD CONSTRAINT products_category_not_empty CHECK (category IS NOT NULL AND trim(category) <> '');
