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
window.nextStep = function(currentStep) {
    const currentFormStep = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    
    // Validação simples de campos obrigatórios da etapa atual
    const radios = currentFormStep.querySelectorAll('input[type="radio"]');
    if (radios.length > 0) {
        let selected = false;
        radios.forEach(r => { if (r.checked) selected = true; });
        if (!selected) {
            alert("Por favor, selecione uma opção para prosseguir.");
            return;
        }
    }

    const nextFormStep = document.querySelector(`.form-step[data-step="${currentStep + 1}"]`);
    if (nextFormStep) {
        currentFormStep.classList.remove('active');
        nextFormStep.classList.add('active');
    }
}

window.prevStep = function(currentStep) {
    const currentFormStep = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    const prevFormStep = document.querySelector(`.form-step[data-step="${currentStep - 1}"]`);
    
    if (prevFormStep) {
        currentFormStep.classList.remove('active');
        prevFormStep.classList.add('active');
    }
}