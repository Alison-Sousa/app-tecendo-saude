// ================================================
// TECENDO SAÚDE - CONFIGURAÇÕES E CONSTANTES
// ================================================

// Configuração do Supabase
var env = window.__ENV || {};
var SUPABASE_URL = env.SUPABASE_URL || env.SUPABASE_DATABASE_URL || env.VITE_SUPABASE_URL || env.VITE_SUPABASE_DATABASE_URL || '__SUPABASE_URL__';
var SUPABASE_KEY = env.SUPABASE_KEY || env.SUPABASE_ANON_KEY || env.VITE_SUPABASE_KEY || env.VITE_SUPABASE_ANON_KEY || '__SUPABASE_KEY__';
var SUPABASE_CONFIG_MISSING = !SUPABASE_URL || !SUPABASE_KEY || SUPABASE_URL.startsWith('__') || SUPABASE_KEY.startsWith('__');
var supabase = SUPABASE_CONFIG_MISSING ? null : window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Database IndexedDB (Dexie)
var db = new Dexie('TecendoSaudeDB_V22_Fixed');
db.version(1).stores({
  perfil:'++id,patient_id,synced, nome, cpf, nascimento, regiao, ubs_referencia, genero, raca, endereco, telefone, escolaridade, profissao, mora_sozinho, acs_responsavel, hipertensao, diabetes, dependencias, tempo_dependencia, altura, peso_inicial, enxerga_bem, consulta_oftalmo, uso_medicacoes, atividade_fisica, freq_atividade, tipo_atividade, meta_peso, meta_glicemia, meta_pa_min, meta_pa_max',
  registros:'++id,registro_id,patient_id,device_id,created_at,updated_at,status,synced',
  midias:'++id,registro_id,name,type,synced'
});
db.version(3).stores({
  perfil:'++id,patient_id,synced,nome,cpf,nascimento,regiao,foto_url,ubs_referencia,genero,raca,endereco,telefone,escolaridade,profissao,mora_sozinho,acs_responsavel,hipertensao,diabetes,dependencias,tempo_dependencia,altura,peso_inicial,enxerga_bem,consulta_oftalmo,uso_medicacoes,atividade_fisica,freq_atividade,tipo_atividade,meta_peso,meta_glicemia,meta_pa_min,meta_pa_max',
  registros:'++id,registro_id,patient_id,device_id,created_at,updated_at,status,synced',
  midias:'++id,registro_id,name,type,synced',
  medicamentos: '++id,medication_id,patient_id,synced,tipo_medicamento,nome_medicamento,dosagem,horarios,data_prescricao,data_dispensacao,data_inicio,data_termino,ativo'
}).upgrade(tx => {
    return tx.table('perfil').toCollection().modify(p => { if(!p.foto_url) p.foto_url = ''; });
});

db.version(4).stores({
  perfil:'++id,patient_id,synced,nome,cpf,nascimento,regiao,foto_url,ubs_referencia,genero,raca,endereco,telefone,escolaridade,profissao,mora_sozinho,mora_companheiro,tem_filhos,qtd_filhos,filhos_detalhes,vacinas_criancas_status,vacinas_criancas_data,acs_responsavel,hipertensao,diabetes,dependencias,tempo_dependencia,altura,peso_inicial,enxerga_bem,consulta_oftalmo,uso_medicacoes,atividade_fisica,freq_atividade,tipo_atividade,meta_peso,meta_glicemia,meta_pa_min,meta_pa_max',
  registros:'++id,registro_id,patient_id,device_id,created_at,updated_at,status,synced',
  midias:'++id,registro_id,name,type,synced',
  medicamentos: '++id,medication_id,patient_id,synced,tipo_medicamento,nome_medicamento,dosagem,horarios,data_prescricao,data_dispensacao,data_inicio,data_termino,ativo'
}).upgrade(tx => {
  return tx.table('perfil').toCollection().modify(p => {
    if(!p.mora_companheiro) p.mora_companheiro = p.mora_companheiro || '';
    if(!p.tem_filhos) p.tem_filhos = p.tem_filhos || '';
    if(!p.qtd_filhos) p.qtd_filhos = p.qtd_filhos || '';
    if(!p.vacinas_criancas_status) p.vacinas_criancas_status = p.vacinas_criancas_status || '';
    if(!p.vacinas_criancas_data) p.vacinas_criancas_data = p.vacinas_criancas_data || '';
  });
});

