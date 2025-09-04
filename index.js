const display = document.getElementById('display_text');
const answerPanel = document.getElementById('variables_btns');


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
  case 'Случайный вопрос':
    const themes = Object.values(questionsData);
    const randomThemeIndex = Math.floor(Math.random() * themes.length);
    const randomTheme = themes[randomThemeIndex];
    const randomQuestionIndex = Math.floor(Math.random() * randomTheme.length);
    const randomQuestion = randomTheme[randomQuestionIndex];
    return randomQuestion;
  default:
    console.log('Ошибка заголовок не найден...');
    return ;
  }
} 
 
function renderQuestion(question) {
  let questionText = '';
  answerPanel.innerHTML = '';

  // Выводим данные в дисплей
  console.log(question);
  questionText = question.text;
  console.log(questionText);
  display.textContent = questionText;
  
  // Разметка для открытого вопроса
  const murkupBtnAnswer = `
          <button id="getAnswer" class="variables_btn">Получить ответ</button>
    `;

  if (question.hasOwnProperty('options')) {
      const options = question.options;

      options.forEach(item => {
        let button = document.createElement('button');
        button.id = item.id;
        button.className = 'variables_btn';
        button.textContent = `Вариант ответа: "${item.text}"`;
        
        button.addEventListener('click', function() {
          handleAnswerSelection(item, options);
        });
        
        answerPanel.appendChild(button);
      });

      // Функция обработки выбора ответа
      function handleAnswerSelection(selectedOption, allOptions) {
        const correctOption = allOptions.find(option => option.isCorrect);
        
        if (selectedOption.isCorrect) {
          alert('Верно! ✅');
        } else {
          alert(`Неверно! ❌ Правильный ответ: "${correctOption.text}"`);
        }
      }


    } else {
      answerPanel.insertAdjacentHTML('afterbegin', murkupBtnAnswer);
      answerBtn = document.getElementById('getAnswer');
      answerBtn.addEventListener('click', function() {
      display.textContent = question.answer;
      answerBtn.remove();
    });
   } 

  return;
}



// Запускаем приложение
document.addEventListener('DOMContentLoaded', initializeApp);