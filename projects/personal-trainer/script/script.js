// ==========================================
// 1. MÓDULO WHATSAPP
// ==========================================
export function openWhatsApp(message, phone = "5532988367667") {
    const text = encodeURIComponent(message);
    const url = `https://wa.me/${phone}?text=${text}`;
    window.open(url, "_blank");
}

// ==========================================
// 2. MÓDULO DE CONTATO E MODAL
// ==========================================
export async function handleContact(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            form.reset();
            showModal();
        } else {
            alert("Não foi possível enviar. Tente pelo WhatsApp.");
        }
    } catch (error) {
        alert("Erro de conexão. Tente novamente mais tarde.");
    }
}

export function showModal() {
    const modal = document.getElementById("successModal");
    if (modal) {
        modal.classList.add("show");
        // Se preferir fechar via classe ao invés de display:none:
        setTimeout(() => closeModal(), 5000);
    }
}

export function closeModal() {
    const modal = document.getElementById("successModal");
    if (modal) {
        modal.classList.remove("show");
        modal.style.display = "none";
    }
}

// ==========================================
// 3. MÓDULO DE TESTE A/B DO HERO
// ==========================================
export function initABTest() {
    const heroHeader = document.querySelector(".hero h1");
    const variants = {
        A: "Transforme seu corpo com um Personal Trainer dedicado",
        B: "Alcance seus objetivos com treinos personalizados",
    };

    let variant = localStorage.getItem("lp_hero_variant");
    if (!variant) {
        variant = Math.random() < 0.5 ? "A" : "B";
        localStorage.setItem("lp_hero_variant", variant);
    }

    if (heroHeader) {
        heroHeader.textContent = variants[variant];
    }

    if (typeof gtag === "function") {
        gtag("event", "view_hero_ab", { variant: variant });
    }
}

// ==========================================
// 4. MÓDULO RODAPÉ (ANO DINÂMICO)
// ==========================================
export function initFooterYear() {
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// ==========================================
// 5. MÓDULO DE PILHA INTERATIVA DE CAMPANHAS
// ==========================================
export function bringToFront(selectedCard) {
  const container = document.getElementById("campaignStack");
  if (!container) return;

  const cards = Array.from(container.querySelectorAll(".stack-card"));
  const clickedIndex = cards.indexOf(selectedCard);

  if (clickedIndex === -1) return;

  const reorderedCards = [
    cards[clickedIndex],
    ...cards.slice(0, clickedIndex),
    ...cards.slice(clickedIndex + 1)
  ];

  reorderedCards.forEach((card, index) => {
    card.classList.remove("active", "behind-1", "behind-2");
    
    if (index === 0) {
      card.classList.add("active");
    } else if (index === 1) {
      card.classList.add("behind-1");
    } else {
      card.classList.add("behind-2");
    }

    container.appendChild(card);
  });
}

// ==========================================
// 6. EXPOSIÇÃO GLOBAL (WINDOW) PARA O HTML
// ==========================================
window.openWhatsApp = openWhatsApp;
window.handleContact = handleContact;
window.closeModal = closeModal;
window.bringToFront = bringToFront;

// ==========================================
// 7. INICIALIZAÇÃO DA APLICAÇÃO (DOM LOADED)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    initABTest();
    initFooterYear();

    // Inicializa a pilha de campanhas nas posições corretas
    const container = document.getElementById("campaignStack");
    if (container) {
        const cards = container.querySelectorAll(".stack-card");
        cards.forEach((card, index) => {
            if (index === 0) card.classList.add("active");
            else if (index === 1) card.classList.add("behind-1");
            else card.classList.add("behind-2");
        });
    }
});