db.version(5).stores({
  perfil:'++id,patient_id,synced,nome,cpf,nascimento,regiao,foto_url,ubs_referencia,genero,raca,endereco,telefone,escolaridade,profissao,mora_sozinho,mora_companheiro,tem_filhos,qtd_filhos,qtd_filhos_outro,filho1_nome,filho1_idade,filho2_nome,filho2_idade,filho3_nome,filho3_idade,filho4_nome,filho4_idade,filho5_nome,filho5_idade,vacinas_criancas_status,vacinas_criancas_data,acs_responsavel,hipertensao,diabetes,dependencias,tempo_dependencia,altura,peso_inicial,enxerga_bem,consulta_oftalmo,uso_medicacoes,atividade_fisica,freq_atividade,tipo_atividade,meta_peso,meta_glicemia,meta_pa_min,meta_pa_max',
  registros:'++id,registro_id,patient_id,device_id,created_at,updated_at,status,synced',
  midias:'++id,registro_id,name,type,synced',
  medicamentos: '++id,medication_id,patient_id,synced,tipo_medicamento,nome_medicamento,dosagem,horarios,data_prescricao,data_dispensacao,data_inicio,data_termino,ativo'
}).upgrade(tx => {
  return tx.table('perfil').toCollection().modify(p => {
    if(!p.qtd_filhos_outro) p.qtd_filhos_outro = p.qtd_filhos_outro || '';
    if(!p.filho1_nome) p.filho1_nome = p.filho1_nome || '';
    if(!p.filho1_idade) p.filho1_idade = p.filho1_idade || '';
    if(!p.filho2_nome) p.filho2_nome = p.filho2_nome || '';
    if(!p.filho2_idade) p.filho2_idade = p.filho2_idade || '';
    if(!p.filho3_nome) p.filho3_nome = p.filho3_nome || '';
    if(!p.filho3_idade) p.filho3_idade = p.filho3_idade || '';
    if(!p.filho4_nome) p.filho4_nome = p.filho4_nome || '';
    if(!p.filho4_idade) p.filho4_idade = p.filho4_idade || '';
    if(!p.filho5_nome) p.filho5_nome = p.filho5_nome || '';
    if(!p.filho5_idade) p.filho5_idade = p.filho5_idade || '';
  });
});

db.version(6).stores({
  perfil:'++id,patient_id,synced,nome,cpf,nascimento,regiao,foto_url,ubs_referencia,genero,raca,endereco,telefone,escolaridade,profissao,mora_sozinho,mora_companheiro,tem_filhos,qtd_filhos,filhos_detalhes,vacinas_criancas_status,vacinas_criancas_data,acs_responsavel,hipertensao,diabetes,dependencias,tempo_dependencia,altura,peso_inicial,enxerga_bem,consulta_oftalmo,uso_medicacoes,atividade_fisica,freq_atividade,tipo_atividade,meta_peso,meta_glicemia,meta_pa_min,meta_pa_max',
  registros:'++id,registro_id,patient_id,device_id,created_at,updated_at,status,synced',
  midias:'++id,registro_id,name,type,synced',
  medicamentos: '++id,medication_id,patient_id,synced,tipo_medicamento,nome_medicamento,dosagem,horarios,data_prescricao,data_dispensacao,data_inicio,data_termino,ativo'
}).upgrade(tx => {
  return tx.table('perfil').toCollection().modify(p => {
    if(!p.filhos_detalhes) p.filhos_detalhes = p.filhos_detalhes || '';
  });
});

