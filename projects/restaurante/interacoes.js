/*
 * interacoes.js · Restaurante da Jéssica (Food).
 * Transforma as tags do rodapé em filtros das receitas (com contagem e
 * estado vazio), adiciona "Ver receita" com janela de detalhes e pedido
 * pelo WhatsApp, e fecha o menu lateral com Esc.
 */
document.documentElement.style.setProperty("--lt-cor", "#000");

const receitas = [...document.querySelectorAll(".receita")];
const status = document.getElementById("filtro-status");
const vitrine = document.getElementById("food");
let filtroAtual = "";

/* Mostra só as receitas da tag escolhida (ou todas) e atualiza o status. */
function filtrar(tag) {
  filtroAtual = tag;
  const vazioAntigo = vitrine.querySelector(".lt-vazio");
  if (vazioAntigo) vazioAntigo.remove();
  let n = 0;
  receitas.forEach((r) => {
    const ok = !tag || r.dataset.tags.includes(tag);
    r.hidden = !ok;
    r.style.display = ok ? "" : "none";
    if (ok) n++;
  });
  document.querySelectorAll(".tag-filtro").forEach((b) => b.setAttribute("aria-pressed", String(b.textContent.trim() === tag)));
  status.textContent = !tag ? `Mostrando todas as ${receitas.length} receitas.` : `${n} receita(s) com a tag "${tag}".`;
  if (!n) {
    const box = document.createElement("div");
    vitrine.appendChild(box);
    LT.vazio(box, {
      titulo: `Ainda não temos receitas de "${tag}"`,
      texto: "A Jéssica está preparando novidades. Veja todas as receitas enquanto isso.",
      rotuloAcao: "Ver todas as receitas",
      acao: () => filtrar(""),
    });
    box.replaceWith(box.firstElementChild);
  }
  if (tag) vitrine.scrollIntoView({ behavior: "smooth" });
}

/* Troca os spans de tag por botões de filtro acessíveis. */
function ligarTags() {
  document.querySelectorAll(".w3-serif .w3-tag").forEach((span) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = `${span.className} tag-filtro`;
    b.style.border = "0";
    b.style.cursor = "pointer";
    b.textContent = span.textContent.trim();
    b.setAttribute("aria-pressed", "false");
    b.addEventListener("click", () => filtrar(filtroAtual === b.textContent ? "" : b.textContent));
    span.replaceWith(b);
  });
}

/* Coloca o botão "Ver receita" em cada cartão com detalhes e pedido. */
function ligarDetalhes() {
  receitas.forEach((r) => {
    const titulo = r.querySelector("h3").textContent.trim();
    const b = document.createElement("button");
    b.type = "button";
    b.className = "w3-button w3-black w3-margin-bottom";
    b.textContent = "Ver receita";
    b.setAttribute("aria-label", `Ver receita: ${titulo}`);
    b.addEventListener("click", () => {
      const box = document.createElement("div");
      box.innerHTML = `<img src="${r.querySelector("img").getAttribute("src")}" alt="" style="width:100%;border-radius:8px" /><p></p>`;
      box.querySelector("p").textContent = r.querySelector("p").textContent.trim();
      const pedir = document.createElement("button");
      pedir.type = "button";
      pedir.className = "lt-botao";
      pedir.textContent = "Encomendar este prato";
      pedir.addEventListener("click", () => {
        LT.whatsapp(`Olá, Jéssica! Quero encomendar: ${titulo}.`);
        LT.aviso("Abrimos o WhatsApp com o seu pedido.");
      });
      box.appendChild(pedir);
      LT.modal({ titulo, conteudo: box, largura: "620px" });
    });
    r.appendChild(b);
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && document.getElementById("mySidebar").style.display === "block") w3_close();
});

ligarTags();
ligarDetalhes();
/* fim de interacoes.js */
