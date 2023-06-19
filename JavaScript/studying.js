

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
// alert("Ошибка");
/* Переменная с булевым значением. */
var bool = true;
/* Если переменной не будет задано значение, то она будет равна "undefined". */
var undef;
/* Переменная со значением null. */
var nul = null;
/* Чтобы задать в переменную объект, то нужно указать фигурные скобки. В них будут записаны различные функции и свойства.
Свойство - переменная внутри объекта, которая хранит строку, числа и тд. Метод - переменная внутри функции, которая хранит функцию.
Функции, регулярные выражения, массивы и тд - это всё объектные типы данных. */
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


/* ПРИМИТИВНЫЕ И ОБЪЕКТНЫЕ ДАННЫЕ. ОБЁРТКИ - https://www.youtube.com/watch?v=p-Ob8gEJBJs&list=PLY4rE9dstrJymG1GyPLgOKsJNq9r-p6pX&index=2 */


var obj = {
  prop: 1,
  prop: function () {
  }
},
  regexp = "/baba/g",
  func = function () { },
  arr = [1, 2, 3];

// Ключевое слово typeof выводит конкретный тип данных объектных данных.
console.log(typeof obj);
console.log(typeof regexp);
console.log(typeof func);
console.log(typeof arr);

// Мы обращаемся к переменной obj и её свойству prop, в котором меняем значение.
obj.prop = "Другое значение";
// У 3 элемента массива arr меняем значение.
arr[2] = 24;
// Функция toUpperCase() возводит строку в верхний регистр.
str.toUpperCase();
// Ключевое слово new создаёт из примитива объект. Из '2431' получиться {0: "2", 1: "4", 2: "3", 3: "1"}. 
new String('2431');
// Функция toString() переделывает переменную в строку. Если применить это к обёртке, то она приведёт переменную к виду, который был до обёртки.
number.toString();


/* STATEMENTS (ИНСТРУКЦИИ), EXPRESSIONS (ВЫРАЖЕНИЯ), OPERATORS (ОПЕРАТОРЫ) - https://www.youtube.com/watch?v=hqozKP8pol8&list=PLY4rE9dstrJymG1GyPLgOKsJNq9r-p6pX&index=3 */


var statement; // Инструкция
statement = 5 + 2; // Выражение
'Литерал'; // Литерал
// Арифметические операторы это +, -, *, = и тд.
var i = 2;
++i; // Увеличивает значение переменной i на 1.
--i; // Уменьшает значение переменной i на 1.
i++; /* Увеличивает значение переменной i на 1, но только после завершения работы выражения 
    (т.е если засунуть это в console.log(), то выведет старое значение, а если опять использовать console.log(), то выведет, как и должно с прибавкой на 1). */
i--; /* Уменьшает значение переменной i на 1, но только после завершения работы выражения 
    (т.е если засунуть это в console.log(), то выведет старое значение, а если опять использовать console.log(), то выведет, как и должно с убавкой на 1). */

console.log(i += 2) // Оператор += отвечает и за сложение, и за присваивание переменной значения.
// Операторы сравнения это >, <, == и тд. Также, есть операторы строгого равенства и неравенства - "===" и "!==", они сравнивают также и тип данных.


/* УСЛОВНЫЕ И ЛОГИЧЕСКИЕ ОПЕРАТОРЫ - https://www.youtube.com/watch?v=ogmqkRFNmcE&list=PLY4rE9dstrJymG1GyPLgOKsJNq9r-p6pX&index=4 */


var age = 18;
// Пример использования условных операторов if/else if/else.
if (age === 18) {
  console.log("Ты взрослый");
}
else if (age > 18) {
  console.log("Ты старше 18!")
}
else if (age < 18) {
  console.log("Ты младше 18!")
}
else {
  console.log("Ничего не подходит!")
};

