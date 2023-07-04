

/* МАССИВ ПЕРЕБИРАЮЩИЕ МЕТОДЫ - FOREACH - https://www.youtube.com/watch?v=ewWNAbB2yyM&list=PLNkWIWHIRwMHKLotIS_d-wyj00pg0AnUg&index=2 */


let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let new_array = [];

/* Метод forEach() не возвращает никакого значения. Поэтому записываем значения в новый массив.
Метод forEach() перебирает все элементы массива. */
array.forEach(function (elem) {
  new_array.push(elem *= elem);
});



/* МАССИВ ПЕРЕБИРАЮЩИЕ МЕТОДЫ - map - https://www.youtube.com/watch?v=W5vpClM_VDw&list=PLNkWIWHIRwMHKLotIS_d-wyj00pg0AnUg&index=3 */


