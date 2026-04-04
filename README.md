# Tecendo Saúde

> Sistema de saúde offline-first para regiões remotas da Amazônia.

---

## Sobre

O **Tecendo Saúde** conecta pacientes e profissionais de saúde em localidades com conectividade intermitente. Funciona 100% offline, sincronizando automaticamente quando há rede.

---

## Estrutura do Projeto

```
app-tecendo-saude/
├── .github/workflows/
│   └── build-apk.yml        # CI/CD — gera o APK automaticamente
├── audios/                   # Áudios educativos (hipertensão, gestação, etc.)
├── database/
│   ├── database-config.sql   # Schema completo do Supabase
│   ├── seed-dados.sql        # Dados iniciais (UBS, regiões)
│   └── migration-*.sql       # Migrações incrementais
├── env/
│   ├── build-env.js          # Gera env.js a partir de variáveis de ambiente
│   ├── env.example.js        # Template para configuração local
│   └── env.js                # Credenciais Supabase (NÃO versionar)
├── img/
│   └── logo.png
├── js/
│   ├── components.js         # Componentes React reutilizáveis
│   ├── config.js             # Supabase client, Dexie schema, listas de UBS/ACS
│   └── utils.js              # Máscaras, formatação, sync
├── monitoramento/
│   ├── monitoramento.html    # Dashboard de monitoramento (profissional)
│   └── monitoramento.js      # Lógica de gráficos e filtros
├── profissionais/
│   └── profissionais.html    # App do profissional (login, cadastro, ficha médica)
├── styles/
│   └── styles.css            # CSS global
├── usuarios/
│   └── usuarios.html         # App do paciente (login, dashboard, registros)
└── index.html                # Landing page + download do app
```

---

## Tecnologias

| Tecnologia | Uso |
|---|---|
| React 18 | Interface (via CDN + Babel Standalone) |
| TailwindCSS | Estilização (via CDN) |
| Dexie.js | IndexedDB para persistência offline |
| Supabase | Backend (Postgres + Storage) |
| Chart.js | Gráficos de monitoramento |
| Cordova | Empacotamento como APK Android |
| GitHub Actions | Build automático do APK |

---

## Como Rodar Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/Alison-Sousa/app-tecendo-saude.git
   cd app-tecendo-saude
   ```

2. Crie o arquivo de credenciais:
   ```bash
   cp env/env.example.js env/env.js
   ```
   Edite `env/env.js` com suas credenciais do Supabase.

3. Abra com Live Server (VS Code) ou:
   ```bash
   python -m http.server 8000
   ```

---

## Build do APK (Automático)

O APK é gerado automaticamente pelo **GitHub Actions** a cada push na branch `main`.

### Configuração (uma vez)

1. Vá em **Settings → Secrets and variables → Actions** no repositório GitHub
2. Adicione dois secrets:
   - `SUPABASE_URL` — URL do seu projeto Supabase
   - `SUPABASE_KEY` — Chave anon do Supabase

### Como funciona

1. Você faz `git push` na `main`
2. O GitHub Actions compila o APK na nuvem (JDK 17 + Android SDK + Cordova)
3. O APK é publicado automaticamente no **GitHub Releases**
4. O botão "Download App" no site sempre aponta para a versão mais recente

**URL fixa do APK:** `https://github.com/Alison-Sousa/app-tecendo-saude/releases/latest/download/tecendo-saude.apk`

---

## Funcionalidades

### Paciente
- Login por CPF
- Monitoramento diário (PA, peso, glicemia, gestação)
- Envio de registros com fotos, vídeos e áudios
- Biblioteca educativa offline
- Histórico de atendimentos

### Profissional
- Cadastro completo de pacientes (prontuário)
- Ficha médica (comorbidades, metas, pré-natal)
- Dashboard de monitoramento com gráficos e PDF
- Fotos clínicas

### Offline & Sync
- Funciona 100% sem internet
- Sincronização automática via Supabase
- Armazenamento local via IndexedDB (Dexie.js)
- Indicador visual de status de sync

---

## Segurança

- Credenciais Supabase via variáveis de ambiente (nunca no git)
- Transmissão via HTTPS
- Recomenda-se RLS (Row Level Security) no Supabase em produção

---

## Regiões Atendidas

Santarém, Belterra, Mojuí dos Campos, Alenquer, Curuá, Óbidos, Oriximiná, Terra Santa, Faro, Juruti, Monte Alegre, Almeirim, Prainha.

---

## Licença

Projeto acadêmico — Tecendo Linhas do Cuidado Integral à Saúde na Amazônia.