/* Пример использования условного оператора "?". 
Сначала задаётся условие, после этого ставиться "?". 
Дальше пишется действие при случае, если условие равно true, ставиться ":" и действие при случае, если условие равно false. */
(age === 18) ? console.log("Ты взрослый") : console.log("Ты не взрослый!");

/* Ещё один пример использования условного оператора "?". 
Если age равен 18, то в консоль выводиться "Ты взрослый",
Если больше 18, то "Ты старше 18!",
Если меньше 18, то "Ты младше 18!",
Если же ничего из вышеперечисленного не подходит, то выводиться "Ничего не подходит!". */
(age === 18) ? console.log("Ты взрослый") :
  (age > 18) ? console.log("Ты старше 18!") :
    (age < 18) ? console.log("Ты младше 18!") :
      console.log("Ничего не подходит!");

// Логические операторы - это "||"(или), "&&"(и), "!"(нет).

// Пример использования "&&"(и): условие, если возраст больше или равен 18, но возраст должен быть меньше или равен 50.
(age >= 18 && age <= 50) ? console.log("Ты взрослый") : console.log("Ваш возраст не подходит!");
// Пример использования "||"(или): условие, если возраст больше или равен 18, или возраст меньше или равен 50.
(age >= 18 || age <= 50) ? console.log("Ты взрослый") : console.log("Ваш возраст не подходит!");
// Пример использования "!"(нет): условие, если возраст не равен 18, то "Ты не взрослый", а если равен, то "Ты взрослый!".
(age !== 18) ? console.log("Ты не взрослый") : console.log("Ты взрослый!");


/* ЧИСЛА - https://www.youtube.com/watch?v=IKddd9ZTwB4&list=PLY4rE9dstrJymG1GyPLgOKsJNq9r-p6pX&index=5 */


var number = 234;
// Функция toFixed() приводит целое число к числу с плавающей точкой. В скобках пишется кол-во чисел после запятой.
number.toFixed(2);
// Функция toExponential() приводит число к экспонентциальному виду.
number.toExponential();
// Функция toPrecision() приводит число с плавающей точкой к целому числу. В скобках пишется, то сколько чисел нужно вывести.
number.toPrecision(4);
// Функция toString() приводит число к строке.
number.toString();
// Мы обращаемся к модулю Math и его функции sqrt(), которая выводит корень числа.
Math.sqrt(number);
// Мы обращаемся к модулю Math и его функции pow(), которая выводит число, которое дано первым в скобках, возведённое в число, данное вторым в скобках.
Math.pow(5, 2);
// Мы обращаемся к модулю Math и его функции floor(), которая всегда округляет число вниз.
Math.floor(number);
// Мы обращаемся к модулю Math и его функции ceil(), которая всегда округляет число вверх.
Math.ceil(number);
// Мы обращаемся к модулю Math и его функции round(), которая округляет число до ближайшего.
Math.round(number);
// Мы обращаемся к модулю Math и его константе PI, которая равно числу пи.
Math.PI;
// NaN(Not a Number) - это то, что нельзя получить. Например, NaN выведется, если поделить 0 на 0 или строку умножить на число.
0 / 0;
// NaN не равен ничему, даже самому себе.
NaN === NaN; // Выведет false.
// Функция isNaN() проверяет равно ли значение, переданное в скобках NaN.
var n = NaN;
isNaN(number); // Вернёт NaN.
1 / 0; // Будет равно infinity.
-1 / 0; // Будет равно -infinity.
Infinity + 31223; // Всё равно будет равно infinity.


/* СТРОКИ - https://www.youtube.com/watch?v=BTzuzSLsai8&list=PLY4rE9dstrJymG1GyPLgOKsJNq9r-p6pX&index=6 */


