# Deploy no GitHub Pages

Como o catálogo vai ao ar. Revisto em 16/11/2026.

## Como está hoje

- **Hospedagem:** GitHub Pages, gratuito.
- **Modo:** legado ("Deploy from a branch"), com a branch `main` e a pasta `/` (raiz).
  Conferido com `gh api repos/douglasabnovato/ux-design/pages` em 16/11/2026: `build_type: legacy`, `source: main /`.
- **Endereço:** https://douglasabnovato.github.io/ux-design/
  `curl -s -o /dev/null -w "%{http_code}"` em 16/11/2026: 200. O `index.html` e o `catalog.js` publicados são iguais aos da `main` (mesmo `md5sum`, sem diferença de fim de linha).
- **Build:** não há. O site é HTML, CSS e JavaScript puro. O arquivo `.nojekyll` desliga o Jekyll.
- **Quem publica:** o próprio GitHub, no workflow automático "pages build and deployment", a cada push na `main`.
- **O que protege a `main`:** o ruleset `principal-protegida` exige PR e o job `verificar` do CI verde. Assim, só entra no ar o que passou nos testes.

## Por que não trocar para "GitHub Actions"

O modo legado já publica a `main` sem passo manual, então a troca não traz ganho agora. E o risco é outro: nos dois modos, um site do Pages pode ter no máximo 1 GB ([limites do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)). Os arquivos do site somam cerca de 830 MB (`du -sh --exclude=.git .` num clone sem `node_modules`, 16/11/2026). Enxugar os arquivos grandes (#33, #34) dá folga antes de qualquer troca.

## Passo a passo (responsável)

Nada é preciso para o site seguir no ar. Se o Pages for desligado por engano:

1. Abra https://github.com/douglasabnovato/ux-design/settings/pages.
2. Em **Build and deployment → Source**, escolha **Deploy from a branch**.
3. Em **Branch**, escolha `main` e a pasta `/ (root)`. Clique em **Save**.
4. Abra a aba **Actions** e espere o workflow **pages build and deployment** ficar verde (cerca de 1 a 2 minutos).
5. Confira: `curl -s -o /dev/null -w "%{http_code}" https://douglasabnovato.github.io/ux-design/` deve responder 200.

## Como conferir se o site está atualizado

```bash
curl -s https://douglasabnovato.github.io/ux-design/ | tr -d '\r' | md5sum
git show origin/main:index.html | tr -d '\r' | md5sum
```

Os dois números devem ser iguais. Faça o mesmo com o `catalog.js`. Se forem diferentes, o último "pages build and deployment" falhou ou ainda não rodou.

## Rodar localmente

```bash
git clone -c core.longpaths=true --filter=blob:none https://github.com/douglasabnovato/ux-design
cd ux-design
npm ci
npx playwright install chromium
node scripts/verificar-conteudo.mjs
npm test
npx http-server . -p 4173
```

O `npm test` sobe o próprio servidor na porta 4173. O `--filter=blob:none` evita baixar os cerca de 680 MB do histórico (#39).
