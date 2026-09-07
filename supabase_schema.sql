-- ==============================================================================
-- CENTRAL NET - SCRIPT DE CRIAÇÃO DO BANCO DE DADOS (SUPABASE)
-- Execute este script no SQL Editor do seu projeto no Supabase
-- ==============================================================================

-- 1. Tabela central de dados do CMS (guarda o estado atualizado do site)
CREATE TABLE IF NOT EXISTS public.centralnet_cms (
  id TEXT PRIMARY KEY DEFAULT 'current_data',
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Habilitar Row Level Security (RLS)
ALTER TABLE public.centralnet_cms ENABLE ROW LEVEL SECURITY;

-- 3. Política de Leitura Pública (Qualquer visitante do site pode ver os dados)
DROP POLICY IF EXISTS "Permitir leitura publica dos dados" ON public.centralnet_cms;
CREATE POLICY "Permitir leitura publica dos dados"
ON public.centralnet_cms
FOR SELECT
TO public
USING (true);

-- 4. Política de Atualização/Inserção (Permitir gravação com chave anon para o painel)
DROP POLICY IF EXISTS "Permitir escrita no CMS" ON public.centralnet_cms;
CREATE POLICY "Permitir escrita no CMS"
ON public.centralnet_cms
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- 5. Bucket de Storage para Banners e Imagens (Opcional)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('centralnet-assets', 'centralnet-assets', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Permitir visualizacao publica de assets" ON storage.objects;
CREATE POLICY "Permitir visualizacao publica de assets"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'centralnet-assets');

DROP POLICY IF EXISTS "Permitir upload de assets" ON storage.objects;
CREATE POLICY "Permitir upload de assets"
ON storage.objects FOR ALL
TO public
USING (bucket_id = 'centralnet-assets')
WITH CHECK (bucket_id = 'centralnet-assets');
