var listEmails = JSON.parse(localStorage.getItem("listEmails"));
var currentEmail = JSON.parse(localStorage.getItem("currentEmail"));

if (!listEmails && !currentEmail) {
  listEmails = [];
  currentEmail = "";
}

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

let emailInput = document.getElementById("e-mail");

document
  .getElementById("icon-send")
  .addEventListener("click", function (event) {
    event.preventDefault();

    if (!emailInput.value) {
      console.log("Insira o seu melhor e-mail.");
      document.getElementById("responsesend").innerHTML =
        "Insira o seu melhor e-mail.";
    } else {
      console.log(
        "Obrigado " + emailInput.value + " por assinar nossa newsletter!!"
      );

      if (!validateEmail(emailInput.value)) {
        document.getElementById("responsesend").innerHTML = 
          emailInput.value +
          ": Não é um e-mail válido. Insira o seu melhor e-mail.";
      } else {
        document.getElementById("responsesend").innerHTML =
          "Obrigado " + emailInput.value + " por assinar nossa newsletter!!";

        currentEmail = emailInput.value;
        listEmails.push(currentEmail);

        localStorage.setItem("currentEmail", JSON.stringify(currentEmail));
        localStorage.setItem("listEmails", JSON.stringify(listEmails));
      }
    }
    emailInput.value = "";
  });
