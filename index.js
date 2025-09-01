console.log('Lets code!....{^_^}');

 
// Запрос данных из файла JSON
let questions = {};

async function loadQuestions() {
  try {
    const response = await fetch('questions.json');
    if (!response.ok) throw new Error('Ошибка загрузки файла');
    const data = await response.json();
    const questions = data;
    return data; // Возвращаем данные
  } catch (error) {
    console.error('Ошибка:', error);
    throw error; // Пробрасываем ошибку дальше
  }
}

// Переменные кнопок
document.addEventListener('DOMContentLoaded', function() {
  // Получаем все кнопки с атрибутом data-topic
  const topicButtons = document.querySelectorAll('button[data-topic]');
  
  // Добавляем обработчики событий для каждой кнопки
  topicButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Получаем значение атрибута data-topic
      const topic = this.getAttribute('data-topic');
      console.log('Выбрана тема:', topic);

      // Здесь будет вызов функции для отображения вопросов по теме
      questionRequest(topic);
    });
  });
});


async function init() {
  try {
    const questions = await loadQuestions(); // Ждем загрузки
    const loadedQuestions = initApp(questions);
    // questionRequest(questions);
  } catch (error) {
    console.error('Не удалось загрузить вопросы:', error);
  }
}

// Запускаем инициализацию
init();


function questionRequest(topic, loadedQuestions) {
    // перед передачей данных переводим их в lowerCase
    console.log('Запуск функции поиска вопроса....')
    const lowerCaseTopic = topic.toLowerCase();
  
  // console.log(`Из функции questionRequest`, topic);
  console.log(`Из функции questionRequest`, questions);
  
    // Получаем массив вопросов по найденному ключу
  if(lowerCaseTopic === 'html') {
    console.log('HTML:', questions.html);
  }
   
  
  // Возвращаем случайный вопрос
  // const randomIndex = Math.floor(Math.random() * questions.length);
  // return questions[randomIndex];

     // вызвать функцию выбора рандомного элемента
    // И пока что вывести объект в консоль
}


function initApp(questions) {
  console.log(`Из функции initApp`, questions);
  return questions;  
}


