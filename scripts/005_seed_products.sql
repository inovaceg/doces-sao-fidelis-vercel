-- Seed initial products
insert into public.products (name, description, category, weight, price, is_featured) values
  ('Bananada Tradicional', 'Bananada artesanal feita com bananas selecionadas e açúcar. Sabor autêntico e textura única.', 'bananada', '300g', 12.90, true),
  ('Bananada Premium', 'Nossa bananada premium com ingredientes nobres e processo artesanal refinado.', 'bananada', '500g', 22.90, true),
  ('Bananada com Coco', 'Deliciosa combinação de banana com coco ralado. Sabor tropical irresistível.', 'bananada', '300g', 14.90, false),
  ('Goma de Amido Natural', 'Goma de amido tradicional, feita com ingredientes naturais. Textura macia e sabor suave.', 'goma', '250g', 9.90, true),
  ('Goma de Amido Colorida', 'Gomas coloridas e saborosas, perfeitas para todas as idades.', 'goma', '200g', 8.90, false),
  ('Goma de Amido Premium', 'Linha premium de gomas com sabores variados e qualidade superior.', 'goma', '300g', 13.90, false)
on conflict do nothing;
