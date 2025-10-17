# 🚦 Lighthouse CI - Análise Automática de Performance

## O que é?

O Lighthouse CI é uma ferramenta que analisa automaticamente o site após cada deploy, medindo:

- ⚡ **Performance** - Velocidade de carregamento
- ♿ **Acessibilidade** - WCAG compliance
- 🎯 **Best Practices** - Boas práticas web
- 🔍 **SEO** - Otimização para motores de busca
- 📱 **PWA** - Progressive Web App features

## Como funciona?

### 1. Na Pipeline CI/CD

Após cada deploy bem-sucedido na branch `master`:

1. O Lighthouse CI executa 3 auditorias ao site publicado
2. Calcula a média dos resultados
3. Compara com os limites definidos em `lighthouserc.json`
4. **Falha a pipeline se os scores estiverem abaixo do mínimo**

### 2. Scores Mínimos Configurados

```json
{
  "performance": 80%,
  "accessibility": 90%,
  "best-practices": 85%,
  "seo": 90%
}
```

### 3. Métricas Monitorizadas

- **First Contentful Paint (FCP)**: < 2s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1

## Benefícios

✅ **Previne Regressões** - Detecta quando mudanças degradam a performance  
✅ **Automatizado** - Sem intervenção manual  
✅ **Standards Web** - Segue as métricas Core Web Vitals do Google  
✅ **Feedback Imediato** - Resultados na pipeline  
✅ **Artefactos** - Relatórios HTML guardados por 30 dias

## Ver Resultados

### GitHub Actions

1. Ir a `Actions` no repositório
2. Selecionar a execução da pipeline
3. Scroll até ao job `Lighthouse CI`
4. Download dos artefactos `lighthouse-results`
5. Abrir `index.html` no browser

### GitLab CI/CD

1. Ir a `CI/CD > Pipelines`
2. Selecionar a pipeline
3. Job `lighthouse`
4. Separador `Artifacts` > Download
5. Abrir `index.html` no browser

## Execução Local

Para executar o Lighthouse localmente antes de fazer commit:

```bash
# Certificar que o site está em produção no Netlify
npm run lighthouse
```

Isto analisa o site publicado e mostra os resultados no terminal.

## Ajustar Limites

Se os limites forem muito rigorosos ou lenientes, editar `lighthouserc.json`:

```json
{
  "ci": {
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.8 }] // Alterar aqui
      }
    }
  }
}
```

## URLs Analisadas

Atualmente analisa:

- `https://tdw-mp1-henrique-policarpo.netlify.app`

Para adicionar mais páginas, editar `lighthouserc.json`:

```json
{
  "ci": {
    "collect": {
      "url": [
        "https://tdw-mp1-henrique-policarpo.netlify.app",
        "https://tdw-mp1-henrique-policarpo.netlify.app/posts/hello-world"
      ]
    }
  }
}
```

## Troubleshooting

### Pipeline falha no Lighthouse

**Causa**: Scores abaixo do mínimo  
**Solução**:

1. Ver os relatórios nos artefactos
2. Identificar os problemas
3. Otimizar o site
4. Ou ajustar os limites se forem irrealistas

### Timeout ao executar

**Causa**: Site demora muito a responder  
**Solução**: Aumentar o timeout em `lighthouserc.json`:

```json
{
  "ci": {
    "collect": {
      "settings": {
        "maxWaitForLoad": 60000 // 60 segundos
      }
    }
  }
}
```

## Recursos

- [Documentação Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Web Vitals do Google](https://web.dev/vitals/)
- [Lighthouse Scoring](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring/)
