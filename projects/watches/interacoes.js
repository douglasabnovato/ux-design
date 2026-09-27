/*
 * interacoes.js · Horae Relógios (Watches).
 * Transforma a sacola lateral do template em uma sacola que funciona:
 * adicionar pelos botões de cada modelo, alterar quantidade, remover,
 * total ao vivo, estado vazio e pedido pelo WhatsApp. Também deixa ícones
 * acionáveis pelo teclado e valida a newsletter. Marca e modelos são fictícios.
 */
document.documentElement.style.setProperty("--lt-cor", "#1f1f1f");

const itens = new Map();
const caixa = document.querySelector(".cart__container");
const rotuloQtd = document.querySelector(".cart__prices-item");
const rotuloTotal = document.querySelector(".cart__prices-total");
const finalizar = document.querySelector(".cart__finalizar");
const sacolaIcone = document.getElementById("cart-shop");
const selo = document.createElement("span");

/* Converte "R$ 1.050" em número. */
function valor(texto) {
  return Number(String(texto).replace(/[^\d]/g, "")) || 0;
}

/* Redesenha a sacola a partir do estado atual. */
function desenhar() {
  caixa.innerHTML = "";
  if (!itens.size) {
    LT.vazio(caixa, { titulo: "Sua sacola está vazia", texto: "Escolha um relógio e toque em Adicionar à sacola." });
  }
  itens.forEach((item, id) => {
    const art = document.createElement("article");
    art.className = "cart__card";
    art.innerHTML = `<div class="cart__box"><img src="${item.img}" alt="" class="cart__img" /></div>
      <div class="cart__details"><h3 class="cart__title"></h3><span class="cart__price"></span>
        <div class="cart__amount"><div class="cart__amount-content">
          <button type="button" class="cart__amount-box" data-acao="menos"><i class="bx bx-minus"></i></button>
          <span class="cart__amount-number">${item.qtd}</span>
          <button type="button" class="cart__amount-box" data-acao="mais"><i class="bx bx-plus"></i></button>
        </div><button type="button" class="cart__amount-trash" data-acao="remover"><i class="bx bx-trash-alt"></i></button></div></div>`;
    art.querySelector(".cart__title").textContent = item.nome;
    art.querySelector(".cart__price").textContent = LT.moeda(item.preco * item.qtd);
    art.querySelector('[data-acao="menos"]').setAttribute("aria-label", `Diminuir ${item.nome}`);
    art.querySelector('[data-acao="mais"]').setAttribute("aria-label", `Aumentar ${item.nome}`);
    art.querySelector('[data-acao="remover"]').setAttribute("aria-label", `Remover ${item.nome}`);
    art.addEventListener("click", (e) => {
      const b = e.target.closest("[data-acao]");
      if (!b) return;
      if (b.dataset.acao === "mais") item.qtd += 1;
      if (b.dataset.acao === "menos") item.qtd -= 1;
      if (b.dataset.acao === "remover" || item.qtd <= 0) {
        itens.delete(id);
        LT.aviso(`${item.nome} removido da sacola.`, "info");
      }
      desenhar();
    });
    caixa.appendChild(art);
  });
  const qtd = [...itens.values()].reduce((s, i) => s + i.qtd, 0);
  const total = [...itens.values()].reduce((s, i) => s + i.qtd * i.preco, 0);
  rotuloQtd.textContent = `${qtd} ${qtd === 1 ? "item" : "itens"}`;
  rotuloTotal.textContent = LT.moeda(total);
  finalizar.disabled = !qtd;
  selo.textContent = qtd;
  selo.hidden = !qtd;
  sacolaIcone.setAttribute("aria-label", `Abrir sacola, ${qtd} ${qtd === 1 ? "item" : "itens"}`);
}

/* Adiciona o modelo do card clicado à sacola. */
function adicionar(card) {
  const nome = card.dataset.nome || card.querySelector("[class*=__title]").textContent.replace(/\s+/g, " ").trim();
  const preco = valor(card.querySelector("[class*=__price]").textContent);
  const img = card.querySelector("img") ? card.querySelector("img").getAttribute("src") : "";
  const atual = itens.get(nome);
  if (atual) atual.qtd += 1;
  else itens.set(nome, { nome, preco, img, qtd: 1 });
  desenhar();
  LT.aviso(`${nome} adicionado à sacola.`, "sucesso", 2600);
}

/* Liga todos os botões de compra da página e os ícones do cabeçalho. */
function ligar() {
  selo.className = "nav__shop-qtd";
  sacolaIcone.appendChild(selo);
  document.querySelectorAll(".home__button, .featured__button, .products__button, .new__button").forEach((botao) => {
    const card = botao.closest(".featured__card, .products__card, .new__card, .home__data, .home__container") || botao.parentElement;
    const nome = card.querySelector("[class*=__title]");
    if (botao.classList.contains("products__button") && nome) botao.setAttribute("aria-label", `Adicionar ${nome.textContent.trim()} à sacola`);
    botao.addEventListener("click", () => adicionar(card));
  });
  [["cart-shop", "Abrir sacola"], ["theme-button", "Alternar tema claro e escuro"], ["nav-toggle", "Abrir menu"]].forEach(([id, rotulo]) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.setAttribute("role", "button");
    el.setAttribute("tabindex", "0");
    if (!el.getAttribute("aria-label")) el.setAttribute("aria-label", rotulo);
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        el.click();
      }
    });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") document.getElementById("cart").classList.remove("show-cart");
  });
  finalizar.addEventListener("click", async () => {
    LT.carregando(finalizar, true, "Enviando pedido…");
    await LT.esperar(900);
    LT.carregando(finalizar, false);
    const linhas = [...itens.values()].map((i) => `${i.qtd}x ${i.nome} — ${LT.moeda(i.qtd * i.preco)}`);
    const total = [...itens.values()].reduce((s, i) => s + i.qtd * i.preco, 0);
    const link = LT.whatsapp(`Olá, Horae Relógios! Quero fazer este pedido:\n\n${linhas.join("\n")}\n\nTotal: ${LT.moeda(total)}`);
    itens.clear();
    desenhar();
    document.getElementById("cart").classList.remove("show-cart");
    LT.modal({ titulo: "Pedido enviado!", conteudo: `<p>Abrimos o WhatsApp com o seu pedido. É só confirmar o envio por lá.</p><p><a class="lt-botao lt-botao--principal" target="_blank" rel="noopener" href="${link}">Abrir WhatsApp de novo</a></p>` });
  });
  document.querySelectorAll('a.button[href="#"]').forEach((a) => {
    a.setAttribute("href", "#products");
  });
  LT.ligarFormulario(document.querySelector(".newsletter__subscribe"), {
    titulo: "Inscrição confirmada!",
    texto: "Você vai receber ofertas e lançamentos da Horae no seu e-mail.",
    mostrarResumo: false,
    aviso: "E-mail cadastrado.",
  });
  desenhar();
}

ligar();
/* Fim do interacoes.js. */