var str = "\"string\" is a type";// Таким способом, ставя "\" перед кавычками можно писать в одинаковых кавычках эти же кавычки.
var str = "string\nstring"; // "\n" делает перенос на новую строку.
var str = "string\tstring"; // "\t" делает таб перед словом.
console.log(str.length); // length выводит длину строки.
console.log(str.concat("Ещё строка")); // concat() соединяет данные строки.
console.log(str.charAt(0)); // chatAt() выводит символ данной строки, соотвествующий индексу, который дан в скобочках.
console.log(str.charCodeAt(0)); // chatCodeAt() выводит код символа данной строки, соотвествующий индексу, который дан в скобочках.
console.log(str.substring(5)); // substring() выводит символы данной строки, которые идут после индекса, который дан в скобочках.
console.log(str.substring(5, 7)); // Выведет все символы с 5 по 7 индексы.
console.log(str.slice(-5)); // slice() делает всё тоже самое, что и substring(), но может принимать отрицательные значения, чтобы обрезание шло в обратном порядке.
console.log(str.substr(5, 5)); // substr() выводит количество (второе число в скобках) символов данной строки, которые идут после индекса, который дан в скобочках.
console.log(str.split()); // split() разбивает строку на массив.
console.log(str.replace("string", "number")); // replace() заменяет в строке строку, которая дана первой в скобках, строкой, которая дана второй.
console.log(str.indexOf("s")); // indexOf() возвращает индекс данного символа.
console.log(str.toUpperCase()); // toUpperCase() возводит строку в верхний регистр.
console.log(str.toLowerCase()); // toLowerCase() возводит строку в нижний регистр.


/* BOOLEAN, NULL, UNDEFINED - https://www.youtube.com/watch?v=vyC1BTyh-E0&list=PLY4rE9dstrJymG1GyPLgOKsJNq9r-p6pX&index=7 */


// NaN, 0, "", null, undefined - равны false.
// undefined возвращает JavaScript, если элемент не найден, a null мы можем присвоить сами переменной.
// Также, undefined выводиться, если функции не переданы аргументы и ей нечего выводить.


/* ПРЕОБРАЗОВАНИЯ ТИПОВ ДАННЫХ - https://www.youtube.com/watch?v=OhldHbz93Kw&list=PLY4rE9dstrJymG1GyPLgOKsJNq9r-p6pX&index=8 */


String(1); // String() преобразовывает элемент в строку.
Number("2"); // Number() преобразовывает элемент в число.
Boolean(0); // Boolean() преобразовывает элемент в true или false.
5 + '1'; // Произойдёт автоматическая контакценация и на выходе будет строка '51'.
5 + ''; // Произойдёт автоматическая контакценация и на выходе будет строка '5'.
+'655434'; // Произойдёт автоматическая контакценация и на выходе будет число 655434.
+''; // Произойдёт автоматическая контакценация и на выходе будет число 0.
+true; // Произойдёт автоматическая контакценация и на выходе будет число 1.
!!'655434'; // Произойдёт автоматическая контакценация в bool и на выходе будет true.
number.toString(); // Преобразование числа в строку.
parseInt("100 px", 10); // parseInt() берёт из строки только числа и преобразовывает их в числа. Можно передать систему исчисления, как второй параметр.
parseFloat("100.32 px", 10); /* parseFloat() берёт из строки только числа и преобразовывает их в числа с плавающей точкой. 
                                Можно передать систему исчисления, как второй параметр. */


/* ОБЪЕКТЫ - https://www.youtube.com/watch?v=sfqsBd6Iwx0&list=PLY4rE9dstrJymG1GyPLgOKsJNq9r-p6pX&index=9 */


// Объект можно создать 2 способами:
var obj = Object();
var obj = {};
// Ключом объекта может быть любая строка, обычно без кавычек. Значением может быть всё что угодно, кроме undefined.
obj = {
  keey: 1,
  func: function () {
    console.log(this.keey); // С помощью ключевого слова this можно обратиться к корневому объекту. В нашем случае, это obj.
  }
};
// Чтобы обратиться к ключу объекта можно использовать точку или квадратные скобки.
obj.keey;
var prop = 'func';
obj[prop];
console.log(obj.fff || 'name'); // Если у obj нету ключа fff, то выводиться 'name'.
obj.new = "new"; // Добавляем новую пару ключ/значение.
obj.new = "neeeeew" // Изменяем пару ключ/значение.
delete obj.func; // Удаляем пару ключ/значение у obj.


