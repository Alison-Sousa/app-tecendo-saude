(function(){
  const { useEffect, useMemo, useState } = React;

  const onlyDigits = (value) => String(value || '').replace(/\D/g, '');
  const normalizar = (value) => String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  const maskCpf = (value) => {
    const clean = onlyDigits(value);
    if (typeof mascaraCPF === 'function') return mascaraCPF(clean || value || '');
    return clean || value || '';
  };

  const maskTelefone = (value) => {
    if (typeof mascaraTelefone === 'function') return mascaraTelefone(value || '');
    return value || '';
  };

  const tipoLabel = (tipo) => {
    if (tipo === 'telessaude') return 'Telessaúde';
    if (tipo === 'equipe_ubs') return 'Profissional de Saúde';
    if (tipo === 'tecnico_enfermagem') return 'Técnico de Enfermagem';
    if (normalizar(tipo).startsWith('coord')) return 'Coordenador';
    return 'ACS';
  };

  const tipoStyle = (tipo) => {
    if (tipo === 'telessaude') return { background: '#e0e7ff', color: '#4338ca' };
    if (tipo === 'equipe_ubs') return { background: '#fff7ed', color: '#c2410c' };
    if (tipo === 'tecnico_enfermagem') return { background: '#ecfeff', color: '#0e7490' };
    if (normalizar(tipo).startsWith('coord')) return { background: '#f3e8ff', color: '#7e22ce' };
    return { background: '#dcfce7', color: '#166534' };
  };

  const listaGlobal = (nome, fallback = []) => {
    try {
      if (Array.isArray(window[nome])) return window[nome];
    } catch {}
    return fallback;
  };

  const opcoesUbs = (municipio) => {
    try {
      if (typeof getUbsByMunicipio === 'function') return getUbsByMunicipio(municipio);
    } catch {}
    return listaGlobal('LISTA_UBS', ['Coordenador(a)', 'Outro']);
  };

  const isCoordenador = (profissional) => {
    const ubs = normalizar(profissional?.ubs);
    const tipo = normalizar(profissional?.tipo);
    return ubs.includes('coordenador') || tipo.includes('coordenador') || tipo.startsWith('coord');
  };

  window.isCoordenadorProfissional = isCoordenador;

  const Avatar = ({ item, tipo }) => {
    const initial = (item?.nome || '').trim().charAt(0).toUpperCase() || (tipo === 'usuario' ? 'U' : 'P');
    return (
      <div style={{width:52,height:52,borderRadius:'50%',overflow:'hidden',background:'#eef7f0',border:'2px solid #dbece0',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,color:'#2f6b3f',flex:'0 0 auto'}}>
        {item?.foto_url ? <img src={item.foto_url} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}} /> : initial}
      </div>
    );
  };

  const Campo = ({ label, children }) => (
    <label style={{display:'block',fontSize:12,fontWeight:800,color:'#64748b',textTransform:'uppercase',letterSpacing:.4,marginBottom:10}}>
      <span style={{display:'block',marginBottom:6}}>{label}</span>
      {children}
    </label>
  );

  const InfoLinha = ({ label, value }) => (
    <div style={{padding:'10px 0',borderBottom:'1px solid #eef2f7'}}>
      <div style={{fontSize:11,fontWeight:800,color:'#94a3b8',textTransform:'uppercase',letterSpacing:.4}}>{label}</div>
      <div style={{fontSize:14,fontWeight:700,color:'#1f2a44',wordBreak:'break-word'}}>{value || '-'}</div>
    </div>
  );

  window.GestaoCoordenador = function GestaoCoordenador({ profissional, onBack }) {
    const [aba, setAba] = useState('usuarios');
    const [busca, setBusca] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [profissionais, setProfissionais] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [selecionado, setSelecionado] = useState(null);
    const [form, setForm] = useState({});
    const [erroGestao, setErroGestao] = useState('');

    const adminCpf = onlyDigits(profissional?.cpf);
    const adminNome = profissional?.nome || profissional?.enfermeira || profissional?.name || '';
    const regioes = listaGlobal('LISTA_REGIOES');
    const acs = listaGlobal('LISTA_ACS');
    const municipios = listaGlobal('PROFISSIONAL_MUNICIPIOS', ['Almeirim', 'Jacareacanga', 'Prainha', 'Outro']);

    const carregar = async () => {
      setLoading(true);
      setErroGestao('');

      if (!isCoordenador(profissional)) {
        setUsuarios([]);
        setProfissionais([]);
        setErroGestao('Acesso permitido apenas para coordenador.');
        setLoading(false);
        return;
      }

      try {
        const [usersResp, prosResp] = await Promise.all([
          supabase
            .from('perfis')
            .select('patient_id,nome,cpf,nascimento,regiao,foto_url,telefone,ubs_referencia,acs_responsavel,equipe_ubs,genero,raca,hipertensao,diabetes,gestante,created_at,updated_at')
            .order('nome', { ascending: true })
            .limit(2000),
          supabase
            .from('profissionais')
            .select('id,nome,cpf,telefone,municipio,ubs,tipo,foto_url,created_at,updated_at')
            .order('nome', { ascending: true })
            .limit(2000)
        ]);

        if (usersResp.error) throw usersResp.error;
        if (prosResp.error) throw prosResp.error;

        setUsuarios(usersResp.data || []);
        setProfissionais(prosResp.data || []);
      } catch (err) {
        console.error(err);
        setUsuarios([]);
        setProfissionais([]);
        setErroGestao(err?.message || 'Não foi possível carregar a gestão.');
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      carregar();
    }, [profissional?.id, profissional?.cpf, profissional?.tipo, profissional?.ubs]);

    const registrarAuditoria = async ({ acao, alvoTipo, alvoId, alvoCpf, alvoNome, antes, depois }) => {
      const { error } = await supabase.from('gestao_auditoria').insert({
        admin_profissional_id: profissional?.id || null,
        admin_cpf: adminCpf || profissional?.cpf || null,
        admin_nome: adminNome || null,
        acao,
        alvo_tipo: alvoTipo,
        alvo_id: alvoId ? String(alvoId) : null,
        alvo_cpf: alvoCpf || null,
        alvo_nome: alvoNome || null,
        antes: antes || null,
        depois: depois || null
      });
      if (error) throw error;
    };

    const lista = useMemo(() => {
      const termo = normalizar(busca);
      const base = aba === 'usuarios' ? usuarios : profissionais;
      if (!termo) return base;
      return base.filter((item) => normalizar([
        item.nome,
        item.cpf,
        item.telefone,
        item.ubs,
        item.ubs_referencia,
        item.regiao,
        item.municipio,
        item.acs_responsavel,
        item.equipe_ubs
      ].join(' ')).includes(termo));
    }, [aba, busca, usuarios, profissionais]);

    const abrirUsuario = (item) => {
      setSelecionado({ tipo: 'usuario', item });
      setForm({
        nome: item.nome || '',
        cpf: item.cpf || '',
        telefone: item.telefone || '',
        regiao: item.regiao || '',
        ubs_referencia: item.ubs_referencia || '',
        acs_responsavel: item.acs_responsavel || '',
        equipe_ubs: item.equipe_ubs || '',
        foto_url: item.foto_url || ''
      });
    };

    const abrirProfissional = (item) => {
      setSelecionado({ tipo: 'profissional', item });
      setForm({
        nome: item.nome || '',
        cpf: item.cpf || '',
        telefone: item.telefone || '',
        municipio: item.municipio || '',
        ubs: item.ubs || '',
        tipo: item.tipo || 'acs',
        foto_url: item.foto_url || ''
      });
    };

    const fecharDetalhe = () => {
      setSelecionado(null);
      setForm({});
    };

    const salvarUsuario = async () => {
      if (!form.nome.trim()) return alert('Informe o nome do usuário.');
      setSaving(true);
      try {
        const antes = selecionado.item;
        const payload = {
          nome: form.nome.trim(),
          telefone: form.telefone || null,
          regiao: form.regiao || null,
          ubs_referencia: form.ubs_referencia || null,
          acs_responsavel: form.acs_responsavel || null,
          equipe_ubs: form.equipe_ubs || null,
          foto_url: form.foto_url || null,
          updated_at: new Date().toISOString()
        };

        const { data, error } = await supabase
          .from('perfis')
          .update(payload)
          .eq('patient_id', antes.patient_id)
          .select('*')
          .single();
        if (error) throw error;

        await registrarAuditoria({
          acao: 'editar',
          alvoTipo: 'usuario',
          alvoId: antes.patient_id,
          alvoCpf: antes.cpf,
          alvoNome: antes.nome,
          antes,
          depois: data || { ...antes, ...payload }
        });

        await carregar();
        alert('Cadastro do usuário atualizado.');
        fecharDetalhe();
      } catch (err) {
        console.error(err);
        alert(err?.message || 'Não foi possível salvar o usuário.');
      } finally {
        setSaving(false);
      }
    };

    const salvarProfissional = async () => {
      if (!form.nome.trim()) return alert('Informe o nome do profissional.');
      setSaving(true);
      try {
        const antes = selecionado.item;
        const payload = {
          nome: form.nome.trim(),
          telefone: form.telefone || null,
          municipio: form.municipio || null,
          ubs: form.ubs || null,
          tipo: form.tipo || 'acs',
          foto_url: form.foto_url || null,
          updated_at: new Date().toISOString()
        };

        const { data, error } = await supabase
          .from('profissionais')
          .update(payload)
          .eq('id', antes.id)
          .select('*')
          .single();
        if (error) throw error;

        await registrarAuditoria({
          acao: 'editar',
          alvoTipo: 'profissional',
          alvoId: antes.id,
          alvoCpf: antes.cpf,
          alvoNome: antes.nome,
          antes,
          depois: data || { ...antes, ...payload }
        });

        await carregar();
        alert('Cadastro do profissional atualizado.');
        fecharDetalhe();
      } catch (err) {
        console.error(err);
        alert(err?.message || 'Não foi possível salvar o profissional.');
      } finally {
        setSaving(false);
      }
    };

    const confirmarExclusao = (nome) => {
      const ok = confirm(`Exclusão definitiva no Supabase.\n\nDeseja mesmo excluir ${nome}?`);
      if (!ok) return false;
      return prompt('Para confirmar a exclusão definitiva, digite EXCLUIR') === 'EXCLUIR';
    };

    const excluirUsuario = async () => {
      const item = selecionado.item;
      const nome = item.nome || 'este usuário';
      if (!confirmarExclusao(nome)) return;
      setSaving(true);
      try {
        await registrarAuditoria({
          acao: 'excluir',
          alvoTipo: 'usuario',
          alvoId: item.patient_id,
          alvoCpf: item.cpf,
          alvoNome: item.nome,
          antes: item,
          depois: null
        });

        const meds = await supabase.from('medicamentos').delete().eq('patient_id', item.patient_id);
        if (meds.error) throw meds.error;
        const regs = await supabase.from('registros').delete().eq('patient_id', item.patient_id);
        if (regs.error) throw regs.error;
        const perfil = await supabase.from('perfis').delete().eq('patient_id', item.patient_id);
        if (perfil.error) throw perfil.error;

        await carregar();
        fecharDetalhe();
      } catch (err) {
        console.error(err);
        alert(err?.message || 'Não foi possível excluir o usuário.');
      } finally {
        setSaving(false);
      }
    };

    const excluirProfissional = async () => {
      const item = selecionado.item;
      const nome = item.nome || 'este profissional';
      if (onlyDigits(item.cpf) && onlyDigits(item.cpf) === adminCpf) {
        return alert('Não ? possível excluir o próprio coordenador logado.');
      }
      if (!confirmarExclusao(nome)) return;
      setSaving(true);
      try {
        await registrarAuditoria({
          acao: 'excluir',
          alvoTipo: 'profissional',
          alvoId: item.id,
          alvoCpf: item.cpf,
          alvoNome: item.nome,
          antes: item,
          depois: null
        });

        const { error } = await supabase.from('profissionais').delete().eq('id', item.id);
        if (error) throw error;

        await carregar();
        fecharDetalhe();
      } catch (err) {
        console.error(err);
        alert(err?.message || 'Não foi possível excluir o profissional.');
      } finally {
        setSaving(false);
      }
    };

    const renderLista = () => (
      <div className="space-y-3">
        {lista.map((item) => {
          const isUser = aba === 'usuarios';
          return (
            <button
              key={isUser ? item.patient_id : item.id}
              type="button"
              onClick={() => isUser ? abrirUsuario(item) : abrirProfissional(item)}
              className="card"
              style={{width:'100%',textAlign:'left',display:'flex',gap:12,alignItems:'center',cursor:'pointer',marginBottom:10}}
            >
              <Avatar item={item} tipo={isUser ? 'usuario' : 'profissional'} />
              <div style={{minWidth:0,flex:1}}>
                <div style={{fontSize:16,fontWeight:900,color:'#1f2a44',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{item.nome || 'Sem nome'}</div>
                <div style={{fontSize:12,color:'#64748b',fontWeight:700,marginTop:2}}>{maskCpf(item.cpf) || 'CPF n?o informado'}</div>
                <div style={{fontSize:12,color:'#64748b',marginTop:4,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                  {isUser ? (item.ubs_referencia || item.regiao || 'Sem UBS') : (item.ubs || item.municipio || 'Sem UBS')}
                </div>
              </div>
              {!isUser && <span style={{...tipoStyle(item.tipo),fontSize:10,fontWeight:900,borderRadius:999,padding:'5px 8px',textTransform:'uppercase'}}>{tipoLabel(item.tipo)}</span>}
            </button>
          );
        })}
        {!loading && lista.length === 0 && (
          <div className="card" style={{textAlign:'center',color:'#64748b',fontWeight:700}}>Nenhum cadastro encontrado.</div>
        )}
      </div>
    );

    if (selecionado?.tipo === 'usuario') {
      const item = selecionado.item;
      return (
        <div className="p-6 fade-in" style={{maxWidth:760,margin:'0 auto'}}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-800">Ficha do Usuário</h1>
              <p className="text-sm text-slate-500 font-semibold">CPF bloqueado para edição</p>
            </div>
            <button onClick={fecharDetalhe} className="btn-sec" style={{width:'auto',padding:'10px 16px'}}>Voltar</button>
          </div>

          <div className="card" style={{display:'flex',gap:14,alignItems:'center'}}>
            <Avatar item={{ ...item, foto_url: form.foto_url, nome: form.nome }} tipo="usuario" />
            <div style={{minWidth:0}}>
              <div style={{fontWeight:900,fontSize:18,color:'#1f2a44',wordBreak:'break-word'}}>{form.nome || 'Sem nome'}</div>
              <div style={{fontSize:13,color:'#64748b',fontWeight:700}}>{maskCpf(form.cpf)}</div>
            </div>
          </div>

          <div className="card">
            <Campo label="Nome"><input className="input-box" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} /></Campo>
            <Campo label="CPF"><input className="input-box" value={maskCpf(form.cpf)} disabled style={{background:'#f8fafc',color:'#64748b'}} /></Campo>
            <Campo label="Telefone"><input className="input-box" value={form.telefone} onChange={(e) => setForm({ ...form, telefone: maskTelefone(e.target.value) })} /></Campo>
            <Campo label="Foto"><input className="input-box" placeholder="URL da foto" value={form.foto_url} onChange={(e) => setForm({ ...form, foto_url: e.target.value })} /></Campo>
            <Campo label="Município">
              <select value={form.regiao} onChange={(e) => setForm({ ...form, regiao: e.target.value, ubs_referencia: '' })}>
                <option value="">Selecione</option>
                {regioes.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </Campo>
            <Campo label="UBS">
              <select value={form.ubs_referencia} onChange={(e) => setForm({ ...form, ubs_referencia: e.target.value })}>
                <option value="">Selecione</option>
                {opcoesUbs(form.regiao).map((u) => <option key={u} value={u}>{u}</option>)}
              </select>
            </Campo>
            <Campo label="ACS responsável">
              <select value={form.acs_responsavel} onChange={(e) => setForm({ ...form, acs_responsavel: e.target.value })}>
                <option value="">Selecione</option>
                {acs.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </Campo>
            <Campo label="Equipe UBS"><input className="input-box" value={form.equipe_ubs} onChange={(e) => setForm({ ...form, equipe_ubs: e.target.value })} /></Campo>
          </div>

          <div className="card">
            <InfoLinha label="Nascimento" value={item.nascimento} />
            <InfoLinha label="Gênero" value={item.genero} />
            <InfoLinha label="Raça/cor" value={item.raca} />
            <InfoLinha label="Hipertensão" value={item.hipertensao} />
            <InfoLinha label="Diabetes" value={item.diabetes} />
            <InfoLinha label="Gestante" value={item.gestante} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <button className="btn-primary" onClick={salvarUsuario} disabled={saving}>{saving ? 'Salvando...' : 'Salvar usuário'}</button>
            <button className="btn-sec" onClick={excluirUsuario} disabled={saving} style={{borderColor:'#fecaca',color:'#991b1b'}}>Excluir usuário</button>
          </div>
        </div>
      );
    }

    if (selecionado?.tipo === 'profissional') {
      return (
        <div className="p-6 fade-in" style={{maxWidth:760,margin:'0 auto'}}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-800">Cadastro Profissional</h1>
              <p className="text-sm text-slate-500 font-semibold">CPF bloqueado para edição</p>
            </div>
            <button onClick={fecharDetalhe} className="btn-sec" style={{width:'auto',padding:'10px 16px'}}>Voltar</button>
          </div>

          <div className="card" style={{display:'flex',gap:14,alignItems:'center'}}>
            <Avatar item={{ ...selecionado.item, foto_url: form.foto_url, nome: form.nome }} tipo="profissional" />
            <div style={{minWidth:0}}>
              <div style={{fontWeight:900,fontSize:18,color:'#1f2a44',wordBreak:'break-word'}}>{form.nome || 'Sem nome'}</div>
              <div style={{fontSize:13,color:'#64748b',fontWeight:700}}>{maskCpf(form.cpf)}</div>
            </div>
          </div>

          <div className="card">
            <Campo label="Nome"><input className="input-box" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} /></Campo>
            <Campo label="CPF"><input className="input-box" value={maskCpf(form.cpf)} disabled style={{background:'#f8fafc',color:'#64748b'}} /></Campo>
            <Campo label="Telefone"><input className="input-box" value={form.telefone} onChange={(e) => setForm({ ...form, telefone: maskTelefone(e.target.value) })} /></Campo>
            <Campo label="Foto"><input className="input-box" placeholder="URL da foto" value={form.foto_url} onChange={(e) => setForm({ ...form, foto_url: e.target.value })} /></Campo>
            <Campo label="Tipo">
              <select value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })}>
                <option value="acs">ACS</option>
                <option value="equipe_ubs">Profissional de Saúde</option>
                <option value="tecnico_enfermagem">Técnico de Enfermagem</option>
                <option value="telessaude">Telessaúde</option>
              </select>
            </Campo>
            <Campo label="Município">
              <select value={form.municipio} onChange={(e) => setForm({ ...form, municipio: e.target.value, ubs: '' })}>
                <option value="">Selecione</option>
                {municipios.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </Campo>
            <Campo label="UBS">
              <select value={form.ubs} onChange={(e) => setForm({ ...form, ubs: e.target.value })}>
                <option value="">Selecione</option>
                {opcoesUbs(form.municipio).map((u) => <option key={u} value={u}>{u}</option>)}
              </select>
            </Campo>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <button className="btn-primary" onClick={salvarProfissional} disabled={saving}>{saving ? 'Salvando...' : 'Salvar profissional'}</button>
            <button className="btn-sec" onClick={excluirProfissional} disabled={saving} style={{borderColor:'#fecaca',color:'#991b1b'}}>Excluir profissional</button>
          </div>
        </div>
      );
    }

    return (
      <div className="p-6 fade-in" style={{maxWidth:820,margin:'0 auto'}}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800">Gerenciar Usuários</h1>
            <p className="text-sm text-slate-500 font-semibold">Usuários do SUS e profissionais</p>
          </div>
          <button onClick={onBack} className="btn-sec" style={{width:'auto',padding:'10px 16px'}}>Voltar</button>
        </div>

        <div className="card">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:12}}>
            <button className={aba === 'usuarios' ? 'btn-primary' : 'btn-sec'} onClick={() => setAba('usuarios')} style={{padding:12,boxShadow:'none'}}>
              Usuários ({usuarios.length})
            </button>
            <button className={aba === 'profissionais' ? 'btn-primary' : 'btn-sec'} onClick={() => setAba('profissionais')} style={{padding:12,boxShadow:'none'}}>
              Profissionais ({profissionais.length})
            </button>
          </div>
          <input className="input-box" placeholder="Buscar por nome, CPF, telefone ou UBS" value={busca} onChange={(e) => setBusca(e.target.value)} style={{marginBottom:0}} />
        </div>

        {erroGestao && <div className="card" style={{background:'#fef2f2',color:'#991b1b',borderColor:'#fecaca',fontWeight:700}}>{erroGestao}</div>}
        {loading ? <div className="loading">Carregando cadastros...</div> : renderLista()}
      </div>
    );
  };
})();
