# 🌿 Tecendo Saúde

> Sistema de telemedicina offline-first para regiões remotas da Amazônia

---

## 📋 Sobre

Conecta pacientes e profissionais de saúde através de:

- ✅ **Funciona 100% offline** (pacientes)
- ✅ **Múltiplas mídias** (foto + vídeo + áudio juntos)
- ✅ **Prontuário completo** (30+ campos)
- ✅ **Chat assíncrono** (até 5 interações)
- ✅ **Sincronização automática** (5 segundos)

---

## 📱 Arquivos

### `app.html` (1.783 linhas)
- React 18 + TailwindCSS (CDN)
- IndexedDB (Dexie.js)
- Funciona offline
- Deploy: copiar para servidor

### `app.apk` (~15 MB)
- Android 7.0+
- Cordova/Capacitor
- Permissões: câmera, microfone, storage

---

## ✨ Funcionalidades

### 👤 Paciente
- Login via CPF (sem senha)
- Cadastro offline (6 campos)
- Enviar texto + múltiplas mídias
- Histórico (atualiza 15s)
- Vídeos inline + fotos clicáveis
- Responder até 5x

### 👨‍⚕️ Profissional
- Login CPF (Supabase)
- Menu com contadores (30s):
  - Atendimentos pendentes
  - Novos cadastros
- Chat com thumbnails
- Vídeos inline
- Prontuário (30+ campos)
- Buscar por CPF

---

## 🏗️ Arquitetura

**Frontend**: React 18 + Babel standalone  
**Local**: Dexie.js (IndexedDB)  
**Backend**: Supabase (PostgreSQL + Storage)  
**Sync**: Loop 5s (offline-first)

---

## 📊 Dados

**Regiões**: 13 municípios  
(Santarém, Belterra, Mojuí dos Campos, Alenquer, Curuá, Óbidos, Oriximiná, Terra Santa, Faro, Juruti, Monte Alegre, Almeirim, Prainha)

**UBS**: 9 unidades  
(Antônio Evangelista, Boa Esperança, Divinópolis, Márcio Marinho, Haroldo Martins, Maria Bibiana da Silva, Nadime Miranda, Neli Loeblein, Vicente Alves da Silva)

**ACS**: 92 agentes cadastrados

---

## 🚀 Usar

### Web (`app.html`)

```bash
python -m http.server 8000
# http://localhost:8000/app.html
```

### Android (`app.apk`)

1. Transferir APK para celular  
2. Habilitar "Fontes desconhecidas"  
3. Instalar APK  
4. Abrir app "Tecendo Saúde" 🌿  

---

## ⚙️ Configurar

Linha 85-86 de `app.html`:

```js
const SUPABASE_URL = 'https://rucpqwojmgnqibeskaaj.supabase.co';
const SUPABASE_KEY = 'sb_publishable_sBflW42mIzVo835NoMrsjw_uYvlCR8z';
```

Depois, executar `supabase_schema.sql` no **SQL Editor** do Supabase.

---

## 📈 Estatísticas

| Item                 | Valor          |
|----------------------|----------------|
| Linhas código        | 1.783          |
| Componentes          | 10             |
| Campos prontuário    | 30+            |
| Limite chat          | 5 interações   |
| Sync                 | 5s             |
| Atualização histórico| 15s            |

---

## ⚠️ Limitações

- Supabase grátis:
  - 1 GB storage
  - 2 GB/mês bandwidth
- Upgrade: **$25/mês** (100 GB)

---

## 🔐 Segurança

- Login via CPF (sem senha)
- HTTPS obrigatório
- RLS desabilitado (acesso via anon key)
- CPF não exposto (UUID nas pastas)

---

## 🔮 Roadmap

- Notificações push  
- PDF prontuário  
- Integração e-SUS  
- Gráficos evolução  
- Videochamada WebRTC  

---

Desenvolvido para comunidades remotas da Amazônia 🌳💚
