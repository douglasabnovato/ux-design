# 👗 Catálogo Virtual de Roupas • Módulo UX / E-commerce SPA

> **Status:** 🛠️ Em Desenvolvimento (Etapa 3/4) | **Tipo:** Single Page Application (SPA) / Catálogo E-commerce

## 📖 Sobre o Projeto
O **Catálogo Virtual de Roupas** é uma Single Page Application (SPA) desenvolvida para lojas e marcas do setor de moda. A plataforma permite aos clientes navegar por coleções, conferir novidades, visualizar detalhes de peças em modais, selecionar itens para uma sacola de favoritos e **gerar orçamentos em PDF** prontos para exportação.

## 🎓 O que o aluno aprende aqui?
- **Arquitetura SPA (Single Page Application):** Construção de uma interface fluida sem recarregamento de página.
- **Fluxo de Trabalho com Git Flow Stricto:** Estruturação de branches por estágios (`main`, `developer`, `feature/stage-1`, `feature/stage-2`, etc.).
- **Geração de Documentos Dinâmicos:** Manipulação da biblioteca `html2pdf.js` para converter elementos da DOM (sacola de compras/orçamento) em arquivos PDF.
- **UI/UX para E-commerce:** Implementação de vitrines dinâmicas, modais de detalhes de produtos, grids com paginação e banners promocionais.

## 🌿 Estratégia de Branches & Gestão do Projeto
- **`main`:** Código estável e versão em produção.
- **`developer`:** Branch de integração, testes e validação de funcionalidades.
- **`feature/stage-X`:** Branches dedicadas para cada etapa de desenvolvimento do catálogo.

---

## 📐 Etapas de Desenvolvimento & Roadmap

### 🏁 Etapa 1 — Estrutura e Interface Base (`feature/stage-1`)
- [x] **Internacionalização:** Interface 100% em português.
- [x] **Responsividade Total:** Suporte para desktop, tablet e dispositivos móveis.
- [x] **Branding Base:** Implementação de logo e `favicon`.
- [x] **Header & Navigation:** Menu responsivo (Logo, Looks, Novidades, Puro Estilo, Nossas marcas).
- [x] **Main Banner:** Banner principal com lançamento de coleção.
- [x] **Lookbook Section:** Destaques de combinações e visual montado (`trending-product`).
- [x] **Categorias Conceito:** Banners de 3 peças conceito.
- [x] **Novidades:** Vitrine de lançamentos recém-chegados (`product1 - news`).
- [x] **Ofertas & Banners OFF:** Destaques com promoção 70% off e coleções.
- [x] **Acessórios & Campanhas:** Seção dedicada a acessórios e área "O Que Vem Por Aí!?".
- [x] **Prova Social & Marcas:** Testemunhais de clientes e galeria de marcas parceiras.
- [x] **Seção Fundadores & Footer:** Apresentação da equipe e rodapé institucional.

### 🛍️ Etapa 2 — Modais & Funcionalidades de Sacola (`feature/stage-2`)
- [x] **Modal de Detalhes:** Visualização expandida de cada peça ao clicar no card.
- [x] **Sacola de Favoritos:** Adição de itens para cotação e orçamento em modal.
- [x] **Exportação para PDF:** Geração automática do PDF da sacola usando `html2pdf.js`.
- [x] **Paginação de Grids:** Controle de páginas nas listagens de produtos.

### ⏳ Etapa 3 — Filtros e Interatividade (`feature/stage-3`)
- [ ] **Busca & Filtros:** Sistema de filtragem por categorias, ordenação e barra de pesquisa na seção *Puro Estilo*.
- [ ] **Componentes Dinâmicos:** Botão "Ver Mais", sliders para slideshow e novos cards de produtos.
- [ ] **Modais Informativos:** Modais de texto no rodapé.

### 🎨 Etapa 4 — Refinamento de UI & Polish (`feature/stage-4`)
- [ ] **Identidade Visual Final:** Refinamento do Design System e temas de cores.
- [ ] **Efeitos Mobile:** Animações CSS, gestos de swipe e microinterações.
- [ ] **Dinamização do Estado:** Garantir integração total com objetos JSON.

---

## 🛠️ Tecnologias & Utilitários
- **Linguagens:** HTML5, CSS3, JavaScript ES6+
- **Bibliotecas JS:** [html2pdf.js (0.8.0)](https://cdnjs.com/libraries/html2pdf.js/0.8.0)
- **Tipografia:** [Google Fonts - League Spartan](https://fonts.google.com/specimen/League+Spartan) & [Poppins](https://fonts.google.com/specimen/Poppins)
- **Ícones & Símbolos:** [Font Awesome](https://fontawesome.com/) & [HTML Arrows](https://www.toptal.com/designers/htmlarrows/)

## 💡 Referências & Tutoriais Utilizados
1. **Estrutura Principal:** [Saidul Islam](https://www.youtube.com/watch?v=FaNTVjATYHQ)
2. **Seções, Banners e Modais:** [GreatStack - Serie E-commerce](https://www.youtube.com/watch?v=yQimoqo0-7g)
3. **Sacola, Cupons e Paginação:** [Tech2 etc](https://www.youtube.com/watch?v=P8YuWEkTeuE)
4. **Exportação de PDF:** [Hora de Codar - html2pdf](https://www.youtube.com/watch?v=lr90eFF7whI)
5. **Slideshow e Filtros:** [Loop True](https://www.youtube.com/watch?v=WPU8eC6UNFo)
6. **Depoimentos e Pesquisa:** [Mr. Web Designer](https://www.youtube.com/watch?v=GFmSgTYX5fg)

---
📦 **Parte do Monorepo UX Design / Ecossistema learnTECH** • *Instrutor: Douglas A B Novato*