/*
 * interacoes.js · DoctorCare.
 * Os botões "Agende sua consulta" abrem um agendamento simulado em etapas
 * (especialidade, data e horário, dados) com validação, confirmação na tela
 * e mensagem pronta no WhatsApp.
 */
document.documentElement.style.setProperty("--lt-cor", "#00856f");

/* Lê as especialidades da seção de serviços para montar as opções. */
function especialidades() {
  const nomes = [...document.querySelectorAll("#services h3")].map((h) => h.textContent.trim()).filter(Boolean);
  return nomes.length ? nomes : ["Clínica geral", "Pediatria", "Cardiologia"];
}

/* Liga todos os botões marcados com data-agendar ao agendamento simulado. */
function ligarAgendamento() {
  document.querySelectorAll("[data-agendar]").forEach((botao) => {
    botao.addEventListener("click", (e) => {
      e.preventDefault();
      LT.agendar({ titulo: "Agendar consulta", servicos: especialidades(), nomeLocal: "DoctorCare", rotuloServico: "Especialidade" });
    });
  });
}

ligarAgendamento();
/* Fim do interacoes.js. */
