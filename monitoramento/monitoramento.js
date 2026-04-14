/**
* TECENDO SAÚDE - MONITORAMENTO DE PACIENTES
* Dashboard para profissionais de saúde
*/

// ============================================
// CONFIGURAÇÃO SUPABASE
// ============================================
const env = window.__ENV || {};
const SUPABASE_URL = env.SUPABASE_URL || env.VITE_SUPABASE_URL || '';
const SUPABASE_KEY = env.SUPABASE_KEY || env.VITE_SUPABASE_KEY || '';
var supabase = window.__supabaseClient || null;

// ============================================
// LISTAS DE REFERÊNCIA (espelho de config.js)
// ============================================
var LISTA_UBS = ["UBS Antônio Evangelista","UBS Boa Esperança","UBS Divinópolis","UBS Enf Márcio Marinho","UBS Haroldo Martins","UBS Maria Bibiana da Silva","UBS Nadime Miranda","UBS Neli Loeblein","UBS Vicente Alves da Silva","UBS São Sebastião","UBS Santa Maria do Uruará","UBS São Francisco","UBS Alto Tapajós","UBS Arapixuna"];
var LISTA_REGIOES = ["Santarém","Belterra","Mojuí dos Campos","Alenquer","Curuá","Óbidos","Oriximiná","Terra Santa","Faro","Juruti","Monte Alegre","Almeirim","Prainha","Rurópolis","Trairão","Jacareacanga"];
var LISTA_ACS = ["Acsa Kelly Gelio de Sá Lucena","Adriana Pedroso Marques","Adriano Grings de Abreu","Albanira dos Santos","Alcione Castilho Magno dos Santos","Alcione Pereira dos Santos","Aldely de Andrade Benicio","Aline de Souza Braga","Alzilene Braga","Ana Célia de Oliveira","Ana Cristina dos Santos Cerqueira","Andrea de Souza Fernandes","Andrelina Fernandes da Silva","Angélica Carneiro Rocha","Antonio Benigno de Freita","Antonio Marques de Araújo Neto","Antonio Pereira Correa","Ariane do Nascimento da Silva","Aucineia Moreira Galvão","Auzenira Carvalho Cunha","Benedito Neris dos Santos","Carlos Alves Cardoso","Celina de Sousa","Célia Alves Cruz","Cícera Maria da Silva","Cirlea Batista Nogueira","Claudenira Pena Viegas","Claudiane Nayara da Costa Guedes","Claudiléia de Sousa Castro","Cláudio José Gonçalves Marques","Clebson da Silva Freitas","Cleonice Fabiano","Cleudes Meireles do Prado","Cristiane Palheta da Cruz","Cristine Reichembak Campos","Daniel Araújo Borges","Daniel Carlos de Jesus Lopes","Daniella de Almeida Santos","Daniele da Silva e Silva","Darliene da Silva Sanches","Dineia da Paixão Perna","Dirley Souza","Edi Alves de Barros","Edicínia Rabelo Lourido","Edirrone Pereira da Silva","Edu da Silva Queiroz","Edvânia Barbosa Sousa","Elaine Soares de Sousa","Eliana Carvalho da Silva","Eliane Palhano","Eliane Sousa Matos","Elinete Cunha de Sousa","Eliselma Alves Barreto","Elizabel Silva Pinho","Elizângela Guedes Moura","Elmazia das Graças Amorim Esquerdo","Elzana Lopes de Castro","Érica Sousa Scalabrim","Erika Sousa Duarte","Eudilene Vitor Gomes Matos","Evando Oliveira Santos","Fabiana Gomes Peixoto","Francisca Deneide França da Silva","Gabrielle Pinheiro Serrão","Geizeane Maria das G. Sales","Gelciane Moraes Corrêa","Genival Rodrigues Marinho","Geonara Xavier da Silva Matos","Glaucione Santos Brito","Hiltamara Ribeiro Lima","Hiranildes Ramos Pereira","Hosana Lopes de Castro","Iranete da Paixão Silva de Souza","Ivanete Teixeira Silva","Ivonete Henz","Jackeline Paiva Batista","Jacilene da Silva Oliveira","Jacymar Silva de Brito","Janete Cardoso Sousa","Jarlison Alvarenga da Rocha","Jessica Aparecida Frederico de Souza","Joelma Costa Castro","Joelma Miranda Lima","Jonefa Perna da Silva","José Antonio Sousa de Menezes","Josiane da Silva Macuyama","Josias Martins de Oliveira","Jucinalda Coelho da Fonseca","Jucineide da Silva Farias","Juliana Lisboa","Juliana Magno de Souza","Katya Cruz de Sousa","Kelmira Ferreira dos Santos","Larissa Dos Santos Pinto","Laydiane Miranda do Nascimento","Leidaiane da Silva Bentes","Léia de Souza Alves","Lourdes Dallabrida Rech","Lucia de Fátima Farias","Luciana da Silva Santos","Luciene da Silva Santos","Luzineide Brito dos Santos","Mábrison Sobrinho da Silva","Manoel Edinaldo Rodrigues Oliveira","Manoel Messias da Silva","Márcio José Oliveira Figueira","Maria da Conceição dos Santos Ribeiro","Maria da Conceição Serra Sarges","Maria das Graças Pereira Cruz","Maria de Andrade Lima","Maria de Lourdes Pinto Costa","Maria de Nazaré Rodrigues da Silva","Maria do Socorro da Silva","Maria Edileuza Aragão Ferreira","Maria Elismar Bezerra Barbosa","Maria Gracinete Lima Fróes","Maria Ivanete Sarraff dos Santos","Maria Liduina de Sousa","Maria Selma Figueira Costa","Maria Sofia Ferreira Lacerda","Mariane Ferreira Castro","Marilene de Sousa Santos","Marisane Aparecida Facioni","Mariza Damião Lopes","Meire Luci dos Santos Oliveira","Mikelle Silva Ferreira","Mirian dos Santos Oliveira","Natividade Pereira de Aguiar","Nelma Isabel Marinho Figueira","Neuza de Fátima Alves da Silva","Noelma Santos de Sousa","Odomaria Pires dos Anjos","Orlandino Manoel dos Santos Costa","Paulo Afonso Borges da Silva","Paulo Anderson Munduruku Bastos","Raimunda de Souza Brandão","Raisa das Graças Castro","Rana Pinheiro Santos","Regiane Lira da Silva","Regilene Hecki da Costa","Rita Delmondes Ferreira","Robson Lima de Oliveira","Rosangela Maria da Silva","Rosinete da Silva Santos","Rudilene Pantoja de Araujo","Sabrina Gonzaga de Jesus","Sandra da Silva Rebelo","Sediney Dias Marques","Silvana Cardoso Ott","Silvana de Sousa Silva","Silvana Ferreira de Almeida","Silvana Pena Medeiros","Silvia Helena de Oliveira","Simone Araújo de Oliveira Bizerril","Simone da Silva Bentes","Suely Silva Bastos","Telma Perna Costa","Valdemir Machado de Alegor","Valdenice da Silva dos Santos","Valdete da Silva Costa","Vaneila de Siqueira Gamboa","Vânea Pereira Scalabrin","Vera Lúcia de Sousa Castro","Wandra Jame Pereira Torres","Wangela Paiva Batista","Zivanildo Rodrigues Castro"];
var MAPA_ACS_MUNICIPIO = {"Ana Célia de Oliveira":"Almeirim","Claudenira Pena Viegas":"Almeirim","Cristiane Palheta da Cruz":"Almeirim","Daniel Araújo Borges":"Almeirim","Dineia da Paixão Perna":"Almeirim","Dirley Souza":"Almeirim","Gabrielle Pinheiro Serrão":"Almeirim","Jacymar Silva de Brito":"Almeirim","Jucinalda Coelho da Fonseca":"Almeirim","Maria da Conceição Serra Sarges":"Almeirim","Maria das Graças Pereira Cruz":"Almeirim","Maria Gracinete Lima Fróes":"Almeirim","Maria Ivanete Sarraff dos Santos":"Almeirim","Maria Sofia Ferreira Lacerda":"Almeirim","Mariza Damião Lopes":"Almeirim","Noelma Santos de Sousa":"Almeirim","Raisa das Graças Castro":"Almeirim","Sabrina Gonzaga de Jesus":"Almeirim","Sediney Dias Marques":"Almeirim","Silvana Pena Medeiros":"Almeirim","Suely Silva Bastos":"Almeirim","Wangela Paiva Batista":"Almeirim","Zivanildo Rodrigues Castro":"Almeirim","Albanira dos Santos":"Jacareacanga","Aline de Souza Braga":"Jacareacanga","Angélica Carneiro Rocha":"Jacareacanga","Carlos Alves Cardoso":"Jacareacanga","Cirlea Batista Nogueira":"Jacareacanga","Cristine Reichembak Campos":"Jacareacanga","Daniel Carlos de Jesus Lopes":"Jacareacanga","Eliane Palhano":"Jacareacanga","Geonara Xavier da Silva Matos":"Jacareacanga","Hiltamara Ribeiro Lima":"Jacareacanga","Iranete da Paixão Silva de Souza":"Jacareacanga","Janete Cardoso Sousa":"Jacareacanga","Jessica Aparecida Frederico de Souza":"Jacareacanga","Josiane da Silva Macuyama":"Jacareacanga","Laydiane Miranda do Nascimento":"Jacareacanga","Mábrison Sobrinho da Silva":"Jacareacanga","Mikelle Silva Ferreira":"Jacareacanga","Paulo Anderson Munduruku Bastos":"Jacareacanga","Simone Araújo de Oliveira Bizerril":"Jacareacanga","Adriana Pedroso Marques":"Prainha","Alcione Castilho Magno dos Santos":"Prainha","Alcione Pereira dos Santos":"Prainha","Aldely de Andrade Benicio":"Prainha","Ana Cristina dos Santos Cerqueira":"Prainha","Andrea de Souza Fernandes":"Prainha","Andrelina Fernandes da Silva":"Prainha","Antonio Marques de Araújo Neto":"Prainha","Claudiane Nayara da Costa Guedes":"Prainha","Clebson da Silva Freitas":"Prainha","Daniele da Silva e Silva":"Prainha","Darliene da Silva Sanches":"Prainha","Edirrone Pereira da Silva":"Prainha","Edu da Silva Queiroz":"Prainha","Elizabel Silva Pinho":"Prainha","Elmazia das Graças Amorim Esquerdo":"Prainha","Gelciane Moraes Corrêa":"Prainha","Jarlison Alvarenga da Rocha":"Prainha","Joelma Miranda Lima":"Prainha","Jonefa Perna da Silva":"Prainha","Juliana Magno de Souza":"Prainha","Kelmira Ferreira dos Santos":"Prainha","Larissa Dos Santos Pinto":"Prainha","Maria Edileuza Aragão Ferreira":"Prainha","Odomaria Pires dos Anjos":"Prainha","Rana Pinheiro Santos":"Prainha","Rudilene Pantoja de Araujo":"Prainha","Telma Perna Costa":"Prainha","Wandra Jame Pereira Torres":"Prainha","Acsa Kelly Gelio de Sá Lucena":"Rurópolis","Adriano Grings de Abreu":"Rurópolis","Antonio Benigno de Freita":"Rurópolis","Auzenira Carvalho Cunha":"Rurópolis","Célia Alves Cruz":"Rurópolis","Cleudes Meireles do Prado":"Rurópolis","Cleonice Fabiano":"Rurópolis","Daniella de Almeida Santos":"Rurópolis","Edvânia Barbosa Sousa":"Rurópolis","Eliane Sousa Matos":"Rurópolis","Eliselma Alves Barreto":"Rurópolis","Elizângela Guedes Moura":"Rurópolis","Elzana Lopes de Castro":"Rurópolis","Érica Sousa Scalabrim":"Rurópolis","Erika Sousa Duarte":"Rurópolis","Eudilene Vitor Gomes Matos":"Rurópolis","Evando Oliveira Santos":"Rurópolis","Fabiana Gomes Peixoto":"Rurópolis","Francisca Deneide França da Silva":"Rurópolis","Geizeane Maria das G. Sales":"Rurópolis","Genival Rodrigues Marinho":"Rurópolis","Glaucione Santos Brito":"Rurópolis","Hosana Lopes de Castro":"Rurópolis","Josias Martins de Oliveira":"Rurópolis","Léia de Souza Alves":"Rurópolis","Lourdes Dallabrida Rech":"Rurópolis","Luzineide Brito dos Santos":"Rurópolis","Maria da Conceição dos Santos Ribeiro":"Rurópolis","Maria de Andrade Lima":"Rurópolis","Maria Elismar Bezerra Barbosa":"Rurópolis","Marisane Aparecida Facioni":"Rurópolis","Paulo Afonso Borges da Silva":"Rurópolis","Raimunda de Souza Brandão":"Rurópolis","Rita Delmondes Ferreira":"Rurópolis","Robson Lima de Oliveira":"Rurópolis","Silvana Cardoso Ott":"Rurópolis","Silvana de Sousa Silva":"Rurópolis","Silvana Ferreira de Almeida":"Rurópolis","Valdemir Machado de Alegor":"Rurópolis","Vânea Pereira Scalabrin":"Rurópolis","Aucineia Moreira Galvão":"Santarém","Cláudio José Gonçalves Marques":"Santarém","Edicínia Rabelo Lourido":"Santarém","Elinete Cunha de Sousa":"Santarém","Hiranildes Ramos Pereira":"Santarém","Joelma Costa Castro":"Santarém","José Antonio Sousa de Menezes":"Santarém","Katya Cruz de Sousa":"Santarém","Manoel Edinaldo Rodrigues Oliveira":"Santarém","Márcio José Oliveira Figueira":"Santarém","Maria de Lourdes Pinto Costa":"Santarém","Maria Selma Figueira Costa":"Santarém","Mariane Ferreira Castro":"Santarém","Nelma Isabel Marinho Figueira":"Santarém","Orlandino Manoel dos Santos Costa":"Santarém","Regiane Lira da Silva":"Santarém","Vaneila de Siqueira Gamboa":"Santarém","Ariane do Nascimento da Silva":"Trairão","Claudiléia de Sousa Castro":"Trairão","Edi Alves de Barros":"Trairão","Elaine Soares de Sousa":"Trairão","Ivanete Teixeira Silva":"Trairão","Ivonete Henz":"Trairão","Jackeline Paiva Batista":"Trairão","Juliana Lisboa":"Trairão","Natividade Pereira de Aguiar":"Trairão","Regilene Hecki da Costa":"Trairão"};
var PROFISSIONAL_ROSTER = [
  {municipio:'Almeirim',ubs:'Coordenador(a)',enfermeira:'Jennifer Santos (coord)'},
  {municipio:'Almeirim',ubs:'UBS Enf Márcio Marinho',enfermeira:'Odineth Serrao de Souza'},
  {municipio:'Almeirim',ubs:'UBS Nadime',enfermeira:'Mayare Freitas'},
  {municipio:'Jacareacanga',ubs:'UBS São Francisco',enfermeira:'Cássia Rayana Queiroz Lauer'},
  {municipio:'Jacareacanga',ubs:'UBS Alto Tapajos',enfermeira:'Laís Akai Barbosa'},
  {municipio:'Prainha',ubs:'Coordenador(a)',enfermeira:'Eliziane Moraes Nascimento (coord)'},
  {municipio:'Prainha',ubs:'UBS São Sebastião',enfermeira:'Benezaidi Furtado Magno'},
  {municipio:'Prainha',ubs:'UBS Santa Maria do Uruará',enfermeira:'Naziane Oliveira Lira'},
  {municipio:'Rurópolis',ubs:'Coordenador(a)',enfermeira:'Elenilde Ferreira da Silva'},
  {municipio:'Rurópolis',ubs:'UBS Divinópolis',enfermeira:'Jarliene Cruz'},
  {municipio:'Rurópolis',ubs:'UBS Neli Loeblein',enfermeira:'Géssica Cristine de Oliveira Hermer'},
  {municipio:'Santarém',ubs:'Coordenador(a)',enfermeira:'Ivana Pimentel da Silva (coord)'},
  {municipio:'Santarém',ubs:'UBS Arapixuna',enfermeira:'Elenilza Soares Borges'},
  {municipio:'Santarém',ubs:'UBS Boa Esperança',enfermeira:'Izadora Fernandes de Sousa Mendes'},
  {municipio:'Trairão',ubs:'UBS Vicente Alves da Silva',enfermeira:'Ana Roberta de Almeida'},
  {municipio:'Trairão',ubs:'UBS Maria Bibiana da Silva',enfermeira:'Maria Aparecida Santos Oliveira'}
];
var getUbsByMunicipio = function(municipio) { return Array.from(new Set(PROFISSIONAL_ROSTER.filter(function(i){return i.municipio===municipio;}).map(function(i){return i.ubs;}))); };
var getAcsByMunicipio = function(municipio) { if(!municipio) return LISTA_ACS; return LISTA_ACS.filter(function(nome){return MAPA_ACS_MUNICIPIO[nome]===municipio;}); };

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
const rid = uuidv4();


// Aceita tanto formato antigo (eyJ...) quanto novo (sb_publishable_...)
const isValidKey = SUPABASE_KEY && (SUPABASE_KEY.startsWith('eyJ') || SUPABASE_KEY.startsWith('sb_'));

function obterLibSupabase() {
  return window.supabase || window.Supabase || null;
}

const SUPABASE_CDN_URLS = [
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js',
  'https://unpkg.com/@supabase/supabase-js@2/dist/umd/supabase.min.js'
];

let supabaseScriptPromise = null;

function carregarScriptSupabase() {
  if (supabaseScriptPromise) return supabaseScriptPromise;

  supabaseScriptPromise = new Promise(resolve => {
    const jaExiste = document.querySelector('script[data-supabase-umd="true"]');
    if (jaExiste) {
      jaExiste.addEventListener('load', () => resolve(true), { once: true });
      jaExiste.addEventListener('error', () => resolve(false), { once: true });
      return;
    }

    const tentarCarregar = (index) => {
      if (index >= SUPABASE_CDN_URLS.length) {
        resolve(false);
        return;
      }

      const script = document.createElement('script');
      script.src = SUPABASE_CDN_URLS[index];
      script.async = true;
      script.defer = true;
      script.dataset.supabaseUmd = 'true';

      script.onload = () => resolve(true);
      script.onerror = () => {
        script.remove();
        tentarCarregar(index + 1);
      };

      document.head.appendChild(script);
    };

    tentarCarregar(0);
  });

  return supabaseScriptPromise;
}

async function aguardarLibSupabase(timeoutMs = 3000, intervaloMs = 50) {
  if (!obterLibSupabase()) {
    await carregarScriptSupabase();
  }
  const inicio = Date.now();
  while (Date.now() - inicio < timeoutMs) {
    const lib = obterLibSupabase();
    if (lib?.createClient) return lib;
    await new Promise(resolve => setTimeout(resolve, intervaloMs));
  }
  return null;
}

function criarSupabaseSePossivel(lib) {
  if (SUPABASE_URL && isValidKey && lib?.createClient) {
    if (!supabase || typeof supabase.from !== 'function') {
      supabase = lib.createClient(SUPABASE_URL, SUPABASE_KEY);
      if (supabase && typeof supabase.from === 'function') {
        window.__supabaseClient = supabase;
        console.log('✅ Supabase conectado com sucesso!');
      }
    }
  }
}

const libSupabase = obterLibSupabase();
criarSupabaseSePossivel(libSupabase);

// ============================================
// LIMITES DE RISCO (Ministério da Saúde)
// ============================================
const LIMITES = {
  PA_SISTOLICA: {
    OTIMA: 120,      // < 120 = ótima
    NORMAL: 130,     // 120-129 = normal
    ELEVADA: 140,    // 130-139 = elevada
    ALTA: 160,       // 140-159 = hipertensão estágio 1
    MUITO_ALTA: 180, // 160-179 = hipertensão estágio 2
    CRITICA: 180     // >= 180 = crise hipertensiva
  },
  PA_DIASTOLICA: {
    OTIMA: 80,
    NORMAL: 85,
    ELEVADA: 90,
    ALTA: 100,
    MUITO_ALTA: 110,
    CRITICA: 120
  },
  GLICEMIA_JEJUM: {
    BAIXA: 70,       // < 70 = hipoglicemia
    NORMAL: 100,     // 70-99 = normal
    ELEVADA: 126,    // 100-125 = pré-diabetes
    ALTA: 200,       // 126-199 = diabetes
    CRITICA: 250     // >= 250 = emergência
  }
};

function obterLimitesPaciente(p) {
  const asNum = (v) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };

  return {
    // Prioridade: meta individual > fallback global padrão
    pa_sis_max: asNum(p?.meta_pa_sis_max ?? p?.meta_pa_max) ?? 120,
    pa_sis_min: asNum(p?.meta_pa_sis_min),
    pa_dia_max: asNum(p?.meta_pa_dia_max) ?? 80,
    pa_dia_min: asNum(p?.meta_pa_dia_min),
    glicemia_max: asNum(p?.meta_glicemia_max ?? p?.meta_glicemia) ?? 99,
    glicemia_min: asNum(p?.meta_glicemia_min)
  };
}

