

/* ТИПЫ ДАННЫХ - https://www.youtube.com/watch?v=n0sPFaLsNeI&list=PLY4rE9dstrJymG1GyPLgOKsJNq9r-p6pX */


/* document - это объект, который позволяет управлять DOM-деревом. 
Функция write() служит для того, чтобы выводить текст, написанный в скобках. 
Но он очень редко используется, т.к не может вывести текст внутри определённого тега. */
document.write("JavaScript говорит привет!");
/* console - объект консоли.
Функция log() выводит текст в консоль. */
console.log("JavaScript говорит привет!");
/* Функция info() нужна для вывода информатионного текста в консоль. */
console.info("JavaScript говорит привет!");
/* Функция error() нужна для вывода сообщения ошибки в консоль. */
console.error("JavaScript говорит привет!");
/* Функция warn() нужна для вывода сообщения предупреждения в консоль. */
console.warn("JavaScript говорит привет!");
/* Чтобы создать переменную, нужно использовать ключевое слово var, а дальше писать уже название переменной. После, через "=" значение переменной. */
var str = 'Web-developer';
/* Функция alert() делает сайт недоступным для пользователя и текст ошибки будет тот, что передан в скобках. */
alert("Ошибка");
/* Переменная с булевым значением. */
var bool = true;
/* Если переменной не будет задано значение, то она будет равна "undefined". */
var undef;
/* Переменная со значением null. */
var nul = null;
/* Чтобы задать в переменную объект, то нужно указать фигурные скобки. В них будут записаны различные функции и свойства.
Свойство - переменная внутри объекта, которая хранит строку, числа и тд. Метод - переменная внутри функции, которая хранит функцию. */
var obj = {
  prop: 1,
  prop: function () {
  }
};

/* Лучше всего писать переменные так, экономя память: */
var str = "eewew",
  number = 1,
  bool = true,
  obj = {
    prop: 1,
    prop: function () {
    }
  };
