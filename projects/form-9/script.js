const leadForm = document.getElementById('leadForm');
const leadMessage = document.getElementById('leadMessage');

function showLeadMessage(type, text) {
  leadMessage.className = `form-message visible ${type}`;
  leadMessage.textContent = text;
}

leadForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const requiredFields = Array.from(leadForm.querySelectorAll('[required]'));

  for (const field of requiredFields) {
    if (field.value.trim() === '') {
      showLeadMessage('error', 'Preencha todos os campos obrigatórios antes de enviar.');
      return;
    }
    if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
      showLeadMessage('error', 'Informe um e-mail válido.');
      return;
    }
    if (field.name === 'cpf' && !/^[0-9]{11}$/.test(field.value)) {
      showLeadMessage('error', 'Digite um CPF válido com 11 dígitos numéricos.');
      return;
    }
  }

  showLeadMessage('success', 'Solicitação enviada com sucesso! Em breve receberá contato.');
  leadForm.reset();
});
