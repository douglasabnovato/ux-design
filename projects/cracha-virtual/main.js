/**
 * Objeto Central: App LearnTECH
 * Gerencia o estado, eventos e renderização do Crachá Digital
 */
const App = {
  // Configurações específicas de cada Unidade de Negócio (BU)
  themeConfigs: {
    "theme-green": {
      avatar: "./assets/imgs/img-1.jpg",
      buName: "Educação (byteclass)",
    },
    "theme-blue": {
      avatar: "./assets/imgs/img-2.jpg",
      buName: "Logística (Volta Express)",
    },
    "theme-purple": {
      avatar: "./assets/imgs/img-3.jpg",
      buName: "Ecossistema (Career)",
    },
    "theme-orange": {
      avatar: "./assets/imgs/img-4.jpg",
      buName: "Startup (Ventures)",
    },
  },

  // Estado inicial da aplicação
  state: {
    user: {
      nickname: "Douglas A B Novato",
      profession: "Senior Software Developer",
      github: "douglasabnovato",
      linkedin: "douglasabnovato",
      instagram: "douglasabnovato",
      avatarUrl: "./assets/imgs/img-1.jpg",
    },
    theme: "theme-green",
  },

  // Mapeamento de elementos do DOM
  el: {
    btnMenu: document.getElementById("btn-menu-mobile"),
    configPanel: document.querySelector(".config-panel"),
    form: document.getElementById("badge-form"),
    btnExport: document.getElementById("btnExport"),
    buDisplay: document.getElementById("current-bu"),
    inputs: {
      nickname: document.getElementById("inputNickname"),
      profession: document.getElementById("inputProfession"),
      github: document.getElementById("inputGithub"),
      linkedin: document.getElementById("inputLinkedin"),
      instagram: document.getElementById("inputInstagram"),
      avatar: document.getElementById("inputAvatar"),
    },
    preview: {
      badge: document.getElementById("badge-preview"),
      name: document.getElementById("userName"),
      profession: document.getElementById("userProfession"),
      login: document.getElementById("userLogin"),
      githubLink: document.getElementById("userLink"),
      image: document.getElementById("UserImage"),
      linkedinLink: document.querySelector(".linkedin a"),
      instagramLink: document.querySelector(".instagram a"),
    },
    themeBtns: document.querySelectorAll(".btn-theme"),
  },

  /**
   * Inicializa a aplicação
   */
  init() {
    this.syncFormWithState();
    this.registerEvents();
    this.render();
  },

  /**
   * Registra todos os ouvintes de eventos
   */
  registerEvents() {
    const { inputs, themeBtns, btnExport, btnMenu } = this.el;
    // Dentro do registerEvents()
    const fabEdit = document.getElementById("fab-edit");
    if (fabEdit) {
      fabEdit.addEventListener("click", () => this.toggleMenu());
    }
    // Controle do Menu Mobile (Drawer)
    if (btnMenu) {
      btnMenu.addEventListener("click", () => this.toggleMenu());
    }

    // Atalho para atualizar campos com debounce
    const updateField = (field) =>
      this.debounce((e) => {
        this.state.user[field] = e.target.value;
        this.render();
      });

    // Eventos de Input
    inputs.nickname.addEventListener("input", updateField("nickname"));
    inputs.profession.addEventListener("input", updateField("profession"));
    inputs.github.addEventListener("input", updateField("github"));
    inputs.linkedin.addEventListener("input", updateField("linkedin"));
    inputs.instagram.addEventListener("input", updateField("instagram"));

    // Upload de Foto
    inputs.avatar.addEventListener("change", (e) => this.handleImageUpload(e));

    // Seleção de Temas (BUs)
    themeBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const selectedTheme = btn.getAttribute("data-theme");
        this.state.theme = selectedTheme;

        // Ao trocar de BU, reseta para a foto padrão daquela BU
        this.state.user.avatarUrl = this.themeConfigs[selectedTheme].avatar;

        this.render();

        // No mobile, fecha o menu após selecionar a BU para ver o resultado
        if (window.innerWidth < 960) {
          this.toggleMenu();
        }
      });
    });

    // Exportação
    btnExport.addEventListener("click", () => this.exportBadge());
  },

  /**
   * Abre/Fecha o painel lateral no mobile
   */
  toggleMenu() {
    this.el.configPanel.classList.toggle("active");
    this.el.btnMenu.classList.toggle("open");
  },

  /**
   * Preenche o formulário com os dados iniciais do estado
   */
  syncFormWithState() {
    const { user } = this.state;
    const { inputs } = this.el;
    inputs.nickname.value = user.nickname;
    inputs.profession.value = user.profession;
    inputs.github.value = user.github;
    inputs.linkedin.value = user.linkedin;
    inputs.instagram.value = user.instagram;
  },

  /**
   * Processa o upload de imagem local
   */
  handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.state.user.avatarUrl = e.target.result;
        this.render();
      };
      reader.readAsDataURL(file);
    }
  },

  /**
   * Gera a imagem do crachá para download
   */
  async exportBadge() {
    const { badge } = this.el.preview;
    const btn = this.el.btnExport;

    const originalContent = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Gerando...';
    btn.disabled = true;

    try {
      const canvas = await html2canvas(badge, {
        useCORS: true,
        scale: 2,
        backgroundColor: null,
      });

      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      const fileName = this.state.user.nickname
        .replace(/\s+/g, "-")
        .toLowerCase();

      link.download = `cracha-${fileName}.png`;
      link.href = image;
      link.click();
    } catch (error) {
      console.error("Erro ao exportar:", error);
      alert("Erro ao gerar imagem. Tente novamente.");
    } finally {
      btn.innerHTML = originalContent;
      btn.disabled = false;
    }
  },

  /**
   * Atualiza a interface (Preview e Textos)
   */
  render() {
    const { user, theme } = this.state;
    const { preview, buDisplay } = this.el;

    // Atualiza Textos
    preview.name.textContent = user.nickname || "Seu Nome";
    preview.profession.textContent = user.profession || "Sua Profissão";
    preview.login.textContent = user.github || "github-user";

    if (buDisplay) {
      buDisplay.textContent = this.themeConfigs[theme].buName;
    }

    // Atualiza Links Sociais
    preview.githubLink.href = `https://github.com/${user.github || ""}`;
    preview.linkedinLink.href = `https://linkedin.com/in/${user.linkedin || ""}`;
    preview.instagramLink.href = `https://instagram.com/${user.instagram || ""}`;

    // Atualiza Imagem de Perfil
    if (user.avatarUrl) {
      preview.image.src = user.avatarUrl;
    }

    // Aplica a Classe do Tema no Container do Crachá
    preview.badge.className = `container ${theme}`;
  },

  /**
   * Evita múltiplas chamadas seguidas na renderização
   */
  debounce(func, wait = 300) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  },
};

// Inicia o App quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => App.init());
