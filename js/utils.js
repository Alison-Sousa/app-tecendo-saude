// ================================================
// TECENDO SAÚDE - FUNÇÕES UTILITÁRIAS
// ================================================

// Máscaras de formatação
const mascaraCPF = v => v.replace(/\D/g,'').replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d{1,2})/,'$1-$2').replace(/(-\d{2})\d+?$/,'$1');
const mascaraData = v => v.replace(/\D/g,'').replace(/(\d{2})(\d)/,'$1/$2').replace(/(\d{2})(\d)/,'$1/$2').replace(/(\d{4})\d+?$/,'$1');
const mascaraTelefone = v => {
  const nums = v.replace(/\D/g,'');
  if(nums.length <= 10) return nums.replace(/(\d{2})(\d)/,'($1) $2').replace(/(\d{4})(\d)/,'$1-$2');
  return nums.replace(/(\d{2})(\d)/,'($1) $2').replace(/(\d{5})(\d)/,'$1-$2').replace(/(\d{4})\d+?$/,'$1');
};

// Cálculo de idade
const calcAge = d => { if(!d) return ''; const y = d.split('/').reverse().join('-'); const diff = Date.now() - new Date(y).getTime(); return Math.floor(diff/(31557600000)) + ' anos'; };

// Normalização de datas
const normalizeDateInput = raw => {
  if(!raw) return '';
  const str = String(raw).trim();
  if(!str) return '';
  if(str.includes('T')) return normalizeDateInput(str.split('T')[0]);
  if(/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    const [year, month, day] = str.split('-');
    return `${day}/${month}/${year}`;
  }
  return str;
};

// Verificações de medicação
const isMedicationActiveValue = value => {
  if(value === null || value === undefined) return true;
  const normalized = String(value).trim().toLowerCase();
  if(!normalized) return true;
  return !(/^(nao|não|inativo|encerrado|0|false)/.test(normalized));
};

const patientUsesMedication = raw => {
  if(raw === null || raw === undefined) return false;
  const normalized = String(raw).trim().toLowerCase();
  if(!normalized) return false;
  if(/^(nao|não|nenhum|sem|zero)/.test(normalized)) return false;
  if(normalized.includes('sim')) return true;
  if(normalized.includes('usa') || normalized.includes('faz uso') || normalized.includes('toma')) return true;
  if(['1','true','yes'].includes(normalized)) return true;
  return false;
};

// Formatação de datas e durações
function formatDateISO(iso){try{return new Date(iso).toLocaleString('pt-BR')}catch(e){return iso||''}}
function formatDuration(seconds){
  const s = Math.max(0, Math.round(seconds||0));
  const m = Math.floor(s/60); const r = s%60;
  return `${String(m).padStart(2,'0')}:${String(r).padStart(2,'0')}`;
}

// Geração de UUID
function uuidv4(){return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,c=>(c^crypto.getRandomValues(new Uint8Array(1))[0]&15>>c/4).toString(16))}

// Conversão de arquivo para DataURL
const fileToDataUrl = (file)=> new Promise((res,rej)=>{ const fr=new FileReader(); fr.onload=()=>res(fr.result); fr.onerror=rej; fr.readAsDataURL(file); });

// Extração de ID do YouTube
const getYoutubeId = (url='') => {
  const match = String(url).match(/(?:v=|be\/|embed\/)([A-Za-z0-9_-]{6,})/);
  return match ? match[1] : '';
};

// Duração de mídia
const getMediaDuration = (file) => {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const media = document.createElement(file.type.startsWith('video') ? 'video' : 'audio');
    media.preload = 'metadata';
    media.onloadedmetadata = () => {
      URL.revokeObjectURL(url);
      resolve(media.duration);
    };
    media.onerror = (e) => {
      URL.revokeObjectURL(url);
      console.error(e);
      reject(new Error('Não foi possível ler a duração da mídia.'));
    };
    media.src = url;
  });
};

