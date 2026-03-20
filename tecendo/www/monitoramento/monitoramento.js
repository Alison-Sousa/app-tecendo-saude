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
  return {
    pa_sis_max: (p?.meta_pa_sis_max ?? p?.meta_pa_max) ?? LIMITES.PA_SISTOLICA.MUITO_ALTA,
    pa_sis_min: (p?.meta_pa_sis_min ?? p?.meta_pa_min) ?? LIMITES.PA_SISTOLICA.OTIMA,
    pa_dia_max: (p?.meta_pa_dia_max ?? p?.meta_pa_min) ?? LIMITES.PA_DIASTOLICA.MUITO_ALTA,
    pa_dia_min: (p?.meta_pa_dia_min ?? p?.meta_pa_min) ?? LIMITES.PA_DIASTOLICA.OTIMA,
    glicemia_max: (p?.meta_glicemia_max ?? p?.meta_glicemia) ?? LIMITES.GLICEMIA_JEJUM.ALTA,
    glicemia_min: (p?.meta_glicemia_min ?? p?.meta_glicemia) ?? LIMITES.GLICEMIA_JEJUM.BAIXA
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

    // 1. Carregar perfis (pacientes)
    const { data: perfisData, error: perfisError } = await supabase
      .from('perfis')
      .select('*')
      .order('nome');

    if (perfisError) {
      console.error('Erro ao carregar perfis:', perfisError);
      throw perfisError;
    }

    console.log('Perfis recebidos:', perfisData?.length || 0);

    // 2. Carregar registros (PA, glicemia, peso)
    const { data: registrosData, error: registrosError } = await supabase
      .from('registros')
      .select('*')
      .order('created_at', { ascending: false });

    if (registrosError) {
      console.error('Erro ao carregar registros:', registrosError);
      throw registrosError;
    }

    console.log('Registros recebidos:', registrosData?.length || 0);

    pacientes = perfisData || [];
    registros = (registrosData || []).map(r => {
      const replies = normalizarRepliesJson(r);
      const texto = (r.texto && String(r.texto).trim()) ? r.texto : montarTextoPadrao(r);
      return { ...r, replies_json: replies, texto };
    });

    console.log('Perfis carregados:', pacientes.length);
    console.log('Registros carregados:', registros.length);

    if (pacientes.length === 0) {
      mostrarErro('Nenhum usuário do SUS cadastrado no banco de dados. Execute o SQL de seed no Supabase.');
      return;
    }

    // 3. Classificar cada paciente com base nos registros
    pacientes = pacientes.map(p => classificarPaciente(p));

    // 4. Ordenar: críticos primeiro, depois atenção, estáveis, sem dados
    pacientes.sort((a, b) => {
      const ordem = { critico: 0, atencao: 1, estavel: 2, sem_dados: 3 };
      return ordem[a.classificacao] - ordem[b.classificacao];
    });

    // 5. Notificações para o profissional
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

    atualizarEstatisticas();
    popularFiltrosContexto();
    renderizarListaPacientes();

  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    mostrarErro('Erro: ' + error.message + ' - Verifique o console (F12) para detalhes');
  }
}

