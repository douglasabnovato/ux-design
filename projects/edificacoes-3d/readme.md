# 🏗️ Edificações 3D • Módulo UX / Arquitetura & Engenharia

> **Status:** 🛠️ Em Refatoração | **Tipo:** Portfólio de Engenharia & Arquitetura

## 📖 Sobre o Projeto
O **Edificações 3D** é um portfólio web desenvolvido para o setor de construção civil, engenharia e arquitetura. O sistema permite exibir maquetes virtuais, plantas e renderizações 3D (arquivos SketchUp) de projetos prediais e residenciais, oferecendo visualização para clientes em smartphones, tablets e desktops.

## 🎓 O que o aluno aprende aqui?
- **Integração de Frameworks CSS via CDN:** Uso do `W3.CSS` e `Font Awesome 4.7` para prototipagem rápida de grid responsivo (`w3-row`, `w3-half`).
- **Gestão e Organização de Assets 3D:** Estruturação de mídias de alta resolução, renders humanizados em PNG/BMP e arquivos nativos do 3D (`.skp` do Google SketchUp).
- **Auditoria & Refatoração de Caminhos:** Correção de bugs comuns de deploy relacionados a caminhos relativos (`./`) vs. absolutos (`/`).
- **UX para Construção Civil:** Benchmarking e pesquisa de mercado com plataformas reais do setor imobiliário e de engenharia.

## 📁 Estrutura do Projeto e Ativos
```text
edificacoes-3d/
├── 📄 index.html                      # Estrutura principal em W3.CSS
├── 📄 README.md                        # Documentação do projeto
├── 📁 public/                         # Favicon (house.png)
├── 📁 image/                          # Imagens gerais do projeto (house1.jpg, etc.)
├── 📁 google-sketchUp-imagens-1/      # Imagens e JPG/PNGs dos projetos
├── 📁 google-sketchUp-imagens-2/      # Renderizações 3D humanizadas (PNG/BMP)
├── 📁 google-sketchUp-projetos-1/     # Arquivos originais do SketchUp (.skp)
└── 📁 google-sketchUp-projetos-2/     # Arquivos originais do SketchUp (.skp)
``` 

## 🚀 Funcionalidades & Checklist de Correções

### 🔍 Diagnóstico Técnico e Refatorações Pendentes

- [x] **Inclusão do Favicon:** Ícone `public/house.png` configurado.
- [x] **Base Responsiva:** Grid configurado para telas desktop e mobile.
- [ ] **Padronização de Caminhos de Imagem:** Unificar os caminhos no `index.html` (remover misturas de `./` e `/` para evitar links quebrados no deploy).
- [ ] **Estilização Local:** Criar um arquivo `style.css` local para reduzir a dependência exclusiva do CDN W3.CSS e personalizar a tipografia.
- [ ] **Navegação & Menu:** Configurar os `id`s nas seções e implementar os links funcionais no menu.
- [ ] **Detalhamento de Conteúdo:** Substituir textos genéricos em inglês por descrições reais dos projetos arquitetônicos.
- [ ] **Higienização de Mídias:** Avaliar a movimentação dos arquivos `.skp` para um repositório de assets ou armazenamento cloud, mantendo no site apenas mídias otimizadas para web.

---

### 💡 Referências e Inspirações de UX

O projeto foi modelado com base nas principais plataformas de engenharia e projetos arquitetônicos:

- **Plataformas de Plantas:** [Planta Pronta](https://www.plantapronta.com.br/), [Projeto Pronto](https://projetopronto.com.br/), [123Projetei](https://123projetei.com/), [Archshop](https://archshop.com.br/)
- **Gestão & Engenharia:** [Plano e Projeto](https://planoeprojeto.com/), [MASP Projetos](https://www.maspprojetos.com/), [Onwe](https://onwe.com.br/)
- **Portais Setoriais:** [CRT-SP](https://www.crtsp.gov.br/), [Sesi Senai - Técnico em Edificações](https://blog.sesisenai.org.br/tecnico-em-edificacoes/)

---

📦 **Parte do Monorepo UX Design / Ecossistema learnTECH** • *Instrutor: Douglas A B Novato*