// Основной JavaScript файл для PolyglotWay

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех компонентов
    initThemeToggle();
    initMobileMenu();
    initSmoothScroll();
    initLanguageCards();
    initCounterAnimations();
    initFormValidation();
    initModal();
    initScrollAnimations();
});

// Переключение темы
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-switch');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Установка сохраненной темы
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.checked = savedTheme === 'dark';
    
    // Обработчик переключения темы
    themeToggle.addEventListener('change', function() {
        const theme = this.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });
}

// Мобильное меню
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!menuToggle || !navMenu) return;
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
        
        // Анимация бургер-меню
        const bars = this.querySelectorAll('.menu-bar');
        if (navMenu.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
    
    // Закрытие меню при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            
            const bars = menuToggle.querySelectorAll('.menu-bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });
    
    // Закрытие меню при клике вне его
    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            
            const bars = menuToggle.querySelectorAll('.menu-bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
}

// Плавная прокрутка
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '#!') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (!targetElement) return;
            
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// Карточки языков
function initLanguageCards() {
    const languageCards = document.querySelectorAll('.language-card');
    const cardButtons = document.querySelectorAll('.card-btn');
    const modal = document.getElementById('language-modal');
    
    if (!languageCards.length || !modal) return;
    
    // Добавление обработчиков для карточек
    languageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Обработчики для кнопок "Подробнее"
    cardButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            openLanguageModal(index);
        });
    });
    
    // Открытие модального окна с информацией о языке
    function openLanguageModal(index) {
        const languages = [
            {
                title: 'Арабский язык',
                description: 'Арабский язык является официальным в 26 странах и на нем говорят более 420 миллионов человек. Это язык Корана и богатейшей арабской культуры.',
                features: [
                    'Изучение арабской письменности и алфавита',
                    'Классический арабский и современные диалекты',
                    'Культура и традиции арабских стран',
                    'Деловой арабский для работы'
                ],
                difficulty: 'Высокая',
                lessons: '24 урока',
                students: '1200 учеников'
            },
            {
                title: 'Русский язык',
                description: 'Русский язык - самый распространенный славянский язык в мире, на котором говорят более 258 миллионов человек.',
                features: [
                    'Грамматика и синтаксис русского языка',
                    'Русская литература и культура',
                    'Разговорная практика с носителями',
                    'Подготовка к экзаменам ТРКИ'
                ],
                difficulty: 'Средняя',
                lessons: '18 уроков',
                students: '2800 учеников'
            },
            {
                title: 'Английский язык',
                description: 'Английский - международный язык бизнеса, науки и путешествий, на котором говорят более 1.5 миллиардов человек по всему миру.',
                features: [
                    'Бизнес-английский для работы',
                    'Подготовка к IELTS, TOEFL, Cambridge',
                    'Сленг, идиомы и разговорный английский',
                    'Английский для IT-специалистов'
                ],
                difficulty: 'Низкая',
                lessons: '32 урока',
                students: '3500 учеников'
            },
            {
                title: 'Испанский язык',
                description: 'Испанский язык является вторым по распространенности родным языком в мире, на нем говорят более 580 миллионов человек.',
                features: [
                    'Латиноамериканские и европейские диалекты',
                    'Культура испаноязычных стран',
                    'Практика с носителями из разных стран',
                    'Испанский для путешествий'
                ],
                difficulty: 'Низкая',
                lessons: '20 уроков',
                students: '1900 учеников'
            }
        ];
        
        const language = languages[index];
        const modalBody = modal.querySelector('.modal-body');
        
        modalBody.innerHTML = `
            <h3>${language.title}</h3>
            <p>${language.description}</p>
            
            <div class="modal-stats" style="display: flex; gap: 30px; margin: 30px 0;">
                <div class="stat">
                    <div class="stat-value">${language.difficulty}</div>
                    <div class="stat-label">Сложность</div>
                </div>
                <div class="stat">
                    <div class="stat-value">${language.lessons}</div>
                    <div class="stat-label">Количество уроков</div>
                </div>
                <div class="stat">
                    <div class="stat-value">${language.students}</div>
                    <div class="stat-label">Учеников на курсе</div>
                </div>
            </div>
            
            <h4 style="margin-bottom: 15px;">Что входит в курс:</h4>
            <ul style="margin-bottom: 30px;">
                ${language.features.map(feature => `<li style="margin-bottom: 10px; display: flex; align-items: center; gap: 10px;"><i class="fas fa-check" style="color: #28a745;"></i> ${feature}</li>`).join('')}
            </ul>
            
            <button class="btn btn-primary" style="width: 100%;" onclick="window.location.href='#registration'">Записаться на курс</button>
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Закрытие модального окна
    const closeModal = modal.querySelector('.modal-close');
    const modalOverlay = modal.querySelector('.modal-overlay');
    
    closeModal.addEventListener('click', closeModalHandler);
    modalOverlay.addEventListener('click', closeModalHandler);
    
    function closeModalHandler() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Закрытие по клавише Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModalHandler();
        }
    });
}

// Анимация счетчиков
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    if (!counters.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000; // 2 секунды
                const step = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Валидация формы
function initFormValidation() {
    const form = document.getElementById('signup-form');
    if (!form) return;
    
    const submitBtn = form.querySelector('#submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Валидация полей
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const languageSelect = document.getElementById('language-select');
        
        let isValid = true;
        
        // Валидация имени
        if (!nameInput.value.trim()) {
            showError(nameInput, 'Пожалуйста, введите ваше имя');
            isValid = false;
        } else {
            clearError(nameInput);
        }
        
        // Валидация email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim()) {
            showError(emailInput, 'Пожалуйста, введите ваш email');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value)) {
            showError(emailInput, 'Пожалуйста, введите корректный email');
            isValid = false;
        } else {
            clearError(emailInput);
        }
        
        // Валидация выбора языка
        if (!languageSelect.value) {
            showError(languageSelect.parentElement, 'Пожалуйста, выберите язык');
            isValid = false;
        } else {
            clearError(languageSelect.parentElement);
        }
        
        if (!isValid) return;
        
        // Имитация отправки формы
        btnText.style.display = 'none';
        btnLoader.style.display = 'block';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // В реальном приложении здесь был бы fetch запрос
            
            // Показываем сообщение об успехе
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <div style="background-color: #d4edda; color: #155724; padding: 15px; border-radius: 8px; margin-top: 20px; border: 1px solid #c3e6cb;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-check-circle" style="color: #28a745; font-size: 20px;"></i>
                        <div>
                            <strong>Заявка отправлена успешно!</strong>
                            <p style="margin: 5px 0 0 0; font-size: 14px;">Мы свяжемся с вами в течение 24 часов для подтверждения пробного урока.</p>
                        </div>
                    </div>
                </div>
            `;
            
            form.appendChild(successMessage);
            
            // Сброс формы
            form.reset();
            
            // Восстановление кнопки
            btnText.style.display = 'block';
            btnLoader.style.display = 'none';
            submitBtn.disabled = false;
            
            // Прокрутка к сообщению об успехе
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Удаление сообщения через 5 секунд
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        }, 1500);
    });
    
    // Функции для отображения ошибок
    function showError(input, message) {
        clearError(input);
        
        const error = document.createElement('div');
        error.className = 'error-message';
        error.style.color = '#dc3545';
        error.style.fontSize = '14px';
        error.style.marginTop = '5px';
        error.textContent = message;
        
        input.parentElement.appendChild(error);
        input.style.borderColor = '#dc3545';
        
        // Анимация встряски
        input.classList.add('shake');
        setTimeout(() => {
            input.classList.remove('shake');
        }, 500);
    }
    
    function clearError(input) {
        const error = input.parentElement.querySelector('.error-message');
        if (error) {
            error.remove();
        }
        input.style.borderColor = '';
    }
}

