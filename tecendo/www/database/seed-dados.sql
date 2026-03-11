-- ============================================
-- TECENDO SAÚDE - SEED DE DADOS FICTÍCIOS
-- Execute APÓS o database-config.sql
-- ============================================

-- 1. LIMPAR DADOS EXISTENTES (mantém tabelas)
DELETE FROM registros;
DELETE FROM medicamentos;
DELETE FROM perfis;
DELETE FROM profissionais;

-- 2. PROFISSIONAL DE TESTE
INSERT INTO profissionais (nome, cpf, municipio, ubs, telefone)
VALUES ('Ana Souza', '12345678901', 'Cidade X', 'UBS Centro', '(11) 99999-0001')
ON CONFLICT (cpf) DO NOTHING;

-- 3. PACIENTES (20 fictícios)
INSERT INTO perfis (
  patient_id, nome, cpf, nascimento, regiao, ubs_referencia, genero, raca,
  endereco, telefone, escolaridade, profissao, mora_sozinho, acs_responsavel,
  hipertensao, diabetes, dependencias, altura, peso_inicial
) VALUES
('P001','Maria Silva','11122233344','12/03/1990','Norte','UBS Centro','F','Parda','Rua A, 123','(11) 98888-0001','Ensino Médio','Auxiliar','nao','ACS Joana','nao','sim','nenhum','160','72'),
('P002','João Lima','55566677788','01/11/1985','Sul','UBS Sul','M','Branca','Rua B, 45','(11) 97777-0002','Ensino Fundamental','Motorista','sim','ACS Carlos','sim','nao','tabagismo','175','88'),
('P003','Carla Mendes','99988877766','22/06/2001','Leste','UBS Leste','F','Preta','Rua C, 678','(11) 96666-0003','Superior Incompleto','Estudante','nao','ACS Lara','nao','nao','nenhum','162','60'),
('P004','Pedro Alves','48290173456','05/08/1978','Oeste','UBS Oeste','M','Branca','Rua D, 99','(11) 95555-0004','Ensino Médio','Vendedor','sim','ACS Rosa','sim','sim','alcool','172','95'),
('P005','Lia Costa','73920184567','19/02/1995','Norte','UBS Centro','F','Parda','Rua E, 10','(11) 94444-0005','Superior','Enfermeira','nao','ACS Joana','nao','nao','nenhum','158','58'),
('P006','Rafael Nunes','66012459873','30/09/1988','Sul','UBS Sul','M','Preta','Rua F, 121','(11) 93333-0006','Ensino Médio','Porteiro','nao','ACS Carlos','sim','nao','tabagismo','180','90'),
('P007','Bianca Rocha','82014567932','07/01/1992','Leste','UBS Leste','F','Branca','Rua G, 77','(11) 92222-0007','Superior','Professora','nao','ACS Lara','nao','nao','nenhum','165','63'),
('P008','Marcos Vieira','91023456789','11/11/1970','Oeste','UBS Oeste','M','Parda','Rua H, 88','(11) 91111-0008','Ensino Fundamental','Pedreiro','sim','ACS Rosa','sim','nao','tabagismo','170','86'),
('P009','Sandra Pires','30294857610','25/12/1983','Norte','UBS Centro','F','Preta','Rua I, 202','(11) 90000-0009','Ensino Médio','Recepcionista','nao','ACS Joana','nao','sim','nenhum','160','70'),
('P010','Luciano Prado','47382910564','03/04/1976','Sul','UBS Sul','M','Branca','Rua J, 17','(11) 98888-0010','Ensino Fundamental','Taxista','sim','ACS Carlos','sim','nao','alcool','176','92'),
('P011','Juliana Melo','58293017465','14/05/1998','Leste','UBS Leste','F','Parda','Rua K, 55','(11) 97777-0011','Superior','Designer','nao','ACS Lara','nao','nao','nenhum','168','62'),
('P012','Carlos Dias','67483920156','09/09/1981','Oeste','UBS Oeste','M','Preta','Rua L, 311','(11) 96666-0012','Ensino Médio','Motorista','sim','ACS Rosa','sim','sim','tabagismo','173','98'),
('P013','Camila Souza','78192036547','18/07/2002','Norte','UBS Centro','F','Branca','Rua M, 44','(11) 95555-0013','Superior Incompleto','Estudante','nao','ACS Joana','nao','nao','nenhum','162','55'),
('P014','Felipe Moraes','89310274658','27/01/1991','Sul','UBS Sul','M','Parda','Rua N, 61','(11) 94444-0014','Ensino Médio','Vigilante','sim','ACS Carlos','sim','nao','alcool','178','96'),
('P015','Patricia Fontes','90283746519','06/06/1986','Leste','UBS Leste','F','Preta','Rua O, 82','(11) 93333-0015','Ensino Médio','Cozinheira','nao','ACS Lara','nao','sim','nenhum','159','68'),
('P016','Renato Gomes','12039485761','13/03/1974','Oeste','UBS Oeste','M','Branca','Rua P, 18','(11) 92222-0016','Ensino Fundamental','Pintor','sim','ACS Rosa','sim','nao','tabagismo','171','89'),
('P017','Aline Barros','23019485762','24/10/1993','Norte','UBS Centro','F','Parda','Rua Q, 333','(11) 91111-0017','Superior','Advogada','nao','ACS Joana','nao','nao','nenhum','167','61'),
('P018','Eduardo Lima','34019485763','21/08/1980','Sul','UBS Sul','M','Preta','Rua R, 27','(11) 90000-0018','Ensino Médio','Entregador','sim','ACS Carlos','sim','sim','tabagismo','174','94'),
('P019','Fernanda Lopes','45019485764','01/02/1997','Leste','UBS Leste','F','Branca','Rua S, 91','(11) 98888-0019','Superior','Nutricionista','nao','ACS Lara','nao','nao','nenhum','164','57'),
('P020','Diego Santos','56019485765','10/12/1989','Oeste','UBS Oeste','M','Parda','Rua T, 66','(11) 97777-0020','Ensino Médio','Operador','sim','ACS Rosa','sim','nao','alcool','179','93'),
('P021','Bruna Alves','60123456780','02/02/1996','Leste','UBS Leste','F','Branca','Rua U, 10','(11) 98888-0021','Superior','Arquiteta','nao','ACS Lara','nao','nao','nenhum','165','62'),
('P022','Patrícia Souza','71123456781','14/07/1994','Norte','UBS Centro','F','Parda','Rua V, 45','(11) 98888-0022','Superior','Psicóloga','nao','ACS Joana','nao','nao','nenhum','160','60'),
('P023','Camila Rocha','82123456782','20/11/1992','Sul','UBS Sul','F','Preta','Rua W, 90','(11) 98888-0023','Ensino Médio','Recepcionista','nao','ACS Carlos','nao','nao','nenhum','168','64'),
('P024','Luciana Lima','93123456783','05/09/1990','Oeste','UBS Oeste','F','Parda','Rua X, 12','(11) 98888-0024','Superior','Designer','nao','ACS Rosa','nao','nao','nenhum','163','59'),
('P025','Juliana Martins','04123456784','12/03/1991','Leste','UBS Leste','F','Branca','Rua Y, 33','(11) 98888-0025','Superior','Professora','nao','ACS Lara','nao','nao','nenhum','167','61'),
('P026','Renata Costa','15123456785','30/10/1995','Norte','UBS Centro','F','Parda','Rua Z, 55','(11) 98888-0026','Ensino Médio','Caixa','nao','ACS Joana','nao','nao','nenhum','158','56'),
('P027','Ana Paula','26123456786','27/04/1993','Sul','UBS Sul','F','Preta','Rua AA, 78','(11) 98888-0027','Superior','Farmacêutica','nao','ACS Carlos','nao','nao','nenhum','166','60'),
('P028','Larissa Gomes','37123456787','09/01/1998','Oeste','UBS Oeste','F','Branca','Rua AB, 8','(11) 98888-0028','Superior','Estudante','nao','ACS Rosa','nao','nao','nenhum','162','55'),
('P029','Mariana Silva','48123456788','18/06/1997','Leste','UBS Leste','F','Parda','Rua AC, 19','(11) 98888-0029','Ensino Médio','Auxiliar','nao','ACS Lara','nao','nao','nenhum','161','58'),
('P030','Beatriz Santos','59123456789','22/08/1999','Norte','UBS Centro','F','Branca','Rua AD, 40','(11) 98888-0030','Ensino Médio','Atendente','nao','ACS Joana','nao','nao','nenhum','159','54'),
('P031','Rogério Silva','60123456790','11/05/1978','Sul','UBS Sul','M','Branca','Rua AE, 70','(11) 98888-0031','Ensino Médio','Motorista','sim','ACS Carlos','sim','nao','tabagismo','175','92'),
('P032','Eduardo Freitas','71123456791','03/12/1982','Oeste','UBS Oeste','M','Parda','Rua AF, 25','(11) 98888-0032','Ensino Médio','Vigilante','sim','ACS Rosa','sim','nao','alcool','173','90'),
('P033','Daniel Souza','82123456792','19/01/1985','Leste','UBS Leste','M','Preta','Rua AG, 98','(11) 98888-0033','Ensino Fundamental','Pedreiro','sim','ACS Lara','sim','sim','tabagismo','170','95'),
('P034','Paulo Henrique','93123456793','08/08/1988','Norte','UBS Centro','M','Branca','Rua AH, 13','(11) 98888-0034','Ensino Médio','Porteiro','sim','ACS Joana','sim','nao','alcool','176','88'),
('P035','Felipe Alves','04123456794','24/03/1990','Sul','UBS Sul','M','Parda','Rua AI, 46','(11) 98888-0035','Ensino Médio','Vendedor','sim','ACS Carlos','nao','nao','nenhum','178','82'),
('P036','Thiago Lima','15123456795','07/09/1987','Oeste','UBS Oeste','M','Branca','Rua AJ, 21','(11) 98888-0036','Ensino Médio','Operador','sim','ACS Rosa','sim','nao','tabagismo','174','91'),
('P037','Igor Mendes','26123456796','16/02/1992','Leste','UBS Leste','M','Parda','Rua AK, 30','(11) 98888-0037','Superior','Analista','nao','ACS Lara','nao','nao','nenhum','180','80'),
('P038','Lucas Prado','37123456797','28/11/1984','Norte','UBS Centro','M','Branca','Rua AL, 77','(11) 98888-0038','Ensino Médio','Taxista','sim','ACS Joana','sim','nao','alcool','172','89'),
('P039','André Carvalho','48123456798','04/04/1986','Sul','UBS Sul','M','Preta','Rua AM, 66','(11) 98888-0039','Ensino Fundamental','Serviços','sim','ACS Carlos','sim','sim','tabagismo','171','96'),
('P040','Mateus Dias','59123456799','30/06/1993','Oeste','UBS Oeste','M','Parda','Rua AN, 54','(11) 98888-0040','Ensino Médio','Estoquista','sim','ACS Rosa','nao','nao','nenhum','177','84')
ON CONFLICT (patient_id) DO NOTHING;

