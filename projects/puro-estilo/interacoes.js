/*
 * interacoes.js · Puro Estilo.
 * Favoritos com contador, quantidades, remoção, total e estado vazio;
 * PDF só com a lista preenchida; sacola nas peças; tamanho obrigatório
 * nos detalhes; paginação real das vitrines; cupons, campanhas e newsletter.
 */
document.documentElement.style.setProperty("--lt-cor", "#e91e63");

const sacola = LT.criarSacola({ nomeLoja: "Puro Estilo" });
const favoritos = new Map();

/* Converte "R$ 129,90" ou "R$229,90" em número. */
function valor(texto) {
  return Number(String(texto).replace(/[^\d,]/g, "").replace(",", ".")) || 0;
}

/* Redesenha a lista de favoritos, totais e contador do ícone. */
function desenharFavoritos() {
  const lista = document.getElementById("fav-lista");
  const qtd = [...favoritos.values()].reduce((s, f) => s + f.qtd, 0);
  document.querySelector(".fav-contador").textContent = qtd;
  document.getElementById("myBtnIcon").setAttribute("aria-label", `Abrir lista de favoritos (${qtd} ${qtd === 1 ? "peça" : "peças"})`);
  const subtotal = [...favoritos.values()].reduce((s, f) => s + f.preco * f.qtd, 0);
  const frete = subtotal === 0 || subtotal >= 299 ? 0 : 19.9;
  document.getElementById("fav-subtotal").textContent = LT.moeda(subtotal);
  document.getElementById("fav-frete").textContent = frete ? LT.moeda(frete) : subtotal ? "Grátis" : LT.moeda(0);
  document.getElementById("fav-total").textContent = LT.moeda(subtotal + frete);
  if (!favoritos.size) {
    LT.vazio(lista, { titulo: "Sua lista está vazia", texto: "Toque no coração de um look para guardá-lo aqui." });
    return;
  }
  lista.innerHTML = "";
  favoritos.forEach((f, id) => {
    const item = document.createElement("div");
    item.className = "fav-item";
    item.innerHTML = `<img src="${f.img}" alt="" /><div class="fav-item__info"><p><strong></strong></p><small>${LT.moeda(f.preco)}</small></div>
      <label>Qtd. <input type="number" min="1" max="10" value="${f.qtd}" /></label><span>${LT.moeda(f.preco * f.qtd)}</span>
      <button type="button" class="lt-botao">Remover</button>`;
    item.querySelector("strong").textContent = f.nome;
    const campo = item.querySelector("input");
    campo.setAttribute("aria-label", `Quantidade de ${f.nome}`);
    campo.addEventListener("change", () => {
      const n = Math.round(Number(campo.value));
      if (!n || n < 1 || n > 10) {
        LT.marcarErro(campo, "Use de 1 a 10 unidades.");
        return;
      }
      LT.marcarErro(campo, "");
      f.qtd = n;
      desenharFavoritos();
    });
    item.querySelector("button").addEventListener("click", () => alternarFavorito(id));
    lista.appendChild(item);
  });
}

/* Liga ou desliga um look da lista de favoritos. */
function alternarFavorito(id, dados) {
  const coracao = document.querySelector(`.heart-icon[data-id="${id}"]`);
  if (favoritos.has(id)) {
    const nome = favoritos.get(id).nome;
    favoritos.delete(id);
    LT.aviso(`${nome} saiu dos favoritos.`, "info");
  } else {
    favoritos.set(id, { ...dados, qtd: 1 });
    LT.aviso(`${dados.nome} adicionado aos favoritos.`);
  }
  document.querySelectorAll(`.heart-icon[data-id="${id}"]`).forEach((c) => {
    const ativo = favoritos.has(id);
    c.classList.toggle("ativo", ativo);
    c.setAttribute("aria-pressed", String(ativo));
    c.querySelector("i").className = ativo ? "bx bxs-heart" : "bx bx-heart";
  });
  if (coracao) desenharFavoritos();
  else desenharFavoritos();
}

