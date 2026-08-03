import { database } from "./database.js";

/**
 * CONFIGURAÇÕES E ESTADO GLOBAL
 */
const state = {
  currentProducts: [...database.products],
  cart: [],
  activeCategory: "all",
};

const dom = {
  productsGrid: document.getElementById("products-grid"),
  filterContainer: document.getElementById("category-filter-container"),
  cartCount: document.getElementById("cart-count"),
  stickyCheckout: document.getElementById("sticky-checkout"),
  footerTotal: document.getElementById("footer-total"),
};

/**
 * INICIALIZAÇÃO
 */
const init = () => {
  renderFilters();
  renderProducts(state.currentProducts);
  updateCartUI();
};

/**
 * RENDERIZAÇÃO DE CATEGORIAS (UX)
 */
const renderFilters = () => {
  dom.filterContainer.innerHTML = "";

  // Botão "Todos"
  const btnAll = createFilterBtn("Todos", "all");
  dom.filterContainer.appendChild(btnAll);

  // Categorias do Database
  database.categories.forEach((cat) => {
    const btn = createFilterBtn(cat.name, cat.id);
    dom.filterContainer.appendChild(btn);
  });
};

const createFilterBtn = (name, id) => {
  const btn = document.createElement("button");
  btn.className = `filter-btn ${state.activeCategory === id ? "active" : ""}`;
  btn.textContent = name;
  btn.onclick = () => filterByCategory(id);
  return btn;
};

const filterByCategory = (categoryId) => {
  state.activeCategory = categoryId;
  state.currentProducts =
    categoryId === "all"
      ? [...database.products]
      : database.products.filter((p) => p.categoryId === categoryId);

  renderFilters(); // Atualiza estado visual dos botões
  renderProducts(state.currentProducts);
};

/**
 * RENDERIZAÇÃO DE PRODUTOS (DESIGN PREMIUM DARK)
 */
const renderProducts = (products) => {
  dom.productsGrid.innerHTML = "";

  if (products.length === 0) {
    dom.productsGrid.innerHTML = `<p class="empty-msg">Nenhum hambúrguer mágico encontrado nesta categoria.</p>`;
    return;
  }

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
            <div class="card-badge ${product.discount ? "sale" : "new"}">
                ${product.discount ? `-${product.discount}%` : "NEW"}
            </div>
            
            <div class="product-image-container">
                <div class="product-img" style="background-image: url('./assets/cardapio/${product.image}')"></div>
                <div class="shadow-ellipse"></div>
            </div>

            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-desc">${truncateText(product.description, 65)}</p>
                
                <div class="product-footer">
                    <span class="product-price">R$ ${product.price.toFixed(2).replace(".", ",")}</span>
                    <button class="add-to-cart-btn" onclick="handleAddToCart('${product.id}')">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        `;
    dom.productsGrid.appendChild(card);
  });
};

/**
 * LÓGICA DE CARRINHO (BUSINESS UNIT)
 */
window.handleAddToCart = (id) => {
  const product = database.products.find((p) => p.id === id);
  if (product) {
    state.cart.push(product);
    updateCartUI();
    animateCartIcon();
  }
};

const updateCartUI = () => {
  const total = state.cart.reduce((sum, item) => sum + item.price, 0);
  const count = state.cart.length;

  dom.cartCount.textContent = count;
  dom.footerTotal.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`;

  // Mostra/Esconde o Sticky Footer com base no carrinho
  if (count > 0) {
    dom.stickyCheckout.classList.remove("hidden");
    dom.stickyCheckout.classList.add("visible");
  } else {
    dom.stickyCheckout.classList.add("hidden");
  }
};

/**
 * UTILITÁRIOS
 */
const truncateText = (text, limit) => {
  return text.length > limit ? text.substring(0, limit) + "..." : text;
};

const animateCartIcon = () => {
  dom.cartCount.parentElement.classList.add("bump");
  setTimeout(() => dom.cartCount.parentElement.classList.remove("bump"), 300);
};

// Start
document.addEventListener("DOMContentLoaded", init);
