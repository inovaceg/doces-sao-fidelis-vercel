-- Atualiza a URL do banner para desktop para uma imagem genérica
INSERT INTO public.settings (key, value)
VALUES ('homepage_banner_url_desktop', '/placeholder.jpg')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Atualiza a URL do banner para tablet para uma imagem genérica
INSERT INTO public.settings (key, value)
VALUES ('homepage_banner_url_tablet', '/placeholder.jpg')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Atualiza a URL do banner para celular para uma imagem genérica
INSERT INTO public.settings (key, value)
VALUES ('homepage_banner_url_mobile', '/placeholder.jpg')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;