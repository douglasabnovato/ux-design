/*=== VARIÁVEIS TOTAIS =============================*/
const navigation = document.getElementById("navigation");
const backToTopButton = document.getElementById("backToTopButton");
const footer = document.querySelector("footer");
const home = document.getElementById("home");
const services = document.getElementById("services");
const testimonials = document.getElementById("testimonials"); // Adicionado
const about = document.getElementById("about");
const contact = document.getElementById("contact");

const openMenuButton = document.querySelector(".open-menu");
const closeMenuButton = document.querySelector(".close-menu");
const menuLinks = document.querySelectorAll(
  '.menu a[href^="#"], .menu a.button',
);

/*=== MENU MOBILE ==================================*/
function setMenuExpanded(isExpanded) {
  document.body.classList.toggle("menu-expanded", isExpanded);

  if (openMenuButton) {
    openMenuButton.setAttribute("aria-expanded", isExpanded ? "true" : "false");
  }

  if (closeMenuButton) {
    closeMenuButton.setAttribute(
      "aria-expanded",
      isExpanded ? "true" : "false",
    );
  }
}

function openMenu() {
  setMenuExpanded(true);
}
function closeMenu() {
  setMenuExpanded(false);
}

if (openMenuButton) openMenuButton.addEventListener("click", openMenu);
if (closeMenuButton) closeMenuButton.addEventListener("click", closeMenu);

menuLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

/*=== SCROLL HANDLER ===============================*/
window.addEventListener("scroll", onScroll);

function onScroll() {
  showNavOnScroll();
  showBackToTopButtonOnScroll();

  activateMenuAtCurrentSection(home);
  activateMenuAtCurrentSection(services);
  activateMenuAtCurrentSection(testimonials); // Adicionado
  activateMenuAtCurrentSection(about);
  activateMenuAtCurrentSection(contact);
}

function activateMenuAtCurrentSection(section) {
  if (!section) return;

  const targetLine = window.scrollY + window.innerHeight / 2;
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;
  const sectionTopReachOrPassedTargetline = targetLine >= sectionTop;

  const sectionEndsAt = sectionTop + sectionHeight;
  const sectionEndPassedTargetline = sectionEndsAt <= targetLine;

  const sectionBoundaries =
    sectionTopReachOrPassedTargetline && !sectionEndPassedTargetline;

  const sectionId = section.getAttribute("id");
  const menuElement = document.querySelector(`.menu a[href="#${sectionId}"]`);

  if (!menuElement) return;

  menuElement.classList.remove("active");
  if (sectionBoundaries) {
    menuElement.classList.add("active");
  }
}

function showNavOnScroll() {
  if (scrollY > 0) {
    navigation.classList.add("scroll");
  } else {
    navigation.classList.remove("scroll");
  }
}

function showBackToTopButtonOnScroll() {
  if (scrollY > 550) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
  updateBackToTopButtonFooterState();
}

function updateBackToTopButtonFooterState() {
  if (!backToTopButton || !footer) return;
  const footerRect = footer.getBoundingClientRect();
  const isFooterVisible = footerRect.top < window.innerHeight;
  backToTopButton.classList.toggle("footer-visible", isFooterVisible);
}

/*=== UTILITÁRIOS ==================================*/
function setCurrentYear() {
  const yearElement = document.getElementById("currentYear");
  if (yearElement) yearElement.textContent = new Date().getFullYear();
}

/*=== SCROLL REVEAL (Animações) =====================*/
const scrollRevealTargets = `
  #home, #home img, #home .stats,
  #services, #services header, #services .card,
  #testimonials, #testimonials header, #testimonials .swiper,
  #about, #about header, #about .content,
  #contact, #contact header, #contact .content
`;

if (window.ScrollReveal) {
  ScrollReveal({
    origin: "top",
    distance: "30px",
    duration: 700,
  }).reveal(scrollRevealTargets);
}

/*=== TEMA DE CORES (learnTECH Engine) =============*/
function changeColorTheme() {
  const dots = document.querySelectorAll(".color-dot");
  const heroImage = document.querySelector("#hero-image");

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const hue = dot.getAttribute("data-hue");
      const image = dot.getAttribute("data-image");
      const saturation = hue === "0" ? "0%" : "100%";
      const lightness = dot.getAttribute("data-lightness") || "26%";

      // Atualiza as variáveis do variables.css
      document.documentElement.style.setProperty("--hue", hue);
      document.documentElement.style.setProperty("--sat", saturation);
      document.documentElement.style.setProperty("--light", lightness);

      if (heroImage && image) {
        heroImage.style.opacity = 0;
        setTimeout(() => {
          heroImage.setAttribute("src", image);
          heroImage.style.opacity = 1;
        }, 300);
      }

      dots.forEach((d) => d.classList.remove("active"));
      dot.classList.add("active");
    });
  });
}

/*=== SWIPER (Depoimentos) =========================*/
const initSwiper = () => {
  if (document.querySelector(".mySwiper")) {
    new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 32,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        1024: {
          slidesPerView: 2,
        },
      },
      mousewheel: true,
      keyboard: true,
    });
  }
};

/*=== INICIALIZAÇÃO ================================*/
document.addEventListener("DOMContentLoaded", () => {
  setCurrentYear();
  onScroll();
  changeColorTheme();
  initSwiper();
});