-- 3.1 FOTO FICTÍCIA PARA PERFIS
UPDATE perfis
SET foto_url = 'https://ui-avatars.com/api/?name=' || replace(nome, ' ', '+') || '&background=2f6b3f&color=ffffff&size=256'
WHERE (foto_url IS NULL OR foto_url = '');

-- 3.2 DADOS DE FILHOS E VACINAS (FICTÍCIOS)
UPDATE perfis
SET
  tem_filhos = CASE
    WHEN patient_id IN ('P001','P004','P007','P010','P012','P015','P018','P020','P021','P039') THEN 'Sim'
    ELSE 'Não'
  END,
  qtd_filhos = CASE
    WHEN patient_id = 'P001' THEN '2'
    WHEN patient_id = 'P004' THEN '3'
    WHEN patient_id = 'P007' THEN '1'
    WHEN patient_id = 'P010' THEN '2'
    WHEN patient_id = 'P012' THEN '4'
    WHEN patient_id = 'P015' THEN '1'
    WHEN patient_id = 'P018' THEN '8'
    WHEN patient_id = 'P020' THEN '2'
    WHEN patient_id = 'P021' THEN '1'
    WHEN patient_id = 'P039' THEN '1'
    ELSE 'Não se aplica'
  END,
  filhos_json = CASE
    WHEN patient_id = 'P001' THEN '[{"nome":"Luana Silva","idade":8,"vacinaStatus":"Em dia","vacinaData":"Não se aplica"},{"nome":"Pedro Silva","idade":5,"vacinaStatus":"Em dia","vacinaData":"Não se aplica"}]'
    WHEN patient_id = 'P004' THEN '[{"nome":"Gabriel Alves","idade":12,"vacinaStatus":"Atrasada","vacinaData":"Não se aplica"},{"nome":"Rafaela Alves","idade":9,"vacinaStatus":"Atrasada","vacinaData":"Não se aplica"},{"nome":"Lucas Alves","idade":6,"vacinaStatus":"Atrasada","vacinaData":"Não se aplica"}]'
    WHEN patient_id = 'P007' THEN '[{"nome":"Helena Rocha","idade":3,"vacinaStatus":"Em dia","vacinaData":"Não se aplica"}]'
    WHEN patient_id = 'P010' THEN '[{"nome":"Carolina Prado","idade":10,"vacinaStatus":"Agendada","vacinaData":"15/02/2026"},{"nome":"Miguel Prado","idade":7,"vacinaStatus":"Em dia","vacinaData":"Não se aplica"}]'
    WHEN patient_id = 'P012' THEN '[{"nome":"Ana Dias","idade":14,"vacinaStatus":"Atrasada","vacinaData":"Não se aplica"},{"nome":"Bruno Dias","idade":11,"vacinaStatus":"Atrasada","vacinaData":"Não se aplica"},{"nome":"Isabela Dias","idade":6,"vacinaStatus":"Em dia","vacinaData":"Não se aplica"},{"nome":"Tiago Dias","idade":4,"vacinaStatus":"Em dia","vacinaData":"Não se aplica"}]'
    WHEN patient_id = 'P015' THEN '[{"nome":"João Fontes","idade":2,"vacinaStatus":"Em dia","vacinaData":"Não se aplica"}]'
    WHEN patient_id = 'P018' THEN '[{"nome":"Lara Lima","idade":9,"vacinaStatus":"Agendada","vacinaData":"03/03/2026"},{"nome":"Arthur Lima","idade":7,"vacinaStatus":"Em dia","vacinaData":"Não se aplica"},{"nome":"Enzo Lima","idade":5,"vacinaStatus":"Em dia","vacinaData":"Não se aplica"},{"nome":"Paula Lima","idade":3,"vacinaStatus":"Em dia","vacinaData":"Não se aplica"},{"nome":"Rafael Lima","idade":1,"vacinaStatus":"Em dia","vacinaData":"Não se aplica"},{"nome":"Bianca Lima","idade":4,"vacinaStatus":"Atrasada","vacinaData":"Não se aplica"},{"nome":"Miguel Lima","idade":6,"vacinaStatus":"Em dia","vacinaData":"Não se aplica"},{"nome":"Sofia Lima","idade":2,"vacinaStatus":"Em dia","vacinaData":"Não se aplica"}]'
    WHEN patient_id = 'P020' THEN '[{"nome":"Marina Santos","idade":8,"vacinaStatus":"Agendada","vacinaData":"21/02/2026"},{"nome":"Nicolas Santos","idade":6,"vacinaStatus":"Em dia","vacinaData":"Não se aplica"}]'
    WHEN patient_id = 'P021' THEN '[{"nome":"Lívia Alves","idade":6,"vacinaStatus":"Em dia","vacinaData":"Não se aplica"}]'
    WHEN patient_id = 'P039' THEN '[{"nome":"Sofia Carvalho","idade":4,"vacinaStatus":"Em dia","vacinaData":"Não se aplica"}]'
    ELSE '[]'
  END;