/* МАССИВЫ - https://www.youtube.com/watch?v=5hjC9Y0WAig&list=PLY4rE9dstrJymG1GyPLgOKsJNq9r-p6pX&index=10 */


var arr = [1, null, '', {}]; // Создание массива.
arr[6] = 'six'; // Добавляем в 6 индекс значение, в массив где всего 4 элемента, то в 5 и 6 элемент будут равны undefined, а 7 нашему значению.
delete arr[2]; // Удаляем элемент под 2 индексом (''), но он не удалиться, а просто превратиться в undefined.
arr.splice(1, 1); /* splice() удаляет элементы, которые идут с индекса, который передан первым в скобках до индекса, переданного вторым. 
splice() именно удаляет элементы и сдвигает массив. */
arr.length = 100; // Нельзя увеличить длину массива таким способом.
arr.length = 2; // В массиве остануться только первые 2 элемента.
// Массив у которого объекты тоже массивы называется матрицей.
var matrix = [
  [
    [
      []
    ]
  ]
];
arr.concat([1, 2, 3]); // concat() может соединять массив с массивом.
arr.join(" "); // join() переделывает массив в строку. В аргументах принимать разделитель.
arr.push(23, 'wq'); // push() вставляет переданные элементы в конец массива.
arr.pop(); // pop() удаляет последний элемент массива.
arr.unshift(23, 42); // unshift() вставляет переданные элементы в начало массива.
arr.shift(); // shift() удаляет первый элемент массива.
arr.reverse(); // reverse() делает массив задом наперёд.
arr.slice(1, 5); // slice() вырезает кусок массива, по переданным индексам.
arr.sort(); // sort() сортирует массив. Сначала идут числа, потом строки. Но числа он сортирует странно. Может принимать функцию для пользовательской сортировки.


/* ЦИКЛЫ - https://www.youtube.com/watch?v=kFDhIxBV2cs&list=PLY4rE9dstrJymG1GyPLgOKsJNq9r-p6pX&index=11 */


var i;
/* Цикл for в Js состорит из 3 частей, которые разделяются ";" - 
инициализация (объявление начального значения переменной), тест (условие), 
инкремент/дискремент (прибавляем или убавляем у переменной 1, чтобы цикл был не бесконечен). */
for (i = 0; i < 10; i++) {
  console.log(i);
};

/* С помощью length можно пройтись по всему массиву. */
var arr = [1, 2, 3]
for (i = 0; i < arr.length; i++) {
  console.log(arr[i]);
};

var obj = {
  prop: 'one',
  proop: "two"
};

/* Цикл for in. Объявляем сначала переменную, а потом в условии делаем так, 
чтобы цикл проходился по каждому свойству объекта. */
var prop;
for (prop in obj) {
  /* В JS часто объекты наследуется от своих предков и имеют теже свойства, что и они.
  И если нужно пройтись по свойствам именно этого объекта, а не ещё его предков, 
  то стоит всегда проверять есть ли свойство в объекте, с помощью hasOwnProperty(). */
  if (obj.hasOwnProperty(prop)) {
    console.log(prop, obj[prop]);
  }
};

// Пример работы цикла while.
var k = 0;
while (k < 10) {
  console.log(k++);
};

//Пример работы цикла do while. Его отличие лишь в том, что сначала выполняется тело цикла, а потом уже условие, т.е действие цикла выполниться хотя бы 1 раз.
var h = 0;
do {
  console.log(h++);
} while (h < 10);


