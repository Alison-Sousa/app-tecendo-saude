# Tecendo Saúde — Guia de Distribuição Mobile (Android e iOS)

**Projeto:** Tecendo Linhas do Cuidado Integral à Saúde na Amazônia  
**Documento para:** BNDES  
**Data:** Março/2026

---

## 1. Visão Geral

O aplicativo **Tecendo Saúde** é distribuído como app nativo para Android e iOS, permitindo que profissionais de saúde e usuários do SUS em regiões remotas da Amazônia acessem o sistema mesmo sem conectividade.

A compilação e distribuição do app é **100% automatizada** via GitHub Actions (CI/CD), sem necessidade de instalação local de Android Studio ou Xcode.

---

## 2. Distribuição Android (Já Implementado)

### Como funciona

O APK do Android é gerado automaticamente na nuvem a cada atualização do código:

1. Desenvolvedor envia código para o GitHub (`git push`)
2. O GitHub Actions compila o APK automaticamente (JDK 17 + Android SDK + Cordova)
3. O APK é publicado no **GitHub Releases**
4. O botão "Download App" no site sempre aponta para a versão mais recente

**Custo:** R$ 0 (gratuito)

### URL de download

```
https://github.com/Alison-Sousa/app-tecendo-saude/releases/latest/download/tecendo-saude.apk
```

---

## 3. Distribuição iOS — Apple Developer Program Fee Waiver (Gratuito)

### 3.1. O que é o Fee Waiver

A Apple cobra **US$ 99/ano** (≈ R$ 500) para distribuir apps iOS. Porém, a Apple oferece **isenção total (fee waiver)** para:

- **Organizações sem fins lucrativos (ONGs)** oficialmente reconhecidas
- **Instituições educacionais credenciadas** (universidades federais, estaduais, IFs)
- **Entidades governamentais** (secretarias de saúde, prefeituras, governo federal)

O projeto "Tecendo Saúde" se enquadra em pelo menos uma dessas categorias por ser um projeto vinculado a uma instituição pública de saúde/educação na região amazônica.

**Referência oficial:** https://developer.apple.com/support/membership-fee-waiver/

### 3.2. Requisitos para a isenção

Conforme a documentação oficial da Apple, a organização deve:

1. Ser uma entidade jurídica com status de ONG, instituição educacional credenciada, ou entidade governamental
2. **Não** ser uma pessoa física, MEI ou empresa individual
3. **Não** ter assinado o contrato de aplicativos pagos (o app será gratuito)
4. **Não** vender bens ou serviços digitais pelo app

O Tecendo Saúde atende **todos** esses requisitos: é gratuito, não vende nada, e é vinculado a uma instituição pública.

### 3.3. Documentação necessária

| Documento | Exemplo |
|---|---|
| CNPJ da instituição | CNPJ da universidade, secretaria de saúde ou ONG |
| Comprovante de status | Ato constitutivo, estatuto social, ou decreto de criação |
| Reconhecimento oficial | Registro no MEC (educação) ou órgão competente (ONG/governo) |
| D-U-N-S Number | Número gratuito obtido em https://www.dnb.com/duns.html |

> **Nota sobre D-U-N-S Number:** É um identificador universal de empresas. A Apple exige para organizações. A obtenção é gratuita e leva de 1 a 5 dias úteis. Solicite em https://developer.apple.com/enroll/duns-lookup/

### 3.4. Passo a passo para solicitar o Fee Waiver

#### Etapa 1 — Criar Apple ID institucional

1. Acesse https://account.apple.com/
2. Crie uma conta com o **e-mail institucional** da organização (ex: `tecendosaude@universidade.edu.br`)
3. Complete a verificação de email e telefone

#### Etapa 2 — Obter o D-U-N-S Number (se não tiver)

1. Acesse https://developer.apple.com/enroll/duns-lookup/
2. Pesquise pelo nome da organização
3. Se não encontrar, solicite gratuitamente. Leva de 1 a 5 dias úteis
4. Anote o número de 9 dígitos recebido

#### Etapa 3 — Iniciar inscrição no Apple Developer Program

1. Acesse https://developer.apple.com/programs/enroll/
2. Faça login com o Apple ID institucional criado na Etapa 1
3. Selecione **"Organization"** (não "Individual")
4. Preencha:
   - Nome legal da organização (como consta no CNPJ)
   - D-U-N-S Number
   - Endereço da sede
   - Telefone institucional
   - Website da organização

#### Etapa 4 — Solicitar a isenção (Fee Waiver)

1. Na tela de pagamento, selecione a opção **"Request a fee waiver"**
2. Indique o tipo de organização:
   - `Nonprofit organization` (ONG)
   - `Accredited educational institution` (universidade/IF)
   - `Government entity` (prefeitura/secretaria/governo)
3. Envie a documentação comprobatória solicitada
4. Aguarde a análise da Apple (geralmente 1 a 4 semanas)

#### Etapa 5 — Aprovação

Após aprovação, você terá acesso completo ao Apple Developer Program:
- Certificados de assinatura de código
- Provisioning Profiles
- Distribuição via TestFlight (beta para até 10.000 pessoas)
- Publicação na App Store
- **Tudo sem custo algum**