-- 3.3 DADOS DE GESTAÇÃO (para menus e telas)
UPDATE perfis
SET
  gestacao_semanas = CASE
    WHEN patient_id = 'P003' THEN '18'
    WHEN patient_id = 'P007' THEN '15'
    WHEN patient_id = 'P021' THEN '19'
    WHEN patient_id = 'P022' THEN '17'
    WHEN patient_id = 'P023' THEN '20'
    WHEN patient_id = 'P024' THEN '18'
    WHEN patient_id = 'P025' THEN '21'
    WHEN patient_id = 'P026' THEN '16'
    WHEN patient_id = 'P027' THEN '22'
    WHEN patient_id = 'P028' THEN '19'
    WHEN patient_id = 'P029' THEN '20'
    WHEN patient_id = 'P030' THEN '24'
    ELSE gestacao_semanas
  END,
  dum = CASE
    WHEN patient_id = 'P003' THEN '05/09/2025'
    WHEN patient_id = 'P007' THEN '28/09/2025'
    WHEN patient_id = 'P021' THEN '01/09/2025'
    WHEN patient_id = 'P022' THEN '15/09/2025'
    WHEN patient_id = 'P023' THEN '25/08/2025'
    WHEN patient_id = 'P024' THEN '10/09/2025'
    WHEN patient_id = 'P025' THEN '30/08/2025'
    WHEN patient_id = 'P026' THEN '22/09/2025'
    WHEN patient_id = 'P027' THEN '18/08/2025'
    WHEN patient_id = 'P028' THEN '02/09/2025'
    WHEN patient_id = 'P029' THEN '25/08/2025'
    WHEN patient_id = 'P030' THEN '15/08/2025'
    ELSE dum
  END,
  previsao_parto = CASE
    WHEN patient_id = 'P003' THEN '12/05/2026'
    WHEN patient_id = 'P007' THEN '01/06/2026'
    WHEN patient_id = 'P021' THEN '08/05/2026'
    WHEN patient_id = 'P022' THEN '20/05/2026'
    WHEN patient_id = 'P023' THEN '05/05/2026'
    WHEN patient_id = 'P024' THEN '18/05/2026'
    WHEN patient_id = 'P025' THEN '10/05/2026'
    WHEN patient_id = 'P026' THEN '24/05/2026'
    WHEN patient_id = 'P027' THEN '28/04/2026'
    WHEN patient_id = 'P028' THEN '12/05/2026'
    WHEN patient_id = 'P029' THEN '05/05/2026'
    WHEN patient_id = 'P030' THEN '22/04/2026'
    ELSE previsao_parto
  END,
  faz_pre_natal = CASE
    WHEN patient_id IN ('P003','P007','P021','P022','P023','P024','P025','P026','P027','P028','P029','P030') THEN 'Sim'
    ELSE faz_pre_natal
  END,
  data_ultima_consulta_pre_natal = CASE
    WHEN patient_id = 'P003' THEN '05/01/2026'
    WHEN patient_id = 'P007' THEN '12/01/2026'
    WHEN patient_id = 'P021' THEN '08/01/2026'
    WHEN patient_id = 'P022' THEN '14/01/2026'
    WHEN patient_id = 'P023' THEN '10/01/2026'
    WHEN patient_id = 'P024' THEN '11/01/2026'
    WHEN patient_id = 'P025' THEN '09/01/2026'
    WHEN patient_id = 'P026' THEN '13/01/2026'
    WHEN patient_id = 'P027' THEN '06/01/2026'
    WHEN patient_id = 'P028' THEN '15/01/2026'
    WHEN patient_id = 'P029' THEN '10/01/2026'
    WHEN patient_id = 'P030' THEN '07/01/2026'
    ELSE data_ultima_consulta_pre_natal
  END;

-- 3.4 DADOS DE IDOSOS (60+)
UPDATE perfis
SET nascimento = CASE
  WHEN patient_id = 'P002' THEN '15/04/1960'
  WHEN patient_id = 'P004' THEN '03/02/1958'
  WHEN patient_id = 'P008' THEN '11/11/1955'
  WHEN patient_id = 'P010' THEN '22/07/1957'
  WHEN patient_id = 'P012' THEN '09/09/1962'
  WHEN patient_id = 'P031' THEN '05/01/1959'
  ELSE nascimento
END;

