/*
 * script.js · Tech Educa (School).
 * Menu responsivo, renderização de cursos e artigos a partir de dados.js,
 * filtros com estado vazio, ementa em acordeão, matrícula simulada,
 * comentários e formulários com validação e confirmação (LT).
 */
document.documentElement.style.setProperty("--lt-cor", "#1f2a6b");

/* Cria um elemento a partir de um trecho de HTML confiável. */
function elemento(html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

/* Escapa texto digitado pela pessoa antes de inserir no HTML. */
function escapar(texto) {
  return String(texto).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* Normaliza texto para busca sem acentos e sem diferença de maiúsculas. */
function normalizar(texto) {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

/* Abre e fecha o menu no celular, fechando também com Esc. */
function ligarMenu() {
  const botao = document.querySelector(".nav__menu");
  const lista = document.getElementById("nav-lista");
  if (!botao || !lista) return;
  const alternar = (abrir) => {
    botao.setAttribute("aria-expanded", String(abrir));
    botao.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
    lista.classList.toggle("aberta", abrir);
  };
  botao.addEventListener("click", () => alternar(botao.getAttribute("aria-expanded") !== "true"));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lista.classList.contains("aberta")) {
      alternar(false);
      botao.focus();
    }
  });
  lista.addEventListener("click", (e) => {
    if (e.target.closest("a")) alternar(false);
  });
}

/* Monta o cartão de um curso. */
function cartaoCurso(c) {
  return elemento(`
    <article class="cartao curso-cartao">
      <img src="${c.img}" alt="" width="400" height="240" loading="lazy" />
      <div class="curso-cartao__corpo">
        <p class="etiquetas"><span>${c.area}</span><span>${c.nivel}</span></p>
        <h3>${c.titulo}</h3>
        <p>${c.resumo}</p>
        <p class="curso-cartao__rodape"><strong>${LT.moeda(c.preco)}</strong><span>${c.horas} h</span></p>
        <a class="botao botao--azul botao--largo" href="course-inner.html?id=${c.id}" aria-label="Ver detalhes do curso ${c.titulo}">Ver detalhes</a>
      </div>
    </article>`);
}

/* Início: cursos em destaque e opções do formulário de matrícula. */
function paginaInicio() {
  const destaque = document.getElementById("cursos-destaque");
  if (!destaque) return;
  CURSOS.slice(0, 3).forEach((c) => destaque.appendChild(cartaoCurso(c)));
  const select = document.getElementById("mat-curso");
  CURSOS.forEach((c) => select.appendChild(new Option(c.titulo, c.titulo)));
  const pedido = new URLSearchParams(location.search).get("curso");
  const escolhido = CURSOS.find((c) => c.id === pedido);
  if (escolhido) select.value = escolhido.titulo;
  LT.ligarFormulario(document.getElementById("form-matricula"), {
    whatsapp: "Olá! Quero me matricular na Tech Educa:",
    titulo: "Inscrição recebida!",
    aviso: "Inscrição enviada. Vamos falar com você pelo WhatsApp.",
    rotuloRecomecar: "Fazer outra inscrição",
  });
}

/* Cursos: filtros por busca, área e nível, com contagem e estado vazio. */
function paginaCursos() {
  const lista = document.getElementById("lista-cursos");
  if (!lista) return;
  const form = document.getElementById("form-filtros");
  const area = document.getElementById("f-area");
  [...new Set(CURSOS.map((c) => c.area))].forEach((a) => area.appendChild(new Option(a, a)));
  const contagem = document.getElementById("contagem");
  const aplicar = () => {
    const busca = normalizar(form.busca.value.trim());
    const achados = CURSOS.filter(
      (c) =>
        (!form.area.value || c.area === form.area.value) &&
        (!form.nivel.value || c.nivel === form.nivel.value) &&
        (!busca || normalizar(`${c.titulo} ${c.resumo} ${c.area}`).includes(busca))
    );
    lista.innerHTML = "";
    contagem.textContent = achados.length === 1 ? "1 curso encontrado" : `${achados.length} cursos encontrados`;
    if (!achados.length) {
      LT.vazio(lista, {
        titulo: "Nenhum curso com esses filtros",
        texto: "Tente outra palavra ou limpe os filtros para ver todo o catálogo.",
        acao: () => {
          form.reset();
          aplicar();
          form.busca.focus();
        },
      });
      return;
    }
    achados.forEach((c) => lista.appendChild(cartaoCurso(c)));
  };
  form.addEventListener("input", aplicar);
  form.addEventListener("submit", (e) => e.preventDefault());
  const area0 = new URLSearchParams(location.search).get("area");
  if (area0) area.value = area0;
  aplicar();
}