// ============================================
// CLASSIFICAR PACIENTE (baseado nos REGISTROS)
// ============================================
function classificarPaciente(paciente) {
  // Buscar todos os registros deste paciente
  const regsDoPC = registros.filter(r => r.patient_id === paciente.patient_id);
  const regsOrdenados = regsDoPC.sort((a, b) => new Date(b.created_at || b.updated_at || 0) - new Date(a.created_at || a.updated_at || 0));
  const temVitais = r => r && (r.pa_sistolica != null || r.pa_diastolica != null || r.glicemia_mg != null || r.peso_kg != null);
  const ultimoRegClinico = regsOrdenados.find(r => r.tipo !== 'cadastro' && temVitais(r))
    || regsOrdenados.find(r => r.tipo !== 'cadastro')
    || regsOrdenados.find(temVitais)
    || regsOrdenados[0];
  const ultimoReg = ultimoRegClinico; // Preferir registro clínico para classificação

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
    const semanas = p.dadosVitais?.gestacao_semanas || p.gestacao_semanas;
    const gestText = isGest ? `🤰 Gestação ${semanas ? semanas + ' semanas' : ''}` : '';
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

    return `
      <div class="patient-row ${classe}" ondblclick="selecionarPaciente('${p.patient_id}')" onclick="selecionarPaciente('${p.patient_id}')">
        <div class="patient-initial">${inicial}</div>
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
function selecionarPaciente(patient_id) {
  pacienteSelecionado = pacientes.find(p => p.patient_id === patient_id);
  if (!pacienteSelecionado) return;

  abrirPainelDetalhe();

  document.getElementById('detailName').textContent = pacienteSelecionado.nome || 'Usuário do SUS';

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
      ${inputCampo('edit_nascimento', 'Nascimento', p.nascimento)}
      ${inputCampo('edit_genero', 'Gênero', p.genero)}
      ${inputCampo('edit_raca', 'Raça/Cor', p.raca)}
      ${inputCampo('edit_escolaridade', 'Escolaridade', p.escolaridade)}
      ${inputCampo('edit_profissao', 'Profissão', p.profissao)}
    </div>
    <div class="section-title">Contato e Território</div>
    <div class="grid grid-2">
      ${inputCampo('edit_telefone', 'Telefone', p.telefone)}
      ${inputCampo('edit_endereco', 'Endereço', p.endereco)}
      ${inputCampo('edit_regiao', 'Região', p.regiao)}
      ${inputCampo('edit_ubs_referencia', 'UBS de referência', p.ubs_referencia)}
      ${inputCampo('edit_equipe_ubs', 'Equipe UBS', p.equipe_ubs)}
      ${inputCampo('edit_acs_responsavel', 'ACS responsável', p.acs_responsavel)}
      ${inputCampo('edit_mora_sozinho', 'Mora sozinho?', p.mora_sozinho)}
      ${inputCampo('edit_mora_companheiro', 'Mora com companheiro(a)?', p.mora_companheiro)}
    </div>
    <div class="section-title">Condições e Diagnósticos</div>
    <div class="grid grid-2">
      ${inputCampo('edit_hipertensao', 'Hipertensão', p.hipertensao)}
      ${inputCampo('edit_tempo_diag_has', 'Tempo diagnóstico - HAS', p.tempo_diag_has)}
      ${inputCampo('edit_diabetes', 'Diabetes', p.diabetes)}
      ${inputCampo('edit_tempo_diag_dm', 'Tempo diagnóstico - DM', p.tempo_diag_dm)}
      ${inputCampo('edit_dependencias', 'Dependências', p.dependencias)}
      ${inputCampo('edit_tempo_dependencia', 'Tempo de vício', p.tempo_dependencia || p.tempo_vicio)}
    </div>
    <div class="section-title">Antropometria</div>
    <div class="grid grid-2">
      ${inputCampo('edit_altura', 'Altura', p.altura)}
      ${inputCampo('edit_peso_inicial', 'Peso inicial', p.peso_inicial)}
      ${inputCampo('edit_peso_atual', 'Peso atual', p.peso_atual)}
      ${inputCampo('edit_peso_primeira_consulta', 'Peso 1ª consulta pré-natal', p.peso_primeira_consulta)}
    </div>
    <div class="section-title">Gestação</div>
    <div class="grid grid-2">
      ${inputCampo('edit_dum', 'DUM', p.dum)}
      ${inputCampo('edit_faz_pre_natal', 'Faz pré-natal?', p.faz_pre_natal)}
      ${inputCampo('edit_inicio_pre_natal', 'Início do pré-natal', p.inicio_pre_natal)}
    </div>
    <div class="section-title">Visão e Saúde Bucal</div>
    <div class="grid grid-2">
      ${inputCampo('edit_enxerga_bem', 'Enxerga bem?', p.enxerga_bem)}
      ${inputCampo('edit_consulta_oftalmo', 'Consulta com oftalmologista', p.consulta_oftalmo)}
      ${inputCampo('edit_dificuldade_mastigar_falar_engolir', 'Dificuldade mastigar/falar/engolir', p.dificuldade_mastigar_falar_engolir)}
    </div>
    <div class="section-title">Medicações</div>
    <div class="grid grid-2">
      ${inputCampo('edit_uso_medicacoes', 'Faz uso de medicações?', p.uso_medicacoes)}
      ${inputCampo('edit_nomes_medicacoes', 'Nomes', p.nomes_medicacoes)}
      ${inputCampo('edit_posologia_dosagem', 'Posologia - Dosagem', p.posologia_dosagem)}
      ${inputCampo('edit_posologia_horario', 'Posologia - Horário', p.posologia_horario)}
    </div>
    <div class="section-title">Atividade Física</div>
    <div class="grid grid-2">
      ${inputCampo('edit_freq_atividade', 'Frequência', p.freq_atividade)}
      ${inputCampo('edit_tipo_atividade', 'Tipo de atividade', p.tipo_atividade)}
    </div>
    <div class="section-title">Metas de Saúde</div>
    <div class="grid grid-2">
      ${inputCampo('edit_meta_peso', 'Meta de peso', p.meta_peso, 'number')}
      ${inputCampo('edit_meta_glicemia', 'Meta de glicemia', p.meta_glicemia, 'number')}
      ${inputCampo('edit_meta_pa_min', 'Meta PA mínima', p.meta_pa_min, 'number')}
      ${inputCampo('edit_meta_pa_max', 'Meta PA máxima', p.meta_pa_max, 'number')}
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
    mora_companheiro: get('edit_mora_companheiro'),
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
    freq_atividade: get('edit_freq_atividade'),
    tipo_atividade: get('edit_tipo_atividade'),
    meta_peso: getNum('edit_meta_peso'),
    meta_glicemia: getNum('edit_meta_glicemia'),
    meta_pa_min: getNum('edit_meta_pa_min'),
    meta_pa_max: getNum('edit_meta_pa_max'),
  };
  // Remove keys where the DOM element was not found
  Object.keys(campos).forEach(k => { if (campos[k] === undefined) delete campos[k]; });
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
      ${renderCampo('Mora com companheiro(a)?', p.mora_companheiro)}
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
function renderizarGraficos(container) {
  const p = pacienteSelecionado;
  const hist = (p.historico || []).slice(0, 30).reverse();
  const histFull = (p.historico || []).slice().reverse();
  const isGestante = normalizarSim(p.dadosVitais?.gestante) || normalizarSim(p.gestante);
  const histGest = histFull.filter(r => r.gestacao_semanas && r.peso_kg);

  if (!window.Chart) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">📊</div><p>Chart.js não carregado</p></div>`;
    return;
  }

  if (hist.length < 2) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">📊</div><p>Dados insuficientes (mínimo 2 registros)</p></div>`;
    return;
  }

  const chartWidth = Math.max(600, hist.length * 40);
  container.innerHTML = `
    <div class="section-title" style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
      <span>Evolução dos Indicadores (por dia)</span>
      <button class="btn btn-ghost" style="padding:6px 10px; font-size:12px;" onclick="abrirGraficoExpandido()">Expandir</button>
    </div>
    <div style="height:320px; margin-bottom: 24px; width:100%;">
      <canvas id="healthChart"></canvas>
    </div>
    <div class="section-title">Atividade Física (Sim/Não)</div>
    <div style="height:260px; width:100%;"><canvas id="activityChart"></canvas></div>
    ${isGestante && histGest.length >= 2 ? `
      <div class="section-title mt-4">Curva de Ganho de Peso Gestacional</div>
      <div style="height:300px; width:100%;"><canvas id="gestChart"></canvas></div>
    ` : ''}
  `;

  if (chartInstance) chartInstance.destroy();
  if (activityChartInstance) activityChartInstance.destroy();

  const ctx = document.getElementById('healthChart').getContext('2d');

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: hist.map(r => formatarDataCurta(r.created_at)),
      datasets: [
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
          lineTension: 0.6,
          cubicInterpolationMode: 'monotone',
          borderJoinStyle: 'round',
          borderCapStyle: 'round',
          pointRadius: 3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: true, position: 'bottom' } },
      elements: {
        line: {
          tension: 0.6
        }
      },
      scales: { y: { beginAtZero: false } }
    }
  });

  // Pizza de atividade física (Sim/Não)
  const atividadeSim = hist.filter(r => r.atividade_fisica && r.atividade_fisica !== 'nenhuma').length;
  const atividadeNao = hist.length - atividadeSim;
  const ctxDonut = document.getElementById('activityChart').getContext('2d');
  activityChartInstance = new Chart(ctxDonut, {
    type: 'doughnut',
    data: {
      labels: ['Sim', 'Não'],
      datasets: [
        {
          data: [atividadeSim, atividadeNao],
          backgroundColor: ['#22c55e', '#ef4444'],
          borderWidth: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: true, position: 'bottom' } }
    }
  });

  if (isGestante && histGest.length >= 2) {
    const imcInfo = calcularClasseIMC(p) || { classIMC: 'EUTROFIA', imc: 0 };
    const curva = CURVA_PESO_GESTACIONAL[imcInfo.classIMC] || CURVA_PESO_GESTACIONAL.EUTROFIA;
    const pesoInicial = parseFloat(p.peso_inicial) || parseFloat(histGest[0]?.peso_kg) || 0;
    const labels = histGest.map(r => `Sem ${r.gestacao_semanas}`);
    const ganhoReal = histGest.map(r => (parseFloat(r.peso_kg) - pesoInicial) || null);
    const ganhoMin = histGest.map(r => (curva.min * Math.min(r.gestacao_semanas / 40, 1)).toFixed(1));
    const ganhoMax = histGest.map(r => (curva.max * Math.min(r.gestacao_semanas / 40, 1)).toFixed(1));

    const ctxGest = document.getElementById('gestChart').getContext('2d');
    new Chart(ctxGest, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Ganho Real (kg)',
            data: ganhoReal,
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.15)',
            tension: 0.6,
            lineTension: 0.6,
            cubicInterpolationMode: 'monotone',
            borderJoinStyle: 'round',
            borderCapStyle: 'round',
            pointRadius: 3
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
        plugins: { legend: { display: true, position: 'bottom' } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }

  prepararModalGraficoExpandido(histFull);
}

