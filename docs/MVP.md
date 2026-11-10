# MVP — critérios

> Fonte única do estado. Tabela atual de 10/11/2026 (ciclo da faixa de 90%; decisões D1 a D7 em `engenharia/decisoes/2026-11-10-ciclo-faixa-90.md`). As tabelas anteriores estão em "Histórico", no fim.

**Nível:** Estudo (N1). Critérios 5 (medição) e 7 (LCP no ar) não se aplicam e saem da conta.

**Resumo:** 9 de 10 aplicáveis atendidos

**Finalizado:** sim

Falta só o critério 9, que depende do responsável: manter ou tirar cada cliente citado (#31, `depende-do-responsavel`). Até lá, a citação aparece na tela como ilustrativa (decisão D4). O teste com uma pessoa de fora saiu do MVP pela decisão D2 e virou validação de produto (#32, rótulo `validacao`).

| # | Critério | Como verificar | Situação em 10/11/2026 |
|---|---|---|---|
| 1 | Problema e público claros | Dá para explicar em uma frase | Atende: catálogo de projetos de UX com o antes e o depois de cada um, para quem avalia o trabalho |
| 2 | Hipótese a validar | Existe uma aposta escrita, com meta | Atende: meta decidida pelo coordenador em 10/11/2026 (decisão D1), revisável pelo responsável: quem avalia abre ao menos 2 cases na mesma visita |
| 3 | Fluxo principal completo | Teste de ponta a ponta no navegador, no CI | Atende (decisão D2): `npx playwright test`, 10/11/2026: 12 de 12 passaram. O catálogo abre, o filtro por teclado reduz a lista, Enter abre o case com o foco no "Fechar", o Tab fica no modal e Esc fecha. Roda no job `verificar` do CI (PR #44) |
| 4 | Escopo enxuto | O que não entra está registrado | Atende: lista em Histórico (02/11/2026) |
| 5 | Medição de uso | A métrica principal é coletada | Não se aplica (N1) |
| 6 | Falhas tratadas | Erro, vazio e carregamento têm resposta clara | Atende: `npx playwright test`, 10/11/2026: catálogo com erro 500, sem rede e vazio passam |
| 7 | Desempenho aceitável | LCP de até 2,5 s no celular | Não se aplica (N1). Registro: mediana de 2,85 s em 02/11/2026 |
| 8 | Acessibilidade básica | Lighthouse e teclado | Atende: `npx playwright test`, 10/11/2026: "com o case aberto, Tab e Shift+Tab ficam dentro do modal" passou. Lighthouse 100 em 02/11/2026 |
| 9 | Segurança e conformidade | Riscos decididos; termos cumpridos | Parcial: `npm audit --omit=dev`, 10/11/2026: 0 vulnerabilidades; sem CSS de terceiro (#35). Cliente citado aparece como "citação ilustrativa" no cartão e no case, com teste (decisão D4). Falta o responsável decidir manter ou tirar cada citação de cliente real, inclusive o nome de uma pessoa física no campo `cliente` (#31) |
| 10 | Entrega confiável | Publicação só depois de CI verde | Atende: `gh api repos/douglasabnovato/ux-design/rules/branches/main`, 10/11/2026: `deletion`, `non_fast_forward`, `pull_request` e `required_status_checks` com o job `verificar` (decisão D3). O Pages publica a `main`, que só recebe o que passou no CI (#30) |
| 11 | Testes dos fluxos críticos | Testes automatizados no CI | Atende: `node scripts/verificar-conteudo.mjs` (61 projetos) e 12 testes Playwright no CI |
| 12 | Documentação honesta | Qualquer pessoa roda o projeto, e os números estão certos | Atende: README revisto em 10/11/2026; `curl` em https://douglasabnovato.github.io/ux-design/, 10/11/2026: 200 |

## Histórico

### Tabela de 09/11/2026, critério 10 revisto em 10/11/2026 (ciclo de 07/11/2026)

**Resumo:** 8 de 10 aplicáveis atendidos

**Finalizado:** sim

Os 2 critérios que faltam (3 e 9) dependem do responsável, cada um com issue `depende-do-responsavel`: teste com pessoa de fora (#32) e confirmar os clientes citados (#31). O 10 passou a "Atende" em 10/11/2026, com a `main` protegida (#30).

| # | Critério | Como verificar | Situação em 09/11/2026 |
|---|---|---|---|
| 1 | Problema e público claros | Dá para explicar em uma frase | Atende: catálogo de projetos de UX com o antes e o depois de cada um, para quem avalia o trabalho |
| 2 | Hipótese a validar | Existe uma aposta escrita, com meta | Atende: quem avalia abre ao menos 2 cases na mesma visita (proposta, ver Histórico) |
| 3 | Fluxo principal completo | Uma pessoa conclui sem ajuda | Parcial: fluxo percorrido no Chromium em 09/11/2026 (ver abaixo); falta uma pessoa de fora (#32) |
| 4 | Escopo enxuto | O que não entra está registrado | Atende: lista em Histórico (02/11/2026) |
| 5 | Medição de uso | A métrica principal é coletada | Não se aplica (N1) |
| 6 | Falhas tratadas | Erro, vazio e carregamento têm resposta clara | Atende: `npx playwright test` em 09/11/2026, 11 de 11 passaram, inclusive catálogo com erro 500, sem rede e vazio |
| 7 | Desempenho aceitável | LCP de até 2,5 s no celular | Não se aplica (N1). Registro: mediana de 2,85 s em 02/11/2026 |
| 8 | Acessibilidade básica | Lighthouse e teclado | Atende: `npx playwright test` em 09/11/2026, teste "com o case aberto, Tab e Shift+Tab ficam dentro do modal" passou (antes o Tab saía do modal, #36). Lighthouse 100 em 02/11/2026 |
| 9 | Segurança e conformidade | Riscos decididos; termos cumpridos | Parcial: sem CSS de terceiro, porque `git grep "w3schools.com/w3css/4/w3.css"` não acha nada em 09/11/2026 (#35). Falta confirmar os clientes citados (#31) |
| 10 | Entrega confiável | Publicação só depois de CI verde | Atende (10/11/2026): `gh api repos/douglasabnovato/ux-design/rulesets`, em 10/11/2026: ruleset `principal-protegida` ativo (exige PR, bloqueia force push e exclusão); workflow `Conferir documentos` roda nos PRs para a `main` e a `developer/**`. O Pages publica a `main`, que agora só recebe mudanças por PR (#30) |
| 11 | Testes dos fluxos críticos | Testes automatizados no CI | Atende: `node scripts/verificar-conteudo.mjs` (61 projetos) e 11 testes Playwright no CI, verdes no PR do ciclo de 07/11/2026 |
| 12 | Documentação honesta | Qualquer pessoa roda o projeto, e os números estão certos | Atende: README revisto em 09/11/2026; `curl` no site publicado deu 200 e o HTML é igual ao `index.html` da `main` |

#### Fluxo principal percorrido na tela (09/11/2026)

Como foi feito: clone novo, `http-server` local e um roteiro Playwright (Chromium) que faz o caminho de quem avalia.

1. O catálogo abre com 61 cartões.
2. O filtro "Alimentação" deixa 10 cartões e marca `aria-pressed="true"`.
3. Pelo teclado, Enter em "O case desse projeto" abre o case ("Uma Franquia — ABC da Construção") com o foco no "Fechar".
4. Seis Tabs seguidos ficam dentro do modal, depois da correção; antes, o foco saía já no primeiro Tab.
5. Esc fecha o modal, e o foco volta ao botão de origem.
6. O link do cartão abre o projeto (`projects/uma-franquia/index.html`).
7. `art`, `our-coffee` e `restaurante` abrem sem imagem quebrada e com o mesmo visual de antes da troca do CSS. Nas capturas em 1280 px e 390 px, 0 pixel ficou diferente.

### Tabela de 06/11/2026 (ciclo de 03/11/2026)

> Avaliação de 31/10/2026 com os mesmos 12 critérios usados no `movies`, revista em 06/11/2026. "Não medido" significa que não há evidência, não que falhe.

**Nível:** Estudo (N1). Pela régua do ciclo de 03/11/2026, os critérios 5 (medição) e 7 (LCP no ar) não se aplicam e saem da conta.

**Resultado em 06/11/2026:** 7 de 10 critérios aplicáveis atendidos (1, 2, 4, 6, 8, 11 e 12) e 3 parciais (3, 9 e 10). Antes deste ciclo: 6 de 10.

**Finalizado: não.** Falta, do lado do código, o CSS de terceiro em produção (#35), parte do critério 9. Dependem do responsável, cada um com issue `depende-do-responsavel`: confirmar os clientes citados (#31), teste com pessoa de fora (#32) e proteção da `main` (#30).

| # | Critério | Como verificar | Situação |
|---|---|---|---|
| 1 | Problema e público claros | Dá para explicar em uma frase | Atende |
| 2 | Hipótese a validar | Existe uma aposta escrita, com meta | Atende: proposta abaixo |
| 3 | Fluxo principal completo | Uma pessoa conclui sem ajuda | Parcial: catálogo e filtro testados; pessoa de fora não testou (#32) |
| 4 | Escopo enxuto | O que não entra está registrado | Atende: lista abaixo |
| 5 | Medição de uso | A métrica principal é coletada | Não se aplica (N1) |
| 6 | Falhas tratadas | Erro, vazio e carregamento têm resposta clara | Atende: catálogo com carregamento, erro com "Tentar de novo" e lista vazia; formulários marcam o erro no campo (PR #29, 3 testes) |
| 7 | Desempenho aceitável | LCP de até 2,5 s no celular | Não se aplica (N1). Registro: mediana de 2,85 s em 02/11/2026 |
| 8 | Acessibilidade básica | Lighthouse e teclado | Atende: Lighthouse 100; Tab sem elemento sem nome ou sem foco |
| 9 | Segurança e conformidade | Riscos decididos; termos cumpridos | Parcial: clientes citados sem confirmação (#31) e CSS de terceiro em produção (#35) |
| 10 | Entrega confiável | Publicação só depois de CI verde | Parcial: CI nos PRs para a `main` e a `developer`; a `main` não está protegida (#30) |
| 11 | Testes dos fluxos críticos | Testes automatizados no CI | Atende: conferência de 61 projetos e 7 testes Playwright no CI |
| 12 | Documentação honesta | Qualquer pessoa roda o projeto, e os números estão certos | Atende: README com estado e comandos conferidos |

### Revisão de 02/11/2026

**Hipótese (proposta, sem validação):** Se cada projeto mostrar o antes e o depois, quem avalia abre ao menos 2 casos na mesma visita.

**Fora do MVP (proposta):** Novos projetos e migrações pedidas na #1 que não entraram e a verificação dos clientes citados no catálogo.

**Medição:** Lighthouse 12.8.2 local, móvel, 3 execuções no site publicado. LCP 3,62 / 1,81 / 2,85 s (mediana 2,85 s, com muita variação), acessibilidade 100. O resultado varia entre execuções, e não houve teste em celular real.

**Critério 5:** segue sem atender, porque nada coleta uso; depende de uma conta de medição do responsável.
