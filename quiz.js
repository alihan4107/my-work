// Интерактивный тест уровня
document.addEventListener('DOMContentLoaded', function() {
    initQuiz();
});

function initQuiz() {
    const quizSteps = document.querySelectorAll('.quiz-step');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressFill = document.querySelector('.progress-fill');
    const currentQuestionEl = document.getElementById('current-question');
    const totalQuestionsEl = document.getElementById('total-questions');
    const getProgramBtn = document.getElementById('get-program-btn');
    
    if (!quizSteps.length) return;
    
    let currentStep = 0;
    const totalSteps = quizSteps.length - 1; // -1 потому что последний шаг - результат
    const answers = {};
    
    // Инициализация
    totalQuestionsEl.textContent = totalSteps;
    updateNavigation();
    
    // Обработчики кнопок
    prevBtn.addEventListener('click', goToPrevStep);
    nextBtn.addEventListener('click', goToNextStep);
    
    if (getProgramBtn) {
        getProgramBtn.addEventListener('click', function() {
            window.location.href = '#registration';
        });
    }
    
    // Функции навигации
    function goToPrevStep() {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
            updateNavigation();
        }
    }
    
    function goToNextStep() {
        // Проверяем, выбран ли ответ на текущем шаге
        const currentStepElement = quizSteps[currentStep];
        const selectedOption = currentStepElement.querySelector('input:checked');
        
        if (!selectedOption && currentStep < totalSteps) {
            // Анимация для непрочитанных вопросов
            const options = currentStepElement.querySelectorAll('.quiz-option');
            options.forEach(option => {
                option.classList.add('shake');
                setTimeout(() => option.classList.remove('shake'), 500);
            });
            return;
        }
        
        // Сохраняем ответ
        if (selectedOption) {
            const questionName = selectedOption.getAttribute('name');
            answers[questionName] = selectedOption.value;
        }
        
        if (currentStep < totalSteps) {
            currentStep++;
            showStep(currentStep);
            
            // Если это последний вопрос, показываем результат
            if (currentStep === totalSteps) {
                showResult();
            }
            
            updateNavigation();
        }
    }
    
    // Показ определенного шага
    function showStep(stepIndex) {
        quizSteps.forEach((step, index) => {
            step.classList.toggle('active', index === stepIndex);
        });
        
        // Обновление прогресс-бара
        const progressPercentage = ((stepIndex + 1) / totalSteps) * 100;
        progressFill.style.width = `${progressPercentage}%`;
        
        // Обновление номера вопроса
        currentQuestionEl.textContent = stepIndex + 1;
    }
    
    // Обновление состояния кнопок навигации
    function updateNavigation() {
        prevBtn.disabled = currentStep === 0;
        
        if (currentStep === totalSteps) {
            nextBtn.style.display = 'none';
            prevBtn.style.display = 'none';
        } else {
            nextBtn.textContent = currentStep === totalSteps - 1 ? 'Узнать результат' : 'Далее <i class="fas fa-arrow-right"></i>';
        }
    }
    
    // Показ результата
    function showResult() {
        // Определяем рекомендуемый курс на основе ответов
        const language = answers.language || 'english';
        const level = answers.level || 'beginner';
        const time = answers.time || 'moderate';
        
        let recommendedCourse = '';
        let intensity = '';
        let outcome = '';
        
        // Определение курса
        switch(language) {
            case 'arabic':
                recommendedCourse = 'Арабский для начинающих';
                break;
            case 'russian':
                recommendedCourse = 'Русский как иностранный';
                break;
            case 'english':
                recommendedCourse = level === 'beginner' ? 'Английский для начинающих' : 'Разговорный английский';
                break;
            case 'spanish':
                recommendedCourse = 'Испанский с нуля';
                break;
            default:
                recommendedCourse = 'Английский для начинающих';
        }
        
        // Определение интенсивности
        switch(time) {
            case 'light':
                intensity = '2-3 занятия в неделю';
                break;
            case 'moderate':
                intensity = '3-4 занятия в неделю';
                break;
            case 'intensive':
                intensity = '5-6 занятий в неделю';
                break;
            default:
                intensity = '3 занятия в неделю';
        }
        
        // Определение результата
        switch(level) {
            case 'beginner':
                outcome = 'Уровень A2 за 4 месяца';
                break;
            case 'elementary':
                outcome = 'Уровень B1 за 3 месяца';
                break;
            case 'intermediate':
                outcome = 'Уровень B2 за 5 месяцев';
                break;
            case 'advanced':
                outcome = 'Уровень C1 за 6 месяцев';
                break;
            default:
                outcome = 'Уровень A2 за 4 месяца';
        }
        
        // Обновление текста результатов
        document.getElementById('result-course').textContent = recommendedCourse;
        document.getElementById('result-intensity').textContent = intensity;
        document.getElementById('result-outcome').textContent = outcome;
        
        // Сохранение результатов в localStorage
        localStorage.setItem('quizResults', JSON.stringify({
            course: recommendedCourse,
            intensity: intensity,
            outcome: outcome,
            language: language,
            level: level,
            time: time
        }));
    }
    
    // Обработка выбора ответов
    quizSteps.forEach(step => {
        const options = step.querySelectorAll('input[type="radio"]');
        options.forEach(option => {
            option.addEventListener('change', function() {
                // Автоматический переход к следующему вопросу через 1 секунду
                // (опционально, можно закомментировать если не нужно)
                // if (currentStep < totalSteps - 1) {
                //     setTimeout(goToNextStep, 1000);
                // }
            });
        });
    });
    
    // Загрузка предыдущих результатов, если есть
    const savedResults = localStorage.getItem('quizResults');
    if (savedResults) {
        try {
            const results = JSON.parse(savedResults);
            // Можно использовать сохраненные результаты для предзаполнения
            console.log('Загружены предыдущие результаты теста:', results);
        } catch (e) {
            console.error('Ошибка при загрузке сохраненных результатов:', e);
        }
    }
    
    // Сброс теста при обновлении страницы (опционально)
    // window.addEventListener('beforeunload', function() {
    //     localStorage.removeItem('quizResults');
    // });
}