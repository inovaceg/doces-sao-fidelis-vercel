-- Remover a política de INSERT existente para anon, que está com problema
DROP POLICY IF EXISTS "Allow anon insert for quote requests" ON public.quote_requests;

-- Criar uma nova política para permitir que usuários anônimos insiram dados
CREATE POLICY "Allow anon insert for quote requests" ON public.quote_requests
FOR INSERT TO anon WITH CHECK (true);

-- Garantir que usuários autenticados possam ler todas as solicitações
DROP POLICY IF EXISTS "Allow authenticated users to read all quote requests" ON public.quote_requests;
CREATE POLICY "Allow authenticated users to read all quote requests" ON public.quote_requests
FOR SELECT TO authenticated USING (true);

-- Garantir que usuários autenticados possam excluir todas as solicitações
DROP POLICY IF EXISTS "Allow authenticated users to delete quote requests" ON public.quote_requests;
CREATE POLICY "Allow authenticated users to delete quote requests" ON public.quote_requests
FOR DELETE TO authenticated USING (true);