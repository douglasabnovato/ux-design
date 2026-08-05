const quoteForm = document.getElementById('quoteForm');
const quoteMessage = document.getElementById('quoteMessage');

function showQuoteMessage(type, text) {
  quoteMessage.className = `form-message visible ${type}`;
  quoteMessage.textContent = text;
}

quoteForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const fields = Array.from(quoteForm.querySelectorAll('[required]'));
  for (const field of fields) {
    if (field.value.trim() === '') {
      showQuoteMessage('error', 'Preencha todos os campos obrigatórios para continuar.');
      return;
    }

    if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
      showQuoteMessage('error', 'Informe um e-mail válido.');
      return;
    }
  }

  showQuoteMessage('success', 'Pedido enviado! Vamos entrar em contato em breve.');
  quoteForm.reset();
});
