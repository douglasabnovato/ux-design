const heroForm = document.getElementById('heroForm');
const heroMessage = document.getElementById('heroMessage');

function showHeroMessage(type, text) {
  heroMessage.className = `form-message visible ${type}`;
  heroMessage.textContent = text;
}

heroForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const fields = Array.from(heroForm.querySelectorAll('[required]'));

  for (const field of fields) {
    if (field.value.trim() === '') {
      showHeroMessage('error', 'Preencha todos os campos obrigatórios antes de enviar.');
      return;
    }
    if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
      showHeroMessage('error', 'Informe um e-mail válido.');
      return;
    }
  }

  showHeroMessage('success', 'Pedido enviado! Entraremos em contato em breve.');
  heroForm.reset();
});