// Sincronização com Supabase
async function syncManager() {
  if (!navigator.onLine || !supabase) return;
  try {
    const PERFIL_SYNC_COLUMNS = [
      'patient_id','nome','cpf','nascimento','regiao','foto_url','ubs_referencia','genero','raca','endereco',
      'telefone','escolaridade','profissao','mora_sozinho','mora_companheiro','tem_filhos','qtd_filhos','filhos_json','acs_responsavel','equipe_ubs',
      'hipertensao','tempo_diag_has','diabetes','tempo_diag_dm','gestante','infeccao_urinaria_gestacao','dependencias',
      'tempo_dependencia','condicoes','altura','peso_inicial','peso_atual','peso_primeira_consulta','imc_pre_gestacional','imc_atual','dum',
      'gestacao_semanas','previsao_parto','faz_pre_natal','inicio_pre_natal','data_ultima_consulta_pre_natal','data_parto','peso_bebe','altura_bebe','amamentando','local_nascimento','vacinas_maternidade','teste_pezinho','data_teste_pezinho','consulta_puerperal','data_consulta_puerperal',
      'enxerga_bem','consulta_oftalmo','tempo_consulta_oftalmo','dificuldade_mastigar_falar_engolir',
      'uso_medicacoes','nomes_medicacoes','posologia_dosagem','posologia_horario','data_ultima_prescricao','data_ultima_dispensacao',
      'atividade_fisica','freq_atividade','tipo_atividade','meta_peso','meta_glicemia','meta_pa_min','meta_pa_max',
      'created_by_nome','created_by_ubs','created_by_cpf'
    ];
    const perfis = await db.perfil.where('synced').equals(0).toArray();
    for (const p of perfis) {
      const { id, synced, patient_id, ...rest } = p;
      const base = { patient_id: patient_id || ('local-'+id) };
      PERFIL_SYNC_COLUMNS.forEach(k => {
        const keyLocal = k === 'patient_id' ? 'patient_id' : k;
        if (keyLocal in rest && rest[keyLocal] !== '' && rest[keyLocal] != null) {
          base[k] = rest[keyLocal];
        }
      });
      if (base.cpf) base.cpf = String(base.cpf).replace(/\D/g,'');
      const nowIso = new Date().toISOString();
      if (!rest.created_at) base.created_at = nowIso;
      base.updated_at = nowIso;
      let { error: perfilError } = await supabase.from('perfis').upsert(base, { onConflict: 'patient_id' });
      if (perfilError) {
        const fallback = { ...base };
        ['data_parto','peso_bebe','altura_bebe','amamentando','local_nascimento','vacinas_maternidade','teste_pezinho','data_teste_pezinho','consulta_puerperal','data_consulta_puerperal'].forEach(k => delete fallback[k]);
        const retry = await supabase.from('perfis').upsert(fallback, { onConflict: 'patient_id' });
        if (retry.error) throw retry.error;
      }
      await db.perfil.update(p.id, { synced: 1 });
    }
    const regs = await db.registros.where('synced').equals(0).toArray();
    for (const r of regs) {
      // Mesclar replies locais com remotos para não perder respostas do profissional
      let localReplies = r.replies_json || r.replies || [];
      if (!Array.isArray(localReplies)) { try { localReplies = JSON.parse(localReplies); } catch { localReplies = []; } }
      try {
        const { data: remote } = await supabase.from('registros').select('replies_json').eq('registro_id', r.registro_id).maybeSingle();
        if (remote?.replies_json) {
          let remoteReplies = remote.replies_json;
          if (!Array.isArray(remoteReplies)) { try { remoteReplies = JSON.parse(remoteReplies); } catch { remoteReplies = []; } }
          // Mesclar: manter todos remotos e adicionar locais que não existem no remoto
          const remoteKeys = new Set(remoteReplies.map(rr => `${rr.from}_${rr.at}_${(rr.text || '').substring(0,30)}`));
          const merged = [...remoteReplies];
          for (const lr of localReplies) {
            const key = `${lr.from}_${lr.at}_${(lr.text || '').substring(0,30)}`;
            if (!remoteKeys.has(key)) merged.push(lr);
          }
          localReplies = merged;
        }
      } catch {}
      await supabase.from('registros').upsert({
        registro_id: r.registro_id,
        patient_id: r.patient_id,
        device_id: r.device_id || r.deviceId || 'web',
        texto: r.texto,
        tipo: r.tipo,
        status: r.status,
        pa_sistolica: r.pa_sistolica ?? null,
        pa_diastolica: r.pa_diastolica ?? null,
        peso_kg: r.peso_kg ?? null,
        glicemia_mg: r.glicemia_mg ?? null,
        gestante: r.gestante ?? null,
        gestacao_semanas: r.gestacao_semanas ?? null,
        replies_json: localReplies,
        created_at: r.created_at || r.createdAt,
        updated_at: r.updated_at || r.updatedAt || new Date().toISOString()
      }, { onConflict: 'registro_id' });
      await db.registros.update(r.id, { synced: 1 });
    }
    const mids = await db.midias.where('synced').equals(0).toArray();
    for (const m of mids) {
      try {
        const fileName = `${m.registro_id}/${m.name.replace(/[^a-zA-Z0-9.]/g,'_')}`;
        const { error: upErr } = await supabase.storage.from('midias').upload(fileName, m.blob, { upsert: true, contentType: m.type || 'application/octet-stream' });
        if (!upErr) {
          await db.midias.update(m.id, { synced: 1 });
        } else {
          console.warn('Erro ao fazer upload de mídia:', upErr);
        }
      } catch (uploadErr) {
        console.warn('Erro no upload:', uploadErr);
      }
    }
  } catch (e) { console.warn('Erro no syncManager:', e); }
}

