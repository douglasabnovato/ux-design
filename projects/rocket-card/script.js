/*
 * script.js · Rocket Card.
 * Gera o cartão de perfil a partir da API pública do GitHub com estado de
 * carregamento, erro de usuário inexistente, dados de reserva quando a API
 * falha (limite ou sem internet) e troca de cor de fundo com retorno visível.
 */
"use strict";
document.documentElement.style.setProperty("--lt-cor", "#04d361");

const RESERVA = {
  login: "douglasabnovato",
  avatar_url: "./assets/profile.svg",
  following: 120,
  followers: 180,
  public_repos: 90,
  company: "learnTECH",
  location: "Juiz de Fora - MG",
};

/* Busca o usuário na API com limite de tempo. */
async function buscarUsuario(usuario) {
  const controle = new AbortController();
  const timer = setTimeout(() => controle.abort(), 6000);
  try {
    const resp = await fetch(`https://api.github.com/users/${encodeURIComponent(usuario)}`, { signal: controle.signal });
    if (resp.status === 404) return { erro: "naoEncontrado" };
    if (!resp.ok) return { erro: "api" };
    return { dados: await resp.json() };
  } catch (e) {
    return { erro: "rede" };
  } finally {
    clearTimeout(timer);
  }
}

/* Preenche o cartão tratando campos vazios. */
function preencher(user) {
  document.querySelector(".titulo").innerText = user.login;
  const foto = document.querySelector(".image-profile");
  foto.style.backgroundImage = `url(${user.avatar_url})`;
  foto.setAttribute("aria-label", `Foto de perfil de ${user.login}`);
  document.querySelector(".num_following").innerText = user.following ?? 0;
  document.querySelector(".num_followers").innerText = user.followers ?? 0;
  document.querySelector(".public_repos").innerText = user.public_repos ?? 0;
  document.querySelector(".nam_company").innerText = user.company || "Empresa não informada";
  const local = user.location || "";
  document.querySelector(".lo_location").innerText = local ? local.split(" - ")[0] : "Local não informado";
}

/* Carrega um usuário e mostra o resultado (ou o motivo da falha). */
async function carregar(usuario) {
  const card = document.querySelector(".card");
  const status = document.getElementById("dev-status");
  const botao = document.querySelector("#form-dev button");
  card.setAttribute("aria-busy", "true");
  LT.carregando(botao, true, "Buscando…");
  status.textContent = `Buscando ${usuario} no GitHub…`;
  const r = await buscarUsuario(usuario);
  LT.carregando(botao, false);
  card.setAttribute("aria-busy", "false");
  if (r.dados) {
    preencher(r.dados);
    status.textContent = `Cartão de ${r.dados.login} gerado.`;
    LT.aviso(`Cartão de ${r.dados.login} gerado.`);
    return;
  }
  if (r.erro === "naoEncontrado") {
    status.textContent = "";
    LT.marcarErro(document.getElementById("dev-usuario"), `Não existe usuário "${usuario}" no GitHub.`);
    LT.aviso("Usuário não encontrado.", "erro");
    return;
  }
  preencher(usuario.toLowerCase() === RESERVA.login ? RESERVA : { ...RESERVA, login: usuario, company: "", location: "" });
  status.textContent = "GitHub indisponível agora: mostrando dados de exemplo.";
  LT.aviso("Não foi possível falar com o GitHub (limite de acessos ou sem internet). Mostrando dados de exemplo.", "erro", 6000);
}

/* Troca a cor de fundo e anuncia a nova cor. */
function generatebkg() {
  const c = () => Math.floor(Math.random() * 256);
  const cor = `rgb(${c()}, ${c()}, ${c()})`;
  document.querySelector(".box").style.background = cor;
  LT.aviso(`Nova cor de fundo: ${cor}`, "info", 2200);
}

const form = document.getElementById("form-dev");
LT.limparAoDigitar(form);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const campo = form.usuario;
  campo.value = campo.value.trim().replace(/^@/, "");
  if (!campo.value) return LT.marcarErro(campo, "Informe um usuário do GitHub.");
  if (!new RegExp(`^${campo.getAttribute("pattern")}$`).test(campo.value)) return LT.marcarErro(campo, "Use só letras, números e hífen (até 39 caracteres).");
  LT.marcarErro(campo, "");
  carregar(campo.value);
});
document.getElementById("footer").addEventListener("click", generatebkg);

carregar("douglasabnovato");
/* fim de script.js */
