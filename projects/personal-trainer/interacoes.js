/*
 * interacoes.js · Personal Trainer WU.
 * Formulário de contato com validação por campo, estado de envio, cartão de
 * confirmação e mensagem pronta no WhatsApp. Também deixa a pilha de
 * campanhas acionável pelo teclado (Enter e Espaço).
 */
document.documentElement.style.setProperty("--lt-cor", "#22c55e");
document.documentElement.style.setProperty("--lt-texto-sobre-cor", "#06210f");

/* Liga o formulário de contato ao fluxo de envio simulado. */
function ligarContato() {
  LT.ligarFormulario(document.getElementById("contactForm"), {
    whatsapp: "Olá! Vim pelo site do Personal Trainer WU e quero começar:",
    titulo: "Mensagem enviada!",
    aviso: "Recebemos seu contato. Resposta em até 1 dia útil.",
  });
}

/* Permite trocar a campanha em destaque com Enter ou Espaço. */
function ligarPilhaTeclado() {
  document.querySelectorAll(".stack-card[role=button]").forEach((card) => {
    card.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      if (typeof window.bringToFront === "function") window.bringToFront(card);
    });
  });
}

ligarContato();
ligarPilhaTeclado();
/* Fim do interacoes.js. */
