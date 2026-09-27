/*
 * script.js · Puro Estilo.
 * Cabeçalho fixo ao rolar, menu responsivo acessível, galeria de fotos do
 * look em destaque e abertura/fechamento das janelas de detalhes e favoritos
 * (clique fora, botão × ou tecla Esc) e exportação da lista em PDF.
 */
const header = document.querySelector("header");

window.addEventListener("scroll", function () {
  header.classList.toggle("sticky", window.scrollY > 0);
});

/* Menu responsivo com estado anunciado. */
const menu = document.querySelector("#menu-icon");
const navmenu = document.querySelector(".navmenu");
menu.addEventListener("click", () => {
  const aberto = navmenu.classList.toggle("open");
  menu.classList.toggle("bx-x", aberto);
  menu.setAttribute("aria-expanded", String(aberto));
  menu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
});
navmenu.addEventListener("click", (e) => {
  if (e.target.closest("a") && navmenu.classList.contains("open")) menu.click();
});

/* Miniaturas trocam a foto principal do look. */
const productImg = document.getElementById("productImg");
document.querySelectorAll(".small-img").forEach((img, i) => {
  img.alt = `Foto ${i + 1} do look`;
  img.tabIndex = 0;
  const trocar = () => (productImg.src = img.src);
  img.addEventListener("click", trocar);
  img.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      trocar();
    }
  });
});

/* Abre uma janela (detalhes ou favoritos) e guarda quem a abriu. */
let origemJanela = null;
function abrirJanela(el) {
  origemJanela = document.activeElement;
  el.style.display = "block";
  const foco = el.querySelector("button, select, input, a");
  if (foco) foco.focus();
}

/* Fecha a janela e devolve o foco. */
function fecharJanela(el) {
  el.style.display = "none";
  if (origemJanela && origemJanela.focus) origemJanela.focus();
}

const modal = document.getElementById("myModal");
const modalFav = document.getElementById("myModalSacola");
const btn = document.getElementById("myBtn");
btn.tabIndex = 0;
btn.setAttribute("role", "button");
btn.setAttribute("aria-label", "Ver detalhes do look em destaque");
btn.addEventListener("click", (e) => {
  if (!e.target.closest(".heart-icon")) abrirJanela(modal);
});
btn.addEventListener("keydown", (e) => {
  if (e.key === "Enter") abrirJanela(modal);
});
document.querySelector("#myModal .close").addEventListener("click", () => fecharJanela(modal));
document.getElementById("myBtnIcon").addEventListener("click", (e) => {
  e.preventDefault();
  abrirJanela(modalFav);
});
document.querySelector(".closeFav").addEventListener("click", () => fecharJanela(modalFav));

window.addEventListener("click", (e) => {
  if (e.target === modal) fecharJanela(modal);
  if (e.target === modalFav) fecharJanela(modalFav);
});
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (modal.style.display === "block") fecharJanela(modal);
  if (modalFav.style.display === "block") fecharJanela(modalFav);
});

/* Exporta a lista de favoritos em PDF (html2pdf). */
function downloadPDF() {
  const listFavorates = document.querySelector("#content-favorate");
  const option = {
    margin: 0.5,
    filename: "meus-favoritos-puro-estilo.pdf",
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };
  return html2pdf().set(option).from(listFavorates).save();
}
/* fim de script.js */
