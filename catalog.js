/* catalog.js — o catálogo de projetos comerciais.
   Lê projects.json, monta o carrossel dos projetos em destaque, os filtros por
   setor, a grade única e o modal de case. Todos os projetos são comerciais:
   o que separa um do outro é o setor, não a prateleira. */

const INTERVALO_MS = 6000;
const TODOS = "Todos";

const Catalogo = {
  itens: [],
  slides: [],
  indice: 0,
  temporizador: null,
  semMovimento: false,
  filtro: TODOS,
  ultimoFoco: null,
};

/* Neutraliza marcação antes de interpolar dado do catálogo em HTML. */
function escapar(texto) {
  return String(texto ?? "").replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]
  );
}

/* Monta um card. O link abre o projeto; o botão de case é irmão do link,
   nunca filho, para não aninhar controle dentro de âncora. */
function montarCard(projeto) {
  const midia = projeto.image
    ? `<img src="${escapar(projeto.image)}" alt="" class="project-card__image" loading="lazy" decoding="async" />`
    : `<div class="project-card__placeholder" aria-hidden="true"><span>${escapar(projeto.title.charAt(0))}</span></div>`;

  const cliente = projeto.cliente
    ? `<span class="project-card__cliente">${escapar(projeto.cliente)}</span>`
    : "";

  const miolo = `
      <div class="project-card__media">
        ${midia}
        <span class="project-card__badge">${escapar(projeto.category)}</span>
        ${projeto.emBreve ? '<span class="project-card__soon">Em breve</span>' : ""}
      </div>
      <div class="project-card__content">
        ${cliente}
        <h3>${escapar(projeto.title)}</h3>
        <p>${escapar(projeto.description)}</p>
      </div>`;

  const alvo = projeto.emBreve
    ? `<div class="project-card__link project-card__link--soon" aria-label="${escapar(projeto.title)} — em breve">${miolo}</div>`
    : `<a href="projects/${escapar(projeto.slug)}/index.html" class="project-card__link"
           aria-label="Abrir ${escapar(projeto.title)}">${miolo}</a>`;

  const botaoCase = projeto.case
    ? `<button type="button" class="project-card__case" data-case="${escapar(projeto.slug)}">O case desse projeto</button>`
    : "";

  return `<article class="project-card${projeto.emBreve ? " project-card--soon" : ""}">${alvo}${botaoCase}</article>`;
}

/* Desenha a grade conforme o filtro ativo. */
function renderizarGrade() {
  const alvo = document.getElementById("projectsGrid");
  const lista =
    Catalogo.filtro === TODOS
      ? Catalogo.itens
      : Catalogo.itens.filter((p) => p.category === Catalogo.filtro);

  alvo.innerHTML = lista.map(montarCard).join("");
  document.getElementById("countProjetos").textContent = lista.length;
  document.getElementById("filtroResumo").textContent =
    Catalogo.filtro === TODOS
      ? `${lista.length} projetos em 8 setores`
      : `${lista.length} em ${Catalogo.filtro}`;
}

/* Desenha as pastilhas de setor, com a contagem de cada uma. */
function renderizarFiltros() {
  const alvo = document.getElementById("filtros");
  const contagem = new Map();
  Catalogo.itens.forEach((p) => contagem.set(p.category, (contagem.get(p.category) || 0) + 1));
  const setores = [...contagem.keys()].sort((a, b) => a.localeCompare(b, "pt-BR"));

  const pastilha = (rotulo, total) =>
    `<button type="button" class="filtro${rotulo === Catalogo.filtro ? " is-active" : ""}"
             data-filtro="${escapar(rotulo)}" aria-pressed="${rotulo === Catalogo.filtro}">
       ${escapar(rotulo)} <span class="filtro__n">${total}</span>
     </button>`;

  alvo.innerHTML =
    pastilha(TODOS, Catalogo.itens.length) +
    setores.map((s) => pastilha(s, contagem.get(s))).join("");
}

