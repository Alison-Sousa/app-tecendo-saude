-- 0. Extensões
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFISSIONAIS
CREATE TABLE IF NOT EXISTS profissionais (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text,
  cpf text NOT NULL UNIQUE,
  municipio text,
  ubs text,
  telefone text,
  foto_url text,
  updated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS profissionais_cpf_idx ON profissionais (cpf);

-- 1.1 Coluna tipo (acs, tecnico_enfermagem, telessaude ou equipe_ubs)
ALTER TABLE profissionais ADD COLUMN IF NOT EXISTS tipo text DEFAULT 'acs';
ALTER TABLE profissionais ADD COLUMN IF NOT EXISTS foto_url text;
ALTER TABLE profissionais ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();
CREATE INDEX IF NOT EXISTS profissionais_tipo_idx ON profissionais (tipo);

-- 2. PERFIS (Pacientes)
CREATE TABLE IF NOT EXISTS perfis (
  id serial PRIMARY KEY,
  patient_id text NOT NULL UNIQUE,
  synced int DEFAULT 1,
  nome text,
  cpf text,
  nascimento text,
  regiao text,
  foto_url text,
  ubs_referencia text,
  genero text,
  raca text,
  endereco text,
  telefone text,
  escolaridade text,
  profissao text,
  mora_sozinho text,
  mora_companheiro text,
  tem_filhos text,
  qtd_filhos text,
  filhos_json text,
  acs_responsavel text,
  equipe_ubs text,
  hipertensao text,
  tempo_diag_has text,
  diabetes text,
  tempo_diag_dm text,
  gestante text,
  infeccao_urinaria_gestacao text,
  dependencias text,
  tempo_dependencia text,
  condicoes text,
  altura text,
  peso_inicial text,
  peso_atual text,
  peso_primeira_consulta text,
  imc_pre_gestacional text,
  imc_atual text,
  dum text,
  gestacao_semanas text,
  previsao_parto text,
  faz_pre_natal text,
  inicio_pre_natal text,
  data_ultima_consulta_pre_natal text,
  data_parto text,
  peso_bebe text,
  altura_bebe text,
  amamentando text,
  local_nascimento text,
  vacinas_maternidade jsonb,
  teste_pezinho text,
  data_teste_pezinho text,
  consulta_puerperal text,
  data_consulta_puerperal text,
  enxerga_bem text,
  consulta_oftalmo text,
  tempo_consulta_oftalmo text,
  dificuldade_mastigar_falar_engolir text,
  uso_medicacoes text,
  nomes_medicacoes text,
  posologia_dosagem text,
  posologia_horario text,
  data_ultima_prescricao text,
  data_ultima_dispensacao text,
  atividade_fisica text,
  freq_atividade text,
  tipo_atividade text,
  meta_peso text,
  meta_glicemia text,
  meta_pa_min text,
  meta_pa_max text,
  created_by_nome text,
  created_by_ubs text,
  created_by_cpf text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS perfis_patient_id_idx ON perfis (patient_id);
CREATE INDEX IF NOT EXISTS perfis_cpf_idx ON perfis (cpf);
CREATE INDEX IF NOT EXISTS perfis_regiao_idx ON perfis (regiao);

-- 2.1 Colunas adicionadas em migrações (seguro para banco novo ou existente)
ALTER TABLE perfis ADD COLUMN IF NOT EXISTS data_parto text;
ALTER TABLE perfis ADD COLUMN IF NOT EXISTS peso_bebe text;
ALTER TABLE perfis ADD COLUMN IF NOT EXISTS altura_bebe text;
ALTER TABLE perfis ADD COLUMN IF NOT EXISTS amamentando text;
ALTER TABLE perfis ADD COLUMN IF NOT EXISTS local_nascimento text;
ALTER TABLE perfis ADD COLUMN IF NOT EXISTS vacinas_maternidade jsonb;
ALTER TABLE perfis ADD COLUMN IF NOT EXISTS teste_pezinho text;
ALTER TABLE perfis ADD COLUMN IF NOT EXISTS data_teste_pezinho text;
ALTER TABLE perfis ADD COLUMN IF NOT EXISTS consulta_puerperal text;
ALTER TABLE perfis ADD COLUMN IF NOT EXISTS data_consulta_puerperal text;
ALTER TABLE perfis ADD COLUMN IF NOT EXISTS meta_glicemia_max integer;
ALTER TABLE perfis ADD COLUMN IF NOT EXISTS meta_glicemia_min integer;
ALTER TABLE perfis ADD COLUMN IF NOT EXISTS meta_pa_sis_max integer;
ALTER TABLE perfis ADD COLUMN IF NOT EXISTS meta_pa_sis_min integer;
ALTER TABLE perfis ADD COLUMN IF NOT EXISTS meta_pa_dia_max integer;
ALTER TABLE perfis ADD COLUMN IF NOT EXISTS meta_pa_dia_min integer;

-- 3. REGISTROS (Atendimentos e Monitoramento Diário)
CREATE TABLE IF NOT EXISTS registros (
  id serial PRIMARY KEY,
  registro_id text NOT NULL UNIQUE,
  patient_id text REFERENCES perfis(patient_id) ON DELETE SET NULL,
  device_id text,
  texto text,
  tipo text,
  status text,
  pa_sistolica integer,
  pa_diastolica integer,
  peso_kg numeric(5,2),
  glicemia_mg integer,
  gestante text,
  gestacao_semanas integer,
  atividade_fisica text,
  resposta text,
  resposta_data timestamptz,
  replies_json jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz,
  updated_at timestamptz,
  synced int DEFAULT 1
);
CREATE INDEX IF NOT EXISTS registros_registro_id_idx ON registros (registro_id);
CREATE INDEX IF NOT EXISTS registros_patient_idx ON registros (patient_id);
CREATE INDEX IF NOT EXISTS registros_status_idx ON registros (status);

-- 3.1 Coluna de migração glicemia_jejum
ALTER TABLE registros ADD COLUMN IF NOT EXISTS glicemia_jejum text;

-- 3.2 Índice no tipo para consultas de satisfação e filtros por tipo (satisfacao, monitoramento, etc.)
CREATE INDEX IF NOT EXISTS registros_tipo_idx ON registros (tipo);

-- 4. MEDICAMENTOS
CREATE TABLE IF NOT EXISTS medicamentos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  medication_id text NOT NULL UNIQUE,
  patient_id text REFERENCES perfis(patient_id) ON DELETE CASCADE,
  nome_paciente text,
  cpf_paciente text,
  tipo_medicamento text,
  nome_medicamento text,
  dosagem text,
  horarios text,
  data_prescricao date,
  data_dispensacao date,
  data_inicio date,
  data_termino date,
  ativo text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  synced int DEFAULT 1
);
CREATE INDEX IF NOT EXISTS medicamentos_patient_id_idx ON medicamentos (patient_id);

-- 5. FUNÇÃO + TRIGGERS (updated_at automático)
CREATE OR REPLACE FUNCTION set_updated_at() RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS profissionais_updated_at ON profissionais;
CREATE TRIGGER profissionais_updated_at BEFORE UPDATE ON profissionais
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS perfis_updated_at ON perfis;
CREATE TRIGGER perfis_updated_at BEFORE UPDATE ON perfis
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS registros_updated_at ON registros;
CREATE TRIGGER registros_updated_at BEFORE UPDATE ON registros
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS medicamentos_updated_at ON medicamentos;
CREATE TRIGGER medicamentos_updated_at BEFORE UPDATE ON medicamentos
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 6. STORAGE (Bucket público para mídias)
INSERT INTO storage.buckets (id, name, public)
VALUES ('midias', 'midias', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 7. RLS OFF + POLÍTICAS STORAGE
ALTER TABLE profissionais DISABLE ROW LEVEL SECURITY;
ALTER TABLE perfis        DISABLE ROW LEVEL SECURITY;
ALTER TABLE registros     DISABLE ROW LEVEL SECURITY;
ALTER TABLE medicamentos  DISABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS midias_select ON storage.objects;
DROP POLICY IF EXISTS midias_insert ON storage.objects;
DROP POLICY IF EXISTS midias_update ON storage.objects;
DROP POLICY IF EXISTS midias_delete ON storage.objects;

CREATE POLICY midias_select ON storage.objects FOR SELECT USING (bucket_id = 'midias');
CREATE POLICY midias_insert ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'midias');
CREATE POLICY midias_update ON storage.objects FOR UPDATE USING (bucket_id = 'midias') WITH CHECK (bucket_id = 'midias');
CREATE POLICY midias_delete ON storage.objects FOR DELETE USING (bucket_id = 'midias');

-- 8. VIEW - FICHAS CADASTRAIS COMPLETAS
CREATE OR REPLACE VIEW fichas_cadastrais AS
SELECT * FROM perfis;

-- 9. REFERÊNCIA - Novos ACS a cadastrar (necessitam CPF para INSERT em profissionais)
-- Município: Almeirim
--   Cristiane Palheta da Cruz, Daniel Araújo Borges, Dineia da Paixão Perna,
--   Dirley Souza, Gabrielle Pinheiro Serrão, Jucinalda Coelho da Fonseca,
--   Maria da Conceição Serra Sarges, Maria das Graças Pereira Cruz,
--   Maria Ivanete Sarraff dos Santos, Maria Sofia Ferreira Lacerda,
--   Noelma Santos de Sousa, Raisa das Graças Castro, Sabrina Gonzaga de Jesus,
--   Sediney Dias Marques, Silvana Pena Medeiros, Suely Silva Bastos,
--   Wangela Paiva Batista, Zivanildo Rodrigues Castro
-- Município: Jacareacanga
--   Albanira dos Santos, Aline de Souza Braga, Angélica Carneiro Rocha,
--   Carlos Alves Cardoso, Cirlea Batista Nogueira, Cristine Reichembak Campos,
--   Daniel Carlos de Jesus Lopes, Eliane Palhano, Geonara Xavier da Silva Matos,
--   Hiltamara Ribeiro Lima, Iranete da Paixão Silva de Souza, Janete Cardoso Sousa,
--   Jessica Aparecida Frederico de Souza, Josiane da Silva Macuyama,
--   Laydiane Miranda do Nascimento, Mábrison Sobrinho da Silva,
--   Mikelle Silva Ferreira, Paulo Anderson Munduruku Bastos,
--   Simone Araújo de Oliveira Bizerril
-- Município: Prainha
--   Adriana Pedroso Marques, Alcione Castilho Magno dos Santos,
--   Alcione Pereira dos Santos, Aldely de Andrade Benicio,
--   Ana Cristina dos Santos Cerqueira, Andrea de Souza Fernandes,
--   Andrelina Fernandes da Silva, Antonio Marques de Araújo Neto,
--   Claudiane Nayara da Costa Guedes, Clebson da Silva Freitas,
--   Daniele da Silva e Silva, Darliene da Silva Sanches, Edirrone Pereira da Silva,
--   Edu da Silva Queiroz, Elizabel Silva Pinho,
--   Elmazia das Graças Amorim Esquerdo, Gelciane Moraes Corrêa,
--   Jarlison Alvarenga da Rocha, Joelma Miranda Lima, Jonefa Perna da Silva,
--   Juliana Magno de Souza, Kelmira Ferreira dos Santos, Larissa Dos Santos Pinto,
--   Maria Edileuza Aragão Ferreira, Odomaria Pires dos Anjos,
--   Rana Pinheiro Santos, Rudilene Pantoja de Araujo, Telma Perna Costa,
--   Wandra Jame Pereira Torres

-- GESTAO DO COORDENADOR + AUDITORIA
-- Execute este SQL no Supabase para ativar a tela "Gerenciar Usuarios".
--
-- Seguranca:
-- - As funcoes exigem usuario autenticado no Supabase Auth.
-- - O usuario autenticado precisa estar vinculado a profissionais.auth_user_id.
-- - O profissional vinculado precisa ter UBS contendo "coordenador" ou tipo iniciando com "coord".
-- - CPF dos cadastros nao e editado.
-- - Toda edicao/exclusao gera log em gestao_auditoria.

ALTER TABLE profissionais ADD COLUMN IF NOT EXISTS auth_user_id uuid;
CREATE UNIQUE INDEX IF NOT EXISTS profissionais_auth_user_id_idx
ON profissionais (auth_user_id)
WHERE auth_user_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS gestao_auditoria (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_profissional_id uuid,
  admin_cpf text,
  admin_nome text,
  acao text NOT NULL,
  alvo_tipo text NOT NULL,
  alvo_id text,
  alvo_cpf text,
  alvo_nome text,
  antes jsonb,
  depois jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS gestao_auditoria_admin_cpf_idx ON gestao_auditoria (admin_cpf);
CREATE INDEX IF NOT EXISTS gestao_auditoria_alvo_idx ON gestao_auditoria (alvo_tipo, alvo_id);
CREATE INDEX IF NOT EXISTS gestao_auditoria_created_at_idx ON gestao_auditoria (created_at DESC);

CREATE OR REPLACE FUNCTION app_normalize_cpf(p_value text)
RETURNS text
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT regexp_replace(coalesce(p_value, ''), '\D', '', 'g');
$$;

CREATE OR REPLACE FUNCTION app_coordenador_atual()
RETURNS TABLE (id uuid, nome text, cpf text)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Login Supabase necessario para gestao.';
  END IF;

  RETURN QUERY
  SELECT p.id, p.nome, p.cpf
  FROM profissionais p
  WHERE p.auth_user_id = auth.uid()
    AND (
      lower(coalesce(p.ubs, '')) LIKE '%coordenador%'
      OR lower(coalesce(p.tipo, '')) LIKE 'coord%'
    )
  LIMIT 1;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Acesso permitido apenas para coordenador autenticado.';
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION app_coordenador_listar_usuarios()
RETURNS TABLE (
  patient_id text,
  nome text,
  cpf text,
  nascimento text,
  regiao text,
  foto_url text,
  telefone text,
  ubs_referencia text,
  acs_responsavel text,
  equipe_ubs text,
  genero text,
  raca text,
  hipertensao text,
  diabetes text,
  gestante text,
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  PERFORM 1 FROM app_coordenador_atual();

  RETURN QUERY
  SELECT p.patient_id, p.nome, p.cpf, p.nascimento, p.regiao, p.foto_url, p.telefone,
         p.ubs_referencia, p.acs_responsavel, p.equipe_ubs, p.genero, p.raca,
         p.hipertensao, p.diabetes, p.gestante, p.created_at, p.updated_at
  FROM perfis p
  ORDER BY p.nome NULLS LAST
  LIMIT 2000;
END;
$$;

CREATE OR REPLACE FUNCTION app_coordenador_listar_profissionais()
RETURNS TABLE (
  id uuid,
  nome text,
  cpf text,
  telefone text,
  municipio text,
  ubs text,
  tipo text,
  foto_url text,
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  PERFORM 1 FROM app_coordenador_atual();

  RETURN QUERY
  SELECT p.id, p.nome, p.cpf, p.telefone, p.municipio, p.ubs, p.tipo, p.foto_url,
         p.created_at, p.updated_at
  FROM profissionais p
  ORDER BY p.nome NULLS LAST
  LIMIT 2000;
END;
$$;

CREATE OR REPLACE FUNCTION app_coordenador_atualizar_usuario(
  p_patient_id text,
  p_nome text,
  p_telefone text,
  p_regiao text,
  p_ubs_referencia text,
  p_acs_responsavel text,
  p_equipe_ubs text,
  p_foto_url text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_admin record;
  v_antes jsonb;
  v_depois jsonb;
BEGIN
  SELECT * INTO v_admin FROM app_coordenador_atual();

  SELECT to_jsonb(p.*) INTO v_antes FROM perfis p WHERE p.patient_id = p_patient_id;
  IF v_antes IS NULL THEN RAISE EXCEPTION 'Usuario nao encontrado.'; END IF;

  UPDATE perfis p
  SET nome = nullif(trim(p_nome), ''),
      telefone = p_telefone,
      regiao = p_regiao,
      ubs_referencia = p_ubs_referencia,
      acs_responsavel = p_acs_responsavel,
      equipe_ubs = p_equipe_ubs,
      foto_url = p_foto_url,
      updated_at = now()
  WHERE p.patient_id = p_patient_id
  RETURNING to_jsonb(p.*) INTO v_depois;

  INSERT INTO gestao_auditoria (admin_profissional_id, admin_cpf, admin_nome, acao, alvo_tipo, alvo_id, alvo_cpf, alvo_nome, antes, depois)
  VALUES (v_admin.id, app_normalize_cpf(v_admin.cpf), v_admin.nome, 'editar', 'usuario', p_patient_id, v_antes->>'cpf', v_antes->>'nome', v_antes, v_depois);

  RETURN true;
END;
$$;

CREATE OR REPLACE FUNCTION app_coordenador_atualizar_profissional(
  p_profissional_id uuid,
  p_nome text,
  p_telefone text,
  p_municipio text,
  p_ubs text,
  p_tipo text,
  p_foto_url text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_admin record;
  v_antes jsonb;
  v_depois jsonb;
BEGIN
  SELECT * INTO v_admin FROM app_coordenador_atual();

  SELECT to_jsonb(p.*) INTO v_antes FROM profissionais p WHERE p.id = p_profissional_id;
  IF v_antes IS NULL THEN RAISE EXCEPTION 'Profissional nao encontrado.'; END IF;

  UPDATE profissionais p
  SET nome = nullif(trim(p_nome), ''),
      telefone = p_telefone,
      municipio = p_municipio,
      ubs = p_ubs,
      tipo = coalesce(nullif(p_tipo, ''), 'acs'),
      foto_url = p_foto_url,
      updated_at = now()
  WHERE p.id = p_profissional_id
  RETURNING to_jsonb(p.*) INTO v_depois;

  INSERT INTO gestao_auditoria (admin_profissional_id, admin_cpf, admin_nome, acao, alvo_tipo, alvo_id, alvo_cpf, alvo_nome, antes, depois)
  VALUES (v_admin.id, app_normalize_cpf(v_admin.cpf), v_admin.nome, 'editar', 'profissional', p_profissional_id::text, v_antes->>'cpf', v_antes->>'nome', v_antes, v_depois);

  RETURN true;
END;
$$;

CREATE OR REPLACE FUNCTION app_coordenador_excluir_usuario(
  p_patient_id text,
  p_confirmacao text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_admin record;
  v_antes jsonb;
  v_rows integer;
BEGIN
  SELECT * INTO v_admin FROM app_coordenador_atual();
  IF p_confirmacao <> 'EXCLUIR' THEN RAISE EXCEPTION 'Confirmacao invalida.'; END IF;

  SELECT to_jsonb(p.*) INTO v_antes FROM perfis p WHERE p.patient_id = p_patient_id;
  IF v_antes IS NULL THEN RAISE EXCEPTION 'Usuario nao encontrado.'; END IF;

  DELETE FROM medicamentos WHERE patient_id = p_patient_id;
  DELETE FROM registros WHERE patient_id = p_patient_id;
  DELETE FROM perfis WHERE patient_id = p_patient_id;
  GET DIAGNOSTICS v_rows = ROW_COUNT;
  IF v_rows = 0 THEN RAISE EXCEPTION 'Usuario nao encontrado.'; END IF;

  INSERT INTO gestao_auditoria (admin_profissional_id, admin_cpf, admin_nome, acao, alvo_tipo, alvo_id, alvo_cpf, alvo_nome, antes, depois)
  VALUES (v_admin.id, app_normalize_cpf(v_admin.cpf), v_admin.nome, 'excluir', 'usuario', p_patient_id, v_antes->>'cpf', v_antes->>'nome', v_antes, null);

  RETURN true;
END;
$$;

CREATE OR REPLACE FUNCTION app_coordenador_excluir_profissional(
  p_profissional_id uuid,
  p_confirmacao text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_admin record;
  v_antes jsonb;
  v_cpf_alvo text;
  v_rows integer;
BEGIN
  SELECT * INTO v_admin FROM app_coordenador_atual();
  IF p_confirmacao <> 'EXCLUIR' THEN RAISE EXCEPTION 'Confirmacao invalida.'; END IF;

  SELECT to_jsonb(p.*), p.cpf INTO v_antes, v_cpf_alvo
  FROM profissionais p
  WHERE p.id = p_profissional_id;

  IF v_antes IS NULL THEN RAISE EXCEPTION 'Profissional nao encontrado.'; END IF;
  IF app_normalize_cpf(v_cpf_alvo) = app_normalize_cpf(v_admin.cpf) THEN
    RAISE EXCEPTION 'Nao e possivel excluir o proprio coordenador logado.';
  END IF;

  DELETE FROM profissionais WHERE id = p_profissional_id;
  GET DIAGNOSTICS v_rows = ROW_COUNT;
  IF v_rows = 0 THEN RAISE EXCEPTION 'Profissional nao encontrado.'; END IF;

  INSERT INTO gestao_auditoria (admin_profissional_id, admin_cpf, admin_nome, acao, alvo_tipo, alvo_id, alvo_cpf, alvo_nome, antes, depois)
  VALUES (v_admin.id, app_normalize_cpf(v_admin.cpf), v_admin.nome, 'excluir', 'profissional', p_profissional_id::text, v_antes->>'cpf', v_antes->>'nome', v_antes, null);

  RETURN true;
END;
$$;

GRANT EXECUTE ON FUNCTION app_normalize_cpf(text) TO authenticated;
GRANT EXECUTE ON FUNCTION app_coordenador_atual() TO authenticated;
GRANT EXECUTE ON FUNCTION app_coordenador_listar_usuarios() TO authenticated;
GRANT EXECUTE ON FUNCTION app_coordenador_listar_profissionais() TO authenticated;
GRANT EXECUTE ON FUNCTION app_coordenador_atualizar_usuario(text, text, text, text, text, text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION app_coordenador_atualizar_profissional(uuid, text, text, text, text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION app_coordenador_excluir_usuario(text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION app_coordenador_excluir_profissional(uuid, text) TO authenticated;

COMMENT ON COLUMN profissionais.tipo IS 'Valores usados no app: acs, tecnico_enfermagem, telessaude, equipe_ubs.';