db.version(7).stores({
  perfil:'++id,patient_id,synced,nome,cpf,nascimento,regiao,foto_url,ubs_referencia,genero,raca,endereco,telefone,escolaridade,profissao,mora_sozinho,mora_companheiro,tem_filhos,qtd_filhos,filhos_json,acs_responsavel,hipertensao,diabetes,dependencias,tempo_dependencia,altura,peso_inicial,enxerga_bem,consulta_oftalmo,uso_medicacoes,atividade_fisica,freq_atividade,tipo_atividade,meta_peso,meta_glicemia,meta_pa_min,meta_pa_max',
  registros:'++id,registro_id,patient_id,device_id,created_at,updated_at,status,synced',
  midias:'++id,registro_id,name,type,synced',
  medicamentos: '++id,medication_id,patient_id,synced,tipo_medicamento,nome_medicamento,dosagem,horarios,data_prescricao,data_dispensacao,data_inicio,data_termino,ativo'
}).upgrade(tx => {
  return tx.table('perfil').toCollection().modify(p => {
    if(!p.filhos_json) p.filhos_json = p.filhos_json || '';
  });
});

// Listas de referência
var LISTA_UBS = ["UBS Antônio Evangelista", "UBS Boa Esperança", "UBS Divinópolis", "UBS Paranã das Velhas", "UBS Haroldo Martins", "UBS Maria Bibiana da Silva", "UBS Nadime Miranda", "UBS Neli Loeblein", "UBS Vicente Alves da Silva", "UBS São Sebastião", "UBS Santa Maria do Uruará", "UBS São Francisco", "UBS Alto Tapajós", "UBS Arapixuna"];
var LISTA_REGIOES = ["Santarém", "Belterra", "Mojuí dos Campos", "Alenquer", "Curuá", "Óbidos", "Oriximiná", "Terra Santa", "Faro", "Juruti", "Monte Alegre", "Almeirim", "Prainha", "Rurópolis", "Trairão", "Jacareacanga"];
var LISTA_ACS = ["Acsa Kelly Gelio de Sá Lucena","Adriana Pedroso Marques","Adriano Grings de Abreu","Albanira dos Santos","Alcione Castilho Magno dos Santos","Alcione Pereira dos Santos","Aldely de Andrade Benicio","Aline de Souza Braga","Alzilene Braga","Ana Célia de Oliveira","Ana Cristina dos Santos Cerqueira","Andrea de Souza Fernandes","Andrelina Fernandes da Silva","Angélica Carneiro Rocha","Antonio Benigno de Freita","Antonio Marques de Araújo Neto","Antonio Pereira Correa","Ariane do Nascimento da Silva","Aucineia Moreira Galvão","Auzenira Carvalho Cunha","Benedito Neris dos Santos","Carlos Alves Cardoso","Celina de Sousa","Célia Alves Cruz","Cícera Maria da Silva","Cirlea Batista Nogueira","Claudenira Pena Viegas","Claudiane Nayara da Costa Guedes","Claudiléia de Sousa Castro","Cláudio José Gonçalves Marques","Clebson da Silva Freitas","Cleonice Fabiano","Cleudes Meireles do Prado","Cristiane Palheta da Cruz","Cristine Reichembak Campos","Daniel Araújo Borges","Daniel Carlos de Jesus Lopes","Daniella de Almeida Santos","Daniele da Silva e Silva","Darliene da Silva Sanches","Dineia da Paixão Perna","Dirley Souza","Edi Alves de Barros","Edicínia Rabelo Lourido","Edirrone Pereira da Silva","Edu da Silva Queiroz","Edvânia Barbosa Sousa","Elaine Soares de Sousa","Eliana Carvalho da Silva","Eliane Palhano","Eliane Sousa Matos","Elinete Cunha de Sousa","Eliselma Alves Barreto","Elizabel Silva Pinho","Elizângela Guedes Moura","Elmazia das Graças Amorim Esquerdo","Elzana Lopes de Castro","Érica Sousa Scalabrim","Erika Sousa Duarte","Eudilene Vitor Gomes Matos","Evando Oliveira Santos","Fabiana Gomes Peixoto","Francisca Deneide França da Silva","Gabrielle Pinheiro Serrão","Geizeane Maria das G. Sales","Gelciane Moraes Corrêa","Genival Rodrigues Marinho","Geonara Xavier da Silva Matos","Glaucione Santos Brito","Hiltamara Ribeiro Lima","Hiranildes Ramos Pereira","Hosana Lopes de Castro","Iranete da Paixão Silva de Souza","Ivanete Teixeira Silva","Ivonete Henz","Jackeline Paiva Batista","Jacilene da Silva Oliveira","Jacymar Silva de Brito","Janete Cardoso Sousa","Jarlison Alvarenga da Rocha","Jessica Aparecida Frederico de Souza","Joelma Costa Castro","Joelma Miranda Lima","Jonefa Perna da Silva","José Antonio Sousa de Menezes","Josiane da Silva Macuyama","Josias Martins de Oliveira","Jucinalda Coelho da Fonseca","Jucineide da Silva Farias","Juliana Lisboa","Juliana Magno de Souza","Katya Cruz de Sousa","Kelmira Ferreira dos Santos","Larissa Dos Santos Pinto","Laydiane Miranda do Nascimento","Leidaiane da Silva Bentes","Léia de Souza Alves","Lourdes Dallabrida Rech","Lucia de Fátima Farias","Luciana da Silva Santos","Luciene da Silva Santos","Luzineide Brito dos Santos","Mábrison Sobrinho da Silva","Manoel Edinaldo Rodrigues Oliveira","Manoel Messias da Silva","Márcio José Oliveira Figueira","Maria da Conceição dos Santos Ribeiro","Maria da Conceição Serra Sarges","Maria das Graças Pereira Cruz","Maria de Andrade Lima","Maria de Lourdes Pinto Costa","Maria de Nazaré Rodrigues da Silva","Maria do Socorro da Silva","Maria Edileuza Aragão Ferreira","Maria Elismar Bezerra Barbosa","Maria Gracinete Lima Fróes","Maria Ivanete Sarraff dos Santos","Maria Liduina de Sousa","Maria Selma Figueira Costa","Maria Sofia Ferreira Lacerda","Mariane Ferreira Castro","Marilene de Sousa Santos","Marisane Aparecida Facioni","Mariza Damião Lopes","Meire Luci dos Santos Oliveira","Mikelle Silva Ferreira","Mirian dos Santos Oliveira","Natividade Pereira de Aguiar","Nelma Isabel Marinho Figueira","Neuza de Fátima Alves da Silva","Noelma Santos de Sousa","Odomaria Pires dos Anjos","Orlandino Manoel dos Santos Costa","Paulo Afonso Borges da Silva","Paulo Anderson Munduruku Bastos","Raimunda de Souza Brandão","Raisa das Graças Castro","Rana Pinheiro Santos","Regiane Lira da Silva","Regilene Hecki da Costa","Rita Delmondes Ferreira","Robson Lima de Oliveira","Rosangela Maria da Silva","Rosinete da Silva Santos","Rudilene Pantoja de Araujo","Sabrina Gonzaga de Jesus","Sandra da Silva Rebelo","Sediney Dias Marques","Silvana Cardoso Ott","Silvana de Sousa Silva","Silvana Ferreira de Almeida","Silvana Pena Medeiros","Silvia Helena de Oliveira","Simone Araújo de Oliveira Bizerril","Simone da Silva Bentes","Suely Silva Bastos","Telma Perna Costa","Valdemir Machado de Alegor","Valdenice da Silva dos Santos","Valdete da Silva Costa","Vaneila de Siqueira Gamboa","Vânea Pereira Scalabrin","Vera Lúcia de Sousa Castro","Wandra Jame Pereira Torres","Wangela Paiva Batista","Zivanildo Rodrigues Castro"];

