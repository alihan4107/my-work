// Файл для отладки
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== ДЕБАГ ИНФОРМАЦИЯ ===');
    
    // Проверяем элементы карусели
    const carouselElems = {
        container: document.querySelector('.carousel-container'),
        cards: document.querySelectorAll('.review-card'),
        prevBtn: document.querySelector('.carousel-btn.prev-btn'),
        nextBtn: document.querySelector('.carousel-btn.next-btn'),
        dots: document.querySelectorAll('.dot')
    };
    
    console.log('Карусель элементы:', carouselElems);
    
    // Проверяем видео
    const video = document.querySelector('#hero-video');
    console.log('Видео элемент:', video);
    if (video) {
        console.log('Видео источник:', video.querySelector('source')?.src);
        console.log('Видео readyState:', video.readyState);
        console.log('Видео paused:', video.paused);
    }
    
    // Проверяем кнопки тарифов
    const pricingButtons = document.querySelectorAll('.pricing-btn');
    console.log('Кнопки тарифов:', pricingButtons.length);
    
    // Добавляем ручное управление каруселью через консоль
    window.debugCarousel = {
        nextSlide: function() {
            const event = new Event('click');
            const nextBtn = document.querySelector('.carousel-btn.next-btn');
            if (nextBtn) nextBtn.dispatchEvent(event);
        },
        prevSlide: function() {
            const event = new Event('click');
            const prevBtn = document.querySelector('.carousel-btn.prev-btn');
            if (prevBtn) prevBtn.dispatchEvent(event);
        },
        showSlide: function(index) {
            const dots = document.querySelectorAll('.dot');
            if (dots[index]) {
                dots[index].click();
            }
        }
    };
    
    console.log('Для ручного управления каруселью используйте в консоли:');
    console.log('debugCarousel.nextSlide() - следующий слайд');
    console.log('debugCarousel.prevSlide() - предыдущий слайд');
    console.log('debugCarousel.showSlide(0) - показать слайд 0');
});