/* Desenha o carrossel dos projetos em destaque e liga a navegação. */
function renderizarCarrossel(destaques) {
  Catalogo.slides = destaques;
  const trilho = document.getElementById("heroTrack");
  const bolinhas = document.getElementById("heroDots");
  const secao = document.getElementById("heroCarousel");
  if (!trilho || destaques.length === 0) {
    secao?.setAttribute("hidden", "");
    return;
  }

  trilho.innerHTML = destaques
    .map(
      (p, i) => `
      <a href="projects/${escapar(p.slug)}/index.html" class="hero-carousel__slide"
         aria-label="Abrir ${escapar(p.title)}">
        <img src="${escapar(p.image)}" alt="" class="hero-carousel__image"
             ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" />
        <div class="hero-carousel__caption">
          <span class="hero-carousel__badge">${escapar(p.category)}</span>
          <h3>${escapar(p.title)}</h3>
          <p>${escapar(p.description)}</p>
        </div>
      </a>`
    )
    .join("");

  bolinhas.innerHTML = destaques
    .map(
      (p, i) =>
        `<button type="button" class="hero-carousel__dot" data-index="${i}" aria-label="Ir para ${escapar(p.title)}"></button>`
    )
    .join("");

  document.getElementById("heroPrev").addEventListener("click", () => irPara(Catalogo.indice - 1));
  document.getElementById("heroNext").addEventListener("click", () => irPara(Catalogo.indice + 1));
  bolinhas.querySelectorAll(".hero-carousel__dot").forEach((b) => {
    b.addEventListener("click", () => irPara(Number(b.dataset.index)));
  });

  secao.addEventListener("mouseenter", parar);
  secao.addEventListener("mouseleave", rodar);
  secao.addEventListener("focusin", parar);
  secao.addEventListener("focusout", rodar);
  document.addEventListener("visibilitychange", () => (document.hidden ? parar() : rodar()));

  posicionar();
  rodar();
}

function irPara(i) {
  Catalogo.indice = (i + Catalogo.slides.length) % Catalogo.slides.length;
  posicionar();
  rodar();
}

function posicionar() {
  const trilho = document.getElementById("heroTrack");
  trilho.style.transform = `translateX(-${Catalogo.indice * 100}%)`;
  document.querySelectorAll(".hero-carousel__dot").forEach((b, i) => {
    const ativo = i === Catalogo.indice;
    b.classList.toggle("is-active", ativo);
    b.setAttribute("aria-current", String(ativo));
  });
}

function parar() {
  if (Catalogo.temporizador) clearInterval(Catalogo.temporizador);
  Catalogo.temporizador = null;
}

function rodar() {
  if (Catalogo.semMovimento || Catalogo.slides.length < 2) return;
  parar();
  Catalogo.temporizador = setInterval(() => irPara(Catalogo.indice + 1), INTERVALO_MS);
}

/* Monta uma lista simples do case. */
function listaCase(titulo, itens) {
  if (!itens || itens.length === 0) return "";
  return `<div class="case-bloco">
      <h3>${escapar(titulo)}</h3>
      <ul>${itens.map((i) => `<li>${escapar(i)}</li>`).join("")}</ul>
    </div>`;
}

/* Monta a tabela antes/depois. Sem indicador, o bloco não aparece. */
function tabelaCase(indicadores) {
  if (!indicadores || indicadores.length === 0) return "";
  const linhas = indicadores
    .map(
      (i) => `<tr>
        <th scope="row">${escapar(i.rotulo)}</th>
        <td class="case-antes">${escapar(i.antes)}</td>
        <td class="case-depois">${escapar(i.depois)}</td>
      </tr>`
    )
    .join("");

  return `<div class="case-bloco case-bloco--tabela">
      <h3>Antes e depois</h3>
      <table class="case-tabela">
        <thead><tr><th scope="col">Indicador</th><th scope="col">Antes</th><th scope="col">Depois</th></tr></thead>
        <tbody>${linhas}</tbody>
      </table>
    </div>`;
}

