# Plano de ação — UX Design

O estado e os critérios ficam em [`MVP.md`](MVP.md). Este arquivo guarda o plano de cada ciclo, com data.

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