/* ФУНКЦИИ - https://www.youtube.com/watch?v=FZkSwa_rm_E&list=PLY4rE9dstrJymG1GyPLgOKsJNq9r-p6pX&index=12 */


/* Функция состоит из 4 частей: ключевое слово "function", имя функции (необязательно), параметры функции, тело функции.
Это пример function declaration. */
function func(a, b) {
  return a + b; // return преждевременно завершает функцию. Если функция ничего не будет возвращать, то выведется undefined.
};

console.log(func(3, 4)); // Запускаем функцию
console.log(func); //  Выведет код функции, т.к задавая имя функции мы как бы записываем её код в переменную.
var func = '123';
//console.log(func()); // Выведет ошибку, т.к мы создали переменную с таким же именем, как у функции и теперь её значение перезаписано.
// Можно присвоить переменной функцию, чаще всего она анонимна. Это пример function expression.
var funcExp = function (a, b) {
  return a + b;
};
console.log(funcExp(3, 4)); // Функция, записанная в переменную вызывается также, как и обычная.


/* Пример парсинга function declaration. Сначала он парсит объявления всех функций. 
И только потом парсит объявления переменных, return. Такая особенность называется hoisting. */
function func1() {

  // 1. Сначала парситься и объявляется эта функция.
  function funcExample() {
    return 'one';
  };

  // 3. Теперь парситься эта переменная и в ней находиться функция с выводом 'two', т.к она была объявлена последней.
  var variable = funcExample();

  // 2. Потом, парситься эта функция с тем же именем, что и первая, поэтому она перезаписывается.
  function funcExample() {
    return 'two';
  };
  // 4. Возвращается переменная с функцией.
  return variable;
};

console.log(func1()) // Выведет 'two'.


/* Пример парсинга function expression. Он парсит всё сверху вниз, как и должно быть по логике. */
function func1() {

  // Сначала парситься и объявляется эта функция.
  var funcExample = function () {
    return 'one';
  };

  // Потом парситься переменная, в которой записана функция с выводом 'one'.
  var variable = funcExample();

  // Теперь парситься эта функция, но она нигде не запускается, поэтому бесполезна.
  var funcExample = function () {
    return 'two';
  };

  // Возвращается переменная с функцией.
  return variable;
};

console.log(func1()); // Выведет 'one'.


// Пример работы функции обратного вызова.
var func = function (callback) {
  var name = "Nick";
  return callback(name); // Возвращаем функцию, которую передадим ниже.
};
// Передаём в качестве параметра функции новую функцию.
console.log(func(function (n) {
  return 'Hello' + n;
}));


// Возвращение функции. Объявляем функцию и возвращаем новую функцию в её теле.
var func1 = function () {
  return function () {
    console.log("Привет");
  };
};
console.log(func1()); // Мы получим не "Привет", а код функции, которая была возвращена.
console.log(func1()()); // Запуская код возвращённой функции, мы получим как раз "Привет".


/* Анонимная самовызывающиеся функция. Она должна быть заключена в круглые скобки, чтобы быть вызванной. 
Она нужна для того, чтобы изолировать переменные и т.д, которые будут в этой функции от глобального кода.
Т.е переменные, функции, и т.д, объявленные в этой функции нельзя будет использовать за её пределами.
Перед объявлением такой функции принято ставить ";" для того, 
чтобы когда код будут минифицировать (делать весь код в одну строчку) 
и кто то забыл поставить ";" перед этой функцией, то она уже тут стояла. */
; (function () { // Объявляем функцию.
  console.log("Привет от анонимной самовызывающийся функции.")
})(); // Запускаем функцию.


// Аргументы функции.
var funcArgs = function () {
  console.log(arguments); // arguments - это специальный массив функции, содержащий все аргументы, переданные ей.
};

funcArgs() // Выведет [], т.к функция не принимает никаких аргументов.

