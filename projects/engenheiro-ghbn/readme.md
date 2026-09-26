# GHBN_ENGINEERING // Global Engineering Platform

Plataforma digital de alta performance desenvolvida para portfólio de engenharia civil com atuação internacional (**Brasil e Estados Unidos**). Desenvolvido com uma identidade visual industrial, acabamento *high-end* e foco absoluto em precisão técnica.

---

## 🏗️ Sobre o Projeto

O projeto foi estruturado sob o conceito de **Prancha Técnica de Engenharia**, abandonando templates genéricos de mercado e apostando em uma estética limpa, com bordas de precisão (*hairlines*), tipografia monoespaçada e alta performance de carregamento.

* **Atuação Global:** Seções dedicadas a projetos executados no Brasil 🇧🇷 e nos Estados Unidos 🇺🇸.
* **Core Estrutural:** Vitrine técnica voltada a engenharia estrutural e laudos.
* **Dossiê Técnico:** Seção dedicada ao acesso direto à documentação oficial em PDF.
* **Canal de Diálogo:** Formulário multifásico (Multi-step) integrado para captação de leads qualificados.
* **Acessibilidade Direta:** Botão flutuante de WhatsApp fixado para contato imediato.

---

## 📁 Estrutura de Diretórios

```text
ENGENHEIRO-GHBN/
│
├── assets/
│   ├── br/                 # Ativos visuais de obras e projetos no Brasil
│   ├── uea/                # Ativos visuais de projetos nos Estados Unidos
│   ├── estrutural/         # Imagens de engenharia estrutural e laudos
│   └── docs/
│       └── documento-projeto.pdf # Dossiê e especificações técnicas
│
├── index.html              # Estrutura principal da página (Semantic HTML5)
├── style.css               # Design System Industrial (Grid Contínuo & High-End)
└── script.js               # Comportamento de navegação, tratamento de assets e fluxo multi-step
```


## 🎨 Design System & Tecnologias

* **Tipografia:** Inter para leitura estrutural e JetBrains Mono para dados industriais, códigos de prancha e métricas.
* **Paleta de Cores:**
  * **Fundo Base:** Preto Grafite Profundo (`#07090e`)
  * **Linhas de Grade:** Azul Aço Escuro / Border (`#1f293d`)
  * **Destaque / Acento:** Laranja de Precisão (`#ff4500`)
* **Grid Industrial:** Sistema de galerias responsivas baseadas em `auto-fill` para o aproveitamento integral de todos os arquivos de imagem sem espaços vazios.

---

## ⚙️ Configuração do Formulário (Formspree)

O formulário de contato em etapas está preparado para ser integrado de forma simples através do serviço Formspree.io:

* Crie um formulário gratuito em formspree.io.
* Copie o endpoint gerado (ex: `https://formspree.io/f/seu-id`).
* No arquivo `index.html`, localize a tag `<form>` na seção de contato e atualize o atributo `action`:

```html
<form id="multiStepForm" action="[https://formspree.io/f/seu-id](https://formspree.io/f/seu-id)" method="POST">
```

## 📱 Canal Direto (WhatsApp)

Para configurar o número de atendimento flutuante, abra o index.html e substitua o trecho 55SEUNUMEROAQUI no link do WhatsApp pelo seu número com DDI e DDD:

```html
href="[https://wa.me/5532999999999?text=Olá,%20Gostaria%20de%20falar%20sobre%20um%20projeto](https://wa.me/5532999999999?text=Olá,%20Gostaria%20de%20falar%20sobre%20um%20projeto)..."
```


## 🚀 Execução Local

Como o projeto é estático (HTML5, CSS3 e Vanilla JavaScript), basta clonar o repositório e abrir o arquivo index.html em qualquer navegador moderno ou utilizar extensões de ambiente de desenvolvimento como o Live Server (VS Code).