// Модальное окно
function initModal() {
    // Уже инициализировано в initLanguageCards
}

// Анимации при скролле
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if (!fadeElements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Переключение тарифов (месяц/год)
function initPricingToggle() {
    const toggle = document.getElementById('pricing-toggle');
    const priceAmounts = document.querySelectorAll('.price-amount');
    
    if (!toggle || !priceAmounts.length) return;
    
    toggle.addEventListener('change', function() {
        const isYearly = this.checked;
        
        priceAmounts.forEach(amount => {
            const monthlyPrice = amount.getAttribute('data-monthly');
            const yearlyPrice = amount.getAttribute('data-yearly');
            
            amount.textContent = isYearly ? yearlyPrice : monthlyPrice;
            
            // Анимация изменения цены
            amount.style.transform = 'scale(1.1)';
            setTimeout(() => {
                amount.style.transform = 'scale(1)';
            }, 200);
        });
    });
}

// Инициализация переключения тарифов при загрузке
document.addEventListener('DOMContentLoaded', initPricingToggle);

// Функционал для тарифов
function initPricing() {
    const pricingToggle = document.getElementById('pricing-toggle');
    const priceAmounts = document.querySelectorAll('.price-amount');
    const pricingButtons = document.querySelectorAll('.pricing-btn');
    
    // Переключение периодов (месяц/год)
    if (pricingToggle && priceAmounts.length) {
        pricingToggle.addEventListener('change', function() {
            const isYearly = this.checked;
            
            priceAmounts.forEach(amount => {
                const monthlyPrice = amount.getAttribute('data-monthly');
                const yearlyPrice = amount.getAttribute('data-yearly');
                
                if (monthlyPrice && yearlyPrice) {
                    amount.textContent = isYearly ? yearlyPrice : monthlyPrice;
                    
                    // Анимация изменения цены
                    amount.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        amount.style.transform = 'scale(1)';
                    }, 200);
                }
            });
        });
    }
    
    // Обработчики для кнопок выбора тарифа
    if (pricingButtons.length) {
        pricingButtons.forEach((button, index) => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Определяем выбранный тариф
                let tariffName = '';
                let tariffPrice = '';
                
                const pricingCard = this.closest('.pricing-card');
                if (pricingCard) {
                    const title = pricingCard.querySelector('.pricing-title');
                    const price = pricingCard.querySelector('.price-amount');
                    
                    tariffName = title ? title.textContent : `Тариф ${index + 1}`;
                    tariffPrice = price ? price.textContent : '';
                }
                
                // Анимация нажатия кнопки
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
                
                // Показываем модальное окно или перенаправляем на регистрацию
                const modal = document.getElementById('language-modal');
                const modalBody = modal.querySelector('.modal-body');
                
                modalBody.innerHTML = `
                    <h3>Выбор тарифа</h3>
                    <p>Вы выбрали тариф: <strong>${tariffName}</strong></p>
                    ${tariffPrice ? `<p>Стоимость: <strong>${tariffPrice} ₽</strong></p>` : ''}
                    
                    <div style="margin: 30px 0; padding: 20px; background: var(--light); border-radius: 12px;">
                        <h4 style="margin-bottom: 15px;">Что дальше?</h4>
                        <ol style="margin-left: 20px;">
                            <li style="margin-bottom: 10px;">Заполните форму регистрации</li>
                            <li style="margin-bottom: 10px;">С вами свяжется менеджер для подтверждения</li>
                            <li>Начнете обучение в выбранное время</li>
                        </ol>
                    </div>
                    
                    <div style="display: flex; gap: 15px; margin-top: 30px;">
                        <button class="btn btn-outline" onclick="closeModal()">Вернуться к тарифам</button>
                        <button class="btn btn-primary" onclick="window.location.href='#registration'">Перейти к регистрации</button>
                    </div>
                `;
                
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
    }
}