/* Detalhe do curso: ficha, ementa em acordeão e matrícula em modal. */
function paginaCurso() {
  const ementa = document.getElementById("ementa");
  if (!ementa) return;
  const id = new URLSearchParams(location.search).get("id");
  const c = CURSOS.find((x) => x.id === id);
  if (!c) {
    document.getElementById("curso-titulo").textContent = "Curso não encontrado";
    document.getElementById("curso-resumo").textContent = "O link pode estar incompleto. Escolha um curso no catálogo.";
    document.querySelector(".curso").innerHTML = "";
    LT.vazio(document.querySelector(".curso"), {
      titulo: "Não encontramos esse curso",
      texto: "Volte ao catálogo para ver as turmas abertas.",
      rotuloAcao: "Ver cursos",
      acao: () => (location.href = "course.html"),
    });
    return;
  }
  document.title = `${c.titulo} · Tech Educa`;
  document.getElementById("curso-titulo").textContent = c.titulo;
  document.getElementById("curso-resumo").textContent = c.resumo;
  document.getElementById("curso-banner").style.setProperty("--banner", `url('${c.img}')`);
  document.getElementById("ficha").innerHTML = `
    <dt>Área</dt><dd>${c.area}</dd>
    <dt>Nível</dt><dd>${c.nivel}</dd>
    <dt>Carga horária</dt><dd>${c.horas} horas</dd>
    <dt>Investimento</dt><dd>${LT.moeda(c.preco)} ou 10x de ${LT.moeda(c.preco / 10)}</dd>`;
  c.ementa.forEach(([titulo, texto], i) => {
    const item = elemento(`
      <div class="acordeao__item">
        <h3><button type="button" aria-expanded="${i === 0}" aria-controls="mod-${i}" id="mod-b-${i}">Módulo ${i + 1} · ${titulo}</button></h3>
        <div class="acordeao__painel" id="mod-${i}" role="region" aria-labelledby="mod-b-${i}" ${i === 0 ? "" : "hidden"}><p>${texto}</p></div>
      </div>`);
    const botao = item.querySelector("button");
    botao.addEventListener("click", () => {
      const aberto = botao.getAttribute("aria-expanded") === "true";
      botao.setAttribute("aria-expanded", String(!aberto));
      item.querySelector(".acordeao__painel").hidden = aberto;
    });
    ementa.appendChild(item);
  });
  document.getElementById("btn-matricular").addEventListener("click", () => abrirMatricula(c));
}

/* Modal de matrícula de um curso, com validação e envio pelo WhatsApp. */
function abrirMatricula(c) {
  const form = elemento(`
    <form novalidate>
      <p>Turma de <strong>${c.titulo}</strong> · ${LT.moeda(c.preco)}</p>
      <div class="campo"><label for="m-nome">Nome completo</label><input id="m-nome" name="nome" required minlength="3" autocomplete="name" /></div>
      <div class="campo"><label for="m-email">E-mail</label><input id="m-email" name="email" type="email" required autocomplete="email" /></div>
      <div class="campo"><label for="m-tel">WhatsApp</label><input id="m-tel" name="telefone" type="tel" required autocomplete="tel" placeholder="(32) 98836-7667" /></div>
      <fieldset class="campo"><legend>Forma de pagamento</legend>
        <label class="opcao"><input type="radio" name="pagamento" value="Pix à vista" required /> Pix à vista (5% de desconto)</label>
        <label class="opcao"><input type="radio" name="pagamento" value="Cartão em 10x" /> Cartão em 10x</label>
      </fieldset>
      <button class="botao botao--amarelo botao--largo" type="submit">Confirmar matrícula</button>
    </form>`);
  LT.modal({ titulo: "Matrícula", conteudo: form });
  LT.ligarFormulario(form, {
    whatsapp: `Olá! Quero me matricular no curso ${c.titulo}:`,
    titulo: "Matrícula pré-confirmada!",
    aviso: "Matrícula enviada. A equipe confirma a vaga pelo WhatsApp.",
    rotuloRecomecar: "Fazer outra matrícula",
  });
  form.querySelector("input").focus();
}

/* Formata a data ISO como dia de mês de ano. */
function dataLonga(iso) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
}