// Curva de ganho de peso gestacional (Ministério da Saúde)
const CURVA_PESO_GESTACIONAL = {
  BAIXO_PESO: { min: 9.7, max: 12.2 },
  EUTROFIA: { min: 8, max: 12 },
  SOBREPESO: { min: 7, max: 9 },
  OBESIDADE: { min: 5, max: 7.2 }
};

function normalizarSim(valor) {
  if (valor === true) return true;
  if (valor === false || valor == null) return false;
  const v = String(valor).trim().toLowerCase();
  return v === 'sim' || v === 's' || v === 'true' || v === '1';
}

function calcularClasseIMC(paciente) {
  const pesoInicial = parseFloat(paciente.peso_inicial) || 0;
  const altura = parseFloat(paciente.altura) || 0;
  if (!pesoInicial || !altura) return null;
  const alturaM = altura / 100;
  const imc = pesoInicial / (alturaM * alturaM);
  if (imc < 18.5) return { classIMC: 'BAIXO_PESO', imc };
  if (imc >= 25 && imc < 30) return { classIMC: 'SOBREPESO', imc };
  if (imc >= 30) return { classIMC: 'OBESIDADE', imc };
  return { classIMC: 'EUTROFIA', imc };
}

// ============================================
// ESTADO GLOBAL
// ============================================
let pacientes = [];
let registros = [];
let pacienteSelecionado = null;
let filtroAtual = 'all';
let profissionalAtual = null;
let filtroRegiaoAtual = '';
let filtroUbsAtual = '';
let filtroEquipeAtual = '';
let chartInstance = null;
let activityChartInstance = null;

let replyAudioBlob = null;
let replyAudioUrl = null;
let replyAudioRecorder = null;
let replyAudioTimer = null;
let replyAudioMs = 0;
let registroSelecionadoChat = null;
const mediaCache = new Map();
let _registrosIndex = new Map(); // patient_id -> registros[]

// Colunas para carregamento rápido da lista (sem campos pesados)
const PERFIS_COLS_LIST = 'patient_id,nome,cpf,nascimento,regiao,foto_url,ubs_referencia,equipe_ubs,gestante,gestacao_semanas,tem_filhos,qtd_filhos,filhos_json,hipertensao,diabetes,condicoes,peso_inicial,altura,meta_pa_max,meta_glicemia,meta_pa_sis_max,meta_pa_sis_min,meta_pa_dia_max,meta_pa_dia_min,meta_glicemia_max,meta_glicemia_min,created_by_cpf';
const PERFIS_COLS_FULL = 'patient_id,nome,cpf,nascimento,regiao,foto_url,ubs_referencia,genero,raca,endereco,telefone,escolaridade,profissao,mora_sozinho,mora_companheiro,tem_filhos,qtd_filhos,filhos_json,acs_responsavel,equipe_ubs,hipertensao,tempo_diag_has,diabetes,tempo_diag_dm,gestante,infeccao_urinaria_gestacao,dependencias,tempo_dependencia,condicoes,altura,peso_inicial,peso_atual,peso_primeira_consulta,imc_pre_gestacional,imc_atual,dum,gestacao_semanas,previsao_parto,faz_pre_natal,inicio_pre_natal,data_ultima_consulta_pre_natal,enxerga_bem,consulta_oftalmo,tempo_consulta_oftalmo,dificuldade_mastigar_falar_engolir,uso_medicacoes,nomes_medicacoes,posologia_dosagem,posologia_horario,data_ultima_prescricao,data_ultima_dispensacao,atividade_fisica,freq_atividade,tipo_atividade,meta_peso,meta_glicemia,meta_pa_min,meta_pa_max,created_by_nome,created_by_ubs,created_by_cpf,created_at,updated_at,meta_glicemia_max,meta_glicemia_min,meta_pa_sis_max,meta_pa_sis_min,meta_pa_dia_max,meta_pa_dia_min';
const REGISTROS_COLS_LIGHT = 'registro_id,patient_id,pa_sistolica,pa_diastolica,glicemia_mg,peso_kg,gestante,gestacao_semanas,atividade_fisica,status,tipo,created_at,updated_at';
const REGISTROS_COLS_FULL = 'registro_id,patient_id,pa_sistolica,pa_diastolica,glicemia_mg,peso_kg,gestante,gestacao_semanas,atividade_fisica,texto,resposta,resposta_data,replies_json,status,tipo,created_at,updated_at';
// Cache de pacientes com dados completos já carregados
const _fullDataCache = new Set();

function normalizarRepliesJson(reg) {
  const raw = reg?.replies_json;
  if (Array.isArray(raw)) return raw;
  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    } catch { }
  }
  return [];
}

function montarTextoPadrao(reg) {
  const partes = [];
  if (reg?.pa_sistolica) partes.push(`PA: ${reg.pa_sistolica}/${reg.pa_diastolica || '-'}`);
  if (reg?.peso_kg) partes.push(`Peso: ${reg.peso_kg}kg`);
  if (reg?.glicemia_mg) partes.push(`Glicemia: ${reg.glicemia_mg}`);
  if (reg?.atividade_fisica) partes.push(`Atividade: ${reg.atividade_fisica}`);
  return partes.join(' | ');
}

// ============================================
// NOTIFICAÇÕES
// ============================================
async function notifyProfissional(title, body, tag, minIntervalMs = 60000) {
  if (!('Notification' in window)) return;
  if (Notification.permission === 'default') {
    try { await Notification.requestPermission(); } catch { return; }
  }
  if (Notification.permission !== 'granted') return;
  const key = `notify_${tag}`;
  const last = Number(localStorage.getItem(key) || 0);
  if (last && (Date.now() - last) < minIntervalMs) return;
  try {
    new Notification(title, { body, icon: '../img/logo.png', tag });
    localStorage.setItem(key, String(Date.now()));
  } catch { }
}

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', async () => {
  const profData = sessionStorage.getItem('profissional');
  if (!profData) {
    window.location.href = '../index.html';
    return;
  }

  const prof = JSON.parse(profData);
  profissionalAtual = prof;
  document.getElementById('profName').textContent = prof.enfermeira || prof.nome || 'Profissional';

  // Show tipo badge
  const tipoProfissional = (prof.tipo || 'acs').toLowerCase();
  const tipoEl = document.getElementById('profTipo');
  if (tipoEl) {
    const label = tipoProfissional === 'telessaude' ? 'Telessaúde' : tipoProfissional === 'equipe_ubs' ? 'Profissional de Saúde' : 'ACS';
    tipoEl.textContent = 'Profissional ' + label;
    tipoEl.style.display = 'inline-block';
    tipoEl.style.padding = '3px 10px';
    tipoEl.style.borderRadius = '20px';
    tipoEl.style.fontSize = '11px';
    tipoEl.style.fontWeight = '800';
    tipoEl.style.marginLeft = '8px';
    if (tipoProfissional === 'telessaude') {
      tipoEl.style.background = '#e0e7ff';
      tipoEl.style.color = '#4338ca';
    } else if (tipoProfissional === 'equipe_ubs') {
      tipoEl.style.background = '#fff7ed';
      tipoEl.style.color = '#c2410c';
    } else {
      tipoEl.style.background = '#dcfce7';
      tipoEl.style.color = '#166534';
    }
  }

  await carregarDados();
});

// ============================================
// CARREGAR DADOS DO SUPABASE
// ============================================
async function carregarDados() {
  mostrarLoading('Carregando usuários do SUS...');
  // Limpar cache de mídia para buscar dados novos
  mediaCache.clear();

  try {
    if (!supabase || typeof supabase.from !== 'function') {
      const lib = await aguardarLibSupabase();
      criarSupabaseSePossivel(lib);
    }

    if (!supabase || typeof supabase.from !== 'function') {
      const keyPreview = SUPABASE_KEY ? SUPABASE_KEY.substring(0, 25) + '...' : 'ausente';
      console.error('❌ Supabase não inicializado!');
      console.error('URL:', SUPABASE_URL);
      console.error('KEY:', keyPreview);
      if (!obterLibSupabase()) {
        throw new Error('Biblioteca do Supabase não carregou. Verifique o <script> do Supabase no HTML.');
      }
      throw new Error('Supabase não configurado - cliente inválido');
    }

    console.log('Conectando ao Supabase...');

    // ---- FASE 1: Carregamento rápido (colunas leves, lotes paralelos) ----
    const t0 = performance.now();

    // 1. Carregar perfis com colunas leves (sem medicação, endereço, etc.)
    let perfisQuery = supabase.from('perfis').select(PERFIS_COLS_LIST, { count: 'exact' }).order('nome').range(0, 4999);
    
    const ubsPro = (profissionalAtual?.ubs || '').trim().toLowerCase();
    const tipoPro = (profissionalAtual?.tipo || 'acs').trim().toLowerCase();
    const isCoordenador = ubsPro.includes('coordenador');
    const isTelessaude = tipoPro === 'telessaude';
    if (!isCoordenador && !isTelessaude && profissionalAtual?.cpf) {
      const cpfPro = String(profissionalAtual.cpf).replace(/\D/g, '');
      perfisQuery = perfisQuery.eq('created_by_cpf', cpfPro);
    }
    const { data: perfisData, error: perfisError } = await perfisQuery;

    if (perfisError) {
      console.error('Erro ao carregar perfis:', perfisError);
      throw perfisError;
    }

    console.log(`Perfis recebidos: ${perfisData?.length || 0} em ${Math.round(performance.now() - t0)}ms`);

    if (!perfisData || perfisData.length === 0) {
      mostrarErro('Nenhum paciente cadastrado. Cadastre pacientes pela Ficha do Usuário do SUS.');
      return;
    }

    // 2. Carregar registros LEVES em lotes PARALELOS (sem texto/replies_json)
    const patientIds = perfisData.map(p => p.patient_id).filter(Boolean);
    let registrosData = [];
    if (patientIds.length > 0) {
      const BATCH_SIZE = 300;
      const batchPromises = [];
      for (let i = 0; i < patientIds.length; i += BATCH_SIZE) {
        const batch = patientIds.slice(i, i + BATCH_SIZE);
        batchPromises.push(
          supabase.from('registros')
            .select(REGISTROS_COLS_LIGHT)
            .in('patient_id', batch)
            .order('created_at', { ascending: false })
            .range(0, 4999)
        );
      }
      const results = await Promise.all(batchPromises);
      for (const res of results) {
        if (res.error) { console.error('Erro registros:', res.error); throw res.error; }
        if (res.data) registrosData.push(...res.data);
      }
    }

    console.log(`Registros recebidos: ${registrosData.length} em ${Math.round(performance.now() - t0)}ms`);

    pacientes = perfisData;
    registros = registrosData.map(r => ({
      ...r,
      replies_json: [],
      texto: montarTextoPadrao(r)
    }));

    // 3. Construir índice de registros por patient_id (evita O(n*m) no classificar)
    _registrosIndex = new Map();
    for (const r of registros) {
      if (!r.patient_id) continue;
      if (!_registrosIndex.has(r.patient_id)) _registrosIndex.set(r.patient_id, []);
      _registrosIndex.get(r.patient_id).push(r);
    }

    // 4. Classificar e ordenar
    pacientes = pacientes.map(p => classificarPaciente(p));
    pacientes.sort((a, b) => {
      const ordem = { critico: 0, atencao: 1, estavel: 2, sem_dados: 3 };
      return (ordem[a.classificacao] ?? 3) - (ordem[b.classificacao] ?? 3);
    });

    // 4. Renderizar lista imediatamente (sem badges de mensagem — carregam em background)
    atualizarEstatisticas();
    popularFiltrosContexto();
    renderizarListaPacientes();
    _fullDataCache.clear();

    console.log(`Dashboard renderizado em ${Math.round(performance.now() - t0)}ms`);

    // ---- FASE 2: Carregar dados completos em background (texto, mensagens, notificações) ----
    setTimeout(() => carregarDadosCompletosBg(), 200);

  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    mostrarErro('Erro: ' + error.message + ' - Verifique o console (F12) para detalhes');
  }
}

// Carrega texto/replies_json em background e atualiza badges de mensagem
async function carregarDadosCompletosBg() {
  try {
    if (!supabase || pacientes.length === 0) return;
    const patientIds = pacientes.map(p => p.patient_id).filter(Boolean);
    if (patientIds.length === 0) return;

    // Carregar apenas campos de mensagem (leve: sem vitais repetidos)
    const MSG_COLS = 'registro_id,patient_id,texto,resposta,resposta_data,replies_json';
    const BATCH_SIZE = 300;
    const batchPromises = [];
    for (let i = 0; i < patientIds.length; i += BATCH_SIZE) {
      const batch = patientIds.slice(i, i + BATCH_SIZE);
      batchPromises.push(
        supabase.from('registros').select(MSG_COLS).in('patient_id', batch)
      );
    }
    const results = await Promise.all(batchPromises);
    const msgMap = new Map();
    for (const res of results) {
      if (res.data) {
        for (const row of res.data) {
          msgMap.set(row.registro_id, row);
        }
      }
    }

    // Merge mensagens nos registros existentes
    for (const reg of registros) {
      const msg = msgMap.get(reg.registro_id);
      if (msg) {
        reg.replies_json = normalizarRepliesJson(msg);
        reg.texto = (msg.texto && String(msg.texto).trim()) ? msg.texto : reg.texto;
        reg.resposta = msg.resposta || null;
        reg.resposta_data = msg.resposta_data || null;
      }
    }

    // Reconstruir índice com dados enriquecidos
    _registrosIndex = new Map();
    for (const r of registros) {
      if (!r.patient_id) continue;
      if (!_registrosIndex.has(r.patient_id)) _registrosIndex.set(r.patient_id, []);
      _registrosIndex.get(r.patient_id).push(r);
    }

    // Notificações
    const totalNovas = registros.reduce((acc, reg) => acc + contarNovasMensagens(reg), 0);
    const criticos = pacientes.filter(p => p.classificacao === 'critico').length;
    const lastMsgCount = Number(localStorage.getItem('pro_last_msg_count') || 0);
    const lastCritCount = Number(localStorage.getItem('pro_last_crit_count') || 0);
    if (totalNovas > lastMsgCount) {
      notifyProfissional('Novas mensagens', `Você tem ${totalNovas} nova(s) mensagem(ns) de pacientes.`, 'pro_novas_mensagens');
    }
    if (criticos > lastCritCount) {
      notifyProfissional('Alerta de pacientes críticos', `Há ${criticos} paciente(s) em estado crítico.`, 'pro_criticos');
    }
    localStorage.setItem('pro_last_msg_count', String(totalNovas));
    localStorage.setItem('pro_last_crit_count', String(criticos));

    // Re-renderizar para mostrar badges de mensagens
    renderizarListaPacientes();
    console.log('✅ Dados completos (mensagens) carregados em background');
  } catch (err) {
    console.warn('Erro ao carregar dados completos em bg:', err);
  }
}

// Carrega perfil completo + registros completos de um paciente (lazy, on-demand)
async function carregarDadosCompletosPaciente(patientId) {
  if (_fullDataCache.has(patientId)) return;
  try {
    const [perfilRes, regsRes] = await Promise.all([
      supabase.from('perfis').select(PERFIS_COLS_FULL).eq('patient_id', patientId).single(),
      supabase.from('registros').select(REGISTROS_COLS_FULL).eq('patient_id', patientId).order('created_at', { ascending: false })
    ]);

    if (perfilRes.data) {
      const idx = pacientes.findIndex(p => p.patient_id === patientId);
      if (idx >= 0) {
        const prev = pacientes[idx];
        pacientes[idx] = { ...prev, ...perfilRes.data, classificacao: prev.classificacao, alertas: prev.alertas, dadosVitais: prev.dadosVitais, dadosGestacionais: prev.dadosGestacionais, ultimoRegistro: prev.ultimoRegistro, historico: prev.historico };
      }
    }
    if (regsRes.data) {
      // Substituir registros deste paciente pelos completos
      registros = registros.filter(r => r.patient_id !== patientId);
      const novos = regsRes.data.map(r => ({
        ...r,
        replies_json: normalizarRepliesJson(r),
        texto: (r.texto && String(r.texto).trim()) ? r.texto : montarTextoPadrao(r)
      }));
      registros.push(...novos);

      // Atualizar índice para este paciente
      _registrosIndex.set(patientId, novos);

      // Re-classificar com dados completos
      const idx = pacientes.findIndex(p => p.patient_id === patientId);
      if (idx >= 0) pacientes[idx] = classificarPaciente(pacientes[idx]);
    }
    _fullDataCache.add(patientId);
  } catch (err) {
    console.warn('Erro ao carregar dados completos do paciente:', err);
  }
}

// ============================================
// CLASSIFICAR PACIENTE (baseado nos REGISTROS)
// ============================================
function classificarPaciente(paciente) {
  // Buscar registros via índice (O(1) lookup em vez de O(n) filter)
  const regsDoPC = _registrosIndex.get(paciente.patient_id) || [];
  const regsOrdenados = regsDoPC.sort((a, b) => new Date(b.created_at || b.updated_at || 0) - new Date(a.created_at || a.updated_at || 0));
  const temVitais = r => r && (r.pa_sistolica != null || r.pa_diastolica != null || r.glicemia_mg != null || r.peso_kg != null);
  const ultimoRegClinico = regsOrdenados.find(r => r.tipo !== 'cadastro' && temVitais(r))
    || regsOrdenados.find(r => r.tipo !== 'cadastro')
    || regsOrdenados.find(temVitais)
    || regsOrdenados[0];
  const ultimoReg = ultimoRegClinico;

  let classificacao = 'sem_dados';
  let alertas = [];
  let dadosVitais = { pa_sistolica: null, pa_diastolica: null, glicemia: null, peso: null, data: null };

  if (ultimoReg) {
    // Extrair dados vitais do último registro
    dadosVitais = {
      pa_sistolica: ultimoReg.pa_sistolica,
      pa_diastolica: ultimoReg.pa_diastolica,
      glicemia: ultimoReg.glicemia_mg,
      peso: ultimoReg.peso_kg,
      gestante: ultimoReg.gestante,
      gestacao_semanas: ultimoReg.gestacao_semanas,
      atividade_fisica: ultimoReg.atividade_fisica,
      data: ultimoReg.created_at
    };

    // ===== AVALIAR PRESSÃO ARTERIAL =====
    const limites = obterLimitesPaciente(paciente);
    const pa = dadosVitais.pa_sistolica;
    const pad = dadosVitais.pa_diastolica;

    const excedeLimitePersonalizado = (pa != null && limites.pa_sis_max != null && pa >= limites.pa_sis_max)
      || (pad != null && limites.pa_dia_max != null && pad >= limites.pa_dia_max);

    if (pa != null) {
      if (pa >= LIMITES.PA_SISTOLICA.CRITICA || (pad != null && pad >= LIMITES.PA_DIASTOLICA.CRITICA)) {
        classificacao = 'critico';
        alertas.push('🚨 CRISE HIPERTENSIVA - PA ≥ 180/120 - Encaminhar urgência');
      } else if (pa >= LIMITES.PA_SISTOLICA.MUITO_ALTA || (pad != null && pad >= LIMITES.PA_DIASTOLICA.MUITO_ALTA)) {
        classificacao = 'critico';
        alertas.push('🚨 PA muito alta - Hipertensão estágio 2 - Avaliar medicação');
      } else if (pa >= LIMITES.PA_SISTOLICA.ALTA || (pad != null && pad >= LIMITES.PA_DIASTOLICA.ALTA)) {
        if (classificacao !== 'critico') classificacao = 'atencao';
        alertas.push('⚠️ PA elevada - Hipertensão estágio 1 - Acompanhar');
      } else if (pa < 90 || (pad != null && pad < 60)) {
        if (classificacao !== 'critico') classificacao = 'atencao';
        alertas.push('⚠️ PA baixa - Avaliar hipotensão');
      } else {
        if (classificacao === 'sem_dados') classificacao = 'estavel';
      }

      if (excedeLimitePersonalizado) {
        if (classificacao !== 'critico') classificacao = 'atencao';
        alertas.push(`🚨 PA acima do limite personalizado (${limites.pa_sis_max}/${limites.pa_dia_max})`);
      }
    }

    // ===== AVALIAR GLICEMIA =====
    const glic = dadosVitais.glicemia;
    const limiteGlic = limites.glicemia_max;

    if (glic != null) {
      if (glic >= LIMITES.GLICEMIA_JEJUM.CRITICA) {
        classificacao = 'critico';
        alertas.push('🚨 GLICEMIA CRÍTICA ≥ 250 - Risco de cetoacidose - Encaminhar');
      } else if (glic < LIMITES.GLICEMIA_JEJUM.BAIXA) {
        classificacao = 'critico';
        alertas.push('🚨 HIPOGLICEMIA < 70 - Risco imediato - Orientar alimentação');
      } else if (glic >= LIMITES.GLICEMIA_JEJUM.ALTA) {
        if (classificacao !== 'critico') classificacao = 'atencao';
        alertas.push('⚠️ Glicemia alta (diabetes) - Ajustar tratamento');
      } else if (glic >= LIMITES.GLICEMIA_JEJUM.ELEVADA) {
        if (classificacao !== 'critico') classificacao = 'atencao';
        alertas.push('⚠️ Glicemia elevada (pré-diabetes) - Orientar dieta');
      } else {
        if (classificacao === 'sem_dados') classificacao = 'estavel';
      }

      if (limiteGlic != null && glic >= limiteGlic) {
        if (classificacao !== 'critico') classificacao = 'atencao';
        alertas.push(`🚨 Glicemia acima do limite personalizado (${limiteGlic})`);
      }
    }

    // ===== AVALIAR GESTANTE =====
    if (normalizarSim(dadosVitais.gestante) || normalizarSim(paciente.gestante)) {
      const avalGest = avaliarPesoGestacional(paciente, ultimoReg);
      if (avalGest.alerta) {
        if (classificacao === 'sem_dados' || classificacao === 'estavel') {
          classificacao = 'atencao';
        }
        alertas.push(avalGest.mensagem);
      }
      paciente.dadosGestacionais = avalGest;
    }

    // Se tem dados mas sem alertas = estável
    if (classificacao === 'sem_dados' && (pa || glic || dadosVitais.peso)) {
      classificacao = 'estavel';
    }
  }

  return {
    ...paciente,
    classificacao,
    alertas,
    dadosVitais,
    ultimoRegistro: ultimoReg,
    historico: regsOrdenados
  };
}

