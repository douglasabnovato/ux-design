/* Header / Menu mobile */
const header = document.querySelector(".lp-header");
const menuToggle = document.getElementById("menuToggle");
const mainNavigation = document.getElementById("main-navigation");
const body = document.body;

function openMenu() {
  if (!mainNavigation || !menuToggle) return;

  mainNavigation.classList.add("is-open");
  menuToggle.classList.add("is-open");
  menuToggle.setAttribute("aria-expanded", "true");
  body.classList.add("menu-open");

  const firstLink = mainNavigation.querySelector("a");
  if (firstLink) firstLink.focus({ preventScroll: true });
}

function closeMenu() {
  if (!mainNavigation || !menuToggle) return;

  mainNavigation.classList.remove("is-open");
  menuToggle.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  body.classList.remove("menu-open");
}

function toggleMenu() {
  if (!mainNavigation || !menuToggle) return;

  const isOpen = mainNavigation.classList.contains("is-open");
  isOpen ? closeMenu() : openMenu();
}

if (menuToggle && mainNavigation) {
  menuToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleMenu();
  });

  mainNavigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    const clickedOutside =
      !mainNavigation.contains(event.target) &&
      !menuToggle.contains(event.target);

    if (clickedOutside) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      menuToggle.focus();
    }
  });
}

if (header) {
  window.addEventListener("scroll", () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  });
}

/* ================================
   Botões de cadastro
================================ */
const heroButton = document.getElementById("heroButton");
const openModalButtonHeader = document.getElementById("openModalButtonHeader");
const cadastroSection = document.getElementById("cadastro");