/* Blog: lista de artigos com busca e estado vazio. */
function paginaBlog() {
  const lista = document.getElementById("lista-posts");
  if (!lista) return;
  const form = document.getElementById("form-blog");
  const contagem = document.getElementById("contagem-blog");
  const aplicar = () => {
    const busca = normalizar(form.busca.value.trim());
    const achados = POSTS.filter((p) => !busca || normalizar(`${p.titulo} ${p.resumo} ${p.corpo.join(" ")}`).includes(busca));
    lista.innerHTML = "";
    contagem.textContent = achados.length === 1 ? "1 artigo encontrado" : `${achados.length} artigos encontrados`;
    if (!achados.length) {
      LT.vazio(lista, {
        titulo: "Nenhum artigo encontrado",
        texto: `Não há artigos sobre "${form.busca.value.trim()}". Tente outra palavra.`,
        rotuloAcao: "Limpar busca",
        acao: () => {
          form.reset();
          aplicar();
          form.busca.focus();
        },
      });
      return;
    }
    achados.forEach((p) =>
      lista.appendChild(
        elemento(`
        <article class="cartao post-cartao">
          <img src="${p.img}" alt="" width="480" height="270" loading="lazy" />
          <div class="curso-cartao__corpo">
            <p class="artigo__meta">${dataLonga(p.data)} · ${p.autor}</p>
            <h2 class="post-cartao__titulo">${p.titulo}</h2>
            <p>${p.resumo}</p>
            <a class="link-seta" href="post.html?id=${p.id}" aria-label="Ler o artigo ${p.titulo}">Ler artigo</a>
          </div>
        </article>`)
      )
    );
  };
  form.addEventListener("input", aplicar);
  form.addEventListener("submit", (e) => e.preventDefault());
  aplicar();
}

/* Artigo: conteúdo pelo ?id= e comentários guardados só nesta visita. */
function paginaPost() {
  const corpo = document.getElementById("post-corpo");
  if (!corpo) return;
  const p = POSTS.find((x) => x.id === new URLSearchParams(location.search).get("id")) || POSTS[0];
  document.title = `${p.titulo} · Tech Educa`;
  document.getElementById("post-titulo").textContent = p.titulo;
  document.getElementById("post-meta").textContent = `${dataLonga(p.data)} · por ${p.autor}`;
  const img = document.getElementById("post-img");
  img.src = p.img;
  corpo.innerHTML = p.corpo.map((par) => `<p>${escapar(par)}</p>`).join("");
  const lista = document.getElementById("comentarios");
  const comentarios = [{ nome: "Ana", texto: "Conteúdo direto ao ponto, já vou aplicar no meu projeto!" }];
  const desenhar = () => {
    lista.innerHTML = comentarios.map((c) => `<li><strong>${escapar(c.nome)}</strong><p>${escapar(c.texto)}</p></li>`).join("");
  };
  desenhar();
  const form = document.getElementById("form-comentario");
  form.setAttribute("novalidate", "");
  LT.limparAoDigitar(form);
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!LT.validar(form)) return;
    const botao = form.querySelector("[type=submit]");
    LT.carregando(botao, true, "Publicando…");
    await LT.esperar(700);
    LT.carregando(botao, false);
    comentarios.push({ nome: form.nome.value.trim(), texto: form.comentario.value.trim() });
    desenhar();
    form.reset();
    LT.aviso("Comentário publicado. Obrigado por participar!");
  });
}

/* Sobre: contadores animados quando a seção aparece. */
function paginaSobre() {
  const numeros = document.querySelectorAll("[data-contar]");
  if (!numeros.length) return;
  const reduzir = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const contar = (el) => {
    const alvo = Number(el.dataset.contar);
    if (reduzir) return (el.textContent = alvo.toLocaleString("pt-BR"));
    const inicio = performance.now();
    const passo = (t) => {
      const k = Math.min(1, (t - inicio) / 1200);
      el.textContent = Math.round(alvo * k).toLocaleString("pt-BR");
      if (k < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
  };
  const obs = new IntersectionObserver((itens) =>
    itens.forEach((i) => {
      if (i.isIntersecting) {
        contar(i.target);
        obs.unobserve(i.target);
      }
    })
  );
  numeros.forEach((n) => obs.observe(n));
}

/* Contato e newsletter (presente em todas as páginas). */
function formulariosGerais() {
  const contato = document.getElementById("form-contato");
  if (contato) {
    LT.ligarFormulario(contato, {
      whatsapp: "Olá! Enviei uma mensagem pelo site da Tech Educa:",
      titulo: "Mensagem enviada!",
      aviso: "Mensagem enviada. Respondemos em até um dia útil.",
      rotuloRecomecar: "Enviar outra mensagem",
    });
  }
  const news = document.getElementById("form-news");
  if (news) {
    LT.ligarFormulario(news, {
      titulo: "Inscrição confirmada!",
      texto: "Você vai receber as novidades e turmas abertas no seu e-mail.",
      mostrarResumo: false,
      aviso: "E-mail cadastrado na newsletter.",
      rotuloRecomecar: "Cadastrar outro e-mail",
    });
  }
}

ligarMenu();
paginaInicio();
paginaCursos();
paginaCurso();
paginaBlog();
paginaPost();
paginaSobre();
formulariosGerais();
/* fim de script.js */
