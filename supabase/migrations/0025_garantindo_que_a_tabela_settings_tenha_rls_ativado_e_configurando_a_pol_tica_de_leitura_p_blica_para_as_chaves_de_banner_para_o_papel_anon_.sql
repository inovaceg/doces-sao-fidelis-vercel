-- 1. Habilitar RLS (se ainda não estiver)
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- 2. Remover políticas de SELECT existentes que possam estar interferindo (opcional, mas seguro)
DROP POLICY IF EXISTS "Allow authenticated read access to settings" ON public.settings;
DROP POLICY IF EXISTS "Allow public read access for homepage banner" ON public.settings;

-- 3. Criar a política de leitura pública para as chaves de banner (para usuários anônimos)
CREATE POLICY "public_homepage_banner_read"
ON public.settings
FOR SELECT
TO anon
USING (
  key IN (
    'homepage_banner_url_desktop',
    'homepage_banner_url_tablet',
    'homepage_banner_url_mobile'
  )
);

-- 4. Manter políticas de gerenciamento para usuários autenticados (se existirem)
-- Se as políticas de INSERT/UPDATE/DELETE para 'authenticated' não existirem, elas devem ser recriadas.
-- Com base no seu contexto, as políticas de gerenciamento para 'authenticated' já existem, mas vamos garantir a leitura para eles também.
CREATE POLICY "Allow authenticated read access to settings" ON public.settings 
FOR SELECT TO authenticated USING (true);