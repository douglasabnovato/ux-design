/*
 * script.js · Blog Devs (Rocket Blog).
 * Busca nos artigos com contagem e estado vazio, leitura do artigo em
 * janela modal, guia "Veja mais" com checklist e seção Sobre.
 */
document.documentElement.style.setProperty("--lt-cor", "#9e6dc2");

const artigos = [...document.querySelectorAll(".artigo")];

/* Normaliza texto para busca sem acento e sem maiúsculas. */
function normalizar(texto) {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

/* Filtra os artigos e mostra o estado vazio quando nada combina. */
function buscar(termo) {
  const alvo = normalizar(termo.trim());
  let n = 0;
  artigos.forEach((a) => {
    const ok = !alvo || normalizar(`${a.textContent} ${a.dataset.tags}`).includes(alvo);
    a.hidden = !ok;
    if (ok) n++;
  });
  const status = document.getElementById("busca-status");
  const vazio = document.getElementById("vazio-busca");
  vazio.innerHTML = "";
  status.textContent = alvo ? `${n} ${n === 1 ? "artigo encontrado" : "artigos encontrados"} para "${termo.trim()}".` : "";
  if (alvo && !n) {
    LT.vazio(vazio, {
      titulo: "Nenhum artigo encontrado",
      texto: "Tente termos como React, carreira, HTML ou mobile.",
      rotuloAcao: "Limpar busca",
      acao: () => {
        document.getElementById("busca").value = "";
        buscar("");
        document.getElementById("busca").focus();
      },
    });
  }
  if (alvo) document.getElementById("posts").scrollIntoView({ behavior: "smooth" });
}

/* Abre o artigo completo em uma janela. */
function lerArtigo(a) {
  const titulo = a.querySelector(".titulo").textContent.trim();
  const box = document.createElement("div");
  box.innerHTML = `<p><small>${a.querySelector("time").textContent}</small></p><p>${a.querySelector(".texto").textContent}</p>
    <p>Este é um resumo de demonstração. No blog completo, o artigo traz exemplos de código, exercícios e links de referência.</p>`;
  LT.modal({ titulo, conteudo: box, largura: "640px" });
}

document.getElementById("form-busca").addEventListener("submit", (e) => {
  e.preventDefault();
  const termo = document.getElementById("busca").value;
  if (!termo.trim()) {
    LT.aviso("Digite um termo para buscar, como React ou carreira.", "info");
    return;
  }
  buscar(termo);
});
document.getElementById("busca").addEventListener("input", (e) => {
  if (!e.target.value.trim()) buscar("");
});

artigos.forEach((a) =>
  a.querySelector(".artigo__link").addEventListener("click", (e) => {
    e.preventDefault();
    lerArtigo(a);
  })
);

document.getElementById("btn-guia").addEventListener("click", () =>
  LT.modal({
    titulo: "Guia DEV 2026 em 12 semanas",
    conteudo: `<ol><li>Semanas 1–3: fundamentos de HTML, CSS e JavaScript.</li><li>Semanas 4–6: um framework (React ou Vue) e consumo de APIs.</li><li>Semanas 7–9: dois projetos de portfólio com README.</li><li>Semanas 10–12: currículo, LinkedIn e simulações de entrevista.</li></ol>`,
  })
);

document.querySelector("[data-sobre]").addEventListener("click", (e) => {
  e.preventDefault();
  LT.modal({ titulo: "Sobre o Blog Devs", conteudo: "<p>Artigos curtos sobre carreira e desenvolvimento, escritos para quem está começando ou mudando de área.</p>" });
});
/* fim de script.js */
