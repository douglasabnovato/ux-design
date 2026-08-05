const visitForm = document.getElementById('visitForm');
const formMessage = document.getElementById('formMessage');

function showMessage(type, text) {
  formMessage.className = `form-message visible ${type}`;
  formMessage.textContent = text;
}

function validateForm() {
  const requiredFields = Array.from(visitForm.querySelectorAll('[required]'));
  for (const field of requiredFields) {
    if (field.type === 'checkbox' && field.name === 'subscribe') {
      if (!field.checked) {
        showMessage('error', 'Aceite a autorização para receber informações e continue.');
        return false;
      }
      continue;
    }

    if (field.type === 'checkbox') {
      continue;
    }

    if (field.value.trim() === '') {
      showMessage('error', 'Preencha todos os campos obrigatórios antes de enviar.');
      return false;
    }

    if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
      showMessage('error', 'Informe um e-mail válido.');
      return false;
    }
  }

  const checkboxes = visitForm.querySelectorAll('input[name="ambientes"]:checked');
  if (checkboxes.length === 0) {
    showMessage('error', 'Selecione pelo menos um ambiente para a visita.');
    return false;
  }

  return true;
}

visitForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  showMessage('success', 'Solicitação enviada com sucesso! Em breve entraremos em contato para confirmar a visita.');
  visitForm.reset();
});