// ================================================
// OTA UPDATE CHECKER (only for Cordova APK)
// ================================================

async function verificarAtualizacao(silencioso) {
  try {
    // Only check for updates inside Cordova APK, NOT in web browser
    if (!window.cordova) return null;

    var resp = await fetch('../version.json?t=' + Date.now(), { cache: 'no-store' });
    if (!resp.ok) {
      resp = await fetch('./version.json?t=' + Date.now(), { cache: 'no-store' });
    }
    if (!resp.ok) return null;
    var data = await resp.json();
    var remoteVersion = data.version || '0.0.0';
    var localVersion = localStorage.getItem('app_version');

    // First time ever: save current version silently, no banner
    if (!localVersion) {
      localStorage.setItem('app_version', remoteVersion);
      return { disponivel: false, versao: remoteVersion };
    }

    // Version changed since last check: show update
    if (remoteVersion !== localVersion) {
      if (!silencioso) mostrarBannerAtualizacao(remoteVersion, data.build);
      notificarAtualizacao(remoteVersion);
      return { disponivel: true, versao: remoteVersion, build: data.build };
    }
    return { disponivel: false, versao: remoteVersion };
  } catch (e) {
    console.warn('Erro ao verificar atualização:', e);
    return null;
  }
}

function notificarAtualizacao(versao) {
  var dedupKey = 'notify_update_' + versao;
  var last = Number(localStorage.getItem(dedupKey) || 0);
  if (last && (Date.now() - last) < 86400000) return; // 24h dedup per version

  // Cordova local notification
  var cordovaPlugin = window.cordova && window.cordova.plugins && window.cordova.plugins.notification && window.cordova.plugins.notification.local;
  if (cordovaPlugin) {
    try {
      cordovaPlugin.schedule({
        id: 7777,
        title: 'Tecendo Saude - Atualizacao disponivel',
        text: 'Nova versao v' + versao + ' disponivel. Abra o app e toque em Atualizar.',
        channel: 'saude-channel',
        foreground: true, vibrate: true, sound: true,
        smallIcon: 'res://icon', icon: 'file://img/logo.png',
        color: '#2f6b3f', priority: 2, wakeup: true, lockscreen: true,
        group: 'tecendo-saude'
      });
      localStorage.setItem(dedupKey, String(Date.now()));
      return;
    } catch(e) {}
  }

  // Web Notification
  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: 'SHOW_NOTIFICATION',
          title: 'Tecendo Saude - Atualizacao disponivel',
          body: 'Nova versao v' + versao + ' disponivel. Abra o app e toque em Atualizar.',
          tag: 'app_update',
          icon: '../img/logo.png'
        });
      } else {
        new Notification('Tecendo Saude - Atualizacao', {
          body: 'Nova versao v' + versao + ' disponivel!',
          icon: '../img/logo.png', tag: 'app_update'
        });
      }
      localStorage.setItem(dedupKey, String(Date.now()));
    } catch(e) {}
  }
}

