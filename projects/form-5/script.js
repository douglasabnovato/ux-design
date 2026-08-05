const wizardForm = document.getElementById('wizardForm');
const wizardMessage = document.getElementById('wizardMessage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const steps = Array.from(document.querySelectorAll('.wizard-page'));
const stepIndicators = Array.from(document.querySelectorAll('.step'));
let currentStep = 0;

function updateWizard() {
  steps.forEach((step, index) => {
    step.classList.toggle('active', index === currentStep);
    stepIndicators[index].classList.toggle('active', index === currentStep);
  });
  prevBtn.disabled = currentStep === 0;
  nextBtn.textContent = currentStep === steps.length - 1 ? 'Enviar' : 'Próximo';
  wizardMessage.className = 'wizard-message';
}

function showWizardMessage(type, text) {
  wizardMessage.className = `wizard-message visible ${type}`;
  wizardMessage.textContent = text;
}

function validateStep(stepIndex) {
  const fields = Array.from(steps[stepIndex].querySelectorAll('[required]'));
  for (const field of fields) {
    if (field.value.trim() === '') {
      showWizardMessage('error', 'Preencha todos os campos obrigatórios antes de continuar.');
      return false;
    }
  }
  return true;
}

nextBtn.addEventListener('click', () => {
  if (!validateStep(currentStep)) return;

  if (currentStep < steps.length - 1) {
    currentStep += 1;
    updateWizard();
    return;
  }

  showWizardMessage('success', 'Solicitação enviada com sucesso! Nossa equipe entrará em contato em breve.');
  wizardForm.reset();
  currentStep = 0;
  updateWizard();
});

prevBtn.addEventListener('click', () => {
  if (currentStep > 0) {
    currentStep -= 1;
    updateWizard();
  }
});

wizardForm.addEventListener('submit', (event) => {
  event.preventDefault();
});

updateWizard();
