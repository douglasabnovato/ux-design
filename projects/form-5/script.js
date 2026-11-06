/* script.js — motor de captação de lead.
   Serve formulário de página única e formulário em etapas; detecta qual é.
   Valida campo a campo, aponta o erro no próprio campo, monta o resumo das
   respostas e entrega no WhatsApp. O resumo também fica na tela, com botão
   de copiar e link direto, para o caso de o WhatsApp não abrir. */

const DESTINO_WHATSAPP = "5532988367667";
const SELETOR_FORM = "#wizardForm";
const SELETOR_AVISO = "#wizardMessage";
const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* Devolve o rótulo humano de um campo, olhando o label que o embrulha,
   o label[for], a legend do fieldset e, por último, o próprio name. */
function rotuloDe(campo) {
  const proprio = campo.closest("label");
  if (proprio) {
    const copia = proprio.cloneNode(true);
    copia.querySelectorAll("input, select, textarea, .campo-erro").forEach((n) => n.remove());
    const texto = copia.textContent.replace(/\s+/g, " ").trim();
    if (texto) return texto.replace(/\*$/, "").trim();
  }
  if (campo.id) {
    const ligado = document.querySelector(`label[for="${CSS.escape(campo.id)}"]`);
    if (ligado) return ligado.textContent.replace(/\s+/g, " ").trim();
  }
  const grupo = campo.closest("fieldset");
  const legenda = grupo && grupo.querySelector("legend");
  if (legenda) return legenda.textContent.replace(/\s+/g, " ").trim();
  return campo.name || "Campo";
}

/* Marca ou limpa o erro de um campo, ligando a mensagem por aria-describedby. */
function marcarErro(campo, mensagem) {
  const ancora = campo.closest("label, fieldset, .campo") || campo.parentElement;
  let aviso = ancora.querySelector(":scope > .campo-erro");

  if (!mensagem) {
    campo.removeAttribute("aria-invalid");
    campo.removeAttribute("aria-describedby");
    if (aviso) aviso.remove();
    return;
  }

  if (!aviso) {
    aviso = document.createElement("span");
    aviso.className = "campo-erro";
    aviso.id = `erro-${campo.name || Math.random().toString(36).slice(2)}`;
    aviso.setAttribute("role", "alert");
    ancora.appendChild(aviso);
  }
  aviso.textContent = mensagem;
  campo.setAttribute("aria-invalid", "true");
  campo.setAttribute("aria-describedby", aviso.id);
}

/* Reúne os controles do formulário agrupando radio e checkbox pelo name. */
function agrupar(form) {
  const grupos = new Map();
  form.querySelectorAll("input, select, textarea").forEach((campo) => {
    if (!campo.name || campo.type === "hidden" || campo.type === "submit") return;
    if (!grupos.has(campo.name)) grupos.set(campo.name, []);
    grupos.get(campo.name).push(campo);
  });
  return grupos;
}

/* Monta o resumo das respostas, na ordem em que aparecem na tela. */
function montarResumo(form) {
  const linhas = [];
  agrupar(form).forEach((campos) => {
    const primeiro = campos[0];
    const tipo = primeiro.type;
    let valor = "";

    if (tipo === "radio" || tipo === "checkbox") {
      valor = campos
        .filter((c) => c.checked)
        .map((c) => rotuloDe(c) || c.value)
        .join(", ");
    } else if (primeiro.tagName === "SELECT") {
      valor = primeiro.selectedOptions[0] ? primeiro.selectedOptions[0].text.trim() : "";
    } else {
      valor = primeiro.value.trim();
    }

    if (valor) linhas.push(`*${rotuloDe(primeiro)}:* ${valor}`);
  });
  return linhas.join("\n");
}

/* Mostra o aviso geral do formulário. */
function avisar(caixa, tipo, texto) {
  if (!caixa) return;
  caixa.className = `${caixa.dataset.classeBase || "form-message"} visible ${tipo}`;
  caixa.textContent = texto;
}