/* Transforma os corações dos looks em botões de favoritar. */
function ligarCoracoes() {
  document.querySelectorAll(".products .row").forEach((card) => {
    const coracao = card.querySelector(".heart-icon");
    if (!coracao) return;
    const nome = card.querySelector(".price h4").textContent.trim();
    const img = card.querySelector("img");
    img.alt = nome;
    const id = img.getAttribute("src");
    const dados = { nome, preco: valor(card.querySelector(".price p").textContent), img: id };
    coracao.dataset.id = id;
    coracao.setAttribute("role", "button");
    coracao.tabIndex = 0;
    coracao.setAttribute("aria-pressed", "false");
    coracao.setAttribute("aria-label", `Favoritar ${nome}`);
    const agir = (e) => {
      e.stopPropagation();
      alternarFavorito(id, dados);
    };
    coracao.addEventListener("click", agir);
    coracao.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        agir(e);
      }
    });
  });
}

/* Botões de carrinho das peças e acessórios adicionam à sacola. */
function ligarSacola() {
  document.querySelectorAll(".pro").forEach((card, i) => {
    const nome = card.querySelector(".des h5").textContent.trim();
    const marca = card.querySelector(".des span").textContent.trim();
    const botao = card.querySelector(".cart-shopping");
    card.querySelector("img").alt = `${nome}, ${marca}`;
    botao.setAttribute("aria-label", `Adicionar ${nome} à sacola`);
    botao.removeAttribute("title");
    botao.addEventListener("click", (e) => {
      e.preventDefault();
      sacola.adicionar({ id: `pro-${i}`, nome: `${nome} · ${marca}`, preco: valor(card.querySelector(".des h4").textContent) });
    });
  });
}

/* Detalhes do look: tamanho e quantidade validados antes de ir à sacola. */
function ligarDetalhes() {
  const tamanho = document.getElementById("det-tamanho");
  const qtd = document.getElementById("det-qtd");
  document.getElementById("det-adicionar").addEventListener("click", (e) => {
    e.preventDefault();
    let ok = true;
    if (!tamanho.value) {
      LT.marcarErro(tamanho, "Escolha um tamanho.");
      ok = false;
    } else LT.marcarErro(tamanho, "");
    const n = Math.round(Number(qtd.value));
    if (!n || n < 1 || n > 10) {
      LT.marcarErro(qtd, "Use de 1 a 10 unidades.");
      ok = false;
    } else LT.marcarErro(qtd, "");
    if (!ok) {
      (tamanho.value ? qtd : tamanho).focus();
      return;
    }
    for (let k = 0; k < n; k++) sacola.adicionar({ id: `rubi-${tamanho.value}`, nome: `Camiseta Rubi · ${tamanho.value}`, preco: 129.9 });
  });
  tamanho.addEventListener("change", () => tamanho.value && LT.marcarErro(tamanho, ""));
}

