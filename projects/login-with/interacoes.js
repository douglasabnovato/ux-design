/*
 * interacoes.js · Login With.
 * Simula login, cadastro, recuperação de senha e login social com respostas
 * visíveis: campos obrigatórios, e-mail inválido, senha curta, credencial
 * incorreta, carregando e sucesso. Conta de demonstração:
 * demo@uxdesign.com / demo123.
 */
const CONTA_DEMO = { email: "demo@uxdesign.com", senha: "demo123" };

/* Liga o formulário de login à verificação da conta de demonstração. */
function ligarLogin(form) {
  LT.limparAoDigitar(form);
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!LT.validar(form)) return;
    const botao = form.querySelector("[type=submit]");
    LT.carregando(botao, true, "Entrando…");
    await LT.esperar(900);
    LT.carregando(botao, false);
    const email = form.email.value.trim().toLowerCase();
    if (email !== CONTA_DEMO.email || form.senha.value !== CONTA_DEMO.senha) {
      LT.marcarErro(form.senha, "E-mail ou senha incorretos.");
      form.senha.focus();
      LT.aviso("Não encontramos essa combinação de e-mail e senha.", "erro");
      return;
    }
    LT.sucesso(form, { titulo: "Bem-vindo de volta!", texto: "Login feito com sucesso.", aoRecomecar: () => form.reset(), rotuloRecomecar: "Sair" });
    LT.aviso("Login realizado.", "sucesso");
  });
}

/* Liga o formulário de cadastro ao fluxo de conta criada. */
function ligarCadastro(form) {
  LT.ligarFormulario(form, {
    titulo: "Conta criada!",
    texto: "Enviamos um e-mail de confirmação. Depois é só entrar com seus dados.",
    mostrarResumo: false,
    aviso: "Cadastro concluído.",
    textoCarregando: "Criando conta…",
  });
}

/* Simula a recuperação de senha em uma janela com validação de e-mail. */
function ligarEsqueciSenha() {
  const link = document.querySelector(".login__forgot");
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const f = document.createElement("form");
    f.setAttribute("novalidate", "");
    f.innerHTML = `<p>Informe o e-mail da conta. Enviaremos um link para criar uma nova senha.</p>
      <label class="lt-campo">E-mail <input type="email" name="email" autocomplete="email" required></label>
      <button type="submit" class="lt-botao lt-botao--principal">Enviar link</button>`;
    LT.ligarFormulario(f, { titulo: "Link enviado!", texto: "Confira sua caixa de entrada. O link vale por 30 minutos.", mostrarResumo: false, aviso: "E-mail de recuperação enviado." });
    LT.modal({ titulo: "Recuperar senha", conteudo: f });
  });
}

/* Simula o login social com estado de conexão e confirmação. */
function ligarLoginSocial() {
  const nomes = ["Google", "Facebook", "Apple"];
  document.querySelectorAll(".login__social-link").forEach((a, i) => {
    const nome = nomes[i] || "rede social";
    a.setAttribute("aria-label", `Entrar com ${nome}`);
    a.addEventListener("click", async (e) => {
      e.preventDefault();
      LT.aviso(`Conectando com ${nome}…`, "info", 1500);
      await LT.esperar(1200);
      LT.aviso(`Conta ${nome} conectada. Login feito (simulação).`, "sucesso");
    });
  });
}

const formularios = document.querySelectorAll(".login__form");
ligarLogin(formularios[0]);
ligarCadastro(formularios[1]);
ligarEsqueciSenha();
ligarLoginSocial();
/* Fim do interacoes.js. */
