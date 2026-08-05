const bookingForm = document.getElementById('bookingForm');
const formSteps = Array.from(document.querySelectorAll('.form-step'));
const stepItems = Array.from(document.querySelectorAll('.step-item'));
const btnNext = document.querySelector('.btn-next');
const btnPrev = document.querySelector('.btn-prev');
const btnSubmit = document.querySelector('.btn-submit');
const formMessage = document.getElementById('formMessage');
const stepTitle = document.querySelector('.step-title');
const stepCopy = document.querySelector('.step-copy');

let currentStep = 1;
const totalSteps = formSteps.length;

const stepMeta = {
  1: {
    title: 'Qualificação rápida',
    copy: 'Responda com seu perfil e desafios para ganhar uma sessão personalizada.',
  },
  2: {
    title: 'Contato e horário',
    copy: 'Confirme seus dados e escolha o melhor turno para a conversa.',
  },
};

function showStep(step) {
  formSteps.forEach((stepElement) => {
    stepElement.classList.toggle('active', Number(stepElement.dataset.step) === step);
  });

  stepItems.forEach((item) => {
    item.classList.toggle('active', Number(item.dataset.step) === step);
  });

  btnPrev.style.display = step === 1 ? 'none' : 'inline-flex';
  btnNext.style.display = step === totalSteps ? 'none' : 'inline-flex';
  btnSubmit.style.display = step === totalSteps ? 'inline-flex' : 'none';

  stepTitle.textContent = stepMeta[step].title;
  stepCopy.textContent = stepMeta[step].copy;
  formMessage.className = 'form-message';
  formMessage.textContent = '';
}

function validateStep(step) {
  const stepElement = formSteps.find((stepEl) => Number(stepEl.dataset.step) === step);
  const requiredFields = Array.from(stepElement.querySelectorAll('[data-required]'));
  let valid = true;
  let error = '';

  requiredFields.forEach((field) => {
    if (field.type === 'radio') {
      const radioGroup = bookingForm.querySelectorAll(`input[name="${field.name}"]`);
      const isChecked = Array.from(radioGroup).some((input) => input.checked);
      if (!isChecked) {
        valid = false;
      }
    } else if (field.value.trim() === '') {
      valid = false;
    }
  });

  if (!valid) {
    error = 'Por favor, complete todos os campos obrigatórios para continuar.';
  }

  if (valid && step === 2) {
    const email = bookingForm.querySelector('input[name="email"]').value.trim();
    const whatsapp = bookingForm.querySelector('input[name="whatsapp"]').value.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      valid = false;
      error = 'Informe um e-mail válido.';
    }

    if (!/^[0-9\s()\-+]{10,}$/.test(whatsapp)) {
      valid = false;
      error = 'Informe um WhatsApp válido.';
    }
  }

  if (!valid) {
    formMessage.className = 'form-message visible error';
    formMessage.textContent = error;
  }

  return valid;
}

btnNext.addEventListener('click', () => {
  if (validateStep(currentStep)) {
    currentStep = Math.min(currentStep + 1, totalSteps);
    showStep(currentStep);
  }
});

btnPrev.addEventListener('click', () => {
  currentStep = Math.max(currentStep - 1, 1);
  showStep(currentStep);
});

bookingForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!validateStep(currentStep)) {
    return;
  }

  formMessage.className = 'form-message visible success';
  formMessage.textContent = 'Pronto! Sua solicitação foi registrada. Entraremos em contato pelo WhatsApp em breve.';
  bookingForm.reset();
  currentStep = 1;
  showStep(currentStep);
});

showStep(currentStep);
