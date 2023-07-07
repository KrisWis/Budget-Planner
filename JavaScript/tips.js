

/* МАССИВ ПЕРЕБИРАЮЩИЕ МЕТОДЫ - FOREACH - https://www.youtube.com/watch?v=ewWNAbB2yyM&list=PLNkWIWHIRwMHKLotIS_d-wyj00pg0AnUg&index=2 */


let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let new_array = [];

/* Метод forEach() перебирает все элементы массива. Он не изменяет сам массив. */
array.forEach(function (elem) {
  new_array.push(elem *= elem);
});

//Метод forEach() не возвращает никакого значения.
new_array = array.forEach(function (elem) { // Ничего не присвоит, т.к forEach() равен undefined.
  return elem *= elem;
});


/* МАССИВ ПЕРЕБИРАЮЩИЕ МЕТОДЫ - MAP - https://www.youtube.com/watch?v=W5vpClM_VDw&list=PLNkWIWHIRwMHKLotIS_d-wyj00pg0AnUg&index=3 */


// Метод map() перебирает все элементы массива. Он не изменяет сам массив, но может возвращать значение.
new_array = array.map(function (elem) { // Присваиваем переменной массив, сделанный map().
  return elem *= elem;
});


/* МАССИВ ПЕРЕБИРАЮЩИЕ МЕТОДЫ - FILTER - https://www.youtube.com/watch?v=DTfFcLKpM2g&list=PLNkWIWHIRwMHKLotIS_d-wyj00pg0AnUg&index=4 */


/* Метод filter() перебирает все элементы массива.
Но функция, которая ему передаётся должна возвращать логическое значение.
То есть, этот метод просто фильтрует массив по переданной функции. */
array = array.filter(function (elem) {
  return elem <= 5;
});


/* МАССИВ ПЕРЕБИРАЮЩИЕ МЕТОДЫ - EVERY И SOME - https://www.youtube.com/watch?v=39bcY4aV3AI&list=PLNkWIWHIRwMHKLotIS_d-wyj00pg0AnUg&index=5 */


/* Метод every() и some() перебирают все элементы массива.
Но функция, которая им передаётся должна возвращать логическое значение. */

/* every() работает так, что если все элементы массива прошли проверку, то она возвращает true.
Но если хотя бы один не прошёл, то возвращает false. */
new_array = array.every(function (elem) {
  return elem > 0;
});

/* some() работает так, что если хотя бы один элемент прошёл проверку, то она возвращает true.
Но если никто не прошёл, то возвращает false. */
new_array = array.some(function (elem) {
  return elem > 0;
});


/* МАССИВ ПЕРЕБИРАЮЩИЕ МЕТОДЫ - REDUCE И REDUCERIGHT - https://www.youtube.com/watch?v=Wy4rgg2iWpw&list=PLNkWIWHIRwMHKLotIS_d-wyj00pg0AnUg&index=6 */


/* Метод reduce() и reduceRight() перебирают все элементы массива.
Они служат для сложения, вычитания и тд всех элементов массива.
Также они принимают промежуточный параметр, в который будет записываться результат.
Разница в них лишь в том, что reduce() перебирает параметры слева направо, 
а reduceRight() справа налево. */

new_array = array.reduce(function (sum, elem) {
  return sum += elem; // Вернёт сумму всех элементов.
});

/* Если передать второй параметр в функцию reduce() или reduceRight(), то
первый параметр callback функции будет равен этому значению.
Если его не передавать, то первый параметр будет равен первому элементу массива. */
new_array = array.reduce(function (sum, elem) {
  return sum += elem; // Вернёт сумму всех элементов.
}, 10);

// Функции reduce() и reduceRight() можно принимать для переделывания вложенных массивов в один.
let flattened = [[0, 1], [2, 3], [4, 5]]
flattened = flattened.reduceRight(function (sum, elem) {
  return sum.concat(elem); // Вернёт один массив со всеми элементами вложенных массивов.
}, []);