function scrollToCadastro(event) {
  if (event) event.preventDefault();
  if (!cadastroSection) return;

  closeMenu();
  cadastroSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

if (heroButton) {
  heroButton.addEventListener("click", scrollToCadastro);
}

if (openModalButtonHeader) {
  openModalButtonHeader.addEventListener("click", scrollToCadastro);
}

/* ================================
   Scroll suave para âncoras
================================ */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    closeMenu();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* ================================
   Formulário multi-etapas
================================ */
const landingForm = document.getElementById("landingForm");
const formSteps = Array.from(document.querySelectorAll(".form-step"));
const nextStepBtn = document.getElementById("nextStep");
const prevStepBtn = document.getElementById("prevStep");
const submitFormBtn = document.getElementById("submitForm");
const signupResponse = document.getElementById("signupResponse");
const resetFormBtn = document.getElementById("resetForm");
const stepLabel = document.getElementById("stepLabel");
const stepTitle = document.getElementById("stepTitle");
const progressFill = document.getElementById("progressFill");
const progressBar = document.querySelector(".signup-progress__bar");
const progressSteps = Array.from(
  document.querySelectorAll(".signup-progress__steps li"),
);

let currentStep = 0;

const stepMeta = [
  { label: "Etapa 1 de 3", title: "Informações do cliente" },
  { label: "Etapa 2 de 3", title: "Loja ABC e produtos" },
  { label: "Etapa 3 de 3", title: "CRF e diversão" },
];

function getFieldErrorId(fieldId) {
  return `error${fieldId.charAt(0).toUpperCase()}${fieldId.slice(1)}`;
}

function setFocusToStep(stepIndex) {
  const heading = formSteps[stepIndex]?.querySelector("h3");
  if (heading) {
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
  }
}

function updateProgress(stepIndex) {
  const percent = ((stepIndex + 1) / formSteps.length) * 100;

  if (stepLabel) stepLabel.textContent = stepMeta[stepIndex].label;
  if (stepTitle) stepTitle.textContent = stepMeta[stepIndex].title;
  if (progressFill) progressFill.style.width = `${percent}%`;

  if (progressBar) {
    progressBar.setAttribute("aria-valuenow", String(stepIndex + 1));
    progressBar.setAttribute(
      "aria-valuetext",
      `${stepMeta[stepIndex].label} - ${stepMeta[stepIndex].title}`,
    );
  }

  progressSteps.forEach((item, index) => {
    item.classList.toggle("is-active", index === stepIndex);
  });
}

function clearStepErrors(stepEl) {
  stepEl.querySelectorAll(".error").forEach((errorEl) => {
    errorEl.textContent = "";
  });

  stepEl.querySelectorAll("input, select, textarea").forEach((field) => {
    field.removeAttribute("aria-invalid");
  });
}

function showStep(stepIndex) {
  formSteps.forEach((step, index) => {
    const isActive = index === stepIndex;
    step.classList.toggle("is-active", isActive);
    step.hidden = !isActive;
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

  updateProgress(stepIndex);
  setFocusToStep(stepIndex);
}

function validateStep(stepIndex) {
  const step = formSteps[stepIndex];
  if (!step) return false;

  clearStepErrors(step);

  let isValid = true;
  const fields = step.querySelectorAll("input, select, textarea");

  fields.forEach((field) => {
    const value =
      field.type === "checkbox" ? field.checked : field.value.trim();
    const errorEl = document.getElementById(getFieldErrorId(field.id));

    if (!value) {
      isValid = false;
      field.setAttribute("aria-invalid", "true");
      if (errorEl) errorEl.textContent = "Campo obrigatório.";
    }
  });

  return isValid;
}

function getSummaryValue(id, fallback = "-") {
  const el = document.getElementById(id);
  if (!el) return fallback;

  if (el.tagName === "SELECT") {
    const option = el.options[el.selectedIndex];
    return option && option.value ? option.textContent : fallback;
  }

  if (el.type === "checkbox") {
    return el.checked ? "Sim" : fallback;
  }

  return el.value.trim() || fallback;
}

function showSuccessCard() {
  if (!signupResponse) return;

  const nome = document.getElementById("nome")?.value.trim() || "-";
  const sobrenome = document.getElementById("sobrenome")?.value.trim() || "-";
  const loja = getSummaryValue("loja");
  const time = getSummaryValue("time");

  const summaryCliente = document.getElementById("summaryCliente");
  const summaryLoja = document.getElementById("summaryLoja");
  const summaryTime = document.getElementById("summaryTime");

  if (summaryCliente)
    summaryCliente.textContent = `${nome} ${sobrenome}`.trim();
  if (summaryLoja) summaryLoja.textContent = loja;
  if (summaryTime) summaryTime.textContent = time;

  signupResponse.hidden = false;
  signupResponse.scrollIntoView({ behavior: "smooth", block: "center" });
}

function hideSuccessCard() {
  if (signupResponse) signupResponse.hidden = true;
}

function resetWizard() {
  if (!landingForm) return;

  landingForm.reset();
  currentStep = 0;
  hideSuccessCard();
  showStep(currentStep);

  landingForm.querySelectorAll("input, select, textarea").forEach((field) => {
    field.removeAttribute("aria-invalid");
  });

  clearStepErrors(formSteps[0]);
}

if (landingForm && formSteps.length) {
  formSteps.forEach((step, index) => {
    step.hidden = index !== 0;
  });

  showStep(currentStep);
}

if (nextStepBtn) {
  nextStepBtn.addEventListener("click", () => {
    if (!validateStep(currentStep)) return;

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
      hideSuccessCard();
      showStep(currentStep);
    }
  });
}

if (landingForm) {
  landingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateStep(currentStep)) return;

    showSuccessCard();
    landingForm.reset();
  });
}

if (resetFormBtn) {
  resetFormBtn.addEventListener("click", () => {
    resetWizard();
    document.getElementById("nome")?.focus();
  });
}

landingForm?.querySelectorAll("input, select, textarea").forEach((field) => {
  field.addEventListener("input", () => {
    const errorEl = document.getElementById(getFieldErrorId(field.id));
    if (errorEl) errorEl.textContent = "";
    field.removeAttribute("aria-invalid");
  });

  field.addEventListener("change", () => {
    const errorEl = document.getElementById(getFieldErrorId(field.id));
    if (errorEl) errorEl.textContent = "";
    field.removeAttribute("aria-invalid");
  });
});
