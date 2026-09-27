/**
 * MARCENEIRO_RPC // RPC ATELIÊ - MARCENARIA FINA E ALTO PADRÃO
 * Script Técnico: Navegação de Precisão e Fluxo Multi-step
 */

document.addEventListener("DOMContentLoaded", () => {

    // 1. Navegação de Precisão (Scroll Instantâneo)
    const links = document.querySelectorAll('nav a');

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute('href');

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

    // 2. Monitoramento e Tratamento de Erros de Imagens do Portfólio
    const projectImages = document.querySelectorAll('.board-item img');

    projectImages.forEach(img => {
        img.addEventListener('error', () => {
            console.warn(`[MARCENEIRO_RPC_WARN] Falha ao carregar asset visual: ${img.src}`);
            img.style.opacity = '0.2';
            img.style.filter = 'grayscale(100%)';
        });

        img.addEventListener('load', () => {
            img.style.opacity = '0.85';
        });
    });

    // Assinatura e Diagnóstico do Core no Console
    console.log("%c MARCENEIRO_RPC_RPC_ATELIER_v1.0.0 ", "background: #c5a880; color: #0e1013; font-weight: bold; padding: 4px; font-family: monospace;");
    console.log("%c Status: Curadoria de projetos e sistema multi-step carregados com sucesso.", "color: #9ca3af; font-family: monospace;");
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
    document.documentElement.style.setProperty("--lt-cor", "#c5a880");
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
        const link = LT.whatsapp(`Olá, RPC Ateliê! Quero um estudo exclusivo de marcenaria:\n\n${resumo}`);
        LT.sucesso(form, {
            titulo: "Demanda enviada ao ateliê!",
            texto: "Abrimos o WhatsApp com o resumo do seu projeto. O ateliê responde em até 1 dia útil com os próximos passos.",
            detalhe: resumo,
            link,
            aoRecomecar: () => {
                form.reset();
                form.querySelectorAll(".form-step").forEach((s) => s.classList.toggle("active", s.dataset.step === "1"));
            },
            rotuloRecomecar: "Nova solicitação",
        });
        LT.aviso("Solicitação enviada ao ateliê.", "sucesso");
    });
}

document.addEventListener("DOMContentLoaded", ligarEnvio);
/* Fim do script. */
