/**
 * script.js - Lógica de Autoatendimento
 */

// --- ESTADO ---
let sacola = null;
let currentSlide = 0;

// --- INICIALIZAÇÃO SEGURA ---
document.addEventListener("DOMContentLoaded", () => {
  try {
    if (typeof DATA === "undefined")
      throw new Error("database.js não carregado corretamente!");

    sacola = LT.criarSacola({ nomeLoja: "Pastel & Cana" });
    renderHero();
    renderCategorias();
    renderProdutos("todos");
    setupEventListeners();

    console.log("🚀 Sistema Pastelzinho & Cana carregado com sucesso!");
  } catch (error) {
    console.error("❌ Erro Crítico:", error.message);
  }
});

// --- CARROSSEL HERO ---
const renderHero = () => {
  const slider = document.getElementById("hero-slider");
  if (!slider || !DATA.heroDestaques) return;

  slider.innerHTML = DATA.heroDestaques
    .map(
      (p) => `
        <div class="slide">
            <div class="slide-info">
                <h1 aria-level="2">${p.nome}</h1>
                <div class="special-ingredient">
                    <span class="icon">✨</span>
                    <span class="text">${p.ingrediente}</span>
                </div>
                <button class="btn-hero-order" type="button" onclick="adicionarAoCarrinho(${p.id})">
                    Adicionar ao Pedido <span class="arrow">➔</span>
                </button>
            </div>
            <img src="${p.img}" class="slide-img" alt="${p.nome}" onerror="this.onerror=null;this.src='./assets/pastel-1.jpg'">
        </div>
    `,
    )
    .join("");

  setupHeroControls();
};

const setupHeroControls = () => {
  const slider = document.getElementById("hero-slider");
  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");
  if (!nextBtn || !prevBtn) return;

  const moveSlide = () => {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  };

  nextBtn.onclick = () => {
    currentSlide = (currentSlide + 1) % DATA.heroDestaques.length;
    moveSlide();
  };

  prevBtn.onclick = () => {
    currentSlide =
      (currentSlide - 1 + DATA.heroDestaques.length) %
      DATA.heroDestaques.length;
    moveSlide();
  };

  // Auto-play
  setInterval(() => nextBtn.click(), 6000);
};

// --- RENDERIZAR PRODUTOS ---
const renderProdutos = (filtroId) => {
  const grid = document.getElementById("product-grid");
  const title = document.getElementById("section-title");
  if (!grid) return;

  let filtrados;
  if (filtroId === "todos") filtrados = DATA.produtos;
  else if (filtroId === "lancamentos")
    filtrados = DATA.produtos.filter((p) => p.lancamento);
  else filtrados = DATA.produtos.filter((p) => p.categoria === filtroId);

  // Atualiza título da seção
  const cat = DATA.categorias.find((c) => c.id === filtroId);
  if (title && cat) title.innerText = cat.nome;

  if (!filtrados.length) {
    LT.vazio(grid, {
      titulo: "Nenhum item nesta categoria agora",
      texto: "Veja os outros sabores do cardápio.",
      acao: () => document.querySelector('.cat-item[data-category="todos"]').click(),
      rotuloAcao: "Ver todos",
    });
    return;
  }

  grid.innerHTML = filtrados
    .map(
      (p) => `
        <div class="product-card" role="button" tabindex="0" aria-label="Adicionar ${p.nome}, R$ ${p.preco.toFixed(2).replace(".", ",")}, à sacola" onclick="adicionarAoCarrinho(${p.id})">
            <img src="${p.img}" class="product-img" alt="" onerror="this.onerror=null;this.src='./assets/pastel-1.jpg'">
            <div class="product-info">
                <h3>${p.nome}</h3>
                <p class="product-price">R$ ${p.preco.toFixed(2).replace(".", ",")}</p>
            </div>
        </div>
    `,
    )
    .join("");
};

// --- CATEGORIAS ---
const renderCategorias = () => {
  const nav = document.querySelector(".category-nav");
  if (!nav) return;

  nav.innerHTML = DATA.categorias
    .map(
      (cat) => `
        <div class="cat-item ${cat.id === "todos" ? "active" : ""}" data-category="${cat.id}" role="button" tabindex="0" aria-pressed="${cat.id === "todos"}">
            <div class="cat-img-wrapper">
                <span style="font-size: 2rem;">${cat.icone}</span>
            </div>
            <span class="cat-label">${cat.nome}</span>
        </div>
    `,
    )
    .join("");
};

// --- EVENTOS ---
const setupEventListeners = () => {
  document.querySelector(".category-nav").addEventListener("click", (e) => {
    const item = e.target.closest(".cat-item");
    if (item) {
      document.querySelectorAll(".cat-item").forEach((el) => {
        el.classList.remove("active");
        el.setAttribute("aria-pressed", "false");
      });
      item.classList.add("active");
      item.setAttribute("aria-pressed", "true");
      renderProdutos(item.dataset.category);
    }
  });
  document.addEventListener("keydown", (e) => {
    const alvo = e.target.closest && e.target.closest(".cat-item, .product-card");
    if (!alvo || (e.key !== "Enter" && e.key !== " ")) return;
    e.preventDefault();
    alvo.click();
  });
};

const adicionarAoCarrinho = (id) => {
  const produto = DATA.produtos.find((p) => p.id === id);
  if (produto) {
    sacola.adicionar({ id: produto.id, nome: produto.nome, preco: produto.preco });
  }
};
