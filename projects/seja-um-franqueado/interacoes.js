/*
 * interacoes.js · Seja um Franqueado.
 * Liga o formulário de interesse e o cadastro de novidades ao fluxo de
 * demonstração compartilhado (../../shared/lt-feedback.js): valida os campos,
 * mostra "enviando", confirma na tela e, no interesse, abre o WhatsApp.
 */
document.documentElement.style.setProperty("--lt-cor", "#e3062d");

/* Conecta os dois formulários da página ao fluxo de envio simulado. */
function iniciarInteracoes() {
  LT.ligarFormulario(document.querySelector(".lp-formulario__form"), {
    whatsapp: "Olá! Tenho interesse em ser franqueado ABC da Construção. Meus dados:",
    titulo: "Recebemos o seu interesse!",
    aviso: "Interesse enviado. Nosso time de expansão vai falar com você.",
  });
  LT.ligarFormulario(document.querySelector(".lp-footer__form"), {
    titulo: "Cadastro confirmado!",
    texto: "Você vai receber novidades e promoções no e-mail informado.",
    mostrarResumo: false,
    aviso: "E-mail cadastrado com sucesso.",
  });
}

iniciarInteracoes();
/* Fim do interacoes.js. */
