document.addEventListener('DOMContentLoaded', () => {

    // --- 1. LÓGICA DE LOGIN/LOGOUT NA NAVBAR ---
    const userMatricula = localStorage.getItem('usuarioMatricula');
    const navLinksContainer = document.querySelector('.nav-links');

    if (navLinksContainer) {
        if (userMatricula) {
            // SE ESTIVER LOGADO: Esconde login/cadastro e mostra Logout
            navLinksContainer.innerHTML = `
                <a href="/html/feed.html" class="nav-link"><i class="fas fa-stream"></i> Feed</a>
                <a href="/html/pergunta.html" class="nav-link"><i class="fas fa-plus"></i> Nova Pergunta</a>
                <a href="/html/perfil.html" class="profile-icon-link" title="Meu Perfil">
                    <i class="fas fa-user-circle"></i>
                </a>
                <a href="#" onclick="logout()" style="color:white; margin-left:10px; font-size:0.9rem;">Sair</a>
            `;
        } else {
            // SE NÃO ESTIVER LOGADO: Mostra padrão
            navLinksContainer.innerHTML = `
                <a href="/html/autenticacao.html#login">Entrar</a>
                <a href="/html/autenticacao.html#register">Cadastre-se</a>
                <a href="/html/feed.html" class="nav-link"><i class="fas fa-stream"></i> Feed</a>
                <a href="/html/pergunta.html" class="nav-link"><i class="fas fa-plus"></i> Nova Pergunta</a>
                <a href="/html/perfil.html" class="profile-icon-link" title="Meu Perfil">
                    <i class="fas fa-user-circle"></i>
                </a>
            `;
        }
    }

    // Função de Logout Global para a Home
    window.logout = function() {
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload(); // Recarrega a página para atualizar o menu
    }

    // --- 2. CARROSSÉIS (Lógica Mantida) ---
    const setupContentCarousel = (sectionSelector, containerSelector, itemSelector) => {
        const section = document.querySelector(sectionSelector);
        if (!section) return;

        const container = section.querySelector(containerSelector);
        const items = section.querySelectorAll(itemSelector);
        if (!container || items.length === 0) return;

        const leftArrow = section.querySelector('.carousel-arrow.left');
        const rightArrow = section.querySelector('.carousel-arrow.right');
        const dotsContainer = section.querySelector('.carousel-dots');
        const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];
        
        let currentIndex = 0;

        const updateDots = () => {
            if (dots.length === 0) return;
            dots.forEach((dot, index) => {
                dot.classList.remove('active');
                if (index === currentIndex) dot.classList.add('active');
            });
        };

        const updateCarousel = () => {
            if (items.length === 0) return;
            const firstItem = items[0];
            const itemStyle = getComputedStyle(firstItem);
            const itemWidth = firstItem.offsetWidth + parseFloat(itemStyle.marginRight) + parseFloat(itemStyle.marginLeft);
            container.scroll({ left: currentIndex * itemWidth, behavior: 'smooth' });
            updateDots();
        };
        
        if (rightArrow) {
            rightArrow.addEventListener('click', () => {
                currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0; 
                updateCarousel();
            });
        }

        if (leftArrow) {
            leftArrow.addEventListener('click', () => {
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1; 
                updateCarousel();
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
            });
        });

        window.addEventListener('resize', updateCarousel);
        updateDots(); 
    };

    const setupCategoryCarouselLoop = (sectionSelector) => {
        const section = document.querySelector(sectionSelector);
        if (!section) return;

        const categoryCarousel = section.querySelector('.categories-carousel');
        const categoryItems = section.querySelectorAll('.category-item');
        const categoryLeftArrow = section.querySelector('.carousel-arrow.left');
        const categoryRightArrow = section.querySelector('.carousel-arrow.right');

        if (!categoryCarousel || categoryItems.length === 0) return;

        let currentIndex = 0;

        const updateActiveState = () => {
             categoryItems.forEach((item, index) => {
                item.classList.remove('active');
                if (index === currentIndex) item.classList.add('active');
             });
        }

        const updateCarousel = () => {
            const firstItem = categoryItems[0];
            const itemStyle = getComputedStyle(firstItem);
            const itemWidth = firstItem.offsetWidth + parseFloat(itemStyle.marginRight); 
            categoryCarousel.scroll({ left: currentIndex * itemWidth, behavior: 'smooth' });
            updateActiveState();
        };

        if (categoryRightArrow) {
            categoryRightArrow.addEventListener('click', () => {
                currentIndex = (currentIndex < categoryItems.length - 1) ? currentIndex + 1 : 0;
                updateCarousel();
            });
        }

        if (categoryLeftArrow) {
            categoryLeftArrow.addEventListener('click', () => {
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : categoryItems.length - 1;
                updateCarousel();
            });
        }

        window.addEventListener('resize', updateCarousel);
        updateActiveState();
    };

    setupCategoryCarouselLoop('.categories-section'); 
    setupContentCarousel('.faq-section', '.faq-carousel', '.faq-card');
    setupContentCarousel('.news-section', '.news-carousel', '.news-card');
});