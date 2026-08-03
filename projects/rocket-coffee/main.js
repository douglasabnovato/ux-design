import learnTechDatabase from "./database.js";

// --- 1. SELETORES DO DOM (Unificados) ---
const productsGrid = document.querySelector("#products-grid");
const menuToggle = document.querySelector(".menu-toggle");
const menuSection = document.querySelector(".menu-section");
const navLinks = document.querySelector(".nav-links"); // Seletor único
const header = document.querySelector("header");

// --- 2. HEADER & MENU MOBILE ---

// Scroll Effect
window.addEventListener("scroll", () => {
  header.classList.toggle("scroll-active", window.scrollY > 50);
});

let isMenuOpen = false;

function toggleMenu() {
  isMenuOpen = !isMenuOpen;

  // Alinhado com seu CSS: .menu-section.on .nav-links
  menuSection.classList.toggle("on", isMenuOpen);

  // Adiciona o 'show' por segurança caso use essa classe no CSS
  navLinks.classList.toggle("show", isMenuOpen);

  // Trava o scroll
  document.body.style.overflow = isMenuOpen ? "hidden" : "initial";
}

if (menuToggle) {
  menuToggle.addEventListener("click", toggleMenu);
}

// Fechar menu ao clicar em um link (Melhoria de UX)
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    if (isMenuOpen) toggleMenu();
  });
});

// --- 3. RENDERIZAÇÃO DE PRODUTOS ---

function renderProducts() {
  if (!productsGrid) return;

  const productsHTML = learnTechDatabase
    .map((product) => {
      const sensoryText = product.details?.sensory
        ? product.details.sensory.join(" • ")
        : "Blend Exclusivo learnTECH";

      return `
        <article class="card-coffee">
            <div class="card-image-wrapper">
                <img src="${product.image}" alt="${product.name}" loading="lazy"
                     onerror="this.src='https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=500'">
                <span class="badge-category" style="position:absolute; top:10px; right:10px; background:var(--primary); padding:2px 8px; border-radius:4px; font-size:1rem;">${product.category}</span>
            </div>
            
            <div class="card-content">
                <p class="sensory-notes">${sensoryText}</p>
                <h3>${product.name}</h3>
                <p class="description" style="color: #a8a8b3; font-size: 1.3rem; margin-bottom: 2rem;">
                    ${product.description.substring(0, 80)}...
                </p>
                <div class="card-footer">
                    <div class="price-container">
                        <span style="font-size: 1.2rem; color: var(--primary-purple);">R$</span>
                        <span class="price">${product.price.toFixed(2)}</span>
                    </div>
                    <button class="btn-details" onclick="alert('Item: ${product.name}')">Detalhes</button>
                </div>
            </div>
        </article>`;
    })
    .join("");

  productsGrid.innerHTML = productsHTML;
}

// --- 4. CARROSSEL ORBITAL ---

const track = document.querySelector(".carousel-track");
const nextButton = document.querySelector(".control-btn.next");
const prevButton = document.querySelector(".control-btn.prev");
const dotsNav = document.querySelector(".indicators");

if (track && nextButton && prevButton) {
  let cards = Array.from(track.children);
  let currentIndex = 1;
  let isTransitioning = false;

  // Clones para o Infinito
  const firstClone = cards[0].cloneNode(true);
  const lastClone = cards[cards.length - 1].cloneNode(true);
  firstClone.classList.add("clone");
  lastClone.classList.add("clone");
  track.appendChild(firstClone);
  track.prepend(lastClone);

  const allCards = Array.from(track.children);

  const updateCarousel = (smooth = true) => {
    const containerWidth = document.querySelector(
      ".carousel-container",
    ).offsetWidth;
    const activeCard = allCards[currentIndex];

    track.style.transition = smooth
      ? "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
      : "none";

    allCards.forEach((card, i) =>
      card.classList.toggle("active", i === currentIndex),
    );

    const cardCenter = activeCard.offsetLeft + activeCard.offsetWidth / 2;
    const containerCenter = containerWidth / 2;
    const moveAmount = containerCenter - cardCenter;

    track.style.transform = `translateX(${moveAmount}px)`;

    // Atualizar Dots
    if (dotsNav) {
      const realIndex = (currentIndex - 1 + cards.length) % cards.length;
      Array.from(dotsNav.children).forEach((dot, i) => {
        dot.classList.toggle("active", i === realIndex);
      });
    }
  };

  track.addEventListener("transitionend", () => {
    isTransitioning = false;
    if (allCards[currentIndex].classList.contains("clone")) {
      currentIndex = currentIndex === 0 ? allCards.length - 2 : 1;
      updateCarousel(false);
    }
  });

  const moveNext = () => {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;
    updateCarousel();
  };

  const movePrev = () => {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex--;
    updateCarousel();
  };

  nextButton.addEventListener("click", moveNext);
  prevButton.addEventListener("click", movePrev);

  window.addEventListener("load", () => updateCarousel(false));
  window.addEventListener("resize", () => updateCarousel(false));
}

// --- 5. INICIALIZAÇÃO ---
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
});
