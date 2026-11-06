/*
 * interacoes.js · Volta Express (Transportation).
 * Lado do motorista: busca fretes pela cidade, data e veículo, destaca as
 * ofertas compatíveis (ou mostra que não há nenhuma), e o aceite de um frete
 * pede a placa e o WhatsApp antes de confirmar. Os fretes são de exemplo.
 */
document.documentElement.style.setProperty("--lt-cor", "#ff7e33");

const form = document.getElementById("form-busca");
const cards = [...document.querySelectorAll("[data-frete]")];

/* Remove acentos e caixa para comparar cidades. */
function normal(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

/* Busca fretes que saem da cidade informada e destaca os resultados. */
async function buscar(e) {
  e.preventDefault();
  if (!LT.validar(form)) return;
  const hoje = new Date().toISOString().slice(0, 10);
  if (form.data.value < hoje) {
    LT.marcarErro(form.data, "Escolha hoje ou uma data futura.");
    form.data.focus();
    return;
  }
  const botao = form.querySelector("[type=submit]");
  LT.carregando(botao, true, "Buscando…");
  await LT.esperar(800);
  LT.carregando(botao, false);
  const cidade = normal(form.cidade.value);
  const achados = cards.filter((card) => normal(card.dataset.origem).includes(cidade));
  cards.forEach((card) => card.classList.toggle("lt-destaque", achados.includes(card)));
  if (!achados.length) {
    LT.aviso(`Nenhum frete saindo de "${form.cidade.value}" agora. Mostramos todas as ofertas; ative o alerta por e-mail no fim da página.`, "info", 6000);
    document.getElementById("services").scrollIntoView({ behavior: "smooth" });
    return;
  }
  LT.aviso(`${achados.length} frete(s) saindo de ${form.cidade.value}. Destacamos na lista.`, "sucesso");
  achados[0].scrollIntoView({ behavior: "smooth", block: "center" });
}

/* Abre o aceite de um frete com placa e WhatsApp do motorista. */
function aceitar(card) {
  const f = document.createElement("form");
  f.setAttribute("novalidate", "");
  f.innerHTML = `<p><strong>${card.dataset.frete}</strong><br>${card.dataset.origem} → ${card.dataset.destino} · retirada ${card.dataset.data} · ${LT.moeda(card.dataset.valor)}</p>
    <label class="lt-campo">Seu nome <input type="text" name="nome" autocomplete="name" minlength="3" required></label>
    <label class="lt-campo">Placa do veículo <input type="text" name="placa" required pattern="[A-Za-z]{3}-?[0-9][A-Za-z0-9][0-9]{2}" title="Use o formato ABC1D23 ou ABC-1234." placeholder="ABC1D23"></label>
    <label class="lt-campo">WhatsApp <input type="tel" name="telefone" autocomplete="tel" required placeholder="(32) 98836-7667"></label>
    <button type="submit" class="lt-botao lt-botao--principal">Aceitar frete</button>`;
  LT.ligarFormulario(f, {
    whatsapp: `Olá, Volta Express! Quero o frete "${card.dataset.frete}" (${card.dataset.origem} → ${card.dataset.destino}, ${card.dataset.data}).`,
    titulo: "Frete reservado para você!",
    texto: "O remetente recebeu seu aceite. Abrimos o WhatsApp para combinar a retirada.",
    aviso: "Aceite enviado.",
    textoCarregando: "Reservando…",
  });
  LT.modal({ titulo: "Aceitar frete", conteudo: f });
}

/* Liga busca, aceite, newsletter e botões de conta. */
function ligar() {
  LT.limparAoDigitar(form);
  form.addEventListener("submit", buscar);
  cards.forEach((card) => {
    const botao = card.querySelector("[data-aceitar]");
    botao.setAttribute("aria-label", `Quero o frete ${card.dataset.frete}`);
    botao.addEventListener("click", (e) => {
      e.preventDefault();
      aceitar(card);
    });
  });
  LT.ligarFormulario(document.querySelector(".form-news"), { titulo: "Alerta ativado!", texto: "Avisamos por e-mail quando surgir frete na sua rota.", mostrarResumo: false, aviso: "E-mail cadastrado." });
  document.querySelectorAll(".header-btn a").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      LT.aviso("Cadastro de motorista em breve. Você já pode buscar e aceitar fretes nesta página.", "info");
    });
  });
}

ligar();
/* Fim do interacoes.js. */
