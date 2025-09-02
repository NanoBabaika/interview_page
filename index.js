const display = document.getElementById('display_text');

async function initializeApp() {
  try {
    // Загружаем вопросы
    const questionsData = await loadQuestions();
    
    // Инициализируем приложение
    initApp(questionsData);
    
    setupTopicButtons(questionsData);
    
    
  } catch (error) {
    console.error('Ошибка инициализации приложения:', error);
  }
}

// Функция загрузки вопросов
async function loadQuestions() {
  const response = await fetch('questions.json');
  if (!response.ok) throw new Error('Ошибка загрузки файла');
  return await response.json();
}

function initApp(questionsData) {
  console.log(`Данные из initApp (старт приложения): `, questionsData);
}

  // Назначаем обработчики кнопок
function setupTopicButtons (questionsData) {
    const topicButtons = document.querySelectorAll('button[data-topic]');
  
    // Добавляем обработчики событий для каждой кнопки
    topicButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Получаем значение атрибута data-topic
      const topic = this.getAttribute('data-topic');
      console.log('Выбрана тема:', topic);
      const requestedQuestion = questionRequest(topic, questionsData);    
      renderQuestion(requestedQuestion);
    });
  });

}

// Функция запроса вопроса по заголовку
function questionRequest(topic, questionsData) {
  console.log('Данные заголовка получены ... ',topic);
  const {html, css,javascript, react} = questionsData;


  // В зависимости от заголовка кнопки получаем случайный объект из массива
  switch (topic) {
  case 'HTML':
    const randomIndexHTML = Math.floor(Math.random() * html.length);
    const randomQuestionHTML = html[randomIndexHTML];
    return randomQuestionHTML;
  case 'CSS':
    const randomIndexCSS = Math.floor(Math.random() * css.length);
    const randomQuestionCSS = css[randomIndexCSS];
    return randomQuestionCSS;
  case 'JavaScript':
    const randomIndexJS= Math.floor(Math.random() * javascript.length);
    const randomQuestionJS = javascript[randomIndexJS];
    return randomQuestionJS;
  case 'React':
    const randomIndexReact= Math.floor(Math.random() * react.length);
    const randomQuestionReact = react[randomIndexReact];
    return randomQuestionReact;
  default:
    console.log('Ошибка заголовок не найден...');
    return ;
  }
} 
 
function renderQuestion(question) {
  // Выводим данные в дисплей
  const questionText = question.text;
  console.log(questionText);
  display.textContent = questionText;

  // Нужно продумать как динамически отображать верстку
  // Если вопрос без вариантов ответа тогда будет одна кнопка получить ответ

  // Если есть варианты ответа то должны отобразиться соответствующие кнопки с нужным текстом.

}

// Запускаем приложение
document.addEventListener('DOMContentLoaded', initializeApp);