const visitForm = document.getElementById('visitForm');
const formMessage = document.getElementById('formMessage');

function showMessage(type, text) {
  formMessage.className = `form-message visible ${type}`;
  formMessage.textContent = text;
}

function validateVisitForm() {
  const requiredFields = Array.from(visitForm.querySelectorAll('[required]'));
  for (const field of requiredFields) {
    if (field.type === 'checkbox') {
      if (!field.checked) {
        showMessage('error', 'Marque a autorização para receber informações e continue.');
        return false;
      }
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

  return true;
}

visitForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!validateVisitForm()) {
    return;
  }

  showMessage('success', 'Solicitação enviada com sucesso! Em breve nossa equipe confirma sua visita.');
  visitForm.reset();
});