-- 3.5 COMPLETAR FICHA CADASTRAL (valores padrão quando ausentes)
UPDATE perfis
SET
  regiao = COALESCE(NULLIF(regiao,''), 'Santarém'),
  ubs_referencia = COALESCE(NULLIF(ubs_referencia,''), 'UBS Centro'),
  equipe_ubs = COALESCE(NULLIF(equipe_ubs,''), 'Equipe Verde'),
  acs_responsavel = COALESCE(NULLIF(acs_responsavel,''), 'ACS Maria'),
  endereco = COALESCE(NULLIF(endereco,''), 'Rua Principal, 100'),
  telefone = COALESCE(NULLIF(telefone,''), '(11) 90000-0000'),
  escolaridade = COALESCE(NULLIF(escolaridade,''), 'Ensino Médio'),
  profissao = COALESCE(NULLIF(profissao,''), 'Autônomo(a)'),
  mora_sozinho = COALESCE(NULLIF(mora_sozinho,''), 'nao'),
  mora_companheiro = COALESCE(NULLIF(mora_companheiro,''), 'sim'),
  tempo_diag_has = COALESCE(NULLIF(tempo_diag_has,''), CASE WHEN hipertensao = 'sim' OR hipertensao = 'Sim' THEN '3 anos' ELSE 'Não se aplica' END),
  tempo_diag_dm = COALESCE(NULLIF(tempo_diag_dm,''), CASE WHEN diabetes = 'sim' OR diabetes = 'Sim' THEN '2 anos' ELSE 'Não se aplica' END),
  infeccao_urinaria_gestacao = COALESCE(NULLIF(infeccao_urinaria_gestacao,''), 'Não'),
  dependencias = COALESCE(NULLIF(dependencias,''), 'nenhum'),
  tempo_dependencia = COALESCE(NULLIF(tempo_dependencia,''), CASE WHEN dependencias IS NULL OR dependencias = '' OR dependencias = 'nenhum' THEN 'Não se aplica' ELSE '5 anos' END),
  altura = COALESCE(NULLIF(altura,''), '165'),
  peso_inicial = COALESCE(NULLIF(peso_inicial,''), '70'),
  peso_atual = COALESCE(NULLIF(peso_atual,''), peso_inicial),
  peso_primeira_consulta = COALESCE(NULLIF(peso_primeira_consulta,''), peso_inicial),
  enxerga_bem = COALESCE(NULLIF(enxerga_bem,''), 'Sim'),
  consulta_oftalmo = COALESCE(NULLIF(consulta_oftalmo,''), 'Não'),
  tempo_consulta_oftalmo = COALESCE(NULLIF(tempo_consulta_oftalmo,''), 'Não se aplica'),
  dificuldade_mastigar_falar_engolir = COALESCE(NULLIF(dificuldade_mastigar_falar_engolir,''), 'Não'),
  uso_medicacoes = COALESCE(NULLIF(uso_medicacoes,''), CASE WHEN hipertensao = 'sim' OR hipertensao = 'Sim' OR diabetes = 'sim' OR diabetes = 'Sim' THEN 'Sim' ELSE 'Não' END),
  nomes_medicacoes = COALESCE(NULLIF(nomes_medicacoes,''), CASE WHEN hipertensao = 'sim' OR hipertensao = 'Sim' THEN 'Losartana' WHEN diabetes = 'sim' OR diabetes = 'Sim' THEN 'Metformina' ELSE 'Não usa' END),
  posologia_dosagem = COALESCE(NULLIF(posologia_dosagem,''), CASE WHEN hipertensao = 'sim' OR hipertensao = 'Sim' THEN '50mg' WHEN diabetes = 'sim' OR diabetes = 'Sim' THEN '500mg' ELSE 'Não se aplica' END),
  posologia_horario = COALESCE(NULLIF(posologia_horario,''), CASE WHEN hipertensao = 'sim' OR hipertensao = 'Sim' OR diabetes = 'sim' OR diabetes = 'Sim' THEN '08:00 / 20:00' ELSE 'Não se aplica' END),
  data_ultima_prescricao = COALESCE(NULLIF(data_ultima_prescricao,''), '10/01/2026'),
  data_ultima_dispensacao = COALESCE(NULLIF(data_ultima_dispensacao,''), '15/01/2026'),
  atividade_fisica = COALESCE(NULLIF(atividade_fisica,''), 'caminhada'),
  freq_atividade = COALESCE(NULLIF(freq_atividade,''), '3x por semana'),
  tipo_atividade = COALESCE(NULLIF(tipo_atividade,''), 'aeróbico'),
  meta_peso = COALESCE(NULLIF(meta_peso,''), '70'),
  meta_glicemia = COALESCE(NULLIF(meta_glicemia,''), '110'),
  meta_pa_min = COALESCE(NULLIF(meta_pa_min,''), '80'),
  meta_pa_max = COALESCE(NULLIF(meta_pa_max,''), '130'),
  tem_filhos = COALESCE(NULLIF(tem_filhos,''), 'Não'),
  qtd_filhos = COALESCE(NULLIF(qtd_filhos,''), '0'),
  filhos_json = COALESCE(NULLIF(filhos_json,''), '[]'),
  dum = COALESCE(NULLIF(dum,''), 'Não se aplica'),
  gestacao_semanas = COALESCE(NULLIF(gestacao_semanas,''), '0'),
  previsao_parto = COALESCE(NULLIF(previsao_parto,''), 'Não se aplica'),
  faz_pre_natal = COALESCE(NULLIF(faz_pre_natal,''), 'Não'),
  inicio_pre_natal = COALESCE(NULLIF(inicio_pre_natal,''), 'Não se aplica'),
  data_ultima_consulta_pre_natal = COALESCE(NULLIF(data_ultima_consulta_pre_natal,''), 'Não se aplica'),
  created_by_nome = COALESCE(NULLIF(created_by_nome,''), 'Enfermeira Ana Souza'),
  created_by_ubs = COALESCE(NULLIF(created_by_ubs,''), ubs_referencia),
  created_by_cpf = COALESCE(NULLIF(created_by_cpf,''), '12345678901');

-- 3.6 CALCULAR IMC PRÉ-GESTACIONAL QUANDO AUSENTE
UPDATE perfis
SET imc_pre_gestacional = CASE
  WHEN (imc_pre_gestacional IS NULL OR imc_pre_gestacional = '')
   AND NULLIF(altura,'') IS NOT NULL AND NULLIF(peso_inicial,'') IS NOT NULL
  THEN to_char((NULLIF(peso_inicial,'')::numeric) / ((NULLIF(altura,'')::numeric/100)^2), 'FM999990.0')
  ELSE imc_pre_gestacional
END;

-- 4. REGISTROS DE MONITORAMENTO (PA sistólica/diastólica, peso, glicemia, atividade física)
-- Cada paciente tem vários registros para formar gráficos
INSERT INTO registros (
  registro_id, patient_id, texto, tipo, status,
  pa_sistolica, pa_diastolica, peso_kg, glicemia_mg,
  gestante, gestacao_semanas, atividade_fisica, created_at, updated_at
) VALUES
-- Maria Silva (P001) - Diabética, vários registros
('R001','P001','Medição de rotina','monitoramento','pendente',135,88,74.5,165,'nao',null,'caminhada',now()-interval '6 days',now()-interval '6 days'),
('R001b','P001','Medição','monitoramento','pendente',132,85,74.2,158,'nao',null,'nenhuma',now()-interval '4 days',now()-interval '4 days'),
('R001c','P001','Controle','monitoramento','pendente',130,82,73.8,150,'nao',null,'caminhada',now()-interval '2 days',now()-interval '2 days'),

