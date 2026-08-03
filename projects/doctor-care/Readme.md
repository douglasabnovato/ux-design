# 🏥 DoctorCare — Assistência Médica Especializada

<p align="center">
<img src="./.github/template-1.jpg" alt="Preview do DoctorCare" width="100%">
</p>

### Status do Projeto: Concluído (v5.0) ✅
### Deploy: Acesse o site aqui

---

## 💻 Sobre o Projeto

O DoctorCare é uma Landing Page institucional moderna, responsiva e de alta performance. O projeto foi desenvolvido durante a trilha Origin do NLW Return (Rocketseat), aplicando conceitos avançados de Mobile First, acessibilidade e manipulação do DOM com JavaScript puro.

---

### 🎨 Identidade Visual e Cores

O projeto utiliza um sistema de cores baseado em HSL com uma variável central --hue. Isso permite que a marca mude toda sua paleta apenas alterando um número no CSS.

- Elemento,Cor (HSL/Hex),Aplicação
- Primária,"hsl(170, 100%, 26%)","Branding, Botões, Ícones"
- Headline,"hsl(210, 11%, 15%)",Títulos e Destaques
- Paragraph,"hsl(210, 9%, 31%)",Textos de leitura e descrições
- Brand Light,"hsl(148, 23%, 89%)",Fundos de seção (Background)
- Brand Beige,"hsl(39, 100%, 97%)",Cards e detalhes de apoio

---

### 📑 Anatomia da Landing Page (As Dobras)

Uma Landing Page é dividida em "dobras" (áreas visíveis sem scroll e áreas subsequentes), cada uma com um objetivo psicológico específico:

- A Primeira Dobra (Hero Section): \* Objetivo: Captar a atenção em menos de 5 segundos.

Elementos: Título impactante (H1), subtítulo explicativo e o CTA (Call to Action) principal para agendamento.

- Prova Social (Stats): \* Objetivo: Gerar autoridade imediata.

Elementos: Números de pacientes atendidos, especialistas e anos de mercado.

- A Dobra de Serviços (Features): \* Objetivo: Mostrar "o que fazemos".

Elementos: Cards intuitivos listando especialidades como Bem-estar mental, Cuidado Pediátrico, etc.

- A Dobra Sobre (Authority): \* Objetivo: Humanizar a marca e criar conexão.

Elementos: Foto da equipe/ambiente e a história da clínica.

- A Dobra de Contato (Conversion): \* Objetivo: Facilitar a ação final.

Elementos: Endereço, mapa e link direto para WhatsApp.

---

### 🚀 Funcionalidades Principais

- Navegação Inteligente: Menu que muda de cor no scroll e destaca a seção ativa (Active Menu).
- Menu Mobile: Menu overlay otimizado para polegares (UX Mobile).
- ScrollReveal: Animações de entrada suaves conforme o usuário desce a página.
- Back to Top: Botão flutuante que aparece dinamicamente para facilitar o retorno ao topo.
- Acessibilidade SVG: Ícones que herdam a cor da marca via CSS (fill e stroke).

---

### 🛠 Evolução Técnica (Log de Versões)

<details>
<summary><b>v5.0 — Refinamento Desktop & Grid</b></summary>

- Implementação de CSS Grid para o layout de duas colunas (col-a e col-b).

- Refinamento de Media Queries para telas de 1024px+.

- Lógica de JavaScript para detectar a seção visível na tela.

</details>

<details>
<summary><b>v4.0 — Customização & UX</b></summary>

- Sistema de cores dinâmico com a variável --hue.

- Botão "Back to Top" com lógica de visibilidade (scrollY > 550).

- Links diretos para WhatsApp (wa.me).

</details>

<details>
<summary><b>v1.0 a v3.0 — Fundação</b></summary>

- HTML5 Semântico.

- CSS3 (Variáveis, Flexbox, Grid)

- JavaScript (DOM, Event Listeners)

- Paradigma Mobile First.

- Integração da biblioteca ScrollReveal. (Biblioteca externa)

- Scroll suave (scroll-behavior: smooth).

</details> 

---
 
### 📂 Estrutura de Pastas: DOCTOR-CARE

#### 📁 .github/

Contém configurações específicas do GitHub (como fluxos de automação ou templates).

#### 📁 assets \ images/

Centraliza todos os recursos visuais do projeto. Notei que você já salvou as variações de imagem para a troca de temas:

- doutor-feliz-...png (Imagem padrão)

- homem-negro-...png

- mulher-negra-com-moletom-[cor].png (Verde, Preta, Laranja, Cinza, Azul, Amarelo).

#### 📁 css/

Aqui está a modularização que acabamos de fazer:

- **components.css**: Estilos de Swiper, Botões flutuantes e Color Picker.

- **footer.css**: Contato e Rodapé.

- **main.css**: Reset, tipografia global e utilitários.

- **navigation.css**: Header e Menu (Mobile/Desktop).

- **sections.css**: Home, Services, About e Testimonials.

- **variables.css**: Definições de cores HSL e variáveis de root.

#### 📁 public/

- Pasta para arquivos estáticos que não mudam (como o favicon ou o site.webmanifest).

#### 📄 index.html

- O arquivo principal onde você deve garantir que todos os links de CSS na <head> sigam a ordem que discutimos.

#### 📄 main.js

- Contém toda a lógica de scroll, Swiper e a engine de troca de cores.

#### 📄 Readme.md

- Documentação do projeto.

---

## ⚙️ Como executar o projeto

### 1. Clone este repositório:

```gitbash
git clone https://github.com/douglasabnovato/learnTECH.git
```

### 2. Abra o arquivo index.html no seu navegador ou utilize a extensão Live Server no VS Code.

---
 
### 💻 Próximos passos

🟢 Curto Prazo (Refinamentos de UI/UX)

- [x] Mudança de Cor do Site: amarelo, azul, cinza, laranja, preto, verde
- [x] Seção de Depoimentos: Adicionar um slider (usando Swiper.js) com social proof de pacientes reais. 
- [x] Modularização do CSS do projeto
- [x] Responsividade

🟡 Médio Prazo (Interatividade e Backend)

- [ ] Formulário de Contato Real: Integrar com o Formspree ou uma API de e-mail para que as mensagens cheguem à caixa de entrada da clínica.
- [ ] Sistema de Agendamento: Criar um modal de calendário para que o usuário escolha o dia e horário antes de ser redirecionado ao WhatsApp.
- [ ] Blog/Artigos: Desenvolver uma seção de conteúdos de saúde para melhorar o SEO da página.

🔴 Longo Prazo (Arquitetura e Escala) 
  
- [ ] Integração com Google Maps API: Adicionar um mapa interativo real na seção de contato.

Feito com ❤️ por Douglas A B Novato 👋🏽
