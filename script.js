// Здесь будет JavaScript код
console.log('Сайт загружен');

// Создаем эффект частиц
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particlesContainer.appendChild(particle);
    }
}

// Анимация появления элементов при скролле
function animateOnScroll() {
    const elements = document.querySelectorAll('.advantage-item, .service-item, .review-item, .gallery-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease-out';
        observer.observe(element);
    });
}

// Анимация неонового свечения для кнопок
function addNeonEffect() {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.boxShadow = `0 0 20px ${getComputedStyle(button).borderColor}`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.boxShadow = 'none';
        });
    });
}

// Анимация градиента для заголовков
function animateGradient() {
    const headings = document.querySelectorAll('h1, h2');
    
    headings.forEach(heading => {
        const gradient = heading.style.background;
        if (gradient.includes('gradient')) {
            heading.style.backgroundSize = '200% 200%';
            heading.style.animation = 'gradientMove 5s ease infinite';
        }
    });
}

// Добавляем стили для анимаций
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        .particles-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        }
        
        .particle {
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 94, 26, 0.3);
            border-radius: 50%;
            animation: particleFloat 10s infinite;
        }
        
        @keyframes particleFloat {
            0% { transform: translateY(0) scale(1); opacity: 0; }
            50% { transform: translateY(-20px) scale(1.5); opacity: 1; }
            100% { transform: translateY(-40px) scale(1); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Кастомный курсор
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);

    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursorFollower);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(0.8)';
        cursorFollower.style.transform = 'scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
}

// Параллакс эффект
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = scrollTop * speed;
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });
}

// Улучшенные ховер-эффекты
function enhanceHoverEffects() {
    const elements = document.querySelectorAll('.advantage-item, .service-item, .review-item');
    
    elements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            const flash = document.createElement('div');
            flash.className = 'flash-effect';
            element.appendChild(flash);
            
            setTimeout(() => {
                element.removeChild(flash);
            }, 500);
        });
    });
}

// Скрывающийся header
function initHideableHeader() {
    const header = document.querySelector('.header');
    let headerVisible = false;
    let hideTimeout;

    function showHeader() {
        if (!headerVisible) {
            header.classList.add('header-visible');
            headerVisible = true;
        }
        clearTimeout(hideTimeout);
    }
    function hideHeader() {
        if (headerVisible) {
            header.classList.remove('header-visible');
            headerVisible = false;
        }
    }

    // Показываем header при наведении на верх экрана (20px) или сам header
    document.addEventListener('mousemove', (e) => {
        if (e.clientY < 20) {
            showHeader();
        } else if (!header.matches(':hover')) {
            hideTimeout = setTimeout(hideHeader, 600);
        }
    });
    header.addEventListener('mouseenter', showHeader);
    header.addEventListener('mouseleave', () => {
        hideTimeout = setTimeout(hideHeader, 600);
    });

    // Показываем header при фокусе (для клавиатуры)
    header.addEventListener('focusin', showHeader);
    header.addEventListener('focusout', () => {
        hideTimeout = setTimeout(hideHeader, 600);
    });

    // Показываем header при загрузке страницы на 1.5 сек, потом скрываем
    showHeader();
    setTimeout(hideHeader, 1500);
}

