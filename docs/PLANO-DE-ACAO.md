# Plano de ação — UX Design

O estado e os critérios ficam em [`MVP.md`](MVP.md). Este arquivo guarda o plano de cada ciclo, com data.

## Ciclo de 16/11/2026

> Branch `feature/2026-11-16` → `developer/sprint-2026-11-19` → `main`. O PR #42 (sprint de 12/11) entrou na `main` em 16/11/2026; por isso a sprint nova nasce da `main`. O PR para a `main` fica com o responsável. Nível: Estudo (N1).

### Produto

**Problema e público.** Sem mudança: quem avalia o trabalho de UX precisa achar um projeto parecido com o seu negócio e ler o antes e o depois.

**Hipótese.** Acreditamos que mostrar o case com o antes e o depois faz quem avalia abrir ao menos 2 cases na mesma visita. Saberemos quando, em pelo menos 3 de 5 visitas de pessoas de fora (#32), 2 ou mais cases forem abertos.

**O que a pesquisa trouxe.**

| Ideia | O que levamos para o projeto | Fonte |
|---|---|---|
| Conteúdo que se move sozinho por mais de 5 segundos precisa de um jeito de pausar | Botão "Pausar" no carrossel de destaques, que troca para "Retomar" e para a rotação até a pessoa pedir de novo | [WCAG 2.2, critério 2.2.2: Pausar, parar, ocultar](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) e [W3C APG: padrão de carrossel](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) |
| O carrossel automático começa parado quando o sistema pede menos movimento | Já existia (`prefers-reduced-motion`); o botão segue visível e coerente com o estado | [W3C APG: padrão de carrossel](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) |
| O axe roda dentro do teste Playwright e devolve a lista de violações | Teste do fluxo principal com `@axe-core/playwright`: catálogo e case aberto, sem violações | [Playwright: testes de acessibilidade](https://playwright.dev/docs/accessibility-testing) |

**Backlog do ciclo (impacto × esforço).**

| Prioridade | Item | Destino |
|---|---|---|
| 1 | axe no teste do fluxo principal (critério 8 pede axe) | Este ciclo |
| 2 | Link de WhatsApp do "Fale comigo" aponta para `55SEUNUMERO`: esconder enquanto o número não existir | Este ciclo, com teste |
| 3 | Botão para pausar o carrossel | Este ciclo, com teste |
| 4 | README e `MVP.md` com números e fluxo de branches atuais; `docs/DEPLOY.md` | Este ciclo |
| 5 | Ligar os alertas do Dependabot | Responsável (issue nova) |
| 6 | Imagens do catálogo com pessoas, contatos e marcas de terceiros | Responsável (issue nova) |

**Fora do escopo.** Tirar ou trocar cliente citado (#31), imagem de case ou conteúdo de projeto: só com decisão do responsável. Enxugar o histórico (#39).

### Engenharia

**Arquitetura.** Site estático: `index.html`, `catalog.js` e `projects.json`, sem build. Cada projeto é uma pasta em `projects/`. O GitHub Pages serve a `main` no modo legado (branch `main`, pasta `/`). O CI (`Conferir documentos`) confere o conteúdo e roda o Playwright.

**Riscos.** Dados de terceiros em imagens e no campo `cliente` (#31). Alertas do Dependabot desligados (a API responde 403). Repositório grande (#39): o CI usa sparse-checkout.

**Qualidade.** Testes Playwright com axe no catálogo e no case; teclado no modal e no carrossel; `npm audit --omit=dev`.

**Definição de pronto.** CI verde no PR, revisão independente feita, `MVP.md` com cada "Atende" citando comando, data e resultado.

### Plano de ação

| Item | Destino |
|---|---|
| axe no fluxo principal, link de WhatsApp sem número escondido, pausa do carrossel | Este ciclo, com testes |
| `MVP.md`, README e `docs/DEPLOY.md` | Este ciclo |
| Ligar os alertas do Dependabot; imagens de terceiros; número do WhatsApp | Issues `depende-do-responsavel` |

## Ciclo de 10/11/2026 (faixa de 90%)

> Branch `feature/2026-11-10-b` → `developer/sprint-2026-11-12` → `main` (o PR para a `main` fica com o responsável). Decisões D1 a D7 em `engenharia/decisoes/2026-11-10-ciclo-faixa-90.md`.

**Produto.** Sem mudança de problema e público. A meta da hipótese passa a ser a do ciclo (D1). O teste com uma pessoa de fora vira validação (#32).

**Engenharia.** Risco tratado: clientes citados sem confirmação. Pela D4, o cartão e o case mostram a citação como ilustrativa, com teste. Tirar ou manter cada nome é do responsável (#31); um deles é o nome completo de uma pessoa física.

| Item | Destino |
|---|---|
| Aviso de citação ilustrativa, com teste | Este ciclo |
| Critérios 2, 3 e 10 pelas decisões D1 a D3 | Este ciclo |
| Manter ou tirar cada cliente citado | Responsável (#31) |
| Validar com uma pessoa de fora | Responsável (#32) |

## Ciclo de 07/11/2026

> Executado em 09/11/2026. Branch `feature/2026-11-07` → `developer/sprint-2026-11-12` → `main` (o PR para a `main` fica com o responsável). Nível: Estudo (N1).

### Produto

**Foco.** Critério 9: tirar o CSS de terceiro (#35). Percorrer o fluxo principal na tela e corrigir o que ele mostrar.

**O que a pesquisa trouxe.**

| Ideia | O que levamos para o projeto | Fonte |
|---|---|---|
| CSS de terceiro bloqueia a renderização em servidor alheio: se ele cai ou demora, a página espera | `w3.css` trocado por `shared/w3-subset.css`, só com as classes usadas, servido pelo próprio site | [Web Performance Calendar: terceiros e ponto único de falha](https://calendar.perfplanet.com/2025/third-parties-and-single-points-of-failure/), [Lullabot: ADR de hospedar estáticos de terceiros](https://architecture.lullabot.com/adr/20251219-self-host-third-party-static-assets/) |
| Em modal, o conteúdo de trás fica inerte, e Tab e Shift+Tab não saem do diálogo | Fundo com `inert` e foco circulando dentro do case (#36) | [W3C APG: padrão de diálogo modal](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) |

**Backlog do ciclo.**

| Prioridade | Item | Destino |
|---|---|---|
| 1 | CSS local no lugar do w3schools.com, com o mesmo visual | Este ciclo (#35) |
| 2 | Foco preso no modal de case (achado no fluxo na tela) | Este ciclo (#36) |
| 3 | Imagens pesadas em webp | Issue #34 |
| 4 | Arquivos `.skp` | Issue #33 |
| 5 | Mais cases | Issue #37 |
| 6 | Clientes citados, teste com pessoa de fora, proteção da `main` | Responsável (#31, #32, #30) |

### Engenharia

**Riscos.**
- Uma classe `w3-*` nova nessas três páginas fica sem estilo até entrar em `shared/w3-subset.css`. O comentário no topo do arquivo avisa.
- O clone completo tem cerca de 680 MB; este ciclo usou clone sem blobs com checkout parcial e conferiu `git ls-files` (1973) contra `git ls-tree` (1973) antes do primeiro commit.

**Qualidade.** Capturas antes e depois (1280 e 390 px, 0 pixel diferente), 11 testes Playwright e o roteiro do fluxo na tela.

**Definição de pronto.** CI verde no PR para a sprint; `docs/MVP.md` e README atualizados.

### Plano de ação

**Este ciclo executa.** Itens 1 e 2 do backlog, o fluxo na tela e a atualização do `docs/MVP.md` e do README.

**Vira issue.** Já abertas: #33, #34, #37 (agente); #30, #31, #32 (responsável). Nova: #39, histórico do Git (responsável).

## Ciclo de 03/11/2026

> Executado em 06/11/2026. Branch `feature/2026-11-06` → `developer/sprint-2026-11-12` → `main`. Nível: Estudo (N1); critérios 5 e 7 não se aplicam.

### Produto

**Problema e público.** Quem avalia o trabalho de UX do autor precisa achar, em poucos minutos, projetos por setor e o case de cada um (problema, mudança e resultado).

**Hipótese e meta.** Se cada projeto mostrar o antes e o depois, quem avalia abre ao menos 2 casos na mesma visita. Em N1, a meta fica registrada sem medição.

**O que a pesquisa trouxe.**

| Ideia | O que levamos para o projeto | Fonte |
|---|---|---|
| Mensagem de erro precisa dizer o que houve e como sair, em linguagem simples (heurística 9 de Nielsen) | Falha ao carregar o catálogo virou um aviso claro com "Tentar de novo", que recupera sem recarregar a página | [NN/g: diretrizes de mensagens de erro](https://www.nngroup.com/articles/error-message-guidelines/) |
| Case de UX: problema, processo e resultado, sempre na mesma ordem, com antes, depois e números | Os 5 cases seguem esse formato; ampliar para mais projetos virou issue (#37) | [uxfol.io: estrutura de case](https://blog.uxfol.io/ux-case-study-structure/), [UXPin: exemplos de portfólio](https://www.uxpin.com/studio/blog/ux-portfolio-examples/) |

**Backlog priorizado (impacto × esforço).**

| Prioridade | Item | Impacto | Esforço | Destino |
|---|---|---|---|---|
| 1 | Carregamento, erro com nova tentativa e lista vazia | Alto | Baixo | Este ciclo (#29) |
| 2 | CI também nos PRs para a `developer` | Alto | Baixo | Este ciclo (#29) |
| 3 | Proteger a `main` | Alto | Baixo | Responsável (#30) |
| 4 | Confirmar os clientes citados | Alto | Baixo | Responsável (#31) |
| 5 | Teste com pessoa de fora | Alto | Baixo | Responsável (#32) |
| 6 | CSS de terceiro em produção | Médio | Baixo | Issue (#35) |
| 7 | Foco preso no modal | Médio | Baixo | Issue (#36) |
| 8 | Tirar os `.skp` | Médio | Baixo | Issue (#33) |
| 9 | Imagens em `.webp` | Médio | Médio | Issue (#34) |
| 10 | Mais cases | Médio | Médio | Issue (#37) |

**Fora do escopo.** Novos projetos, medição de uso, reescrever o histórico do Git.

### Engenharia

**Arquitetura.** Site estático no GitHub Pages. `index.html` e `catalog.js` leem `projects.json` e montam carrossel, filtros por setor, grade e modal de case. Cada projeto é uma pasta em `projects/<slug>/`.

**Riscos.**
- Nomes de arquivo muito longos em `projects/transportation` não são criados num clone do Windows sem `core.longpaths`. O índice fica incompleto, e um commit pode registrar isso como exclusão. Aconteceu neste ciclo e foi corrigido no mesmo PR, antes do merge.
- Sem proteção na `main`, um push direto publica sem CI (#30).
- O repositório é grande (`.skp`, `.bmp`), o que deixa clone e CI lentos (#33, #34).

**Qualidade.**
- Testes: conferência dos 61 projetos e 7 testes Playwright (filtro por teclado, nome acessível, área de toque, 375 px, erro com nova tentativa, sem rede, lista vazia).
- Acessibilidade: carregamento com `role="status"`, erro com `role="alert"` e foco no "Tentar de novo"; o texto de erro deixou de usar opacidade, que reduzia o contraste.
- Segurança: sem dados pessoais novos; o dado do catálogo segue escapado antes de virar HTML.

**Definição de pronto.** `node scripts/verificar-conteudo.mjs` e `npm test` passam; CI verde nos dois PRs; `docs/MVP.md` e README atualizados.

### Plano de ação

**Este ciclo executa.**
1. Estados de carregamento, erro e vazio do catálogo, com testes.
2. CI nos PRs para a `developer`.
3. `docs/MVP.md` com nível N1 e resumo; README com o estado do ciclo e pendências conferidas.

**Vira issue.** #30, #31, #32 (responsável); #33, #34, #35, #36, #37 (agente).