function prepararModalGraficoExpandido(histFull) {
  let modal = document.getElementById('expandedChartModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'expandedChartModal';
    modal.style.cssText = 'position:fixed; inset:0; background:rgba(0,0,0,0.6); display:none; align-items:center; justify-content:center; padding:16px; z-index:11000;';
    modal.innerHTML = `
      <div style="background:#fff; width:min(1100px, 96vw); height:min(85vh, 900px); border-radius:16px; padding:16px; display:flex; flex-direction:column; gap:12px;">
        <div style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
          <div style="font-weight:700;">Evolução dos Indicadores (período completo)</div>
          <button class="btn btn-ghost" onclick="fecharGraficoExpandido()">Fechar</button>
        </div>
        <div style="flex:1; min-height:0;">
          <canvas id="healthChartExpanded" style="width:100%; height:100%;"></canvas>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  window.__histFullForChart = histFull;
}

function abrirGraficoExpandido() {
  const modal = document.getElementById('expandedChartModal');
  if (!modal) return;
  modal.style.display = 'flex';
  renderizarGraficoExpandido();
}

function fecharGraficoExpandido() {
  const modal = document.getElementById('expandedChartModal');
  if (modal) modal.style.display = 'none';
}

let expandedChartInstance = null;

function renderizarGraficoExpandido() {
  const histFull = window.__histFullForChart || [];
  const canvas = document.getElementById('healthChartExpanded');
  if (!canvas || !window.Chart) return;

  if (expandedChartInstance) expandedChartInstance.destroy();

  const ctx = canvas.getContext('2d');
  expandedChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: histFull.map(r => formatarDataCurta(r.created_at)),
      datasets: [
        {
          label: 'PA Máxima',
          data: histFull.map(r => r.pa_sistolica || null),
          backgroundColor: 'rgba(239, 68, 68, 0.6)',
          borderColor: '#ef4444'
        },
        {
          label: 'PA Mínima',
          data: histFull.map(r => r.pa_diastolica || null),
          backgroundColor: 'rgba(245, 158, 11, 0.6)',
          borderColor: '#f59e0b'
        },
        {
          label: 'Peso (kg)',
          data: histFull.map(r => r.peso_kg || null),
          backgroundColor: 'rgba(34, 197, 94, 0.6)',
          borderColor: '#22c55e'
        },
        {
          label: 'Glicemia (mg/dL)',
          data: histFull.map(r => r.glicemia_mg || null),
          type: 'line',
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          tension: 0.6,
          lineTension: 0.6,
          cubicInterpolationMode: 'monotone',
          borderJoinStyle: 'round',
          borderCapStyle: 'round',
          pointRadius: 3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: true, position: 'bottom' } },
      elements: {
        line: {
          tension: 0.6
        }
      },
      scales: { y: { beginAtZero: false } }
    }
  });
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

  // Usa o limite do paciente (campos meta_*) ou, se nulo, um fallback global
  const maxSist = p.meta_pa_sis_max ?? p.meta_pa_max ?? LIMITES.PA_SISTOLICA.MUITO_ALTA;
  const maxDia = p.meta_pa_dia_max ?? p.meta_pa_min ?? LIMITES.PA_DIASTOLICA.MUITO_ALTA;
  const maxGlic = p.meta_glicemia_max ?? p.meta_glicemia ?? LIMITES.GLICEMIA_JEJUM.ALTA;

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

    if (perfil && (perfil.meta_pa_sis_max || perfil.meta_glicemia_max)) {
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
      // 2. Fallback para os valores globais definidos em perfis (patient_id = 'global')
      const { data: global } = await supabase
        .from('perfis')
        .select('meta_pa_sis_max, meta_pa_sis_min, meta_pa_dia_max, meta_pa_dia_min, meta_glicemia_max, meta_glicemia_min')
        .eq('patient_id', 'global')
        .maybeSingle();

      preencherInputsPanico(global || {
        pa_sistolica_max: 160, pa_sistolica_min: 90,
        pa_diastolica_max: 100, pa_diastolica_min: 60,
        glicemia_max: 200, glicemia_min: 70
      }, false);
    }
  } catch (e) {
    console.error("Erro ao carregar metas:", e);
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
    infoTipo.innerText = isCustom ? "✨ Meta Individual" : "🌍 Meta Global";
    infoTipo.className = isCustom ? "text-primary font-bold" : "text-muted";
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

