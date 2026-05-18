document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".lp-header");
  const menuToggle = document.getElementById("menuToggle");
  const mainNavigation = document.getElementById("main-navigation");
  const body = document.body;

  function openMenu() {
    if (!mainNavigation || !menuToggle) return;

    mainNavigation.classList.add("is-open");
    menuToggle.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
    body.classList.add("menu-open");

    const firstLink = mainNavigation.querySelector("a");
    if (firstLink) firstLink.focus({ preventScroll: true });
  }

  function closeMenu() {
    if (!mainNavigation || !menuToggle) return;

    mainNavigation.classList.remove("is-open");
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    body.classList.remove("menu-open");
  }

  function toggleMenu(event) {
    if (event) event.stopPropagation();
    if (!mainNavigation || !menuToggle) return;

    const isOpen = mainNavigation.classList.contains("is-open");
    isOpen ? closeMenu() : openMenu();
  }

  if (menuToggle && mainNavigation) {
    menuToggle.addEventListener("click", toggleMenu);

    mainNavigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
      const clickedOutside =
        !mainNavigation.contains(event.target) &&
        !menuToggle.contains(event.target);

      if (clickedOutside) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
        menuToggle.focus();
      }
    });
  }

  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      closeMenu();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const accordionButtons = document.querySelectorAll(".accordion__button");

  accordionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      const panelId = button.getAttribute("aria-controls");
      const panel = document.getElementById(panelId);

      accordionButtons.forEach((otherButton) => {
        if (otherButton !== button) {
          otherButton.setAttribute("aria-expanded", "false");
          const otherPanelId = otherButton.getAttribute("aria-controls");
          const otherPanel = document.getElementById(otherPanelId);
          if (otherPanel) otherPanel.hidden = true;
        }
      });

      button.setAttribute("aria-expanded", String(!expanded));
      if (panel) panel.hidden = expanded;
    });
  });
});