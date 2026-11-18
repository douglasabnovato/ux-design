<div align="center">

# 🎨 UX Design

**Catálogo de projetos digitais comerciais** — landing pages, catálogos, formulários de captação e aplicações, em HTML, CSS e JavaScript puro.

**61 projetos** · 8 setores · 5 com case documentado

</div>

---

## Estado e próximos passos (ciclo de 16/11/2026)

Projeto de estudo (nível N1). Site publicado: [douglasabnovato.github.io/ux-design](https://douglasabnovato.github.io/ux-design/) (HTTP 200 em 16/11/2026, igual à `main`). **Finalizado: sim**, com 9 de 10 critérios aplicáveis atendidos. O que falta (critério 9) depende do responsável: #31 e #46. Os alertas do Dependabot foram ligados em 16/11/2026 e mostram 0 abertos (15h08), com `npm audit --omit=dev` sem vulnerabilidades (#45). A `main` exige PR e o job `verificar` do CI verde.

**O que foi feito em 16/11/2026** (PR #49 para a `developer/sprint-2026-11-19`; a `main` espera a revisão do responsável no PR da sprint para a `main`)
- axe sem violações no catálogo, no filtro e no case aberto, dentro dos testes Playwright (critério 8).
- Foco visível pelo teclado conferido em teste.
- Botão "Pausar" no carrossel de destaques (WCAG 2.2.2), com teste.
- O "Fale comigo" esconde o WhatsApp enquanto o número não existir (#47), com teste.
- README com os números atuais e `docs/DEPLOY.md` com o passo a passo do Pages.

**Ciclos anteriores:** citação de cliente como ilustrativa (10/11/2026, PR #44); CSS local no lugar do w3schools.com e foco preso no modal (09/11/2026, PR #40). Todos na `main` desde o PR #42.

**O que queremos fazer**
- [#45](https://github.com/douglasabnovato/ux-design/issues/45) Alertas do Dependabot ligados em 16/11/2026, com 0 abertos; a issue fica com o responsável para fechar.
- [#31](https://github.com/douglasabnovato/ux-design/issues/31) Confirmar os clientes citados no catálogo (responsável).
- [#46](https://github.com/douglasabnovato/ux-design/issues/46) Decidir o uso das imagens do catálogo com dados de terceiros (responsável).
- [#47](https://github.com/douglasabnovato/ux-design/issues/47) Decidir o número de WhatsApp do "Fale comigo" (responsável).
- [#32](https://github.com/douglasabnovato/ux-design/issues/32) Validar com uma pessoa de fora (validação de produto, responsável).
- [#39](https://github.com/douglasabnovato/ux-design/issues/39) Decidir se o histórico do Git deve ser enxugado (responsável).
- [#48](https://github.com/douglasabnovato/ux-design/issues/48) Rodar o axe nas páginas dos projetos com case.
- [#33](https://github.com/douglasabnovato/ux-design/issues/33) Tirar os arquivos `.skp` do repositório.
- [#34](https://github.com/douglasabnovato/ux-design/issues/34) Converter as imagens pesadas para webp.
- [#37](https://github.com/douglasabnovato/ux-design/issues/37) Escrever o case de mais projetos.

**Onde está a documentação**
- Estado e critérios: [docs/MVP.md](docs/MVP.md).
- Plano do ciclo: [docs/PLANO-DE-ACAO.md](docs/PLANO-DE-ACAO.md), seção "Ciclo de 16/11/2026".
- Publicação no GitHub Pages: [docs/DEPLOY.md](docs/DEPLOY.md).
- Teoria de UX usada nos cases: [docs/ux-teoria](docs/ux-teoria).

---

## 🚀 Sobre o projeto

Catálogo vivo de 61 produtos digitais entregues para negócios reais: franquias, restaurantes, clínicas, marcenarias, clubes, prestadores de serviço e escolas. Vários nasceram em aula ou em desafio de trilha — o que conta aqui é que cada um virou produto, com marca, conteúdo real e caminho de conversão.

Cada projeto é um micro-site independente, com seu próprio HTML/CSS/JS, reunido numa página de catálogo central.

🔗 **Em produção:** [douglasabnovato.github.io/ux-design](https://douglasabnovato.github.io/ux-design/)

## 🗂️ Os 8 setores

Um projeto pertence a um setor, e só a um. O setor é o eixo do catálogo porque é como o cliente procura: ele quer ver trabalho parecido com o negócio dele.

| Setor | Projetos |
| --- | ---: |
| Alimentação | 10 |
| Construção & Arquitetura | 11 |
| Marca & Comunidade | 9 |
| Produto Digital | 8 |
| Varejo & E-commerce | 7 |
| Serviços & Franquias | 6 |
| Educação & Carreira | 5 |
| Saúde & Bem-estar | 5 |

> A taxonomia anterior tinha **36 categorias para 59 projetos, 26 delas com um único item** — ou seja, não classificava nada. Os 8 setores acima agrupam de verdade: o menor tem 5 projetos, o maior tem 11 (contagem de `projects.json` em 16/11/2026).

## ⭐ Destaque e case

`destaque: true` faz duas coisas ao mesmo tempo: coloca o projeto no carrossel do topo **e** libera o botão "O case desse projeto" no card.

O case abre num modal e tem quatro partes: **o problema** (a situação antes), **o que mudou**, uma tabela **antes e depois** com indicadores, e as **entregas**. Hoje cinco projetos têm case escrito: Uma Franquia, Edificações 3D, Móveis Planejados, Food e Quiz App.

Os indicadores da tabela são fatos verificáveis no próprio produto — quantos caminhos de contato a página passou a ter, quantos projetos o portfólio passou a exibir, o que o cliente precisava ter instalado antes e depois. **Nenhum número de negócio (lead, venda, taxa de conversão) é inventado.** Quando você tiver esses números medidos, é só acrescentar uma linha em `indicadores`.

## 🛠️ Tech Stack

- **HTML5 / CSS3 / JavaScript** puro — sem framework, sem build step
- **`projects.json`** — fonte única de dado do catálogo
- **`catalog.js`** — carrossel, filtros por setor, grade e modal de case
- **`style.css`** — uma camada de tokens em `:root`, nenhuma cor escrita fora dela

## 📁 Estrutura de pastas

```text
ux-design/
├── index.html          catálogo
├── style.css           estilos
├── catalog.js          carrossel, filtros, grade e modal de case
├── projects.json       dado de todos os projetos
├── .nojekyll           desliga o processamento Jekyll no GitHub Pages
├── assets/             imagens do catálogo
├── public/             favicons e manifest
├── shared/             CSS e JS comuns a vários projetos
├── tests/              testes Playwright (fluxo, axe e falhas)
├── scripts/            verificar-conteudo.mjs, que confere projects.json
├── docs/               MVP, plano, deploy e teoria de UX
└── projects/           cada projeto em pasta própria (61)
    └── <slug>/
        ├── index.html
        ├── readme.md       anotações do projeto
        └── .github/        registros e capturas de tela
```

## ➕ Adicionando um projeto

```json
{
  "id": 62,
  "slug": "nome-da-pasta",
  "title": "Nome de Exibição",
  "cliente": "Nome do Cliente",
  "description": "Uma frase clara sobre o que o produto resolve.",
  "category": "Alimentação",
  "tipo": "comercial",
  "image": "./assets/nome-da-pasta.jpg",
  "destaque": false,
  "emBreve": false
}
```

| Campo | Regra |
| --- | --- |
| `slug` | **minúsculas e hífen**, batendo com o nome real da pasta. O GitHub Pages diferencia maiúsculas: um slug como `"Our Coffee"` dá 404 |
| `category` | um dos 8 setores, escrito exatamente como na tabela acima |
| `cliente` | opcional; aparece como etiqueta acima do título no card |
| `destaque` | `true` coloca no carrossel e libera o botão de case — exige o objeto `case` |
| `image` | `null` é aceito: o card usa um placeholder com a inicial |
| `emBreve` | `true` quando a pasta ainda não tem `index.html`; o card aparece sem link, com selo "Em breve" |

### O objeto `case`

```json
"case": {
  "resumo": "Uma frase que enquadra o projeto.",
  "antes":  ["A situação antes.", "O que doía."],
  "depois": ["O que passou a existir.", "O que mudou na prática."],
  "indicadores": [{ "rotulo": "Caminhos de contato", "antes": "0", "depois": "6" }],
  "entregas": ["Item entregue", "Outro item"],
  "stack": ["HTML5", "CSS3", "JavaScript"]
}
```

Blocos vazios simplesmente não aparecem no modal.

## 📝 Formulários de captação

Os 11 `form-*` compartilham o mesmo motor em `script.js`, que serve tanto formulário de página única quanto formulário em etapas — ele detecta qual é.

O que o motor faz:

- valida campo a campo e **marca o erro no próprio campo**, com `aria-invalid`, `role="alert"` e `aria-describedby`
- move o foco para o primeiro campo com problema
- limpa o erro assim que o visitante corrige
- em formulário de etapas, valida só a etapa visível e aplica `inert` nas outras
- monta o resumo das respostas usando o **rótulo humano** de cada campo, não o `name`
- entrega o lead no WhatsApp

### Ligando o envio

No topo de cada `script.js`:

```js
const DESTINO_WHATSAPP = "55SEUNUMERO";
```

Troque por DDI + DDD + número e o envio passa a abrir o WhatsApp com o resumo pronto.

O botão "Fale comigo" do catálogo usa o mesmo marcador em `index.html`. Enquanto ele for `55SEUNUMERO`, o link do WhatsApp some do painel (#47).

**Enquanto o número não estiver preenchido**, o formulário mostra o resumo na tela com botão de copiar, em vez de dizer "Pedido enviado!" e descartar o lead — que era exatamente o que acontecia antes.

## ↩️ Voltar ao portfólio

Toda página de projeto tem um botão fixo no canto inferior esquerdo que leva de volta ao catálogo. O bloco é autocontido (estilo e marcação no próprio arquivo), então a página continua abrindo sozinha, inclusive por `file://`. Um espaçador de 86px no fim do documento garante que o botão nunca fique por cima de um controle da página.

Seis projetos já tinham botão próprio de volta e foram deixados como estavam.

## ⚙️ Como rodar localmente

No Windows, clone com `git clone -c core.longpaths=true`: alguns arquivos de `projects/transportation` têm nome longo e, sem essa opção, não são criados.

Projeto estático, sem build. O `fetch('./projects.json')` exige HTTP, então não funciona abrindo o arquivo direto (`file://`):

```bash
npx http-server . -p 4173
# ou
python -m http.server 3000
```

### Testes

Comandos conferidos contra o `package.json` em 16/11/2026:

```bash
npm ci
npx playwright install chromium
node scripts/verificar-conteudo.mjs   # confere projects.json contra as pastas
npm test                              # Playwright: fluxo, axe, falhas; sobe o servidor na porta 4173
```

O CI (`.github/workflows/docs-check.yml`, job `verificar`) roda os mesmos passos em todo PR para a `main` e a `developer/**`.

## 🌳 Fluxo de contribuição

```
feature/AAAA-MM-DD  →  developer/sprint-<próxima quinta>  →  main (produção)
```

1. Cada dia de trabalho entra numa `feature/` com a data.
2. PR para a sprint da semana, só com o job `verificar` verde.
3. PR da sprint para a `main`, que só o responsável mescla. A `main` é protegida pelo ruleset `principal-protegida`.

---

## 🗺️ Pendências

| Prioridade | Item |
| --- | --- |
| ✅ | **`.skp` fora da ponta do repositório** ([#33](https://github.com/douglasabnovato/ux-design/issues/33)): os 29 arquivos do SketchUp (172 MB) saíram de `projects/edificacoes-3d` em 18/11/2026. O navegador não abre esse formato, e nenhuma página apontava para eles. Os arquivos do site caíram de 828 MB para 656 MB (`du`). Guarde os `.skp` fora do Git, numa pasta ou nuvem do responsável. O histórico segue com o peso antigo, e um arquivo antigo volta com `git show <commit>:<caminho>` (#39) |
| 🔴 | **609,7 MB de histórico** em `.git/objects/pack`. Apagar arquivo **não** reduz isso: só sai com `git filter-repo` ou repositório novo ([#39](https://github.com/douglasabnovato/ux-design/issues/39)) |
| 🟡 | 31 MB de `.bmp` e o `marido-de-aluguel.png` de 2 MB — converter para `.webp` com `magick mogrify`, que preserva os nomes |
| 🟡 | Escrever case para mais projetos e marcá-los como `destaque` |
| 🟢 | Thumbnail para os 11 `form-*`, ou assumir o placeholder como definitivo |
| 🟢 | `rocket-shoes` e `rocket-nfts` seguem "Em breve" |
| 🟢 | `restaurant` ("Restaurante Gourmet") e `restaurante` ("Food") — slugs quase iguais; renomear quebra URL publicada |

---

Feito por [Douglas A. B. Novato](https://www.linkedin.com/in/douglasabnovato/)
