-- ================================================
-- MIGRAÇÃO: Adicionar coluna glicemia_jejum
-- Valores: 'jejum' ou 'pos_refeicao'
-- Seguro para rodar em banco existente (não apaga nada)
-- ================================================

ALTER TABLE registros ADD COLUMN IF NOT EXISTS glicemia_jejum text;

-- Confirmar que a coluna foi criada
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'registros' AND column_name = 'glicemia_jejum';
