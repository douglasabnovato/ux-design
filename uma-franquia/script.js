const scrollTopBtn = document.getElementById("scrollTopBtn");

if (scrollTopBtn) {
  const setVisibility = () => {
    scrollTopBtn.classList.toggle("visible", window.scrollY > 400);
  };

  window.addEventListener("scroll", setVisibility, { passive: true });
  window.addEventListener("resize", setVisibility);

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });

  setVisibility();
}