// ============================================
// AVALIAR PESO GESTACIONAL
// ============================================
function avaliarPesoGestacional(paciente, ultimoReg) {
  const pesoInicial = parseFloat(paciente.peso_inicial) || 0;
  const altura = parseFloat(paciente.altura) || 160;
  const pesoAtual = parseFloat(ultimoReg?.peso_kg) || pesoInicial;
  const semanas = parseInt(ultimoReg?.gestacao_semanas) || 0;

  if (!pesoInicial || !pesoAtual || !semanas) {
    return { alerta: false, mensagem: '', status: 'sem_dados' };
  }

  const imcInfo = calcularClasseIMC(paciente) || { classIMC: 'EUTROFIA', imc: 0 };
  const imc = imcInfo.imc;
  const classIMC = imcInfo.classIMC;

  // Ganho de peso
  const ganho = pesoAtual - pesoInicial;
  const curva = CURVA_PESO_GESTACIONAL[classIMC];

  // Ganho esperado proporcional às semanas
  const proporcao = Math.min(semanas / 40, 1);
  const ganhoMin = curva.min * proporcao;
  const ganhoMax = curva.max * proporcao;

  let status = 'adequado';
  let alerta = false;
  let mensagem = '✅ Ganho de peso adequado';

  if (ganho < ganhoMin * 0.8) {
    status = 'insuficiente';
    alerta = true;
    mensagem = '⚠️ Ganho de peso insuficiente - Orientar nutrição';
  } else if (ganho > ganhoMax * 1.2) {
    status = 'excessivo';
    alerta = true;
    mensagem = '⚠️ Ganho de peso excessivo - Orientar controle';
  }

  return {
    imc: imc.toFixed(1),
    classIMC,
    pesoInicial,
    pesoAtual,
    ganho: ganho.toFixed(1),
    semanas,
    ganhoMin: ganhoMin.toFixed(1),
    ganhoMax: ganhoMax.toFixed(1),
    status,
    alerta,
    mensagem
  };
}

// ============================================
// ATUALIZAR ESTATÍSTICAS
// ============================================
function atualizarEstatisticas() {
  const criticos = pacientes.filter(p => p.classificacao === 'critico').length;
  const atencao = pacientes.filter(p => p.classificacao === 'atencao').length;
  const estaveis = pacientes.filter(p => p.classificacao === 'estavel').length;

  document.getElementById('statCriticos').textContent = criticos;
  document.getElementById('statAtencao').textContent = atencao;
  document.getElementById('statEstaveis').textContent = estaveis;
  document.getElementById('statTotal').textContent = pacientes.length;

  // Load satisfaction stats in background
  carregarSatisfacao();
}

function normalizarTextoFiltro(value) {
  return String(value || '').trim().toLowerCase();
}

function popularFiltrosContexto() {
  const regiaoSelect = document.getElementById('filtroRegiao');
  const ubsSelect = document.getElementById('filtroUbs');
  const equipeSelect = document.getElementById('filtroEquipe');

  const toSorted = values => Array.from(new Set(values.filter(Boolean))).sort((a, b) => a.localeCompare(b, 'pt-BR'));
  const regioes = toSorted(pacientes.map(p => String(p.regiao || '').trim()));
  const ubsList = toSorted(pacientes.map(p => String(p.ubs_referencia || '').trim()));
  const equipes = toSorted(pacientes.map(p => String(p.equipe_ubs || '').trim()));

  if (regiaoSelect) {
    regiaoSelect.innerHTML = '<option value="">Região: todas</option>' + regioes.map(r => `<option value="${r}">${r}</option>`).join('');
    regiaoSelect.value = filtroRegiaoAtual;
  }
  if (ubsSelect) {
    ubsSelect.innerHTML = '<option value="">UBS: todas</option>' + ubsList.map(u => `<option value="${u}">${u}</option>`).join('');
    ubsSelect.value = filtroUbsAtual;
  }
  if (equipeSelect) {
    equipeSelect.innerHTML = '<option value="">Equipe: todas</option>' + equipes.map(e => `<option value="${e}">${e}</option>`).join('');
    equipeSelect.value = filtroEquipeAtual;
  }
}

function filtrarPacientesContexto() {
  const regiaoSelect = document.getElementById('filtroRegiao');
  const ubsSelect = document.getElementById('filtroUbs');
  const equipeSelect = document.getElementById('filtroEquipe');

  filtroRegiaoAtual = regiaoSelect ? regiaoSelect.value : '';
  filtroUbsAtual = ubsSelect ? ubsSelect.value : '';
  filtroEquipeAtual = equipeSelect ? equipeSelect.value : '';
  renderizarListaPacientes();
}

