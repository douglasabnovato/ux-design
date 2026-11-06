# Crachá Digital | LearnTECH Ecosystem 🚀

<p align="center">
  <img src="https://img.shields.io/static/v1?label=Role&message=Senior+Fullstack&color=49AA26&labelColor=000000" alt="Senior Dev" />
  <img src="https://img.shields.io/static/v1?label=BU&message=Logistics+Edu&color=2649AA&labelColor=000000" alt="BUs" />
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=49AA26&labelColor=000000">
</p>

## 📌 Evolução do Projeto (V2)

O **Crachá Digital** é uma aplicação interativa desenvolvida para o ecossistema **learnTECH**. O objetivo é permitir que colaboradores, alunos e parceiros gerem uma identidade visual personalizada em tempo real, alinhada às diferentes Unidades de Negócio (BUs) do grupo: Educação (ByteClass), Logística (Volta Express), Ecossistema (Career) e Startup (Ventures).

---

## 🎯 Objetivo do Projeto

Padronizar a presença digital dos membros do ecossistema em redes sociais e eventos, oferecendo uma ferramenta de self-service para criação de crachás virtuais. A aplicação foca em **UX de alta performance**, sendo totalmente responsiva e permitindo a exportação imediata da identidade visual em formato de imagem.

---

## ✨ Funcionalidades

- [x] **Edição Real-time:** Atualização instantânea dos dados (Nome, Profissão, Links Sociais) no preview do crachá.
- [x] **Seletor de BUs (Temas):** Troca dinâmica de identidade visual (cores, backgrounds e selos) baseada na Unidade de Negócio selecionada.
- [x] **Upload de Avatar:** Suporte para carregamento de foto pessoal via seletor de arquivos.
- [x] **Estratégia Mobile-First:** Interface adaptável com menu lateral (_Drawer_) para facilitar a edição em dispositivos móveis.
- [x] **Exportação em PNG:** Geração de imagem em alta definição utilizando a biblioteca `html2canvas`.
- [x] **Integração Social:** Links dinâmicos para GitHub, LinkedIn e Instagram.

---

## 🛠 Tecnologias & Conceitos Aplicados

Diferente da versão inicial, a V2 foca em **Arquitetura de Software** e **UX**:

- **Vanilla JavaScript (State-Driven):** Lógica centralizada em um objeto global (`App`) que gerencia o estado da UI sem frameworks pesados.
- **CSS Variables & Themes:** Sistema dinâmico de temas que altera cores e backgrounds instantaneamente conforme a BU selecionada.
- **Mobile-First & Drawer Layout:** UX pensada para o uso em smartphones, com painel de configuração lateral (_Drawer_).
- **html2canvas Integration:** Processamento de elementos DOM para exportação de imagem PNG em alta resolução.
- **Responsive Grid:** Layout adaptável para resoluções Desktop (Split Screen) e Mobile (Full Preview).

---

## 🚀 Como rodar o projeto localmente

Siga os passos abaixo para clonar o repositório e executar em sua máquina:

### 1. Clonar o repositório

Abra o seu terminal e execute:

````bash
1.  **Clone o repositório:**
    git clone [https://github.com/douglasabnovato/cracha-virtual.git](https://github.com/douglasabnovato/cracha-virtual.git)
    ```
2.  **Acesse o diretório:**
    ```bash
    cd learnTECH
    ```
3.  **Execução:**
    Abra o `index.html` ou use a extensão **Live Server** no VS Code.
````
 
### 2. Configurar os Assets

Certifique-se de que a estrutura de pastas de imagens está correta para o carregamento dos temas:

- ./assets/imgs/ (Avatares padrão)

- ./assets/bg/ (Backgrounds das BUs)

- ./assets/logo/ (Logos das BUs)

- ./assets/icons/ (Ícones de selos e especialidades)

### 3. Executar a aplicação

Como o projeto utiliza JavaScript puro, você não precisa instalar dependências via npm. Basta abrir o arquivo index.html no seu navegador ou utilizar a extensão Live Server no VS Code para uma melhor experiência de desenvolvimento.

---

## 🔖 Detalhes de Implementação (Insights)

- **Modularização:** O código foi estruturado para que novas BUs sejam adicionadas apenas inserindo um objeto no `themeConfigs`.
- **Performance:** Uso de `Debounce` na captura de inputs para evitar renderizações excessivas e garantir fluidez.
- **Acessibilidade:** Uso de tags semânticas e labels estruturadas para leitores de tela.

---

#### 👨‍💻 Autor

Desenvolvido por Douglas A B Novato CTO @ LearnTECH | Senior Software Developer
