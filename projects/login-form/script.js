const togglePassword = document.querySelector("#toggle_password");

const password = document.querySelector("#password_inp");

togglePassword.addEventListener("click", function () {
    const type = password.getAttribute("type") === "password" ? "text" : "password";

    password.setAttribute("type", type);

    if(type == "password"){
        togglePassword.setAttribute("src", "./assets/eye-slash.svg")
    } else {
        togglePassword.setAttribute("src", "./assets/eye.svg")
    }
});

const form = document.querySelector("form");

form.addEventListener('submit', function (e) {
    e.preventDefault();
});