// ============================================
// RENDERIZAR LISTA DE PACIENTES
// ============================================
function renderizarListaPacientes() {
  const container = document.getElementById('patientList');
  const busca = (document.getElementById('searchInput')?.value || '').toLowerCase();

  let lista = pacientes;

  // Filtrar por busca
  if (busca) {
    lista = lista.filter(p =>
      (p.nome || '').toLowerCase().includes(busca) ||
      (p.cpf || '').includes(busca)
    );
  }

  // Filtrar por região, UBS e equipe
  if (filtroRegiaoAtual) {
    lista = lista.filter(p => normalizarTextoFiltro(p.regiao) === normalizarTextoFiltro(filtroRegiaoAtual));
  }
  if (filtroUbsAtual) {
    lista = lista.filter(p => normalizarTextoFiltro(p.ubs_referencia) === normalizarTextoFiltro(filtroUbsAtual));
  }
  if (filtroEquipeAtual) {
    lista = lista.filter(p => normalizarTextoFiltro(p.equipe_ubs) === normalizarTextoFiltro(filtroEquipeAtual));
  }

  // Filtrar por status e condições
  if (filtroAtual !== 'all') {
    const map = { critical: 'critico', warning: 'atencao', stable: 'estavel' };
    if (map[filtroAtual]) {
      lista = lista.filter(p => p.classificacao === map[filtroAtual]);
    } else if (filtroAtual === 'gestante') {
      lista = lista.filter(p => normalizarSim(p.dadosVitais?.gestante) || normalizarSim(p.gestante) || (parseInt(p.gestacao_semanas) || 0) > 0);
    } else if (filtroAtual === 'filhos') {
      lista = lista.filter(p => {
        let filhos = [];
        try { filhos = p.filhos_json ? JSON.parse(p.filhos_json) : []; } catch { filhos = []; }
        const qtd = (parseInt(p.qtd_filhos) || 0);
        return normalizarSim(p.tem_filhos) || filhos.length > 0 || qtd > 0;
      });
    } else if (filtroAtual === 'idoso') {
      lista = lista.filter(p => {
        const idadeNum = parseInt(calcularIdade(p.nascimento)) || 0;
        return idadeNum >= 60;
      });
    } else if (filtroAtual === 'ubs') {
      const minhaUbs = (profissionalAtual?.ubs || '').trim().toLowerCase();
      lista = lista.filter(p => {
        const ubsPaciente = (p.ubs_referencia || '').trim().toLowerCase();
        return minhaUbs && ubsPaciente === minhaUbs;
      });
    }
  }

  if (lista.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <p>Nenhum usuário do SUS encontrado</p>
      </div>
    `;
    return;
  }

  container.innerHTML = lista.map(p => {
    const inicial = (p.nome || 'P').charAt(0).toUpperCase();
    const classe = p.classificacao === 'critico' ? 'critical' :
      p.classificacao === 'atencao' ? 'warning' : '';

    const pa = p.dadosVitais?.pa_sistolica ?
      `${p.dadosVitais.pa_sistolica}/${p.dadosVitais.pa_diastolica || '-'}` : '-';
    const glic = p.dadosVitais?.glicemia || '-';

    const badge = p.classificacao === 'critico' ? '<span class="badge badge-danger">Crítico</span>' :
      p.classificacao === 'atencao' ? '<span class="badge badge-warning">Atenção</span>' :
        p.classificacao === 'estavel' ? '<span class="badge badge-success">Estável</span>' :
          '<span class="badge badge-neutral">Sem dados</span>';

    const dataUlt = p.dadosVitais?.data ? formatarData(p.dadosVitais.data) : 'Sem registro';
    const hasNovas = contarNovasMensagens(p.historico || p.ultimoRegistro) > 0;
    const badgeMsg = hasNovas ? `<span class="msg-badge">✉ Nova mensagem</span>` : '';

    const isGest = normalizarSim(p.dadosVitais?.gestante) || normalizarSim(p.gestante) || (parseInt(p.gestacao_semanas) || 0) > 0;
    const semanasBase = parseInt(p.dadosVitais?.gestacao_semanas || p.gestacao_semanas) || 0;
    const dataBaseGest = p.dadosVitais?.data ? new Date(p.dadosVitais.data).getTime() : null;
    const diasPassados = (semanasBase > 0 && Number.isFinite(dataBaseGest) && dataBaseGest > 0)
      ? Math.max(0, Math.floor((Date.now() - dataBaseGest) / 86400000))
      : 0;
    const semanasDinamicas = semanasBase > 0
      ? Math.min(42, semanasBase + Math.floor(diasPassados / 7))
      : 0;
    const gestText = isGest ? `🤰 Gestação ${semanasDinamicas ? semanasDinamicas + ' semanas' : ''}` : '';
    const subtitulo = [gestText, p.ubs_referencia || '', dataUlt].filter(Boolean).join(' • ');

    let filhos = [];
    try { filhos = p.filhos_json ? JSON.parse(p.filhos_json) : []; } catch { filhos = []; }
    const qtdFilhos = Math.max(filhos.length, parseInt(p.qtd_filhos) || 0);
    const temFilhos = normalizarSim(p.tem_filhos) || qtdFilhos > 0;

    const idadeNum = parseInt(calcularIdade(p.nascimento)) || 0;
    const isIdoso = idadeNum >= 60;

    const tagsExtras = [
      isGest ? '<span class="badge badge-info">🤰 Gestante</span>' : '',
      temFilhos ? `<span class="badge badge-info">👶 ${qtdFilhos || ''} filho${qtdFilhos === 1 ? '' : 's'}</span>` : '',
      isIdoso ? '<span class="badge badge-info">👴 60+</span>' : ''
    ].filter(Boolean).join('');

    const fotoUrl = p.foto_url || '';
    const avatarHtml = fotoUrl
      ? `<img src="${escapeHtml(fotoUrl)}" alt="${escapeHtml(inicial)}" style="width:48px;height:48px;border-radius:50%;object-fit:cover;" onerror="this.outerHTML='<div class=\\'patient-initial\\'>${inicial}</div>'" />`
      : `<div class="patient-initial">${inicial}</div>`;

    return `
      <div class="patient-row ${classe}" ondblclick="selecionarPaciente('${p.patient_id}')" onclick="selecionarPaciente('${p.patient_id}')">
        ${avatarHtml}
        <div>
          <div class="font-semibold">${p.nome || 'Sem nome'}</div>
          <div class="text-xs text-muted">${subtitulo || 'Sem registro'} ${badgeMsg}</div>
          ${tagsExtras ? `<div class="mt-1 flex gap-2 flex-wrap">${tagsExtras}</div>` : ''}
        </div>
        <div class="text-sm">${pa}</div>
        <div class="text-sm">${glic}</div>
        <div>${badge}</div>
        <div>
          <button class="btn btn-sm btn-ghost" onclick="event.stopPropagation(); selecionarPaciente('${p.patient_id}')">
            Ver →
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function contarNovasMensagens(regOrList) {
  const contarPorRegistro = (reg) => {
    if (!reg) return 0;
    let count = 0;
    const replies = normalizarRepliesJson(reg);
    const isAutoReply = r => {
      const name = String(r?.pro_name || '').trim();
      const text = String(r?.text || '').trim();
      const autoText = text && text.toLowerCase().includes('em breve') && text.toLowerCase().includes('ubs');
      return name === 'Equipe de Saúde' && autoText;
    };
    const respostaAuto = String(reg.resposta || '').toLowerCase().includes('em breve') && String(reg.resposta || '').toLowerCase().includes('ubs');
    const hasRealProReply = (!!reg.resposta && !respostaAuto) || replies.some(r => r.from === 'pro' && !isAutoReply(r));
    if (reg.texto && !hasRealProReply) count += 1;
    let lastProIdx = -1;
    replies.forEach((r, i) => { if (r.from === 'pro' && !isAutoReply(r)) lastProIdx = i; });
    for (let i = lastProIdx + 1; i < replies.length; i += 1) {
      if (replies[i].from !== 'pro') count += 1;
    }
    return count;
  };

  if (Array.isArray(regOrList)) {
    return regOrList.reduce((acc, reg) => acc + contarPorRegistro(reg), 0);
  }
  return contarPorRegistro(regOrList);
}

// ============================================
// FILTROS
// ============================================
function setFilter(filter) {
  filtroAtual = filter;
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
  renderizarListaPacientes();
}

function filtrarPacientes() {
  renderizarListaPacientes();
}

// ============================================
// SELECIONAR PACIENTE
// ============================================
async function selecionarPaciente(patient_id) {
  pacienteSelecionado = pacientes.find(p => p.patient_id === patient_id);
  if (!pacienteSelecionado) return;

  abrirPainelDetalhe();

  // Carregar dados completos do paciente em background (perfil + registros com texto/replies)
  carregarDadosCompletosPaciente(patient_id).then(() => {
    // Atualizar referência após enriquecimento
    pacienteSelecionado = pacientes.find(p => p.patient_id === patient_id) || pacienteSelecionado;
  });

  // Update header with photo
  const fotoUrl = pacienteSelecionado.foto_url || '';
  const inicialChar = (pacienteSelecionado.nome || 'U').charAt(0).toUpperCase();
  const fotoHtml = fotoUrl
    ? `<img src="${escapeHtml(fotoUrl)}" alt="" style="width:56px;height:56px;border-radius:50%;object-fit:cover;border:2px solid rgba(255,255,255,0.5);" onerror="this.outerHTML='<div style=\\'width:56px;height:56px;border-radius:50%;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:22px;color:#fff;\\'>${inicialChar}</div>'" />`
    : `<div style="width:56px;height:56px;border-radius:50%;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:22px;color:#fff;">${inicialChar}</div>`;
  document.getElementById('detailName').innerHTML = `<div style="display:flex;align-items:center;gap:12px;">${fotoHtml}<span>${escapeHtml(pacienteSelecionado.nome || 'Usuário do SUS')}</span></div>`;

  // Calcular idade e verificar se é idoso
  const idadePac = calcularIdade(pacienteSelecionado.nascimento);
  const idadeNum = parseInt(idadePac) || 0;
  const ehIdosoPac = idadeNum >= 60;

  // Verificar se tem filhos
  const temFilhosPac = pacienteSelecionado.tem_filhos === 'Sim' || pacienteSelecionado.tem_filhos === 'sim';
  let qtdFilhosPac = 0;
  try {
    const filhosArr = pacienteSelecionado.filhos_json ? JSON.parse(pacienteSelecionado.filhos_json) : [];
    qtdFilhosPac = Array.isArray(filhosArr) ? filhosArr.length : 0;
  } catch { qtdFilhosPac = 0; }
  if (!qtdFilhosPac && pacienteSelecionado.qtd_filhos) qtdFilhosPac = parseInt(pacienteSelecionado.qtd_filhos) || 0;

  // Labels
  const gestSemanas = pacienteSelecionado.dadosVitais?.gestacao_semanas;
  const gestLabel = pacienteSelecionado.dadosGestacionais ? ` • 🤰 Gestação ${gestSemanas ? gestSemanas + ' semanas' : ''}` : '';
  const idosoLabel = ehIdosoPac ? ' • 👴 Idoso' : '';
  const filhosLabel = (temFilhosPac || qtdFilhosPac > 0) ? ` • 👶 ${qtdFilhosPac} filho${qtdFilhosPac !== 1 ? 's' : ''}` : '';

  document.getElementById('detailMeta').innerHTML = `
    ${pacienteSelecionado.cpf || ''} • ${idadePac}${idosoLabel}${filhosLabel}${gestLabel}
  `;

  const header = document.getElementById('detailHeader');
  if (pacienteSelecionado.classificacao === 'critico') {
    header.style.background = 'linear-gradient(135deg, #dc2626, #991b1b)';
  } else if (pacienteSelecionado.classificacao === 'atencao') {
    header.style.background = 'linear-gradient(135deg, #d97706, #b45309)';
  } else {
    header.style.background = 'linear-gradient(135deg, var(--primary), var(--primary-dark))';
  }

  showTab('resumo');

  // Auto-scroll to detail panel
  const panel = document.getElementById('detailPanel');
  if (panel) setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
}

function abrirPainelDetalhe() {
  const panel = document.getElementById('detailPanel');
  if (!panel) return;
  panel.style.display = 'block';
  if (window.matchMedia('(max-width: 640px)').matches) {
    document.body.classList.add('detail-open');
  }
}

function fecharPainelDetalhe() {
  const panel = document.getElementById('detailPanel');
  if (!panel) return;
  panel.style.display = 'none';
  document.body.classList.remove('detail-open');
}

// ============================================
// TABS
// ============================================
function showTab(tabName) {
  document.querySelectorAll('.detail-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.tab === tabName);
  });

  const content = document.getElementById('detailContent');

  if (tabName === 'resumo') renderizarResumo(content);
  else if (tabName === 'graficos') renderizarGraficos(content);
  else if (tabName === 'mensagens') renderizarMensagens(content);
}

// ============================================
// RENDERIZAR RESUMO
// ============================================
function renderizarResumo(container) {
  const p = pacienteSelecionado;
  const historico = Array.isArray(p.historico) ? p.historico : [];
  const temVitais = r => r && (r.pa_sistolica != null || r.pa_diastolica != null || r.glicemia_mg != null || r.peso_kg != null);
  const ultimo = p.ultimoRegistro || historico.find(temVitais) || historico[0] || {};
  const v = { ...(p.dadosVitais || {}) };
  if (v.pa_sistolica == null && ultimo.pa_sistolica != null) v.pa_sistolica = ultimo.pa_sistolica;
  if (v.pa_diastolica == null && ultimo.pa_diastolica != null) v.pa_diastolica = ultimo.pa_diastolica;
  if (v.glicemia == null && ultimo.glicemia_mg != null) v.glicemia = ultimo.glicemia_mg;
  if (v.peso == null && ultimo.peso_kg != null) v.peso = ultimo.peso_kg;
  if (v.data == null && (ultimo.created_at || ultimo.updated_at)) v.data = ultimo.created_at || ultimo.updated_at;
  if (v.atividade_fisica == null && ultimo.atividade_fisica != null) v.atividade_fisica = ultimo.atividade_fisica;

  const limitesPaciente = obterLimitesPaciente(p);
  const classPA = (v.pa_sistolica != null && v.pa_sistolica >= limitesPaciente.pa_sis_max) ? 'danger' :
    (v.pa_sistolica != null && v.pa_sistolica >= (limitesPaciente.pa_sis_max * 0.9)) ? 'warning' : '';
  const classGlic = (v.glicemia != null && v.glicemia >= limitesPaciente.glicemia_max) ? 'danger' :
    (v.glicemia != null && v.glicemia >= (limitesPaciente.glicemia_max * 0.9)) ? 'warning' :
      (v.glicemia != null && v.glicemia < limitesPaciente.glicemia_min) ? 'danger' : '';

  let html = `
    <div class="vital-grid mb-4">
      <div class="vital-card ${classPA}">
        <div class="vital-label">Pressão Arterial</div>
        <div class="vital-value">${v.pa_sistolica ? `${v.pa_sistolica}/${v.pa_diastolica || '-'}` : '-'}</div>
      </div>
      <div class="vital-card ${classGlic}">
        <div class="vital-label">Glicemia</div>
        <div class="vital-value">${v.glicemia || '-'} ${v.glicemia ? 'mg/dL' : ''}</div>
      </div>
      <div class="vital-card">
        <div class="vital-label">Peso</div>
        <div class="vital-value">${v.peso || '-'} ${v.peso ? 'kg' : ''}</div>
      </div>
      <div class="vital-card">
        <div class="vital-label">Último Registro</div>
        <div class="vital-value text-lg">${v.data ? formatarData(v.data) : '-'}</div>
      </div>
    </div>
  `;

  // Alertas
  if (p.alertas && p.alertas.length > 0) {
    html += `<div class="section-title">Alertas</div>`;
    p.alertas.forEach(alerta => {
      const tipo = alerta.includes('🚨') ? 'danger' : 'warning';
      html += `<div class="alert alert-${tipo} mb-2"><div class="alert-content"><div class="alert-text">${alerta}</div></div></div>`;
    });
  }

  // Gestante
  if (p.dadosGestacionais) {
    const g = p.dadosGestacionais;
    html += `
      <div class="section-title mt-4">Acompanhamento Gestacional</div>
      <div class="gestational-info">
        <div class="gest-item">
          <div class="gest-value">${g.semanas || '-'}</div>
          <div class="gest-label">Semanas</div>
        </div>
        <div class="gest-item">
          <div class="gest-value">${g.ganho} kg</div>
          <div class="gest-label">Ganho Total</div>
        </div>
        <div class="gest-item">
          <div class="gest-value">${g.imc}</div>
          <div class="gest-label">IMC Inicial</div>
        </div>
      </div>
      <div class="alert ${g.alerta ? 'alert-warning' : 'alert-success'} mt-3">
        <div class="alert-content"><div class="alert-text">${g.mensagem}</div></div>
      </div>
    `;
  }

  // Idade e verificação de idoso
  const idadePaciente = (() => {
    if (!p.nascimento) return null;
    const nasc = new Date(p.nascimento.split('/').reverse().join('-'));
    if (isNaN(nasc.getTime())) return null;
    const hoje = new Date();
    let anos = hoje.getFullYear() - nasc.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNasc = nasc.getMonth();
    if (mesAtual < mesNasc || (mesAtual === mesNasc && hoje.getDate() < nasc.getDate())) anos--;
    return anos;
  })();
  const ehIdoso = idadePaciente && idadePaciente >= 60;

  // Verificação de filhos
  const temFilhosCheck = p.tem_filhos === 'Sim' || p.tem_filhos === 'sim';
  let qtdFilhosNum = 0;
  try {
    const filhosArr = p.filhos_json ? JSON.parse(p.filhos_json) : [];
    qtdFilhosNum = Array.isArray(filhosArr) ? filhosArr.length : 0;
  } catch { qtdFilhosNum = 0; }
  if (!qtdFilhosNum && p.qtd_filhos) qtdFilhosNum = parseInt(p.qtd_filhos) || 0;

  // Condições
  html += `
    <div class="section-title mt-4">Condições de Saúde</div>
    <div class="flex gap-2 flex-wrap">
      ${ehIdoso ? '<span class="badge badge-info" style="background:#9333ea;color:#fff;">👴 Idoso (60+)</span>' : ''}
      ${temFilhosCheck || qtdFilhosNum > 0 ? `<span class="badge badge-info" style="background:#0891b2;color:#fff;">👶 ${qtdFilhosNum} filho${qtdFilhosNum !== 1 ? 's' : ''}</span>` : ''}
      ${p.hipertensao === 'Sim' ? '<span class="badge badge-danger">❤️ Hipertensão</span>' : ''}
      ${p.diabetes === 'Sim' ? '<span class="badge badge-danger">🩸 Diabetes</span>' : ''}
      ${p.dependencias && !['Nenhum relato', 'nenhum', 'Não tem vício'].includes(p.dependencias) ? `<span class="badge badge-warning">⚠️ ${p.dependencias}</span>` : ''}
      ${(!p.hipertensao || p.hipertensao === 'Não' || p.hipertensao === 'nao') && (!p.diabetes || p.diabetes === 'Não' || p.diabetes === 'nao') && !ehIdoso ? '<span class="badge badge-success">✅ Sem comorbidades</span>' : ''}
    </div>
  `;

  // Atividade Física
  if (v.atividade_fisica && v.atividade_fisica !== 'nenhuma') {
    html += `
      <div class="section-title mt-4">Atividade Física</div>
      <div class="flex gap-2">
        <span class="badge badge-success">🏃 ${v.atividade_fisica}</span>
      </div>
    `;
  } else {
    html += `
      <div class="section-title mt-4">Atividade Física</div>
      <div class="flex gap-2">
        <span class="badge badge-neutral">Nenhuma registrada</span>
      </div>
    `;
  }

  html += `
    <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 10px;">
      <button class="btn btn-primary btn-block" onclick="abrirFichaCadastral()">📋 Ficha Cadastral</button>
      <button class="btn btn-secondary btn-block" onclick="abrirModalMensagem()">💬 Enviar Mensagem</button>
    </div>
  `;

  container.innerHTML = html;
}

function fecharFichaCadastral() {
  const modal = document.getElementById('fichaModal');
  if (modal) modal.style.display = 'none';
}

function ativarEdicaoFicha() {
  if (!pacienteSelecionado) return;
  const p = pacienteSelecionado;
  const body = document.getElementById('fichaModalBody');
  if (!body) return;
  const fotoPerfil = p.foto_url || '';
  const iniciais = (p.nome || 'U').trim().charAt(0).toUpperCase();
  const idade = calcularIdade(p.nascimento);
  body.innerHTML = `
    <div class="flex items-center gap-4 mb-4">
      ${fotoPerfil
        ? `<img src="${escapeHtml(fotoPerfil)}" alt="foto" style="width:72px;height:72px;border-radius:16px;object-fit:cover;border:2px solid #e2e8f0;" />`
        : `<div style="width:72px;height:72px;border-radius:16px;background:#e2e8f0;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:26px;color:#475569;">${iniciais}</div>`}
      <div>
        <div class="text-lg font-bold">${escapeHtml(p.nome || '')}</div>
        <div class="text-xs text-muted">${escapeHtml(p.cpf || '')} • ${idade || 'Idade não informada'}</div>
      </div>
    </div>
    <div class="section-title">Identificação</div>
    <div class="grid grid-2">
      ${inputCampo('edit_nome', 'Nome completo', p.nome)}
      ${renderCampo('CPF', p.cpf)}
      ${dateCampo('edit_nascimento', 'Nascimento', p.nascimento)}
      ${selectCampo('edit_genero', 'Gênero', p.genero, ['Masculino','Feminino','Outro','Prefiro não informar'])}
      ${selectCampo('edit_raca', 'Raça/Cor', p.raca, ['Branca','Preta','Parda','Amarela','Indígena','Não informada'])}
      ${selectCampo('edit_escolaridade', 'Escolaridade', p.escolaridade, ['Não alfabetizado','Fundamental incompleto','Fundamental completo','Médio incompleto','Médio completo','Superior incompleto','Superior completo','Pós-graduação'])}
      ${inputCampo('edit_profissao', 'Profissão', p.profissao)}
    </div>
    <div class="section-title">Contato e Território</div>
    <div class="grid grid-2">
      ${inputCampo('edit_telefone', 'Telefone', p.telefone)}
      ${inputCampo('edit_endereco', 'Endereço', p.endereco)}
      ${selectCampo('edit_regiao', 'Região', p.regiao, LISTA_REGIOES)}
      ${selectCampo('edit_ubs_referencia', 'UBS de referência', p.ubs_referencia, LISTA_UBS)}
      ${selectCampo('edit_equipe_ubs', 'Equipe UBS', p.equipe_ubs, ['ESF','ESFR'])}
      ${selectCampo('edit_acs_responsavel', 'ACS responsável', p.acs_responsavel, LISTA_ACS)}
      <div class="card" style="padding:12px;">
        <label class="text-xs text-muted" for="edit_mora_sozinho">Mora sozinho?</label>
        <select id="edit_mora_sozinho" class="input-box" style="margin-top:4px;">
          <option value="">Escolha...</option>
          <option value="Não, com familiares (pais)" ${p.mora_sozinho === 'Não, com familiares (pais)' ? 'selected' : ''}>Não, com familiares (pais)</option>
          <option value="Não, com companheiro(a)" ${p.mora_sozinho === 'Não, com companheiro(a)' ? 'selected' : ''}>Não, com companheiro(a)</option>
          <option value="Não, com companheiro(a) e filho(s)" ${p.mora_sozinho === 'Não, com companheiro(a) e filho(s)' ? 'selected' : ''}>Não, com companheiro(a) e filho(s)</option>
          <option value="Não, com amigos" ${p.mora_sozinho === 'Não, com amigos' ? 'selected' : ''}>Não, com amigos</option>
          <option value="Sim, moro sozinho(a)" ${p.mora_sozinho === 'Sim, moro sozinho(a)' ? 'selected' : ''}>Sim, moro sozinho(a)</option>
        </select>
      </div>
    </div>
    <div class="section-title">Condições e Diagnósticos</div>
    <div class="grid grid-2">
      ${selectCampo('edit_hipertensao', 'Hipertensão', p.hipertensao, ['Sim','Não'])}
      ${selectCampo('edit_tempo_diag_has', 'Tempo diagnóstico - HAS', p.tempo_diag_has, ['Menos de 1 ano','1 a 3 anos','3 a 5 anos','5 a 10 anos','Mais de 10 anos','Não se aplica'])}
      ${selectCampo('edit_diabetes', 'Diabetes', p.diabetes, ['Sim','Não'])}
      ${selectCampo('edit_tempo_diag_dm', 'Tempo diagnóstico - DM', p.tempo_diag_dm, ['Menos de 1 ano','1 a 3 anos','3 a 5 anos','5 a 10 anos','Mais de 10 anos','Não se aplica'])}
      ${selectCampo('edit_dependencias', 'Dependências', p.dependencias, ['Nenhuma','Álcool','Tabaco','Álcool e Tabaco','Outras'])}
      ${selectCampo('edit_tempo_dependencia', 'Tempo de vício', p.tempo_dependencia || p.tempo_vicio, ['Menos de 1 ano','1 a 3 anos','3 a 5 anos','5 a 10 anos','Mais de 10 anos','Não se aplica'])}
    </div>
    <div class="section-title">Antropometria</div>
    <div class="grid grid-2">
      ${inputCampo('edit_altura', 'Altura (m)', p.altura)}
      ${inputCampo('edit_peso_inicial', 'Peso inicial (kg)', p.peso_inicial)}
      ${inputCampo('edit_peso_atual', 'Peso atual (kg)', p.peso_atual)}
      ${inputCampo('edit_peso_primeira_consulta', 'Peso 1ª consulta pré-natal (kg)', p.peso_primeira_consulta)}
    </div>
    <div class="section-title">Gestação</div>
    <div class="grid grid-2">
      ${dateCampo('edit_dum', 'DUM (Data Última Menstruação)', p.dum)}
      ${selectCampo('edit_faz_pre_natal', 'Faz pré-natal?', p.faz_pre_natal, ['Sim','Não','Não se aplica'])}
      ${dateCampo('edit_inicio_pre_natal', 'Início do pré-natal', p.inicio_pre_natal)}
    </div>
    <div class="section-title">Visão e Saúde Bucal</div>
    <div class="grid grid-2">
      ${selectCampo('edit_enxerga_bem', 'Enxerga bem?', p.enxerga_bem, ['Sim','Não'])}
      ${selectCampo('edit_consulta_oftalmo', 'Consulta com oftalmologista', p.consulta_oftalmo, ['Sim','Não'])}
      ${selectCampo('edit_dificuldade_mastigar_falar_engolir', 'Dificuldade mastigar/falar/engolir', p.dificuldade_mastigar_falar_engolir, ['Sim','Não'])}
    </div>
    <div class="section-title">Medicações</div>
    <div class="grid grid-2">
      ${selectCampo('edit_uso_medicacoes', 'Faz uso de medicações?', p.uso_medicacoes, ['Sim','Não'])}
      ${inputCampo('edit_nomes_medicacoes', 'Nomes dos medicamentos', p.nomes_medicacoes)}
      ${inputCampo('edit_posologia_dosagem', 'Posologia - Dosagem', p.posologia_dosagem)}
      ${timeCampo('edit_posologia_horario', 'Posologia - Horário'  , p.posologia_horario)}
    </div>
    <div class="section-title">Atividade Física</div>
    <div class="grid grid-2">
      ${selectCampo('edit_atividade_fisica', 'Pratica atividade física?', p.atividade_fisica, ['Sim','Não'])}
      ${selectCampo('edit_freq_atividade', 'Frequência', p.freq_atividade, ['1x por semana','2x por semana','3x por semana','4x ou mais por semana','Diariamente','Não pratica'])}
      ${selectCampo('edit_tipo_atividade', 'Tipo de atividade', p.tipo_atividade, ['Caminhada','Corrida','Musculação','Natação','Ciclismo','Dança','Outro','Não pratica'])}
    </div>
    <div class="section-title">Metas de Saúde</div>
    <div class="grid grid-2">
      ${inputCampo('edit_meta_peso', 'Meta de peso (kg)', p.meta_peso, 'number')}
      ${inputCampo('edit_meta_glicemia', 'Meta de glicemia (mg/dL)', p.meta_glicemia, 'number')}
      ${inputCampo('edit_meta_pa_min', 'Meta PA mínima (mmHg)', p.meta_pa_min, 'number')}
      ${inputCampo('edit_meta_pa_max', 'Meta PA máxima (mmHg)', p.meta_pa_max, 'number')}
    </div>
    <div class="flex gap-3 mt-4" style="justify-content:flex-end;">
      <button class="btn btn-ghost" onclick="cancelarEdicaoFicha()">Cancelar</button>
      <button class="btn btn-primary" id="btnSalvarEdicaoFicha" onclick="salvarEdicaoFicha()">💾 Salvar</button>
    </div>
  `;
  const btnEditar = document.getElementById('btnEditarFicha');
  if (btnEditar) btnEditar.style.display = 'none';
}

async function cancelarEdicaoFicha() {
  const btnEditar = document.getElementById('btnEditarFicha');
  if (btnEditar) btnEditar.style.display = '';
  await abrirFichaCadastral();
}

async function salvarEdicaoFicha() {
  const p = pacienteSelecionado;
  if (!p || !p.patient_id) return;
  const get = id => {
    const el = document.getElementById(id);
    return el ? el.value.trim() : undefined;
  };
  const getNum = id => {
    const el = document.getElementById(id);
    if (!el) return undefined;
    const v = el.value.trim();
    return v === '' ? null : parseFloat(v);
  };
  const campos = {
    nome: get('edit_nome'),
    nascimento: get('edit_nascimento'),
    genero: get('edit_genero'),
    raca: get('edit_raca'),
    escolaridade: get('edit_escolaridade'),
    profissao: get('edit_profissao'),
    telefone: get('edit_telefone'),
    endereco: get('edit_endereco'),
    regiao: get('edit_regiao'),
    ubs_referencia: get('edit_ubs_referencia'),
    equipe_ubs: get('edit_equipe_ubs'),
    acs_responsavel: get('edit_acs_responsavel'),
    mora_sozinho: get('edit_mora_sozinho'),
    mora_companheiro: 'Não se aplica',
    hipertensao: get('edit_hipertensao'),
    tempo_diag_has: get('edit_tempo_diag_has'),
    diabetes: get('edit_diabetes'),
    tempo_diag_dm: get('edit_tempo_diag_dm'),
    dependencias: get('edit_dependencias'),
    tempo_dependencia: get('edit_tempo_dependencia'),
    altura: get('edit_altura'),
    peso_inicial: get('edit_peso_inicial'),
    peso_atual: get('edit_peso_atual'),
    peso_primeira_consulta: get('edit_peso_primeira_consulta'),
    dum: get('edit_dum'),
    faz_pre_natal: get('edit_faz_pre_natal'),
    inicio_pre_natal: get('edit_inicio_pre_natal'),
    enxerga_bem: get('edit_enxerga_bem'),
    consulta_oftalmo: get('edit_consulta_oftalmo'),
    dificuldade_mastigar_falar_engolir: get('edit_dificuldade_mastigar_falar_engolir'),
    uso_medicacoes: get('edit_uso_medicacoes'),
    nomes_medicacoes: get('edit_nomes_medicacoes'),
    posologia_dosagem: get('edit_posologia_dosagem'),
    posologia_horario: get('edit_posologia_horario'),
    atividade_fisica: get('edit_atividade_fisica'),
    freq_atividade: get('edit_freq_atividade'),
    tipo_atividade: get('edit_tipo_atividade'),
    meta_peso: getNum('edit_meta_peso'),
    meta_glicemia: getNum('edit_meta_glicemia'),
    meta_pa_min: getNum('edit_meta_pa_min'),
    meta_pa_max: getNum('edit_meta_pa_max'),
  };
  // Remove keys where the DOM element was not found
  Object.keys(campos).forEach(k => { if (campos[k] === undefined) delete campos[k]; });
  campos.updated_at = new Date().toISOString();
  const btn = document.getElementById('btnSalvarEdicaoFicha');
  if (btn) { btn.disabled = true; btn.textContent = 'A guardar...'; }
  try {
    const { error } = await supabase
      .from('perfis')
      .update(campos)
      .eq('patient_id', p.patient_id);
    if (error) throw error;
    // Reflect changes in memory
    Object.assign(pacienteSelecionado, campos);
    const idx = pacientes.findIndex(x => x.patient_id === p.patient_id);
    if (idx !== -1) Object.assign(pacientes[idx], campos);
    alert('✅ Ficha atualizada com sucesso!');
    // Garante estado consistente com dados recém-salvos no banco.
    window.location.reload();
    return;
  } catch (e) {
    console.error('Erro ao salvar ficha:', e);
    alert('❌ Erro ao salvar: ' + e.message);
    if (btn) { btn.disabled = false; btn.textContent = '💾 Salvar'; }
  }
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatarCampo(value) {
  if (value === null || value === undefined) return 'Não informado';
  const str = String(value).trim();
  return str ? escapeHtml(str) : 'Não informado';
}

function renderCampo(label, value) {
  return `
    <div class="card" style="padding:12px;">
      <div class="text-xs text-muted">${escapeHtml(label)}</div>
      <div class="font-semibold">${formatarCampo(value)}</div>
    </div>
  `;
}

function inputCampo(fieldId, label, value, type = 'text') {
  const safeVal = escapeHtml(value != null ? String(value) : '');
  return `
    <div class="card" style="padding:12px;">
      <label class="text-xs text-muted" for="${fieldId}">${escapeHtml(label)}</label>
      <input type="${type}" id="${fieldId}" class="input-box" style="margin-top:4px;" value="${safeVal}" placeholder="${escapeHtml(label)}">
    </div>
  `;
}

function selectCampo(fieldId, label, value, options) {
  const safeVal = String(value || '').trim();
  let optHtml = '<option value="">Escolha...</option>';
  options.forEach(opt => {
    const sel = (safeVal.toLowerCase() === opt.toLowerCase()) ? 'selected' : '';
    optHtml += `<option value="${escapeHtml(opt)}" ${sel}>${escapeHtml(opt)}</option>`;
  });
  return `
    <div class="card" style="padding:12px;">
      <label class="text-xs text-muted" for="${fieldId}">${escapeHtml(label)}</label>
      <select id="${fieldId}" class="input-box" style="margin-top:4px;">${optHtml}</select>
    </div>
  `;
}

function timeCampo(fieldId, label, value) {
  const safeVal = escapeHtml(value != null ? String(value) : '');
  return `
    <div class="card" style="padding:12px;">
      <label class="text-xs text-muted" for="${fieldId}">${escapeHtml(label)}</label>
      <input type="text" id="${fieldId}" class="input-box" style="margin-top:4px;" value="${safeVal}" placeholder="Ex: 08:00 | 14:00" oninput="autoFormatHorario(this)" inputmode="numeric">
    </div>
  `;
}

function autoFormatHorario(input) {
  // Strip all non-digit and non-pipe characters
  let val = input.value.replace(/[^\d|]/g, '');
  // Split by pipe
  const parts = val.split('|').map(p => p.trim());
  const formatted = [];
  for (let i = 0; i < parts.length; i++) {
    let digits = parts[i].replace(/\D/g, '');
    if (i < parts.length - 1) {
      // Already confirmed parts — format fully
      digits = digits.substring(0, 4);
      if (digits.length >= 4) {
        const hh = parseInt(digits.substring(0, 2));
        const mm = parseInt(digits.substring(2, 4));
        if (hh <= 23 && mm <= 59) { formatted.push(digits.substring(0, 2) + ':' + digits.substring(2, 4)); continue; }
      }
      if (digits.length >= 3) {
        const h = '0' + digits[0];
        const m = digits[1] + digits[2];
        if (parseInt(h) <= 23 && parseInt(m) <= 59) { formatted.push(h + ':' + m); continue; }
      }
      if (digits) formatted.push(digits);
    } else {
      // Last part — user is still typing, only format when 4 digits
      digits = digits.substring(0, 4);
      if (digits.length === 4) {
        const hh = parseInt(digits.substring(0, 2));
        const mm = parseInt(digits.substring(2, 4));
        if (hh <= 23 && mm <= 59) { formatted.push(digits.substring(0, 2) + ':' + digits.substring(2, 4)); }
        else { formatted.push(digits); }
      } else {
        formatted.push(digits);
      }
    }
  }
  input.value = formatted.join(' | ');
}

function dateCampo(fieldId, label, value) {
  const raw = String(value || '').trim();
  let dateVal = '';
  if (raw) {
    // Try YYYY-MM-DD
    const m1 = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (m1) {
      const y = parseInt(m1[1]);
      if (y >= 1900 && y <= 2100) dateVal = m1[1] + '-' + m1[2] + '-' + m1[3];
    }
    // Try DD/MM/YYYY
    if (!dateVal) {
      const m2 = raw.match(/^(\d{2})\/(\d{2})\/(\d{4})/);
      if (m2) {
        const y = parseInt(m2[3]);
        if (y >= 1900 && y <= 2100) dateVal = m2[3] + '-' + m2[2] + '-' + m2[1];
      }
    }
  }
  return `
    <div class="card" style="padding:12px;">
      <label class="text-xs text-muted" for="${fieldId}">${escapeHtml(label)}</label>
      <input type="date" id="${fieldId}" class="input-box" style="margin-top:4px;" value="${escapeHtml(dateVal)}" min="1920-01-01" max="2100-12-31">
    </div>
  `;
}

function adicionarHorarioRapido(fieldId, hora) {
  const input = document.getElementById(fieldId);
  if (!input) return;
  const atual = input.value.trim();
  const horarios = atual ? atual.split(/[|,;]/).map(h => h.trim()).filter(Boolean) : [];
  if (horarios.includes(hora)) return;
  horarios.push(hora);
  horarios.sort();
  input.value = horarios.join(' | ');
}

async function obterFotosClinicasCadastro(p) {
  const cadastroRegs = (p.historico || []).filter(r => r.tipo === 'cadastro');
  if (cadastroRegs.length === 0) return [];

  const fotos = [];
  const seen = new Set();

  const addFoto = (item) => {
    if (!item) return;
    let url = item.url || '';
    let path = item.path || '';
    let type = item.type || '';
    if (!type && path) type = tipoMidiaPorNome(path);
    if (!url && path && supabase) {
      const { data } = supabase.storage.from('midias').getPublicUrl(path);
      url = data?.publicUrl || '';
    }
    if (!url || !String(type).startsWith('image')) return;
    const key = `${url}::${path}`;
    if (seen.has(key)) return;
    seen.add(key);
    fotos.push({ url, type: type || 'image', path });
  };

  for (const reg of cadastroRegs) {
    const replies = Array.isArray(reg.replies_json) ? reg.replies_json : [];
    replies.forEach(r => {
      (Array.isArray(r.media) ? r.media : []).forEach(addFoto);
    });
    if (supabase) {
      const mids = await listarMidiasRegistro(reg.registro_id);
      (mids || []).forEach(addFoto);
    }
  }

  return fotos;
}

async function abrirFichaCadastral() {
  if (!pacienteSelecionado) return;
  const modal = document.getElementById('fichaModal');
  const body = document.getElementById('fichaModalBody');
  if (!modal || !body) return;

  const p = pacienteSelecionado;
  const fotoPerfil = p.foto_url || '';
  const iniciais = (p.nome || 'U').trim().charAt(0).toUpperCase();
  const idade = calcularIdade(p.nascimento);

  const fotosClinicas = await obterFotosClinicasCadastro(p);
  const fotosHtml = fotosClinicas.length
    ? `<div class="media-grid">${fotosClinicas.map(m => renderizarMidiaHtml(m)).join('')}</div>`
    : `<div class="text-xs text-muted">Nenhuma foto clínica cadastrada.</div>`;

  body.innerHTML = `
    <div class="flex items-center gap-4 mb-4">
      ${fotoPerfil ? `<img src="${escapeHtml(fotoPerfil)}" alt="foto" style="width:72px;height:72px;border-radius:16px;object-fit:cover;border:2px solid #e2e8f0;" />`
      : `<div style="width:72px;height:72px;border-radius:16px;background:#e2e8f0;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:26px;color:#475569;">${iniciais}</div>`}
      <div>
        <div class="text-lg font-bold">${formatarCampo(p.nome)}</div>
        <div class="text-xs text-muted">${formatarCampo(p.cpf)} • ${idade || 'Idade não informada'}</div>
      </div>
    </div>

    <div class="section-title">Identificação</div>
    <div class="grid grid-2">
      ${renderCampo('Nome completo', p.nome)}
      ${renderCampo('CPF', p.cpf)}
      ${renderCampo('Nascimento', p.nascimento)}
      ${renderCampo('Idade', idade)}
      ${renderCampo('Gênero', p.genero)}
      ${renderCampo('Raça/Cor', p.raca)}
      ${renderCampo('Escolaridade', p.escolaridade)}
      ${renderCampo('Profissão', p.profissao)}
    </div>

    <div class="section-title">Contato e Território</div>
    <div class="grid grid-2">
      ${renderCampo('Telefone', p.telefone)}
      ${renderCampo('Endereço', p.endereco)}
      ${renderCampo('Região', p.regiao)}
      ${renderCampo('UBS de referência', p.ubs_referencia)}
      ${renderCampo('Equipe UBS', p.equipe_ubs)}
      ${renderCampo('ACS responsável', p.acs_responsavel)}
      ${renderCampo('Mora sozinho?', p.mora_sozinho)}
    </div>

    <div class="section-title">Filhos</div>
    <div class="grid grid-2">
      ${renderCampo('Tem filhos', p.tem_filhos)}
      ${renderCampo('Quantidade', p.qtd_filhos)}
    </div>
    ${(() => {
      let filhos = [];
      try { filhos = p.filhos_json ? JSON.parse(p.filhos_json) : []; } catch { filhos = []; }
      if (!Array.isArray(filhos) || filhos.length === 0) return '';
      return `
        <div class="card" style="padding:12px;">
          <div class="text-xs text-muted mb-2">Detalhes dos filhos</div>
          <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap:10px;">
            ${filhos.map((f, i) => `
              <div class="card" style="padding:10px;">
                <div class="text-xs font-bold">Filho ${i + 1}</div>
                <div class="text-xs text-muted">Nome</div>
                <div class="font-semibold">${formatarCampo(f.nome)}</div>
                <div class="text-xs text-muted">Idade</div>
                <div class="font-semibold">${formatarCampo(f.idade)}</div>
                <div class="text-xs text-muted">Vacinação</div>
                <div class="font-semibold">${formatarCampo(f.vacinaStatus)}</div>
                <div class="text-xs text-muted">Data</div>
                <div class="font-semibold">${formatarCampo(f.vacinaData)}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    })()}

    <div class="section-title">Condições e Diagnósticos</div>
    <div class="grid grid-2">
      ${renderCampo('Hipertensão', p.hipertensao)}
      ${renderCampo('Tempo diagnóstico - HAS', p.tempo_diag_has)}
      ${renderCampo('Diabetes', p.diabetes)}
      ${renderCampo('Tempo diagnóstico - DM', p.tempo_diag_dm)}
      ${renderCampo('Infecção urinária na gestação', p.infeccao_urinaria_gestacao)}
      ${renderCampo('Dependências', p.dependencias)}
      ${renderCampo('Tempo de vício', p.tempo_dependencia || p.tempo_vicio)}
      ${renderCampo('Condições (marcadas)', p.condicoes)}
    </div>

    <div class="section-title">Antropometria</div>
    <div class="grid grid-2">
      ${renderCampo('Altura', p.altura)}
      ${renderCampo('Peso inicial', p.peso_inicial)}
      ${renderCampo('Peso atual', p.peso_atual)}
      ${renderCampo('Peso 1ª consulta pré-natal', p.peso_primeira_consulta)}
      ${renderCampo('IMC pré-gestacional', p.imc_pre_gestacional)}
    </div>

    <div class="section-title">Gestação</div>
    <div class="grid grid-2">
      ${renderCampo('DUM', p.dum)}
      ${renderCampo('Semanas de gestação', p.gestacao_semanas)}
      ${renderCampo('Previsão do parto', p.previsao_parto)}
      ${renderCampo('Faz pré-natal?', p.faz_pre_natal)}
      ${renderCampo('Início do pré-natal', p.inicio_pre_natal)}
      ${renderCampo('Última consulta pré-natal', p.data_ultima_consulta_pre_natal)}
    </div>

    <div class="section-title">Visão e Saúde Bucal</div>
    <div class="grid grid-2">
      ${renderCampo('Enxerga bem?', p.enxerga_bem)}
      ${renderCampo('Consulta com oftalmologista', p.consulta_oftalmo)}
      ${renderCampo('Tempo da consulta oftalmo', p.tempo_consulta_oftalmo)}
      ${renderCampo('Dificuldade mastigar/falar/engolir', p.dificuldade_mastigar_falar_engolir)}
    </div>

    <div class="section-title">Medicações</div>
    <div class="grid grid-2">
      ${renderCampo('Faz uso de medicações?', p.uso_medicacoes)}
      ${renderCampo('Nomes', p.nomes_medicacoes)}
      ${renderCampo('Posologia - Dosagem', p.posologia_dosagem)}
      ${renderCampo('Posologia - Horário', p.posologia_horario)}
      ${renderCampo('Última prescrição', p.data_ultima_prescricao)}
      ${renderCampo('Última dispensação', p.data_ultima_dispensacao)}
    </div>

    <div class="section-title">Atividade Física</div>
    <div class="grid grid-2">
      ${renderCampo('Faz atividade física?', p.atividade_fisica)}
      ${renderCampo('Frequência', p.freq_atividade)}
      ${renderCampo('Tipo de atividade', p.tipo_atividade)}
    </div>

    <div class="section-title">Metas de Saúde</div>
    <div class="grid grid-2">
      ${renderCampo('Meta de peso', p.meta_peso)}
      ${renderCampo('Meta de glicemia', p.meta_glicemia)}
      ${renderCampo('Meta PA mínima', p.meta_pa_min)}
      ${renderCampo('Meta PA máxima', p.meta_pa_max)}
    </div>

    <div class="section-title">Fotos clínicas (opcional)</div>
    ${fotosHtml}
  `;

  modal.style.display = 'flex';
}

// ============================================
// RENDERIZAR GRÁFICOS
// ============================================
let currentPeriodFilter = 'all';

function filtrarPorPeriodo(hist, periodo) {
  if (periodo === 'all') return hist;
  const agora = new Date();
  const dias = { '7d': 7, '30d': 30, '90d': 90, '1y': 365 }[periodo] || 9999;
  const limite = new Date(agora.getTime() - dias * 86400000);
  return hist.filter(r => new Date(r.created_at || 0) >= limite);
}

function criarChartConfig(hist, tipo) {
  const labels = hist.map(r => formatarDataCurta(r.created_at));
  const datasets = [
    {
      label: 'PA Máxima',
      data: hist.map(r => r.pa_sistolica || null),
      backgroundColor: 'rgba(239, 68, 68, 0.6)',
      borderColor: '#ef4444'
    },
    {
      label: 'PA Mínima',
      data: hist.map(r => r.pa_diastolica || null),
      backgroundColor: 'rgba(245, 158, 11, 0.6)',
      borderColor: '#f59e0b'
    },
    {
      label: 'Peso (kg)',
      data: hist.map(r => r.peso_kg || null),
      backgroundColor: 'rgba(34, 197, 94, 0.6)',
      borderColor: '#22c55e'
    },
    {
      label: 'Glicemia (mg/dL)',
      data: hist.map(r => r.glicemia_mg || null),
      type: 'line',
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      tension: 0.6,
      cubicInterpolationMode: 'monotone',
      pointRadius: 4,
      pointHoverRadius: 7
    }
  ];

  const useDatalabels = window.ChartDataLabels != null;
  const plugins = useDatalabels ? [ChartDataLabels] : [];

  return {
    type: 'bar',
    data: { labels, datasets },
    plugins,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: true, position: 'bottom' },
        datalabels: useDatalabels ? {
          display: (ctx) => ctx.dataset.data[ctx.dataIndex] != null,
          anchor: 'end',
          align: 'top',
          offset: 2,
          font: { size: 10, weight: '600' },
          color: (ctx) => ctx.dataset.borderColor || '#333',
          formatter: (val) => val != null ? val : ''
        } : false,
        tooltip: {
          enabled: true,
          backgroundColor: 'rgba(15,23,42,0.9)',
          titleFont: { size: 14, weight: 'bold' },
          bodyFont: { size: 13 },
          padding: 12,
          cornerRadius: 8,
          displayColors: true,
          callbacks: {
            title: (items) => {
              if (!items.length) return '';
              const idx = items[0].dataIndex;
              const reg = hist[idx];
              return reg?.created_at ? new Date(reg.created_at).toLocaleString('pt-BR') : items[0].label;
            },
            label: (item) => ` ${item.dataset.label}: ${item.formattedValue}`
          }
        }
      },
      scales: { y: { beginAtZero: false } }
    }
  };
}

function renderizarGraficos(container) {
  const p = pacienteSelecionado;
  const histFull = (p.historico || []).slice().reverse();
  const histGest = histFull.filter(r => r.gestacao_semanas && r.peso_kg);
  const isGestante = normalizarSim(p.dadosVitais?.gestante)
    || normalizarSim(p.gestante)
    || (parseInt(p.dadosVitais?.gestacao_semanas) || 0) > 0
    || (parseInt(p.gestacao_semanas) || 0) > 0
    || histGest.length > 0;

  if (!window.Chart) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">📊</div><p>Chart.js não carregado</p></div>
    <div style="margin-top:16px;"><button class="btn btn-primary btn-block" onclick="gerarRelatorioPDF()">📄 Baixar Relatório PDF</button></div>`;
    return;
  }

  if (histFull.length < 2) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">📊</div><p>Gráficos precisam de pelo menos 2 registros para serem gerados.<br>Continue alimentando os dados do paciente.</p></div>
    <div style="margin-top:16px;"><button class="btn btn-primary btn-block" onclick="gerarRelatorioPDF()">📄 Baixar Relatório PDF</button></div>`;
    return;
  }

  const periodos = [
    { key: '7d', label: '7 dias' },
    { key: '30d', label: '30 dias' },
    { key: '90d', label: '3 meses' },
    { key: '1y', label: '1 ano' },
    { key: 'all', label: 'Todo período' }
  ];

  container.innerHTML = `
    <div style="display:flex; align-items:center; justify-content:space-between; gap:8px; flex-wrap:wrap; margin-bottom:12px;">
      <span class="section-title" style="margin:0;">Período:</span>
      <div style="display:flex; gap:6px; flex-wrap:wrap;">
        ${periodos.map(p => `<button class="filter-btn ${currentPeriodFilter === p.key ? 'active' : ''}" onclick="setPeriodFilter('${p.key}')" style="padding:6px 12px;font-size:12px;">${p.label}</button>`).join('')}
      </div>
    </div>
    <div style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
      <span class="section-title">Evolução dos Indicadores</span>
      <div style="display:flex;gap:6px;">
        <button class="btn btn-ghost" style="padding:6px 10px; font-size:12px;" onclick="expandirGrafico('indicadores')">⛶ Expandir</button>
      </div>
    </div>
    <div style="height:320px; margin-bottom: 24px; width:100%;">
      <canvas id="healthChart"></canvas>
    </div>
    <div style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
      <span class="section-title">Atividade Física (Calendário)</span>
      <button class="btn btn-ghost" style="padding:6px 10px; font-size:12px;" onclick="expandirGrafico('atividade')">⛶ Expandir</button>
    </div>
    <div id="activityChartContainer" style="min-height:260px; width:100%;"></div>
    ${isGestante && histGest.length >= 2 ? `
      <div style="display:flex; align-items:center; justify-content:space-between; gap:12px; margin-top:16px;">
        <span class="section-title">Curva de Ganho de Peso Gestacional</span>
        <button class="btn btn-ghost" style="padding:6px 10px; font-size:12px;" onclick="expandirGrafico('gestacional')">⛶ Expandir</button>
      </div>
      <div style="height:300px; width:100%;"><canvas id="gestChart"></canvas></div>
    ` : ''}
    <div style="margin-top:16px;">
      <button class="btn btn-primary btn-block" onclick="gerarRelatorioPDF()">📄 Baixar Relatório PDF</button>
    </div>
  `;

  const hist = filtrarPorPeriodo(histFull, currentPeriodFilter);

  if (chartInstance) chartInstance.destroy();
  if (activityChartInstance) activityChartInstance.destroy();

  if (hist.length >= 2) {
    const ctx = document.getElementById('healthChart').getContext('2d');
    chartInstance = new Chart(ctx, criarChartConfig(hist, 'main'));
  } else {
    document.getElementById('healthChart').parentElement.innerHTML = '<div class="empty-state"><p>Sem dados no período selecionado</p></div>';
  }

  // Atividade física — calendário
  renderizarAtividadeCalendario();

  if (isGestante && histGest.length >= 2) {
    renderizarGraficoGestacional(histGest, p);
  }

  window.__histFullForChart = histFull;
  window.__histGestForChart = histGest;
}

