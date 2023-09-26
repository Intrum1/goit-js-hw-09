/*
1. Получение ссылок на кнопки "Start" и "Stop" с помощью метода querySelector. 
2. Определение переменной intervalid, которая будет использоваться для хранения идентификатора интервала.
javascript
3. Добавление слушателя события "click" к кнопке "Start", чтобы начать изменение цвета фона при нажатии на неё. 
4. Проверяем, если intervalid пустой, то создаем интервал, который будет менять цвет фона каждую секунду с использованием функции getRandomHexColor. 
5. Также отключаем кнопку "Start" на время выполнения интервала. 
6. Добавление слушателя события "click" к кнопке "Stop", чтобы остановить интервал. Сначала очищаем интервал с помощью clearInterval, устанавливаем intervalid в null, возвращаем цвет фона обратно в белый и включаем кнопку "Start".
7. Определение функции getRandomHexColor, которая генерирует случайный цвет в формате HEX.Теперь, после выполнения всех этих шагов, код готов к использованию. Когда пользователь нажмет на кнопку "Start", фон страницы будет изменять цвет каждую секунду до тех пор, пока не будет нажата кнопка "Stop".
*/
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.body;
let intervalid;

startBtn.addEventListener('click', () => {
  if (!intervalid) {
    intervalid = setInterval(() => {
      body.style.backgroundColor = getRandomHexColor();
    },1000);
  }
  startBtn.disable = true;
});

stopBtn.addEventListener('click', () => {
    clearInterval(intervalid); // остановка таймера
    intervalid = null; //обнулить значение intervalid
    startBtn.disable = false; 
})


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