// Функция для закрытия модального окна
function closeModal() {
    const modal = document.getElementById('language-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Обновляем обработчики модального окна в initModal() функции
function initModal() {
    const modal = document.getElementById('language-modal');
    if (!modal) return;
    
    const closeModalBtn = modal.querySelector('.modal-close');
    const modalOverlay = modal.querySelector('.modal-overlay');
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }
    
    // Закрытие по клавише Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Добавляем вызов новых функций в DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех компонентов
    initThemeToggle();
    initMobileMenu();
    initSmoothScroll();
    initLanguageCards();
    initCounterAnimations();
    initFormValidation();
    initModal();
    initScrollAnimations();
    initPricing(); // Добавляем инициализацию тарифов
});

// Делаем функцию closeModal глобальной
window.closeModal = closeModal;



// Функция для видеофона
function initVideoBackground() {
    const video = document.getElementById('hero-video');
    const fallbackImage = document.getElementById('fallback-image');
    const heroSection = document.querySelector('.hero-section');
    
    if (!video || !heroSection) return;
    
    console.log('Инициализация видеофона...');
    
    // Функция для показа фоллбэк изображения
    function showFallbackImage() {
        console.log('Показ фоллбэк изображения');
        if (fallbackImage) {
            fallbackImage.classList.add('active');
        }
        
        // Также добавляем CSS градиент как дополнительный фон
        heroSection.style.background = 'linear-gradient(135deg, #4361EE 0%, #3A0CA3 30%, #7209B7 70%, #F72585 100%)';
        
        // Добавляем анимированные элементы для красоты
        createAnimatedBackground();
    }
    
    // Функция для создания анимированного фона
    function createAnimatedBackground() {
        const animatedBg = document.createElement('div');
        animatedBg.className = 'animated-background';
        animatedBg.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            overflow: hidden;
        `;
        
        // Создаем 8 анимированных кругов
        for (let i = 0; i < 8; i++) {
            const circle = document.createElement('div');
            const size = 50 + Math.random() * 150;
            const duration = 15 + Math.random() * 20;
            const delay = Math.random() * 5;
            
            circle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: floatElement ${duration}s infinite ease-in-out;
                animation-delay: ${delay}s;
                opacity: 0.3;
            `;
            
            animatedBg.appendChild(circle);
        }
        
        heroSection.appendChild(animatedBg);
        
        // Добавляем CSS анимацию
        if (!document.querySelector('#animated-bg-styles')) {
            const style = document.createElement('style');
            style.id = 'animated-bg-styles';
            style.textContent = `
                @keyframes floatElement {
                    0%, 100% {
                        transform: translate(0, 0) scale(1) rotate(0deg);
                    }
                    25% {
                        transform: translate(20px, -30px) scale(1.1) rotate(90deg);
                    }
                    50% {
                        transform: translate(-15px, 20px) scale(0.9) rotate(180deg);
                    }
                    75% {
                        transform: translate(30px, 15px) scale(1.05) rotate(270deg);
                    }
                }
                
                .animated-background div:nth-child(odd) {
                    background: radial-gradient(circle, rgba(255,107,157,0.15) 0%, transparent 70%);
                }
                
                .animated-background div:nth-child(even) {
                    background: radial-gradient(circle, rgba(76,201,240,0.15) 0%, transparent 70%);
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Событие при успешной загрузке видео
    video.addEventListener('loadeddata', function() {
        console.log('Видео загружено успешно');
        video.classList.add('loaded');
        
        // Пытаемся воспроизвести
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('Видео воспроизводится');
            }).catch(error => {
                console.log('Автовоспроизведение заблокировано:', error);
                showFallbackImage();
            });
        }
    });
    
    // Событие при ошибке видео
    video.addEventListener('error', function(e) {
        console.error('Ошибка загрузки видео:', e);
        console.log('Video error details:', {
            error: video.error,
            networkState: video.networkState,
            readyState: video.readyState
        });
        showFallbackImage();
    });
    
    // Проверяем состояние видео через 2 секунды
    setTimeout(() => {
        if (video.readyState < 2) { // HAVE_CURRENT_DATA или меньше
            console.log('Видео не загрузилось за 2 секунды, показываем фоллбэк');
            showFallbackImage();
        }
    }, 2000);
    
    // Также проверяем при полной загрузке страницы
    window.addEventListener('load', function() {
        setTimeout(() => {
            if (video.paused && video.readyState >= 2) {
                console.log('Видео загружено но не играет, пытаемся запустить');
                video.play().catch(() => {
                    showFallbackImage();
                });
            }
        }, 1000);
    });
    
    // Для мобильных устройств всегда используем фоллбэк
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        console.log('Мобильное устройство, используем фоллбэк');
        showFallbackImage();
        video.style.display = 'none';
    }
}

// Добавьте вызов в DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // ... остальной код ...
    initVideoBackground();
});