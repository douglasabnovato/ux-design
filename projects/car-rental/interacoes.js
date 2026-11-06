/*
 * interacoes.js · Roda Livre Locadora (Car Rental).
 * Cotação simulada: valida loja e datas (retirada a partir de amanhã e
 * devolução depois da retirada), calcula as diárias e mostra o preço de cada
 * categoria. A escolha de um carro, pela cotação ou pelo card da frota,
 * confirma a reserva pelo WhatsApp. Locadora e preços são fictícios.
 */
document.documentElement.style.setProperty("--lt-cor", "#474fa0");

const form = document.getElementById("form-cotacao");
const frota = [...document.querySelectorAll("[data-carro]")].map((box) => ({ nome: box.dataset.carro, diaria: Number(box.dataset.diaria) }));
let ultimaCotacao = null;

/* Quantidade de diárias entre duas datas (mínimo 1). */
function diarias(inicio, fim) {
  return Math.max(1, Math.round((new Date(`${fim}T12:00:00`) - new Date(`${inicio}T12:00:00`)) / 86400000));
}

/* Data no formato brasileiro. */
function dataBr(iso) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("pt-BR");
}

/* Confirma a reserva de uma categoria e abre o WhatsApp com o resumo. */
function reservar(carro) {
  const c = ultimaCotacao;
  const texto = c
    ? `Olá, Roda Livre! Quero reservar: ${carro.nome}\nRetirada: ${c.loja} em ${dataBr(c.retirada)}\nDevolução: ${dataBr(c.devolucao)}\n${c.dias} diária(s) · total ${LT.moeda(carro.diaria * c.dias)}`
    : `Olá, Roda Livre! Quero reservar: ${carro.nome} (${LT.moeda(carro.diaria)} por dia). Qual a disponibilidade?`;
  const link = LT.whatsapp(texto);
  const aberto = document.querySelector("dialog.lt-modal");
  if (aberto) aberto.close();
  LT.modal({ titulo: "Reserva pré-confirmada!", conteudo: `<p>${carro.nome} separado para você. Abrimos o WhatsApp com o resumo para a confirmação final.</p><p><a class="lt-botao lt-botao--principal" target="_blank" rel="noopener" href="${link}">Abrir WhatsApp de novo</a></p>` });
}

/* Valida o formulário de cotação e mostra os preços por categoria. */
async function cotar(e) {
  e.preventDefault();
  if (!LT.validar(form)) return;
  const dados = Object.fromEntries(new FormData(form));
  const amanha = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
  if (dados.retirada < amanha) {
    LT.marcarErro(form.retirada, "A retirada precisa ser a partir de amanhã.");
    form.retirada.focus();
    return;
  }
  if (dados.devolucao <= dados.retirada) {
    LT.marcarErro(form.devolucao, "A devolução precisa ser depois da retirada.");
    form.devolucao.focus();
    return;
  }
  const botao = form.querySelector("[type=submit]");
  LT.carregando(botao, true, "Buscando…");
  await LT.esperar(900);
  LT.carregando(botao, false);
  const dias = diarias(dados.retirada, dados.devolucao);
  ultimaCotacao = { ...dados, dias };
  const lista = document.createElement("div");
  lista.innerHTML = `<p>${dados.loja} · ${dataBr(dados.retirada)} a ${dataBr(dados.devolucao)} · ${dias} diária(s)</p><ul class="cotacao"></ul>`;
  frota.forEach((carro) => {
    const li = document.createElement("li");
    li.innerHTML = `<span><strong></strong><small></small></span><button type="button" class="lt-botao lt-botao--principal">Reservar</button>`;
    li.querySelector("strong").textContent = carro.nome;
    li.querySelector("small").textContent = `${LT.moeda(carro.diaria)}/dia · total ${LT.moeda(carro.diaria * dias)}`;
    li.querySelector("button").setAttribute("aria-label", `Reservar ${carro.nome}`);
    li.querySelector("button").addEventListener("click", () => reservar(carro));
    lista.querySelector("ul").appendChild(li);
  });
  LT.modal({ titulo: "Carros disponíveis", conteudo: lista, largura: "560px" });
}

/* Liga a cotação, os botões da frota, a newsletter e os botões de conta. */
function ligar() {
  LT.limparAoDigitar(form);
  form.addEventListener("submit", cotar);
  document.querySelectorAll("[data-alugar]").forEach((botao) => {
    const box = botao.closest("[data-carro]");
    botao.setAttribute("aria-label", `Alugar ${box.dataset.carro}`);
    botao.addEventListener("click", (e) => {
      e.preventDefault();
      reservar({ nome: box.dataset.carro, diaria: Number(box.dataset.diaria) });
    });
  });
  LT.ligarFormulario(document.querySelector(".form-news"), { titulo: "Inscrição confirmada!", texto: "Você vai receber as promoções da semana no seu e-mail.", mostrarResumo: false, aviso: "E-mail cadastrado." });
  document.querySelectorAll(".header-btn a").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      LT.aviso("Área do cliente em construção. Faça sua cotação sem cadastro logo abaixo.", "info");
      form.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });
}

ligar();
/* Fim do interacoes.js. */
