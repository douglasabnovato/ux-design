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
window.nextStep = function (currentStep) {
    const currentFormStep = document.querySelector(`.form-step[data-step="${currentStep}"]`);

    // Validação de seleção obrigatória de rádio na etapa atual
    const radios = currentFormStep.querySelectorAll('input[type="radio"]');
    if (radios.length > 0) {
        let selected = false;
        radios.forEach(r => { if (r.checked) selected = true; });
        if (!selected) {
            alert("Por favor, selecione uma opção para prosseguir com o estudo.");
            return;
        }
    }

    const nextFormStep = document.querySelector(`.form-step[data-step="${currentStep + 1}"]`);
    if (nextFormStep) {
        currentFormStep.classList.remove('active');
        nextFormStep.classList.add('active');
    }
}

window.prevStep = function (currentStep) {
    const currentFormStep = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    const prevFormStep = document.querySelector(`.form-step[data-step="${currentStep - 1}"]`);

    if (prevFormStep) {
        currentFormStep.classList.remove('active');
        prevFormStep.classList.add('active');
    }
}