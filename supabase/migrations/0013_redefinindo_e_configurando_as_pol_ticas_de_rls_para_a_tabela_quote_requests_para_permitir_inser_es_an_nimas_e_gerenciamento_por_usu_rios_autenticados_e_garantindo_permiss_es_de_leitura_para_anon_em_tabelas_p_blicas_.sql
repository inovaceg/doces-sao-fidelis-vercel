-- 1. Desabilita RLS temporariamente para limpar todas as políticas existentes
ALTER TABLE public.quote_requests DISABLE ROW LEVEL SECURITY;

-- 2. Remove todas as políticas existentes para a tabela quote_requests para evitar conflitos
DROP POLICY IF EXISTS "Allow anon insert for quote requests" ON public.quote_requests;
DROP POLICY IF EXISTS "Allow authenticated users to delete quote requests" ON public.quote_requests;
DROP POLICY IF EXISTS "Allow authenticated users to read all quote requests" ON public.quote_requests;
DROP POLICY IF EXISTS "contact_forms_insert_public" ON public.quote_requests;
DROP POLICY IF EXISTS "contact_forms_delete_auth" ON public.quote_requests;
DROP POLICY IF EXISTS "contact_forms_select_auth" ON public.quote_requests;
DROP POLICY IF EXISTS "anon_insert_policy" ON public.quote_requests;
DROP POLICY IF EXISTS "authenticated_select_policy" ON public.quote_requests;
DROP POLICY IF EXISTS "authenticated_delete_policy" ON public.quote_requests;

-- 3. Revoga todos os privilégios do papel 'anon' na tabela quote_requests para garantir uma base limpa
REVOKE ALL PRIVILEGES ON TABLE public.quote_requests FROM anon;

-- 4. Concede explicitamente o privilégio de INSERT para o papel 'anon' na tabela quote_requests
GRANT INSERT ON public.quote_requests TO anon;

-- 5. Concede explicitamente o privilégio de USAGE no esquema 'public' para o papel 'public'
GRANT USAGE ON SCHEMA public TO public;

-- 6. Reabilita RLS na tabela quote_requests
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- 7. Cria a política para permitir que usuários anônimos insiram dados na tabela quote_requests
CREATE POLICY "Allow anon insert for quote requests" ON public.quote_requests
FOR INSERT TO anon WITH CHECK (true);

-- 8. Cria a política para permitir que usuários autenticados excluam dados na tabela quote_requests
CREATE POLICY "Allow authenticated users to delete quote requests" ON public.quote_requests
FOR DELETE TO authenticated USING (true);

-- 9. Cria a política para permitir que usuários autenticados leiam todos os dados na tabela quote_requests
CREATE POLICY "Allow authenticated users to read all quote requests" ON public.quote_requests
FOR SELECT TO authenticated USING (true);

-- 10. Garante que o papel 'anon' possa ler dados das tabelas 'products' e 'categories'
GRANT SELECT ON public.products TO anon;
GRANT SELECT ON public.categories TO anon;