console.log('Lets code!....{^_^}');

 
// Запрос данных из файла JSON

let questionsData = {};


fetch('questions.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Ошибка загрузки файла');
    }
    return response.json();
  })
  .then(data => {
    questionsData = data;
    // Инициализация после загрузки данных
    initApp(questionsData);     
    })
  .catch(error => {
    console.error('Ошибка:', error);
  });

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
      showQuestions(topic);
    });
  });
});


function showQuestions(topic, questionsData) {
    // перед передачей данных переводим их в lowerCase
  const lowerCaseTopic = topic.toLowerCase();
  
  if(lowerCaseTopic === 'html') {
    console.log('HTML:', htmlQuestions);
  }
  // Получаем массив вопросов по найденному ключу
  
  
  // Возвращаем случайный вопрос
  // const randomIndex = Math.floor(Math.random() * questions.length);
  // return questions[randomIndex];

     // вызвать функцию выбора рандомного элемента
    // И пока что вывести объект в консоль
}


function initApp(questionsData) {
  // Здесь инициализация кнопок и логики приложения
  const htmlQuestions = questionsData.html;
  const cssQuestions = questionsData.css;
  const javascriptQuestions = questionsData.javascript;
  const reactQuestions = questionsData.react;
  
  console.log('HTML:', htmlQuestions);
  
  console.log('CSS:',  cssQuestions);
  
  console.log('React:',  reactQuestions);
  
  console.log('JS:',  javascriptQuestions);
  
  
  return htmlQuestions, cssQuestions ,reactQuestions, javascriptQuestions;
}


