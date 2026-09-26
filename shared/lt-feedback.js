/*
 * lt-feedback.js · respostas de interface compartilhadas do catálogo UX Design.
 * Carregado por ../../shared/lt-feedback.js antes do script de cada projeto.
 * Expõe window.LT com: aviso flutuante (toast), validação de formulário com
 * mensagem por campo, estado de carregando, cartão de sucesso, estado vazio,
 * janela modal acessível, envio para WhatsApp, sacola de compras e
 * agendamento simulado. Nada é enviado a servidor: tudo é demonstração.
 */
(function () {
  "use strict";

  const NUMERO_WHATSAPP = "5532988367667";
  const MENSAGENS = {
    obrigatorio: "Preencha este campo.",
    escolha: "Escolha uma opção.",
    email: "Informe um e-mail válido, como nome@dominio.com.",
    telefone: "Informe um telefone com DDD, como (32) 98836-7667.",
    minimo: (n) => `Use pelo menos ${n} caracteres.`,
    formato: "Confira o formato deste campo.",
    numero: "Informe um número válido.",
  };

  /* Cria (uma vez) a região que o leitor de tela anuncia e onde os avisos aparecem. */
  function regiaoAvisos() {
    let regiao = document.querySelector(".lt-avisos");
    if (!regiao) {
      regiao = document.createElement("div");
      regiao.className = "lt-avisos";
      regiao.setAttribute("role", "status");
      regiao.setAttribute("aria-live", "polite");
      document.body.appendChild(regiao);
    }
    return regiao;
  }

  /* Mostra um aviso flutuante de sucesso, erro ou informação que some sozinho. */
  function aviso(texto, tipo = "sucesso", tempo = 4200) {
    const regiao = regiaoAvisos();
    const item = document.createElement("div");
    item.className = `lt-aviso lt-aviso--${tipo}`;
    const icone = { sucesso: "✓", erro: "!", info: "i" }[tipo] || "i";
    item.innerHTML = `<span class="lt-aviso__icone" aria-hidden="true">${icone}</span><span class="lt-aviso__texto"></span>`;
    item.querySelector(".lt-aviso__texto").textContent = texto;
    regiao.appendChild(item);
    requestAnimationFrame(() => item.classList.add("lt-aviso--visivel"));
    setTimeout(() => {
      item.classList.remove("lt-aviso--visivel");
      setTimeout(() => item.remove(), 300);
    }, tempo);
    return item;
  }

  /* Liga ou desliga o estado de carregando de um botão, preservando o texto original. */
  function carregando(botao, ativo, texto = "Enviando…") {
    if (!botao) return;
    if (ativo) {
      botao.dataset.ltTexto = botao.innerHTML;
      botao.innerHTML = `<span class="lt-giro" aria-hidden="true"></span>${texto}`;
      botao.disabled = true;
      botao.setAttribute("aria-busy", "true");
    } else {
      if (botao.dataset.ltTexto) botao.innerHTML = botao.dataset.ltTexto;
      botao.disabled = false;
      botao.removeAttribute("aria-busy");
    }
  }

  /* Espera alguns milissegundos para simular a resposta de um servidor. */
  function esperar(ms = 900) {
    return new Promise((ok) => setTimeout(ok, ms));
  }

  /* Devolve o texto do rótulo de um campo (label, aria-label, placeholder ou name). */
  function rotulo(campo) {
    if (campo.id) {
      const por = document.querySelector(`label[for="${CSS.escape(campo.id)}"]`);
      if (por) return por.textContent.replace(/\s+/g, " ").replace(/\*/g, "").trim();
    }
    const pai = campo.closest("label");
    if (pai) {
      const copia = pai.cloneNode(true);
      copia.querySelectorAll("input,select,textarea,.lt-erro-campo").forEach((n) => n.remove());
      const t = copia.textContent.replace(/\s+/g, " ").replace(/\*/g, "").trim();
      if (t) return t;
    }
    return campo.getAttribute("aria-label") || campo.placeholder || campo.name || "Campo";
  }

  /* Escreve (ou remove) a mensagem de erro logo abaixo do campo e marca aria-invalid. */
  function marcarErro(campo, mensagem) {
    const alvo = campo.type === "radio" || campo.type === "checkbox"
      ? campo.closest("fieldset, .lt-grupo, [role=radiogroup]") || campo.parentElement
      : campo;
    const irmao = alvo.nextElementSibling;
    const ancora = irmao && (irmao.tagName === "LABEL" || irmao.tagName === "IMG" || irmao.tagName === "I" || irmao.tagName === "BUTTON") ? alvo.parentElement : alvo;
    let caixa = ancora.parentElement.querySelector(`.lt-erro-campo[data-para="${CSS.escape(campo.name || campo.id)}"]`);
    if (!mensagem) {
      campo.removeAttribute("aria-invalid");
      if (caixa) caixa.remove();
      return;
    }
    campo.setAttribute("aria-invalid", "true");
    if (!caixa) {
      caixa = document.createElement("span");
      caixa.className = "lt-erro-campo";
      caixa.dataset.para = campo.name || campo.id;
      caixa.id = `lt-erro-${(campo.name || campo.id || Math.random().toString(36).slice(2)).replace(/\W/g, "")}`;
      ancora.insertAdjacentElement("afterend", caixa);
    }
    caixa.textContent = mensagem;
    campo.setAttribute("aria-describedby", caixa.id);
  }

  /* Decide a mensagem de erro de um campo, ou "" quando ele está válido. */
  function erroDoCampo(campo, form) {
    const valor = (campo.value || "").trim();
    const obrigatorio = campo.required || campo.dataset.obrigatorio === "true";
    if (campo.type === "radio" || campo.type === "checkbox") {
      if (!obrigatorio) return "";
      const grupo = form.querySelectorAll(`[name="${CSS.escape(campo.name)}"]`);
      return [...grupo].some((c) => c.checked) ? "" : MENSAGENS.escolha;
    }
    if (!valor) return obrigatorio ? (campo.tagName === "SELECT" ? MENSAGENS.escolha : MENSAGENS.obrigatorio) : "";
    if (campo.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor)) return MENSAGENS.email;
    if (campo.type === "tel" && valor.replace(/\D/g, "").length < 10) return MENSAGENS.telefone;
    if (campo.type === "number" && Number.isNaN(Number(valor))) return MENSAGENS.numero;
    const minimo = Number(campo.getAttribute("minlength") || 0);
    if (minimo && valor.length < minimo) return MENSAGENS.minimo(minimo);
    if (campo.pattern && !new RegExp(`^(?:${campo.pattern})$`).test(valor)) return campo.title || MENSAGENS.formato;
    return "";
  }

  /* Valida os campos visíveis de um formulário (ou de um trecho dele) e foca o primeiro erro. */
  function validar(form, escopo = form) {
    const visivel = (c) => c.offsetParent !== null || ((c.type === "radio" || c.type === "checkbox") && c.closest("label") && c.closest("label").offsetParent !== null);
    const campos = [...escopo.querySelectorAll("input, select, textarea")].filter(
      (c) => !c.disabled && c.type !== "hidden" && c.type !== "submit" && c.type !== "button" && visivel(c)
    );
    const vistos = new Set();
    let primeiro = null;
    campos.forEach((campo) => {
      if ((campo.type === "radio" || campo.type === "checkbox") && vistos.has(campo.name)) return;
      if (campo.type === "radio" || campo.type === "checkbox") vistos.add(campo.name);
      const msg = erroDoCampo(campo, form);
      marcarErro(campo, msg);
      if (msg && !primeiro) primeiro = campo;
    });
    if (primeiro) {
      primeiro.focus({ preventScroll: false });
      aviso("Revise os campos marcados para continuar.", "erro");
      return false;
    }
    return true;
  }

  /* Limpa o erro de um campo assim que a pessoa começa a corrigi-lo. */
  function limparAoDigitar(form) {
    const limpar = (e) => {
      const c = e.target;
      if (c && c.getAttribute && c.getAttribute("aria-invalid") === "true" && !erroDoCampo(c, form)) marcarErro(c, "");
    };
    form.addEventListener("input", limpar);
    form.addEventListener("change", limpar);
  }

  /* Monta o resumo "Rótulo: valor" de todos os campos preenchidos do formulário. */
  function resumo(form) {
    const linhas = [];
    const vistos = new Set();
    form.querySelectorAll("input, select, textarea").forEach((c) => {
      if (["hidden", "submit", "button", "password"].includes(c.type)) return;
      if (c.type === "radio" || c.type === "checkbox") {
        if (vistos.has(c.name)) return;
        vistos.add(c.name);
        const marcados = [...form.querySelectorAll(`[name="${CSS.escape(c.name)}"]:checked`)].map((m) => m.value);
        if (marcados.length) linhas.push(`${rotuloGrupo(c)}: ${marcados.join(", ")}`);
        return;
      }
      const v = c.tagName === "SELECT" ? (c.selectedOptions[0] ? c.selectedOptions[0].textContent.trim() : "") : c.value.trim();
      if (v && !(c.tagName === "SELECT" && !c.value)) linhas.push(`${rotulo(c)}: ${v}`);
    });
    return linhas.join("\n");
  }

  /* Rótulo de um grupo de rádios ou caixas: legend do fieldset ou o name. */
  function rotuloGrupo(campo) {
    const fs = campo.closest("fieldset");
    const lg = fs && fs.querySelector("legend");
    return lg ? lg.textContent.trim() : campo.name;
  }

  /* Abre o WhatsApp com a mensagem e devolve o link usado. */
  function whatsapp(texto, { abrir = true, numero = NUMERO_WHATSAPP } = {}) {
    const link = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
    if (abrir) window.open(link, "_blank", "noopener");
    return link;
  }

  /* Troca o conteúdo de um contêiner por um cartão de sucesso com ação de recomeçar. */
  function sucesso(alvo, { titulo, texto, detalhe, link, rotuloLink = "Abrir WhatsApp", aoRecomecar, rotuloRecomecar = "Fazer outro envio" }) {
    const cartao = document.createElement("div");
    cartao.className = "lt-sucesso";
    cartao.setAttribute("role", "status");
    cartao.setAttribute("tabindex", "-1");
    cartao.innerHTML = `<span class="lt-sucesso__marca" aria-hidden="true">✓</span><h3 class="lt-sucesso__titulo"></h3><p class="lt-sucesso__texto"></p>`;
    cartao.querySelector(".lt-sucesso__titulo").textContent = titulo;
    cartao.querySelector(".lt-sucesso__texto").textContent = texto;
    if (detalhe) {
      const pre = document.createElement("pre");
      pre.className = "lt-sucesso__detalhe";
      pre.textContent = detalhe;
      cartao.appendChild(pre);
    }
    const acoes = document.createElement("div");
    acoes.className = "lt-sucesso__acoes";
    if (link) {
      const a = document.createElement("a");
      a.className = "lt-botao lt-botao--principal";
      a.href = link;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = rotuloLink;
      acoes.appendChild(a);
    }
    if (aoRecomecar) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "lt-botao";
      b.textContent = rotuloRecomecar;
      b.addEventListener("click", () => {
        cartao.remove();
        alvo.hidden = false;
        alvo.classList.remove("lt-escondido");
        aoRecomecar();
      });
      acoes.appendChild(b);
    }
    cartao.appendChild(acoes);
    alvo.hidden = true;
    alvo.classList.add("lt-escondido");
    alvo.insertAdjacentElement("afterend", cartao);
    cartao.focus();
    return cartao;
  }

  /* Liga um formulário ao fluxo completo: validar, carregar, confirmar e (opcional) WhatsApp. */
  function ligarFormulario(form, opcoes = {}) {
    if (!form || form.dataset.ltLigado) return;
    form.dataset.ltLigado = "1";
    form.setAttribute("novalidate", "");
    limparAoDigitar(form);
    form.addEventListener(
      "submit",
      async (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        if (!validar(form)) return;
        const botao = form.querySelector("[type=submit], button:not([type=button])");
        carregando(botao, true, opcoes.textoCarregando || "Enviando…");
        await esperar(opcoes.espera || 900);
        carregando(botao, false);
        const detalhe = resumo(form);
        let link = null;
        if (opcoes.whatsapp) {
          const intro = opcoes.whatsapp === true ? "Olá! Vim pelo site e preenchi o formulário:" : opcoes.whatsapp;
          link = whatsapp(`${intro}\n\n${detalhe}`);
        }
        if (typeof opcoes.aoEnviar === "function") opcoes.aoEnviar(form, detalhe);
        sucesso(opcoes.alvo || form, {
          titulo: opcoes.titulo || "Recebemos o seu pedido!",
          texto: opcoes.texto || (link ? "Abrimos o WhatsApp com a sua mensagem pronta. Se ele não abriu, use o botão abaixo." : "Em breve entraremos em contato."),
          detalhe: opcoes.mostrarResumo === false ? "" : detalhe,
          link,
          aoRecomecar: () => {
            form.reset();
            if (typeof opcoes.aoRecomecar === "function") opcoes.aoRecomecar(form);
            const primeiro = form.querySelector("input, select, textarea");
            if (primeiro) primeiro.focus();
          },
        });
        aviso(opcoes.aviso || "Envio concluído com sucesso.", "sucesso");
      },
      true
    );
  }

  /* Coloca um estado vazio amigável dentro de um contêiner de lista. */
  function vazio(container, { titulo = "Nada por aqui ainda", texto = "", acao, rotuloAcao = "Limpar filtros" } = {}) {
    container.innerHTML = "";
    const box = document.createElement("div");
    box.className = "lt-vazio";
    box.setAttribute("role", "status");
    box.innerHTML = `<span class="lt-vazio__icone" aria-hidden="true">○</span><p class="lt-vazio__titulo"></p><p class="lt-vazio__texto"></p>`;
    box.querySelector(".lt-vazio__titulo").textContent = titulo;
    box.querySelector(".lt-vazio__texto").textContent = texto;
    if (acao) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "lt-botao";
      b.textContent = rotuloAcao;
      b.addEventListener("click", acao);
      box.appendChild(b);
    }
    container.appendChild(box);
    return box;
  }

  /* Abre uma janela modal acessível (dialog nativo) e devolve o elemento. */
  function modal({ titulo, conteudo, largura = "520px", aoFechar } = {}) {
    const d = document.createElement("dialog");
    d.className = "lt-modal";
    d.style.setProperty("--lt-modal-largura", largura);
    const idTitulo = `lt-modal-t-${Math.random().toString(36).slice(2, 8)}`;
    d.setAttribute("aria-labelledby", idTitulo);
    d.innerHTML = `<div class="lt-modal__topo"><h2 class="lt-modal__titulo" id="${idTitulo}"></h2><button type="button" class="lt-modal__fechar" aria-label="Fechar">×</button></div><div class="lt-modal__corpo"></div>`;
    d.querySelector(".lt-modal__titulo").textContent = titulo || "";
    const corpo = d.querySelector(".lt-modal__corpo");
    if (typeof conteudo === "string") corpo.innerHTML = conteudo;
    else if (conteudo) corpo.appendChild(conteudo);
    const origem = document.activeElement;
    const fechar = () => d.close();
    d.querySelector(".lt-modal__fechar").addEventListener("click", fechar);
    d.addEventListener("click", (e) => {
      if (e.target === d) fechar();
    });
    d.addEventListener("close", () => {
      d.remove();
      if (origem && origem.focus) origem.focus();
      if (aoFechar) aoFechar();
    });
    document.body.appendChild(d);
    d.showModal();
    return d;
  }

  /* Formata um número como moeda brasileira. */
  function moeda(valor) {
    return Number(valor || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  /* Sacola de compras simulada: botão flutuante, gaveta lateral, quantidades e pedido. */
  function criarSacola({ nomeLoja = "Loja", botaoExistente = null, contador = null, aoMudar } = {}) {
    const itens = new Map();
    let botao = botaoExistente;
    if (!botao) {
      botao = document.createElement("button");
      botao.type = "button";
      botao.className = "lt-sacola-botao";
      botao.innerHTML = `<span aria-hidden="true">🛍</span><span class="lt-sacola-botao__texto">Sacola</span><span class="lt-sacola-botao__qtd">0</span>`;
      document.body.appendChild(botao);
    }
    botao.setAttribute("aria-haspopup", "dialog");
    const gaveta = document.createElement("aside");
    gaveta.className = "lt-gaveta";
    gaveta.setAttribute("aria-label", "Sacola de compras");
    gaveta.setAttribute("aria-hidden", "true");
    gaveta.innerHTML = `<div class="lt-gaveta__painel" role="dialog" aria-modal="true" aria-label="Sua sacola">
      <div class="lt-gaveta__topo"><h2>Sua sacola</h2><button type="button" class="lt-modal__fechar" aria-label="Fechar sacola">×</button></div>
      <ul class="lt-gaveta__lista"></ul>
      <div class="lt-gaveta__rodape"><p class="lt-gaveta__total">Total: <strong>R$ 0,00</strong></p>
      <button type="button" class="lt-botao lt-botao--principal lt-gaveta__finalizar">Finalizar pedido</button></div></div>`;
    document.body.appendChild(gaveta);
    const lista = gaveta.querySelector(".lt-gaveta__lista");
    const total = () => [...itens.values()].reduce((s, i) => s + i.preco * i.qtd, 0);
    const quantidade = () => [...itens.values()].reduce((s, i) => s + i.qtd, 0);

    /* Redesenha a lista, o total e os contadores da sacola. */
    function desenhar() {
      lista.innerHTML = "";
      if (!itens.size) {
        vazio(lista, { titulo: "Sua sacola está vazia", texto: "Adicione itens do cardápio para montar o pedido." });
      }
      itens.forEach((i, id) => {
        const li = document.createElement("li");
        li.className = "lt-gaveta__item";
        li.innerHTML = `<div class="lt-gaveta__info"><strong></strong><span></span></div>
          <div class="lt-gaveta__qtd"><button type="button" aria-label="Diminuir">−</button><output aria-live="polite"></output><button type="button" aria-label="Aumentar">+</button></div>
          <button type="button" class="lt-gaveta__remover">Remover</button>`;
        li.querySelector("strong").textContent = i.nome;
        li.querySelector(".lt-gaveta__info span").textContent = moeda(i.preco * i.qtd);
        li.querySelector("output").textContent = i.qtd;
        const [menos, mais] = li.querySelectorAll(".lt-gaveta__qtd button");
        menos.setAttribute("aria-label", `Diminuir ${i.nome}`);
        mais.setAttribute("aria-label", `Aumentar ${i.nome}`);
        li.querySelector(".lt-gaveta__remover").setAttribute("aria-label", `Remover ${i.nome}`);
        menos.addEventListener("click", () => mudar(id, -1));
        mais.addEventListener("click", () => mudar(id, 1));
        li.querySelector(".lt-gaveta__remover").addEventListener("click", () => {
          itens.delete(id);
          aviso(`${i.nome} removido da sacola.`, "info");
          desenhar();
        });
        lista.appendChild(li);
      });
      gaveta.querySelector(".lt-gaveta__total strong").textContent = moeda(total());
      gaveta.querySelector(".lt-gaveta__finalizar").disabled = !itens.size;
      const q = quantidade();
      const qtdBotao = botao.querySelector(".lt-sacola-botao__qtd");
      if (qtdBotao) qtdBotao.textContent = q;
      if (contador) contador.textContent = q;
      botao.setAttribute("aria-label", `Abrir sacola, ${q} ${q === 1 ? "item" : "itens"}`);
      if (aoMudar) aoMudar(q, total());
    }

    /* Soma ou subtrai uma unidade de um item; zera remove. */
    function mudar(id, delta) {
      const i = itens.get(id);
      if (!i) return;
      i.qtd += delta;
      if (i.qtd <= 0) itens.delete(id);
      desenhar();
    }

    /* Abre a gaveta e leva o foco para ela. */
    function abrir() {
      gaveta.classList.add("lt-gaveta--aberta");
      gaveta.setAttribute("aria-hidden", "false");
      gaveta.querySelector(".lt-modal__fechar").focus();
    }

    /* Fecha a gaveta e devolve o foco ao botão da sacola. */
    function fechar() {
      gaveta.classList.remove("lt-gaveta--aberta");
      gaveta.setAttribute("aria-hidden", "true");
      botao.focus();
    }

    botao.addEventListener("click", (e) => {
      e.preventDefault();
      abrir();
    });
    gaveta.querySelector(".lt-modal__fechar").addEventListener("click", fechar);
    gaveta.addEventListener("click", (e) => {
      if (e.target === gaveta) fechar();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && gaveta.classList.contains("lt-gaveta--aberta")) fechar();
    });
    gaveta.querySelector(".lt-gaveta__finalizar").addEventListener("click", async (e) => {
      const b = e.currentTarget;
      carregando(b, true, "Enviando pedido…");
      await esperar(900);
      carregando(b, false);
      const linhas = [...itens.values()].map((i) => `${i.qtd}x ${i.nome} — ${moeda(i.preco * i.qtd)}`);
      const texto = `Olá, ${nomeLoja}! Quero fazer este pedido:\n\n${linhas.join("\n")}\n\nTotal: ${moeda(total())}`;
      const link = whatsapp(texto);
      itens.clear();
      desenhar();
      fechar();
      const d = modal({ titulo: "Pedido enviado!", conteudo: `<p class="lt-sucesso__texto">Abrimos o WhatsApp com o seu pedido pronto para ${nomeLoja}. É só confirmar o envio por lá.</p><p><a class="lt-botao lt-botao--principal" target="_blank" rel="noopener" href="${link}">Abrir WhatsApp de novo</a></p>` });
      d.querySelector("a").focus();
    });
    desenhar();

    return {
      /* Adiciona um item (ou soma uma unidade) e confirma com aviso. */
      adicionar(item) {
        const id = String(item.id || item.nome);
        const atual = itens.get(id);
        if (atual) atual.qtd += 1;
        else itens.set(id, { nome: item.nome, preco: Number(item.preco) || 0, qtd: 1 });
        desenhar();
        aviso(`${item.nome} adicionado à sacola.`, "sucesso", 2600);
        botao.classList.remove("lt-pulso");
        void botao.offsetWidth;
        botao.classList.add("lt-pulso");
      },
      abrir,
      fechar,
      quantidade,
      total,
    };
  }

  /* Agendamento simulado em etapas: serviço, data, horário e contato, com confirmação. */
  function agendar({ titulo = "Agendar horário", servicos = [], nomeLocal = "", rotuloServico = "Serviço" } = {}) {
    const hoje = new Date();
    const min = new Date(hoje.getTime() + 86400000).toISOString().slice(0, 10);
    const form = document.createElement("form");
    form.className = "lt-agenda";
    form.setAttribute("novalidate", "");
    form.innerHTML = `
      <ol class="lt-agenda__passos" aria-label="Etapas"><li class="ativo">Serviço</li><li>Data e horário</li><li>Seus dados</li></ol>
      <fieldset class="lt-agenda__etapa" data-etapa="1"><legend>${rotuloServico}</legend>
        <div class="lt-agenda__opcoes">${servicos.map((s, i) => `<label class="lt-opcao"><input type="radio" name="servico" value="${s}" required ${i === 0 ? "" : ""}> <span>${s}</span></label>`).join("")}</div>
      </fieldset>
      <fieldset class="lt-agenda__etapa" data-etapa="2" hidden><legend>Data e horário</legend>
        <label class="lt-campo">Data <input type="date" name="data" min="${min}" required></label>
        <div class="lt-grupo" role="radiogroup" aria-label="Horário">
          ${["08:00", "09:30", "11:00", "14:00", "15:30", "17:00"].map((h) => `<label class="lt-opcao lt-opcao--hora"><input type="radio" name="horario" value="${h}" required> <span>${h}</span></label>`).join("")}
        </div>
      </fieldset>
      <fieldset class="lt-agenda__etapa" data-etapa="3" hidden><legend>Seus dados</legend>
        <label class="lt-campo">Nome completo <input type="text" name="nome" autocomplete="name" minlength="3" required></label>
        <label class="lt-campo">WhatsApp <input type="tel" name="telefone" autocomplete="tel" inputmode="tel" placeholder="(32) 98836-7667" required></label>
      </fieldset>
      <div class="lt-agenda__acoes">
        <button type="button" class="lt-botao" data-voltar hidden>Voltar</button>
        <button type="button" class="lt-botao lt-botao--principal" data-avancar>Continuar</button>
        <button type="submit" class="lt-botao lt-botao--principal" hidden>Confirmar agendamento</button>
      </div>`;
    let etapa = 1;
    const etapas = form.querySelectorAll(".lt-agenda__etapa");
    const passos = form.querySelectorAll(".lt-agenda__passos li");
    const bVoltar = form.querySelector("[data-voltar]");
    const bAvancar = form.querySelector("[data-avancar]");
    const bEnviar = form.querySelector("[type=submit]");

    /* Mostra a etapa atual e ajusta os botões e o indicador de passos. */
    function mostrar() {
      etapas.forEach((e) => (e.hidden = Number(e.dataset.etapa) !== etapa));
      passos.forEach((p, i) => p.classList.toggle("ativo", i + 1 <= etapa));
      bVoltar.hidden = etapa === 1;
      bAvancar.hidden = etapa === 3;
      bEnviar.hidden = etapa !== 3;
      const foco = etapas[etapa - 1].querySelector("input");
      if (foco) foco.focus();
    }

    limparAoDigitar(form);
    form.addEventListener("change", (e) => {
      if (e.target.name === "data" && e.target.value) {
        const dia = new Date(`${e.target.value}T12:00:00`).getDay();
        marcarErro(e.target, dia === 0 ? "Não atendemos aos domingos. Escolha outro dia." : "");
      }
    });
    bAvancar.addEventListener("click", () => {
      const atual = etapas[etapa - 1];
      if (!validar(form, atual)) return;
      const data = form.querySelector("[name=data]");
      if (etapa === 2 && data.getAttribute("aria-invalid") === "true") {
        data.focus();
        return;
      }
      etapa += 1;
      mostrar();
    });
    bVoltar.addEventListener("click", () => {
      etapa -= 1;
      mostrar();
    });
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!validar(form, etapas[2])) return;
      carregando(bEnviar, true, "Confirmando…");
      await esperar(1000);
      carregando(bEnviar, false);
      const dados = Object.fromEntries(new FormData(form));
      const dataBr = new Date(`${dados.data}T12:00:00`).toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" });
      const texto = `Olá${nomeLocal ? `, ${nomeLocal}` : ""}! Quero confirmar meu agendamento:\n\n${rotuloServico}: ${dados.servico}\nData: ${dataBr}\nHorário: ${dados.horario}\nNome: ${dados.nome}\nWhatsApp: ${dados.telefone}`;
      const link = whatsapp(texto);
      sucesso(form, {
        titulo: "Horário reservado!",
        texto: `${dados.servico} em ${dataBr}, às ${dados.horario}. Abrimos o WhatsApp para você confirmar.`,
        link,
      });
      aviso("Agendamento enviado.", "sucesso");
    });
    const d = modal({ titulo, conteudo: form, largura: "560px" });
    mostrar();
    return d;
  }

  /* Avisa, ao clicar em qualquer link de WhatsApp, que a conversa vai abrir com a mensagem pronta. */
  function ligarLinksWhatsapp() {
    document.addEventListener("click", (e) => {
      const a = e.target.closest && e.target.closest('a[href*="wa.me/"], a[href*="api.whatsapp.com"]');
      if (!a) return;
      const temTexto = /[?&]text=/.test(a.getAttribute("href"));
      aviso(temTexto ? "Abrindo o WhatsApp com a sua mensagem pronta…" : "Abrindo o WhatsApp para você falar com a gente…", "info", 3200);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ligarLinksWhatsapp);
  else ligarLinksWhatsapp();

  window.LT = {
    NUMERO_WHATSAPP,
    aviso,
    carregando,
    esperar,
    validar,
    marcarErro,
    limparAoDigitar,
    resumo,
    whatsapp,
    sucesso,
    ligarFormulario,
    vazio,
    modal,
    moeda,
    criarSacola,
    agendar,
  };
})();
/* Fim do lt-feedback.js. */
