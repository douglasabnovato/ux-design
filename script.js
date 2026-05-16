// Configurações
const CONFIG = {
    animationDuration: 300,
    rippleColor: 'rgba(0, 212, 212, 0.5)',
};

// Elementos
const projectCards = document.querySelectorAll('.project-card');
const header = document.querySelector('.header');

// Inicializar ao carregar página
document.addEventListener('DOMContentLoaded', () => {
    initializeCards();
    animateHeader();
});

// Animar header ao carregar
function animateHeader() {
    const headerTitle = document.querySelector('.header h1');
    const headerSubtitle = document.querySelector('.header p');

    headerTitle.style.animation = 'slideDown 0.6s ease-out';
    headerSubtitle.style.animation = 'slideDown 0.8s ease-out';
}

// Inicializar cards com eventos
function initializeCards() {
    projectCards.forEach((card, index) => {
        // Atraso progressivo na animação
        card.style.animation = `slideDown 0.6s ease-out ${index * 0.1}s both`;

        // Evento de clique
        card.addEventListener('click', (e) => {
            createRipple(e, card);
            navigateToProject(card);
        });

        // Evento de hover
        card.addEventListener('mouseenter', () => {
            addHoverEffect(card);
        });

        card.addEventListener('mouseleave', () => {
            removeHoverEffect(card);
        });

        // Efeito visual ao focar (accessibility)
        card.addEventListener('focus', () => {
            card.style.outline = `2px solid var(--primary-color)`;
            card.style.outlineOffset = '4px';
        });

        card.addEventListener('blur', () => {
            card.style.outline = 'none';
        });
    });
}

// Criar efeito ripple ao clicar
function createRipple(event, card) {
    const ripple = document.createElement('span');
    const rect = card.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    // Estilos do ripple
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = CONFIG.rippleColor;
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = `rippleAnimation ${CONFIG.animationDuration}ms ease-out`;
    ripple.style.pointerEvents = 'none';

    card.style.position = 'relative';
    card.style.overflow = 'hidden';
    card.appendChild(ripple);

    // Remover ripple após animação
    setTimeout(() => ripple.remove(), CONFIG.animationDuration);
}

// Adicionar efeito visual ao hover
function addHoverEffect(card) {
    const icon = card.querySelector('.card-icon');
    if (icon) {
        icon.style.transform = 'scale(1.2) rotate(5deg)';
    }
}

// Remover efeito visual do hover
function removeHoverEffect(card) {
    const icon = card.querySelector('.card-icon');
    if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
    }
}

// Navegar para o projeto
function navigateToProject(card) {
    const href = card.getAttribute('href');
    
    if (href) {
        // Adicionar delay para feedback visual
        setTimeout(() => {
            window.location.href = href;
        }, 150);
    }
}

// Adicionar animação ripple ao CSS dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleAnimation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Função de logging (opcional)
function logProjectClick(projectName) {
    console.log(`Projeto clicado: ${projectName} - ${new Date().toLocaleTimeString()}`);
}

// Melhoramento: Adicionar logger aos cards
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectName = card.querySelector('h2').textContent;
        logProjectClick(projectName);
    });
});

// Detectar suporte a transições CSS
function supportsTransitions() {
    const element = document.createElement('div');
    return (
        'transition' in element.style ||
        'WebkitTransition' in element.style ||
        'MozTransition' in element.style
    );
}

// Log de inicialização
console.log('✨ UX Design Portfolio inicializado com sucesso');
console.log(`📱 Suporte a transições CSS: ${supportsTransitions()}`);
console.log(`🎯 Projetos carregados: ${projectCards.length}`);