-- João Lima (P002) - Hipertenso CRÍTICO
('R002','P002','Sentindo tontura','monitoramento','pendente',175,110,89.0,95,'nao',null,'nenhuma',now()-interval '5 days',now()-interval '5 days'),
('R002b','P002','Piorou pressão','monitoramento','pendente',185,115,89.5,98,'nao',null,'nenhuma',now()-interval '3 days',now()-interval '3 days'),
('R002c','P002','Urgente','monitoramento','pendente',190,120,90.0,100,'nao',null,'nenhuma',now()-interval '1 day',now()-interval '1 day'),

-- Carla Mendes (P003) - GESTANTE 18 semanas
('R003','P003','Consulta gestacional','monitoramento','pendente',120,78,64.0,92,'sim',14,'caminhada',now()-interval '28 days',now()-interval '28 days'),
('R003b','P003','Pré-natal','monitoramento','pendente',118,76,65.5,90,'sim',16,'caminhada',now()-interval '14 days',now()-interval '14 days'),
('R003c','P003','Acompanhamento','monitoramento','pendente',122,80,67.0,88,'sim',18,'caminhada',now()-interval '3 days',now()-interval '3 days'),

-- Pedro Alves (P004) - Hipertenso + Diabético CRÍTICO
('R004','P004','Controle mensal','monitoramento','pendente',160,98,97.2,210,'nao',null,'nenhuma',now()-interval '4 days',now()-interval '4 days'),
('R004b','P004','Medição','monitoramento','pendente',165,102,98.0,220,'nao',null,'nenhuma',now()-interval '2 days',now()-interval '2 days'),

-- Lia Costa (P005) - Saudável
('R005','P005','Rotina','monitoramento','pendente',118,76,58.5,88,'nao',null,'musculacao',now()-interval '2 days',now()-interval '2 days'),

-- Rafael Nunes (P006) - Hipertenso
('R006','P006','Dor de cabeça','monitoramento','pendente',150,95,91.3,108,'nao',null,'nenhuma',now()-interval '5 days',now()-interval '5 days'),
('R006b','P006','Melhorou','monitoramento','pendente',145,92,90.8,105,'nao',null,'caminhada',now()-interval '2 days',now()-interval '2 days'),

-- Bianca Rocha (P007) - Gestante 12 semanas
('R007','P007','Check-up','monitoramento','pendente',122,80,63.1,99,'sim',12,'caminhada',now()-interval '2 days',now()-interval '2 days'),
('R007b','P007','Gestação','monitoramento','pendente',120,78,64.0,95,'sim',15,'caminhada',now()-interval '10 days',now()-interval '10 days'),
('R007c','P007','Acompanhamento','monitoramento','pendente',121,79,65.2,94,'sim',18,'caminhada',now()-interval '18 days',now()-interval '18 days'),

-- Marcos Vieira (P008) - Hipertenso idoso
('R008','P008','Rotina','monitoramento','pendente',145,92,86.8,130,'nao',null,'nenhuma',now()-interval '6 days',now()-interval '6 days'),
('R008b','P008','Controle','monitoramento','pendente',148,94,87.2,135,'nao',null,'nenhuma',now()-interval '3 days',now()-interval '3 days'),

-- Sandra Pires (P009) - Diabética glicemia alta
('R009','P009','Glicemia alta','monitoramento','pendente',130,85,71.0,215,'nao',null,'caminhada',now()-interval '4 days',now()-interval '4 days'),
('R009b','P009','Piorou','monitoramento','pendente',128,82,70.5,230,'nao',null,'nenhuma',now()-interval '1 day',now()-interval '1 day'),

-- Luciano Prado (P010) - Hipertenso
('R010','P010','Pressão elevada','monitoramento','pendente',168,105,93.2,140,'nao',null,'nenhuma',now()-interval '3 days',now()-interval '3 days'),

-- Juliana Melo (P011) - Saudável
('R011','P011','Acompanhamento','monitoramento','pendente',116,75,61.0,90,'nao',null,'corrida',now()-interval '2 days',now()-interval '2 days'),

-- Carlos Dias (P012) - Hipertenso + Diabético CRÍTICO
('R012','P012','Glicemia alta','monitoramento','pendente',155,100,99.4,230,'nao',null,'nenhuma',now()-interval '6 days',now()-interval '6 days'),
('R012b','P012','Crítico','monitoramento','pendente',162,105,100.2,255,'nao',null,'nenhuma',now()-interval '2 days',now()-interval '2 days'),
('R012c','P012','Controle','monitoramento','pendente',150,98,99.0,220,'nao',null,'nenhuma',now()-interval '12 days',now()-interval '12 days'),
('R012d','P012','Acompanhamento','monitoramento','pendente',158,102,100.0,240,'nao',null,'nenhuma',now()-interval '18 days',now()-interval '18 days'),

-- Camila Souza (P013) - Saudável jovem
('R013','P013','Consulta','monitoramento','pendente',110,70,55.4,85,'nao',null,'danca',now()-interval '1 day',now()-interval '1 day'),

-- Felipe Moraes (P014) - Hipertenso
('R014','P014','Pressão alta','monitoramento','pendente',170,108,96.8,150,'nao',null,'nenhuma',now()-interval '5 days',now()-interval '5 days'),
('R014b','P014','Controle','monitoramento','pendente',165,104,96.2,145,'nao',null,'caminhada',now()-interval '2 days',now()-interval '2 days'),

-- Patricia Fontes (P015) - Diabética
('R015','P015','Rotina','monitoramento','pendente',128,82,69.0,180,'nao',null,'caminhada',now()-interval '3 days',now()-interval '3 days'),

-- Renato Gomes (P016) - Hipertenso
('R016','P016','Controle','monitoramento','pendente',148,94,88.6,135,'nao',null,'nenhuma',now()-interval '2 days',now()-interval '2 days'),

-- Aline Barros (P017) - Saudável
('R017','P017','Acompanhamento','monitoramento','pendente',119,78,60.8,92,'nao',null,'yoga',now()-interval '1 day',now()-interval '1 day'),

-- Eduardo Lima (P018) - Hipertenso + Diabético CRÍTICO
('R018','P018','Glicemia alta','monitoramento','pendente',160,102,95.0,240,'nao',null,'nenhuma',now()-interval '6 days',now()-interval '6 days'),
('R018b','P018','Piorou muito','monitoramento','pendente',175,112,96.5,260,'nao',null,'nenhuma',now()-interval '2 days',now()-interval '2 days'),
('R018c','P018','Controle','monitoramento','pendente',158,100,95.2,230,'nao',null,'nenhuma',now()-interval '12 days',now()-interval '12 days'),
('R018d','P018','Acompanhamento','monitoramento','pendente',165,105,96.0,245,'nao',null,'nenhuma',now()-interval '18 days',now()-interval '18 days'),

