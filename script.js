/**
 * PORTFÓLIO INTERATIVO - JAQUELINE LIMA
 * SCRIPT DE INTERAÇÕES E ANIMAÇÕES
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initCardGlowEffect();
    initScrollActiveLinks();
    initContactForm();
    initSkillFilters();
    initTerminalDev();
    initCaseStudies();
    initScrollReveal();
});

/**
 * 1. CONTROLE DO MENU RESPONSIVO MOBILE
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const menuLinks = document.querySelectorAll('.menu-link');

    if (!menuToggle || !navMenu) return;

    // Toggle menu
    menuToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.contains('open');
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Fechar menu ao clicar em qualquer link
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Fechar ao clicar fora do menu
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('open')) {
            closeMenu();
        }
    });

    function openMenu() {
        navMenu.classList.add('open');
        menuToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // Impede scroll com menu aberto
    }

    function closeMenu() {
        navMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = ''; // Restaura scroll
    }
}



/**
 * 3. EFEITO DE BRILHO SEGUIDOR DO CURSOR (MOUSE GLOW) NOS CARDS
 */
function initCardGlowEffect() {
    const skillBadges = document.querySelectorAll('.skill-badge');
    
    // Brilho local nos badges de habilidades
    skillBadges.forEach(badge => {
        badge.addEventListener('mousemove', (e) => {
            const rect = badge.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            badge.style.setProperty('--mouse-x', `${x}px`);
            badge.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Brilho global seguindo o mouse no plano de fundo (body)
    document.addEventListener('mousemove', (e) => {
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    });
}

/**
 * 4. HIGHLIGHT ATIVO DO MENU CONFORME SCROLL (INTERSECTION OBSERVER)
 */
function initScrollActiveLinks() {
    const sections = document.querySelectorAll('section[id]');
    const menuLinks = document.querySelectorAll('.menu-link');
    
    if (sections.length === 0 || menuLinks.length === 0) return;
    
    const observerOptions = {
        root: null,
        threshold: 0.3, // Dispara quando 30% da seção está visível
        rootMargin: '-70px 0px 0px 0px' // Compensar altura do cabeçalho
    };
    
    const activeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                
                menuLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === `#${activeId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        activeObserver.observe(section);
    });
}

/**
 * 5. FEEDBACK DO FORMULÁRIO DE CONTATO (SIMULAÇÃO COM TOAST)
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const toastContainer = document.getElementById('toastContainer');
    
    if (!contactForm || !toastContainer) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Obter valores para feedback (opcional)
        const nameInput = document.getElementById('nome');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('mensagem');
        
        // Simular envio
        const submitButton = contactForm.querySelector('.send-btn');
        const originalBtnContent = submitButton.innerHTML;
        
        submitButton.disabled = true;
        submitButton.innerHTML = `<span>Enviando...</span><svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>`;
        
        // CSS temporário para animação de loading no JS se não declarado
        if (!document.getElementById('spinStyle')) {
            const style = document.createElement('style');
            style.id = 'spinStyle';
            style.innerHTML = `@keyframes spin { 100% { transform: rotate(360deg); } }`;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            // Sucesso simulado
            showToast('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
            
            // Limpar formulário
            contactForm.reset();
            
            // Resetar botão
            submitButton.disabled = false;
            submitButton.innerHTML = originalBtnContent;
        }, 1500);
    });
    
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        // Ícone de Sucesso SVG
        const successIcon = `
            <svg class="toast-success-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
        `;
        
        toast.innerHTML = `
            ${successIcon}
            <span>${message}</span>
        `;
        
        toastContainer.appendChild(toast);
        
        // Animação de entrada
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Remoção após 4 segundos
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 400);
        }, 4000);
    }
}

/**
 * 6. FILTRO DE CATEGORIAS DE HABILIDADES
 */
function initSkillFilters() {
    const filterButtons = document.querySelectorAll('.skills-filter .filter-btn');
    const skillBadges = document.querySelectorAll('.skill-badge');
    
    if (filterButtons.length === 0 || skillBadges.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Alterar botão ativo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            skillBadges.forEach(badge => {
                const categories = badge.getAttribute('data-category');
                
                if (filterValue === 'all') {
                    badge.classList.remove('hidden');
                } else if (categories && categories.split(' ').includes(filterValue)) {
                    badge.classList.remove('hidden');
                } else {
                    badge.classList.add('hidden');
                }
            });
        });
    });
}

/**
 * 7. TERMINAL DE DESENVOLVEDOR INTERATIVO ( VS CODE FEEL )
 */
function initTerminalDev() {
    const tabs = document.querySelectorAll('#terminalTabs .tab');
    const sidebarFiles = document.querySelectorAll('.terminal-sidebar .file');
    const codeBlocks = document.querySelectorAll('.code-editor');

    if (tabs.length === 0 || codeBlocks.length === 0) return;

    function switchTab(tabId) {
        // Desativar todas as abas, itens da barra lateral e blocos de código
        tabs.forEach(t => t.classList.remove('active'));
        sidebarFiles.forEach(f => f.classList.remove('active'));
        codeBlocks.forEach(c => c.classList.remove('active'));

        // Ativar os selecionados
        const activeTabs = document.querySelectorAll(`[data-tab="${tabId}"]`);
        activeTabs.forEach(at => at.classList.add('active'));
        
        const activeCode = document.getElementById(`code-${tabId}`);
        if (activeCode) activeCode.classList.add('active');
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchTab(tab.getAttribute('data-tab'));
        });
    });

    sidebarFiles.forEach(file => {
        file.addEventListener('click', () => {
            switchTab(file.getAttribute('data-tab'));
        });
    });
}

/**
 * 8. CONTROLE DE EXPANSÃO DOS ESTUDOS DE CASO (GAVETAS)
 */
function initCaseStudies() {
    const toggleButtons = document.querySelectorAll('.btn-toggle-estudo');
    
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const drawer = document.getElementById(targetId);
            
            if (drawer) {
                const isOpen = drawer.classList.contains('open');
                
                if (isOpen) {
                    drawer.classList.remove('open');
                    btn.classList.remove('active');
                    btn.querySelector('span').textContent = 'Estudo de Caso';
                } else {
                    drawer.classList.add('open');
                    btn.classList.add('active');
                    btn.querySelector('span').textContent = 'Fechar Estudo';
                }
            }
        });
    });
}

/**
 * 9. MECANISMO DE SCROLL REVEAL (INTERSECTION OBSERVER)
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-element, .timeline-item');
    
    if (revealElements.length === 0) return;
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Parar de observar após animar
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}
