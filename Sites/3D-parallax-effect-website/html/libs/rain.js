let canvas = document.getElementsByClassName('rain')[0];
/* window.innerWidth выдаёт ширину окна. */
canvas.width = window.innerWidth;
/* window.innerHeight выдаёт высоту окна. */
canvas.height = window.innerHeight;

/* getContext('2d') приводящий к созданию объекта, представляющего двумерный элемент рендеринга. */
let c = canvas.getContext('2d');

/* Функция рандомного числа. */
function randomNum(max, min) {
	return Math.floor(Math.random() * max) + min;
}

/* Дождь у нас это просто рандомные линии.
Это функция для создания одной капли дождя. */
function RainDrops(x, y, endy, velocity, opacity) {

	this.x = x;
	this.y = y;
	this.endy = endy;
	/* Определяем velocity(скорость) капли. */
	this.velocity = velocity;
	this.opacity = opacity;

	/* Функция рисования капли дождя. */
	this.draw = function () {
		/* beginPath() нужен, чтобы рисовать новые элементы, он как бы начает новый элемент. */
		c.beginPath();
		/* moveTo() двигает элемент по осям x и y. */
		c.moveTo(this.x, this.y);
		/* lineTo() рисует прямую линию, которая начинается в координате x и заканачивается в координате y. */
		c.lineTo(this.x, this.y - this.endy);
		/* Задаём ширину линии. */
		c.lineWidth = 1;
		/* Задаём цвет линии. */
		c.strokeStyle = "rgba(255, 255, 255, " + this.opacity + ")";
		/* stroke() в рисует фигуру, контур которой был задан ранее. */
		c.stroke();
	}

	/* Функция движения капли дождя.
	Она отвечает только за переопределение координаты y, 
	чтобы потом вызывалась функция draw() заново отрисовывавшая каплю, но уже на новой координате. */
	this.update = function () {
		/* Инициализируем переменную, которая будет равна высоте экрана + 100. Т.е примерно 1100 координате по оси Y. */
		let rainEnd = window.innerHeight + 100;
		if (this.y >= rainEnd) { // Если капля ниже rainEnd.
			this.y = this.endy - 100; // Обновляем позицию капли, чтобы она снова была вверху.
		} else { // Если не ниже ограничения (rainEnd).
			this.y = this.y + this.velocity; // Двигаем её вниз с помощью скорости.
		}
		this.draw(); // Рисуем каплю заново на новой координате Y.
	}

}

let rainArray = [];

// Делаем цикл, чтобы было создано 140 капель и каждая со своим значением.
for (let i = 0; i < 140; i++) {
	let rainXLocation = Math.floor(Math.random() * window.innerWidth) + 1;
	let rainYLocation = Math.random() * -500;
	let randomRainHeight = randomNum(10, 2);
	let randomSpeed = randomNum(20, .2);
	let randomOpacity = Math.random() * .55;
	// Добавляем в список каплю.
	rainArray.push(new RainDrops(rainXLocation, rainYLocation, randomRainHeight, randomSpeed, randomOpacity));
}

// Функция для движения капель.
function animateRain() {

	// Запускаем анимацию. Она бесконечна, пока её не остановить.
	requestAnimationFrame(animateRain);
	// Очищаём полностью холст.
	c.clearRect(0, 0, window.innerWidth, window.innerHeight);

	// Проходимся по всем каплям и запускаем функцию обновления её позиции.
	for (let i = 0; i < rainArray.length; i++) {
		rainArray[i].update();
	}

}

animateRain();
