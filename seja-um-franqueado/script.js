document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".lp-header__menu-btn");
  const nav = document.querySelector(".lp-header__nav");
  const header = document.querySelector(".lp-header");
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  const setMenuState = (open) => {
    if (!menuBtn || !nav) return;
    nav.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  };

  if (menuBtn && nav) {
    nav.id = nav.id || "main-navigation";
    menuBtn.setAttribute("aria-controls", nav.id);
    menuBtn.setAttribute("aria-expanded", "false");
    setMenuState(false);

    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = nav.classList.contains("is-open");
      setMenuState(!isOpen);
    });

    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
        setMenuState(false);
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setMenuState(false);
        menuBtn.focus();
      }
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenuState(false));
    });
  }

  const getOffset = () => {
    if (!header) return 0;
    return header.offsetHeight + 12;
  };

  const smoothScrollTo = (target) => {
    const targetEl = document.querySelector(target);
    if (!targetEl) return;

    const top =
      window.scrollY + targetEl.getBoundingClientRect().top - getOffset();

    if (!targetEl.hasAttribute("tabindex")) {
      targetEl.setAttribute("tabindex", "-1");
    }

    window.scrollTo({
      top,
      behavior: "smooth",
    });

    targetEl.focus({ preventScroll: true });
  };

  internalLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#") || href === "#") return;

    link.addEventListener("click", (e) => {
      const targetEl = document.querySelector(href);
      if (!targetEl) return;

      e.preventDefault();
      smoothScrollTo(href);

      if (nav && nav.classList.contains("is-open")) {
        setMenuState(false);
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) {
      setMenuState(false);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const backToTopBtn = document.querySelector(".scroll-top");
  const header = document.querySelector(".lp-header");
  const themedSections = document.querySelectorAll("[data-section-theme]");

  if (!backToTopBtn) return;

  const threshold = 300;

  const setVisibility = () => {
    if (window.scrollY > threshold) {
      backToTopBtn.classList.add("is-visible");
    } else {
      backToTopBtn.classList.remove("is-visible");
    }
  };

  const setButtonTheme = (theme) => {
    backToTopBtn.classList.remove("is-light", "is-dark");

    if (theme === "light") {
      backToTopBtn.classList.add("is-light");
    } else {
      backToTopBtn.classList.add("is-dark");
    }
  };

  const updateThemeBySection = () => {
    const viewportMiddle = window.innerHeight * 0.5;

    let currentTheme = "dark";

    themedSections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const isInView = rect.top <= viewportMiddle && rect.bottom >= viewportMiddle;

      if (isInView) {
        currentTheme = section.dataset.sectionTheme || "dark";
      }
    });

    setButtonTheme(currentTheme);
  };

  const handleScroll = () => {
    setVisibility();
    updateThemeBySection();
  };

  backToTopBtn.addEventListener("click", (e) => {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    if (header) {
      header.setAttribute("tabindex", "-1");
      header.focus({ preventScroll: true });
    }
  });

  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", handleScroll);

  handleScroll();
});


document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".lp-header__menu-btn");
  const menu = document.querySelector("#main-navigation");

  if (!menuBtn || !menu) return;

  const closeMenu = () => {
    menu.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Abrir menu");
  };

  const openMenu = () => {
    menu.classList.add("is-open");
    menuBtn.setAttribute("aria-expanded", "true");
    menuBtn.setAttribute("aria-label", "Fechar menu");
  };

  menuBtn.addEventListener("click", () => {
    const isOpen = menu.classList.contains("is-open");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    const clickedInsideHeader = event.target.closest(".lp-header");
    if (!clickedInsideHeader) closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) closeMenu();
  });
});