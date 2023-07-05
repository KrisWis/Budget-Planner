

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
array = array.every(function (elem) {
  return elem > 0;
});

/* some() работает так, что если хотя бы один элемент прошёл проверку, то она возвращает true.
Но если никто не прошёл, то возвращает false. */
array = array.some(function (elem) {
  return elem > 0;
});


/* МАССИВ ПЕРЕБИРАЮЩИЕ МЕТОДЫ - REDUCE И REDUCERIGHT - https://www.youtube.com/watch?v=Wy4rgg2iWpw&list=PLNkWIWHIRwMHKLotIS_d-wyj00pg0AnUg&index=6 */


