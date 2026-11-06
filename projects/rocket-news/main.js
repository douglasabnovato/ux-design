/*
 * main.js · Rocket News.
 * Inscrição na newsletter com validação de e-mail e frequência, estado de
 * envio, confirmação na tela e aviso quando o e-mail já foi inscrito nesta visita.
 */
document.documentElement.style.setProperty("--lt-cor", "#8257e5");

const inscritos = new Set();
const form = document.getElementById("form-news");

/* Barra e-mails repetidos antes do fluxo padrão de envio. */
form.addEventListener(
  "submit",
  (e) => {
    const email = form.email.value.trim().toLowerCase();
    if (email && inscritos.has(email)) {
      e.preventDefault();
      e.stopImmediatePropagation();
      LT.marcarErro(form.email, "Este e-mail já está inscrito. Use outro endereço.");
      form.email.focus();
    }
  },
  true
);

LT.ligarFormulario(form, {
  titulo: "Inscrição confirmada!",
  texto: "Você vai receber a Rocket News no seu e-mail. Confira a caixa de spam se não chegar em alguns minutos.",
  aviso: "Obrigado por assinar a newsletter!",
  textoCarregando: "Inscrevendo…",
  aoEnviar: (f) => inscritos.add(f.email.value.trim().toLowerCase()),
});
/* fim de main.js */
