const catalogForm = document.getElementById('catalogForm');
const pages = Array.from(document.querySelectorAll('.catalog-page'));
const steps = Array.from(document.querySelectorAll('.step'));
const prevBtn = document.getElementById('catalogPrev');
const nextBtn = document.getElementById('catalogNext');
const message = document.getElementById('catalogMessage');
let currentStep = 0;

function showMessage(type, text) {
  message.className = `catalog-message visible ${type}`;
  message.textContent = text;
}

function updatePage() {
  pages.forEach((page, index) => page.classList.toggle('active', index === currentStep));
  steps.forEach((step, index) => step.classList.toggle('active', index === currentStep));
  prevBtn.disabled = currentStep === 0;
  nextBtn.textContent = currentStep === pages.length - 1 ? 'Enviar' : 'Próximo';
  message.className = 'catalog-message';
}

function validateStep(stepIndex) {
  const fields = Array.from(pages[stepIndex].querySelectorAll('[required]'));
  for (const field of fields) {
    if (field.type === 'checkbox') {
      if (!field.checked) {
        showMessage('error', 'Você precisa concordar para receber o catálogo.');
        return false;
      }
      continue;
    }
    if (field.value.trim() === '') {
      showMessage('error', 'Preencha todos os campos obrigatórios.');
      return false;
    }
    if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
      showMessage('error', 'Digite um e-mail válido.');
      return false;
    }
  }
  return true;
}

nextBtn.addEventListener('click', () => {
  if (!validateStep(currentStep)) return;

  if (currentStep < pages.length - 1) {
    currentStep += 1;
    updatePage();
    return;
  }

  showMessage('success', 'Catálogo solicitado! Verifique seu e-mail nos próximos minutos.');
  catalogForm.reset();
  currentStep = 0;
  updatePage();
});

prevBtn.addEventListener('click', () => {
  if (currentStep > 0) {
    currentStep -= 1;
    updatePage();
  }
});

catalogForm.addEventListener('submit', (event) => {
  event.preventDefault();
});

updatePage();