function renderizarGraficoGestacional(histGest, p) {
  const ctxEl = document.getElementById('gestChart');
  if (!ctxEl) return;
  const imcInfo = calcularClasseIMC(p) || { classIMC: 'EUTROFIA', imc: 0 };
  const curva = CURVA_PESO_GESTACIONAL[imcInfo.classIMC] || CURVA_PESO_GESTACIONAL.EUTROFIA;
  const pesoInicial = parseFloat(p.peso_inicial) || parseFloat(histGest[0]?.peso_kg) || 0;
  const labels = histGest.map(r => `Sem ${r.gestacao_semanas}`);
  const ganhoReal = histGest.map(r => (parseFloat(r.peso_kg) - pesoInicial) || null);
  const ganhoMin = histGest.map(r => (curva.min * Math.min(r.gestacao_semanas / 40, 1)).toFixed(1));
  const ganhoMax = histGest.map(r => (curva.max * Math.min(r.gestacao_semanas / 40, 1)).toFixed(1));

  const useDatalabels = window.ChartDataLabels != null;
  const gestPlugins = useDatalabels ? [ChartDataLabels] : [];

  const ctxGest = ctxEl.getContext('2d');
  new Chart(ctxGest, {
    type: 'line',
    plugins: gestPlugins,
    data: {
      labels,
      datasets: [
        {
          label: 'Ganho Real (kg)',
          data: ganhoReal,
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.15)',
          tension: 0.6,
          pointRadius: 4,
          pointHoverRadius: 7
        },
        {
          label: 'Ganho Mín. Esperado (kg)',
          data: ganhoMin,
          borderColor: '#16a34a',
          backgroundColor: 'rgba(22, 163, 74, 0.08)',
          tension: 0.4,
          pointRadius: 0
        },
        {
          label: 'Ganho Máx. Esperado (kg)',
          data: ganhoMax,
          borderColor: '#f59e0b',
          backgroundColor: 'rgba(245, 158, 11, 0.08)',
          tension: 0.4,
          pointRadius: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: true, position: 'bottom' },
        datalabels: useDatalabels ? {
          display: (ctx) => ctx.datasetIndex === 0 && ctx.dataset.data[ctx.dataIndex] != null,
          anchor: 'end',
          align: 'top',
          offset: 2,
          font: { size: 10, weight: '600' },
          color: '#3b82f6',
          formatter: (val) => val != null ? Number(val).toFixed(1) : ''
        } : false,
        tooltip: {
          enabled: true,
          backgroundColor: 'rgba(15,23,42,0.9)',
          titleFont: { size: 14, weight: 'bold' },
          bodyFont: { size: 13 },
          padding: 12,
          cornerRadius: 8,
          displayColors: true,
          callbacks: {
            label: (item) => ` ${item.dataset.label}: ${item.formattedValue} kg`
          }
        }
      },
      scales: { y: { beginAtZero: true } }
    }
  });
}

function setPeriodFilter(periodo) {
  currentPeriodFilter = periodo;
  const content = document.getElementById('detailContent');
  if (content) renderizarGraficos(content);
}

// ============================================
// EXPANDIR GRÁFICOS EM MODAL
// ============================================
let expandedChartInstance = null;

