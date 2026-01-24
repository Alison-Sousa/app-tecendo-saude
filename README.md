# Tecendo Saúde

> Sistema de telemedicina offline-first para regiões remotas da Amazônia.

---

## 📋 Sobre

O **Tecendo Saúde** é uma aplicação web projetada para conectar pacientes e profissionais de saúde em localidades com conectividade intermitente. O sistema prioriza o funcionamento offline, sincronizando automaticamente quando há rede disponível.

**Objetivos:**
- Permitir atendimentos e registro de dados de saúde em áreas remotas.
- Garantir que pacientes possam acessar conteúdos educativos e seus registros mesmo sem internet.
- Sincronizar dados de forma segura e eficiente quando houver conectividade.

---

## 📂 Estrutura do Projeto

```
app-tecendo-saude/
├── build-env.js  # Script de build para ambiente
├── index.html    # Tela inicial e roteador principal
├── README.md     # Documentação do projeto
│
├── audios/       # Áudios educativos
│   ├── Alerta.mp3
│   ├── Hipertensão.mp3 # Conteúdo sobre pressão alta
│   ├── Infância.mp3  # Cuidados infantis
│   └── Gestação.mp3  # Cuidados na gestação
│
├── database/            # Scripts de banco de dados
│   ├── database-config.sql   # Configuração do Supabase
│   └── seed-dados.sql   # Dados iniciais
│
├── env/    # Configurações de ambiente
│   ├── build-env.js   # Script de build para ambiente
│   ├── env.example.js # Exemplo de configuração
│   └── env.js  # Credenciais Supabase (NÃO versionar)
│
├── img/   # Imagens e assets visuais
│   └── logo.png  # Logo do aplicativo
│
├── js/    # Módulos JavaScript compartilhados
│   ├── components.js  # Componentes React reutilizáveis
│   ├── config.js  # Configurações, constantes e listas (UBS, ACS, etc)
│   └── utils.js   # Funções utilitárias (máscaras, formatação, sync)
│
├── monitoramento/ # Dashboard de monitoramento
│   ├── monitoramento.html # Painel de acompanhamento de pacientes
│   └── monitoramento.js   # Lógica do monitoramento
│
├── profissionais/  # Área exclusiva do profissional
│   └── profissionais.html  # App completo do profissional (login, cadastro, dashboard)
│
├── styles/          # Estilos CSS
│   └── styles.css   # CSS global (usado em páginas específicas)
│
├── textos/          # Documentação de fluxos
│   ├── paciente.md       # Fluxo do paciente
│   └── profissional.md   # Fluxo do profissional
│
└── usuarios/  # Área dos usuários (pacientes)
    └── usuarios.html  # App completo do usuário/paciente (login, dashboard, registros)
```

---

## 📁 Descrição dos Arquivos

### Raiz
| Arquivo | Descrição |
|---------|-----------|
| `build-env.js` | Script de build para gerar configurações de ambiente. |
| `index.html` | Tela de boas-vindas e roteador. Direciona para área de usuários ou profissionais. |
| `README.md` | Esta documentação. |

### /arquivos
| Arquivo | Descrição |
|---------|-----------|
| (Diretório vazio) | Diretório reservado para arquivos diversos do projeto. |

### /audios
| Arquivo | Descrição |
|---------|-----------|
| `Alerta.mp3` | Áudio de alerta geral. |
| `Hipertensão.mp3` | Conteúdo educativo sobre hipertensão. |
| `Infância.mp3` | Conteúdo educativo sobre cuidados infantis. |
| `Gestação.mp3` | Conteúdo educativo sobre cuidados na gestação. |

### /database
| Arquivo | Descrição |
|---------|-----------|
| `database-config.sql` | Scripts SQL para configuração do banco de dados Supabase. |
| `seed-dados.sql` | Scripts SQL para popular o banco com dados iniciais. |

### /env
| Arquivo | Descrição |
|---------|-----------|
| `build-env.js` | Script para gerar `env.js` em builds automatizados. |
| `env.example.js` | Modelo para criar o `env.js`. |
| `env.js` | Credenciais do Supabase (SUPABASE_URL, SUPABASE_KEY). **Não versionar!** |

### /img
| Arquivo | Descrição |
|---------|-----------|
| `logo.png` | Logo do aplicativo Tecendo Saúde. |

### /js (Módulos Compartilhados)
| Arquivo | Descrição |
|---------|-----------|
| `components.js` | Componentes React reutilizáveis: `SyncIndicator`, `Loading`, `MediaModal`, `OfflineBanner`, etc. |
| `config.js` | Configurações do Supabase, schema do Dexie (IndexedDB), listas de UBS, regiões, ACS, profissionais. |
| `utils.js` | Funções utilitárias: máscaras (CPF, data, telefone), formatação, `syncManager()`, conversão de arquivos. |

