/*
Імпорт бібліотеки flatpickr та її стилів:

У першому рядку коду імпортується бібліотека flatpickr із пакету flatpickr.
На другому рядку імпортується файл стилів для flatpickr з пакету flatpickr/dist/flatpickr.min.css.
Створення об'єкта параметрів для налаштування flatpickr:

Об'єкт options містить налаштування для відображення елемента вибору дати та часу. Ось їхні значення:
enableTime: true - дозволяє вибір часу.
time_24hr: true - встановлює 24-годинний формат часу.
defaultDate: new Date() - встановлює поточну дату та час як значення за замовчуванням.
minuteIncrement: 1 - встановлює крок вибору хвилин на 1.
onClose(selectedDates) - це функція, яка буде викликана при закритті вибору дати.
Створення flatpickr елемента і його налаштування:

Знаходимо HTML-елемент з ідентифікатором datetime-picker за допомогою getElementById.
Викликаємо функцію flatpickr, передаючи їй знайдений елемент та параметри options. Це створює вікно вибору дати та часу.
Отримання посилань на кнопку "Start" та поля для відображення часу:

Знаходимо кнопку з атрибутом data-start за допомогою querySelector.
Знаходимо всі поля з класом value за допомогою querySelectorAll.
Оголошення функції startCountdown для запуску обратного відліку:

Ця функція отримує targetDate і запускає обратний відлік до цієї дати.
Оголошення функції convertMs для перетворення мілісекунд в дні, години, хвилини та секунди:

Ця функція отримує кількість мілісекунд і повертає об'єкт з днями, годинами, хвилинами і секундами.
Оголошення функції addLeadingZero для додавання ведучого нуля до числа:

Ця функція додає ведучий нуль до переданого числа, якщо воно одноцифрове.
Додавання обробника події "click" на кнопку "Start":

Обробник події додається до кнопки "Start" за допомогою addEventListener.
При кліку на кнопку викликається функція startCountdown, а кнопка "Start" вимикається.
Всередині обробника події "click" кнопки "Start":

Отримується вибрана дата та час з елемента flatpickr.
Запускається обратний відлік за допомогою функції startCountdown.
Кнопка "Start" вимикається, щоб запобігти подвійному запуску відліку.
Цей код створює інтерфейс вибору дати та часу, а також запускає обратний відлік, який відображає час до вибраної дати та часу.
/** */

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


// const start = document.querySelector('[data-start]');
const dateTimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const timeFields = document.querySelectorAll('.value');
let countdownInterval;


//Определение функции setupDateTimePicker(), которая настраивает Flatpickr для выбора даты и времени. Внутри функции создаются настройки Flatpickr, включая возможность выбора времени, 24-часовой формат времени, установка текущей даты и времени, интервал увеличения минуты на 1 и обработчик события закрытия.

function setupDateTimePicker() {
    const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      handleDateTimePickerClose(selectedDates);
    }, 
};
   flatpickr(dateTimePicker, options);
  }; 

//handleDateTimePickerClose(selectedDates), которая вызывается при закрытии выбора даты и времени. Она сравнивает выбранную дату с текущей и, если выбранная дата в прошлом, отключает кнопку "Start", иначе включает ее.

   function handleDateTimePickerClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = Date.now();

    if (selectedDate <= currentDate) {
    alert('Please choose a date in the future');
    disableStartButton();
   } else {
    enableStartButton();
   }
   }

//Функция disableStartButton() отключает кнопку "Start", устанавливая атрибут disabled в true.

  function disableStartButton() {
    startButton.disable = true;
  }

//Функция enableStartButton() включает кнопку "Start", устанавливая атрибут disabled в false.


function enableStartButton() {
    startButton.disable = false;
}
//Функция startCountdown(targetDate) запускает обратный отсчет. Она сначала очищает текущий интервал, затем определяет функцию updateTimer(), которая обновляет отображение времени каждую секунду. Функция updateTimer() вычисляет разницу между целевой датой и текущей датой, обновляет поля времени и останавливает интервал, если время истекло.

  function startCountdown(targetDate) {
    clearInterval(countdownInterval);

    function updateTimer() {
    const currentDate = Date.now();
    let timeDifference = targetDate - currentDate; // Разница между целевой датой и текущей датой в миллисекундах
  
    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      timeDifference = 0;
    } 
    const time = convertMs(timeDifference);
    updateTimeFields(time);
}
      updateTimer();
      countdownInterval = setInterval(updateTimer, 1000);
}
//Функция updateTimeFields(time) обновляет поля времени на веб-странице, отображая дни, часы, минуты и секунды.

function updateTimeFields(time) {
    timeFields[0].textContent = addLeadingZero(time.days);
    timeFields[1].textContent = addLeadingZero(time.hours);
    timeFields[2].textContent = addLeadingZero(time.minutes);
    timeFields[3].textContent = addLeadingZero(time.seconds);
}

//Функция convertMs(ms) преобразует миллисекунды в дни, часы, минуты и секунды и возвращает объект с этими значениями.

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
  
//Функция addLeadingZero(value) добавляет ведущий ноль к числовому значению, если оно меньше 10.

  function addLeadingZero(value) {
    return value.toString().padStart(2,0);
  }

//Инициализация кода вызывается функцией initialize(), которая настраивает Flatpickr, добавляет обработчик клика на кнопку "Start" и начальное состояние кнопки "Start".

function initialize() {
    setupDateTimePicker();
    startButton.addEventListener('click', () => {
        const selectedDate = dateTimePicker._flatpickr.selectedDates[0];
        startCountdown(selectedDate);
        disableStartButton();
    });
}

initialize();

//Этот код создает интерфейс для выбора даты и времени, а затем запускает обратный отсчет до выбранной даты и времени. Кнопка "Start" отключается, если выбранная дата находится в прошлом.
  