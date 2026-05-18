/* ================================
   Menu mobile
================================ */
const menuToggle = document.getElementById("menuToggle");
const mainNavigation = document.getElementById("main-navigation");

function closeMenu() {
  mainNavigation.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

function openMenu() {
  mainNavigation.classList.add("is-open");
  menuToggle.setAttribute("aria-expanded", "true");
}

if (menuToggle && mainNavigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNavigation.classList.contains("is-open");
    isOpen ? closeMenu() : openMenu();
  });

  mainNavigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  document.addEventListener("click", (event) => {
    const clickedOutside =
      !mainNavigation.contains(event.target) &&
      !menuToggle.contains(event.target);

    if (clickedOutside) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}
/* ================================
   FIM Menu mobile
================================ */

/* ================================
   Botões de cadastro
================================ */
const heroButton = document.getElementById("heroButton");
const openModalButtonHeader = document.getElementById("openModalButtonHeader");
const cadastroSection = document.getElementById("cadastro");

function scrollToCadastro() {
  if (cadastroSection) {
    cadastroSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

if (heroButton) {
  heroButton.addEventListener("click", scrollToCadastro);
}

if (openModalButtonHeader) {
  openModalButtonHeader.addEventListener("click", (event) => {
    event.preventDefault();
    scrollToCadastro();
  });
}
/* ================================
   FIM Botões de cadastro
================================ */

/* ================================
   Scroll suave para âncoras
================================ */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (event) {
    const targetId = this.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });

    if (mainNavigation && mainNavigation.classList.contains("is-open")) {
      closeMenu();
    }
  });
});
/* ================================
   FIM Scroll suave para âncoras
================================ */

/* ================================
   Formulário multi-etapas
================================ */
const landingForm = document.getElementById("landingForm");
const formSteps = document.querySelectorAll(".form-step");
const nextStepBtn = document.getElementById("nextStep");
const prevStepBtn = document.getElementById("prevStep");
const submitFormBtn = document.getElementById("submitForm");

let currentStep = 0;

function showStep(stepIndex) {
  formSteps.forEach((step, index) => {
    step.classList.toggle("is-active", index === stepIndex);
  });

  if (prevStepBtn) {
    prevStepBtn.disabled = stepIndex === 0;
    prevStepBtn.style.opacity = stepIndex === 0 ? "0.5" : "1";
    prevStepBtn.style.cursor = stepIndex === 0 ? "not-allowed" : "pointer";
  }

  if (nextStepBtn && submitFormBtn) {
    nextStepBtn.classList.toggle(
      "is-hidden",
      stepIndex === formSteps.length - 1,
    );
    submitFormBtn.classList.toggle(
      "is-hidden",
      stepIndex !== formSteps.length - 1,
    );
  }
}

function clearErrors(stepEl) {
  stepEl.querySelectorAll(".error").forEach((errorEl) => {
    errorEl.textContent = "";
  });
}

function validateCurrentStep() {
  const step = formSteps[currentStep];
  clearErrors(step);
  let isValid = true;

  const inputs = step.querySelectorAll("input, select, textarea");

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      isValid = false;
      const errorBox = step.querySelector(
        `#error${input.id.charAt(0).toUpperCase()}${input.id.slice(1)}`,
      );
      if (errorBox) {
        errorBox.textContent = "Campo obrigatório.";
      }
      input.setAttribute("aria-invalid", "true");
    } else {
      input.removeAttribute("aria-invalid");
    }
  });

  return isValid;
}

if (landingForm && formSteps.length) {
  showStep(currentStep);

  if (nextStepBtn) {
    nextStepBtn.addEventListener("click", () => {
      if (!validateCurrentStep()) return;

      if (currentStep < formSteps.length - 1) {
        currentStep += 1;
        showStep(currentStep);
      }
    });
  }

  if (prevStepBtn) {
    prevStepBtn.addEventListener("click", () => {
      if (currentStep > 0) {
        currentStep -= 1;
        showStep(currentStep);
      }
    });
  }

  landingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const lastStep = formSteps[formSteps.length - 1];
    clearErrors(lastStep);

    const requiredFields = lastStep.querySelectorAll("input, select, textarea");
    let isValid = true;

    requiredFields.forEach((field) => {
      if (field.type === "checkbox") {
        if (!field.checked) {
          isValid = false;
        }
      } else if (!field.value.trim()) {
        isValid = false;
      }
    });

    if (!isValid) {
      alert("Por favor, revise os campos obrigatórios antes de enviar.");
      return;
    }

    alert("Cadastro enviado com sucesso!");
    landingForm.reset();
    currentStep = 0;
    showStep(currentStep);
  });
}
/* ================================
   FIM Formulário multi-etapas
================================ */

/* ================================
   Ajuste visual do header ao rolar
================================ */
const header = document.querySelector(".lp-header");

if (header) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 12) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  });
}
/* ================================
   FIM Ajuste visual do header ao rolar
================================ */
