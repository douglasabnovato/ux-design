/*
 * script.js · Rocket Shoes.
 * Galeria com indicador na miniatura ativa (setas do teclado), tamanho
 * obrigatório antes de comprar, sacola com contador, busca com retorno,
 * categorias com aviso, guia de tamanhos, vídeo de treino e "Explore mais".
 */
document.documentElement.style.setProperty("--lt-cor", "#ff0000");

const sacola = LT.criarSacola({
  nomeLoja: "Rocket Shoes",
  botaoExistente: document.getElementById("btn-sacola"),
  contador: document.getElementById("sacola-qtd"),
  aoMudar: (qtd) => document.getElementById("btn-sacola").setAttribute("aria-label", `Abrir sacola (${qtd} ${qtd === 1 ? "item" : "itens"})`),
});

/* Troca a foto em destaque e move o indicador vermelho. */
function ligarGaleria() {
  const destaque = document.getElementById("foto-destaque");
  const minis = [...document.querySelectorAll(".miniatura")];
  const escolher = (i) => {
    const m = minis[i];
    destaque.style.opacity = 0;
    setTimeout(() => {
      destaque.src = m.dataset.foto;
      destaque.alt = m.dataset.alt;
      destaque.style.opacity = 1;
    }, 150);
    minis.forEach((x) => x.setAttribute("aria-pressed", String(x === m)));
  };
  minis.forEach((m, i) => {
    m.addEventListener("click", () => escolher(i));
    m.addEventListener("keydown", (e) => {
      const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (!d) return;
      const alvo = (i + d + minis.length) % minis.length;
      minis[alvo].focus();
      escolher(alvo);
    });
  });
}

/* Compra: exige um tamanho e adiciona à sacola. */
function ligarCompra() {
  const form = document.getElementById("form-compra");
  LT.limparAoDigitar(form);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!LT.validar(form)) return;
    const tamanho = form.tamanho.value;
    sacola.adicionar({ id: `corrida-top-${tamanho}`, nome: `Tênis Corrida Top · nº ${tamanho}`, preco: 1000 });
  });
  document.getElementById("btn-guia").addEventListener("click", () =>
    LT.modal({
      titulo: "Guia de tamanhos",
      conteudo: `<p>Meça o pé do calcanhar ao dedo mais longo e compare:</p>
        <table class="guia"><thead><tr><th>Número</th><th>Comprimento do pé</th></tr></thead><tbody>
        <tr><td>37</td><td>24,0 cm</td></tr><tr><td>38</td><td>24,7 cm</td></tr><tr><td>39</td><td>25,3 cm</td></tr>
        <tr><td>40</td><td>26,0 cm</td></tr><tr><td>41</td><td>26,7 cm</td></tr><tr><td>42</td><td>27,3 cm</td></tr></tbody></table>
        <p>Entre dois números? Escolha o maior para corrida.</p>`,
    })
  );
}

/* Busca: encontra o modelo ou mostra que não há resultado. */
function ligarBusca() {
  const form = document.getElementById("form-busca");
  const campo = document.getElementById("busca-termo");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const termo = campo.value.trim().toLowerCase();
    if (!termo) {
      LT.aviso("Digite o que você procura, como “corrida” ou “tênis”.", "info");
      campo.focus();
      return;
    }
    const catalogo = "tênis tenis esportivo corrida top azul unissex treino";
    if (catalogo.includes(termo) || termo.split(/\s+/).some((p) => p.length > 2 && catalogo.includes(p))) {
      LT.aviso(`1 resultado para “${campo.value.trim()}”: Tênis Esportivo Para Corrida Top.`);
      document.getElementById("produto-titulo").scrollIntoView({ behavior: "smooth" });
    } else {
      LT.aviso(`Nenhum produto para “${campo.value.trim()}”. Tente “corrida” ou “tênis”.`, "erro");
    }
  });
}

/* Categorias: marcam o item ativo e contam quantos modelos existem. */
function ligarCategorias() {
  const links = document.querySelectorAll("[data-categoria]");
  links.forEach((a) =>
    a.addEventListener("click", (e) => {
      e.preventDefault();
      links.forEach((x) => x.removeAttribute("aria-current"));
      a.setAttribute("aria-current", "true");
      const cat = a.dataset.categoria;
      if (cat === "Customizar") {
        LT.modal({ titulo: "Customize o seu tênis", conteudo: "<p>Em breve você poderá escolher cores do cabedal, cadarço e solado. Enquanto isso, fale com a gente no WhatsApp para um pedido personalizado.</p>" });
        return;
      }
      document.getElementById("produto-categoria").textContent = `Corrida · ${cat === "Criança" ? "Infantil (numeração 30 a 36 sob encomenda)" : cat}`;
      LT.aviso(`Mostrando modelos da categoria ${cat}.`, "info");
    })
  );
}

/* Vídeo de treino e "Explore mais". */
function ligarRodape() {
  document.getElementById("btn-video").addEventListener("click", () => {
    const d = LT.modal({
      titulo: "Dicas de treino de corrida",
      largura: "760px",
      conteudo: `<p>Assista a vídeos de treino para começar a correr com segurança.</p>
        <p><a class="lt-botao lt-botao--principal" href="https://www.youtube.com/results?search_query=treino+de+corrida+para+iniciantes" target="_blank" rel="noopener">Abrir vídeos no YouTube</a></p>`,
    });
    d.querySelector("a").addEventListener("click", () => LT.aviso("Abrindo o YouTube em uma nova aba."));
  });
  document.getElementById("btn-explore").addEventListener("click", () =>
    LT.modal({
      titulo: "Explore mais",
      conteudo: `<ul><li><strong>Corrida Top</strong> · azul · R$ 1.000,00 (este modelo)</li><li><strong>Corrida Leve</strong> · preto · em breve</li><li><strong>Trilha Pro</strong> · verde · em breve</li></ul><p>Cadastre-se na sacola para ser avisado dos lançamentos.</p>`,
    })
  );
}

ligarGaleria();
ligarCompra();
ligarBusca();
ligarCategorias();
ligarRodape();
/* fim de script.js */
