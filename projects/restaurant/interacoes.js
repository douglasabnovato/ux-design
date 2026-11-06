/*
 * interacoes.js · Sabor da Semana (Restaurante Gourmet).
 * Cardápio com sacola (os botões de carrinho de cada prato), reserva de mesa
 * em etapas com confirmação pelo WhatsApp e aviso para os botões do app,
 * que ainda está em lançamento. Restaurante e endereço são fictícios.
 */
document.documentElement.style.setProperty("--lt-cor", "#069c54");

const sacola = LT.criarSacola({ nomeLoja: "Sabor da Semana" });

/* Converte "R$ 42,00" em número. */
function preco(texto) {
  return Number(texto.replace(/[^\d,]/g, "").replace(",", ".")) || 0;
}

/* Liga o botão de carrinho de cada prato à sacola. */
function ligarCardapio() {
  document.querySelectorAll(".menu__button").forEach((botao, i) => {
    const card = botao.closest(".menu__content") || botao.parentElement;
    const nome = card.querySelector(".menu__name").textContent.trim();
    const valor = preco(card.querySelector(".menu__preci").textContent);
    botao.setAttribute("aria-label", `Adicionar ${nome} à sacola`);
    botao.addEventListener("click", (e) => {
      e.preventDefault();
      sacola.adicionar({ id: `prato-${i}`, nome, preco: valor });
    });
  });
}

/* Botões de reserva abrem o agendamento de mesa. */
function ligarReserva() {
  document.querySelectorAll("[data-reservar]").forEach((botao) => {
    botao.addEventListener("click", (e) => {
      e.preventDefault();
      LT.agendar({ titulo: "Reservar mesa", servicos: ["Almoço", "Jantar", "Aniversário ou evento"], nomeLocal: "Sabor da Semana", rotuloServico: "Ocasião" });
    });
  });
}

/* Os selos das lojas avisam que o app está em lançamento. */
function ligarApp() {
  document.querySelectorAll("[data-app]").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      LT.aviso("O app está em lançamento. Enquanto isso, peça pelo cardápio desta página.", "info");
    });
  });
}

ligarCardapio();
ligarReserva();
ligarApp();
/* Fim do interacoes.js. */
