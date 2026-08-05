// Script to open and close sidebar
function w3_open() {
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("myOverlay").style.display = "none";
}

const projects = [
  {
    id: "projeto-1",
    title: "Duplex Moderno",
    category: "Residencial",
    subtitle: "Sala, cozinha e circulação com móveis sob medida.",
    description: "Duplex com armários embutidos, painel de TV e bancada personalizada. Acabamento em MDF fosco e detalhes vazados para um ambiente leve e funcional.",
    cover: "./assets/moveis/projeto-1/IMG-20220507-WA0023.jpg",
    images: [
      "./assets/moveis/projeto-1/IMG-20220507-WA0023.jpg",
      "./assets/moveis/projeto-1/IMG-20220507-WA0024.jpg",
      "./assets/moveis/projeto-1/IMG-20220507-WA0025.jpg",
      "./assets/moveis/projeto-1/IMG-20220507-WA0026.jpg"
    ]
  },
  {
    id: "projeto-2",
    title: "Apartamento Compacto",
    category: "Residencial",
    subtitle: "Integração inteligente de sala, cozinha e dormitório.",
    description: "Apartamento compacto com soluções de armazenamento vertical, nichos multifuncionais e móveis planejados para maximizar cada centímetro útil.",
    cover: "./assets/moveis/projeto-2/IMG-20220519-WA0015.jpg",
    images: [
      "./assets/moveis/projeto-2/IMG-20220519-WA0015.jpg",
      "./assets/moveis/projeto-2/IMG-20220519-WA0016.jpg",
      "./assets/moveis/projeto-2/IMG-20220519-WA0017.jpg",
      "./assets/moveis/projeto-2/IMG-20220519-WA0018.jpg"
    ]
  },
  {
    id: "projeto-3",
    title: "Ambiente Integrado",
    category: "Residencial",
    subtitle: "Cozinha, sala e lavanderia em um layout fluido.",
    description: "Projeto de ambiente integrado com móveis planejados que facilitam a transição entre áreas e mantêm a circulação ampla e organizada.",
    cover: "./assets/moveis/projeto-3/IMG-20220526-WA0004.jpg",
    images: [
      "./assets/moveis/projeto-3/IMG-20220526-WA0004.jpg",
      "./assets/moveis/projeto-3/IMG-20220526-WA0005.jpg",
      "./assets/moveis/projeto-3/IMG-20220526-WA0006.jpg",
      "./assets/moveis/projeto-3/IMG-20220526-WA0007.jpg"
    ]
  },
  {
    id: "projeto-4",
    title: "Suíte Planejada",
    category: "Residencial",
    subtitle: "Quarto e closet com organização inteligente.",
    description: "Suíte com móveis planejados para guardar roupas, acessórios e objetos pessoais, mantendo o ambiente limpo e elegante.",
    cover: "./assets/moveis/projeto-4/IMG-20220603-WA0012.jpg",
    images: [
      "./assets/moveis/projeto-4/IMG-20220603-WA0012.jpg",
      "./assets/moveis/projeto-4/IMG-20220603-WA0013.jpg",
      "./assets/moveis/projeto-4/IMG-20220603-WA0014.jpg",
      "./assets/moveis/projeto-4/IMG-20220603-WA0015.jpg"
    ]
  },
  {
    id: "projeto-5",
    title: "Cozinha Gourmet",
    category: "Residencial",
    subtitle: "Cozinha planejada com armários e bancadas funcionais.",
    description: "Cozinha com painel, nichos e bancada, projetada para facilitar o preparo de refeições e aproveitar melhor o espaço disponível.",
    cover: "./assets/moveis/projeto-5/IMG-20220615-WA0019.jpg",
    images: [
      "./assets/moveis/projeto-5/IMG-20220615-WA0019.jpg",
      "./assets/moveis/projeto-5/IMG-20220615-WA0020.jpg",
      "./assets/moveis/projeto-5/IMG-20220615-WA0021.jpg",
      "./assets/moveis/projeto-5/IMG-20220615-WA0022.jpg"
    ]
  },
  {
    id: "projeto-6",
    title: "Home Office",
    category: "Comercial",
    subtitle: "Escritório planejado para produtividade e armazenamento.",
    description: "Home office com mesa sob medida, prateleiras e gaveteiros que organizam materiais de trabalho e mantêm o ambiente funcional.",
    cover: "./assets/moveis/projeto-6/IMG-20220826-WA0022.jpg",
    images: [
      "./assets/moveis/projeto-6/IMG-20220826-WA0022.jpg",
      "./assets/moveis/projeto-6/IMG-20220826-WA0023.jpg",
      "./assets/moveis/projeto-6/IMG-20220826-WA0024.jpg",
      "./assets/moveis/projeto-6/IMG-20220826-WA0025.jpg"
    ]
  },
  {
    id: "projeto-7",
    title: "Closet Compacto",
    category: "Residencial",
    subtitle: "Closet inteligente para espaços reduzidos.",
    description: "Closet com compartimentos otimizados, gavetas e barras para roupas, pensado para manter tudo à vista sem perder estilo.",
    cover: "./assets/moveis/projeto-7/IMG-20220921-WA0023.jpg",
    images: [
      "./assets/moveis/projeto-7/IMG-20220921-WA0023.jpg",
      "./assets/moveis/projeto-7/IMG-20220921-WA0024.jpg",
      "./assets/moveis/projeto-7/IMG-20220921-WA0025.jpg"
    ]
  },
  {
    id: "projeto-8",
    title: "Sala de Estar",
    category: "Residencial",
    subtitle: "Painel e estante planejados para sala de estar.",
    description: "Sala de estar com painel para TV, estante e nichos de decoração, garantindo conforto visual e organização do espaço.",
    cover: "./assets/moveis/projeto-8/IMG-20221014-WA0012.jpg",
    images: [
      "./assets/moveis/projeto-8/IMG-20221014-WA0012.jpg",
      "./assets/moveis/projeto-8/IMG-20221014-WA0013.jpg",
      "./assets/moveis/projeto-8/IMG-20221014-WA0014.jpg",
      "./assets/moveis/projeto-8/IMG-20221014-WA0015.jpg"
    ]
  }
];

