// ================================================
// TECENDO SAÚDE - COMPONENTES COMPARTILHADOS
// ================================================
const {useState, useEffect, useRef, useMemo, useCallback} = React;
const LOGO_SRC = window.location.pathname.includes('/pacientes/') || window.location.pathname.includes('/profissionais/') || window.location.pathname.includes('/monitoramento/')
  ? '../img/logo.png'
  : 'img/logo.png';

// Indicador de sincronização
const SyncIndicator = () => {
  const [p, setP] = useState(0);
  useEffect(() => {
    const loop = setInterval(async () => {
      const c1 = await db.registros.where('synced').equals(0).count();
      const c2 = await db.midias.where('synced').equals(0).count();
      setP(c1 + c2);
      if(navigator.onLine && (c1+c2)>0) syncManager();
    }, 5000);
    return () => clearInterval(loop);
  }, []);
  if(p === 0) return null;
  return <div className="sync-float"><div className="dot-pulse"></div> Sincronizando {p}...</div>;
};

// Tela de carregamento
const Loading = ({text}) => (
  <div className="loading">
    <img src={LOGO_SRC} alt="Tecendo Saúde" className="w-16 h-16 mb-4" style={{objectFit:'contain'}} />
    <div>{text}</div>
  </div>
);

// Modal de mídia (visualização)
const MediaModal = ({url, type, onClose}) => {
  return (
    <div className="modal-bg" onClick={onClose} style={{zIndex: 9999}}>
      <div className="flex flex-col items-center justify-center min-h-screen p-4" onClick={e=>e.stopPropagation()}>
        <div className="bg-white rounded-2xl p-4 max-w-4xl w-full max-h-[90vh] overflow-auto shadow-2xl">
          <div className="flex justify-end mb-3">
            <button className="btn-sec w-auto px-6 py-2 text-sm font-bold" onClick={onClose}>✕ Fechar</button>
          </div>
          {(type === 'image' || type?.startsWith('image') || !type) && <img src={url} alt="mídia" className="w-full rounded-lg" />}
          {(type === 'video' || type?.startsWith('video') || type === 'video/mp4') && (
            <video controls src={url} className="w-full rounded-lg bg-black" autoPlay style={{maxHeight: '70vh'}} />
          )}
          {(type === 'audio' || type?.startsWith('audio')) && (
            <div className="p-10 text-center">
              <div className="text-6xl mb-4">🎵</div>
              <audio controls src={url} className="w-full" autoPlay />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Thumbnail de registro
const RegistroThumb = ({registroId}) => {
  const [url, setUrl] = useState('');
  const urlRef = useRef('');
  useEffect(() => {
    let active = true;
    if(urlRef.current){ URL.revokeObjectURL(urlRef.current); urlRef.current=''; }
    setUrl('');
    (async () => {
      const media = await db.midias.where('registroId').equals(registroId).toArray();
      const first = media.find(m => m.type?.startsWith('image')) || media[0];
      if(first && active){
        const objectUrl = URL.createObjectURL(first.blob || first.blob);
        urlRef.current = objectUrl;
        setUrl(objectUrl);
      }
    })();
    return () => {
      active = false;
      if(urlRef.current){ URL.revokeObjectURL(urlRef.current); urlRef.current=''; }
    };
  }, [registroId]);
  if(!url) return <div className="thumb">📄</div>;
  return <img src={url} className="thumb" alt="registro" />;
};

// Banner de offline
const OfflineBanner = ({online}) => !online && <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center text-xs py-2 z-50 font-bold">Modo Offline: dados serão salvos localmente</div>;

// Card de Status de Saúde
const HealthStatusCard = ({ pa, paDiastolica, glicemia, peso, gestante, semanas, atividade, lastUpdate }) => {
  if (!pa && !glicemia && !peso) {
    return (
      <div className="bg-white border border-emerald-200 rounded-2xl p-6 mb-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl">🫀</div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.3em] text-emerald-600 font-bold">Status de Saúde</div>
            <div className="text-lg font-extrabold text-slate-800">Sem dados recentes</div>
            <div className="text-xs text-slate-500 mt-1">Informe PA, peso e glicemia para atualizar seu status.</div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
          <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-2 text-center font-semibold">PA</div>
          <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-2 text-center font-semibold">Peso</div>
          <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-2 text-center font-semibold">Glicemia</div>
        </div>
      </div>
    );
  }
  
  let statusPA = { nivel: 'ok', texto: 'Normal', cor: 'green' };
  if (pa) {
    if (pa >= LIMITES_SAUDE.PA.CRITICA) {
      statusPA = { nivel: 'critico', texto: 'Muito Alta - Procure um médico!', cor: 'red' };
    } else if (pa >= LIMITES_SAUDE.PA.ALTA) {
      statusPA = { nivel: 'alto', texto: 'Alta - Atenção!', cor: 'orange' };
    } else if (pa >= LIMITES_SAUDE.PA.ELEVADA) {
      statusPA = { nivel: 'elevado', texto: 'Elevada - Cuidado', cor: 'amber' };
    } else if (pa < 90) {
      statusPA = { nivel: 'baixo', texto: 'Baixa - Fique atento', cor: 'blue' };
    } else {
      statusPA = { nivel: 'ok', texto: 'Normal', cor: 'green' };
    }
  }
  
  let statusGlic = { nivel: 'ok', texto: 'Normal', cor: 'green' };
  if (glicemia) {
    if (glicemia >= LIMITES_SAUDE.GLICEMIA.CRITICA) {
      statusGlic = { nivel: 'critico', texto: 'Crítica - Procure um médico!', cor: 'red' };
    } else if (glicemia >= LIMITES_SAUDE.GLICEMIA.ALTA) {
      statusGlic = { nivel: 'alto', texto: 'Alta (Diabetes)', cor: 'orange' };
    } else if (glicemia >= LIMITES_SAUDE.GLICEMIA.ELEVADA) {
      statusGlic = { nivel: 'elevado', texto: 'Elevada (Pré-diabetes)', cor: 'amber' };
    } else if (glicemia < LIMITES_SAUDE.GLICEMIA.BAIXA) {
      statusGlic = { nivel: 'critico', texto: 'Baixa - Coma algo doce!', cor: 'red' };
    } else {
      statusGlic = { nivel: 'ok', texto: 'Normal', cor: 'green' };
    }
  }
  
  const niveis = [statusPA.nivel, statusGlic.nivel];
  let statusGeral = 'estavel';
  let corGeral = 'green';
  let textoGeral = '✅ Sua saúde está bem controlada';
  
  if (niveis.includes('critico')) {
    statusGeral = 'critico';
    corGeral = 'red';
    textoGeral = '🚨 Atenção! Você precisa de cuidado médico';
  } else if (niveis.includes('alto')) {
    statusGeral = 'atencao';
    corGeral = 'orange';
    textoGeral = '⚠️ Seus valores estão altos - converse com o profissional';
  } else if (niveis.includes('elevado')) {
    statusGeral = 'atencao';
    corGeral = 'amber';
    textoGeral = '⚠️ Alguns valores elevados - mantenha acompanhamento';
  }
  
  const corClasses = {
    green: 'bg-green-50 border-green-200 text-green-800',
    amber: 'bg-amber-50 border-amber-200 text-amber-800',
    orange: 'bg-orange-50 border-orange-200 text-orange-800',
    red: 'bg-red-50 border-red-200 text-red-800',
    blue: 'bg-blue-50 border-blue-200 text-blue-800'
  };
  
  const corBadge = {
    green: 'bg-green-500',
    amber: 'bg-amber-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500',
    blue: 'bg-blue-500'
  };
  
  return (
    <div className={`rounded-2xl p-5 mb-6 border-2 ${corClasses[corGeral]}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] font-bold opacity-70">Seu Status de Saúde</p>
          <h3 className="text-lg font-extrabold">{textoGeral}</h3>
        </div>
        <span className={`w-4 h-4 rounded-full ${corBadge[corGeral]}`}></span>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        {pa && (
          <div className={`rounded-xl p-3 border ${corClasses[statusPA.cor]}`}>
            <div className="text-xs font-semibold opacity-70 mb-1">Pressão Arterial</div>
            <div className="text-xl font-bold">{pa}/{paDiastolica || '-'} mmHg</div>
            <div className="text-xs font-semibold mt-1">{statusPA.texto}</div>
          </div>
        )}
        {glicemia && (
          <div className={`rounded-xl p-3 border ${corClasses[statusGlic.cor]}`}>
            <div className="text-xs font-semibold opacity-70 mb-1">Glicemia</div>
            <div className="text-xl font-bold">{glicemia} mg/dL</div>
            <div className="text-xs font-semibold mt-1">{statusGlic.texto}</div>
          </div>
        )}
        {peso && (
          <div className="rounded-xl p-3 border bg-slate-50 border-slate-200 text-slate-800">
            <div className="text-xs font-semibold opacity-70 mb-1">Peso</div>
            <div className="text-xl font-bold">{peso} kg</div>
            <div className="text-xs font-semibold mt-1">Registrado</div>
          </div>
        )}
        {gestante && semanas && (
          <div className="rounded-xl p-3 border bg-pink-50 border-pink-200 text-pink-800">
            <div className="text-xs font-semibold opacity-70 mb-1">Gestação</div>
            <div className="text-xl font-bold">{semanas} semanas</div>
            <div className="text-xs font-semibold mt-1">🤰 Gestante</div>
          </div>
        )}
        {atividade && (
          <div className="rounded-xl p-3 border bg-emerald-50 border-emerald-200 text-emerald-800">
            <div className="text-xs font-semibold opacity-70 mb-1">Atividade Física</div>
            <div className="text-xl font-bold">{atividade}</div>
            <div className="text-xs font-semibold mt-1">Registrada</div>
          </div>
        )}
      </div>
      
      {lastUpdate && (
        <div className="text-xs font-semibold opacity-70 text-center">
          Última atualização: {new Date(lastUpdate).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
        </div>
      )}
      
      {statusGeral === 'critico' && (
        <div className="mt-3 p-3 bg-red-100 border border-red-300 rounded-xl text-red-800 text-sm font-semibold text-center">
          ⚠️ Seus valores indicam risco. Procure a UBS mais próxima ou ligue para seu profissional de saúde.
        </div>
      )}
    </div>
  );
};
