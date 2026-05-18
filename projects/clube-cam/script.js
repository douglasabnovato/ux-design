document.addEventListener("DOMContentLoaded", () => {
  const heroButton = document.getElementById("heroButton");
  const openModalButtonHeader = document.getElementById(
    "openModalButtonHeader",
  );

  const landingForm = document.getElementById("landingForm");
  const cadastroSection = document.getElementById("cadastro");

  const estadoGuide = document.getElementById("estadoGuide");
  const cidadeGuide = document.getElementById("cidadeGuide");
  const nomeGuide = document.getElementById("nomeGuide");

  const prevStepBtn = document.getElementById("prevStep");
  const nextStepBtn = document.getElementById("nextStep");
  const submitFormBtn = document.getElementById("submitForm");

  const stepperItems = document.querySelectorAll(".stepper-item");
  const steps = document.querySelectorAll(".form-step");

  const formFeedback = document.getElementById("formFeedback");
  const formFeedbackTitle = document.getElementById("formFeedbackTitle");
  const formFeedbackText = document.getElementById("formFeedbackText");

  const cityOptions = {
    BA: ["Salvador", "Feira de Santana"],
    DF: ["Brasília"],
    ES: ["Vitória", "Vila Velha"],
    GO: ["Goiânia", "Anápolis"],
    MG: ["Belo Horizonte", "Uberlândia", "Contagem"],
    MS: ["Campo Grande"],
    PR: ["Curitiba", "Londrina"],
    RJ: ["Rio de Janeiro", "Niterói"],
    SC: ["Florianópolis", "Joinville"],
    SP: ["São Paulo", "Campinas", "Santos"],
  };

  const guideOptions = {
    Salvador: ["Guide Shop Salvador Central"],
    "Feira de Santana": ["Guide Shop Feira"],
    Brasília: ["Guide Shop Brasília"],
    Vitória: ["Guide Shop Vitória"],
    "Vila Velha": ["Guide Shop Vila Velha"],
    Goiânia: ["Guide Shop Goiânia"],
    Anápolis: ["Guide Shop Anápolis"],
    "Belo Horizonte": ["Guide Shop BH"],
    Uberlândia: ["Guide Shop Uberlândia"],
    Contagem: ["Guide Shop Contagem"],
    "Campo Grande": ["Guide Shop Campo Grande"],
    Curitiba: ["Guide Shop Curitiba"],
    Londrina: ["Guide Shop Londrina"],
    "Rio de Janeiro": ["Guide Shop Rio"],
    Niterói: ["Guide Shop Niterói"],
    "São Paulo": ["Guide Shop São Paulo"],
    Campinas: ["Guide Shop Campinas"],
    Santos: ["Guide Shop Santos"],
  };

  let currentStep = 1;
  let feedbackTimer = null;

  function scrollToCadastro() {
    cadastroSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  heroButton?.addEventListener("click", scrollToCadastro);
  openModalButtonHeader?.addEventListener("click", (event) => {
    event.preventDefault();
    scrollToCadastro();
  });

  function resetErrors() {
    document.querySelectorAll(".error").forEach((el) => {
      el.textContent = "";
    });
  }

  function hideFeedback() {
    if (feedbackTimer) clearTimeout(feedbackTimer);
    if (formFeedback) formFeedback.hidden = true;
  }

  function showFeedback(type, title, text) {
    if (!formFeedback || !formFeedbackTitle || !formFeedbackText) return;

    if (feedbackTimer) clearTimeout(feedbackTimer);

    formFeedback.classList.remove("success", "error");
    formFeedback.classList.add(type);

    formFeedbackTitle.textContent = title;
    formFeedbackText.textContent = text;
    formFeedback.hidden = false;

    formFeedback.scrollIntoView({ behavior: "smooth", block: "nearest" });

    feedbackTimer = setTimeout(() => {
      formFeedback.hidden = true;
    }, 5000);
  }

  function setStep(step) {
    currentStep = step;

    steps.forEach((el) => {
      const stepNumber = Number(el.dataset.step);
      el.classList.toggle("is-active", stepNumber === currentStep);
    });

    stepperItems.forEach((item, index) => {
      item.classList.toggle("is-active", index + 1 <= currentStep);
    });

    if (prevStepBtn) prevStepBtn.disabled = currentStep === 1;
    if (nextStepBtn)
      nextStepBtn.classList.toggle("is-hidden", currentStep === steps.length);
    if (submitFormBtn)
      submitFormBtn.classList.toggle("is-hidden", currentStep !== steps.length);
  }

  function validateStep(step) {
    resetErrors();
    let valid = true;

    if (step === 1) {
      const nome = document.getElementById("nome")?.value.trim() || "";
      const sobrenome =
        document.getElementById("sobrenome")?.value.trim() || "";
      const celular = document.getElementById("celular")?.value.trim() || "";
      const email = document.getElementById("email")?.value.trim() || "";

      const celularDigits = celular.replace(/\D/g, "");

      if (!nome) {
        document.getElementById("errorNome").textContent =
          "O nome é obrigatório.";
        valid = false;
      }

      if (!sobrenome) {
        document.getElementById("errorSobrenome").textContent =
          "O sobrenome é obrigatório.";
        valid = false;
      }

      if (!celular || celularDigits.length < 10 || celularDigits.length > 11) {
        document.getElementById("errorCelular").textContent =
          "Digite um celular válido.";
        valid = false;
      }

      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        document.getElementById("errorEmail").textContent =
          "Digite um e-mail válido.";
        valid = false;
      }
    }

    if (step === 2) {
      if (!estadoGuide?.value) {
        document.getElementById("errorEstado").textContent =
          "Selecione o estado.";
        valid = false;
      }

      if (!cidadeGuide?.value) {
        document.getElementById("errorCidade").textContent =
          "Selecione a cidade.";
        valid = false;
      }

      if (!nomeGuide?.value) {
        document.getElementById("errorGuide").textContent =
          "Escolha sua Guide Shop favorita.";
        valid = false;
      }

      const preferenciaABC = document.getElementById("preferenciaABC");
      if (preferenciaABC && !preferenciaABC.value) {
        preferenciaABC.setCustomValidity("Selecione uma preferência.");
        valid = false;
      } else if (preferenciaABC) {
        preferenciaABC.setCustomValidity("");
      }
    }

    if (step === 3) {
      const camTime = document.getElementById("camTime");
      const camMomento = document.getElementById("camMomento");
      const camMsg = document.getElementById("camMsg");
      const firstcheck = document.getElementById("firstcheck");
      const secondcheck = document.getElementById("secondcheck");

      if (camTime && !camTime.value) {
        camTime.setCustomValidity("Selecione uma opção.");
        valid = false;
      } else if (camTime) {
        camTime.setCustomValidity("");
      }

      if (camMomento && !camMomento.value) {
        camMomento.setCustomValidity("Selecione uma opção.");
        valid = false;
      } else if (camMomento) {
        camMomento.setCustomValidity("");
      }

      if (camMsg && camMsg.value.trim().length < 10) {
        camMsg.setCustomValidity(
          "Escreva uma mensagem curta para o Galo e a ABC.",
        );
        valid = false;
      } else if (camMsg) {
        camMsg.setCustomValidity("");
      }

      if (firstcheck && !firstcheck.checked) {
        document.getElementById("errorFirstcheck").textContent =
          "Você precisa concordar com a política de privacidade.";
        valid = false;
      }

      if (secondcheck && !secondcheck.checked) {
        document.getElementById("errorSecondcheck").textContent =
          "Você precisa aceitar receber comunicações.";
        valid = false;
      }
    }

    return valid;
  }

  function updateCities() {
    if (!estadoGuide || !cidadeGuide || !nomeGuide) return;

    const state = estadoGuide.value;
    cidadeGuide.innerHTML = '<option value="">Escolha a cidade</option>';
    nomeGuide.innerHTML = '<option value="">Escolha a Guide Shop</option>';
    nomeGuide.disabled = true;

    if (!state || !cityOptions[state]) {
      cidadeGuide.disabled = true;
      cidadeGuide.innerHTML =
        '<option value="">Escolha o estado primeiro</option>';
      return;
    }

    cidadeGuide.disabled = false;
    cityOptions[state].forEach((city) => {
      const option = document.createElement("option");
      option.value = city;
      option.textContent = city;
      cidadeGuide.appendChild(option);
    });
  }

  function updateGuides() {
    if (!cidadeGuide || !nomeGuide) return;

    const city = cidadeGuide.value;
    nomeGuide.innerHTML = '<option value="">Escolha a Guide Shop</option>';

    if (!city || !guideOptions[city]) {
      nomeGuide.disabled = true;
      nomeGuide.innerHTML =
        '<option value="">Escolha a cidade primeiro</option>';
      return;
    }

    nomeGuide.disabled = false;
    guideOptions[city].forEach((guide) => {
      const option = document.createElement("option");
      option.value = guide;
      option.textContent = guide;
      nomeGuide.appendChild(option);
    });
  }

  estadoGuide?.addEventListener("change", updateCities);
  cidadeGuide?.addEventListener("change", updateGuides);

  prevStepBtn?.addEventListener("click", () => {
    if (currentStep > 1) {
      hideFeedback();
      setStep(currentStep - 1);
    }
  });

  nextStepBtn?.addEventListener("click", () => {
    hideFeedback();
    if (!validateStep(currentStep)) return;
    if (currentStep < steps.length) setStep(currentStep + 1);
  });

  landingForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    hideFeedback();
    resetErrors();

    const step1 = validateStep(1);
    const step2 = validateStep(2);
    const step3 = validateStep(3);

    if (!step1 || !step2 || !step3) {
      showFeedback(
        "error",
        "Ops, faltou ajustar alguns campos",
        "Revise os dados e tente novamente. Estamos quase lá!",
      );
      setStep(1);
      return;
    }

    showFeedback(
      "success",
      "Cadastro concluído com sucesso!",
      "Perfeito! Agora você faz parte da experiência ABC + Galo.",
    );

    landingForm.reset();
    if (cidadeGuide) {
      cidadeGuide.innerHTML =
        '<option value="">Escolha o estado primeiro</option>';
      cidadeGuide.disabled = true;
    }
    if (nomeGuide) {
      nomeGuide.innerHTML =
        '<option value="">Escolha a cidade primeiro</option>';
      nomeGuide.disabled = true;
    }

    setStep(1);
  });

  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const answer = item?.querySelector(".faq-answer");
      const isOpen = button.getAttribute("aria-expanded") === "true";

      button.setAttribute("aria-expanded", String(!isOpen));
      item?.classList.toggle("is-open", !isOpen);
      if (answer) answer.hidden = isOpen;
    });
  });

  setStep(1);
});

const menuToggle = document.getElementById("menuToggle");
const siteMenu = document.getElementById("main-navigation");

function closeMenu() {
  if (!menuToggle || !siteMenu) return;
  siteMenu.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
}

function openMenu() {
  if (!menuToggle || !siteMenu) return;
  siteMenu.classList.add("is-open");
  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "Fechar menu");
}

if (menuToggle && siteMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteMenu.classList.contains("is-open");
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  siteMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 860) closeMenu();
    });
  });

  document.addEventListener("click", (event) => {
    if (
      !siteMenu.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) closeMenu();
  });
}
