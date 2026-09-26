/*
 * interacoes.js · Fisio Saúde.
 * O botão "Agendar um horário" abre um agendamento simulado em etapas
 * (serviço, data e horário, dados) com validação, confirmação na tela e
 * mensagem pronta no WhatsApp da clínica.
 */
document.documentElement.style.setProperty("--lt-cor", "#00856f");

/* Lê os serviços da própria página para montar as opções do agendamento. */
function servicosDaClinica() {
  const nomes = [...document.querySelectorAll("#services h3")].map((h) => h.textContent.trim()).filter((n) => n && n !== "Cursos");
  return nomes.length ? nomes : ["Fisioterapia", "Pilates", "RPG"];
}

/* Liga todos os botões marcados com data-agendar ao agendamento simulado. */
function ligarAgendamento() {
  document.querySelectorAll("[data-agendar]").forEach((botao) => {
    botao.addEventListener("click", (e) => {
      e.preventDefault();
      LT.agendar({ titulo: "Agendar na Fisio Saúde", servicos: servicosDaClinica(), nomeLocal: "Fisio Saúde", rotuloServico: "Tratamento" });
    });
  });
}

ligarAgendamento();
/* Fim do interacoes.js. */
