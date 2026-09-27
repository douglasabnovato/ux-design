/*
 * script.js · Rocket NFTs.
 * Carteira simulada (conectar/desconectar com carregamento), compra de NFT
 * que exige carteira e confirma com resumo, galeria ampliável com setas,
 * artistas com perfil, FAQ vinculada aos links e newsletter validada.
 */
document.documentElement.style.setProperty("--lt-cor", "#ff5b50");

const estado = { carteira: null, saldo: 12.5 };

/* Atualiza o botão da carteira conforme o estado. */
function desenharCarteira() {
  const b = document.getElementById("btn-carteira");
  b.classList.toggle("conectada", !!estado.carteira);
  document.getElementById("carteira-texto").textContent = estado.carteira ? `${estado.carteira} · ${estado.saldo.toFixed(2)} RKT` : "Conectar carteira";
  b.setAttribute("aria-label", estado.carteira ? `Carteira conectada ${estado.carteira}, saldo ${estado.saldo.toFixed(2)} RKT. Clique para desconectar.` : "Conectar carteira");
}

/* Conecta (com espera simulada) ou pergunta se deve desconectar. */
async function alternarCarteira() {
  const b = document.getElementById("btn-carteira");
  if (estado.carteira) {
    estado.carteira = null;
    desenharCarteira();
    LT.aviso("Carteira desconectada.", "info");
    return;
  }
  LT.carregando(b, true, "Conectando…");
  await LT.esperar(1100);
  LT.carregando(b, false);
  estado.carteira = "0x7a3f…c91e";
  desenharCarteira();
  LT.aviso("Carteira conectada com sucesso.");
}

/* Abre a compra: sem carteira mostra erro; com saldo baixo, alerta. */
function comprar(botao) {
  const { comprar: obra, artista, preco } = botao.dataset;
  const valor = Number(preco);
  if (!estado.carteira) {
    LT.aviso("Conecte a sua carteira para comprar esta NFT.", "erro");
    document.getElementById("btn-carteira").focus();
    return;
  }
  const box = document.createElement("div");
  box.className = "compra";
  box.innerHTML = `<dl><dt>Obra</dt><dd>${obra}</dd><dt>Artista</dt><dd>${artista}</dd><dt>Preço</dt><dd>${valor.toFixed(2)} RKT</dd><dt>Taxa da rede</dt><dd>0.02 RKT</dd><dt>Seu saldo</dt><dd>${estado.saldo.toFixed(2)} RKT</dd></dl>`;
  const confirmar = document.createElement("button");
  confirmar.type = "button";
  confirmar.className = "lt-botao lt-botao--principal";
  confirmar.textContent = "Confirmar compra";
  box.appendChild(confirmar);
  const d = LT.modal({ titulo: "Confirmar compra", conteudo: box });
  confirmar.addEventListener("click", async () => {
    const total = valor + 0.02;
    if (total > estado.saldo) {
      LT.aviso(`Saldo insuficiente: faltam ${(total - estado.saldo).toFixed(2)} RKT.`, "erro");
      return;
    }
    LT.carregando(confirmar, true, "Registrando na blockchain…");
    await LT.esperar(1200);
    estado.saldo -= total;
    desenharCarteira();
    LT.sucesso(box, { titulo: "NFT adquirida!", texto: `${obra} já está na sua carteira. Os royalties de ${artista} foram registrados.`, rotuloRecomecar: "Fechar", aoRecomecar: () => d.close() });
    LT.aviso(`${obra} comprada por ${valor.toFixed(2)} RKT.`);
    botao.textContent = "Na sua carteira";
    botao.disabled = true;
  });
}

/* Galeria ampliável com anterior/próxima e setas do teclado. */
function abrirObra(indice) {
  const itens = [...document.querySelectorAll(".galeria__item")];
  let atual = indice;
  const box = document.createElement("div");
  const desenhar = () => {
    const img = itens[atual].querySelector("img");
    box.innerHTML = `<img src="${img.getAttribute("src")}" alt="${img.alt}" /><p style="display:flex;justify-content:space-between;align-items:center;margin-top:12px"><button type="button" class="lt-botao" data-ir="-1">← Anterior</button><span>${atual + 1} de ${itens.length}</span><button type="button" class="lt-botao" data-ir="1">Próxima →</button></p>`;
  };
  const ir = (n) => {
    atual = (atual + n + itens.length) % itens.length;
    desenhar();
  };
  box.addEventListener("click", (e) => {
    const b = e.target.closest("[data-ir]");
    if (b) ir(Number(b.dataset.ir));
  });
  desenhar();
  const d = LT.modal({ titulo: itens[indice].getAttribute("aria-label").replace("Ampliar obra ", ""), conteudo: box, largura: "760px" });
  d.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") ir(1);
    if (e.key === "ArrowLeft") ir(-1);
  });
}

/* Artistas: destaque do escolhido e perfil em janela; "ver todos" amplia a lista. */
function ligarArtistas() {
  const botoes = [...document.querySelectorAll(".artista")];
  botoes.forEach((b) => {
    b.setAttribute("aria-pressed", "false");
    b.addEventListener("click", () => {
      botoes.forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      LT.modal({ titulo: b.dataset.artista, conteudo: `<p>${b.dataset.fotos} fotografias publicadas na Rocket NFTs.</p><p>Coleção atual: retratos de astronautas em luz neon, com edições limitadas.</p>` });
    });
  });
  const extras = ["Nina Prado · 18 fotografias", "Theo Lima · 15 fotografias", "Iara Costa · 12 fotografias"];
  document.getElementById("btn-todos").addEventListener("click", (e) => {
    const lista = document.querySelector(".artistas__grade");
    extras.forEach((t) => {
      const [nome, fotos] = t.split(" · ");
      const li = document.createElement("li");
      li.innerHTML = `<button type="button" class="artista" aria-pressed="false"><span><strong>${nome}</strong><small>${fotos}</small></span></button>`;
      lista.appendChild(li);
    });
    e.currentTarget.parentElement.innerHTML = "<p>Você está vendo todos os artistas.</p>";
    LT.aviso("Mais 3 artistas carregados.", "info");
  });
}

/* Links "Entenda…" abrem a pergunta certa da FAQ. */
function ligarFaq() {
  const itens = document.querySelectorAll(".faq details");
  document.querySelectorAll("[data-faq]").forEach((a) =>
    a.addEventListener("click", () => {
      const alvo = itens[Number(a.dataset.faq)];
      alvo.open = true;
      alvo.querySelector("summary").focus({ preventScroll: true });
    })
  );
}

document.getElementById("btn-carteira").addEventListener("click", alternarCarteira);
document.querySelectorAll("[data-comprar]").forEach((b) => b.addEventListener("click", () => comprar(b)));
document.querySelectorAll(".galeria__item").forEach((b, i) => b.addEventListener("click", () => abrirObra(i)));
ligarArtistas();
ligarFaq();
LT.ligarFormulario(document.getElementById("form-news"), { titulo: "Inscrição confirmada!", texto: "Você vai receber os lançamentos da semana no seu e-mail.", mostrarResumo: false, aviso: "E-mail cadastrado." });
desenharCarteira();
/* fim de script.js */