function mostrarBannerAtualizacao(versao, build) {
  if (document.getElementById('updateBanner')) return;
  var banner = document.createElement('div');
  banner.id = 'updateBanner';
  banner.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:10000;background:linear-gradient(135deg,#2f6b3f,#1b4d28);color:#fff;padding:14px 20px;display:flex;align-items:center;justify-content:space-between;gap:12px;font-family:Plus Jakarta Sans,sans-serif;box-shadow:0 4px 20px rgba(0,0,0,0.3);animation:slideDown 0.4s ease-out;';
  banner.innerHTML = '<div style="flex:1;min-width:0;">' +
    '<div style="font-weight:800;font-size:14px;margin-bottom:2px;">Nova versao disponivel! v' + versao + '</div>' +
    '<div style="font-size:11px;opacity:0.85;">Atualizado em ' + (build || '') + '. Toque em Atualizar para aplicar.</div>' +
    '</div>' +
    '<button onclick="aplicarAtualizacao()" style="background:#fff;color:#2f6b3f;border:none;border-radius:20px;padding:10px 20px;font-weight:800;font-size:13px;cursor:pointer;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.15);">Atualizar</button>' +
    '<button onclick="this.parentElement.remove()" style="background:none;border:none;color:#fff;font-size:22px;cursor:pointer;padding:0 4px;opacity:0.7;">&times;</button>';
  // Add animation keyframes
  if (!document.getElementById('updateBannerStyle')) {
    var style = document.createElement('style');
    style.id = 'updateBannerStyle';
    style.textContent = '@keyframes slideDown{from{transform:translateY(-100%);opacity:0;}to{transform:translateY(0);opacity:1;}}';
    document.head.appendChild(style);
  }
  document.body.prepend(banner);
}

async function aplicarAtualizacao() {
  var banner = document.getElementById('updateBanner');
  if (banner) banner.innerHTML = '<div style="text-align:center;width:100%;font-weight:700;">Atualizando... aguarde</div>';
  try {
    // Clear SW cache
    if ('caches' in window) {
      var names = await caches.keys();
      for (var i = 0; i < names.length; i++) {
        await caches.delete(names[i]);
      }
    }
    // Unregister and re-register SW
    if ('serviceWorker' in navigator) {
      var regs = await navigator.serviceWorker.getRegistrations();
      for (var j = 0; j < regs.length; j++) {
        await regs[j].unregister();
      }
    }
    // Save new version
    var resp = await fetch('../version.json?t=' + Date.now(), { cache: 'no-store' });
    if (!resp.ok) resp = await fetch('./version.json?t=' + Date.now(), { cache: 'no-store' });
    if (resp.ok) {
      var data = await resp.json();
      localStorage.setItem('app_version', data.version || '0.0.0');
    }
    // Cordova: clear WebView cache if available
    if (window.cordova && window.cordova.InAppBrowser) {
      try { window.cordova.InAppBrowser.clearCache(); } catch(e) {}
    }
    // Reload
    window.location.reload(true);
  } catch (e) {
    console.warn('Erro ao atualizar:', e);
    window.location.reload(true);
  }
}

// Auto-check on page load (after 3 seconds)
setTimeout(function() { verificarAtualizacao(false); }, 3000);
// Re-check every 30 minutes
setInterval(function() { verificarAtualizacao(false); }, 1800000);
