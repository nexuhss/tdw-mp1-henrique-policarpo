# Configuração de Branch Protection Rules

Para garantir que código com erros não é merged para a branch `master`, é necessário configurar **Branch Protection Rules** no GitHub.

## 🔒 Passos para Configurar:

### 1. Acede às Configurações do Repositório

1. Vai a: https://github.com/nexuhss/tdw-mp1-henrique-policarpo/settings/branches
2. Em "Branch protection rules", clica em **Add rule** ou **Add branch protection rule**

### 2. Configurar a Regra para a Branch `master`

**Branch name pattern:** `master`

### 3. Ativar as Seguintes Proteções:

#### ✅ Require a pull request before merging

- ☑️ **Require approvals:** 0 (ou 1 se tiveres colaboradores)
- ☑️ **Dismiss stale pull request approvals when new commits are pushed**

#### ✅ Require status checks to pass before merging

- ☑️ **Require branches to be up to date before merging**
- **Status checks que devem passar:**
  - `Prettier Check`
  - `ESLint Check`
  - `Run Tests`
  - `Build Project`

> **IMPORTANTE:** Só consegues selecionar estes status checks DEPOIS de a pipeline ter corrido pelo menos uma vez!

#### ✅ Require conversation resolution before merging

- Garante que todos os comentários no PR são resolvidos

#### ✅ Do not allow bypassing the above settings

- Nem os admins podem fazer bypass (mais rigoroso)

### 4. Outras Opções (Opcionais mas Recomendadas):

- ☑️ **Require linear history** - Mantém histórico limpo
- ☑️ **Include administrators** - Aplica regras também a admins

### 5. Salvar

Clica em **Create** ou **Save changes**

---

## 🎯 O Que Isto Garante:

### ✅ **Impossível fazer merge com pipeline a falhar**

- Se Prettier, ESLint, Tests ou Build falharem → **Merge bloqueado**

### ✅ **Obriga a uso de Pull Requests**

- Não se pode fazer push direto para `master`
- Código tem que passar por PR

### ✅ **Deploy só acontece com código validado**

- Deploy job só corre se Build passar
- Build só corre se testes passarem

---

## 📊 Fluxo de Trabalho com Branch Protection:

```
1. Criar feature branch
   git checkout -b feature/nova-funcionalidade

2. Fazer commits incrementais
   git add .
   git commit -m "feat: adicionar funcionalidade X"
   git push origin feature/nova-funcionalidade

3. Criar Pull Request no GitHub
   - Pipeline corre automaticamente
   - Se falhar → não podes fazer merge
   - Se passar → merge está disponível

4. Fazer merge para master
   - Código já validado
   - Deploy automático acontece

5. Site atualizado no Netlify! 🎉
```

---

## 🧪 Como Testar:

### Teste 1: Tentar fazer push direto para master

```bash
git checkout master
echo "test" >> README.md
git add README.md
git commit -m "test: direct push"
git push origin master
```

**Resultado esperado:** ❌ Rejeitado (protected branch)

### Teste 2: Criar PR com código que falha

```bash
git checkout -b test/failing-code
# Introduzir erro de sintaxe
git push origin test/failing-code
# Criar PR no GitHub
```

**Resultado esperado:** ❌ Merge bloqueado porque pipeline falha

### Teste 3: Criar PR com código válido

```bash
git checkout -b feat/working-code
# Adicionar código válido
git push origin feat/working-code
# Criar PR no GitHub
```

**Resultado esperado:** ✅ Pipeline passa, merge permitido

---

## ✅ Checklist de Implementação:

- [ ] Branch protection configurada para `master`
- [ ] Status checks obrigatórios definidos
- [ ] Pull requests obrigatórios
- [ ] Testar push direto (deve falhar)
- [ ] Testar PR com código inválido (merge bloqueado)
- [ ] Testar PR com código válido (merge permitido)
- [ ] Verificar que deploy só acontece após merge

---

## 📚 Documentação:

- [GitHub Branch Protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [Required Status Checks](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches#require-status-checks-before-merging)