A renovação anual exige apenas confirmar que a organização continua elegível.

---

## 4. Parte Técnica — Configuração do Build Automático

### 4.1. Arquitetura do CI/CD

```
Desenvolvedor faz git push
        ↓
GitHub Actions detecta o push
        ↓
Máquina virtual na nuvem (Linux para Android, macOS para iOS)
        ↓
Compila o app automaticamente
        ↓
Publica no GitHub Releases
        ↓
Botão "Download App" no site sempre aponta para a última versão
```

### 4.2. GitHub Secrets — O que são

GitHub Secrets são **variáveis seguras** armazenadas no repositório GitHub. Elas são criptografadas e nunca aparecem nos logs. São usadas para guardar credenciais sensíveis necessárias durante a compilação.

**Localização:** GitHub → Repositório → Settings → Secrets and variables → Actions → New repository secret

### 4.3. Secrets necessários — Android (já configurado)

| Secret | Descrição | Onde obter |
|---|---|---|
| `SUPABASE_URL` | URL do projeto Supabase | Supabase Dashboard → Settings → API → URL |
| `SUPABASE_KEY` | Chave anônima do Supabase | Supabase Dashboard → Settings → API → anon/public key |

Esses secrets permitem que o app se conecte ao banco de dados durante a execução. O build Android já está funcional com essas duas variáveis.

### 4.4. Secrets necessários — iOS (após aprovação Apple)

Após obter o Apple Developer Program (com fee waiver), será necessário adicionar estes secrets:

| Secret | Descrição | Onde obter |
|---|---|---|
| `BUILD_CERTIFICATE_BASE64` | Certificado de assinatura (.p12) em Base64 | Apple Developer → Certificates → Criar certificado → Exportar como .p12 → Converter para Base64 |
| `P12_PASSWORD` | Senha do certificado .p12 | Definida por você ao exportar o certificado |
| `BUILD_PROVISION_PROFILE_BASE64` | Provisioning Profile (.mobileprovision) em Base64 | Apple Developer → Profiles → Criar profile → Download → Converter para Base64 |
| `KEYCHAIN_PASSWORD` | Senha temporária (qualquer string aleatória) | Invente uma senha qualquer (ex: `minha-senha-123`) |
| `SUPABASE_URL` | (já configurado) | — |
| `SUPABASE_KEY` | (já configurado) | — |

#### Como gerar o certificado e provisioning profile

Essas etapas são realizadas **uma única vez** após a aprovação do fee waiver:

1. Acesse https://developer.apple.com/account/resources/certificates/list
2. Clique em **"+"** → selecione **"Apple Distribution"**
3. Siga as instruções para gerar o certificado (a Apple guia o processo)
4. Exporte como `.p12` (com senha)
5. Converta para Base64:
   - No terminal: `base64 -i certificado.p12 | pbcopy` (Mac)
   - Ou use um conversor online confiável
6. Cole o resultado no GitHub Secret `BUILD_CERTIFICATE_BASE64`

Para o Provisioning Profile:
1. Acesse https://developer.apple.com/account/resources/profiles/list
2. Crie um novo profile do tipo **"App Store Connect"**
3. Selecione o App ID do Tecendo Saúde
4. Faça download do arquivo `.mobileprovision`
5. Converta para Base64 e cole no GitHub Secret `BUILD_PROVISION_PROFILE_BASE64`

> **Nota:** Quando o certificado estiver pronto, o workflow iOS será adicionado ao repositório automaticamente (eu configuro). O processo de build será idêntico ao Android — push no GitHub e o app é gerado automaticamente.

### 4.5. Fluxo completo após configuração

```
git push na branch main
        ↓
    ┌───────────────────┐
    │   GitHub Actions   │
    ├───────────────────┤
    │                   │
    │  ┌─── Android ──┐ │    → tecendo-saude.apk  → GitHub Releases
    │  └──────────────┘ │
    │                   │
    │  ┌──── iOS ─────┐ │    → tecendo-saude.ipa  → TestFlight / App Store
    │  └──────────────┘ │
    │                   │
    └───────────────────┘
```

---

## 5. Custos

| Item | Custo |
|---|---|
| GitHub (repositório + Actions) | Gratuito |
| Build Android (APK) | Gratuito |
| Apple Developer Program (com fee waiver) | **Gratuito** |
| Build iOS (IPA) | Gratuito (GitHub Actions inclui máquinas macOS) |
| Supabase (backend) | Gratuito (plano free tier) |
| **Total** | **R$ 0** |

---

## 6. Resumo Executivo

O Tecendo Saúde utiliza infraestrutura de CI/CD moderna e gratuita para distribuição de aplicativos móveis. O build Android já está operacional. Para iOS, a Apple oferece isenção do custo de US$ 99/ano para projetos vinculados a instituições educacionais, governamentais ou sem fins lucrativos — categoria na qual o Tecendo Saúde se enquadra.

Após aprovação do fee waiver, a distribuição iOS é configurada em menos de 1 hora, utilizando a mesma infraestrutura já existente (GitHub Actions), sem custos adicionais.

---

*Documento gerado para o projeto Tecendo Saúde — Linhas do Cuidado Integral à Saúde na Amazônia*
