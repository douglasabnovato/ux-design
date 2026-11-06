// INICIO: SEÇÃO CONTATO - JAVASCRIPT
export async function handleContact(event) {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      document.getElementById("successModal").style.display = "grid";
      form.reset();
    } else {
      alert("Ocorreu um erro ao enviar. Tente novamente via WhatsApp.");
    }
  } catch (error) {
    alert("Erro de conexão. Tente novamente mais tarde.");
  }
}

export function closeModal() {
  document.getElementById("successModal").style.display = "none";
}
// FIM: SEÇÃO CONTATO - JAVASCRIPT