-- Fernanda Lopes (P019) - Saudável
('R019','P019','Rotina','monitoramento','pendente',115,74,57.5,87,'nao',null,'pilates',now()-interval '2 days',now()-interval '2 days'),

-- Diego Santos (P020) - Hipertenso
('R020','P020','Pressão alta','monitoramento','pendente',165,104,94.1,145,'nao',null,'nenhuma',now()-interval '4 days',now()-interval '4 days'),
('R020b','P020','Controle','monitoramento','pendente',155,98,93.5,135,'nao',null,'nenhuma',now()-interval '10 days',now()-interval '10 days'),
('R020c','P020','Acompanhamento','monitoramento','pendente',148,95,92.8,130,'nao',null,'nenhuma',now()-interval '16 days',now()-interval '16 days')
,
-- Bruna Alves (P021) - Gestante (12 e 16 semanas)
('R021','P021','Pré-natal','monitoramento','pendente',120,78,63.0,92,'sim',12,'caminhada',now()-interval '20 days',now()-interval '20 days'),
('R021b','P021','Acompanhamento','monitoramento','pendente',118,76,64.2,90,'sim',16,'caminhada',now()-interval '6 days',now()-interval '6 days'),
('R021c','P021','Acompanhamento','monitoramento','pendente',119,77,65.1,91,'sim',19,'caminhada',now()-interval '2 days',now()-interval '2 days'),

-- Patrícia Souza (P022) - Gestante (10 e 14 semanas)
('R022','P022','Pré-natal','monitoramento','pendente',122,80,61.0,94,'sim',10,'caminhada',now()-interval '18 days',now()-interval '18 days'),
('R022b','P022','Acompanhamento','monitoramento','pendente',120,78,62.1,92,'sim',14,'caminhada',now()-interval '5 days',now()-interval '5 days'),
('R022c','P022','Acompanhamento','monitoramento','pendente',121,79,63.0,93,'sim',17,'caminhada',now()-interval '1 day',now()-interval '1 day'),

-- Camila Rocha (P023) - Gestante (13 e 17 semanas)
('R023','P023','Pré-natal','monitoramento','pendente',125,82,65.2,96,'sim',13,'caminhada',now()-interval '16 days',now()-interval '16 days'),
('R023b','P023','Acompanhamento','monitoramento','pendente',123,80,66.0,95,'sim',17,'caminhada',now()-interval '4 days',now()-interval '4 days'),
('R023c','P023','Acompanhamento','monitoramento','pendente',124,81,66.8,95,'sim',20,'caminhada',now()-interval '1 day',now()-interval '1 day'),

-- Luciana Lima (P024) - Gestante (11 e 15 semanas)
('R024','P024','Pré-natal','monitoramento','pendente',118,76,60.5,90,'sim',11,'caminhada',now()-interval '19 days',now()-interval '19 days'),
('R024b','P024','Acompanhamento','monitoramento','pendente',120,78,61.7,92,'sim',15,'caminhada',now()-interval '6 days',now()-interval '6 days'),
('R024c','P024','Acompanhamento','monitoramento','pendente',121,79,62.6,93,'sim',18,'caminhada',now()-interval '2 days',now()-interval '2 days'),

-- Juliana Martins (P025) - Gestante (12 e 18 semanas)
('R025','P025','Pré-natal','monitoramento','pendente',121,79,62.4,93,'sim',12,'caminhada',now()-interval '21 days',now()-interval '21 days'),
('R025b','P025','Acompanhamento','monitoramento','pendente',122,80,64.0,94,'sim',18,'caminhada',now()-interval '7 days',now()-interval '7 days'),
('R025c','P025','Acompanhamento','monitoramento','pendente',123,81,65.0,95,'sim',21,'caminhada',now()-interval '2 days',now()-interval '2 days'),

-- Renata Costa (P026) - Gestante (9 e 13 semanas)
('R026','P026','Pré-natal','monitoramento','pendente',117,75,58.2,88,'sim',9,'caminhada',now()-interval '17 days',now()-interval '17 days'),
('R026b','P026','Acompanhamento','monitoramento','pendente',118,76,59.4,89,'sim',13,'caminhada',now()-interval '5 days',now()-interval '5 days'),
('R026c','P026','Acompanhamento','monitoramento','pendente',119,77,60.3,90,'sim',16,'caminhada',now()-interval '1 day',now()-interval '1 day'),

-- Ana Paula (P027) - Gestante (14 e 19 semanas)
('R027','P027','Pré-natal','monitoramento','pendente',124,82,61.8,95,'sim',14,'caminhada',now()-interval '22 days',now()-interval '22 days'),
('R027b','P027','Acompanhamento','monitoramento','pendente',126,84,63.5,96,'sim',19,'caminhada',now()-interval '8 days',now()-interval '8 days'),
('R027c','P027','Acompanhamento','monitoramento','pendente',127,85,64.6,97,'sim',22,'caminhada',now()-interval '2 days',now()-interval '2 days'),

-- Larissa Gomes (P028) - Gestante (10 e 16 semanas)
('R028','P028','Pré-natal','monitoramento','pendente',119,77,56.9,89,'sim',10,'caminhada',now()-interval '15 days',now()-interval '15 days'),
('R028b','P028','Acompanhamento','monitoramento','pendente',121,78,58.1,90,'sim',16,'caminhada',now()-interval '4 days',now()-interval '4 days'),
('R028c','P028','Acompanhamento','monitoramento','pendente',122,79,59.0,91,'sim',19,'caminhada',now()-interval '1 day',now()-interval '1 day'),

-- Mariana Silva (P029) - Gestante (11 e 17 semanas)
('R029','P029','Pré-natal','monitoramento','pendente',120,78,59.6,92,'sim',11,'caminhada',now()-interval '19 days',now()-interval '19 days'),
('R029b','P029','Acompanhamento','monitoramento','pendente',122,79,61.2,93,'sim',17,'caminhada',now()-interval '6 days',now()-interval '6 days'),
('R029c','P029','Acompanhamento','monitoramento','pendente',123,80,62.3,94,'sim',20,'caminhada',now()-interval '2 days',now()-interval '2 days'),

-- Beatriz Santos (P030) - Gestante (12 e 20 semanas)
('R030','P030','Pré-natal','monitoramento','pendente',121,79,57.8,91,'sim',12,'caminhada',now()-interval '23 days',now()-interval '23 days'),
('R030b','P030','Acompanhamento','monitoramento','pendente',123,80,59.9,92,'sim',20,'caminhada',now()-interval '9 days',now()-interval '9 days'),
('R030c','P030','Acompanhamento','monitoramento','pendente',124,81,61.0,93,'sim',24,'caminhada',now()-interval '2 days',now()-interval '2 days'),

