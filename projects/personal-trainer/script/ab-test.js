// INICIO: SEÇÃO HERO - JAVASCRIPT (TESTE A/B)
import { trackABView } from './analytics.js';

const KEY = "lp_hero_variant";

export function initABTest() {
  let variant = localStorage.getItem(KEY);
  if (!variant) {
    variant = Math.random() > 0.5 ? "B" : "A";
    localStorage.setItem(KEY, variant);
  }

  const heroH1 = document.querySelector(".hero h1");
  if (heroH1 && variant === "B") {
    heroH1.textContent = "Resultados rápidos, treinos inteligentes: seu personal trainer online e acessível.";
  }

  // Dispara evento GA4
  trackABView(variant);
}
// FIM: SEÇÃO HERO - JAVASCRIPT (TESTE A/B)