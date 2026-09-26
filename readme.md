<div align="center">

# 🎨 UX Design

**Catálogo de projetos digitais comerciais** — landing pages, catálogos, formulários de captação e aplicações, em HTML, CSS e JavaScript puro.

**62 projetos** · 8 setores · 5 com case documentado

</div>

---

## 🚀 Sobre o projeto

Catálogo vivo de 59 produtos digitais entregues para negócios reais: franquias, restaurantes, clínicas, marcenarias, clubes, prestadores de serviço e escolas. Vários nasceram em aula ou em desafio de trilha — o que conta aqui é que cada um virou produto, com marca, conteúdo real e caminho de conversão.

Cada projeto é um micro-site independente, com seu próprio HTML/CSS/JS, reunido numa página de catálogo central.

🔗 **Em produção:** [douglasabnovato.github.io/ux-design](https://douglasabnovato.github.io/ux-design/)

## 🗂️ Os 8 setores

Um projeto pertence a um setor, e só a um. O setor é o eixo do catálogo porque é como o cliente procura: ele quer ver trabalho parecido com o negócio dele.

| Setor | Projetos |
| --- | ---: |
| Alimentação | 10 |
| Construção & Arquitetura | 10 |
| Marca & Comunidade | 9 |
| Produto Digital | 8 |
| Varejo & E-commerce | 7 |
| Serviços & Franquias | 6 |
| Educação & Carreira | 5 |
| Saúde & Bem-estar | 4 |

> A taxonomia anterior tinha **36 categorias para 59 projetos, 26 delas com um único item** — ou seja, não classificava nada. Os 8 setores acima agrupam de verdade: o menor tem 4 projetos, o maior tem 10.

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
└── projects/           cada projeto em pasta própria (59)
    └── <slug>/
        ├── index.html
        ├── readme.md       anotações do projeto
        └── .github/        registros e capturas de tela
```

## ➕ Adicionando um projeto

```json
{
  "id": 60,
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

**Enquanto o número não estiver preenchido**, o formulário mostra o resumo na tela com botão de copiar, em vez de dizer "Pedido enviado!" e descartar o lead — que era exatamente o que acontecia antes.

## ↩️ Voltar ao portfólio

Toda página de projeto tem um botão fixo no canto inferior esquerdo que leva de volta ao catálogo. O bloco é autocontido (estilo e marcação no próprio arquivo), então a página continua abrindo sozinha, inclusive por `file://`. Um espaçador de 86px no fim do documento garante que o botão nunca fique por cima de um controle da página.

Seis projetos já tinham botão próprio de volta e foram deixados como estavam.

## ⚙️ Como rodar localmente

Projeto estático, sem dependências. O `fetch('./projects.json')` exige HTTP, então não funciona abrindo o arquivo direto (`file://`):

```bash
npx serve .
# ou
python -m http.server 3000
```

## 🌳 Fluxo de contribuição

```
feature/projetos-lp  →  developer-mvp  →  main (produção)
```

1. Novos projetos e ajustes de catálogo entram por `feature/projetos-lp`
2. Pull Request para `developer-mvp`, onde a mudança é validada
3. Só depois, PR de `developer-mvp` para `main`

---

## 🗺️ Pendências

| Prioridade | Item |
| --- | --- |
| 🔴 | **Preencher `DESTINO_WHATSAPP`** nos 11 formulários — sem isso o lead fica na tela em vez de chegar até você |
| 🔴 | **171 MB de `.skp`** em `projects/edificacoes-3d` (29 arquivos, o maior com 57 MB) — arquivo-fonte do SketchUp que o navegador não usa. Tirar do repositório |
| 🔴 | **609,7 MB de histórico** em `.git/objects/pack`. Apagar arquivo **não** reduz isso: só sai com `git filter-repo` ou repositório novo |
| 🟡 | 31 MB de `.bmp` e o `marido-de-aluguel.png` de 2 MB — converter para `.webp` com `magick mogrify`, que preserva os nomes |
| 🟡 | `edificacoes-3d/index.html` carrega **113 imagens sem `loading="lazy"` e sem `alt`** |
| 🟡 | Três projetos carregam CSS de `w3schools.com` em produção |
| 🟡 | Escrever case para mais projetos e marcá-los como `destaque` |
| 🟢 | Thumbnail para os 11 `form-*`, ou assumir o placeholder como definitivo |
| 🟢 | `rocket-shoes` e `rocket-nfts` seguem "Em breve" |
| 🟢 | `restaurant` ("Restaurante Gourmet") e `restaurante` ("Food") — slugs quase iguais; renomear quebra URL publicada |

---

Feito por [Douglas A. B. Novato](https://www.linkedin.com/in/douglasabnovato/)
