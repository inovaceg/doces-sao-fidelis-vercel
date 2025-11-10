ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for products" ON products
FOR SELECT USING (true);