### /monitoramento
| Arquivo | Descrição |
|---------|-----------|
| `monitoramento.html` | Dashboard para acompanhamento de pacientes pelos profissionais. |
| `monitoramento.js` | Lógica do painel de monitoramento. |

### /profissionais
| Arquivo | Descrição |
|---------|-----------|
| `profissionais.html` | Aplicação completa do profissional: autenticação por CPF, cadastro de novos profissionais, ficha médica completa, acesso ao monitoramento. |

### /styles
| Arquivo | Descrição |
|---------|-----------|
| `styles.css` | CSS global (usado em páginas específicas). |

### /textos
| Arquivo | Descrição |
|---------|-----------|
| `paciente.md` | Documentação do fluxo do paciente. |
| `profissional.md` | Documentação do fluxo do profissional. |

### /usuarios
| Arquivo | Descrição |
|---------|-----------|
| `usuarios.html` | Aplicação completa do usuário/paciente: login por CPF, cadastro rápido, dashboard de monitoramento, envio de registros com mídia, histórico de atendimentos. |
| Arquivo | Descrição |
|---------|-----------|
| `env.js` | Credenciais do Supabase (SUPABASE_URL, SUPABASE_KEY). **Não versionar!** |
| `env.example.js` | Modelo para criar o `env.js`. |
| `build-env.js` | Script para gerar `env.js` em builds automatizados. |

---

## ✨ Principais Funcionalidades

### Área do Usuário
- Login simplificado por CPF (validação local e remota).
- Cadastro rápido com dados básicos.
- Monitoramento diário: PA, peso, glicemia, gestação, atividade física.
- Envio de registros com suporte a:
  - Texto
  - Fotos (máx 1MB)
  - Vídeos (máx 1 min)
  - Áudios (gravação via MediaRecorder, máx 1 min)
- Biblioteca educativa com áudios e textos que funcionam offline.
- Histórico de atendimentos com respostas dos profissionais.
- Card de status de saúde com alertas visuais.

### Área do Profissional
- Autenticação por CPF com cadastro automático.
- Cadastro completo de pacientes (prontuário médico).
- Ficha médica detalhada:
  - Dados demográficos
  - Comorbidades (HAS, DM, gestação)
  - Metas de saúde (PA, glicemia, peso)
  - Histórico de vícios
  - Informações de pré-natal
- Acesso ao dashboard de monitoramento.
- Envio de fotos clínicas no cadastro.

### Sincronização & Offline
- Sincronização bidirecional com Supabase (Postgres + Storage).
- Loop `syncManager()` executando periodicamente (5–15s).
- Armazenamento local de mídias via IndexedDB (Dexie.js).
- Indicador visual de status de sincronização.
- Funciona 100% offline (dados salvos localmente).

---

## 🏗️ Arquitetura Técnica

| Tecnologia | Uso |
|------------|-----|
| **React 18** | Interface (via Babel Standalone, sem build) |
| **TailwindCSS** | Estilização (via CDN) |
| **Dexie.js** | IndexedDB para persistência local |
| **Supabase** | Backend (Postgres + Storage) |
| **Inteligência Artificial** | Tecnologias sustentáveis para análise de dados de saúde, recomendações personalizadas e otimização de processos offline-first |

### Tabelas IndexedDB (Dexie)
- `perfil` — Dados do paciente
- `registros` — Atendimentos e mensagens
- `midias` — Blobs de fotos/vídeos/áudios
- `medicamentos` — Prescrições e horários

---

## 🚀 Como Rodar

### Opção 1 — Servidor Local (Python)
```bash
cd app-tecendo-saude
python -m http.server 8000
```
Acesse: `http://localhost:8000`

### Opção 2 — Live Server (VS Code)
1. Instale a extensão "Live Server".
2. Clique com botão direito em `index.html` → "Open with Live Server".

### Opção 3 — Produção
Faça upload para qualquer hosting estático:
- GitHub Pages
- Netlify
- Vercel
- S3 + CloudFront

### Requisitos
- Navegador moderno (Chrome, Firefox, Edge, Safari).
- Suporte a IndexedDB e MediaRecorder API.

---

## ⚙️ Configuração

1. Copie `env/env.example.js` para `env/env.js`.
2. Preencha as credenciais do Supabase:
```javascript
window.__ENV = {
  SUPABASE_URL: 'https://seu-projeto.supabase.co',
  SUPABASE_KEY: 'sua-chave-anon'
};
```

---

## 📱 Build Android (APK)

