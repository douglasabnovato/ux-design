/**
 * script.js - Lógica do Catálogo Digital
 * Responsável por: Filtros, Busca NFD, Renderização e Imagens Dinâmicas
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Estado da Aplicação
  const state = {
    searchTerm: "",
    activeCategory: "Todos",
    whatsappNumber: "553299999999", // Altere para o seu número real
  };

  // 2. Seletores do DOM
  const grid = document.getElementById("catalog-grid");
  const searchInput = document.getElementById("smart-search");
  const categoryButtons = document.querySelectorAll(".cat-btn");
  const categoryTitle = document.getElementById("current-category-title");
  const productCount = document.getElementById("product-count");

  // 3. Função de Normalização de Texto (Ignora acentos e case)
  const normalizeText = (text) => {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  // 4. Gerador de Link do WhatsApp
  const getWhatsAppLink = (produto) => {
    const displayId = `#${produto.id.toString().padStart(2, "0")}`;
    const mensagem = `Olá! Gostaria de pedir o item: ${produto.nome} (Cód: ${displayId})`;
    return `https://wa.me/${state.whatsappNumber}?text=${encodeURIComponent(mensagem)}`;
  };

  // 5. Função Principal de Renderização
  const render = () => {
    grid.innerHTML = "";
    let count = 0;

    database.categorias.forEach((categoria) => {
      // Filtro por Categoria
      if (
        state.activeCategory !== "Todos" &&
        categoria.nome !== state.activeCategory
      ) {
        return;
      }

      categoria.produtos.forEach((produto) => {
        const searchNormalized = normalizeText(state.searchTerm);
        const nameNormalized = normalizeText(produto.nome);
        const tagsNormalized = normalizeText(produto.tags.join(" "));
        const displayId = `#${produto.id.toString().padStart(2, "0")}`;

        // Lógica de Busca (Nome, Tags ou Código)
        const matchesSearch =
          nameNormalized.includes(searchNormalized) ||
          tagsNormalized.includes(searchNormalized) ||
          displayId.includes(searchNormalized);

        // Dentro da função render(), localize onde criamos o card:
        if (matchesSearch) {
          count++;
          const card = document.createElement("article");
          card.className = `product-card ${produto.vazio ? "out-of-stock" : ""}`;

          // AQUI ESTÁ O CAMINHO CORRETO CONFORME SUA ESTRUTURA:
          const imageUrl = "assets/modelos/cafe-especial-1.jpg";

          card.innerHTML = `
        <div class="card-img">
            <img src="${imageUrl}" 
                 alt="${produto.nome}" 
                 loading="lazy">
        </div>
        <div class="card-info">
            <span class="product-code">Cód: ${displayId}</span>
            <h3>${produto.nome}</h3>
            <p>${produto.desc}</p>
            <div class="card-footer">
                <span class="price-tag">R$ ${produto.preco.toFixed(2).replace(".", ",")}</span>
                ${
                  produto.vazio
                    ? '<span class="status-tag">Esgotado</span>'
                    : `<a href="${getWhatsAppLink(produto)}" target="_blank" class="btn-primary" style="padding: 0.5rem 1rem; font-size: 0.8rem;">Pedir</a>`
                }
            </div>
        </div>
    `;
          grid.appendChild(card);
        }
      });
    });

    categoryTitle.innerText = state.activeCategory;
    productCount.innerText = `${count} ${count === 1 ? "item encontrado" : "itens encontrados"}`;

    if (count === 0) {
      grid.innerHTML = `<div class="no-results" style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">Ops! Nenhum sabor encontrado com "${state.searchTerm}".</div>`;
    }

    applyScrollAnimations();
  };

  // 6. Animações de Scroll
  const applyScrollAnimations = () => {
    const cards = document.querySelectorAll(".product-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 },
    );

    cards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      card.style.transition = "all 0.5s ease-out";
      observer.observe(card);
    });
  };

  // 7. Event Listeners
  searchInput.addEventListener("input", (e) => {
    state.searchTerm = e.target.value;
    render();
  });

  categoryButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      categoryButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      state.activeCategory = btn.getAttribute("data-category");
      render();

      if (window.innerWidth < 768) {
        document
          .querySelector(".catalog-section")
          .scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // 8. Inicialização
  render();
});
