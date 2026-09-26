/**
 * GUSTAVO HENRIQUE BRAGA NOVATO - GHBN_ENGINEERING
 * Script Técnico: Comportamento Seco, Performance e Validação de Prancha
 */

document.addEventListener("DOMContentLoaded", () => {

    // 1. Navegação de Precisão (Scroll Técnico Instantâneo)
    const links = document.querySelectorAll('nav a');

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute('href');

            // Verifica se o link é uma âncora interna da página
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'instant'
                    });
                }
            }
        });
    });

    // 2. Monitoramento e Tratamento de Erros de Imagens da Prancha
    // Garante que imagens ausentes não quebrem o layout estrutural do grid
    const boardImages = document.querySelectorAll('.board-item img');

    boardImages.forEach(img => {
        img.addEventListener('error', () => {
            console.warn(`[GHBN_WARN] Falha ao carregar asset técnico: ${img.src}`);
            img.style.opacity = '0.2';
            img.style.filter = 'grayscale(100%)';
        });

        img.addEventListener('load', () => {
            img.style.opacity = '0.8';
        });
    });

    // 3. Detecção de Interface Touch para Ajuste de Comportamento
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.body.classList.add('is-touch-device');
    }

    // 4. Assinatura e Diagnóstico do Core de Engenharia no Console
    console.log("%c GHBN_ENGINEERING_CORE_v1.0.0 ", "background: #ff4500; color: #07090e; font-weight: bold; padding: 4px; font-family: monospace;");
    console.log("%c Status: Pranchas estruturais e diretórios mapeados com sucesso.", "color: #9ca3af; font-family: monospace;");
});

// --- LÓGICA DO FORMULÁRIO EM ETAPAS (MULTI-STEP) ---

/* Avança uma etapa depois de validar os campos visíveis da etapa atual. */
window.nextStep = function (currentStep) {
    const form = document.getElementById("multiStepForm");
    const currentFormStep = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    if (!LT.validar(form, currentFormStep)) return;

    const nextFormStep = document.querySelector(`.form-step[data-step="${currentStep + 1}"]`);
    if (nextFormStep) {
        currentFormStep.classList.remove('active');
        nextFormStep.classList.add('active');
        const primeiro = nextFormStep.querySelector('input, select, textarea');
        if (primeiro) primeiro.focus();
    }
}

/* Volta uma etapa sem perder o que já foi preenchido. */
window.prevStep = function (currentStep) {
    const currentFormStep = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    const prevFormStep = document.querySelector(`.form-step[data-step="${currentStep - 1}"]`);

    if (prevFormStep) {
        currentFormStep.classList.remove('active');
        prevFormStep.classList.add('active');
    }
}

/* Envio final: valida a última etapa, simula o envio e abre o WhatsApp com o resumo. */
function ligarEnvio() {
    const form = document.getElementById("multiStepForm");
    if (!form) return;
    document.documentElement.style.setProperty("--lt-cor", "#ff4d00");
    form.setAttribute("novalidate", "");
    LT.limparAoDigitar(form);
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const ultima = form.querySelector(".form-step.active") || form;
        if (!LT.validar(form, ultima)) return;
        const botao = form.querySelector("[type=submit]");
        LT.carregando(botao, true, "ENVIANDO…");
        await LT.esperar(1000);
        LT.carregando(botao, false);
        const resumo = LT.resumo(form);
        const link = LT.whatsapp(`Olá, GHBN Engenharia! Quero abrir um diálogo técnico:\n\n${resumo}`);
        LT.sucesso(form, {
            titulo: "Diálogo técnico aberto!",
            texto: "Abrimos o WhatsApp com o resumo da sua demanda. A equipe técnica responde em até 1 dia útil.",
            detalhe: resumo,
            link,
            aoRecomecar: () => {
                form.reset();
                form.querySelectorAll(".form-step").forEach((s) => s.classList.toggle("active", s.dataset.step === "1"));
            },
            rotuloRecomecar: "Nova solicitação",
        });
        LT.aviso("Solicitação técnica enviada.", "sucesso");
    });
}

document.addEventListener("DOMContentLoaded", ligarEnvio);
/* Fim do script. */
