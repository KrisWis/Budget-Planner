

/* ПОДКЛЮЧАЕМ BABEL - https://www.youtube.com/watch?v=x_zq1DpaLAU&list=PLNkWIWHIRwMGLJXugVvdK7i8UagGQNaXD&index=2  */


/* Babel это технология для транспиляции языка JS, написанном при новых стандартах ES, 
которые поддерживаются ещё не во всех браузерах в синтаксис, который эти браузеры поддерживают. */
/* Чтобы установить Babel нужно ввести в терминал следующую строку - "npm i babel-cli babel-core babel-preset-env --save-dev".
Далее нужно в package.json ввести строку ""scripts": {"watch": "babel JavaScript/EcmaScript6 -d JavaScript --presets env -w"}",
которая будет транспилировать наш файл EcmaScript6 в траспилированный файл в папке JavaScript. */


/* ОБЪЯВЛЕНИЯ ПЕРЕМЕННЫХ (VAR, LET, CONST) - https://www.youtube.com/watch?v=8SWnTuG0_Mg&list=PLNkWIWHIRwMGLJXugVvdK7i8UagGQNaXD&index=3 */


/* Константы это переменные, которые в течении выполнения скрипта не изменяются 
и их нельзя изменить (только если это не массивы или объекты).
let пришёл на смену var и var уже не нужен.
Переменная, объявленная с помощью var имеет локальную область видимости. 
А переменные, объявленые с помощью let и const имеют область видимости только внутри фигурных скобок. 
Когда объявляешь переменную с помощью var и сразу присваиваешь ей значение, то происходит всплытие 
и её можно вызвать до её объявления в коде, но у неё будет значение undefined. 
Но переменные, объявленные с помощью let и const не могут быть использованы до их объявления в коде. */


/* ОПЕРАТОРЫ РАЗВОРОТА И СВОРАЧИВАНИЯ (SPREAD & REST OPERATORS) - https://www.youtube.com/watch?v=MeLPG4NCB6I&list=PLNkWIWHIRwMGLJXugVvdK7i8UagGQNaXD&index=4 */


nums = [1, 2, 3];
// Spread и Rest операторы - это "...", которые просто используются в разных контекстах.
console.log(...nums); // Выведет не массив, а просто все данные из него ("развернёт массив"). Это пример spread оператора.
let a = {
    a: 1,
    b: 2
};
let b = {
    c: 3
};
// Объект c будет содержать свойства и значения из объектов a и b.
let c = {
    ...a,
    ...b
}
// Spread можно также передавать и в вызов функции.
sum(nums);

// Rest оператор можно передать в функцию, чтобы она могла принимать неограниченное количество аргументов.
function res(arg, ...rest) {
    for (let index = 0; index < rest.length; index++) {
        const element = rest[index];
    }
}
res(1, 2, 4, 5, 6, 2, "1"); // Первый аргумент запишется в arg, а все последующие в ...rest.


/* ШАБЛОННАЯ СТРОКА - https://www.youtube.com/watch?v=5l_3YabRaGc&list=PLNkWIWHIRwMGLJXugVvdK7i8UagGQNaXD&index=5 */


// Динамичная строка выглядит следующим образом.
`${dynamic_string}`;
// Динамичные строки могут быть написаны в нескольких строках кода.
let name = "Jack";
`Привет,
${name}`;
/* Также, есть такая вещь как тегирование, когда перед шаблонной строкой вводишь имя функции,
а в эту функцию должен передавать массив литералов (слова/символы, разделённые пробелом в строке и сама шаблонная строка). */
console.log(toUpperCase`Hello, ${name}!`);
function toUpperCase(litArr, value) {
    /* Передаём "Hello, " + "Jack" + "!". */
    return litArr[0] + value.toUpperCase() + litArr[1]
}


/* СТРЕЛОЧНЫЕ ФУНКЦИИ - https://www.youtube.com/watch?v=PGnNVW5n-3g&list=PLNkWIWHIRwMGLJXugVvdK7i8UagGQNaXD&index=6 */


