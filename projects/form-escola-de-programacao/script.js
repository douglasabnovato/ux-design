const leadForm = document.querySelector('[data-lead-form]');

function setupLeadForm(form) {
  const alertBox = form.querySelector('#formAlert');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const experience = form.elements.experience.value;
    const reason = form.elements.reason.value.trim();
    const interest = form.querySelector('input[name="interest"]:checked');

    let errorMessage = '';

    if (!name) {
      errorMessage = 'Por favor, informe seu nome completo.';
    } else if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errorMessage = 'Por favor, informe um e-mail válido.';
    } else if (!experience) {
      errorMessage = 'Selecione seu nível de experiência em programação.';
    } else if (!reason || reason.length < 20) {
      errorMessage = 'Descreva melhor o motivo para estudar programação (mínimo 20 caracteres).';
    } else if (!interest) {
      errorMessage = 'Escolha em qual área você gostaria de trabalhar.';
    }

    if (errorMessage) {
      alertBox.textContent = errorMessage;
      alertBox.className = 'form-alert error';
      return;
    }

    alertBox.textContent = 'Inscrição realizada com sucesso! Em breve enviaremos detalhes para seu e-mail.';
    alertBox.className = 'form-alert success';
    form.reset();
  });
}

if (leadForm) {
  setupLeadForm(leadForm);
}