-- Rogério Silva (P031) - Crítico (PA muito alta)
('R031','P031','PA muito alta','monitoramento','pendente',182,118,93.0,110,'nao',null,'nenhuma',now()-interval '2 days',now()-interval '2 days'),

-- Eduardo Freitas (P032) - Atenção (PA elevada)
('R032','P032','PA elevada','monitoramento','pendente',150,96,91.0,115,'nao',null,'nenhuma',now()-interval '3 days',now()-interval '3 days'),

-- Daniel Souza (P033) - Crítico (glicemia muito alta)
('R033','P033','Glicemia crítica','monitoramento','pendente',160,102,96.5,260,'nao',null,'nenhuma',now()-interval '1 day',now()-interval '1 day'),

-- Paulo Henrique (P034) - Atenção (glicemia alta)
('R034','P034','Glicemia alta','monitoramento','pendente',138,88,87.0,180,'nao',null,'nenhuma',now()-interval '4 days',now()-interval '4 days'),

-- Felipe Alves (P035) - Estável
('R035','P035','Rotina','monitoramento','pendente',122,80,82.0,95,'nao',null,'caminhada',now()-interval '3 days',now()-interval '3 days'),

-- Thiago Lima (P036) - Atenção (PA elevada)
('R036','P036','Pressão elevada','monitoramento','pendente',148,94,91.5,120,'nao',null,'nenhuma',now()-interval '2 days',now()-interval '2 days'),

-- Igor Mendes (P037) - Estável
('R037','P037','Check-up','monitoramento','pendente',118,76,79.5,90,'nao',null,'corrida',now()-interval '2 days',now()-interval '2 days'),

-- Lucas Prado (P038) - Atenção (glicemia elevada)
('R038','P038','Glicemia elevada','monitoramento','pendente',130,82,89.0,130,'nao',null,'nenhuma',now()-interval '3 days',now()-interval '3 days'),

-- André Carvalho (P039) - Crítico (PA + glicemia)
('R039','P039','Crítico','monitoramento','pendente',185,120,97.0,255,'nao',null,'nenhuma',now()-interval '1 day',now()-interval '1 day'),

-- Mateus Dias (P040) - Estável
('R040','P040','Rotina','monitoramento','pendente',120,78,84.0,98,'nao',null,'caminhada',now()-interval '2 days',now()-interval '2 days')
ON CONFLICT (registro_id) DO NOTHING;

-- 5. REGISTROS EXTRAS (histórico mais rico para gráficos)
INSERT INTO registros (
  registro_id, patient_id, texto, tipo, status,
  pa_sistolica, pa_diastolica, peso_kg, glicemia_mg,
  gestante, gestacao_semanas, atividade_fisica, created_at, updated_at
) VALUES
-- P012 (Carlos Dias) - 10-20 dias de histórico
('R012e','P012','Histórico','monitoramento','pendente',152,99,99.2,225,'nao',null,'nenhuma',now()-interval '8 days',now()-interval '8 days'),
('R012f','P012','Histórico','monitoramento','pendente',148,96,98.9,215,'nao',null,'nenhuma',now()-interval '10 days',now()-interval '10 days'),
('R012g','P012','Histórico','monitoramento','pendente',160,104,100.6,245,'nao',null,'nenhuma',now()-interval '14 days',now()-interval '14 days'),
('R012h','P012','Histórico','monitoramento','pendente',155,101,99.7,235,'nao',null,'nenhuma',now()-interval '20 days',now()-interval '20 days'),

-- P033 (Daniel Souza) - histórico crítico
('R033b','P033','Histórico','monitoramento','pendente',155,98,95.0,240,'nao',null,'nenhuma',now()-interval '6 days',now()-interval '6 days'),
('R033c','P033','Histórico','monitoramento','pendente',162,105,96.0,270,'nao',null,'nenhuma',now()-interval '12 days',now()-interval '12 days'),
('R033d','P033','Histórico','monitoramento','pendente',150,96,94.4,230,'nao',null,'nenhuma',now()-interval '18 days',now()-interval '18 days'),

-- P031 (Rogério Silva) - PA muito alta
('R031b','P031','Histórico','monitoramento','pendente',176,114,92.5,120,'nao',null,'nenhuma',now()-interval '7 days',now()-interval '7 days'),
('R031c','P031','Histórico','monitoramento','pendente',170,110,92.0,118,'nao',null,'nenhuma',now()-interval '13 days',now()-interval '13 days'),
('R031d','P031','Histórico','monitoramento','pendente',184,118,93.4,125,'nao',null,'nenhuma',now()-interval '19 days',now()-interval '19 days'),

-- P003 (Carla Mendes) - gestante com evolução
('R003d','P003','Histórico gestacional','monitoramento','pendente',118,76,66.0,90,'sim',19,'caminhada',now()-interval '8 days',now()-interval '8 days'),
('R003e','P003','Histórico gestacional','monitoramento','pendente',120,78,66.8,92,'sim',20,'caminhada',now()-interval '12 days',now()-interval '12 days'),
('R003f','P003','Histórico gestacional','monitoramento','pendente',121,79,67.6,94,'sim',22,'caminhada',now()-interval '20 days',now()-interval '20 days'),

-- P022 (Patrícia Souza) - gestante com 10-20 dias
('R022d','P022','Histórico gestacional','monitoramento','pendente',119,77,62.8,91,'sim',18,'caminhada',now()-interval '9 days',now()-interval '9 days'),
('R022e','P022','Histórico gestacional','monitoramento','pendente',120,78,63.5,92,'sim',20,'caminhada',now()-interval '15 days',now()-interval '15 days'),
('R022f','P022','Histórico gestacional','monitoramento','pendente',122,79,64.4,94,'sim',22,'caminhada',now()-interval '21 days',now()-interval '21 days'),

-- P005 (Lia Costa) - estável com histórico
('R005b','P005','Histórico','monitoramento','pendente',117,75,58.8,86,'nao',null,'musculacao',now()-interval '9 days',now()-interval '9 days'),
('R005c','P005','Histórico','monitoramento','pendente',119,76,59.0,88,'nao',null,'musculacao',now()-interval '14 days',now()-interval '14 days'),

-- P010 (Luciano Prado) - hipertenso histórico
('R010b','P010','Histórico','monitoramento','pendente',165,102,93.0,138,'nao',null,'nenhuma',now()-interval '8 days',now()-interval '8 days'),
('R010c','P010','Histórico','monitoramento','pendente',170,106,94.0,142,'nao',null,'nenhuma',now()-interval '16 days',now()-interval '16 days')
ON CONFLICT (registro_id) DO NOTHING;

