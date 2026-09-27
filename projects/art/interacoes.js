/*
 * interacoes.js · Rua Viva (Art).
 * Galeria com ampliação em janela modal (navegação por setas do teclado)
 * e formulário de encomenda com validação, confirmação e WhatsApp.
 */
document.documentElement.style.setProperty("--lt-cor", "#333");

/* Abre a obra escolhida ampliada, com anterior/próxima. */
function abrirObra(indice) {
  const obras = [...document.querySelectorAll(".obra")];
  let atual = indice;
  const box = document.createElement("div");
  const desenhar = () => {
    const f = obras[atual];
    const img = f.querySelector("img");
    box.innerHTML = `<img src="${img.getAttribute("src")}" alt="${img.alt}" /><p>${f.querySelector("figcaption").innerHTML}</p>
      <p style="display:flex;justify-content:space-between;gap:8px"><button type="button" class="lt-botao" data-ir="-1">← Anterior</button><span>${atual + 1} de ${obras.length}</span><button type="button" class="lt-botao" data-ir="1">Próxima →</button></p>`;
  };
  const ir = (d) => {
    atual = (atual + d + obras.length) % obras.length;
    desenhar();
  };
  box.addEventListener("click", (e) => {
    const b = e.target.closest("[data-ir]");
    if (b) ir(Number(b.dataset.ir));
  });
  desenhar();
  const d = LT.modal({ titulo: "Obra ampliada", conteudo: box, largura: "820px" });
  d.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") ir(1);
    if (e.key === "ArrowLeft") ir(-1);
  });
}

document.querySelectorAll(".obra__abrir").forEach((b) => b.addEventListener("click", () => abrirObra(Number(b.dataset.obra))));

LT.ligarFormulario(document.getElementById("form-art"), {
  whatsapp: "Olá, Léo! Vim pelo portfólio Rua Viva:",
  titulo: "Pedido enviado!",
  aviso: "Pedido enviado. O artista responde pelo WhatsApp.",
});
/* fim de interacoes.js */
