// catalog.js — carrega projects.json e renderiza o carrossel + as grades de cards
// Roda ANTES de script.js (ordem no index.html), garantindo que os cards
// já existam no DOM quando initializeCards() do script.js for chamado.

let heroIndex = 0;
let heroSlides = [];
let heroTimer = null;

document.addEventListener('DOMContentLoaded', () => {
  fetch('./projects.json')
    .then((res) => res.json())
    .then((projects) => {
      renderHeroCarousel(projects.filter((p) => p.destaque));
      renderGrid(projects.filter((p) => p.destaque), 'projectsGrid');
      renderGrid(projects.filter((p) => !p.destaque), 'studiesGrid');
    })
    .catch((err) => console.error('Erro ao carregar projects.json:', err));
});

function cardHTML(project) {
  const media = project.image
    ? `<img src="${project.image}" alt="Preview do projeto ${project.title}" class="project-card__image" />`
    : `<div class="project-card__placeholder" aria-hidden="true">${project.title.charAt(0)}</div>`;

  return `
    <a href="projects/${project.slug}/index.html" class="project-card">
      <div class="project-card__media">
        ${media}
        <span class="project-card__badge">${project.category}</span>
      </div>
      <div class="project-card__content">
        <h2>${project.title}</h2>
        <p>${project.description}</p>
      </div>
    </a>
  `;
}

function renderGrid(projects, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = projects.map(cardHTML).join('');
}

function renderHeroCarousel(destaques) {
  heroSlides = destaques;
  const track = document.getElementById('heroTrack');
  const dotsContainer = document.getElementById('heroDots');
  if (!track || heroSlides.length === 0) return;

  track.innerHTML = heroSlides
    .map(
      (p) => `
      <a href="projects/${p.slug}/index.html" class="hero-carousel__slide">
        <img src="${p.image}" alt="${p.title}" class="hero-carousel__image" />
        <div class="hero-carousel__caption">
          <span class="hero-carousel__badge">${p.category}</span>
          <h2>${p.title}</h2>
          <p>${p.description}</p>
        </div>
      </a>
    `
    )
    .join('');

  dotsContainer.innerHTML = heroSlides
    .map((_, i) => `<button class="hero-carousel__dot" data-index="${i}" aria-label="Ir para slide ${i + 1}"></button>`)
    .join('');

  document.getElementById('heroPrev').addEventListener('click', () => goToSlide(heroIndex - 1));
  document.getElementById('heroNext').addEventListener('click', () => goToSlide(heroIndex + 1));
  dotsContainer.querySelectorAll('.hero-carousel__dot').forEach((dot) => {
    dot.addEventListener('click', () => goToSlide(parseInt(dot.dataset.index, 10)));
  });

  updateSlidePosition();
  startAutoRotate();
}

function goToSlide(index) {
  heroIndex = (index + heroSlides.length) % heroSlides.length;
  updateSlidePosition();
  startAutoRotate();
}

function updateSlidePosition() {
  const track = document.getElementById('heroTrack');
  track.style.transform = `translateX(-${heroIndex * 100}%)`;

  document.querySelectorAll('.hero-carousel__dot').forEach((dot, i) => {
    dot.classList.toggle('is-active', i === heroIndex);
  });
}

function startAutoRotate() {
  if (heroTimer) clearInterval(heroTimer);
  heroTimer = setInterval(() => goToSlide(heroIndex + 1), 6000);
}