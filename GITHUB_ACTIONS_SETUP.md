# GitHub Actions CI/CD Pipeline - Configuração

Este projeto utiliza GitHub Actions para automatizar o processo de CI/CD.

## 📋 Requisitos da Pipeline

A pipeline cumpre os seguintes requisitos:

✅ **Várias etapas em sequência:**

1. Install dependencies
2. Prettier check (validação de formatação)
3. ESLint (validação de qualidade do código)
4. Tests (execução de testes)
5. Build (compilação do projeto)
6. Deploy (apenas na branch `master`)

✅ **Deploy apenas na branch default (master)**

✅ **Triggers configurados:**

- ✅ Commits em todas as branches
- ✅ Webhook do Contentful (quando CMS é atualizado)
- ✅ Schedule: 00:00 de segunda a sexta-feira
- ✅ Manual (workflow_dispatch)

## 🔧 Configuração Necessária

### 1. GitHub Secrets

Adicione os seguintes secrets no repositório GitHub:

**Settings > Secrets and variables > Actions > New repository secret**

#### Secrets do Contentful:

```
CONTENTFUL_SPACE_ID = [obtém no Contentful ou no ficheiro .env.local]
CONTENTFUL_ACCESS_TOKEN = [obtém no Contentful: Settings > API keys]
CONTENTFUL_PREVIEW_ACCESS_TOKEN = [obtém no Contentful: Settings > API keys]
CONTENTFUL_REVALIDATE_SECRET = [define um valor secreto qualquer]
```

#### Secrets do Netlify:

```
NETLIFY_AUTH_TOKEN = [obtém no Netlify: User settings > Applications > Personal access tokens]
NETLIFY_SITE_ID = [obtém no Netlify: Site settings > General > Site details > Site ID]
```

### 2. Como Obter os Secrets do Netlify

#### NETLIFY_AUTH_TOKEN:

1. Acede a https://app.netlify.com
2. Clica no teu avatar > **User settings**
3. Vai a **Applications** > **Personal access tokens**
4. Clica em **New access token**
5. Dá um nome (ex: "GitHub Actions")
6. Copia o token gerado

#### NETLIFY_SITE_ID:

1. Acede ao teu site no Netlify
2. Vai a **Site settings**
3. Em **Site details**, encontras o **Site ID**
4. Copia o ID (ex: `abc123-def456-ghi789`)

### 3. Webhook do Contentful

Para que a pipeline corra quando o CMS for atualizado:

1. **No GitHub:**
   - Não é necessário fazer nada, o workflow já está configurado

2. **No Contentful:**
   - Vai a **Settings** > **Webhooks**
   - Clica em **Add webhook**
   - **Nome:** GitHub Actions Trigger
   - **URL:** `https://api.github.com/repos/nexuhss/tdw-mp1-henrique-policarpo/dispatches`
   - **Method:** POST
   - **Headers:**
     ```
     Authorization: Bearer [GITHUB_PERSONAL_ACCESS_TOKEN]
     Accept: application/vnd.github+json
     ```
   - **Content type:** application/json
   - **Payload:**
     ```json
     {
       "event_type": "contentful-update"
     }
     ```

3. **Criar GitHub Personal Access Token:**
   - Vai a GitHub > **Settings** > **Developer settings** > **Personal access tokens** > **Tokens (classic)**
   - Clica em **Generate new token (classic)**
   - Dá um nome (ex: "Contentful Webhook")
   - Seleciona scope: `repo` (Full control of private repositories)
   - Gera o token e copia-o para usar no webhook do Contentful

## ⚠️ IMPORTANTE: Desligar o Schedule

Depois de validar que o trigger de schedule funciona:

1. Comenta ou remove as linhas do `schedule` no ficheiro `.github/workflows/ci-cd.yml`:

```yaml
# schedule:
#   - cron: '0 0 * * 1-5'
```

2. Faz commit e push desta alteração

Isto evita exceder os limites do workspace do GitHub.

## 🚀 Como Testar

### Testar commit trigger:

```bash
git add .
git commit -m "test: trigger pipeline"
git push
```

### Testar manual trigger:

1. Vai a **Actions** no GitHub
2. Seleciona **CI/CD Pipeline**
3. Clica em **Run workflow**
4. Escolhe a branch e clica em **Run workflow**

### Testar webhook do Contentful:

1. Faz uma alteração no Contentful CMS
2. Publica a alteração
3. Verifica em **Actions** se a pipeline foi acionada

### Testar schedule:

1. Espera até à meia-noite (00:00 UTC) de um dia da semana
2. Verifica em **Actions** se a pipeline correu automaticamente
3. **Depois desliga o schedule!**

## 📊 Monitorização

Para ver o estado das pipelines:

1. Vai ao repositório no GitHub
2. Clica no tab **Actions**
3. Verás todas as execuções da pipeline

## 🔍 Estrutura da Pipeline

```
┌─────────────────────────────────────┐
│     Build and Validate Job          │
├─────────────────────────────────────┤
│ 1. Checkout code                    │
│ 2. Setup Node.js                    │
│ 3. Install dependencies             │
│ 4. Prettier check                   │
│ 5. ESLint                            │
│ 6. Run tests                         │
│ 7. Build project                     │
│ 8. Upload artifacts                  │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│    Deploy Job (só na master)        │
├─────────────────────────────────────┤
│ 1. Checkout code                    │
│ 2. Download artifacts                │
│ 3. Deploy to Netlify                │
└─────────────────────────────────────┘
```

## ✅ Checklist de Configuração

- [ ] Adicionar todos os secrets do Contentful no GitHub
- [ ] Adicionar secrets do Netlify no GitHub (NETLIFY_AUTH_TOKEN e NETLIFY_SITE_ID)
- [ ] Criar Personal Access Token do GitHub
- [ ] Configurar webhook no Contentful
- [ ] Testar pipeline com commit
- [ ] Testar trigger manual
- [ ] Validar que schedule funciona
- [ ] **DESLIGAR o schedule após validação**
- [ ] Testar webhook do Contentful
