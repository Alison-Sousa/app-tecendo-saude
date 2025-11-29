# 🌿 Tecendo Saúde

> Sistema de telemedicina offline-first para atendimento remoto no Baixo Amazonas e Tapajós (PA)

---

## 📋 Sobre o Projeto

**Tecendo Saúde** é uma aplicação web progressiva (PWA) que conecta pacientes de regiões remotas da Amazônia com profissionais de saúde, permitindo:

- ✅ Cadastro e consultas **100% offline** (pacientes)
- ✅ Envio de múltiplas mídias (foto + vídeo + áudio juntos)
- ✅ Prontuário eletrônico completo (30+ campos)
- ✅ Chat assíncrono (até 5 interações por registro)
- ✅ Sincronização automática quando há internet

---

## 📱 Arquivos do Sistema

### `app.html` (Aplicação Web)
- **Tecnologia**: React 18 + TailwindCSS (via CDN)
- **Tamanho**: ~1.800 linhas de código
- **Funciona**: Direto no navegador (Chrome, Firefox, Safari)
- **Deploy**: Copiar arquivo para qualquer servidor web
- **Offline**: Salva dados localmente (IndexedDB)

### `app.apk` (Aplicativo Android)
- **Gerado com**: Cordova/Capacitor (wrapper do app.html)
- **Tamanho**: ~15 MB
- **Requisitos**: Android 7.0+ (API 24+)
- **Instalação**: Download direto (APK) ou Google Play Store
- **Permissões necessárias**:
  - 📷 Câmera (fotos/vídeos)
  - 🎙️ Microfone (gravação áudio)
  - 💾 Armazenamento (salvar mídias)
  - 🌐 Internet (sincronização)

---

## ✨ Funcionalidades

### 👤 Para Pacientes (Modo Offline)

#### Login e Cadastro
- Login via **CPF único** (sem senha)
- Cadastro básico com 6 campos (nome, CPF, data nascimento, região, telefone, email)
- Salva localmente (funciona sem internet)
- Auto-login (lembra último usuário)

#### Novo Registro
- Texto descritivo dos sintomas
- **Múltiplas mídias simultâneas**:
  - 📷 Foto (câmera ou galeria)
  - 🎥 Vídeo curto (câmera)
  - 🎙️ Áudio (gravação via microfone)
- Todos os arquivos salvos offline
- Preview antes de enviar

#### Histórico
- Lista de registros (cards com thumbnails)
- Atualização automática a cada **15 segundos**
- Status visual (pendente/respondido)
- Ver respostas do profissional
- Responder até **5 vezes** por registro
- **Vídeos reproduzem inline** (sem precisar clicar)
- Fotos clicáveis (expandem em tela cheia)
- Áudios com player inline

### 👨‍⚕️ Para Profissionais (Requer Internet)

#### Acesso
- Login via **CPF** (busca no Supabase)
- Cadastro rápido com lista de 100+ ACS
- Escolha de UBS (9 unidades)

#### Menu Principal
- **Contadores automáticos** (atualizam a cada 30s):
  - 📂 Atendimentos (X) = registros pendentes
  - 🆕 Novos Cadastros (Y) = pacientes sem prontuário
- 🔍 Buscar por CPF

#### Painel de Atendimentos
- Cards com **thumbnail da primeira mídia**
- Nome, CPF, região, idade do paciente
- Texto resumo do registro
- **SEM badge de status** (visual limpo)
- Clique para abrir chat completo

#### Chat com Paciente
- Ver **texto + TODAS as mídias** do registro
- **Vídeos inline** (reproduz sem abrir modal)
- Fotos clicáveis (expandem)
- Áudios inline (player)
- Histórico completo de interações
- Botão **FICHA** (editar prontuário)
- Responder com texto + múltiplas mídias

#### Prontuário Completo
- **30+ campos obrigatórios**:
  - Foto perfil, dados pessoais
  - Hipertensão, diabetes, vícios
  - Atividade física, medicações
  - Metas de saúde (peso, PA, glicemia)
- Validação rigorosa antes de salvar
- Busca por CPF (carregar existente ou criar novo)

---

## 🏗️ Arquitetura Técnica

### Frontend (PWA)
