 
      const openModalButton = document.getElementById("openModalButton");
      const heroButton = document.getElementById("heroButton");
      const modalOverlay = document.getElementById("modalOverlay");
      const closeModal = document.getElementById("closeModal");
      const cancelModal = document.getElementById("cancelModal");
      const landingForm = document.getElementById("landingForm");
      const estadoGuide = document.getElementById("estadoGuide");
      const cidadeGuide = document.getElementById("cidadeGuide");
      const nomeGuide = document.getElementById("nomeGuide");

      const cityOptions = {
        BA: ["Salvador", "Feira de Santana"],
        DF: ["Brasília"],
        ES: ["Vitória", "Vila Velha"],
        GO: ["Goiânia", "Anápolis"],
        MG: ["Belo Horizonte", "Uberlândia", "Contagem"],
        MS: ["Campo Grande"],
        PR: ["Curitiba", "Londrina"],
        RJ: ["Rio de Janeiro", "Niterói"],
        SC: ["Florianópolis", "Joinville"],
        SP: ["São Paulo", "Campinas", "Santos"],
      };

      const guideOptions = {
        Salvador: ["Guide Shop Salvador Central"],
        "Feira de Santana": ["Guide Shop Feira"],
        Brasília: ["Guide Shop Brasília"],
        Vitória: ["Guide Shop Vitória"],
        "Vila Velha": ["Guide Shop Vila Velha"],
        Goiânia: ["Guide Shop Goiânia"],
        "Anápolis": ["Guide Shop Anápolis"],
        "Belo Horizonte": ["Guide Shop BH"],
        "Uberlândia": ["Guide Shop Uberlândia"],
        Contagem: ["Guide Shop Contagem"],
        "Campo Grande": ["Guide Shop Campo Grande"],
        Curitiba: ["Guide Shop Curitiba"],
        Londrina: ["Guide Shop Londrina"],
        "Rio de Janeiro": ["Guide Shop Rio"],
        "Niterói": ["Guide Shop Niterói"],
        "São Paulo": ["Guide Shop São Paulo"],
        Campinas: ["Guide Shop Campinas"],
        Santos: ["Guide Shop Santos"],
      };

      function openModal() {
        modalOverlay.classList.add("active");
      }

      function closeModalWindow() {
        modalOverlay.classList.remove("active");
        landingForm.reset();
        resetErrors();
        cidadeGuide.innerHTML = '<option value="">Escolha o estado primeiro</option>';
        nomeGuide.innerHTML = '<option value="">Escolha a cidade primeiro</option>';
        cidadeGuide.disabled = true;
        nomeGuide.disabled = true;
      }

      openModalButton.addEventListener("click", openModal);
      heroButton.addEventListener("click", openModal);
      closeModal.addEventListener("click", closeModalWindow);
      cancelModal.addEventListener("click", closeModalWindow);
      modalOverlay.addEventListener("click", (event) => {
        if (event.target === modalOverlay) {
          closeModalWindow();
        }
      });

      estadoGuide.addEventListener("change", () => {
        const state = estadoGuide.value;
        cidadeGuide.disabled = !state;
        nomeGuide.disabled = true;
        nomeGuide.innerHTML = '<option value="">Escolha a cidade primeiro</option>';
        cidadeGuide.innerHTML = '<option value="">Selecione a Cidade</option>';
        if (state && cityOptions[state]) {
          cityOptions[state].forEach((city) => {
            const option = document.createElement("option");
            option.value = city;
            option.textContent = city;
            cidadeGuide.appendChild(option);
          });
        }
      });

      cidadeGuide.addEventListener("change", () => {
        const city = cidadeGuide.value;
        nomeGuide.disabled = !city;
        nomeGuide.innerHTML = '<option value="">Selecione a Guide Shop</option>';
        if (city && guideOptions[city]) {
          guideOptions[city].forEach((guide) => {
            const option = document.createElement("option");
            option.value = guide;
            option.textContent = guide;
            nomeGuide.appendChild(option);
          });
        }
      });

      function resetErrors() {
        document.querySelectorAll(".error").forEach((el) => {
          el.textContent = "";
        });
      }

      function validateForm() {
        resetErrors();
        let valid = true;
        const nome = document.getElementById("nome").value.trim();
        const sobrenome = document.getElementById("sobrenome").value.trim();
        const celular = document.getElementById("celular").value.trim();
        const email = document.getElementById("email").value.trim();
        const firstcheck = document.getElementById("firstcheck").checked;
        const secondcheck = document.getElementById("secondcheck").checked;

        if (!nome) {
          document.getElementById("errorNome").textContent = "O nome é obrigatório.";
          valid = false;
        }
        if (!sobrenome) {
          document.getElementById("errorSobrenome").textContent = "O sobrenome é obrigatório.";
          valid = false;
        }
        const celularDigits = celular.replace(/\D/g, "");
        if (!celular || celularDigits.length < 10 || celularDigits.length > 11) {
          document.getElementById("errorCelular").textContent = "Formato de celular inválido.";
          valid = false;
        }
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
          document.getElementById("errorEmail").textContent = "Formato de e-mail inválido.";
          valid = false;
        }
        if (!estadoGuide.value) {
          document.getElementById("errorEstado").textContent = "Selecione o estado.";
          valid = false;
        }
        if (!cidadeGuide.value) {
          document.getElementById("errorCidade").textContent = "Selecione a cidade.";
          valid = false;
        }
        if (!nomeGuide.value) {
          document.getElementById("errorGuide").textContent = "Selecione a Guide Shop.";
          valid = false;
        }
        if (!firstcheck) {
          document.getElementById("errorFirstcheck").textContent = "Você precisa concordar com a política de privacidade.";
          valid = false;
        }
        if (!secondcheck) {
          document.getElementById("errorSecondcheck").textContent = "Você precisa aceitar receber comunicações.";
          valid = false;
        }

        return valid;
      }

      landingForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!validateForm()) {
          return;
        }

        alert("Cadastro enviado com sucesso! Obrigado pela sua participação.");
        closeModalWindow();
      });

      document.querySelectorAll(".faq-question").forEach((button) => {
        button.addEventListener("click", () => {
          const answer = button.nextElementSibling;
          const open = answer.classList.toggle("open");
          button.querySelector("span").textContent = open ? "▲" : "▼";
        });
      }); 