// Mapeamento ACS -> Município (para filtro cascata)
var MAPA_ACS_MUNICIPIO = {
  "Ana Célia de Oliveira":"Almeirim","Claudenira Pena Viegas":"Almeirim","Cristiane Palheta da Cruz":"Almeirim","Daniel Araújo Borges":"Almeirim","Dineia da Paixão Perna":"Almeirim","Dirley Souza":"Almeirim","Gabrielle Pinheiro Serrão":"Almeirim","Jacymar Silva de Brito":"Almeirim","Jucinalda Coelho da Fonseca":"Almeirim","Maria da Conceição Serra Sarges":"Almeirim","Maria das Graças Pereira Cruz":"Almeirim","Maria Gracinete Lima Fróes":"Almeirim","Maria Ivanete Sarraff dos Santos":"Almeirim","Maria Sofia Ferreira Lacerda":"Almeirim","Mariza Damião Lopes":"Almeirim","Noelma Santos de Sousa":"Almeirim","Raisa das Graças Castro":"Almeirim","Sabrina Gonzaga de Jesus":"Almeirim","Sediney Dias Marques":"Almeirim","Silvana Pena Medeiros":"Almeirim","Suely Silva Bastos":"Almeirim","Wangela Paiva Batista":"Almeirim","Zivanildo Rodrigues Castro":"Almeirim",
  "Albanira dos Santos":"Jacareacanga","Aline de Souza Braga":"Jacareacanga","Angélica Carneiro Rocha":"Jacareacanga","Carlos Alves Cardoso":"Jacareacanga","Cirlea Batista Nogueira":"Jacareacanga","Cristine Reichembak Campos":"Jacareacanga","Daniel Carlos de Jesus Lopes":"Jacareacanga","Eliane Palhano":"Jacareacanga","Geonara Xavier da Silva Matos":"Jacareacanga","Hiltamara Ribeiro Lima":"Jacareacanga","Iranete da Paixão Silva de Souza":"Jacareacanga","Janete Cardoso Sousa":"Jacareacanga","Jessica Aparecida Frederico de Souza":"Jacareacanga","Josiane da Silva Macuyama":"Jacareacanga","Laydiane Miranda do Nascimento":"Jacareacanga","Mábrison Sobrinho da Silva":"Jacareacanga","Mikelle Silva Ferreira":"Jacareacanga","Paulo Anderson Munduruku Bastos":"Jacareacanga","Simone Araújo de Oliveira Bizerril":"Jacareacanga",
  "Adriana Pedroso Marques":"Prainha","Alcione Castilho Magno dos Santos":"Prainha","Alcione Pereira dos Santos":"Prainha","Aldely de Andrade Benicio":"Prainha","Ana Cristina dos Santos Cerqueira":"Prainha","Andrea de Souza Fernandes":"Prainha","Andrelina Fernandes da Silva":"Prainha","Antonio Marques de Araújo Neto":"Prainha","Claudiane Nayara da Costa Guedes":"Prainha","Clebson da Silva Freitas":"Prainha","Daniele da Silva e Silva":"Prainha","Darliene da Silva Sanches":"Prainha","Edirrone Pereira da Silva":"Prainha","Edu da Silva Queiroz":"Prainha","Elizabel Silva Pinho":"Prainha","Elmazia das Graças Amorim Esquerdo":"Prainha","Gelciane Moraes Corrêa":"Prainha","Jarlison Alvarenga da Rocha":"Prainha","Joelma Miranda Lima":"Prainha","Jonefa Perna da Silva":"Prainha","Juliana Magno de Souza":"Prainha","Kelmira Ferreira dos Santos":"Prainha","Larissa Dos Santos Pinto":"Prainha","Maria Edileuza Aragão Ferreira":"Prainha","Odomaria Pires dos Anjos":"Prainha","Rana Pinheiro Santos":"Prainha","Rudilene Pantoja de Araujo":"Prainha","Telma Perna Costa":"Prainha","Wandra Jame Pereira Torres":"Prainha",
  "Acsa Kelly Gelio de Sá Lucena":"Rurópolis","Adriano Grings de Abreu":"Rurópolis","Antonio Benigno de Freita":"Rurópolis","Auzenira Carvalho Cunha":"Rurópolis","Célia Alves Cruz":"Rurópolis","Cleudes Meireles do Prado":"Rurópolis","Cleonice Fabiano":"Rurópolis","Daniella de Almeida Santos":"Rurópolis","Edvânia Barbosa Sousa":"Rurópolis","Eliane Sousa Matos":"Rurópolis","Eliselma Alves Barreto":"Rurópolis","Elizângela Guedes Moura":"Rurópolis","Elzana Lopes de Castro":"Rurópolis","Érica Sousa Scalabrim":"Rurópolis","Erika Sousa Duarte":"Rurópolis","Eudilene Vitor Gomes Matos":"Rurópolis","Evando Oliveira Santos":"Rurópolis","Fabiana Gomes Peixoto":"Rurópolis","Francisca Deneide França da Silva":"Rurópolis","Geizeane Maria das G. Sales":"Rurópolis","Genival Rodrigues Marinho":"Rurópolis","Glaucione Santos Brito":"Rurópolis","Hosana Lopes de Castro":"Rurópolis","Josias Martins de Oliveira":"Rurópolis","Léia de Souza Alves":"Rurópolis","Lourdes Dallabrida Rech":"Rurópolis","Luzineide Brito dos Santos":"Rurópolis","Maria da Conceição dos Santos Ribeiro":"Rurópolis","Maria de Andrade Lima":"Rurópolis","Maria Elismar Bezerra Barbosa":"Rurópolis","Marisane Aparecida Facioni":"Rurópolis","Paulo Afonso Borges da Silva":"Rurópolis","Raimunda de Souza Brandão":"Rurópolis","Rita Delmondes Ferreira":"Rurópolis","Robson Lima de Oliveira":"Rurópolis","Silvana Cardoso Ott":"Rurópolis","Silvana de Sousa Silva":"Rurópolis","Silvana Ferreira de Almeida":"Rurópolis","Valdemir Machado de Alegor":"Rurópolis","Vânea Pereira Scalabrin":"Rurópolis",
  "Aucineia Moreira Galvão":"Santarém","Cláudio José Gonçalves Marques":"Santarém","Edicínia Rabelo Lourido":"Santarém","Elinete Cunha de Sousa":"Santarém","Hiranildes Ramos Pereira":"Santarém","Joelma Costa Castro":"Santarém","José Antonio Sousa de Menezes":"Santarém","Katya Cruz de Sousa":"Santarém","Manoel Edinaldo Rodrigues Oliveira":"Santarém","Márcio José Oliveira Figueira":"Santarém","Maria de Lourdes Pinto Costa":"Santarém","Maria Selma Figueira Costa":"Santarém","Mariane Ferreira Castro":"Santarém","Nelma Isabel Marinho Figueira":"Santarém","Orlandino Manoel dos Santos Costa":"Santarém","Regiane Lira da Silva":"Santarém","Vaneila de Siqueira Gamboa":"Santarém",
  "Ariane do Nascimento da Silva":"Trairão","Claudiléia de Sousa Castro":"Trairão","Edi Alves de Barros":"Trairão","Elaine Soares de Sousa":"Trairão","Ivanete Teixeira Silva":"Trairão","Ivonete Henz":"Trairão","Jackeline Paiva Batista":"Trairão","Juliana Lisboa":"Trairão","Natividade Pereira de Aguiar":"Trairão","Regilene Hecki da Costa":"Trairão"
};
var getAcsByMunicipio = function(municipio) {
  if (!municipio) return LISTA_ACS;
  return LISTA_ACS.filter(function(nome) { return MAPA_ACS_MUNICIPIO[nome] === municipio; });
};

