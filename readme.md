<div align="center">

# 🎨 UX Design — Catálogo de Landing Pages

**Coleção de landing pages e interfaces de conversão**, com foco em experiência de usuário, design visual e implementação em HTML, CSS e JavaScript puro.

</div>

---

## 🚀 Sobre o projeto

Portfólio vivo de **22 projetos**, organizados em duas naturezas: **landing pages completas** (marcas, franquias, eventos, clubes, catálogos comerciais) e **formulários de prática de interface** (`form-1` a `form-11`). Cada projeto é um micro-site independente, com seu próprio HTML/CSS/JS, reunido numa página de catálogo central com carrossel de destaque.

## 🗂️ Estrutura do catálogo

- **Carrossel de destaque** — projetos marcados como `destaque: true` no `projects.json`, exibidos em rotação automática no topo da página
- **Grade "Projetos"** — peças com propósito comercial/apresentação (franquias, gastronomia, clubes, catálogos)
- **Grade "Estudos & Formulários"** — os 11 `form-X`, exercícios de prática de interface

### Categorias em uso hoje
`Franquia` · `Captação` · `Catálogo` · `Esportivo` · `Comunidade` · `Eventos` · `Formulário` · `Leitura` · `Gastronomia`

## 🛠️ Tech Stack

- **HTML5 / CSS3 / JavaScript** puro — sem framework, sem build step
- **`projects.json`** — fonte única de dado do catálogo
- **`catalog.js`** — carrega o JSON, renderiza carrossel de destaque e as duas grades
- **`script.js`** — interatividade dos cards (ripple, hover, foco por teclado)

## 📁 Estrutura de pastas

```text
ux-design/
├── index.html          # página principal do catálogo
├── style.css            # estilos globais
├── script.js             # interatividade dos cards
├── catalog.js            # carrega projects.json e renderiza o catálogo
├── projects.json         # dado de todos os projetos catalogados
├── assets/                # imagens compartilhadas do catálogo
├── public/                # favicons, manifest
└── projects/               # cada landing page em pasta própria
    ├── uma-franquia/
    ├── seja-um-franqueado/
    ├── encarte/
    ├── clube-spfc/
    ├── clube-crf/
    ├── clube-cam/
    ├── doctor-care/          # css/ segmentado
    ├── hamburgueria/         # database.js + qr-code.html (cardápio via QR)
    ├── livraria/             # data/biblioteca.json
    ├── pastel-e-cana/
    ├── rocket-coffee/        # assets/ + styles/style.css
    └── form-1/ … form-11/    # exercícios de formulário
```

## ➕ Adicionando um novo projeto ao catálogo

Cada entrada em `projects.json` segue este formato:

```json
{
  "id": 23,
  "slug": "nome-da-pasta",
  "title": "Nome de Exibição",
  "description": "Uma frase clara sobre o que o projeto faz.",
  "category": "Categoria",
  "image": "./assets/nome-da-pasta.jpg",
  "destaque": false
}
```

- `slug` precisa bater com o nome real da pasta em `projects/`
- `destaque: true` só para peças com propósito comercial/apresentação — aparecem no carrossel do topo
- `image: null` é aceito para projetos ainda sem thumbnail (o catálogo usa um placeholder automático)

## ⚙️ Como rodar localmente

Projeto estático, sem dependências — basta abrir `index.html` num servidor local (Live Server, `npx serve`, etc.), já que o `fetch('./projects.json')` exige HTTP, não funciona direto do sistema de arquivos (`file://`).

## 🌳 Fluxo de contribuição

Um workflow de desenvolvimento para organização de código e versões de projeto.

```
feature/projetos-lp  →  developer-mvp  →  main (produção)
```

1. Novas landing pages e ajustes de catálogo entram por `feature/projetos-lp`
2. Pull Request para `developer-mvp` — é aqui que mudanças são validadas
3. Só depois de validado, um PR de `developer-mvp` para `main` promove pra produção

---

Feito por [Douglas A. B. Novato](https://www.linkedin.com/in/douglasabnovato/)