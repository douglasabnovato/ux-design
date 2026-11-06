/*
 * interacoes.js · Café da Jéssica (Our Coffee).
 * Reserva de mesa com validação de data e horário de funcionamento (6h às 17h),
 * confirmação na tela e mensagem pronta no WhatsApp; abas do cardápio
 * anunciam qual lista está ativa.
 */
document.documentElement.style.setProperty("--lt-cor", "#000");

/* Data local no formato aceito por datetime-local. */
function agoraLocal(minutosAMais = 0) {
  const d = new Date(Date.now() + minutosAMais * 60000);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
}

/* Confere se a reserva é no futuro e dentro do horário de funcionamento. */
function erroDaData(valor) {
  if (!valor) return "";
  const d = new Date(valor);
  if (d < new Date()) return "Escolha uma data e hora a partir de agora.";
  const minutos = d.getHours() * 60 + d.getMinutes();
  if (minutos < 6 * 60 || minutos > 16 * 60 + 30) return "Atendemos das 6h às 17h. Reserve até as 16h30.";
  return "";
}

/* Liga o formulário de reserva ao fluxo de validação e confirmação. */
function ligarReserva() {
  const form = document.getElementById("form-reserva");
  if (!form) return;
  const data = form.querySelector('[name="date"]');
  data.min = agoraLocal(30);
  form.addEventListener(
    "submit",
    (e) => {
      const erro = erroDaData(data.value);
      if (erro) {
        e.preventDefault();
        e.stopImmediatePropagation();
        LT.validar(form);
        LT.marcarErro(data, erro);
        data.focus();
      }
    },
    true
  );
  LT.ligarFormulario(form, {
    whatsapp: "Olá! Quero reservar uma mesa no Café da Jéssica:",
    titulo: "Mesa pré-reservada!",
    aviso: "Pedido de reserva enviado. Confirmamos pelo WhatsApp.",
  });
}

/* Marca a aba ativa do cardápio para leitores de tela. */
function ligarAbas() {
  const abas = document.querySelectorAll('#menu a[onclick*="openMenu"]');
  const marcar = (ativa) => abas.forEach((a) => a.setAttribute("aria-pressed", String(a === ativa)));
  abas.forEach((a) => {
    a.setAttribute("role", "button");
    a.addEventListener("click", () => marcar(a));
  });
  if (abas[0]) marcar(abas[0]);
}

ligarReserva();
ligarAbas();
/* fim de interacoes.js */
