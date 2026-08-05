const premiumForm = document.getElementById('premiumForm');
const premiumMessage = document.getElementById('premiumMessage');

function showPremiumMessage(type, text) {
  premiumMessage.className = `form-message visible ${type}`;
  premiumMessage.textContent = text;
}

premiumForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const requiredFields = Array.from(premiumForm.querySelectorAll('[required]'));
  for (const field of requiredFields) {
    if (field.value.trim() === '') {
      showPremiumMessage('error', 'Preencha todos os campos obrigatórios antes de enviar.');
      return;
    }

    if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
      showPremiumMessage('error', 'Informe um e-mail válido.');
      return;
    }
  }

  showPremiumMessage('success', 'Pedido enviado! Em breve entraremos em contato para validar sua solicitação.');
  premiumForm.reset();
});