function renderProjectGrid() {
  const grid = document.getElementById("projectGrid");
  if (!grid) return;
  grid.innerHTML = projects
    .map(
      (project) => `
        <article class="project-card">
          <img src="${project.cover}" alt="${project.title}" />
          <div class="project-info">
            <span class="project-tag">${project.category}</span>
            <h3>${project.title}</h3>
            <p>${project.subtitle}</p>
            <button class="w3-button w3-white w3-border w3-round-large" onclick="openProjectModal('${project.id}')">Ver detalhes</button>
          </div>
        </article>
      `
    )
    .join("");
}

function openProjectModal(projectId) {
  const project = projects.find((project) => project.id === projectId);
  if (!project) {
    return;
  }
  document.getElementById("modalTitle").textContent = project.title;
  document.getElementById("modalDescription").textContent = project.description;
  setProjectMainImage(project.images[0], project.title);
  const thumbnails = document.getElementById("modalThumbnails");
  thumbnails.innerHTML = project.images
    .map(
      (src) => `
        <img class="project-thumb" src="${src}" alt="${project.title}" onclick="setProjectMainImage('${src}', '${project.title}')" />
      `
    )
    .join("");
  document.getElementById("projectModal").style.display = "block";
}

function closeProjectModal() {
  document.getElementById("projectModal").style.display = "none";
}

function setProjectMainImage(src, alt) {
  const mainImage = document.getElementById("modalMainImage");
  if (!mainImage) return;
  mainImage.src = src;
  mainImage.alt = alt;
}

window.addEventListener("DOMContentLoaded", renderProjectGrid);