/* ФУНКЦИИ: ПСЕВДОМАССИВ ARGUMENTS - https://www.youtube.com/watch?v=ZSrk2_W9FmY&list=PLNkWIWHIRwMHKLotIS_d-wyj00pg0AnUg&index=7 */


/* Псевдомассив arguments хранит все параметры, которые переданы в функцию. 
Из методов массивов, для него можно использовать только length.
На самом деле, arguments это объект, а не массив. */
function argumentsFunc() {
  console.log(arguments); // Вернёт [1, 3434, 121, 'wqqw'].
  console.log(arguments.length); // Вернёт 4.
  /* Следующим способом можно преобразовать псевдомассив arguments из объекта в массив.
  Точнее, arguments так и останеться псевдомассивом, просто все его значения будут в массиве arr. */
  var arr = [];
  for (let index = 0; index < arguments.length; index++) {
    arr[index] = arguments[index];
  }
  console.log(arr.concat(['2', 23])) // Теперь можно использовать методы массивов.
}

argumentsFunc(1, 3434, 121, 'wqqw');


/* ФУНКЦИИ: ТИПЫ ФУНКЦИЙ FUNCTION EXPRESSION, FUNCTION DECLORATION & NFE - https://www.youtube.com/watch?v=rtGTZ4knRSY&list=PLNkWIWHIRwMHKLotIS_d-wyj00pg0AnUg&index=8 */


// Пример function decloration. Её можно вызвать до её объявления.
function sum(a, b) {
  return a + b;
}

// Пример function expression. Её нельзя вызвать до её объявления.
let sum = function (a, b) {
  return a + b;
}

/* Пример Named function expression. 
Особенность в том, что её функция (в нашем случае sum) доступна только внутри переменной. Она нужна только для рекурсии. */
let func = function sum(a, b) {
  return a + b;
};


/* ФУНКЦИИ: THIS КОНТЕКСТ ВЫЗОВА - https://www.youtube.com/watch?v=tfzrgp22Hwo&list=PLNkWIWHIRwMHKLotIS_d-wyj00pg0AnUg&index=9 */


// В режиме "use strict" this в глобальном контексте будет равна undefined, вместо window


/* ФУНКЦИИ: ЗАМЫКАНИЯ, ОБЛАСТИ ВИДИМОСТИ, ЛЕКСИЧЕСКОЕ ОКРУЖЕНИЕ - https://www.youtube.com/watch?v=tCGiKGNmMbE&list=PLNkWIWHIRwMHKLotIS_d-wyj00pg0AnUg&index=10 */


/* Все переменные внутри функции это свойства объекта Lexical Environment. 
При запуске, функция создаёт этот объект и записывает в него все переменные, аргументы, параметры и тд. 
У него есть скрытое свойство - scope (область видимости). Его никак нельзя изменить.
Оно ссылается на функцию, в которой было создано. И из-за scope функции доступны внешние переменные и тд. */
/* Замыкание - это функция и все внешние переменные, которые ей доступны. */


/* ФУНКЦИИ: МОДУЛЬ ЧЕРЕЗ ЗАМЫКАНИЕ - https://www.youtube.com/watch?v=piM-njF6haM&list=PLNkWIWHIRwMHKLotIS_d-wyj00pg0AnUg&index=11 */


/* Анонимную самовызывающиеся функция это и есть модуль через замыкание. 
Она нужна, когда есть отдельный файл и у него должна быть только своя область видимости.
Скобки вокруг функции нужны для того, чтобы браузер понял, что это function expression, 
т.к только она может использоваться для анонимной самовызывающиейся функции.
Если поставить перед вызывом функции + или !, но без оборачивания в скобки, то она тоже будет объявлена как function expression.
Хорошей практикой является ставиться точку с запятой перед её вызывом. */
; (function () {
  let message = 0; // Переменная message объявлена только внутри этой функции.
})();