// Roster de profissionais
var PROFISSIONAL_ROSTER = [
  { municipio: 'Almeirim', ubs: 'Coordenador(a)', enfermeira: 'Jennifer Santos (coord)' },
  { municipio: 'Almeirim', ubs: 'UBS Paranã das Velhas', enfermeira: 'Odineth Serrao de Souza' },
  { municipio: 'Almeirim', ubs: 'UBS Nadime', enfermeira: 'Mayare Freitas' },
  { municipio: 'Jacareacanga', ubs: 'UBS São Francisco', enfermeira: 'Cássia Rayana Queiroz Lauer' },
  { municipio: 'Jacareacanga', ubs: 'UBS Alto Tapajos', enfermeira: 'Laís Akai Barbosa' },
  { municipio: 'Prainha', ubs: 'Coordenador(a)', enfermeira: 'Eliziane Moraes Nascimento (coord)' },
  { municipio: 'Prainha', ubs: 'UBS São Sebastião', enfermeira: 'Benezaidi Furtado Magno' },
  { municipio: 'Prainha', ubs: 'UBS Santa Maria do Uruará', enfermeira: 'Naziane Oliveira Lira' },
  { municipio: 'Rurópolis', ubs: 'Coordenador(a)', enfermeira: 'Elenilde Ferreira da Silva' },
  { municipio: 'Rurópolis', ubs: 'UBS Divinópolis', enfermeira: 'Jarliene Cruz' },
  { municipio: 'Rurópolis', ubs: 'UBS Neli Loeblein', enfermeira: 'Géssica Cristine de Oliveira Hermer' },
  { municipio: 'Santarém', ubs: 'Coordenador(a)', enfermeira: 'Ivana Pimentel da Silva (coord)' },
  { municipio: 'Santarém', ubs: 'UBS Arapixuna', enfermeira: 'Elenilza Soares Borges' },
  { municipio: 'Santarém', ubs: 'UBS Boa Esperança', enfermeira: 'Izadora Fernandes de Sousa Mendes' },
  { municipio: 'Trairão', ubs: 'UBS Vicente Alves da Silva', enfermeira: 'Ana Roberta de Almeida' },
  { municipio: 'Trairão', ubs: 'UBS Maria Bibiana da Silva', enfermeira: 'Maria Aparecida Santos Oliveira' }
];
var PROFISSIONAL_MUNICIPIOS = Array.from(new Set(PROFISSIONAL_ROSTER.map(item => item.municipio))).sort((a,b)=>a.localeCompare(b, 'pt-BR'));
var getUbsByMunicipio = (municipio) => Array.from(new Set(PROFISSIONAL_ROSTER.filter(item => item.municipio === municipio).map(item => item.ubs)));
var getEnfermeirasByMunicipioUbs = (municipio, ubs) => Array.from(new Set(PROFISSIONAL_ROSTER.filter(item => item.municipio === municipio && item.ubs === ubs).map(item => item.enfermeira)));

