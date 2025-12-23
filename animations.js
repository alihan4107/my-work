// Дополнительные анимации
document.addEventListener('DOMContentLoaded', function() {
    initSphereAnimations();
    initScrollAnimations();
    initButtonAnimations();
    initFloatingCards();
    initTypingAnimation();
    initLanguageCardsHover();
    initTestAnimations();
});

// Анимация сфер в герое
function initSphereAnimations() {
    const spheres = document.querySelectorAll('.language-sphere');
    
    if (!spheres.length) return;
    
    // Добавляем случайные начальные позиции и задержки
    spheres.forEach((sphere, index) => {
        // Случайная задержка для анимации
        const delay = Math.random() * 2;
        sphere.style.animationDelay = `${delay}s`;
        
        // Случайное направление вращения
        const rotationDirection = Math.random() > 0.5 ? 1 : -1;
        sphere.style.setProperty('--rotation-direction', rotationDirection);
        
        // Добавляем CSS переменную для вращения
        sphere.style.setProperty('--rotation-speed', `${1 + Math.random() * 2}s`);
    });
    
    // Добавляем CSS для вращения
    const style = document.createElement('style');
    style.textContent = `
        .language-sphere {
            animation: float 6s ease-in-out infinite;
        }
        
        .language-sphere:hover {
            animation-play-state: paused;
        }
        
        .sphere-content {
            animation: rotateSphere var(--rotation-speed, 3s) linear infinite;
            animation-direction: var(--rotation-direction, normal);
        }
        
        @keyframes rotateSphere {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);
}

// Анимации при скролле
function initScrollAnimations() {
    // Добавляем классы для анимации появления
    const animatedElements = document.querySelectorAll(
        '.language-card, .advantage-card, .pricing-card, .review-card'
    );
    
    animatedElements.forEach((element, index) => {
        element.classList.add('fade-in');
        // Добавляем задержку для последовательного появления
        element.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Наблюдатель за элементами при скролле
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    // Наблюдаем за всеми элементами с классом fade-in
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
    
    // Анимация навигации при скролле
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Показ/скрытие навигации при скролле
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Скролл вниз
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Скролл вверх
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // Добавление тени при скролле
        if (scrollTop > 50) {
            navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            navbar.style.boxShadow = 'var(--shadow-sm)';
        }
    });
}

// Анимации кнопок
function initButtonAnimations() {
    // Эффект ripple для всех кнопок с классом btn-primary
    const primaryButtons = document.querySelectorAll('.btn-primary');
    
    primaryButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Создаем элемент для эффекта ripple
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            // Удаляем элемент после анимации
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Добавляем стили для анимации ripple
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .btn-primary {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
    
    // Анимация для кнопок при наведении
    const allButtons = document.querySelectorAll('.btn');
    allButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Пульсация для главной CTA кнопки
    const mainCtaButton = document.querySelector('.hero-buttons .btn-primary');
    if (mainCtaButton) {
        setInterval(() => {
            mainCtaButton.classList.toggle('pulse-animation');
        }, 4000);
    }
}

// Анимация чисел в статистике
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Инициализация анимации чисел при появлении в viewport
document.addEventListener('DOMContentLoaded', function() {
    const numberElements = document.querySelectorAll('[data-count]');
    
    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.getAttribute('data-count'));
                animateCounter(element, target);
                numberObserver.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    numberElements.forEach(element => {
        numberObserver.observe(element);
    });
});

// Анимация для плавающих карточек
function initFloatingCards() {
    const cards = document.querySelectorAll('.floating-card');
    
    if (!cards.length) return;
    
    cards.forEach((card, index) => {
        // Добавляем случайные начальные параметры
        const randomDelay = Math.random() * 2;
        card.style.animationDelay = `${randomDelay}s`;
        
        // Эффект при наведении
        card.addEventListener('mouseenter', () => {
            const currentTransform = card.style.transform || '';
            card.style.transform = currentTransform + ' scale(1.1)';
            card.style.zIndex = '10';
            card.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = card.style.transform.replace(' scale(1.1)', '');
            card.style.zIndex = '';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        });
    });
}

// Анимация печатающегося текста
function initTypingAnimation() {
    const typingWords = document.querySelectorAll('.typing-word');
    
    if (!typingWords.length) return;
    
    // Убедимся, что первое слово видимо при загрузке
    typingWords[0].style.opacity = '1';
    
    // Добавляем анимацию для каждого слова
    typingWords.forEach((word, index) => {
        word.style.animation = `typingWords 12s infinite ${index * 3}s`;
    });
}

// Анимации для карточек языков
function initLanguageCardsHover() {
    const enhancedCards = document.querySelectorAll('.language-card.enhanced');
    
    enhancedCards.forEach(card => {
        // Эффект при наведении
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
            
            // Анимация для эффекта свечения
            const hoverEffect = this.querySelector('.card-hover-effect');
            if (hoverEffect) {
                hoverEffect.style.opacity = '1';
            }
            
            // Анимация иконки
            const icon = this.querySelector('.language-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '';
            
            // Убираем эффект свечения
            const hoverEffect = this.querySelector('.card-hover-effect');
            if (hoverEffect) {
                hoverEffect.style.opacity = '0';
            }
            
            // Возвращаем иконку в исходное состояние
            const icon = this.querySelector('.language-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
            }
        });
        
        // Клик по кнопке "Подробнее"
        const button = card.querySelector('button');
        if (button) {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Анимация клика
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
                
                // Показать информацию о языке
                const languageName = card.querySelector('.language-name').textContent;
                alert(`Вы выбрали курс: ${languageName}\nВ реальном приложении здесь открывалось бы модальное окно с подробной информацией.`);
            });
        }
    });
}

// Анимации для теста
function initTestAnimations() {
    const quizOptions = document.querySelectorAll('.quiz-option');
    
    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Убираем анимацию выбора у всех опций
            quizOptions.forEach(opt => {
                const content = opt.querySelector('.option-content');
                if (content) {
                    content.style.transform = 'scale(1)';
                }
            });
            
            // Добавляем анимацию выбора к текущей опции
            const optionContent = this.querySelector('.option-content');
            if (optionContent) {
                optionContent.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    optionContent.style.transform = 'scale(1)';
                }, 150);
            }
            
            // Анимация галочки выбора
            const checkIcon = this.querySelector('.option-check');
            if (checkIcon) {
                checkIcon.style.opacity = '1';
                checkIcon.style.transform = 'scale(1)';
                
                // Сбрасываем галочки у других опций
                quizOptions.forEach(opt => {
                    if (opt !== this) {
                        const otherCheck = opt.querySelector('.option-check');
                        if (otherCheck) {
                            otherCheck.style.opacity = '0';
                            otherCheck.style.transform = 'scale(0.5)';
                        }
                    }
                });
            }
        });
    });
    
    // Анимация для кнопки "Следующий вопрос"
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
        nextBtn.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.btn-icon');
            if (icon) {
                icon.style.transform = 'translateX(5px)';
            }
        });
        
        nextBtn.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.btn-icon');
            if (icon) {
                icon.style.transform = 'translateX(0)';
            }
        });
    }
}

// Анимация фоновых форм
function initBackgroundShapes() {
    const shapes = document.querySelectorAll('.bg-shape');
    
    shapes.forEach((shape, index) => {
        // Добавляем анимацию плавающих форм
        const duration = 20 + Math.random() * 10;
        const delay = Math.random() * 5;
        
        shape.style.animation = `floatShape ${duration}s ease-in-out infinite ${delay}s`;
        
        // Добавляем CSS для анимации
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatShape {
                0%, 100% {
                    transform: translate(0, 0) rotate(0deg);
                }
                25% {
                    transform: translate(10px, -10px) rotate(5deg);
                }
                50% {
                    transform: translate(-5px, 5px) rotate(-5deg);
                }
                75% {
                    transform: translate(5px, 10px) rotate(3deg);
                }
            }
        `;
        document.head.appendChild(style);
    });
}

