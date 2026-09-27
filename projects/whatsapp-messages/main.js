/*
 * main.js · WhatsApp Messages.
 * Seleção de mensagem pronta, máscara e validação do número com DDD,
 * envio pelo WhatsApp com confirmação na tela e lista de envios da visita.
 * Substitui os antigos prompt()/alert() por mensagens na própria página.
 */
document.documentElement.style.setProperty("--lt-cor", "#25d366");

const form = document.getElementById("form-envio");
const texto = document.getElementById("msg-texto");
const numero = document.getElementById("msg-numero");
const enviados = [];

/* Formata os dígitos como (DD) 9XXXX-XXXX enquanto a pessoa digita. */
function mascarar(v) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d ? `(${d}` : "";
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/* Escolhe uma mensagem pronta e leva o foco ao número. */
document.querySelectorAll(".mensagem").forEach((b) =>
  b.addEventListener("click", () => {
    document.querySelectorAll(".mensagem").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    texto.value = b.querySelector(".mensagem__texto").textContent.trim();
    LT.marcarErro(texto, "");
    LT.aviso("Mensagem escolhida. Agora informe o número.", "info", 2500);
    numero.focus();
  })
);

numero.addEventListener("input", () => (numero.value = mascarar(numero.value)));
LT.limparAoDigitar(form);

/* Valida, abre o WhatsApp e registra o envio. */
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!LT.validar(form)) return;
  const digitos = numero.value.replace(/\D/g, "");
  if (!/^[1-9]{2}9\d{8}$/.test(digitos)) {
    LT.marcarErro(numero, "Informe um celular com DDD e 9 dígitos, como (32) 98836-7667.");
    numero.focus();
    return;
  }
  const link = `https://wa.me/55${digitos}?text=${encodeURIComponent(texto.value.trim())}`;
  window.open(link, "_blank", "noopener");
  enviados.unshift(`${numero.value}: “${texto.value.trim()}”`);
  document.getElementById("recentes").innerHTML = `<strong>Enviadas nesta visita (${enviados.length})</strong><ul>${enviados
    .slice(0, 5)
    .map((m) => `<li>${m.replace(/</g, "&lt;")}</li>`)
    .join("")}</ul>`;
  LT.aviso("Abrimos o WhatsApp com a mensagem pronta. Se não abriu, verifique o bloqueio de pop-ups.");
});
/* fim de main.js */
