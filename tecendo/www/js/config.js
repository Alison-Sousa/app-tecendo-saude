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
  perfil:'++id,patient_id,synced, nome, cpf, nascimento, regiao, ubs_referencia, genero, raca, endereco, telefone, escolaridade, profissao, mora_sozinho, acs_responsavel, hipertensao, diabetes, dependencias, tempo_vicio, altura, peso_inicial, enxerga_bem, consulta_oftalmo, uso_medicacoes, atividade_fisica, freq_atividade, tipo_atividade, meta_peso, meta_glicemia, meta_pa_min, meta_pa_max',
  registros:'++id,registroId,patient_id,deviceId,createdAt,updatedAt,status,synced',
  midias:'++id,registroId,name,type,synced'
});
db.version(3).stores({
  perfil:'++id,patient_id,synced,nome,cpf,nascimento,regiao,foto_url,ubs_referencia,genero,raca,endereco,telefone,escolaridade,profissao,mora_sozinho,acs_responsavel,hipertensao,diabetes,dependencias,tempo_vicio,altura,peso_inicial,enxerga_bem,consulta_oftalmo,uso_medicacoes,atividade_fisica,freq_atividade,tipo_atividade,meta_peso,meta_glicemia,meta_pa_min,meta_pa_max',
  registros:'++id,registroId,patient_id,deviceId,createdAt,updatedAt,status,synced',
  midias:'++id,registroId,name,type,synced',
  medicamentos: '++id,medicationId,patient_id,synced,tipo_medicamento,nome_medicamento,dosagem,horarios,data_prescricao,data_dispensacao,data_inicio,data_termino,ativo'
}).upgrade(tx => {
    return tx.table('perfil').toCollection().modify(p => { if(!p.foto_url) p.foto_url = ''; });
});

db.version(4).stores({
  perfil:'++id,patient_id,synced,nome,cpf,nascimento,regiao,foto_url,ubs_referencia,genero,raca,endereco,telefone,escolaridade,profissao,mora_sozinho,mora_companheiro,tem_filhos,qtd_filhos,filhos_detalhes,vacinas_criancas_status,vacinas_criancas_data,acs_responsavel,hipertensao,diabetes,dependencias,tempo_vicio,altura,peso_inicial,enxerga_bem,consulta_oftalmo,uso_medicacoes,atividade_fisica,freq_atividade,tipo_atividade,meta_peso,meta_glicemia,meta_pa_min,meta_pa_max',
  registros:'++id,registroId,patient_id,deviceId,createdAt,updatedAt,status,synced',
  midias:'++id,registroId,name,type,synced',
  medicamentos: '++id,medicationId,patient_id,synced,tipo_medicamento,nome_medicamento,dosagem,horarios,data_prescricao,data_dispensacao,data_inicio,data_termino,ativo'
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
  perfil:'++id,patient_id,synced,nome,cpf,nascimento,regiao,foto_url,ubs_referencia,genero,raca,endereco,telefone,escolaridade,profissao,mora_sozinho,mora_companheiro,tem_filhos,qtd_filhos,qtd_filhos_outro,filho1_nome,filho1_idade,filho2_nome,filho2_idade,filho3_nome,filho3_idade,filho4_nome,filho4_idade,filho5_nome,filho5_idade,vacinas_criancas_status,vacinas_criancas_data,acs_responsavel,hipertensao,diabetes,dependencias,tempo_vicio,altura,peso_inicial,enxerga_bem,consulta_oftalmo,uso_medicacoes,atividade_fisica,freq_atividade,tipo_atividade,meta_peso,meta_glicemia,meta_pa_min,meta_pa_max',
  registros:'++id,registroId,patient_id,deviceId,createdAt,updatedAt,status,synced',
  midias:'++id,registroId,name,type,synced',
  medicamentos: '++id,medicationId,patient_id,synced,tipo_medicamento,nome_medicamento,dosagem,horarios,data_prescricao,data_dispensacao,data_inicio,data_termino,ativo'
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
  perfil:'++id,patient_id,synced,nome,cpf,nascimento,regiao,foto_url,ubs_referencia,genero,raca,endereco,telefone,escolaridade,profissao,mora_sozinho,mora_companheiro,tem_filhos,qtd_filhos,filhos_detalhes,vacinas_criancas_status,vacinas_criancas_data,acs_responsavel,hipertensao,diabetes,dependencias,tempo_vicio,altura,peso_inicial,enxerga_bem,consulta_oftalmo,uso_medicacoes,atividade_fisica,freq_atividade,tipo_atividade,meta_peso,meta_glicemia,meta_pa_min,meta_pa_max',
  registros:'++id,registroId,patient_id,deviceId,createdAt,updatedAt,status,synced',
  midias:'++id,registroId,name,type,synced',
  medicamentos: '++id,medicationId,patient_id,synced,tipo_medicamento,nome_medicamento,dosagem,horarios,data_prescricao,data_dispensacao,data_inicio,data_termino,ativo'
}).upgrade(tx => {
  return tx.table('perfil').toCollection().modify(p => {
    if(!p.filhos_detalhes) p.filhos_detalhes = p.filhos_detalhes || '';
  });
});