### Usando Capacitor
```bash
npm install @capacitor/core @capacitor/cli
npx cap init
npx cap add android
# Copie os arquivos para android/app/src/main/assets/
npx cap open android
```

### Usando Cordova
```bash
cordova create tecendo
cordova platform add android
# Substitua www/ pelos arquivos do projeto
cordova build android
```

Permissões necessárias no Android:
- CAMERA
- RECORD_AUDIO (microfone)
- READ/WRITE_EXTERNAL_STORAGE (se usar armazenamento externo)
- INTERNET (para sincronização)

---

## ⚙️ Configuração do Supabase

### Desenvolvimento local

1. Crie um arquivo `env/env.js` (não versionado) com o conteúdo:
   ```javascript
   window.__ENV = {
     SUPABASE_URL: 'https://<sua-instancia>.supabase.co',
     SUPABASE_KEY: 'sb_publishable_...'
   };
   ```
2. Garanta que o arquivo está em `env/env.js` quando rodar localmente.

### Deploy estático no Netlify

1. Adicione no painel do Netlify as variáveis `SUPABASE_URL` e `SUPABASE_KEY`.
2. Defina o comando de build como `node env/build-env.js` (ou adicione à pipeline existente).
3. Mantenha o diretório de publicação como `.` (raiz do repositório).
4. Durante o build, o script `env/build-env.js` gera automaticamente um `env/env.js` contendo `window.__ENV = { SUPABASE_URL, SUPABASE_KEY }`, garantindo que o arquivo esteja presente no deploy sem precisar versionar segredos.

Observações:
- Use a Public (anon) key apenas para operações seguras e públicas. Para operações sensíveis, implemente regras no Supabase (políticas RLS) e endpoints server-side.
- Monitore o uso de Storage (plano gratuito tem limite ~1GB).

Modelos de tabelas (exemplo resumido):
- profiles (id, cpf, nome, tipo:[paciente|profissional], metadata...)
- records (id, profile_id, tipo, texto, timestamp, sync_status)
- medias (id, record_id, filename, mime, size, local_blob_ref, uploaded_url)
- medications (id, profile_id, nome, dosagem, horarios, ativo, prescritor_id)

---

## 🔐 Segurança e Privacidade

- Transmissão via HTTPS.
- Dados locais ficam no IndexedDB do dispositivo; orientações para proteção física do dispositivo são recomendadas.
- Em produção, é recomendado:
  - Autenticação reforçada (SMS/OTP ou integração com identidade oficial).
  - Políticas RLS no Supabase.
  - Criptografia a nível de campo para dados sensíveis se requerido.
  - Backups regulares do banco (Supabase exportações).
  - Nunca versionar chaves: use `.env`/variáveis do deploy para gerar `env/env.js` (já ignorado no git) com `window.__ENV = { SUPABASE_URL, SUPABASE_KEY }`. Gere nova chave se alguma foi exposta.

## ⚠️ Limitações e Recomendações
  - Vídeos hospedados externamente (ej. YouTube) requerem conexão ativa.
  - O plano gratuito do Supabase tem limitações de storage; controlar uploads de vídeo é importante.
  - Navegadores antigos ou dispositivos muito antigos podem não suportar MediaRecorder ou IndexedDB de forma estável.
  - Testar cenários de sincronização com filas de conflitos e retries é essencial.

---

## 🧭 Regiões e UBS (pré-configuradas)

Regiões (municípios) incluídas no projeto:
- Santarém, Belterra, Mojuí dos Campos, Alenquer, Curuá, Óbidos, Oriximiná, Terra Santa, Faro, Juruti, Monte Alegre, Almeirim, Prainha

Unidades Básicas de Saúde (exemplos):
- UBS Antônio Evangelista
- UBS Boa Esperança
- UBS Divinópolis
- UBS Márcio Marinho
- UBS Haroldo Martins
- UBS Maria Bibiana da Silva
- UBS Nadime Miranda
- UBS Neli Loeblein
- UBS Vicente Alves da Silva

---

## 🤝 Contribuição

Contribuições são bem-vindas:
1. Fork no repositório.
2. Crie uma branch feature/bugfix.
3. Abra um Pull Request descrevendo a mudança.

Por favor, abra issues para bugs/funcionalidades antes de grandes mudanças de arquitetura.

---

## 📝 Licença

Escolha uma licença adequada para o projeto (ex.: MIT, AGPL, GPL). Recomenda-se adicionar um arquivo `LICENSE` na raiz do repositório.

---

## Contato
Desenvolvido para o projeto "Tecendo Linhas do Cuidado Integral à Saúde na Amazônia".  
Se precisar, entre em contato com os mantenedores do projeto para informações adicionais ou acesso ao backend Supabase.