/* Mostra o resumo na tela para o visitante copiar, com link direto para o WhatsApp. */
function mostrarResumo(caixa, resumo, linkWhatsapp) {
  if (!caixa) return;
  caixa.className = `${caixa.dataset.classeBase || "form-message"} visible success`;
  caixa.innerHTML = "";

  const titulo = document.createElement("p");
  titulo.textContent = linkWhatsapp
    ? "Pedido pronto! Abrimos o WhatsApp com a sua mensagem. Se ele não abriu, use o link ou copie o resumo:"
    : "Resumo do seu pedido — copie e envie para o nosso atendimento:";

  const bloco = document.createElement("pre");
  bloco.className = "resumo-lead";
  bloco.textContent = resumo.replace(/\*/g, "");

  const copiar = document.createElement("button");
  copiar.type = "button";
  copiar.className = "resumo-copiar";
  copiar.textContent = "Copiar resumo";
  copiar.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(bloco.textContent);
      copiar.textContent = "Copiado";
    } catch (e) {
      void e;
      const selecao = window.getSelection();
      const faixa = document.createRange();
      faixa.selectNodeContents(bloco);
      selecao.removeAllRanges();
      selecao.addRange(faixa);
      copiar.textContent = "Selecionado — use Ctrl+C";
    }
  });

  caixa.append(titulo, bloco, copiar);
  if (linkWhatsapp) {
    const abrir = document.createElement("a");
    abrir.className = "resumo-copiar";
    abrir.href = linkWhatsapp;
    abrir.target = "_blank";
    abrir.rel = "noopener";
    abrir.textContent = "Abrir WhatsApp";
    caixa.append(" ", abrir);
  }
}

/* Um campo é obrigatório por required ou por data-required. */
function ehObrigatorio(campo) {
  return campo.required || campo.hasAttribute("data-required");
}

/* Valida apenas o trecho pedido — o formulário inteiro, ou uma etapa. */
function validarTrecho(raiz, form) {
  let primeiroErro = null;
  const grupos = new Map();

  raiz.querySelectorAll("input, select, textarea").forEach((campo) => {
    if (!campo.name || campo.type === "hidden" || campo.type === "submit") return;
    if (!grupos.has(campo.name)) grupos.set(campo.name, []);
    grupos.get(campo.name).push(campo);
  });

  grupos.forEach((campos, nome) => {
    const primeiro = campos[0];
    const tipo = primeiro.type;
    const todos = form ? Array.from(form.querySelectorAll(`[name="${CSS.escape(nome)}"]`)) : campos;
    const obrigatorio = todos.some(ehObrigatorio);
    let problema = "";

    if (tipo === "radio" || tipo === "checkbox") {
      if (obrigatorio && !todos.some((c) => c.checked)) {
        problema = todos.length > 1 ? "Escolha pelo menos uma opção." : "Marque para continuar.";
      }
    } else {
      const valor = primeiro.value.trim();
      if (obrigatorio && !valor) {
        problema = "Preencha este campo.";
      } else if (valor && tipo === "email" && !EMAIL_VALIDO.test(valor)) {
        problema = "Informe um e-mail válido, como nome@empresa.com.br.";
      } else if (valor && tipo === "tel" && valor.replace(/\D/g, "").length < 10) {
        problema = "Informe o telefone com DDD.";
      } else if (obrigatorio && primeiro.tagName === "TEXTAREA" && valor.length < 15) {
        problema = "Conte um pouco mais — pelo menos 15 caracteres.";
      }
    }

    marcarErro(primeiro, problema);
    if (problema && !primeiroErro) primeiroErro = primeiro;
  });

  return primeiroErro;
}

/* Entrega o lead: WhatsApp quando configurado, resumo na tela quando não. */
function entregar(form, caixa) {
  const resumo = montarResumo(form);
  if (DESTINO_WHATSAPP.includes("SEUNUMERO")) {
    mostrarResumo(caixa, resumo);
    return;
  }
  const texto = encodeURIComponent(`Olá! Vim pelo site e preenchi o formulário:\n\n${resumo}`);
  const link = `https://wa.me/${DESTINO_WHATSAPP}?text=${texto}`;
  mostrarResumo(caixa, resumo, link);
  window.open(link, "_blank", "noopener");
}

