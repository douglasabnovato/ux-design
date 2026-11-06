/*
 * interacoes.js · Sonora Pulse 3 (Headphones).
 * Loja demonstrativa: botões de sacola adicionam o modelo com a cor escolhida,
 * "Saiba mais" abre a ficha do estojo, "Comprar agora" leva às cores com a
 * oferta ativa e a newsletter valida o e-mail. Marca e preços são fictícios.
 */
document.documentElement.style.setProperty("--lt-cor", "#1a1a1a");

const sacola = LT.criarSacola({ nomeLoja: "Sonora Áudio" });

/* Converte "R$ 1.249" em número. */
function preco(texto) {
  return Number(texto.replace(/[^\d,]/g, "").replace(",", ".")) || 0;
}

/* Liga o botão do destaque e os botões de cada cor à sacola. */
function ligarSacola() {
  const destaque = document.querySelector(".home .button");
  if (destaque) {
    destaque.addEventListener("click", (e) => {
      e.preventDefault();
      sacola.adicionar({ id: "pulse3", nome: "Sonora Pulse 3", preco: 1499 });
    });
  }
  document.querySelectorAll(".products__card").forEach((card, i) => {
    const nome = card.querySelector(".products__title").textContent.trim();
    const valor = preco(card.querySelector(".products__price").textContent);
    const botao = card.querySelector(".products__button");
    botao.setAttribute("aria-label", `Adicionar headphone ${nome} à sacola`);
    botao.addEventListener("click", () => sacola.adicionar({ id: `cor-${i}`, nome: `Sonora Pulse 3 · ${nome}`, preco: valor }));
  });
}

/* "Saiba mais" abre a ficha do estojo; "Comprar agora" leva às cores com a oferta. */
function ligarChamadas() {
  const saibaMais = document.querySelector(".case .button");
  if (saibaMais) {
    saibaMais.addEventListener("click", (e) => {
      e.preventDefault();
      LT.modal({
        titulo: "Estojo de viagem",
        conteudo: "<ul><li>Casco rígido resistente a impactos</li><li>Encaixe dobrável que ocupa metade do espaço</li><li>Bolso interno para o cabo e o carregador</li><li>Garantia de 12 meses junto com o fone</li></ul>",
      });
    });
  }
  const comprar = document.querySelector(".discount .button");
  if (comprar) {
    comprar.addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById("products").scrollIntoView({ behavior: "smooth" });
      LT.aviso("Oferta aplicada: escolha a cor e adicione à sacola.", "info");
    });
  }
  const destinos = { "Headphones": "#products", "Fones intra-auriculares": "#products", "Fones sem fio": "#products", "Acessórios": "#case", "Ajuda com o produto": "#specs", "Cadastrar produto": "#footer", "Atualizações": "#footer", "Garantia": "#case" };
  document.querySelectorAll(".footer__link").forEach((a) => {
    const alvo = destinos[a.textContent.trim()];
    if (alvo) a.setAttribute("href", alvo);
  });
}

/* Newsletter com validação e confirmação. */
function ligarNewsletter() {
  LT.ligarFormulario(document.querySelector(".footer__form"), {
    titulo: "Inscrição confirmada!",
    texto: "Você vai receber lançamentos e cupons da Sonora no seu e-mail.",
    mostrarResumo: false,
    aviso: "E-mail cadastrado.",
  });
}

ligarSacola();
ligarChamadas();
ligarNewsletter();
/* Fim do interacoes.js. */