/* ОБЪЕКТЫ: МЕТОД CALL - https://www.youtube.com/watch?v=piM-njF6haM&list=PLNkWIWHIRwMHKLotIS_d-wyj00pg0AnUg&index=11 */


let test3 = function (param1, param2) {
  console.log(this);
  this.style.background = 'red';
}

let test4 = document.getElementById("test");
let test5 = document.getElementById("test2");
/* Метод call() вызывает функцию, которая идёт перед call и
делает ей тот контекст выполнения, который вызван в скобках. 
Т.е в скобках мы передали test4, значит this будет равен test4. 
Параметры функции передаются после контекста выполения через запятую. */
test3.call(test4, 'param1', 232);
// Данное событие сработает при клике на test5, но функция сработает именно для test4.
test5.onclick = function () {
  test3.call(test4, 'param1', 232)
}

// Следующим образом, с помощью метода call() можно преобразовать псевдомассив arguments в массив.
function remodelingArgsToArr() {
  let args = Array.prototype.slice.call(arguments);
}
remodelingArgsToArr(1, 43, 212, 'wewe');


/* ОБЪЕКТЫ: МЕТОД APPLY - https://www.youtube.com/watch?v=4j0HOpm9OJ0&list=PLNkWIWHIRwMHKLotIS_d-wyj00pg0AnUg&index=13 */


/* Метод apply() работает точно также, как и call, просто аргументы функции передаются в квадратных скобках.
C помощью него можно, например, создать функцию, которая будет принимать любое число параметров и суммировать их. */
function sum() {
  for (let index = 0, res = 0; index < arguments.length; res += arguments[index++]) {
    return res;
  }
}

sum.apply([4321, 2323, 111, 8]);

/* Также, apply() стоит использовать если нужно в функцию, которая принимает список передать массив.
Например, Math.max(). */
var arr = [1, 4334, 676, 21];
console.log(Math.max.apply(null, arr)); // Если бы мы просто передали массив, без apply, то вывело бы NaN.


/* ОБЪЕКТЫ: МЕТОД BIND - https://www.youtube.com/watch?v=7oB57sW5Fho&list=PLNkWIWHIRwMHKLotIS_d-wyj00pg0AnUg&index=14 */


/* Метод bind заранее делает функции нужный, переданный контекст выполнения и нужно сохранить её в новую переменную.
Эти функции не сработают, пока не будут вызваны, но в них заранее записан нужный контекст выполнения.
Данные функции можно использовать также, как и обычные, просто с нужным нам контекстом выполнения.
Параметры функции передаются также, как и в методе call(), через запятую. */
let testFunc1 = test3.bind(test4, 'param1', 232);
let testFunc2 = test3.bind(test5, 'param1', 232);

// При клике на test4 сработает функция testFunc2, где this равен test5.
test4.onclick = testFunc2;


/* ОБЪЕКТЫ: КАРРИРОВАНИЕ - https://www.youtube.com/watch?v=j0ZUA3WoTPw&list=PLNkWIWHIRwMHKLotIS_d-wyj00pg0AnUg&index=15 */


/* Каррирование - это когда у нас есть функция, принимающая какие-либо параметры,
но потом мы присваиваем эту функции с помощью bind() какой-либо другой переменной, 
но также мы передаём ей какие-либо параметры, которые теперь будут постояные.
И поэтому функция, которая была создана будет принимать меньше аргументов, чем функция, с помощью которой её создали. */
function mul(a, b) {
  return a * b;
}

/* Присваиваем переменной double функцию mul, 
при этом с помощью bind() контекст вызова у неё будет равен null (т.к this в ней не используется), 
а первый параметр постоянно будет равен 2. Но вот второй параметр можно уже передавать какой хочешь при вызове double. */
let double = mul.bind(null, 2);
console.log(double(2)); // 2 умножиться на 2.
console.log(double(3));// 2 умножиться на 3.