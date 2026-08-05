const project3DForm = document.getElementById('project3DForm');
const project3DMessage = document.getElementById('project3DMessage');

function showProject3DMessage(type, text) {
  project3DMessage.className = `form-message visible ${type}`;
  project3DMessage.textContent = text;
}

project3DForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const requiredFields = Array.from(project3DForm.querySelectorAll('[required]'));

  for (const field of requiredFields) {
    if (field.value.trim() === '') {
      showProject3DMessage('error', 'Preencha todos os campos obrigatórios antes de enviar.');
      return;
    }
    if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
      showProject3DMessage('error', 'Informe um e-mail válido.');
      return;
    }
  }

  showProject3DMessage('success', 'Pedido de projeto 3D enviado! Nossa equipe entrará em contato em breve.');
  project3DForm.reset();
});
