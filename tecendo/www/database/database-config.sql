-- 0. Extensões (UUID e crypto)
create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";

-- 1. LIMPEZA (ordem correta para FKs)
drop table if exists medicamentos cascade;
drop table if exists registros cascade;
drop table if exists perfis cascade;
drop table if exists profissionais cascade;

-- 2. PROFISSIONAIS
create table profissionais (
  id uuid primary key default gen_random_uuid(),
  nome text,
  cpf text not null unique,
  municipio text,
  ubs text,
  telefone text,
  created_at timestamptz default now()
);
create index profissionais_cpf_idx on profissionais (cpf);

-- 3. PERFIS (Pacientes)
create table perfis (
  id serial primary key,
  patient_id text not null unique,
  synced int default 1,
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
  infeccao_urinaria_gestacao text,
  dependencias text,
  tempo_dependencia text,
  altura text,
  peso_inicial text,
  peso_atual text,
  peso_primeira_consulta text,
  imc_pre_gestacional text,
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
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  meta_glicemia_max integer, -- Limite superior (ex: acima de 200 mg/dL)
  meta_glicemia_min integer, -- Limite inferior (ex: abaixo de 70 mg/dL)
  meta_pa_sis_max integer,   -- Pressão Sistólica Máxima (ex: 160)
  meta_pa_sis_min integer,   -- Pressão Sistólica Mínima (ex: 90)
  meta_pa_dia_max integer,   -- Pressão Diastólica Máxima (ex: 100)
  meta_pa_dia_min integer    -- Pressão Diastólica Mínima (ex: 60)
);
create index perfis_patient_id_idx on perfis (patient_id);
create index perfis_cpf_idx on perfis (cpf);
create index perfis_regiao_idx on perfis (regiao);

-- 4. REGISTROS (Atendimentos e Monitoramento Diário)
create table registros (
  id serial primary key,
  registro_id text not null unique,
  patient_id text references perfis(patient_id) on delete set null,
  device_id text,
  texto text,
  tipo text,
  status text,
  pa_sistolica integer,       -- Pressão arterial máxima
  pa_diastolica integer,      -- Pressão arterial mínima
  peso_kg numeric(5,2),       -- Peso em kg
  glicemia_mg integer,        -- Glicemia em mg/dL
  gestante text,              -- 'sim' ou 'nao'
  gestacao_semanas integer,   -- Semanas de gestação
  atividade_fisica text,      -- Tipo de atividade física
  resposta text,
  resposta_data timestamptz,
  replies_json jsonb default '[]'::jsonb,
  created_at timestamptz,
  updated_at timestamptz,
  synced int default 1
);
create index registros_registro_id_idx on registros (registro_id);
create index registros_patient_idx on registros (patient_id);
create index registros_status_idx on registros (status);

-- 5. MEDICAMENTOS
create table medicamentos (
  id uuid primary key default gen_random_uuid(),
  medication_id text not null unique,
  patient_id text references perfis(patient_id) on delete cascade,
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
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  synced int default 1
);
create index medicamentos_patient_id_idx on medicamentos (patient_id);

-- 6. FUNÇÃO + TRIGGERS (updated_at automático)
create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger perfis_updated_at before update on perfis
for each row execute function set_updated_at();

create trigger registros_updated_at before update on registros
for each row execute function set_updated_at();

create trigger medicamentos_updated_at before update on medicamentos
for each row execute function set_updated_at();

-- 7. STORAGE (Bucket público para mídias)
insert into storage.buckets (id, name, public)
values ('midias','midias', true)
on conflict (id) do update set public = true;

-- 8. RLS OFF + POLÍTICAS STORAGE
alter table profissionais disable row level security;
alter table perfis       disable row level security;
alter table registros    disable row level security;
alter table medicamentos disable row level security;

drop policy if exists midias_select on storage.objects;
drop policy if exists midias_insert on storage.objects;
drop policy if exists midias_update on storage.objects;
drop policy if exists midias_delete on storage.objects;

create policy midias_select on storage.objects for select using (bucket_id = 'midias');
create policy midias_insert on storage.objects for insert with check (bucket_id = 'midias');
create policy midias_update on storage.objects for update using (bucket_id = 'midias') with check (bucket_id = 'midias');
create policy midias_delete on storage.objects for delete using (bucket_id = 'midias');

-- 9. VIEW - FICHAS CADASTRAIS COMPLETAS
create or replace view fichas_cadastrais as
select * from perfis;
