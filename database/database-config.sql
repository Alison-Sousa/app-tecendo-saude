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
  created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS profissionais_cpf_idx ON profissionais (cpf);

-- 1.1 Coluna tipo (acs, telessaude ou equipe_ubs)
ALTER TABLE profissionais ADD COLUMN IF NOT EXISTS tipo text DEFAULT 'acs';
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
