-- MIGRAÇÃO SEGURA: adiciona colunas novas sem apagar dados existentes
-- Execute este arquivo no Supabase SQL Editor

-- Adiciona coluna 'gestante' na tabela perfis (se não existir)
ALTER TABLE perfis ADD COLUMN IF NOT EXISTS gestante text;

-- Adiciona coluna 'imc_atual' na tabela perfis (se não existir)
ALTER TABLE perfis ADD COLUMN IF NOT EXISTS imc_atual text;