// Калькулятор на странице цен
function initPriceCalculator() {
    const problemBtns = document.querySelectorAll('#calc-problem .calc-btn');
    const bikeBtns = document.querySelectorAll('#calc-bike .calc-btn');
    const result = document.getElementById('calc-result');

    if (!problemBtns.length || !bikeBtns.length || !result) return;

    let selectedProblem = null;
    let selectedBike = null;

    const priceMap = {
        classic: { japan: [3500, 6000], china: [2500, 4000], ussr: [2000, 3500] },
        knock:   { japan: [5000, 12000], china: [3500, 7000], ussr: [3000, 6000] },
        dead:    { japan: [8000, 20000], china: [5000, 12000], ussr: [4000, 9000] },
    };
    const humorMap = {
        classic: 'Классика',
        knock: 'Стучит',
        dead: 'Умер на ходу',
        japan: 'Японка',
        china: 'Китаец',
        ussr: 'Советский',
    };

    function updateResult() {
        if (selectedProblem && selectedBike) {
            const [min, max] = priceMap[selectedProblem][selectedBike];
            let msg = `Готовь от ${min.toLocaleString()} ₽ до ${max.toLocaleString()} ₽`;
            if (selectedProblem === 'dead') msg += ' (но мы всё равно попробуем оживить)';
            if (selectedBike === 'china') msg += ' (дёшево, но… ну ты понял)';
            if (selectedBike === 'japan') msg += ' (надёжно, но не бесплатно)';
            if (selectedBike === 'ussr') msg += ' (бессмертный, но вечно больной)';
            result.textContent = msg;
            result.style.background = 'rgba(0,245,255,0.08)';
            result.style.color = 'var(--accent-blue)';
            result.style.animation = 'flash 0.7s';
            setTimeout(() => {
                result.style.animation = '';
            }, 700);
        } else {
            result.textContent = 'Готовь от 3 000 ₽ до… ой, лучше не спрашивай';
            result.style.background = 'rgba(255,94,26,0.08)';
            result.style.color = 'var(--accent-orange)';
        }
    }

    problemBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            problemBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedProblem = btn.dataset.value;
            updateResult();
        });
    });
    bikeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            bikeBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedBike = btn.dataset.value;
            updateResult();
        });
    });
}

// Интерактив для страницы отзывов
function initReviewsPage() {
    // Случайный фейк-отзыв
    const fakeReviews = [
        'Это лучший сервис! (Шучу, это мой гараж. Но спасибо.)',
        'Я не знаю, кто вы, но вы молодцы!',
        'Починили даже то, что не ломалось.',
        'Мама сказала, что я красавчик, а мотик теперь едет.',
        'Лучше, чем у дилера. И дешевле. И с приколами.'
    ];
    const fakeReviewBlock = document.getElementById('fake-review');
    if (fakeReviewBlock) {
        const idx = Math.floor(Math.random() * fakeReviews.length);
        fakeReviewBlock.textContent = fakeReviews[idx];
    }

    // Мигающая кнопка "ложь" (ничего не делает)
    const fakeBtn = document.getElementById('fake-btn');
    if (fakeBtn) {
        fakeBtn.addEventListener('click', () => {
            fakeBtn.classList.add('blink');
            setTimeout(() => fakeBtn.classList.remove('blink'), 600);
        });
    }

    // Модалка при отправке формы
    const form = document.getElementById('review-form');
    const modal = document.getElementById('review-modal');
    const yesBtn = document.getElementById('modal-yes');
    const noBtn = document.getElementById('modal-no');
    if (form && modal && yesBtn && noBtn) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            modal.classList.add('active');
        });
        yesBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            alert('Спасибо за отзыв! Если он будет смешной — мы его не удалим.');
            form.reset();
        });
        noBtn.addEventListener('click', () => {
            window.location.href = 'ilya.jpg';
        });
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    animateOnScroll();
    addNeonEffect();
    animateGradient();
    addAnimationStyles();
    initCustomCursor();
    initParallax();
    enhanceHoverEffects();
    initHideableHeader();
    initPriceCalculator();
    initReviewsPage();

    // Обработка формы
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[type="text"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const message = this.querySelector('textarea').value;
            
            console.log('Форма отправлена:', { name, phone, message });
            
            const submitButton = this.querySelector('button');
            submitButton.style.backgroundColor = '#00FF00';
            submitButton.style.boxShadow = '0 0 20px rgba(0, 255, 0, 0.5)';
            
            setTimeout(() => {
                this.reset();
                submitButton.style.backgroundColor = '';
                submitButton.style.boxShadow = '';
            }, 2000);
        });
    }
    
    // Обработка кнопки экстренного вызова
    const emergencyButton = document.querySelector('.emergency-button');
    if (emergencyButton) {
        emergencyButton.addEventListener('click', function() {
            this.style.animation = 'pulse 1s infinite';
            setTimeout(() => {
                this.style.animation = '';
            }, 1000);
            
            alert('Экстренный вызов принят! Мы свяжемся с вами в течение 5 минут.');
        });
    }
}); 