function expandirGrafico(tipo) {
  let modal = document.getElementById('expandedChartModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'expandedChartModal';
    modal.style.cssText = 'position:fixed; inset:0; background:rgba(0,0,0,0.6); display:none; align-items:center; justify-content:center; padding:16px; z-index:11000;';
    modal.innerHTML = `
      <div style="background:#fff; width:min(1100px, 96vw); height:min(85vh, 900px); border-radius:16px; padding:16px; display:flex; flex-direction:column; gap:12px;">
        <div style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
          <div id="expandedChartTitle" style="font-weight:700;"></div>
          <button class="btn btn-ghost" onclick="fecharGraficoExpandido()">✕ Fechar</button>
        </div>
        <div id="expandedChartBody" style="flex:1; min-height:0; overflow:auto;"></div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  modal.style.display = 'flex';
  const title = document.getElementById('expandedChartTitle');
  const body = document.getElementById('expandedChartBody');
  if (expandedChartInstance) { expandedChartInstance.destroy(); expandedChartInstance = null; }

  if (tipo === 'indicadores') {
    title.textContent = 'Evolução dos Indicadores (período completo)';
    body.innerHTML = '<canvas id="healthChartExpanded" style="width:100%; height:100%;"></canvas>';
    const histFull = window.__histFullForChart || [];
    const ctx = document.getElementById('healthChartExpanded').getContext('2d');
    expandedChartInstance = new Chart(ctx, criarChartConfig(histFull, 'expanded'));
  } else if (tipo === 'atividade') {
    title.textContent = 'Atividade Física (Calendário completo)';
    body.innerHTML = '';
    renderizarAtividadeCalendarioExpandido(body);
  } else if (tipo === 'gestacional') {
    title.textContent = 'Curva de Ganho de Peso Gestacional (completo)';
    body.innerHTML = '<canvas id="gestChartExpanded" style="width:100%; height:100%;"></canvas>';
    const histGest = window.__histGestForChart || [];
    const p = pacienteSelecionado;
    if (histGest.length >= 2 && p) {
      const imcInfo = calcularClasseIMC(p) || { classIMC: 'EUTROFIA', imc: 0 };
      const curva = CURVA_PESO_GESTACIONAL[imcInfo.classIMC] || CURVA_PESO_GESTACIONAL.EUTROFIA;
      const pesoInicial = parseFloat(p.peso_inicial) || parseFloat(histGest[0]?.peso_kg) || 0;
      const labels = histGest.map(r => `Sem ${r.gestacao_semanas}`);
      const ganhoReal = histGest.map(r => (parseFloat(r.peso_kg) - pesoInicial) || null);
      const ganhoMin = histGest.map(r => (curva.min * Math.min(r.gestacao_semanas / 40, 1)).toFixed(1));
      const ganhoMax = histGest.map(r => (curva.max * Math.min(r.gestacao_semanas / 40, 1)).toFixed(1));
      const ctx = document.getElementById('gestChartExpanded').getContext('2d');
      const useDL = window.ChartDataLabels != null;
      expandedChartInstance = new Chart(ctx, {
        type: 'line',
        plugins: useDL ? [ChartDataLabels] : [],
        data: {
          labels,
          datasets: [
            { label: 'Ganho Real (kg)', data: ganhoReal, borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.15)', tension: 0.6, pointRadius: 4, pointHoverRadius: 7 },
            { label: 'Ganho Mín. (kg)', data: ganhoMin, borderColor: '#16a34a', tension: 0.4, pointRadius: 0 },
            { label: 'Ganho Máx. (kg)', data: ganhoMax, borderColor: '#f59e0b', tension: 0.4, pointRadius: 0 }
          ]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          interaction: { mode: 'index', intersect: false },
          plugins: {
            legend: { display: true, position: 'bottom' },
            datalabels: useDL ? { display: (ctx) => ctx.datasetIndex === 0 && ctx.dataset.data[ctx.dataIndex] != null, anchor: 'end', align: 'top', font: { size: 10, weight: '600' }, color: '#3b82f6', formatter: (v) => v != null ? Number(v).toFixed(1) : '' } : false,
            tooltip: { enabled: true, backgroundColor: 'rgba(15,23,42,0.9)', padding: 12, cornerRadius: 8 }
          },
          scales: { y: { beginAtZero: true } }
        }
      });
    }
  }
}

function renderizarAtividadeCalendarioExpandido(container) {
  const p = pacienteSelecionado;
  const histFull = (p.historico || []).slice().reverse();
  const dataMap = {};
  histFull.forEach(r => {
    if (!r.created_at) return;
    const d = r.created_at.substring(0, 10);
    dataMap[d] = !!(r.atividade_fisica && r.atividade_fisica !== 'nenhuma');
  });
  if (Object.keys(dataMap).length === 0) {
    container.innerHTML = '<div class="empty-state"><p>Sem registros de atividade</p></div>';
    return;
  }
  const dates = Object.keys(dataMap).sort();
  const firstDate = new Date(dates[0] + 'T00:00:00');
  const lastDate = new Date(dates[dates.length - 1] + 'T00:00:00');
  const start = new Date(firstDate);
  const dow0 = (start.getDay() + 6) % 7;
  start.setDate(start.getDate() - dow0);
  const end = new Date(lastDate);
  const dow1 = (end.getDay() + 6) % 7;
  if (dow1 < 6) end.setDate(end.getDate() + (6 - dow1));
  const weeks = [];
  const cur = new Date(start);
  while (cur <= end) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const key = cur.toISOString().substring(0, 10);
      const inRange = cur >= firstDate && cur <= lastDate;
      const hasRecord = Object.prototype.hasOwnProperty.call(dataMap, key);
      week.push({ date: new Date(cur), key, inRange, hasRecord, ativo: hasRecord ? dataMap[key] : null });
      cur.setDate(cur.getDate() + 1);
    }
    weeks.push(week);
  }
  const dayLabels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  const monthNames = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  const cellSize = 22;
  const gap = 4;
  const monthLabels = weeks.map((week, i) => {
    const d = week[0].date;
    if (i === 0 || d.getDate() <= 7) return monthNames[d.getMonth()];
    return '';
  });
  const totalActive = Object.values(dataMap).filter(Boolean).length;
  const totalInactive = Object.values(dataMap).filter(v => v === false).length;
  container.innerHTML = `
    <div style="overflow-x:auto;padding:12px;">
      <div style="display:flex;gap:${gap}px;margin-bottom:6px;margin-left:36px;">
        ${monthLabels.map(m => `<div style="width:${cellSize}px;font-size:10px;color:#64748b;text-align:center;">${m}</div>`).join('')}
      </div>
      <div style="display:flex;gap:${gap}px;">
        <div style="display:flex;flex-direction:column;gap:${gap}px;margin-right:4px;">
          ${dayLabels.map(l => `<div style="height:${cellSize}px;font-size:10px;color:#64748b;width:32px;display:flex;align-items:center;">${l}</div>`).join('')}
        </div>
        ${weeks.map(week => `
          <div style="display:flex;flex-direction:column;gap:${gap}px;">
            ${week.map(day => {
              let bg = '#f1f5f9', title = '';
              if (day.inRange && day.hasRecord) { bg = day.ativo ? '#22c55e' : '#ef4444'; title = day.ativo ? '✓ Com atividade' : '✗ Sem atividade'; }
              else if (day.inRange) { bg = '#e2e8f0'; title = 'Sem registro'; }
              const lbl = `${day.date.getDate()}/${day.date.getMonth()+1}`;
              return `<div title="${lbl}${title ? ' — ' + title : ''}" style="width:${cellSize}px;height:${cellSize}px;background:${bg};border-radius:4px;"></div>`;
            }).join('')}
          </div>`).join('')}
      </div>
      <div style="display:flex;align-items:center;gap:16px;margin-top:12px;font-size:12px;color:#475569;">
        <div style="display:flex;align-items:center;gap:4px;"><div style="width:14px;height:14px;background:#22c55e;border-radius:3px;"></div> Com atividade (${totalActive})</div>
        <div style="display:flex;align-items:center;gap:4px;"><div style="width:14px;height:14px;background:#ef4444;border-radius:3px;"></div> Sem atividade (${totalInactive})</div>
        <div style="display:flex;align-items:center;gap:4px;"><div style="width:14px;height:14px;background:#e2e8f0;border-radius:3px;"></div> Sem registro</div>
      </div>
    </div>
  `;
}

function fecharGraficoExpandido() {
  const modal = document.getElementById('expandedChartModal');
  if (modal) modal.style.display = 'none';
  if (expandedChartInstance) { expandedChartInstance.destroy(); expandedChartInstance = null; }
}

  // Atividade física — calendário
  renderizarAtividadeCalendario();

function renderizarAtividadeCalendario() {
  const p = pacienteSelecionado;
  const histFull = (p.historico || []).slice().reverse();
  const container = document.getElementById('activityChartContainer');
  if (!container) return;
  container.style.height = '';
  if (activityChartInstance) { activityChartInstance.destroy(); activityChartInstance = null; }

  // Mapa de data -> ativo (bool)
  const dataMap = {};
  histFull.forEach(r => {
    if (!r.created_at) return;
    const d = r.created_at.substring(0, 10);
    dataMap[d] = !!(r.atividade_fisica && r.atividade_fisica !== 'nenhuma');
  });

  if (Object.keys(dataMap).length === 0) {
    container.innerHTML = '<div class="empty-state"><p>Sem registros de atividade</p></div>';
    return;
  }

  const dates = Object.keys(dataMap).sort();
  const firstDate = new Date(dates[0] + 'T00:00:00');
  const lastDate = new Date(dates[dates.length - 1] + 'T00:00:00');

  // Alinhar ao início da semana (Segunda-feira)
  const start = new Date(firstDate);
  const dow0 = (start.getDay() + 6) % 7;
  start.setDate(start.getDate() - dow0);

  // Alinhar ao fim da semana (Domingo)
  const end = new Date(lastDate);
  const dow1 = (end.getDay() + 6) % 7;
  if (dow1 < 6) end.setDate(end.getDate() + (6 - dow1));

  // Montar colunas de semana
  const weeks = [];
  const cur = new Date(start);
  while (cur <= end) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const key = cur.toISOString().substring(0, 10);
      const inRange = cur >= firstDate && cur <= lastDate;
      const hasRecord = Object.prototype.hasOwnProperty.call(dataMap, key);
      week.push({ date: new Date(cur), key, inRange, hasRecord, ativo: hasRecord ? dataMap[key] : null });
      cur.setDate(cur.getDate() + 1);
    }
    weeks.push(week);
  }

  const dayLabels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  const monthNames = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  const cellSize = 18;
  const gap = 3;

  const monthLabels = weeks.map((week, i) => {
    const d = week[0].date;
    if (i === 0 || d.getDate() <= 7) return monthNames[d.getMonth()];
    return '';
  });

  const totalActive   = Object.values(dataMap).filter(Boolean).length;
  const totalInactive = Object.values(dataMap).filter(v => v === false).length;

  container.innerHTML = `
    <div style="overflow-x:auto; padding-bottom:4px;">
      <div style="display:flex; gap:${gap}px; margin-bottom:4px; margin-left:32px;">
        ${monthLabels.map(m => `<div style="width:${cellSize}px;font-size:9px;color:#64748b;text-align:center;white-space:nowrap;overflow:hidden;">${m}</div>`).join('')}
      </div>
      <div style="display:flex; gap:${gap}px;">
        <div style="display:flex; flex-direction:column; gap:${gap}px; margin-right:4px;">
          ${dayLabels.map(l => `<div style="height:${cellSize}px;font-size:9px;color:#64748b;width:28px;display:flex;align-items:center;">${l}</div>`).join('')}
        </div>
        ${weeks.map(week => `
          <div style="display:flex; flex-direction:column; gap:${gap}px;">
            ${week.map(day => {
              let bg = '#f1f5f9', title = '';
              if (day.inRange && day.hasRecord) {
                bg = day.ativo ? '#22c55e' : '#ef4444';
                title = day.ativo ? '✓ Com atividade' : '✗ Sem atividade';
              } else if (day.inRange) {
                bg = '#e2e8f0'; title = 'Sem registro';
              }
              const lbl = `${day.date.getDate()}/${day.date.getMonth()+1}`;
              return `<div title="${lbl}${title ? ' — ' + title : ''}" style="width:${cellSize}px;height:${cellSize}px;background:${bg};border-radius:3px;"></div>`;
            }).join('')}
          </div>`).join('')}
      </div>
      <div style="display:flex;align-items:center;gap:16px;margin-top:10px;flex-wrap:wrap;font-size:11px;color:#475569;">
        <div style="display:flex;align-items:center;gap:4px;"><div style="width:12px;height:12px;background:#22c55e;border-radius:2px;"></div> Com atividade (${totalActive})</div>
        <div style="display:flex;align-items:center;gap:4px;"><div style="width:12px;height:12px;background:#ef4444;border-radius:2px;"></div> Sem atividade (${totalInactive})</div>
        <div style="display:flex;align-items:center;gap:4px;"><div style="width:12px;height:12px;background:#e2e8f0;border-radius:2px;"></div> Sem registro</div>
      </div>
    </div>
  `;
}

// ============================================
// RENDERIZAR MENSAGENS
// ============================================
async function obterMensagensRegistro(reg) {
  if (!reg) return [];
  const midias = await listarMidiasRegistro(reg.registro_id);
  const midiasPaciente = midias.filter(m => !String(m.path || '').includes('/pro/'));
  const midiasPro = midias.filter(m => String(m.path || '').includes('/pro/'));
  const msgs = [];

  const normalizarMediaList = (list = []) => {
    return (list || []).map(m => {
      if (m.url) return m;
      if (m.path && supabase) {
        const parts = String(m.path).split('/');
        const fileName = parts.pop() || '';
        const safeName = fileName.replace(/[^a-zA-Z0-9.]/g, '_');
        const safePath = [...parts, safeName].join('/');
        const { data } = supabase.storage.from('midias').getPublicUrl(safePath);
        return { ...m, url: data.publicUrl, path: safePath, type: m.type || tipoMidiaPorNome(safePath) };
      }
      return m;
    });
  };

  const textoPaciente = (reg.texto && String(reg.texto).trim()) ? reg.texto : montarTextoPadrao(reg);
  if (textoPaciente || midiasPaciente.length) {
    msgs.push({ tipo: 'received', texto: textoPaciente || '', data: reg.created_at, media: midiasPaciente });
  }
  if (reg.resposta || midiasPro.length) {
    msgs.push({ tipo: 'sent', texto: reg.resposta || '', data: reg.resposta_data || reg.updated_at, media: midiasPro });
  }
  normalizarRepliesJson(reg).forEach(r => {
    const media = normalizarMediaList(Array.isArray(r.media) ? r.media : []);
    msgs.push({
      tipo: r.from === 'pro' ? 'sent' : 'received',
      texto: r.text || '',
      data: r.at,
      media
    });
  });

  msgs.sort((a, b) => new Date(a.data || 0) - new Date(b.data || 0));
  return msgs;
}

function resumoMensagem(msg) {
  if (!msg) return 'Sem mensagens';
  if (msg.texto && msg.texto.trim()) return msg.texto.trim();
  if (msg.media && msg.media.length) {
    const tipos = msg.media.map(m => (m.type || '').split('/')[0]).filter(Boolean);
    if (tipos.includes('audio')) return '🎧 Áudio enviado';
    if (tipos.includes('video')) return '🎥 Vídeo enviado';
    if (tipos.includes('image')) return '🖼️ Foto enviada';
    return '📎 Mídia enviada';
  }
  return 'Mensagem';
}

async function renderizarMensagens(container) {
  const p = pacienteSelecionado;
  const regs = (p.historico || []).slice().sort((a, b) => new Date(b.created_at || b.updated_at || 0) - new Date(a.created_at || a.updated_at || 0));

  if (regs.length === 0) {
    container.innerHTML = `
      <div class="empty-state"><div class="empty-icon">💬</div><p>Nenhum registro ainda.</p></div>
    `;
    return;
  }

  const rows = [];
  for (const reg of regs) {
    const msgs = await obterMensagensRegistro(reg);
    const lastMsg = msgs[msgs.length - 1];
    const resumo = resumoMensagem(lastMsg);
    const data = lastMsg?.data || reg.created_at || reg.updated_at;
    const temNova = contarNovasMensagens(reg) > 0;
    rows.push(`
      <div class="card" style="border-left: 4px solid ${temNova ? 'var(--warning)' : 'var(--primary)'};">
        <div class="flex items-start justify-between gap-3">
          <div class="flex-1">
            <div class="font-semibold text-sm">Registro ${formatarDataCurta(reg.created_at || reg.updated_at)}</div>
            <div class="text-xs text-slate-600 mt-1">${resumo}</div>
            <div class="text-[11px] text-slate-400 mt-2">${formatarData(data)}</div>
          </div>
          <div class="text-right">
            ${temNova ? '<span class="msg-badge">✉ Nova mensagem</span>' : ''}
            <button class="btn btn-sm btn-primary mt-2" onclick="abrirModalMensagem('${reg.registro_id}')">Abrir chat</button>
          </div>
        </div>
      </div>
    `);
  }

  container.innerHTML = rows.join('');
}

// ============================================
// MODAL DE MENSAGEM
// ============================================
function abrirModalMensagem(registro_id) {
  if (!pacienteSelecionado) return;
  const historico = pacienteSelecionado?.historico || [];
  registroSelecionadoChat = registro_id
    ? historico.find(r => r.registro_id === registro_id)
    : pacienteSelecionado.ultimoRegistro || historico[0] || null;
  if (!registroSelecionadoChat) {
    alert('Usuário do SUS sem registro para responder');
    return;
  }
  document.getElementById('messageModal').style.display = 'flex';
  document.getElementById('messageInput').value = '';
  limparAudio();
  renderizarHistoricoModal();
}

async function renderizarHistoricoModal() {
  const container = document.getElementById('messageList');
  const reg = registroSelecionadoChat;
  if (!reg) {
    container.innerHTML = '<div class="empty-state"><div class="empty-icon">💬</div><p>Nenhuma mensagem</p></div>';
    return;
  }
  const msgs = await obterMensagensRegistro(reg);
  container.innerHTML = `
    ${msgs.map(m => `
      <div class="message-bubble ${m.tipo}">
        <div>${m.texto}</div>
        ${m.media && m.media.length ? `<div class="media-grid mt-2">${m.media.map(x => renderizarMidiaHtml(x)).join('')}</div>` : ''}
        <div class="message-time">${formatarData(m.data)}</div>
      </div>
    `).join('')}
  `;
  container.scrollTop = container.scrollHeight;
}

function fecharModal() {
  document.getElementById('messageModal').style.display = 'none';
}

function abrirMidia(url, type) {
  const modal = document.getElementById('mediaModal');
  const body = document.getElementById('mediaModalBody');
  if (!modal || !body) return;
  let html = '';
  if ((type || '').startsWith('image')) {
    html = `<img src="${url}" alt="mídia" style="max-width:85vw;max-height:80vh;border-radius:12px;" />`;
  } else if ((type || '').startsWith('video')) {
    html = `<video controls src="${url}" style="max-width:85vw;max-height:80vh;border-radius:12px;"></video>`;
  } else if ((type || '').startsWith('audio')) {
    html = `<audio controls src="${url}" style="width:100%;"></audio>`;
  } else {
    html = `<a href="${url}" target="_blank">Abrir arquivo</a>`;
  }
  body.innerHTML = html;
  modal.style.display = 'flex';
}

function fecharMidia() {
  const modal = document.getElementById('mediaModal');
  const body = document.getElementById('mediaModalBody');
  if (body) body.innerHTML = '';
  if (modal) modal.style.display = 'none';
}

function toggleChatSize() {
  const modal = document.getElementById('messageModalBox');
  const btn = document.getElementById('toggleChatSize');
  if (!modal || !btn) return;
  modal.classList.toggle('chat-expanded');
  btn.textContent = modal.classList.contains('chat-expanded') ? 'Reduzir chat' : 'Expandir chat';
  const list = document.getElementById('messageList');
  if (list) list.scrollTop = list.scrollHeight;
}

async function enviarMensagem() {
  const texto = document.getElementById('messageInput').value.trim();
  if ((!texto && !replyAudioBlob) || !pacienteSelecionado || !supabase) return;
  const reg = registroSelecionadoChat || pacienteSelecionado.ultimoRegistro;
  if (!reg) {
    alert('Usuário do SUS sem registro para responder');
    return;
  }

  try {
    const profData = sessionStorage.getItem('profissional');
    const prof = profData ? JSON.parse(profData) : {};

    const replies = reg.replies_json || [];
    const media = [];
    if (replyAudioBlob) {
      const path = `${reg.registro_id}/pro/audio_${Date.now()}.webm`;
      const { error: upErr } = await supabase.storage.from('midias').upload(path, replyAudioBlob, { upsert: true, contentType: replyAudioBlob.type });
      if (!upErr) {
        const { data } = supabase.storage.from('midias').getPublicUrl(path);
        media.push({ type: 'audio', url: data.publicUrl, path });
      }
    }
    replies.push({
      from: 'pro',
      pro_name: prof.enfermeira || prof.nome || 'Profissional',
      pro_ubs: prof.ubs || '',
      text: texto,
      media,
      at: new Date().toISOString()
    });

    const { error } = await supabase
      .from('registros')
      .update({
        replies_json: replies,
        status: 'respondido',
        updated_at: new Date().toISOString()
      })
      .eq('registro_id', reg.registro_id);

    if (error) throw error;

    // Atualizar estado local imediatamente (sem recarregar página)
    reg.replies_json = replies;
    reg.status = 'respondido';
    reg.updated_at = new Date().toISOString();
    if (pacienteSelecionado?.historico) {
      const idx = pacienteSelecionado.historico.findIndex(r => r.registro_id === reg.registro_id);
      if (idx >= 0) pacienteSelecionado.historico[idx] = { ...pacienteSelecionado.historico[idx], ...reg };
    }
    if (pacienteSelecionado?.ultimoRegistro && pacienteSelecionado.ultimoRegistro.registro_id === reg.registro_id) {
      pacienteSelecionado.ultimoRegistro = { ...pacienteSelecionado.ultimoRegistro, ...reg };
    }
    renderizarListaPacientes();
    const activeTab = document.querySelector('.detail-tab.active')?.dataset?.tab;
    if (activeTab === 'mensagens') {
      const content = document.getElementById('detailContent');
      if (content) renderizarMensagens(content);
    }
    await renderizarHistoricoModal();

    alert('Mensagem enviada!');
    fecharModal();

  } catch (error) {
    alert('Erro ao enviar: ' + error.message);
  }
}

function renderizarMidiaHtml(m) {
  const type = (m.type || '').toLowerCase();
  if (!m.url) {
    return `<div class="media-item" style="padding:12px;text-align:center;"><div class="text-xs text-amber-600">⏳ Carregando mídia...</div></div>`;
  }
  if (type.startsWith('image')) {
    return `<div class="media-item"><img src="${m.url}" alt="imagem" style="max-width:120px;max-height:120px;object-fit:cover;border-radius:8px;cursor:pointer;" onclick="abrirMidia('${m.url}','image')" onerror="this.parentElement.innerHTML='<div class=text-xs text-red-500>Erro ao carregar</div>'" /></div>`;
  }
  if (type.startsWith('video')) {
    return `<div class="media-item"><video controls src="${m.url}" style="max-width:160px;max-height:120px;border-radius:8px;" onerror="this.parentElement.innerHTML='<div class=text-xs text-red-500>Erro ao carregar</div>'"></video></div>`;
  }
  if (type.startsWith('audio')) {
    return `<div class="media-item" style="background:#ecfdf5;border:1px solid #a7f3d0;border-radius:12px;padding:8px;"><audio controls src="${m.url}" class="w-full" style="max-width:180px;" onerror="this.parentElement.innerHTML='<div class=text-xs text-red-500>Erro ao carregar</div>'"></audio></div>`;
  }
  return `<div class="media-item"><a href="${m.url}" target="_blank">📎 Arquivo</a></div>`;
}

function tipoMidiaPorNome(nome) {
  const ext = String(nome).split('.').pop().toLowerCase();
  if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return 'image';
  if (['mp4', 'webm', 'mov', 'm4v'].includes(ext)) return 'video';
  if (['mp3', 'wav', 'ogg', 'webm', 'm4a'].includes(ext)) return 'audio';
  return 'file';
}

async function listarMidiasRegistro(registro_id) {
  if (!registro_id || !supabase) return [];
  if (mediaCache.has(registro_id)) return mediaCache.get(registro_id);

  const bucket = supabase.storage.from('midias');
  const result = [];

  const { data: list1 } = await bucket.list(registro_id, { limit: 100 });
  (list1 || []).forEach(f => {
    if (!f.name) return;
    const path = `${registro_id}/${f.name}`;
    const { data } = bucket.getPublicUrl(path);
    result.push({ name: f.name, type: tipoMidiaPorNome(f.name), url: data.publicUrl, path });
  });

  const { data: list2 } = await bucket.list(`${registro_id}/pro`, { limit: 100 });
  (list2 || []).forEach(f => {
    if (!f.name) return;
    const path = `${registro_id}/pro/${f.name}`;
    const { data } = bucket.getPublicUrl(path);
    result.push({ name: f.name, type: tipoMidiaPorNome(f.name), url: data.publicUrl, path });
  });

  mediaCache.set(registro_id, result);
  return result;
}

async function iniciarGravacaoAudio() {
  if (replyAudioRecorder) return;
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    const chunks = [];
    recorder.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/webm' });
      replyAudioBlob = blob;
      if (replyAudioUrl) URL.revokeObjectURL(replyAudioUrl);
      replyAudioUrl = URL.createObjectURL(blob);
      const audio = document.getElementById('audioPreview');
      const wrap = document.getElementById('audioPreviewWrap');
      if (audio && wrap) {
        audio.src = replyAudioUrl;
        wrap.style.display = 'block';
      }
      if (replyAudioTimer) clearInterval(replyAudioTimer);
      replyAudioRecorder = null;
      stream.getTracks().forEach(t => t.stop());
      document.getElementById('btnStartAudio').disabled = false;
      document.getElementById('btnStopAudio').disabled = true;
      document.getElementById('audioTimer').textContent = '';
    };
    recorder.start();
    replyAudioRecorder = recorder;
    replyAudioMs = 0;
    document.getElementById('btnStartAudio').disabled = true;
    document.getElementById('btnStopAudio').disabled = false;
    replyAudioTimer = setInterval(() => {
      replyAudioMs += 200;
      const s = Math.min(replyAudioMs / 1000, 60);
      document.getElementById('audioTimer').textContent = `Tempo: ${formatarDuracao(s)} / 01:00`;
      if (s >= 60) pararGravacaoAudio();
    }, 200);
  } catch (e) {
    alert('Não foi possível acessar o microfone.');
  }
}

function pararGravacaoAudio() {
  if (replyAudioRecorder) replyAudioRecorder.stop();
}

function limparAudio() {
  replyAudioBlob = null;
  if (replyAudioUrl) URL.revokeObjectURL(replyAudioUrl);
  replyAudioUrl = null;
  const audio = document.getElementById('audioPreview');
  const wrap = document.getElementById('audioPreviewWrap');
  if (audio) audio.src = '';
  if (wrap) wrap.style.display = 'none';
  const timer = document.getElementById('audioTimer');
  if (timer) timer.textContent = '';
  if (replyAudioTimer) clearInterval(replyAudioTimer);
  replyAudioTimer = null;
}

function formatarDuracao(segundos) {
  const s = Math.floor(segundos % 60).toString().padStart(2, '0');
  const m = Math.floor(segundos / 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

// ============================================
// ABRIR MODAL DE VALORES DE PÂNICO
// ============================================
/*function abrirValoresPanicoModal() {
  if (!pacienteSelecionado) {
    alert("Por favor, selecione um usuário do SUS primeiro.");
    return;
  }
  
  // CORREÇÃO: Pegando o ID correto do container do Modal
  const modal = document.getElementById('valoresPanicoModal');
  if (!modal) {
    console.error('Modal de Valores de Pânico não encontrado');
    return;
  }

  // Preenche os campos com os dados do paciente selecionado (se existirem)
  const p = pacienteSelecionado;
  await carregarMetasPanico(pacienteAtual.patient_id || pacienteAtual.patient_id);
  document.getElementById('paSistolicaMax').value = p.pa_sistolica_max || '';
  document.getElementById('paSistolicaMin').value = p.pa_sistolica_min || '';
  document.getElementById('paDiastolicaMax').value = p.pa_diastolica_max || '';
  document.getElementById('paDiastolicaMin').value = p.pa_diastolica_min || '';
  document.getElementById('glicemiaMax').value = p.glicemia_max || '';
  document.getElementById('glicemiaMin').value = p.glicemia_min || '';

  // Configura o clique do botão salvar
  const btnSalvar = document.getElementById('btnSalvarPanico');
  btnSalvar.onclick = () => salvarValoresPanicoPaciente(p.id || p.patient_id);

  modal.style.display = 'flex';
}
async function abrirValoresPanicoModal() {
  // 1. Verifica se tem paciente selecionado
  let p = pacienteSelecionado
  if (!p) {
    alert("Por favor, selecione um paciente na lista lateral primeiro.");
    return;
  }

  // 2. Abre o modal
  const modal = document.getElementById('modalValoresPanico');
  if (modal) modal.style.display = 'flex';

  // 3. LIMPEZA DOS CAMPOS (O segredo para não repetir valores)
  const campos = [
    'pa_sistolica_max', 'pa_sistolica_min', 
    'pa_diastolica_max', 'pa_diastolica_min', 
    'glicemia_max', 'glicemia_min'
  ];
  
  campos.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.value = ''; // Limpa o valor
      el.placeholder = 'Carregando...'; // Feedback visual
    }
  });

  if (document.getElementById('infoTipoMeta')) {
    document.getElementById('infoTipoMeta').innerText = "Buscando dados no servidor...";
  }

  // 4. Busca os dados específicos DESTE paciente atual
  // Usamos o ID que o monitoramento.js já gerencia na global pacienteAtual
  const idParaBusca = p.patient_id || p.patient_id || p.cpf;
  
  await carregarMetasPanico(idParaBusca);
}*/

async function salvarMetasPaciente() {
  let pacienteAtual = pacienteSelecionado
  if (!pacienteAtual) return alert("Selecione um paciente primeiro.");

  const pid = pacienteAtual.patient_id;
  const btn = document.querySelector('#modalValoresPanico .btn-primary');
  
  // Captura os valores dos inputs do modal e garante que são números (ou null se vazios)
  const dadosMetas = {
    meta_pa_sis_max: parseInt(document.getElementById('paSistolicaMax').value) || null,
    meta_pa_sis_min: parseInt(document.getElementById('paSistolicaMin').value) || null,
    meta_pa_dia_max: parseInt(document.getElementById('paDiastolicaMax').value) || null,
    meta_pa_dia_min: parseInt(document.getElementById('paDiastolicaMin').value) || null,
    meta_glicemia_max: parseInt(document.getElementById('glicemiaMax').value) || null,
    meta_glicemia_min: parseInt(document.getElementById('glicemiaMin').value) || null,
    updated_at: new Date().toISOString()
  };

  try {
    if(btn) { 
      btn.disabled = true; 
      btn.innerText = "A guardar..."; 
    }

    // Fazemos o UPDATE na tabela 'perfis' onde o ID coincide
    const { error } = await supabase
      .from('perfis')
      .update(dadosMetas)
      .eq('patient_id', pid);

    if (error) throw error;

    alert("✅ Limites de pânico atualizados com sucesso!");
    
    // Atualiza o objeto do paciente na memória para refletir a mudança imediata na interface
    pacienteAtual = { ...pacienteAtual, ...dadosMetas };
    
    // Fecha o modal
    document.getElementById('modalValoresPanico').style.display = 'none';
    
  } catch (e) {
    console.error("Erro ao guardar metas:", e);
    alert("Falha ao guardar: " + e.message);
  } finally {
    if(btn) { 
      btn.disabled = false; 
      btn.innerText = "Guardar Metas"; 
    }
  }
}
async function abrirValoresPanicoModal() {
  let pacienteAtual = pacienteSelecionado 
  if (!pacienteAtual) {
    alert("Selecione um paciente primeiro.");
    return;
  }

  const modal = document.getElementById('modalValoresPanico');
  if (modal) {
    // Força o display e o alinhamento
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '12001';
  } else {
    console.error("Elemento modalValoresPanico não encontrado no HTML!");
    return;
  }

  // Limpa campos antes de carregar
  ['paSistolicaMax', 'paSistolicaMin', 'paDiastolicaMax', 'paDiastolicaMin', 'glicemiaMax', 'glicemiaMin'].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.value = '';
  });

  const pid = pacienteAtual.patient_id;
  await carregarMetasPanico(pid);
}
async function salvarValoresPanicoPaciente(patient_id) {
  if (!supabase) return alert('Supabase não conectado');

  // Mapeando os campos do Modal para as colunas existentes na tabela 'perfis'
  const dados = {
    meta_pa_sis_max: parseInt(document.getElementById('paSistolicaMax').value) || null,
    meta_pa_sis_min: parseInt(document.getElementById('paSistolicaMin').value) || null,
    meta_pa_dia_max: parseInt(document.getElementById('paDiastolicaMax').value) || null,
    meta_pa_dia_min: parseInt(document.getElementById('paDiastolicaMin').value) || null,
    meta_glicemia_max: parseInt(document.getElementById('glicemiaMax').value) || null,
    meta_glicemia_min: parseInt(document.getElementById('glicemiaMin').value) || null,
    updated_at: new Date().toISOString()
  };

  try {
    mostrarLoading('Salvando limites personalizados...');

    const { error } = await supabase
      .from('perfis') // NOME CORRETO DA TABELA
      .update(dados)
      .eq('patient_id', patient_id); // USANDO O patient_id (TEXT) CONFORME SEU SQL

    if (error) throw error;

    // Atualiza o objeto local para refletir na interface na hora
    if (pacienteSelecionado) {
        Object.assign(pacienteSelecionado, dados);
    }

    alert('✅ Limites salvos na ficha do usuário!');
    fecharValoresPanicoModal();
    
    // Recarrega o resumo para mostrar os novos limites
    if (typeof renderizarResumo === 'function') {
        renderizarResumo(document.getElementById('detailContent'));
    }

  } catch (e) {
    console.error('Erro detalhado:', e);
    alert('Erro ao salvar: ' + (e.message || 'Verifique o console'));
  } finally {
      // Opcional: remover o estado de loading se necessário
  }
}

function verificarAlerta(p, registro) {
  const sistolica = registro.pa_sistolica;
  const diastolica = registro.pa_diastolica;
  const glicemia = registro.glicemia_mg;

  // Usa limites do paciente; se ausentes, fallback global padrão
  const maxSist = Number.isFinite(Number(p.meta_pa_sis_max ?? p.meta_pa_max)) ? Number(p.meta_pa_sis_max ?? p.meta_pa_max) : 120;
  const maxDia = Number.isFinite(Number(p.meta_pa_dia_max)) ? Number(p.meta_pa_dia_max) : 80;
  const maxGlic = Number.isFinite(Number(p.meta_glicemia_max ?? p.meta_glicemia)) ? Number(p.meta_glicemia_max ?? p.meta_glicemia) : 99;

  const isCritico = (sistolica != null && sistolica >= maxSist)
    || (diastolica != null && diastolica >= maxDia)
    || (glicemia != null && glicemia >= maxGlic);

  if (isCritico) {
    return 'badge-danger';
  }
  return 'badge-success';
}

function fecharValoresPanicoModal() {
  const modalNovo = document.getElementById('modalValoresPanico');
  if (modalNovo) modalNovo.style.display = 'none';
  const modalAntigo = document.getElementById('valoresPanicoModal');
  if (modalAntigo) modalAntigo.style.display = 'none';
}

async function salvarValoresPanicoSupabaseGlobal() {
  const paSistMax = parseFloat(document.getElementById('paSistolicaMax').value) || null;
  const paSistMin = parseFloat(document.getElementById('paSistolicaMin').value) || null;
  const paDiastMax = parseFloat(document.getElementById('paDiastolicaMax').value) || null;
  const paDiastMin = parseFloat(document.getElementById('paDiastolicaMin').value) || null;
  const glicemiaMax = parseFloat(document.getElementById('glicemiaMax').value) || null;
  const glicemiaMin = parseFloat(document.getElementById('glicemiaMin').value) || null;

  const rid = uuidv4();
  const now = new Date().toISOString();

  if (!supabase) return alert('Supabase não conectado');

  try {
    const { error } = await supabase
      .from('perfis')
      .upsert({
        patient_id: 'global',
        meta_pa_sis_max: paSistMax,
        meta_pa_sis_min: paSistMin,
        meta_pa_dia_max: paDiastMax,
        meta_pa_dia_min: paDiastMin,
        meta_glicemia_max: glicemiaMax,
        meta_glicemia_min: glicemiaMin,
        updated_at: now
      }, { onConflict: 'patient_id' });

    if (error) throw error;

    alert('✅ Valores de pânico salvos com sucesso!');
    fecharValoresPanicoModal();
  } catch (e) {
    console.error('Erro ao salvar no Supabase', e);
    alert('❌ Erro ao salvar valores de pânico globais.');
  }
}

// Função para carregar as metas (Pânico) do paciente selecionado
async function carregarMetasPanico(patient_id) {
  try {
    // 1. Busca os dados direto no perfil do paciente
    const { data: perfil, error } = await supabase
      .from('perfis')
      .select('meta_pa_sis_max, meta_pa_sis_min, meta_pa_dia_max, meta_pa_dia_min, meta_glicemia_max, meta_glicemia_min')
      .eq('patient_id', patient_id)
      .single();

    if (error) throw error;

    const temAlgumaMeta = !!perfil && [
      perfil.meta_pa_sis_max,
      perfil.meta_pa_sis_min,
      perfil.meta_pa_dia_max,
      perfil.meta_pa_dia_min,
      perfil.meta_glicemia_max,
      perfil.meta_glicemia_min
    ].some(v => v !== null && v !== undefined && String(v).trim() !== '');

    if (temAlgumaMeta) {
      // Se o perfil tem metas definidas, usamos elas
      preencherInputsPanico({
        pa_sistolica_max: perfil.meta_pa_sis_max,
        pa_sistolica_min: perfil.meta_pa_sis_min,
        pa_diastolica_max: perfil.meta_pa_dia_max,
        pa_diastolica_min: perfil.meta_pa_dia_min,
        glicemia_max: perfil.meta_glicemia_max,
        glicemia_min: perfil.meta_glicemia_min
      }, true);
    } else {
      // Sem meta individual: deixa os campos em branco para preenchimento
      preencherInputsPanico({}, null);
    }
  } catch (e) {
    console.error("Erro ao carregar metas:", e);
    preencherInputsPanico({}, null);
  }
}

// Função para colocar os valores nos campos do HTML
function preencherInputsPanico(dados, isCustom) {
  // Mapeamento dos dados do banco para os IDs que você já usa no HTML
  const campos = {
    'paSistolicaMax': dados.pa_sistolica_max,
    'paSistolicaMin': dados.pa_sistolica_min,
    'paDiastolicaMax': dados.pa_diastolica_max,
    'paDiastolicaMin': dados.pa_diastolica_min,
    'glicemiaMax': dados.glicemia_max,
    'glicemiaMin': dados.glicemia_min
  };

  // Preenche cada campo apenas se ele existir no DOM
  Object.keys(campos).forEach(id => {
    const elemento = document.getElementById(id);
    if (elemento) {
      elemento.value = campos[id] || '';
    } else {
      console.warn(`Campo ${id} não encontrado no HTML.`);
    }
  });

  // Atualiza a legenda para o médico saber a origem do dado
  const infoTipo = document.getElementById('infoTipoMeta');
  if (infoTipo) {
    if (isCustom === true) {
      infoTipo.innerText = "✨ Meta Individual";
      infoTipo.className = "text-primary font-bold";
    } else {
      infoTipo.innerText = "Sem limite individual definido para este paciente.";
      infoTipo.className = "text-muted";
    }
  }
}

// Sua função que busca valores globais de pânico (usando o perfil global)
async function fetchValoresPanicoGlobais() {
  const { data } = await supabase
    .from('perfis')
    .select('meta_pa_sis_max, meta_pa_sis_min, meta_pa_dia_max, meta_pa_dia_min, meta_glicemia_max, meta_glicemia_min')
    .eq('patient_id', 'global')
    .maybeSingle();

  if (!data) return null;
  return {
    pa_sistolica_max: data.meta_pa_sis_max,
    pa_sistolica_min: data.meta_pa_sis_min,
    pa_diastolica_max: data.meta_pa_dia_max,
    pa_diastolica_min: data.meta_pa_dia_min,
    glicemia_max: data.meta_glicemia_max,
    glicemia_min: data.meta_glicemia_min
  };
}
// ============================================
// RELATÓRIO PDF
// ============================================
async function gerarRelatorioPDF() {
  const p = pacienteSelecionado;
  if (!p) return alert('Selecione um paciente primeiro.');

  const { jsPDF } = window.jspdf || {};
  if (!jsPDF) return alert('Biblioteca jsPDF não carregada.');

  const doc = new jsPDF('p', 'mm', 'a4');
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentW = pageW - margin * 2;
  let y = 0;

  // ---- Helpers ----
  const addText = (text, x, size, style, color) => {
    doc.setFontSize(size || 10);
    doc.setFont('helvetica', style || 'normal');
    doc.setTextColor(...(color || [30, 30, 30]));
    doc.text(String(text || ''), x || margin, y);
  };

  const addLine = () => {
    doc.setDrawColor(220, 225, 220);
    doc.setLineWidth(0.2);
    doc.line(margin, y, pageW - margin, y);
    y += 5;
  };

  const checkPage = (need) => {
    if (y + need > pageH - 20) {
      doc.addPage();
      y = 20;
    }
  };

  const sectionTitle = (title) => {
    checkPage(14);
    y += 2;
    doc.setFillColor(47, 107, 63);
    doc.roundedRect(margin, y - 4, contentW, 9, 2, 2, 'F');
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text(title.toUpperCase(), margin + 4, y + 2);
    y += 10;
  };

  const labelValue = (label, val, x, width) => {
    const xPos = x || margin + 2;
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(100, 110, 125);
    doc.text(label, xPos, y);
    y += 4;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(30, 35, 50);
    const lines = doc.splitTextToSize(String(val || '-'), width || (contentW - 6));
    doc.text(lines, xPos, y);
    y += lines.length * 4.5 + 1;
  };

  const labelValueInline = (label, val, x) => {
    const xPos = x || margin + 2;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(100, 110, 125);
    doc.text(label + ': ', xPos, y);
    const labelW = doc.getTextWidth(label + ': ');
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(30, 35, 50);
    doc.text(String(val || '-'), xPos + labelW, y);
  };

  // ---- Load logo image ----
  let logoData = null;
  try {
    const logoImg = new Image();
    logoImg.crossOrigin = 'anonymous';
    logoImg.src = '../img/logo.png';
    await new Promise((res, rej) => { logoImg.onload = res; logoImg.onerror = rej; setTimeout(rej, 3000); });
    const c = document.createElement('canvas');
    c.width = logoImg.naturalWidth; c.height = logoImg.naturalHeight;
    c.getContext('2d').drawImage(logoImg, 0, 0);
    logoData = c.toDataURL('image/png');
  } catch(e) { /* logo not available */ }

  // ---- Load patient photo ----
  let fotoData = null;
  const fotoUrl = p.foto_url || '';
  if (fotoUrl) {
    try {
      const fotoImg = new Image();
      fotoImg.crossOrigin = 'anonymous';
      fotoImg.src = fotoUrl;
      await new Promise((res, rej) => { fotoImg.onload = res; fotoImg.onerror = rej; setTimeout(rej, 5000); });
      const c = document.createElement('canvas');
      c.width = fotoImg.naturalWidth; c.height = fotoImg.naturalHeight;
      c.getContext('2d').drawImage(fotoImg, 0, 0);
      fotoData = c.toDataURL('image/jpeg', 0.85);
    } catch(e) { /* photo not available */ }
  }

  // ===============================================
  // HEADER — green bar with logo + info
  // ===============================================
  doc.setFillColor(47, 107, 63);
  doc.rect(0, 0, pageW, 34, 'F');
  doc.setFillColor(30, 74, 42);
  doc.rect(0, 30, pageW, 4, 'F');

  let headerTextX = margin + 2;
  if (logoData) {
    doc.addImage(logoData, 'PNG', margin, 3, 26, 26);
    headerTextX = margin + 30;
  }

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('TECENDO SAÚDE', headerTextX, 12);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(187, 247, 208);
  doc.text('Linhas do Cuidado Integral à Saúde na Amazônia', headerTextX, 18);

  doc.setFontSize(8);
  doc.setTextColor(200, 240, 210);
  doc.text('Gerado em: ' + new Date().toLocaleString('pt-BR'), headerTextX, 24);
  doc.text('Profissional: ' + (profissionalAtual?.nome || profissionalAtual?.enfermeira || '-'), headerTextX, 29);

  y = 42;

  // ===============================================
  // PATIENT CARD — photo + basic info
  // ===============================================
  const cardH = fotoData ? 38 : 28;
  doc.setFillColor(248, 250, 249);
  doc.setDrawColor(220, 225, 220);
  doc.roundedRect(margin, y - 2, contentW, cardH, 3, 3, 'FD');

  let infoX = margin + 6;

  if (fotoData) {
    // Circular clip - draw photo
    const photoSize = 26;
    const photoX = margin + 6;
    const photoY = y + (cardH - photoSize) / 2 - 2;
    doc.addImage(fotoData, 'JPEG', photoX, photoY, photoSize, photoSize);
    // Border around photo
    doc.setDrawColor(47, 107, 63);
    doc.setLineWidth(0.6);
    doc.rect(photoX, photoY, photoSize, photoSize, 'S');
    doc.setLineWidth(0.2);
    infoX = margin + 38;
  }

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(26, 35, 50);
  doc.text(p.nome || 'Sem nome', infoX, y + 6);

  const idade = calcularIdade(p.nascimento);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(90, 106, 126);
  doc.text('CPF: ' + (p.cpf || '-') + '   |   ' + (p.nascimento || '-') + '   |   ' + idade, infoX, y + 12);
  doc.text('Gênero: ' + (p.genero || '-') + '   |   UBS: ' + (p.ubs_referencia || '-') + '   |   Equipe: ' + (p.equipe_ubs || '-'), infoX, y + 17);
  doc.text('Endereço: ' + (p.endereco || '-') + '   |   Tel: ' + (p.telefone || '-'), infoX, y + 22);

  // Classification badge
  const classLabel = { critico: 'CRÍTICO', atencao: 'ATENÇÃO', estavel: 'ESTÁVEL', sem_dados: 'SEM DADOS' };
  const classColor = { critico: [220, 38, 38], atencao: [217, 119, 6], estavel: [22, 163, 74], sem_dados: [140, 140, 140] };
  const classBg = { critico: [254, 226, 226], atencao: [254, 243, 199], estavel: [220, 252, 231], sem_dados: [241, 245, 249] };
  const cls = p.classificacao || 'sem_dados';
  const badgeText = classLabel[cls] || 'SEM DADOS';
  const badgeW = doc.getTextWidth(badgeText) * 0.8 + 8;
  doc.setFillColor(...(classBg[cls] || [241, 245, 249]));
  doc.roundedRect(infoX, y + 24, badgeW + 2, 6, 1.5, 1.5, 'F');
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...(classColor[cls] || [140, 140, 140]));
  doc.text(badgeText, infoX + 2, y + 28.5);

  y += cardH + 6;

  // ===============================================
  // ALERTS
  // ===============================================
  if (p.alertas && p.alertas.length > 0) {
    checkPage(12 + p.alertas.length * 5);
    doc.setFillColor(254, 242, 242);
    doc.setDrawColor(252, 165, 165);
    const alertH = 6 + p.alertas.length * 5;
    doc.roundedRect(margin, y - 2, contentW, alertH, 2, 2, 'FD');
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(185, 28, 28);
    doc.text('ALERTAS', margin + 4, y + 3);
    y += 7;
    p.alertas.forEach(a => {
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(153, 27, 27);
      const alertText = String(a).replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{200D}\u{20E3}\u{E0020}-\u{E007F}]/gu, '').trim();
      doc.text('•  ' + alertText, margin + 6, y);
      y += 5;
    });
    y += 3;
  }

  // ===============================================
  // VITAL SIGNS
  // ===============================================
  sectionTitle('Dados Vitais — Último Registro');

  const v = p.dadosVitais || {};
  const vitals = [
    ['Pressão Arterial', v.pa_sistolica ? v.pa_sistolica + '/' + (v.pa_diastolica || '-') + ' mmHg' : '-'],
    ['Glicemia', v.glicemia ? v.glicemia + ' mg/dL' : '-'],
    ['Peso', v.peso ? v.peso + ' kg' : '-'],
    ['Atividade Física', v.atividade_fisica || '-'],
    ['Último Registro', v.data ? formatarData(v.data) : '-']
  ];

  // Two-column layout for vitals
  const colW = contentW / 2 - 4;
  vitals.forEach(([label, val], i) => {
    checkPage(10);
    const col = i % 2;
    const xBase = margin + 2 + col * (colW + 8);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(100, 110, 125);
    doc.text(label, xBase, y);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(30, 35, 50);
    doc.text(val, xBase, y + 5);
    if (col === 1 || i === vitals.length - 1) y += 11;
  });
  y += 2;

  // ===============================================
  // HEALTH CONDITIONS
  // ===============================================
  sectionTitle('Condições de Saúde');

  const conditions = [
    ['Hipertensão', p.hipertensao || 'Não informado'],
    ['Diabetes', p.diabetes || 'Não informado'],
    ['Dependências', p.dependencias || 'Nenhum relato'],
    ['Gestante', normalizarSim(p.gestante) ? 'Sim' : 'Não']
  ];
  conditions.forEach(([label, val], i) => {
    checkPage(6);
    const col = i % 2;
    const xBase = margin + 2 + col * (colW + 8);
    labelValueInline(label, val, xBase);
    if (col === 1 || i === conditions.length - 1) y += 6;
  });
  y += 2;

  // ===============================================
  // GESTATIONAL DATA
  // ===============================================
  if (p.dadosGestacionais) {
    sectionTitle('Acompanhamento Gestacional');
    const g = p.dadosGestacionais;
    labelValueInline('Semanas', g.semanas || '-', margin + 2);
    const sw = doc.getTextWidth('Semanas: ' + (g.semanas || '-') + '    ');
    labelValueInline('Ganho', (g.ganho || '-') + ' kg', margin + 2 + sw);
    y += 6;
    labelValueInline('IMC inicial', g.imc || '-', margin + 2);
    y += 6;
    labelValueInline('Faixa esperada', (g.ganhoMin || '-') + ' – ' + (g.ganhoMax || '-') + ' kg', margin + 2);
    y += 6;
    if (g.mensagem) {
      doc.setFontSize(9);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(47, 107, 63);
      doc.text(g.mensagem, margin + 2, y);
      y += 6;
    }
    y += 2;
  }

  // ===============================================
  // HISTORY TABLE
  // ===============================================
  const historico = (p.historico || []).slice(0, 30);
  if (historico.length > 0) {
    sectionTitle('Histórico de Registros (últimos 30)');

    // Table header
    const cols = [
      { label: 'Data',      x: margin + 2,  w: 30 },
      { label: 'PA',        x: margin + 34,  w: 28 },
      { label: 'Glicemia',  x: margin + 64,  w: 28 },
      { label: 'Peso',      x: margin + 94,  w: 24 },
      { label: 'Atividade', x: margin + 120, w: 40 }
    ];

    doc.setFillColor(240, 245, 241);
    doc.rect(margin, y - 3, contentW, 7, 'F');
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(47, 107, 63);
    cols.forEach(c => doc.text(c.label, c.x, y + 1));
    y += 7;

    historico.forEach((r, i) => {
      checkPage(6);
      if (i % 2 === 0) {
        doc.setFillColor(248, 250, 249);
        doc.rect(margin, y - 3, contentW, 6, 'F');
      }
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 65, 75);
      doc.text(r.created_at ? formatarDataCurta(r.created_at) : '-', cols[0].x, y);
      doc.text(r.pa_sistolica ? r.pa_sistolica + '/' + (r.pa_diastolica || '-') : '-', cols[1].x, y);
      doc.text(r.glicemia_mg ? String(r.glicemia_mg) : '-', cols[2].x, y);
      doc.text(r.peso_kg ? r.peso_kg + ' kg' : '-', cols[3].x, y);
      doc.text(r.atividade_fisica || '-', cols[4].x, y);
      y += 6;
    });
    y += 4;
  }

  // ===============================================
  // CHARTS
  // ===============================================
  const chartCanvas = document.getElementById('healthChart');
  if (chartCanvas) {
    checkPage(85);
    sectionTitle('Gráfico de Indicadores');
    try {
      const imgData = chartCanvas.toDataURL('image/png');
      const ratio = chartCanvas.width / chartCanvas.height;
      const imgW = contentW;
      const imgH = Math.min(imgW / ratio, 75);
      doc.addImage(imgData, 'PNG', margin, y, imgW, imgH);
      y += imgH + 6;
    } catch(e) { /* chart capture failed */ }
  } else {
    sectionTitle('Gráfico de Indicadores');
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(140, 140, 140);
    doc.text('Gráficos precisam de pelo menos 2 registros para serem gerados.', margin + 2, y);
    y += 5;
    doc.text('Continue alimentando os dados do paciente para visualizar a evolução.', margin + 2, y);
    y += 8;
  }

  // Activity calendar (HTML-based, captured via html2canvas)
  const activityContainer = document.getElementById('activityChartContainer');
  if (activityContainer && activityContainer.innerHTML.trim() && !activityContainer.querySelector('.empty-state')) {
    checkPage(85);
    sectionTitle('Atividade Fisica (Calendario)');
    try {
      const actCanvas = await html2canvas(activityContainer, { backgroundColor: '#ffffff', scale: 2 });
      const actImgData = actCanvas.toDataURL('image/png');
      const actRatio = actCanvas.width / actCanvas.height;
      const actImgW = contentW;
      const actImgH = Math.min(actImgW / actRatio, 75);
      doc.addImage(actImgData, 'PNG', margin, y, actImgW, actImgH);
      y += actImgH + 6;
    } catch(e) { /* activity calendar capture failed */ }
  }

  // Gestational chart
  const gestCanvas = document.getElementById('gestChart');
  if (gestCanvas) {
    checkPage(85);
    sectionTitle('Curva de Peso Gestacional');
    try {
      const imgData = gestCanvas.toDataURL('image/png');
      const ratio = gestCanvas.width / gestCanvas.height;
      const imgW = contentW;
      const imgH = Math.min(imgW / ratio, 75);
      doc.addImage(imgData, 'PNG', margin, y, imgW, imgH);
      y += imgH + 6;
    } catch(e) { /* chart capture failed */ }
  }

  // ===============================================
  // FOOTER on every page
  // ===============================================
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    // Green thin line
    doc.setDrawColor(47, 107, 63);
    doc.setLineWidth(0.4);
    doc.line(margin, pageH - 12, pageW - margin, pageH - 12);
    // Left text
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(140, 150, 160);
    doc.text('Tecendo Saúde — Cuidado Integral à Saúde na Amazônia', margin, pageH - 8);
    // Right text
    doc.text('Página ' + i + ' de ' + totalPages, pageW - margin, pageH - 8, { align: 'right' });
    // Mini logo on footer
    if (logoData) {
      doc.addImage(logoData, 'PNG', pageW / 2 - 4, pageH - 13, 8, 8);
    }
  }

  const nomeArquivo = 'relatorio_' + (p.nome || 'paciente').replace(/\s+/g, '_') + '_' + new Date().toISOString().substring(0, 10) + '.pdf';
  doc.save(nomeArquivo);
}

// ============================================
// SATISFAÇÃO COM O APP
// ============================================
let _satisfacaoData = [];

async function carregarSatisfacao() {
  try {
    if (!supabase) return;
    const { data, error } = await supabase
      .from('registros')
      .select('registro_id, patient_id, texto, created_at')
      .eq('tipo', 'satisfacao')
      .order('created_at', { ascending: false })
      .range(0, 499);
    if (error) { console.error('Erro satisfação:', error); return; }
    _satisfacaoData = data || [];
    const el = document.getElementById('statSatisfacao');
    if (!el) return;
    if (_satisfacaoData.length === 0) { el.textContent = '—'; return; }
    const notas = _satisfacaoData.map(r => {
      const m = (r.texto || '').match(/Nota\s+(\d)\/5/);
      return m ? parseInt(m[1]) : null;
    }).filter(n => n !== null);
    if (notas.length === 0) { el.textContent = '—'; return; }
    const media = (notas.reduce((a, b) => a + b, 0) / notas.length).toFixed(1);
    el.textContent = `${media} ⭐`;
    el.title = `${notas.length} avaliação(ões)`;
  } catch (e) { console.error('Erro ao carregar satisfação:', e); }
}

function abrirSatisfacaoModal() {
  const modal = document.getElementById('satisfacaoModal');
  const body = document.getElementById('satisfacaoBody');
  if (!modal || !body) return;
  modal.style.display = 'flex';

  if (_satisfacaoData.length === 0) {
    body.innerHTML = '<div class="empty-state"><div class="empty-icon">📭</div><p>Nenhuma avaliação recebida ainda.</p></div>';
    return;
  }

  // Parse all entries
  const entries = _satisfacaoData.map(r => {
    const t = r.texto || '';
    const notaM = t.match(/Nota\s+(\d)\/5/);
    const facM = t.match(/Facilidade:\s*([^.]+)/);
    const utiM = t.match(/Utilidade:\s*([^.]+)/);
    const sugM = t.match(/Sugestão:\s*(.+)$/);
    return {
      patient_id: r.patient_id,
      nota: notaM ? parseInt(notaM[1]) : null,
      facilidade: facM ? facM[1].trim() : '',
      utilidade: utiM ? utiM[1].trim() : '',
      sugestao: sugM ? sugM[1].trim() : '',
      data: r.created_at
    };
  });

  const notas = entries.map(e => e.nota).filter(n => n !== null);
  const media = notas.length ? (notas.reduce((a, b) => a + b, 0) / notas.length).toFixed(1) : '—';
  const dist = [0, 0, 0, 0, 0];
  notas.forEach(n => { if (n >= 1 && n <= 5) dist[n - 1]++; });
  const labels = ['Muito insatisfeito', 'Insatisfeito', 'Regular', 'Satisfeito', 'Muito satisfeito'];
  const barColors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#16a34a'];

  let html = `
    <div style="background:linear-gradient(135deg,#f5f3ff,#ede9fe);border-radius:16px;padding:20px;margin-bottom:16px;text-align:center;">
      <div style="font-size:48px;font-weight:900;color:#7c3aed;">${media} <span style="font-size:28px;">⭐</span></div>
      <div style="color:#6d28d9;font-size:14px;font-weight:600;">${notas.length} avaliação(ões) recebida(s)</div>
    </div>
    <div style="background:#fff;border-radius:12px;padding:16px;border:1px solid #e2e8f0;margin-bottom:16px;">
      <h4 style="font-weight:700;font-size:14px;margin-bottom:12px;color:#334155;">Distribuição das Notas</h4>
      ${dist.map((count, i) => {
        const pct = notas.length ? Math.round((count / notas.length) * 100) : 0;
        return `<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
          <span style="width:130px;font-size:12px;color:#64748b;">${labels[i]}</span>
          <div style="flex:1;height:18px;background:#f1f5f9;border-radius:9px;overflow:hidden;">
            <div style="width:${pct}%;height:100%;background:${barColors[i]};border-radius:9px;transition:width 0.5s;"></div>
          </div>
          <span style="font-size:12px;font-weight:700;color:#334155;min-width:32px;text-align:right;">${count}</span>
        </div>`;
      }).join('')}
    </div>
    <h4 style="font-weight:700;font-size:14px;margin-bottom:8px;color:#334155;">Respostas individuais</h4>
    <div style="max-height:300px;overflow-y:auto;">
  `;

  for (const e of entries) {
    const paciente = pacientes.find(p => p.patient_id === e.patient_id);
    const nome = paciente ? paciente.nome : (e.patient_id || 'Anônimo');
    const stars = e.nota ? '⭐'.repeat(e.nota) + '☆'.repeat(5 - e.nota) : '—';
    const dataF = e.data ? new Date(e.data).toLocaleDateString('pt-BR') : '';
    html += `
      <div style="background:#fafafa;border:1px solid #e2e8f0;border-radius:12px;padding:12px;margin-bottom:8px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
          <span style="font-weight:700;font-size:13px;color:#334155;">${nome.length > 25 ? nome.substring(0, 25) + '…' : nome}</span>
          <span style="font-size:11px;color:#94a3b8;">${dataF}</span>
        </div>
        <div style="font-size:16px;margin-bottom:4px;">${stars}</div>
        ${e.facilidade && e.facilidade !== 'N/I' ? `<div style="font-size:12px;color:#64748b;"><b>Facilidade:</b> ${e.facilidade}</div>` : ''}
        ${e.utilidade && e.utilidade !== 'N/I' ? `<div style="font-size:12px;color:#64748b;"><b>Utilidade:</b> ${e.utilidade}</div>` : ''}
        ${e.sugestao && e.sugestao !== 'Nenhuma' ? `<div style="font-size:12px;color:#7c3aed;margin-top:4px;"><b>💬</b> ${e.sugestao}</div>` : ''}
      </div>`;
  }

  html += '</div>';
  body.innerHTML = html;
}

function fecharSatisfacaoModal() {
  const modal = document.getElementById('satisfacaoModal');
  if (modal) modal.style.display = 'none';
}

// ============================================
// UTILITÁRIOS
// ============================================
function formatarData(iso) {
  if (!iso) return '-';
  try {
    return new Date(iso).toLocaleString('pt-BR', {
      day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit'
    });
  } catch { return iso; }
}

function formatarDataCurta(iso) {
  if (!iso) return '-';
  try {
    return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  } catch { return iso; }
}

function calcularIdade(nascimento) {
  if (!nascimento) return '';
  try {
    const partes = nascimento.split('/');
    let data = partes.length === 3 ? new Date(partes[2], partes[1] - 1, partes[0]) : new Date(nascimento);
    return Math.floor((Date.now() - data.getTime()) / 31557600000) + ' anos';
  } catch { return ''; }
}

function mostrarLoading(msg) {
  document.getElementById('patientList').innerHTML = `
    <div class="empty-state">
      <div class="empty-icon">⏳</div>
      <p>${msg}</p>
    </div>
  `;
}

function mostrarErro(msg) {
  document.getElementById('patientList').innerHTML = `
    <div class="empty-state">
      <div class="empty-icon">⚠️</div>
      <p>${msg}</p>
    </div>
  `;




}

async function salvarValoresPanicoSupabase(patientKey) {
  if (!patientKey) return alert('Paciente não selecionado');

  const paSistMax = parseFloat(document.getElementById('paSistolicaMax').value) || null;
  const paSistMin = parseFloat(document.getElementById('paSistolicaMin').value) || null;
  const paDiastMax = parseFloat(document.getElementById('paDiastolicaMax').value) || null;
  const paDiastMin = parseFloat(document.getElementById('paDiastolicaMin').value) || null;
  const glicemiaMax = parseFloat(document.getElementById('glicemiaMax').value) || null;
  const glicemiaMin = parseFloat(document.getElementById('glicemiaMin').value) || null;

  const rid = uuidv4();
  const now = new Date().toISOString();

  // Salva localmente
  const localId = await db.registros.add({
    registro_id: rid,
    patient_id: patientKey,
    device_id: 'web',
    texto: `Valores de Pânico`,
    tipo: 'valores_panico',
    status: 'pendente',
    created_at: now,
    updated_at: now,
    pa_sistolica_max: paSistMax,
    pa_sistolica_min: paSistMin,
    pa_diastolica_max: paDiastMax,
    pa_diastolica_min: paDiastMin,
    glicemia_max: glicemiaMax,
    glicemia_min: glicemiaMin,
    synced: 0
  });

  // Envia para o Supabase
  if (supabase) {
    try {
      await supabase.from('registros').insert({
        registro_id: rid,
        patient_id: patientKey,
        device_id: 'web',
        texto: `Valores de Pânico`,
        tipo: 'valores_panico',
        status: 'pendente',
        pa_sistolica_max: paSistMax,
        pa_sistolica_min: paSistMin,
        pa_diastolica_max: paDiastMax,
        pa_diastolica_min: paDiastMin,
        glicemia_max: glicemiaMax,
        glicemia_min: glicemiaMin,
        created_at: now,
        updated_at: now
      });
      await db.registros.update(localId, { synced: 1 });
      alert('✅ Valores de pânico salvos com sucesso!');
      fecharValoresPanicoModal();
    } catch (e) {
      console.error('Erro ao salvar no Supabase', e);
      alert('❌ Erro ao salvar valores de pânico.');
    }
  }
}