/* Abre o modal com o case do projeto e guarda o foco de origem. */
function abrirCase(slug, origem) {
  const projeto = Catalogo.itens.find((p) => p.slug === slug);
  if (!projeto || !projeto.case) return;

  const c = projeto.case;
  Catalogo.ultimoFoco = origem || null;

  document.getElementById("modalTitulo").textContent = projeto.cliente
    ? `${projeto.title} — ${projeto.cliente}`
    : projeto.title;
  document.getElementById("modalResumo").textContent = c.resumo || "";
  document.getElementById("modalCorpo").innerHTML =
    listaCase("O problema", c.antes) +
    listaCase("O que mudou", c.depois) +
    tabelaCase(c.indicadores) +
    listaCase("Entregas", c.entregas) +
    (c.stack ? `<p class="case-stack">${c.stack.map((t) => `<span>${escapar(t)}</span>`).join("")}</p>` : "");

  const modal = document.getElementById("modalCase");
  modal.hidden = false;
  document.body.classList.add("sem-rolagem");
  modal.querySelector(".modal__fechar").focus();
}

/* Fecha o modal e devolve o foco ao botão que o abriu. */
function fecharCase() {
  const modal = document.getElementById("modalCase");
  if (modal.hidden) return;
  modal.hidden = true;
  document.body.classList.remove("sem-rolagem");
  Catalogo.ultimoFoco?.focus?.();
  Catalogo.ultimoFoco = null;
}

/* Abre e fecha o painel de contato flutuante. */
function alternarContato(forcarFechar) {
  const botao = document.getElementById("contatoBotao");
  const painel = document.getElementById("contatoPainel");
  const aberto = forcarFechar ? false : painel.hidden;
  painel.hidden = !aberto;
  botao.setAttribute("aria-expanded", String(aberto));
  document.getElementById("contato").classList.toggle("is-aberto", aberto);
}

/* Liga todos os eventos da página num lugar só. */
function ligarEventos() {
  document.getElementById("filtros").addEventListener("click", (evento) => {
    const pastilha = evento.target.closest("[data-filtro]");
    if (!pastilha) return;
    Catalogo.filtro = pastilha.dataset.filtro;
    renderizarFiltros();
    renderizarGrade();
  });

  document.getElementById("projectsGrid").addEventListener("click", (evento) => {
    const botao = evento.target.closest("[data-case]");
    if (!botao) return;
    abrirCase(botao.dataset.case, botao);
  });

  document.getElementById("modalCase").addEventListener("click", (evento) => {
    if (evento.target.closest("[data-fechar]")) fecharCase();
  });

  document.getElementById("contatoBotao").addEventListener("click", () => alternarContato());

  document.addEventListener("keydown", (evento) => {
    if (evento.key !== "Escape") return;
    fecharCase();
    alternarContato(true);
  });

  document.addEventListener("click", (evento) => {
    if (!evento.target.closest("#contato")) alternarContato(true);
  });
}

/* Ponto de partida. */
async function iniciar() {
  Catalogo.semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  try {
    const resposta = await fetch("./projects.json");
    if (!resposta.ok) throw new Error("Falha ao buscar projects.json");
    Catalogo.itens = await resposta.json();
  } catch (erro) {
    console.error("Catálogo:", erro);
    document.getElementById("projectsGrid").innerHTML =
      '<p class="grade-erro">Não foi possível carregar o catálogo. Recarregue a página.</p>';
    document.getElementById("heroCarousel")?.setAttribute("hidden", "");
    return;
  }

  renderizarCarrossel(Catalogo.itens.filter((p) => p.destaque && !p.emBreve && p.image));
  renderizarFiltros();
  renderizarGrade();
  ligarEventos();

  document.getElementById("ano").textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", iniciar);

/* Fim de catalog.js */