db.version(7).stores({
  perfil:'++id,patient_id,synced,nome,cpf,nascimento,regiao,foto_url,ubs_referencia,genero,raca,endereco,telefone,escolaridade,profissao,mora_sozinho,mora_companheiro,tem_filhos,qtd_filhos,filhos_json,acs_responsavel,hipertensao,diabetes,dependencias,tempo_vicio,altura,peso_inicial,enxerga_bem,consulta_oftalmo,uso_medicacoes,atividade_fisica,freq_atividade,tipo_atividade,meta_peso,meta_glicemia,meta_pa_min,meta_pa_max',
  registros:'++id,registroId,patient_id,deviceId,createdAt,updatedAt,status,synced',
  midias:'++id,registroId,name,type,synced',
  medicamentos: '++id,medicationId,patient_id,synced,tipo_medicamento,nome_medicamento,dosagem,horarios,data_prescricao,data_dispensacao,data_inicio,data_termino,ativo'
}).upgrade(tx => {
  return tx.table('perfil').toCollection().modify(p => {
    if(!p.filhos_json) p.filhos_json = p.filhos_json || '';
  });
});

// Listas de referência
var LISTA_UBS = ["UBS Antônio Evangelista", "UBS Boa Esperança", "UBS Divinópolis", "UBS Márcio Marinho", "UBS Haroldo Martins", "UBS Maria Bibiana da Silva", "UBS Nadime Miranda", "UBS Neli Loeblein", "UBS Vicente Alves da Silva"];
var LISTA_REGIOES = ["Santarém", "Belterra", "Mojuí dos Campos", "Alenquer", "Curuá", "Óbidos", "Oriximiná", "Terra Santa", "Faro", "Juruti", "Monte Alegre", "Almeirim", "Prainha"];
var LISTA_ACS = ["Acsa Kelly Gelio de Sá Lucena","Adriano Grings de Abreu","Cleonice Fabiano","Cleudes Meireles do Prado","Daniella de Almeida Santos","Edvânia Barbosa Sousa","Eliane Sousa Matos","Eliselma Alves Barreto","Elizângela Guedes Moura","Érica Sousa Scalabrim","Erika Sousa Duarte","Francisca Deneide França da Silva","Glaucione Santos Brito","Lourdes Dallabrida Rech","Luzineide Brito dos Santos","Marisane Aparecida Facioni","Paulo Afonso Borges da Silva","Raimunda de Souza Brandão","Robson Lima de Oliveira","Silvana Cardoso Ott","Silvana de Sousa Silva","Silvana Ferreira de Almeida","Vânea Pereira Scalabrin","Antonio Benigno de Freita","Antonio Pereira Correa","Auzenira Carvalho Cunha","Célia Alves Cruz","Elzana Lopes de Castro","Eudilene Vitor Gomes Matos","Evando Oliveira Santos","Fabiana Gomes Peixoto","Geizeane Maria das G. Sales","Genival Rodrigues Marinho","Hosana Lopes de Castro","Josias Martins de Oliveira","Léia de Souza Alves","Maria da Conceição dos Santos Ribeiro","Maria de Andrade Lima","Maria Elismar Bezerra Barbosa","Rita Delmondes Ferreira","Valdemir Machado de Alegor","Alzilene Braga","Ariane do Nascimento da Silva","Claudiléia de Sousa Castro","Edi Alves de Barros","Elaine Soares de Sousa","Ivanete Teixeira Silva","Ivonete Henz","Natividade Pereira de Aguiar","Regilene Hecki da Costa","Jackeline Paiva Batista","Juliana Lisboa","Aucineia Moreira Galvão","Edicínia Rabelo Lourido","Katya Cruz de Sousa","Regiane Lira da Silva","Cláudio José Gonçalves Marques","Elinete Cunha de Sousa","Hiranildes Ramos Pereira","Joelma Costa Castro","José Antonio Sousa de Menezes","Manoel Edinaldo Rodrigues Oliveira","Márcio José Oliveira Figueira","Maria de Lourdes Pinto Costa","Maria Selma Figueira Costa","Mariane Ferreira Castro","Nelma Isabel Marinho Figueira","Orlandino Manoel dos Santos Costa","Vaneila de Siqueira Gamboa","Claudenira Pena Viegas","Jacymar Silva de Brito","Maria Gracinete Lima Fróes","Mariza Damião Lopes","Ana Célia de Oliveira","Benedito Neris dos Santos","Celina de Sousa","Cícera Maria da Silva","Eliana Carvalho da Silva","Jacilene da Silva Oliveira","Jucineide da Silva Farias","Leidaiane da Silva Bentes","Lucia de Fátima Farias","Luciana da Silva Santos","Luciene da Silva Santos","Manoel Messias da Silva","Maria de Nazaré Rodrigues da Silva","Maria do Socorro da Silva","Maria Liduina de Sousa","Marilene de Sousa Santos","Meire Luci dos Santos Oliveira","Mirian dos Santos Oliveira","Neuza de Fátima Alves da Silva","Rosangela Maria da Silva","Rosinete da Silva Santos","Sandra da Silva Rebelo","Silvia Helena de Oliveira","Simone da Silva Bentes","Valdenice da Silva dos Santos","Valdete da Silva Costa","Vera Lúcia de Sousa Castro"];

// Roster de profissionais
var PROFISSIONAL_ROSTER = [
  { municipio: 'Almeirim', ubs: 'Coordenador(a)', enfermeira: 'Jennifer Santos (coord)' },
  { municipio: 'Almeirim', ubs: 'UBS Enf Márcio Marinho', enfermeira: 'Odineth Serrao de Souza' },
  { municipio: 'Almeirim', ubs: 'UBS Nadime', enfermeira: 'Mayare Freitas' },
  { municipio: 'Jacareacanga', ubs: 'UBS São Francisco', enfermeira: 'Cássia Rayana Queiroz Lauer' },
  { municipio: 'Jacareacanga', ubs: 'UBS Alto Tapajos', enfermeira: 'Laís Akai Barbosa' },
  { municipio: 'Prainha', ubs: 'Coordenador(a)', enfermeira: 'Eliziane Moraes Nascimento (coord)' },
  { municipio: 'Prainha', ubs: 'ESF São Sebastião', enfermeira: 'Benezaidi Furtado Magno' },
  { municipio: 'Prainha', ubs: 'ESF Santa Maria do Uruara', enfermeira: 'Naziane Oliveira Lira' },
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
    audio: 'Hipertensao.mp3'
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