// Инициализация всех анимаций
function initAllAnimations() {
    initBackgroundShapes();
    
    // Анимация для бейджей
    const badges = document.querySelectorAll('.hero-badge, .section-badge, .featured-badge');
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Анимация для иконок в преимуществах
    const advantageIcons = document.querySelectorAll('.advantage-icon');
    advantageIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0)';
        });
    });
}

// Запуск всех анимаций при полной загрузке страницы
window.addEventListener('load', function() {
    initAllAnimations();
    
    // Задержка для плавного появления элементов
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Устанавливаем начальную прозрачность для плавного появления
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
});

// Дополнительные анимации
document.addEventListener('DOMContentLoaded', function() {
    initSphereAnimations();
    initScrollAnimations();
    initButtonAnimations();
    initFloatingCards();
    initTypingAnimation();
    initLanguageCardsHover();
    initTestAnimations();
    initPricingAnimations(); // Добавляем анимации для тарифов
});

// ... остальной код из предыдущего файла ...

// Анимации для тарифов
function initPricingAnimations() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        // Эффект при наведении на карточку тарифа
        card.addEventListener('mouseenter', function() {
            const featuredBadge = this.querySelector('.featured-badge');
            if (featuredBadge) {
                featuredBadge.style.transform = 'translateX(-50%) translateY(-5px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const featuredBadge = this.querySelector('.featured-badge');
            if (featuredBadge) {
                featuredBadge.style.transform = 'translateX(-50%) translateY(0)';
            }
        });
        
        // Анимация для кнопки выбора тарифа
        const pricingBtn = card.querySelector('.pricing-btn');
        if (pricingBtn) {
            pricingBtn.addEventListener('mouseenter', function() {
                if (this.classList.contains('btn-primary')) {
                    this.style.boxShadow = '0 8px 25px rgba(67, 97, 238, 0.5)';
                } else {
                    this.style.boxShadow = '0 8px 25px rgba(67, 97, 238, 0.2)';
                }
            });
            
            pricingBtn.addEventListener('mouseleave', function() {
                if (this.classList.contains('btn-primary')) {
                    this.style.boxShadow = '0 4px 15px rgba(67, 97, 238, 0.3)';
                } else {
                    this.style.boxShadow = 'none';
                }
            });
        }
    });
    
    // Анимация для переключателя тарифов
    const toggleSwitch = document.querySelector('.toggle-slider');
    if (toggleSwitch) {
        toggleSwitch.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
}

