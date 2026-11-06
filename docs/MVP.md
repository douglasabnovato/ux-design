# MVP — critérios

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

## Revisão de 02/11/2026

**Hipótese (proposta, sem validação):** Se cada projeto mostrar o antes e o depois, quem avalia abre ao menos 2 casos na mesma visita.

**Fora do MVP (proposta):** Novos projetos e migrações pedidas na #1 que não entraram e a verificação dos clientes citados no catálogo.

**Medição:** Lighthouse 12.8.2 local, móvel, 3 execuções no site publicado. LCP 3,62 / 1,81 / 2,85 s (mediana 2,85 s, com muita variação), acessibilidade 100. O resultado varia entre execuções, e não houve teste em celular real.

**Critério 5:** segue sem atender, porque nada coleta uso; depende de uma conta de medição do responsável.