function test(name = "Jack") { } // Пример дефолтных значений у параметров функции.
const greet = (name, age) => `Hello, ${name}, your age is ${age}` // Пример стрелочной функции.
const func = () => { // Пример стрелочной функции без аргументов.
    return 1 + 1;
}
const func2 = a => a * 2; // Пример стрелочной функции в одну строку.
(() => { })(); // Анонимная самовызывающаяся стрелочная функция.
/* С стрелочными функциями нельзя использовать оператор new. 
У них нету псевдомассива arguments. И к ним нельзя применять bind, apply, call.
this у неё будет равно объекту, к которому она принадлежит, как метод. */


/* ЦИКЛ FOR...OF - https://www.youtube.com/watch?v=axEG1v0KnrY&list=PLNkWIWHIRwMGLJXugVvdK7i8UagGQNaXD&index=7 */


const names = ['John', 'Liza', 'Anton'];
for (let name in names) { // Если перебрать массив через in, то выведуться не имена, а их порядковые номера.
    console.log(name);
}

for (let name of names) { // Если перебрать массив через of, то выведуться именно сами имена.
    console.log(name);
}

// in проходиться по индексам, а of по самим значениям.


/* ОБЪЕКТЫ - https://www.youtube.com/watch?v=Xxaw11ezP7E&list=PLNkWIWHIRwMGLJXugVvdK7i8UagGQNaXD&index=8 */


// В ES6, если имя ключа равно имени переменной, то значение переменной автоматически присвоиться к этому ключу.
let name2 = "John";
let age = 2;
let sex = "mool";
let person = {
    name2,
    age,
    sex,
    greet() {
        console.log(1);
    },
    get password() { // Пример геттера
        return this.name2 + this.age;
    }
}

person.password; // Применение геттера


/* КЛАССЫ - https://www.youtube.com/watch?v=BASquaxab_w&list=PLNkWIWHIRwMGLJXugVvdK7i8UagGQNaXD&index=9 */


class Task {
    constructor() {
        Task.counter += 1; // Используем статистическое свойство
    }

    // Названия функций и свойств не должны совпадать.
    completed() {
        this._completed = true;
    }
}
// Чтобы задать статистическое свойство, нужно использовать следующий синтаксис:
Task.counter = 0; // Но статистические свойства можно объявлять только перед объявлением экзепляров класса.


/* НАСЛЕДОВАНИЕ - https://www.youtube.com/watch?v=y_j7RigHZMI&list=PLNkWIWHIRwMGLJXugVvdK7i8UagGQNaXD&index=10 */


// Пример использования наследования.
class SubTask extends Taks {
    constructor() {
        this.example = 0; // С помощью this можно объявить свойство и не передавая его в конструктор.
    }

    completed() {
        // Чтобы вызвать функцию с тем же названием, что и в дочернем, но из родительского класса нужно использовать super.
        super.completed();
        console.log("Функционал этого completed()")
    }
}
// Пример использования class expression.
let newTask = class Subtask { }


/* ДЕСТРУКТУРИРУЮЩЕЕ ПРИСВАИВАНИЕ МАССИВОВ - https://www.youtube.com/watch?v=hwCOzuKzb2g&list=PLNkWIWHIRwMGLJXugVvdK7i8UagGQNaXD&index=11 */


const people = ['Jack', 'Leo', 'Max'];
// Если переменных больше, чем элементов в массиве, то такая переменная будет равна undefined. Но можно задать ей значение по умолчанию.
let [jack, leo, max, what = 'what'] = people; // Пример деструктурирующего присваивания массива.
console.log(jack, leo, max); // К каждой переменной присвоился определённый элемент массива.
let [el3, [el1, el2]] = [3, [1, 2]]; // Пример деструктурирующего присваивания массива с вложенным массивом.
// Пример деструктурирующего присваивания массива в функцию.
function test2([a, b]) { };
test2[1, 20];


/* ДЕСТРУКТУРИРУЮЩЕЕ ПРИСВАИВАНИЕ ОБЪЕКТОВ - https://www.youtube.com/watch?v=9ZsSNKo3cQ8&list=PLNkWIWHIRwMGLJXugVvdK7i8UagGQNaXD&index=12 */