-- 6. REGISTROS CRÍTICOS ADICIONAIS (garantir pelo menos ~9 críticos)
INSERT INTO registros (
  registro_id, patient_id, texto, tipo, status,
  pa_sistolica, pa_diastolica, peso_kg, glicemia_mg,
  gestante, gestacao_semanas, atividade_fisica, created_at, updated_at
) VALUES
('RCRIT001','P004','Crítico','monitoramento','pendente',185,120,99.0,260,'nao',null,'nenhuma',now()-interval '3 hours',now()-interval '3 hours'),
('RCRIT002','P006','Crítico','monitoramento','pendente',182,118,92.0,255,'nao',null,'nenhuma',now()-interval '2 hours',now()-interval '2 hours'),
('RCRIT003','P008','Crítico','monitoramento','pendente',190,122,88.0,260,'nao',null,'nenhuma',now()-interval '5 hours',now()-interval '5 hours'),
('RCRIT004','P009','Crítico','monitoramento','pendente',178,112,70.0,255,'nao',null,'nenhuma',now()-interval '4 hours',now()-interval '4 hours'),
('RCRIT005','P010','Crítico','monitoramento','pendente',182,116,94.0,252,'nao',null,'nenhuma',now()-interval '1 hours',now()-interval '1 hours'),
('RCRIT006','P014','Crítico','monitoramento','pendente',188,120,98.0,265,'nao',null,'nenhuma',now()-interval '6 hours',now()-interval '6 hours'),
('RCRIT007','P016','Crítico','monitoramento','pendente',181,118,90.0,250,'nao',null,'nenhuma',now()-interval '7 hours',now()-interval '7 hours'),
('RCRIT008','P020','Crítico','monitoramento','pendente',185,121,95.0,258,'nao',null,'nenhuma',now()-interval '8 hours',now()-interval '8 hours'),
('RCRIT009','P031','Crítico','monitoramento','pendente',190,120,94.0,255,'nao',null,'nenhuma',now()-interval '9 hours',now()-interval '9 hours')
ON CONFLICT (registro_id) DO NOTHING;

-- 7. RESPOSTAS DE CHAT (para testar conversa)
UPDATE registros
SET resposta = 'Olá! Recebemos sua mensagem e vamos acompanhar seus dados.',
    resposta_data = now() - interval '1 day'
WHERE registro_id IN ('R001c','R002c','R003c','R007c','R009b');

UPDATE registros
SET replies_json = '[{"from":"pro","text":"Tudo certo por aqui. Continue acompanhando e atualize amanhã.","at":"2026-01-20T12:30:00Z"}]'::jsonb
WHERE registro_id = 'R005';

-- 8. HISTÓRICO EXTRA PARA IDOSOS (gráficos mais ricos)
INSERT INTO registros (
  registro_id, patient_id, texto, tipo, status,
  pa_sistolica, pa_diastolica, peso_kg, glicemia_mg,
  gestante, gestacao_semanas, atividade_fisica, created_at, updated_at
) VALUES
-- P002 (idoso)
('RID002a','P002','Histórico','monitoramento','pendente',172,108,88.6,120,'nao',null,'nenhuma',now()-interval '11 days',now()-interval '11 days'),
('RID002b','P002','Histórico','monitoramento','pendente',178,112,89.1,130,'nao',null,'nenhuma',now()-interval '9 days',now()-interval '9 days'),
('RID002c','P002','Histórico','monitoramento','pendente',165,102,88.0,110,'nao',null,'caminhada',now()-interval '7 days',now()-interval '7 days'),

-- P004 (idoso)
('RID004a','P004','Histórico','monitoramento','pendente',160,98,97.5,205,'nao',null,'nenhuma',now()-interval '12 days',now()-interval '12 days'),
('RID004b','P004','Histórico','monitoramento','pendente',168,104,98.2,215,'nao',null,'nenhuma',now()-interval '9 days',now()-interval '9 days'),
('RID004c','P004','Histórico','monitoramento','pendente',172,106,99.0,225,'nao',null,'nenhuma',now()-interval '6 days',now()-interval '6 days'),

-- P008 (idoso)
('RID008a','P008','Histórico','monitoramento','pendente',150,96,86.0,140,'nao',null,'caminhada',now()-interval '10 days',now()-interval '10 days'),
('RID008b','P008','Histórico','monitoramento','pendente',155,98,86.8,150,'nao',null,'nenhuma',now()-interval '8 days',now()-interval '8 days'),
('RID008c','P008','Histórico','monitoramento','pendente',148,94,85.9,135,'nao',null,'caminhada',now()-interval '5 days',now()-interval '5 days'),

-- P010 (idoso)
('RID010a','P010','Histórico','monitoramento','pendente',170,106,93.5,145,'nao',null,'nenhuma',now()-interval '12 days',now()-interval '12 days'),
('RID010b','P010','Histórico','monitoramento','pendente',175,110,94.1,155,'nao',null,'nenhuma',now()-interval '8 days',now()-interval '8 days'),
('RID010c','P010','Histórico','monitoramento','pendente',168,104,92.8,138,'nao',null,'caminhada',now()-interval '5 days',now()-interval '5 days'),

-- P012 (idoso)
('RID012a','P012','Histórico','monitoramento','pendente',158,102,99.0,230,'nao',null,'nenhuma',now()-interval '11 days',now()-interval '11 days'),
('RID012b','P012','Histórico','monitoramento','pendente',162,106,100.1,245,'nao',null,'nenhuma',now()-interval '7 days',now()-interval '7 days'),
('RID012c','P012','Histórico','monitoramento','pendente',155,100,98.7,220,'nao',null,'nenhuma',now()-interval '4 days',now()-interval '4 days'),

-- P031 (idoso)
('RID031a','P031','Histórico','monitoramento','pendente',180,118,93.2,125,'nao',null,'nenhuma',now()-interval '10 days',now()-interval '10 days'),
('RID031b','P031','Histórico','monitoramento','pendente',176,114,92.6,120,'nao',null,'nenhuma',now()-interval '6 days',now()-interval '6 days'),
('RID031c','P031','Histórico','monitoramento','pendente',182,120,93.8,130,'nao',null,'nenhuma',now()-interval '3 days',now()-interval '3 days')
ON CONFLICT (registro_id) DO NOTHING;

-- 9. GARANTIR UM REGISTRO PARA TODOS OS PERFIS (fallback)
INSERT INTO registros (
  registro_id, patient_id, texto, tipo, status,
  pa_sistolica, pa_diastolica, peso_kg, glicemia_mg,
  gestante, gestacao_semanas, atividade_fisica, created_at, updated_at
)
SELECT
  'RDEF-' || p.patient_id,
  p.patient_id,
  'Registro básico',
  'monitoramento',
  'pendente',
  128,
  82,
  70.0,
  105,
  'nao',
  NULL,
  'caminhada',
  now() - interval '1 day',
  now() - interval '1 day'
FROM perfis p
WHERE NOT EXISTS (
  SELECT 1 FROM registros r WHERE r.patient_id = p.patient_id
)
ON CONFLICT (registro_id) DO NOTHING;
