/*
 * interacoes.js · Apresentação Store (ABC CRM · Passo a passo).
 * Busca no índice de tarefas: filtra a lista e as seções do portal,
 * mostra quantas tarefas combinam e um estado vazio com ação de limpar.
 */
document.documentElement.style.setProperty("--lt-cor", "#1f2a44");

/* Normaliza texto para comparar sem acentos nem maiúsculas. */
function normalizar(texto) {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

/* Liga o campo de busca à lista de tarefas e às seções correspondentes. */
function ligarBusca() {
  const form = document.getElementById("busca-portal");
  const campo = document.getElementById("busca-termo");
  const status = document.getElementById("busca-status");
  const lista = document.querySelector("#description ol");
  const itens = [...lista.querySelectorAll("li")];
  const secoes = [...document.querySelectorAll(".all-projects")];
  const caixaVazio = document.createElement("div");
  lista.after(caixaVazio);
  const aplicar = () => {
    const termo = normalizar(campo.value.trim());
    let n = 0;
    itens.forEach((li) => {
      const alvo = li.querySelector("a").getAttribute("href");
      const secao = document.querySelector(alvo);
      const texto = normalizar(li.textContent + " " + (secao ? secao.textContent : ""));
      const ok = !termo || texto.includes(termo);
      li.hidden = !ok;
      if (secao) secao.hidden = !ok;
      if (ok) n++;
    });
    secoes.forEach((s) => {
      if (!itens.some((li) => li.querySelector("a").getAttribute("href") === `#${s.id}`)) s.hidden = !!termo && !normalizar(s.textContent).includes(termo);
    });
    caixaVazio.innerHTML = "";
    status.textContent = termo ? `${n} de ${itens.length} tarefas encontradas.` : "";
    if (termo && !n) {
      LT.vazio(caixaVazio, {
        titulo: "Nenhuma tarefa encontrada",
        texto: `Não há tarefas com "${campo.value.trim()}". Tente NPS, WhatsApp ou LPs.`,
        rotuloAcao: "Limpar busca",
        acao: () => {
          campo.value = "";
          aplicar();
          campo.focus();
        },
      });
    }
  };
  campo.addEventListener("input", aplicar);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const primeiro = itens.find((li) => !li.hidden);
    if (primeiro && campo.value.trim()) document.querySelector(primeiro.querySelector("a").getAttribute("href")).scrollIntoView({ behavior: "smooth" });
  });
}

ligarBusca();
/* fim de interacoes.js */