var funcArgs2 = function (a, b) {
  console.log(arguments); // arguments - это специальный массив функции, содержащий все аргументы, переданные ей.
};

funcArgs2(1, 5) // Выведет [1, 5].

// Функция, которой можно передавать неограниченное кол-во параметров.
var funcArgs3 = function () {
  var i, sum = 0;
  for (i = 0; i < arguments.length; i++) { // Делаем цикл по кол-ву переданных аргументов.
    sum += arguments[i]; /* К сумме прибавляем каждый переданный параметр, 
    используя индекс (переменную i, которой каждую итерацию прибавляется 1) в массиве arguments. */
  };

  return sum; // Возвращаем сумму.
};

funcArgs3(1, 2, 3, 4, 5) // Можно передавать сколько угодно аргументов. Выведет 15.


/* ОБЛАСТЬ ВИДИМОСТИ ПЕРЕМЕННЫХ (SCOPE) - https://www.youtube.com/watch?v=RlTcSgNph68&list=PLY4rE9dstrJymG1GyPLgOKsJNq9r-p6pX&index=13 */


// Глобальные переменные - это все переменные, которые объявлены не в теле какой-либо функции и могут быть использованы везде.
var num = 1; // Глобальная переменная.
// Локальные переменные - это все переменные, которые объявлены в теле какой-либо функции и могут быть использованы только в её пределах. 
function func() {
  var num = 2; // Локальная переменная.
};
// Мы можем обращаться к глобальным переменным с помошью объекта window.
window.num;
// При кодинге, лучше использовать локальные переменные, а не глобальные.

// Переменная, объявленная без слова var автоматически становиться глобальной, даже если она объявлена в функции.
variable = '';
var inner = function () {
  var arr = [1, 2, 3];
  for (i == 0; i < arr.length; i++) { // Мы объявили i без слова var, поэтому она стала глобальной.
    console.log(i);
    outer()
  };

};
var outer = function () {
  var arr = [1, 2, 3];
  for (i == 0; i < arr.length; i++) { /* Так как тут мы тоже не используем слово var, то используется глобальная переменная и она перезаписывает на 0. 
                                      И будет путаница в функциях просто из-за того, что мы не написали слово var и переменная i cтала глобальной. 
                                      Поэтому, чтобы путаниц не было, то ВСЕГДА нужно писать var перед объявлением переменной. */
    console.log(i);
  };
};

inner();


// Цепочка областей видимости.
var k = 4;

var outerScope = function () {
  console.log(k); /* Выведет undefined, т.к мы объявляем переменную с тем же именем дальше в коде этой функции. 
  Если бы не объявляли, то вывело бы 4. Т.к парсер JS сначала парсит объявления переменных, но без их значений. */
  var k = 8;
  console.log(k); // Выведет 8, т.к локальная переменная этой функции объявлена.

  var innerScope = function () {
    console.log(k); /* Выведет undefined, т.к мы объявляем переменную с тем же именем дальше в коде этой функции. 
    Если бы не объявляли, то вывело бы 8. Т.к парсер JS сначала парсит объявления переменных, но без их значений. */
    var k = 12;
  };
  innerScope(); // Запуская эту функцию, мы присваим переменной k значение 12 только в пределах функции innerScope().
  console.log(k); // Выведет 8, т.к значение локальной переменной этой функции равно 8.
};

outerScope();

/* Правило JS: всегда описывай все переменные в начале области видимости. 
Т.е когда начинается тело функции, то сразу объявлять все переменные, которые будут там использованы.
Необязательно записывать сразу всем переменным их значения, но нужно их объявлять (например: var i;), 
чтобы когда будете их использовать в функции, то использовались именно они, а не их клоны из глобальной области видимости. */


/* ЗАМЫКАНИЕ (CLOSURE) - https://www.youtube.com/watch?v=N09Ljaaexqk&list=PLY4rE9dstrJymG1GyPLgOKsJNq9r-p6pX&index=14 */