/* Paginação real: divide cada vitrine em páginas pelos números existentes. */
function ligarPaginacao() {
  document.querySelectorAll("section#pagination").forEach((pag) => {
    let secao = pag.previousElementSibling;
    while (secao && !secao.querySelector(".products, .pro-container")) secao = secao.previousElementSibling;
    if (!secao) return;
    const grade = secao.querySelector(".products, .pro-container");
    const itens = [...grade.children];
    const numeros = [...pag.querySelectorAll("a")].filter((a) => /^\d+$/.test(a.textContent.trim()));
    const porPagina = Math.ceil(itens.length / numeros.length);
    const seta = pag.querySelector("a:last-child");
    pag.setAttribute("aria-label", "Páginas da vitrine");
    let atual = 0;
    const ir = (p, rolar) => {
      atual = p;
      itens.forEach((it, i) => (it.style.display = Math.floor(i / porPagina) === p ? "" : "none"));
      numeros.forEach((a, i) => {
        if (i === p) a.setAttribute("aria-current", "page");
        else a.removeAttribute("aria-current");
        a.style.background = i === p ? "#e91e63" : "";
        a.style.color = i === p ? "#fff" : "";
      });
      if (rolar) grade.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    numeros.forEach((a, i) => {
      a.setAttribute("aria-label", `Página ${i + 1}`);
      a.addEventListener("click", (e) => {
        e.preventDefault();
        ir(i, true);
      });
    });
    seta.setAttribute("aria-label", "Próxima página");
    seta.addEventListener("click", (e) => {
      e.preventDefault();
      ir((atual + 1) % numeros.length, true);
    });
    ir(0, false);
  });
}

/* Cupons, campanhas e botões de banner com respostas visíveis. */
function ligarChamadas() {
  document.querySelector("#banner-off .normal").addEventListener("click", () => {
    const box = document.createElement("div");
    box.innerHTML = `<p>Use no fechamento do pedido:</p>
      <ul><li><strong>PURO70</strong> · 70% em camisetas e acessórios selecionados</li><li><strong>FRETE299</strong> · frete grátis acima de R$ 299</li></ul>`;
    const copiar = document.createElement("button");
    copiar.type = "button";
    copiar.className = "lt-botao";
    copiar.textContent = "Copiar cupom PURO70";
    copiar.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText("PURO70");
        LT.aviso("Cupom PURO70 copiado.");
      } catch (err) {
        LT.aviso("Não foi possível copiar. Anote o cupom: PURO70.", "erro");
      }
    });
    box.appendChild(copiar);
    LT.modal({ titulo: "Cupons ativos", conteudo: box });
  });
  const [saiba, colecao] = document.querySelectorAll("#sm-banner button");
  saiba.addEventListener("click", () => LT.modal({ titulo: "Compre 1, leve 2", conteudo: "<p>Na compra de qualquer camiseta, a segunda sai de graça (a de menor valor). Válido até o fim do mês ou enquanto durar o estoque.</p>" }));
  colecao.addEventListener("click", () => {
    document.getElementById("looks").scrollIntoView({ behavior: "smooth" });
    LT.aviso("Prévia da coleção Primavera/Verão nos looks em destaque.", "info");
  });
  document.querySelectorAll(".update-cart .cart h6").forEach((h) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "lt-botao";
    b.textContent = h.textContent.trim();
    const card = h.closest(".cart");
    b.addEventListener("click", () =>
      LT.modal({ titulo: card.querySelector("h4").textContent.trim(), conteudo: `<p>${card.querySelector("p").textContent.trim()}</p><p>Dúvidas? Fale com a loja pelo WhatsApp (32) 98836-7667.</p>` })
    );
    h.replaceWith(b);
  });
  document.getElementById("btn-pdf").addEventListener("click", async (e) => {
    if (!favoritos.size) {
      LT.aviso("Adicione pelo menos um look aos favoritos antes de gerar o PDF.", "erro");
      return;
    }
    if (typeof html2pdf === "undefined") {
      LT.aviso("O gerador de PDF não carregou. Verifique a conexão e tente de novo.", "erro");
      return;
    }
    LT.carregando(e.currentTarget, true, "Gerando PDF…");
    try {
      await downloadPDF();
      LT.aviso("PDF da sua lista gerado.");
    } catch (err) {
      LT.aviso("Não foi possível gerar o PDF agora.", "erro");
    }
    LT.carregando(e.currentTarget, false);
  });
}

/* Newsletter no rodapé com validação e confirmação. */
function ligarNewsletter() {
  const box = document.querySelector(".contact .five");
  const form = document.createElement("form");
  form.setAttribute("novalidate", "");
  form.innerHTML = `<label for="news-email" class="lt-sr-only">Seu e-mail</label><input id="news-email" name="email" type="email" required placeholder="seu@email.com" style="padding:10px;border:1px solid #ccc;border-radius:6px;width:100%" /><button type="submit" class="lt-botao" style="margin-top:8px">Inscrever</button>`;
  box.appendChild(form);
  LT.ligarFormulario(form, { titulo: "Inscrição feita!", texto: "Você vai receber as ofertas no seu e-mail.", mostrarResumo: false, aviso: "E-mail cadastrado." });
}

ligarCoracoes();
ligarSacola();
ligarDetalhes();
ligarPaginacao();
ligarChamadas();
ligarNewsletter();
desenharFavoritos();
/* fim de interacoes.js */