// Анимация для кнопок "Подробнее" в карточках языков
function initLanguageCardsButtons() {
    const languageButtons = document.querySelectorAll('.language-card .btn');
    
    languageButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Анимация нажатия
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Если это кнопка "Начать обучение", показываем модальное окно
            if (this.textContent.includes('Начать обучение') || this.textContent.includes('Выбрать курс')) {
                e.preventDefault();
                
                const languageCard = this.closest('.language-card');
                const languageName = languageCard.querySelector('.language-name').textContent;
                
                const modal = document.getElementById('language-modal');
                const modalBody = modal.querySelector('.modal-body');
                
                modalBody.innerHTML = `
                    <h3>${languageName}</h3>
                    <p>Отличный выбор! Язык ${languageName} откроет для вас новые возможности.</p>
                    
                    <div style="margin: 20px 0; padding: 15px; background: var(--light); border-radius: 12px;">
                        <h4>Следующие шаги:</h4>
                        <ol style="margin-left: 20px; margin-top: 10px;">
                            <li style="margin-bottom: 8px;">Заполните форму регистрации ниже</li>
                            <li style="margin-bottom: 8px;">Определите свой уровень на бесплатном уроке</li>
                            <li>Начните обучение по индивидуальной программе</li>
                        </ol>
                    </div>
                    
                    <div style="display: flex; gap: 15px; margin-top: 25px;">
                        <button class="btn btn-outline" onclick="closeModal()">Вернуться к выбору</button>
                        <button class="btn btn-primary" onclick="window.location.href='#registration'">Записаться на курс</button>
                    </div>
                `;
                
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
}

// Инициализация всех анимаций при загрузке
window.addEventListener('load', function() {
    initLanguageCardsButtons();
});