

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
}


/* ФУНКЦИИ: this контекст вызова - https://www.youtube.com/watch?v=tfzrgp22Hwo&list=PLNkWIWHIRwMHKLotIS_d-wyj00pg0AnUg&index=9 */


