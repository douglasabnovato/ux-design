/*
 * interacoes.js · Apresentação Coffee (Top 4 cafés da semana).
 * Cada bebida ganha "Pedir esta bebida" (mensagem pronta no WhatsApp com
 * confirmação) e o rodapé agenda uma degustação em etapas com LT.agendar.
 */
document.documentElement.style.setProperty("--lt-cor", "#b8860b");

const bebidas = [...document.querySelectorAll(".coffee-bean-item")].map((item) => {
  const nome = item.querySelector("h1").textContent.trim();
  const botao = document.createElement("button");
  botao.type = "button";
  botao.className = "pedir-item";
  botao.textContent = "Pedir esta bebida";
  botao.setAttribute("aria-label", `Pedir ${nome}`);
  botao.addEventListener("click", () => {
    LT.whatsapp(`Olá! Vi a apresentação Top 4 cafés e quero pedir: ${nome}.`);
    LT.aviso(`Pedido de ${nome} pronto no WhatsApp.`);
  });
  item.querySelector("article").appendChild(botao);
  return nome;
});

document.querySelector("[data-degustacao]").addEventListener("click", () =>
  LT.agendar({ titulo: "Agendar degustação", servicos: bebidas.map((b) => `Degustação · ${b}`), nomeLocal: "nossa cafeteria", rotuloServico: "Bebida" })
);
/* fim de interacoes.js */
