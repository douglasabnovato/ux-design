/*
 * script.js · Meus Treinos.
 * Ficha ABC a partir de dados.js: abas acessíveis, séries marcáveis,
 * registro de carga com validação, cronômetro de descanso automático,
 * barra de progresso, conclusão com resumo (ou aviso das pendências),
 * progresso salvo neste navegador e agendamento de avaliação.
 */
document.documentElement.style.setProperty("--lt-cor", "#8cc21f");

const CHAVE = "meus-treinos:progresso";
let fichaAtual = "A";
let progresso = carregar();
let inicio = null;
const historico = [];

/* Lê o progresso salvo (se o navegador permitir). */
function carregar() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE)) || {};
  } catch (e) {
    return {};
  }
}

/* Salva o progresso sem quebrar quando o armazenamento está bloqueado. */
function salvar() {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(progresso));
  } catch (e) {
    /* armazenamento indisponível: o treino continua só nesta visita */
  }
}

/* Estado de uma ficha (séries marcadas e cargas). */
function estadoDa(f) {
  if (!progresso[f]) progresso[f] = { series: {}, cargas: {} };
  return progresso[f];
}

/* Cria as abas A/B/C com navegação por setas. */
function montarAbas() {
  const box = document.getElementById("abas");
  Object.keys(FICHAS).forEach((f) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "aba";
    b.id = `aba-${f}`;
    b.setAttribute("role", "tab");
    b.setAttribute("aria-controls", "painel");
    b.textContent = `Treino ${f}`;
    b.title = FICHAS[f].nome;
    b.addEventListener("click", () => abrirFicha(f));
    b.addEventListener("keydown", (e) => {
      const ks = Object.keys(FICHAS);
      const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (!d) return;
      const prox = ks[(ks.indexOf(f) + d + ks.length) % ks.length];
      abrirFicha(prox);
      document.getElementById(`aba-${prox}`).focus();
    });
    box.appendChild(b);
  });
}

/* Mostra a ficha escolhida. */
function abrirFicha(f) {
  fichaAtual = f;
  document.querySelectorAll(".aba").forEach((b) => {
    const ativa = b.id === `aba-${f}`;
    b.setAttribute("aria-selected", String(ativa));
    b.tabIndex = ativa ? 0 : -1;
  });
  document.getElementById("painel").setAttribute("aria-labelledby", `aba-${f}`);
  desenhar();
}

/* Desenha os exercícios, as séries e as cargas da ficha atual. */
function desenhar() {
  const ficha = FICHAS[fichaAtual];
  const est = estadoDa(fichaAtual);
  const lista = document.getElementById("lista");
  lista.innerHTML = "";
  ficha.exercicios.forEach((ex, i) => {
    const feitas = est.series[i] || [];
    const li = document.createElement("li");
    li.className = "exercicio" + (feitas.length === ex.series ? " feito" : "");
    li.innerHTML = `<div><h3>${ex.nome}</h3><p class="exercicio__meta">${ex.series} séries × ${ex.reps} repetições · descanso ${ex.descanso}s</p></div>
      <div class="carga"><label for="carga-${i}">Carga (kg)</label><input id="carga-${i}" name="carga-${i}" type="number" inputmode="decimal" min="0" max="500" step="0.5" value="${est.cargas[i] ?? ""}" /></div>
      <div class="series" role="group" aria-label="Séries de ${ex.nome}"></div>`;
    const grupo = li.querySelector(".series");
    for (let s = 0; s < ex.series; s++) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "serie";
      b.textContent = s + 1;
      b.setAttribute("aria-label", `${ex.nome}, série ${s + 1}`);
      b.setAttribute("aria-pressed", String(feitas.includes(s)));
      b.addEventListener("click", () => marcarSerie(i, s, ex));
      grupo.appendChild(b);
    }
    const carga = li.querySelector("input");
    carga.addEventListener("change", () => {
      const v = carga.value === "" ? null : Number(carga.value);
      if (v !== null && (isNaN(v) || v < 0 || v > 500)) {
        LT.marcarErro(carga, "Use um valor entre 0 e 500 kg.");
        return;
      }
      LT.marcarErro(carga, "");
      est.cargas[i] = v;
      salvar();
      if (v !== null) LT.aviso(`Carga de ${ex.nome}: ${v} kg registrada.`, "info", 2000);
    });
    lista.appendChild(li);
  });
  atualizarProgresso();
}

/* Marca ou desmarca uma série e dispara o descanso. */
function marcarSerie(i, s, ex) {
  const est = estadoDa(fichaAtual);
  const feitas = est.series[i] || (est.series[i] = []);
  const pos = feitas.indexOf(s);
  if (pos >= 0) feitas.splice(pos, 1);
  else {
    feitas.push(s);
    if (!inicio) inicio = Date.now();
    if (feitas.length < ex.series) iniciarDescanso(ex.descanso);
    else LT.aviso(`${ex.nome} concluído!`);
  }
  salvar();
  const foco = document.activeElement && document.activeElement.getAttribute("aria-label");
  desenhar();
  const volta = [...document.querySelectorAll(".serie")].find((b) => b.getAttribute("aria-label") === foco);
  if (volta) volta.focus();
}

/* Barra e texto de progresso da ficha. */
function atualizarProgresso() {
  const ficha = FICHAS[fichaAtual];
  const est = estadoDa(fichaAtual);
  const total = ficha.exercicios.reduce((s, e) => s + e.series, 0);
  const feitas = ficha.exercicios.reduce((s, e, i) => s + (est.series[i] || []).length, 0);
  document.getElementById("barra").style.width = `${Math.round((feitas / total) * 100)}%`;
  document.getElementById("progresso-texto").textContent = `${ficha.nome}: ${feitas} de ${total} séries feitas (${Math.round((feitas / total) * 100)}%).`;
  return { total, feitas };
}

