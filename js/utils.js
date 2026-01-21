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
      'telefone','escolaridade','profissao','mora_sozinho','mora_companheiro','acs_responsavel','equipe_ubs',
      'hipertensao','tempo_diag_has','diabetes','tempo_diag_dm','infeccao_urinaria_gestacao','vicios',
      'tempo_vicio','altura','peso_inicial','peso_atual','peso_primeira_consulta','imc_pre_gestacional','dum',
      'gestacao_semanas','previsao_parto','faz_pre_natal','inicio_pre_natal','data_ultima_consulta_pre_natal',
      'enxerga_bem','consulta_oftalmo','tempo_consulta_oftalmo','dificuldade_mastigar_falar_engolir',
      'uso_medicacoes','nomes_medicacoes','posologia_dosagem','posologia_horario','data_ultima_prescricao','data_ultima_dispensacao',
      'atividade_fisica','freq_atividade','tipo_atividade','meta_peso','meta_glicemia','meta_pa_min','meta_pa_max',
      'created_by_nome','created_by_ubs','created_by_cpf'
    ];
    const perfis = await db.perfil.where('synced').equals(0).toArray();
    for (const p of perfis) {
      const { id, synced, patientId, ...rest } = p;
      const base = { patient_id: patientId || ('local-'+id) };
      PERFIL_SYNC_COLUMNS.forEach(k => {
        const keyLocal = k === 'patient_id' ? 'patientId' : k;
        if (keyLocal in rest && rest[keyLocal] !== '' && rest[keyLocal] != null) {
          base[k] = rest[keyLocal];
        }
      });
      if (base.cpf) base.cpf = String(base.cpf).replace(/\D/g,'');
      const nowIso = new Date().toISOString();
      if (!rest.created_at) base.created_at = nowIso;
      base.updated_at = nowIso;
      await supabase.from('perfis').upsert(base, { onConflict: 'patient_id' });
      await db.perfil.update(p.id, { synced: 1 });
    }
    const regs = await db.registros.where('synced').equals(0).toArray();
    for (const r of regs) {
      await supabase.from('registros').upsert({
        registro_id: r.registroId,
        patient_id: r.patientId,
        device_id: r.deviceId,
        texto: r.texto,
        tipo: r.tipo,
        status: r.status,
        pa_sistolica: r.pa_sistolica ?? null,
        pa_diastolica: r.pa_diastolica ?? null,
        peso_kg: r.peso_kg ?? null,
        glicemia_mg: r.glicemia_mg ?? null,
        gestante: r.gestante ?? null,
        gestacao_semanas: r.gestacao_semanas ?? null,
        replies_json: r.replies || [],
        created_at: r.createdAt,
        updated_at: r.updatedAt
      }, { onConflict: 'registro_id' });
      await db.registros.update(r.id, { synced: 1 });
    }
    const mids = await db.midias.where('synced').equals(0).toArray();
    for (const m of mids) {
      try {
        const fileName = `${m.registroId}/${m.name.replace(/[^a-zA-Z0-9.]/g,'_')}`;
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
