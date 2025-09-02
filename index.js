 async function initializeApp() {
  try {
    // Загружаем вопросы
    const questionsData = await loadQuestions();
    
    // Инициализируем приложение
    initApp(questionsData);
    
    // Назначаем обработчики кнопок
    setupTopicButtons(questionsData);
    
    // Другие инициализации
    setupOtherFeatures(questionsData);
    
  } catch (error) {
    console.error('Ошибка инициализации приложения:', error);
    showErrorToUser('Не удалось загрузить вопросы');
  }
}

// Функция загрузки вопросов
async function loadQuestions() {
  const response = await fetch('questions.json');
  if (!response.ok) throw new Error('Ошибка загрузки файла');
  return await response.json();
}

// Запускаем приложение
document.addEventListener('DOMContentLoaded', initializeApp);