/* Limpa o erro assim que o visitante mexe no campo. */
function ligarLimpeza(form) {
  const limpar = (alvo) => {
    if (!alvo || !alvo.name) return;
    const cabeca = form.querySelector(`[name="${CSS.escape(alvo.name)}"]`);
    if (cabeca && cabeca.getAttribute("aria-invalid")) marcarErro(cabeca, "");
    if (alvo.getAttribute("aria-invalid")) marcarErro(alvo, "");
  };
  form.addEventListener("input", (e) => limpar(e.target));
  form.addEventListener("change", (e) => limpar(e.target));
}

/* Acha as etapas do formulário, qualquer que seja o nome da classe usada. */
function acharEtapas(form) {
  for (const sel of [".wizard-page", ".form-step", ".catalog-page", "[data-step]"]) {
    const achadas = Array.from(form.querySelectorAll(sel)).filter((e) => e.querySelector("input, select, textarea"));
    if (achadas.length > 1) return achadas;
  }
  return [];
}

/* Acha um botão de navegação pelo id, pela classe ou pelo texto. */
function acharBotao(form, padrao) {
  const candidatos = Array.from(form.querySelectorAll("button, input[type='button']"));
  return candidatos.find((b) => padrao.test(`${b.id} ${b.className} ${b.textContent || b.value || ""}`)) || null;
}

/* Formulário de uma página só. */
function ligarSimples(form, caixa) {
  form.setAttribute("novalidate", "");
  ligarLimpeza(form);

  form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const erro = validarTrecho(form, form);
    if (erro) {
      avisar(caixa, "error", "Revise os campos marcados para continuar.");
      erro.focus();
      return;
    }
    entregar(form, caixa);
    form.reset();
  });
}

/* Formulário em etapas: valida só o que está na tela e entrega no fim. */
function ligarWizard(form, caixa, etapas) {
  const anterior = acharBotao(form, /prev|volt|anterior/i);
  const proximo = acharBotao(form, /next|prox/i);
  const enviar = form.querySelector(".btn-submit, [type='submit']");
  const marcos = Array.from(document.querySelectorAll(".step, .step-item"));
  let atual = 0;

  form.setAttribute("novalidate", "");
  ligarLimpeza(form);

  function desenhar() {
    etapas.forEach((etapa, i) => {
      const ativa = i === atual;
      etapa.classList.toggle("active", ativa);
      etapa.toggleAttribute("inert", !ativa);
    });
    marcos.forEach((m, i) => {
      const ativa = i === atual;
      m.classList.toggle("active", ativa);
      m.setAttribute("aria-current", String(ativa));
    });

    const ultima = atual === etapas.length - 1;
    if (anterior) anterior.disabled = atual === 0;
    if (proximo && enviar && proximo !== enviar) {
      proximo.style.display = ultima ? "none" : "";
      enviar.style.display = ultima ? "" : "none";
    } else if (proximo) {
      proximo.textContent = ultima ? "Enviar" : "Próximo";
    }
    if (caixa) {
      caixa.className = caixa.dataset.classeBase || "form-message";
      caixa.textContent = "";
    }
  }

  function avancar() {
    const erro = validarTrecho(etapas[atual], form);
    if (erro) {
      avisar(caixa, "error", "Revise os campos marcados para continuar.");
      erro.focus();
      return;
    }
    if (atual < etapas.length - 1) {
      atual += 1;
      desenhar();
      etapas[atual].querySelector("input, select, textarea")?.focus();
      return;
    }
    entregar(form, caixa);
    form.reset();
    atual = 0;
    desenhar();
  }

  proximo?.addEventListener("click", (e) => { e.preventDefault(); avancar(); });

  anterior?.addEventListener("click", (e) => {
    e.preventDefault();
    if (atual === 0) return;
    atual -= 1;
    desenhar();
    etapas[atual].querySelector("input, select, textarea")?.focus();
  });

  form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    avancar();
  });

  desenhar();
}

/* Ponto de partida: escolhe entre formulário simples e formulário em etapas. */
function iniciarFormulario() {
  const form = document.querySelector(SELETOR_FORM);
  if (!form) return;

  const caixa = document.querySelector(SELETOR_AVISO);
  if (caixa) caixa.dataset.classeBase = caixa.className.split(" ")[0] || "form-message";

  const etapas = acharEtapas(form);
  if (etapas.length > 1) ligarWizard(form, caixa, etapas);
  else ligarSimples(form, caixa);
}

document.addEventListener("DOMContentLoaded", iniciarFormulario);

/* Fim de script.js */
