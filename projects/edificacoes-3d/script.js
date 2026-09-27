/*
 * script.js · Edificações 3D.
 * Monta os cartões a partir de dados.js, filtra por categoria e busca
 * (com contagem e estado vazio), abre a galeria ampliada com setas e
 * miniaturas (imagens carregadas só quando exibidas) e liga o orçamento.
 */
document.documentElement.style.setProperty("--lt-cor", "#d9632b");

const PASTA = "./assets/google-sketchUp/imagens/";
const estado = { categoria: "Todas", busca: "" };

/* Normaliza texto para busca sem acentos. */
function normalizar(t) {
  return t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

/* Texto alternativo descritivo para cada imagem do projeto. */
function altDa(p, i) {
  const nome = p.imagens[i].toLowerCase();
  const vista = nome.includes("planta") ? "planta baixa" : nome.includes("frente") ? "vista da frente" : nome.includes("fundos") ? "vista dos fundos" : nome.includes("alto") ? "vista do alto" : nome.includes("piscina") ? "área da piscina" : nome.includes("sala") ? "sala de estar" : `imagem ${i + 1}`;
  return `Maquete 3D do projeto ${p.titulo}, ${vista}`;
}

/* Cria os botões de categoria com contagem. */
function montarCategorias() {
  const box = document.getElementById("categorias");
  const cats = ["Todas", ...new Set(PROJETOS.map((p) => p.categoria))];
  cats.forEach((c) => {
    const n = c === "Todas" ? PROJETOS.length : PROJETOS.filter((p) => p.categoria === c).length;
    const b = document.createElement("button");
    b.type = "button";
    b.className = "filtro";
    b.textContent = `${c} (${n})`;
    b.dataset.categoria = c;
    b.setAttribute("aria-pressed", String(c === estado.categoria));
    b.addEventListener("click", () => {
      estado.categoria = c;
      box.querySelectorAll(".filtro").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      desenhar();
    });
    box.appendChild(b);
  });
}

/* Desenha a grade conforme filtros; mostra estado vazio quando nada combina. */
function desenhar() {
  const grade = document.getElementById("grade");
  const termo = normalizar(estado.busca.trim());
  const lista = PROJETOS.filter(
    (p) => (estado.categoria === "Todas" || p.categoria === estado.categoria) && (!termo || normalizar(`${p.titulo} ${p.descricao} ${p.categoria} ${p.imagens.join(" ")}`).includes(termo))
  );
  const imgs = lista.reduce((s, p) => s + p.imagens.length, 0);
  document.getElementById("contagem").textContent = `${lista.length} ${lista.length === 1 ? "projeto" : "projetos"} · ${imgs} imagens`;
  grade.innerHTML = "";
  if (!lista.length) {
    const li = document.createElement("li");
    li.style.gridColumn = "1 / -1";
    grade.appendChild(li);
    LT.vazio(li, {
      titulo: "Nenhum projeto encontrado",
      texto: "Tente outra palavra ou volte para todas as categorias.",
      acao: () => {
        estado.busca = "";
        document.getElementById("busca").value = "";
        document.querySelector('.filtro[data-categoria="Todas"]').click();
      },
    });
    return;
  }
  lista.forEach((p) => {
    const li = document.createElement("li");
    li.innerHTML = `<article class="cartao">
      <button type="button" class="cartao__abrir" aria-label="Ver as ${p.imagens.length} imagens do projeto ${p.titulo}">
        <img src="${PASTA}${p.imagens[0]}" alt="${altDa(p, 0)}" loading="lazy" width="400" height="300" />
        <span class="cartao__qtd">${p.imagens.length} imagens</span>
      </button>
      <div class="cartao__corpo">
        <span class="cartao__cat">${p.categoria}</span>
        <h3>${p.titulo}</h3>
        <p>${p.descricao}</p>
        <div class="cartao__acoes"><button type="button" class="link" data-quero>Quero um parecido</button></div>
      </div>
    </article>`;
    li.querySelector(".cartao__abrir").addEventListener("click", () => abrirGaleria(p, 0));
    li.querySelector("[data-quero]").addEventListener("click", () => pedirParecido(p));
    grade.appendChild(li);
  });
}

/* Galeria ampliada: anterior/próxima, setas do teclado e miniaturas. */
function abrirGaleria(p, inicio) {
  let atual = inicio;
  const box = document.createElement("div");
  box.className = "visor";
  box.innerHTML = `<img alt="" /><div class="visor__barra"><button type="button" class="lt-botao" data-ir="-1">← Anterior</button><span aria-live="polite"></span><button type="button" class="lt-botao" data-ir="1">Próxima →</button></div><div class="visor__miniaturas"></div>`;
  const img = box.querySelector("img");
  const legenda = box.querySelector("span");
  const minis = box.querySelector(".visor__miniaturas");
  p.imagens.forEach((arq, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", `Imagem ${i + 1}`);
    b.innerHTML = `<img src="${PASTA}${arq}" alt="" loading="lazy" />`;
    b.addEventListener("click", () => ir(i - atual));
    minis.appendChild(b);
  });
  const mostrar = () => {
    img.src = PASTA + p.imagens[atual];
    img.alt = altDa(p, atual);
    legenda.textContent = `${atual + 1} de ${p.imagens.length}`;
    [...minis.children].forEach((b, i) => b.setAttribute("aria-current", String(i === atual)));
  };
  img.addEventListener("error", () => {
    legenda.textContent = `Não foi possível carregar a imagem ${atual + 1}.`;
    LT.aviso("Esta imagem não carregou. Tente a próxima.", "erro");
  });
  const ir = (d) => {
    atual = (atual + d + p.imagens.length) % p.imagens.length;
    mostrar();
  };
  box.addEventListener("click", (e) => {
    const b = e.target.closest("[data-ir]");
    if (b) ir(Number(b.dataset.ir));
  });
  mostrar();
  const d = LT.modal({ titulo: p.titulo, conteudo: box, largura: "960px" });
  d.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") ir(1);
    if (e.key === "ArrowLeft") ir(-1);
  });
}

/* Leva ao orçamento com o tipo e a referência já preenchidos. */
function pedirParecido(p) {
  const tipo = { "Residências": "Residência", "Condomínios e vilas": "Condomínio ou vila", "Interiores": "Interiores", "Móveis": "Móveis planejados" }[p.categoria];
  const form = document.getElementById("form-orcamento");
  if (form.classList.contains("lt-escondido")) {
    const recomecar = document.querySelector("#orcamento .lt-sucesso button");
    if (recomecar) recomecar.click();
  }
  form.tipo.value = tipo;
  form.mensagem.value = `Quero um projeto parecido com "${p.titulo}".`;
  document.getElementById("orcamento").scrollIntoView({ behavior: "smooth" });
  form.nome.focus({ preventScroll: true });
  LT.aviso(`Referência "${p.titulo}" adicionada ao pedido.`, "info");
}

document.getElementById("busca").addEventListener("input", (e) => {
  estado.busca = e.target.value;
  desenhar();
});
document.getElementById("form-filtros").addEventListener("submit", (e) => e.preventDefault());
document.getElementById("n-projetos").textContent = PROJETOS.length;
document.getElementById("n-imagens").textContent = PROJETOS.reduce((s, p) => s + p.imagens.length, 0);

LT.ligarFormulario(document.getElementById("form-orcamento"), {
  whatsapp: "Olá! Quero um orçamento de projeto 3D:",
  titulo: "Pedido de orçamento enviado!",
  aviso: "Pedido enviado. Respondemos pelo WhatsApp.",
});

montarCategorias();
desenhar();
/* fim de script.js */