// Limites de saúde para classificação
var LIMITES_SAUDE = {
  PA: { OTIMA: 120, NORMAL: 130, ELEVADA: 140, ALTA: 160, CRITICA: 180 },
  GLICEMIA: { BAIXA: 70, NORMAL: 100, ELEVADA: 126, ALTA: 200, CRITICA: 250 }
};

// Conteúdo educativo
var LEARN_ITEMS = [
  {
    title: 'Idosos',
    kicker: 'Cuidado com pressão alta e diabetes',
    body: [
      'Em pessoas idosas, pressão alta e diabetes são comuns e precisam de cuidado constante.',
      'Pressão alta: meça sentado, braço apoiado, sem falar. Anote os valores e leve na UBS.',
      'Diabetes: lave as mãos, fure o dedo e anote o valor. Evite muito açúcar e beba água.',
      'Preencha sempre PA, peso e glicemia. Combine as metas com o ACS/equipe de saúde.',
      'Se sentir dor no peito, falta de ar, tontura forte ou visão turva, procure ajuda.'
    ],
    video: 'https://www.youtube.com/watch?v=B3sm1ey3VyI',
    audio: 'Hipertensão.mp3'
  },
  {
    title: 'Cuidados Infantis',
    kicker: 'Primeira infância: 0 a 6 anos',
    body: [
      'Criança pequena precisa de cuidado simples: comida saudável, água, sono e muito carinho.',
      'Vacinas em dia protegem contra doenças. Guarde o cartão e leve sempre na UBS.',
      'Se a criança tiver febre alta, vômito ou falta de ar, procure ajuda.',
      'Brincar, conversar e manter rotina ajudam no crescimento.'
    ],
    video: 'https://www.youtube.com/watch?v=YIbEctyZLgA',
    audio: 'Infancia.mp3'
  },
  {
    title: 'Gestação',
    kicker: 'Cuidados gerais durante a gestação',
    body: [
      'Faça o pré-natal e leve o cartão em todas as consultas.',
      'Coma bem: frutas, verduras e água. Evite álcool e cigarro.',
      'Se sentir dor forte, sangramento ou bebê mexer menos, procure a UBS ou hospital.',
      'Repouse, evite carregar peso e tome só remédio indicado pelo profissional.'
    ],
    video: 'https://www.youtube.com/watch?v=yAoDNAB_7BE',
    audio: 'Gestacao.mp3'
  }
];
