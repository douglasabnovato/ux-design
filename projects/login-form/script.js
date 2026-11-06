/*
 * script.js · Login Form (Camp.in).
 * Mostra e esconde a senha e simula o login com respostas reais de interface:
 * campos obrigatórios, e-mail inválido, senha curta, credencial incorreta com
 * contador de tentativas, bloqueio temporário, sucesso, recuperação de senha
 * e cadastro. Conta de demonstração: demo@uxdesign.com / demo123.
 */
const CONTA_DEMO = { email: "demo@uxdesign.com", senha: "demo123" };
const togglePassword = document.querySelector("#toggle_password");
const password = document.querySelector("#password_inp");
const form = document.querySelector("form");
const botaoEntrar = document.querySelector("#entrar");
let tentativas = 0;

/* Alterna a senha entre visível e oculta e atualiza o ícone e o rótulo. */
function alternarSenha() {
  const type = password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  togglePassword.setAttribute("src", type === "password" ? "./assets/eye-slash.svg" : "./assets/eye.svg");
  togglePassword.setAttribute("alt", type === "password" ? "Mostrar senha" : "Esconder senha");
}

/* Bloqueia o botão de entrar por alguns segundos após três erros. */
function bloquear(segundos) {
  botaoEntrar.disabled = true;
  let resta = segundos;
  const tick = setInterval(() => {
    botaoEntrar.value = `Tente em ${resta}s`;
    resta -= 1;
    if (resta < 0) {
      clearInterval(tick);
      botaoEntrar.disabled = false;
      botaoEntrar.value = "Entrar";
      tentativas = 0;
    }
  }, 1000);
}

/* Valida, simula a consulta ao servidor e responde com erro ou boas-vindas. */
async function entrar(e) {
  e.preventDefault();
  if (!LT.validar(form)) return;
  botaoEntrar.value = "Entrando…";
  botaoEntrar.disabled = true;
  botaoEntrar.setAttribute("aria-busy", "true");
  await LT.esperar(900);
  botaoEntrar.removeAttribute("aria-busy");
  botaoEntrar.disabled = false;
  botaoEntrar.value = "Entrar";
  const email = form.email_inp.value.trim().toLowerCase();
  if (email !== CONTA_DEMO.email || password.value !== CONTA_DEMO.senha) {
    tentativas += 1;
    LT.marcarErro(password, `E-mail ou senha incorretos. Tentativa ${tentativas} de 3.`);
    password.focus();
    if (tentativas >= 3) {
      LT.aviso("Muitas tentativas. Aguarde 15 segundos para tentar de novo.", "erro");
      bloquear(15);
    } else {
      LT.aviso("Não encontramos essa combinação de e-mail e senha.", "erro");
    }
    return;
  }
  const lembrar = form.lembrete_inp.checked;
  LT.sucesso(form, {
    titulo: "Bem-vindo de volta!",
    texto: lembrar ? "Login feito. Vamos lembrar deste dispositivo por 30 dias." : "Login feito com sucesso. Redirecionando para o painel…",
    aoRecomecar: () => form.reset(),
    rotuloRecomecar: "Sair",
  });
  LT.aviso("Login realizado.", "sucesso");
}

/* Abre a recuperação de senha com validação de e-mail e confirmação. */
function recuperarSenha(e) {
  e.preventDefault();
  const f = document.createElement("form");
  f.setAttribute("novalidate", "");
  f.innerHTML = `<p>Informe o e-mail da conta. Enviaremos um link para criar uma nova senha.</p>
    <label class="lt-campo">E-mail <input type="email" name="email" autocomplete="email" required></label>
    <button type="submit" class="lt-botao lt-botao--principal">Enviar link</button>`;
  LT.ligarFormulario(f, { titulo: "Link enviado!", texto: "Confira sua caixa de entrada e o spam. O link vale por 30 minutos.", mostrarResumo: false, aviso: "E-mail de recuperação enviado." });
  LT.modal({ titulo: "Recuperar senha", conteudo: f });
}

/* Abre o cadastro rápido com validação e confirmação de conta criada. */
function registrar(e) {
  e.preventDefault();
  const f = document.createElement("form");
  f.setAttribute("novalidate", "");
  f.innerHTML = `<label class="lt-campo">Nome <input type="text" name="nome" autocomplete="name" minlength="3" required></label>
    <label class="lt-campo">E-mail <input type="email" name="email" autocomplete="email" required></label>
    <label class="lt-campo">Senha <input type="password" name="senha" autocomplete="new-password" minlength="6" required></label>
    <button type="submit" class="lt-botao lt-botao--principal">Criar conta</button>`;
  LT.ligarFormulario(f, { titulo: "Conta criada!", texto: "Enviamos um e-mail de confirmação. Depois é só fazer login.", mostrarResumo: false, aviso: "Cadastro concluído." });
  LT.modal({ titulo: "Criar conta", conteudo: f });
}

togglePassword.addEventListener("click", alternarSenha);
togglePassword.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    alternarSenha();
  }
});
LT.limparAoDigitar(form);
form.addEventListener("submit", entrar);
document.getElementById("esqueci-senha").addEventListener("click", recuperarSenha);
document.getElementById("registrar").addEventListener("click", registrar);
/* Fim do script.js. */
