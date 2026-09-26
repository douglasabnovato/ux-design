// analytics.js

// Inicializa GA4
export function initGA4(GA_ID) {
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", GA_ID);
}

// Evento de clique no WhatsApp
export function trackWhatsAppClicks() {
  document.querySelectorAll("a").forEach(link => {
    if (link.href.includes("wa.me")) {
      link.addEventListener("click", () => {
        if (typeof gtag === "function") {
          gtag("event", "click_whatsapp", {
            event_category: "engagement",
            event_label: "WhatsApp CTA",
          });
        }
      });
    }
  });
}

// Evento de visualização de teste A/B
export function trackABView(variant) {
  if (typeof gtag === "function") {
    gtag("event", "view_hero_ab", { variation: variant });
  }
}