/* Cronômetro de descanso com +15s, pular e aviso no fim. */
let timer = null;
let restante = 0;
function iniciarDescanso(seg) {
  const box = document.getElementById("cronometro");
  const tempo = document.getElementById("crono-tempo");
  restante = seg;
  box.hidden = false;
  clearInterval(timer);
  const pintar = () => (tempo.textContent = `${Math.floor(restante / 60)}:${String(restante % 60).padStart(2, "0")}`);
  pintar();
  timer = setInterval(() => {
    restante--;
    pintar();
    if (restante <= 0) {
      pararDescanso();
      LT.aviso("Descanso finalizado. Bora para a próxima série!");
      if (navigator.vibrate) navigator.vibrate(200);
    }
  }, 1000);
}

/* Esconde o cronômetro. */
function pararDescanso() {
  clearInterval(timer);
  document.getElementById("cronometro").hidden = true;
}

/* Conclui o treino: com pendências pergunta; sem pendências mostra resumo. */
function concluir() {
  const { total, feitas } = atualizarProgresso();
  if (!feitas) {
    LT.aviso("Marque pelo menos uma série antes de concluir o treino.", "erro");
    return;
  }
  const finalizar = () => {
    const ficha = FICHAS[fichaAtual];
    const est = estadoDa(fichaAtual);
    const volume = ficha.exercicios.reduce((s, e, i) => s + (est.cargas[i] || 0) * (est.series[i] || []).length * 9, 0);
    const minutos = inicio ? Math.max(1, Math.round((Date.now() - inicio) / 60000)) : 0;
    historico.unshift(`${ficha.nome} · ${feitas}/${total} séries · ${minutos} min · volume estimado ${Math.round(volume).toLocaleString("pt-BR")} kg`);
    document.getElementById("historico").innerHTML = `<h3>Treinos concluídos nesta visita</h3><ul>${historico.map((h) => `<li>${h}</li>`).join("")}</ul>`;
    progresso[fichaAtual] = { series: {}, cargas: est.cargas };
    salvar();
    pararDescanso();
    inicio = null;
    desenhar();
    LT.modal({ titulo: "Treino concluído! 💪", conteudo: `<p>${historico[0]}.</p><p>As cargas ficaram salvas para o próximo ${ficha.nome}.</p>` });
    LT.aviso("Treino registrado.");
  };
  if (feitas < total) {
    const box = document.createElement("div");
    box.innerHTML = `<p>Faltam ${total - feitas} séries. Quer concluir mesmo assim?</p>`;
    const sim = document.createElement("button");
    sim.type = "button";
    sim.className = "lt-botao lt-botao--principal";
    sim.textContent = "Concluir assim mesmo";
    const nao = document.createElement("button");
    nao.type = "button";
    nao.className = "lt-botao";
    nao.textContent = "Continuar treinando";
    box.append(sim, " ", nao);
    const d = LT.modal({ titulo: "Treino incompleto", conteudo: box });
    nao.addEventListener("click", () => d.close());
    sim.addEventListener("click", () => {
      d.close();
      finalizar();
    });
    return;
  }
  finalizar();
}

/* Liga os botões de apoio e o formulário de avaliação. */
function ligarApoio() {
  document.querySelectorAll("[data-ficha]").forEach((b) =>
    b.addEventListener("click", () => {
      abrirFicha(b.dataset.ficha);
      document.getElementById("ficha").scrollIntoView({ behavior: "smooth" });
      LT.aviso(`${FICHAS[b.dataset.ficha].nome} aberto.`, "info", 2000);
    })
  );
  document.querySelectorAll("[data-instrutor]").forEach((b) =>
    b.addEventListener("click", () => {
      LT.whatsapp(`Olá! Quero falar com ${b.dataset.instrutor} sobre a minha ficha de treino.`);
      LT.aviso(`Abrimos o WhatsApp para falar com ${b.dataset.instrutor}.`);
    })
  );
  document.getElementById("btn-concluir").addEventListener("click", concluir);
  document.getElementById("btn-zerar").addEventListener("click", () => {
    progresso[fichaAtual] = { series: {}, cargas: estadoDa(fichaAtual).cargas };
    salvar();
    pararDescanso();
    desenhar();
    LT.aviso("Séries desmarcadas. As cargas foram mantidas.", "info");
  });
  document.getElementById("crono-mais").addEventListener("click", () => (restante += 15));
  document.getElementById("crono-parar").addEventListener("click", () => {
    pararDescanso();
    LT.aviso("Descanso pulado.", "info", 1500);
  });
  const data = document.getElementById("av-data");
  const hoje = new Date();
  hoje.setMinutes(hoje.getMinutes() - hoje.getTimezoneOffset());
  data.min = hoje.toISOString().slice(0, 10);
  const form = document.getElementById("form-avaliacao");
  form.addEventListener(
    "submit",
    (e) => {
      if (data.value && data.value < data.min) {
        e.preventDefault();
        e.stopImmediatePropagation();
        LT.validar(form);
        LT.marcarErro(data, "Escolha uma data a partir de hoje.");
        data.focus();
      }
    },
    true
  );
  LT.ligarFormulario(form, { whatsapp: "Olá! Quero agendar uma avaliação física:", titulo: "Avaliação pré-agendada!", aviso: "Pedido enviado. Confirmamos pelo WhatsApp." });
}

montarAbas();
ligarApoio();
abrirFicha("A");
/* fim de script.js */
