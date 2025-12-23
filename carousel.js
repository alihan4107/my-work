// Карусель отзывов
document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
});

function initCarousel() {
    const carouselContainer = document.querySelector('.carousel-container');
    const reviewCards = document.querySelectorAll('.review-card');
    const prevBtn = document.querySelector('.carousel-btn.prev-btn');
    const nextBtn = document.querySelector('.carousel-btn.next-btn');
    const dots = document.querySelectorAll('.dot');
    
    console.log('Инициализация карусели:', {
        container: carouselContainer,
        cards: reviewCards.length,
        prevBtn: prevBtn,
        nextBtn: nextBtn,
        dots: dots.length
    });
    
    if (!carouselContainer || !reviewCards.length) {
        console.error('Карусель не найдена!');
        return;
    }
    
    let currentIndex = 0;
    let autoPlayInterval;
    const totalSlides = reviewCards.length;
    
    // Показ определенного слайда
    function showSlide(index) {
        console.log('Показ слайда:', index);
        
        // Корректируем индекс если вышли за границы
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        
        // Скрываем все слайды
        reviewCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateX(100%)';
            card.style.display = 'none';
            card.classList.remove('active');
        });
        
        // Показываем текущий слайд
        reviewCards[index].style.display = 'block';
        reviewCards[index].style.opacity = '1';
        reviewCards[index].style.transform = 'translateX(0)';
        reviewCards[index].classList.add('active');
        
        // Обновляем активную точку
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentIndex = index;
        console.log('Текущий индекс:', currentIndex);
    }
    
    // Следующий слайд
    function nextSlide() {
        console.log('Следующий слайд');
        let nextIndex = currentIndex + 1;
        if (nextIndex >= totalSlides) {
            nextIndex = 0;
        }
        showSlide(nextIndex);
    }
    
    // Предыдущий слайд
    function prevSlide() {
        console.log('Предыдущий слайд');
        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) {
            prevIndex = totalSlides - 1;
        }
        showSlide(prevIndex);
    }
    
    // Автопрокрутка
    function startAutoPlay() {
        console.log('Запуск автопрокрутки');
        stopAutoPlay(); // Останавливаем предыдущий интервал если есть
        autoPlayInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoPlay() {
        console.log('Остановка автопрокрутки');
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }
    
    // Обработчики событий для кнопок
    if (prevBtn) {
        console.log('Добавлен обработчик для prevBtn');
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Клик по кнопке назад');
            prevSlide();
            stopAutoPlay();
            startAutoPlay();
        });
    } else {
        console.error('Кнопка "Назад" не найдена!');
    }
    
    if (nextBtn) {
        console.log('Добавлен обработчик для nextBtn');
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Клик по кнопке вперед');
            nextSlide();
            stopAutoPlay();
            startAutoPlay();
        });
    } else {
        console.error('Кнопка "Вперед" не найдена!');
    }
    
    // Обработчики для точек
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Клик по точке:', index);
            showSlide(index);
            stopAutoPlay();
            startAutoPlay();
        });
    });
    
    // Пауза автопрокрутки при наведении
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Инициализация - показываем первый слайд
    showSlide(0);
    startAutoPlay();
    
    // Обработка клавиатуры
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoPlay();
            startAutoPlay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoPlay();
            startAutoPlay();
        }
    });
    
    // Дебаг информация
    console.log('Карусель инициализирована успешно');
    console.log('Всего слайдов:', totalSlides);
}