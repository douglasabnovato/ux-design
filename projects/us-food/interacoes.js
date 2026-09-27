/*
 * interacoes.js · Bom Prato (US Food).
 * Cardápio com sacola (botão de cesta em cada prato), favoritos com estado
 * visível, "Peça aqui" abrindo a sacola e mais avaliações sob demanda.
 * Restaurante, pratos e clientes são fictícios.
 */
document.documentElement.style.setProperty("--lt-cor", "#e9a209");
document.documentElement.style.setProperty("--lt-texto-sobre-cor", "#1d1d1d");

const sacola = LT.criarSacola({ nomeLoja: "Bom Prato" });

/* Liga cestas, favoritos e os botões "Peça aqui". */
function ligarCardapio() {
  document.querySelectorAll("[data-prato]").forEach((botao) => {
    botao.addEventListener("click", () => sacola.adicionar({ id: botao.dataset.prato, nome: botao.dataset.prato, preco: Number(botao.dataset.preco) }));
  });
  document.querySelectorAll(".dish-heart").forEach((coracao) => {
    coracao.addEventListener("click", () => {
      const ativo = coracao.getAttribute("aria-pressed") !== "true";
      coracao.setAttribute("aria-pressed", String(ativo));
      const nome = coracao.getAttribute("aria-label").replace("Favoritar ", "");
      LT.aviso(ativo ? `${nome} salvo nos favoritos.` : `${nome} removido dos favoritos.`, ativo ? "sucesso" : "info", 2400);
    });
  });
  document.querySelectorAll("[data-abrir-sacola]").forEach((b) => b.addEventListener("click", () => {
    if (sacola.quantidade()) sacola.abrir();
    else {
      document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
      LT.aviso("Escolha seus pratos no cardápio e toque na cesta para montar o pedido.", "info");
    }
  }));
}

/* Revela mais avaliações; quando acabam, o botão avisa e se desativa. */
function ligarAvaliacoes() {
  const lista = document.getElementById("feedbacks");
  const botao = document.getElementById("mais-avaliacoes");
  const extras = [
    ["Marina Duarte", "Pedi a salada tropical no almoço do escritório e todo mundo quis o contato."],
    ["Thiago Reis", "Entrega rápida e embalagem que não vaza. Nota dez."],
  ];
  botao.addEventListener("click", () => {
    const modelo = lista.querySelector(".feedback");
    extras.forEach(([nome, texto]) => {
      const novo = modelo.cloneNode(true);
      const [linhaNome, linhaTexto] = novo.querySelectorAll(".feedback-content p");
      linhaNome.firstChild.textContent = `${nome} `;
      linhaTexto.textContent = `"${texto}"`;
      lista.appendChild(novo);
    });
    botao.disabled = true;
    botao.textContent = "Você já viu todas as avaliações";
    LT.aviso("Mais 2 avaliações carregadas.", "info", 2400);
  }, { once: true });
}

ligarCardapio();
ligarAvaliacoes();
/* Fim do interacoes.js. */
