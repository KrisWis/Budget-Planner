

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


let person2 = {
    name: "jack",
    age: 2,
    address: {
        city: "Moscow"
    }
};
let { name4, age4 = 8 } = person2; // Пример деструктурирующего присваивания объектов.
let { name: PersonName, age: PersonAge } = person2; // Тут мы свойствам в объекте присваиваем определённые переменные.
let { address: { city = "Peter" } } = person; // Заходим в свойство address и берём оттуда свойство city, присваивая ему дефолтное значение.
// Пример деструктурирующего присваивания объекта для функции.
function test3({ a, b }) { };
test3[person];


/* СИМВОЛЫ - https://www.youtube.com/watch?v=XTrXDgc7oHo&list=PLNkWIWHIRwMGLJXugVvdK7i8UagGQNaXD&index=13 */


/* Символы это новый тип данных.
Они нужны для создания уникальных ключей внутри объектов, когда объекты действительно большие. 
Либо используются при создании библиотеки для уникальных имён и не допущения конфликта имён снаружи библиотеки. */
let symbol = Symbol('mySimbol');
console.log(symbol); // Выведет Symbol('mySimbol').
let symbol2 = Symbol('mySimbol')
console.log(symbol === symbol2); // Выведет false, т.к все символы уникальны.

// Для того, чтобы символы с одинаковым значениям были равны, есть метод for.
let symbol3 = Symbol.for('mySimbol');
console.log(symbol3); // Также выведет Symbol('mySimbol').
let symbol4 = Symbol.for('mySimbol')
console.log(symbol3 === symbol4); // Выведет true, т.к символы объявлены с помощью метода for.

/* Все созданные символы с помощью for добавляются в некий глобальный реестр. 
Символы, не созданные с помощью for, в глобальный реестр не попадают. */
let symbolName = Symbol.keyFor(symbol3); // Получаем значение, которое хранит symbol3.
console.log(symbolName); // Выведет "mySimbol".

let person3 = {
    [Symbol.for("password")]: "21weqwere342"
}
// Функция для того, чтобы вывести все символы в объекте.
console.log(Object.getOwnPropertySymbols(person3)); // Выведет [Symbol(password)]


/* ПРОМИСЫ - https://www.youtube.com/watch?v=XD1MKx7eIuQ&list=PLNkWIWHIRwMGLJXugVvdK7i8UagGQNaXD&index=14 */


// Промисы нужны для последовательного выполнения асинхронного кода.
const promise = new Promise((resolve, reject) => {
    throw new Error("error"); // Создание ошибки с помощью throw, которая отлавливается catch.
}); // Пример создания промиса.
// Пример использования промиса.
promise.then(data => data) // Если у нас цепочка .then, то каждый .then должен возвращать какое-либо значение.
    .then(data => data)
    .catch(() => console.log("error"));
// Метод fetch() отправляет промис и с ним можно использовать .then и .catch.


/* ASYNC/AWAIT - https://www.youtube.com/watch?v=b17RVAqp5QA&list=PLNkWIWHIRwMGLJXugVvdK7i8UagGQNaXD&index=15 */


const fetchData = () => Promise.resolve({
    data: ["Jack", "Max", 'Leo']
});

// Код на .then, используя промис.
const getNamesData = () => {
    fetchData()
        .then(data => {
            console.log(data);
            return 'done';
        })
}
/* Тот же код на async/await. Код на async/await будет возвращать промис.
А также код на async/await использует структуру try/catch для обработки ошибок, а не reject/resolve. */
const getNamesData2 = async () => {
    console.log(await fetchData());
    return 'done';
}


/* ИТЕРАТОРЫ - https://www.youtube.com/watch?v=HToDur7Gkkw&list=PLNkWIWHIRwMGLJXugVvdK7i8UagGQNaXD&index=16 */


// Итерируемые объекты - это те объекты, которые можно перебрать в цикле.

// Чтобы перебрать объект нужно вызвать объект Symbol.iterator, который преобразует объект в итерируемый.
let GenerateNumbers = {
    start: 1,
    end: 10
}

GenerateNumbers[Symbol.iterator] = function () {
    // Записываем значения начала и конца цикла
    let current = this.start;
    let last = this.end;

    return {
        next() { // Вызывается при каждом итерировании
            if (current <= last) { // Если ещё не конец цикла
                return { // Возвращаем, что цикл не завершён и прибавляем значение.
                    done: false,
                    value: current++
                }
            } else {
                return { // Возвращаем, что цикл завершён.
                    done: true,
                }
            }
        }
    }
}

/* Теперь можно пройтись циклом по объекту.
Цикл сам автоматически вызывает Symbol.iterator, 
после чего вызывает next() до получения объекта со свойством done, равным true. */
for (let number of GenerateNumbers) {
    console.log(number);
}


/* ГЕНЕРАТОРЫ - https://www.youtube.com/watch?v=ejdhriCfF8s&list=PLNkWIWHIRwMGLJXugVvdK7i8UagGQNaXD&index=17 */


// Генераторы, это функции, которые могут в любой момент прекратить выполнение и выполнять промежуточный результат.
function* generate() { // Пример функции-генератора. Это итерируемые объекты.
    // Из-за метода throw, мы можем отлавивать ошибки в самом генераторе с помощью try/catch.
    try {
        console.log("first");
        yield 1; // Если указать после yield значение, то оно запишется в свойство value у next().
        let res = (yield) * 2; // В next() можно передавать значения и манипулировать с ними. yield, в таком случае, нужно обернуть в круглые скобки.
        console.log(res);
    } catch (err) {
        console.log(err);
    }
}

let iterator = generate(); // Записываем генератор в переменную.
// Объекты next() имеют структуру, которую мы описывали ранее.
// Первый next() только запускает генератор, поэтому передавать в него значения нет смысла.
iterator.next(); // Выведет "first".
iterator.return(); // return() останавливает генератор и вызвать next() больше нельзя. В "done" стоит true.
iterator.throw(new Error("error")); // Метод throw() нужен для создания ошибки в генераторе и прекращения его работы.
iterator.next(2); // Выведет 4.

let object2 = {
    *generator() { } // Пример метода-генератора.
}


/* SET & MAP - https://www.youtube.com/watch?v=eiERfNjeeUc&list=PLNkWIWHIRwMGLJXugVvdK7i8UagGQNaXD&index=18 */


// Map - это коллекция для хранения записей вида ключ-значение. Ввиде ключей, она может принимить любой объект.
let map = new Map();
// Используем сокращённый синтаксис добавления.
map
    .set("str", "string") // Записываем в map строку-ключ и строку-значение.
    .set(1, 5) // Записываем в map цифру-ключ и цифру-значение.
    .set(true, 'boolean'); // Записываем в map bool-ключ и строку-значение.

// C помощью get() можно получить значение по ключу.
map.get(1); // Выведет 5
map.size; // Выведет размер map, равный 3.

// Пример создания map другим способом.
let map2 = new Map([
    ['str', 'string']
    [1, 5]
    [true, 'boolean']
]);
// Проверка на то, есть в map переданный ключ.
map2.has(1); // Выведет true.
map2.delete(1); // Удаляем ключ-значение 1:5.
map2.clear(); // Полностью очищаем map.
map.keys(); // Возвращает итерируемый объект ключей.
map.values(); // Возвращает итерируемый объект значений.
map.entries(); // Возвращает итерируемый объект пар ключ-значение.

// Set - это такая же коллекция, как и map, но она удаляет дубликаты и хранит только уникальные ключ-значения.
let set = new Set();
let jack2 = { name: 'jack' };
let leo2 = { name: 'leo' };
// Добавление объектов происходит с помощью метода add().
set
    .add(jack2)
    .add(leo2)
    .add({ name: 'jack' }) // Не добавиться, т.к это дубликат.
set.forEach(user => console.log(user)); // Проходимся циклом по множеству и выводим каждый объект ключ-значение.
// Но найти элемент по ключу в множестве не получиться.

set.delete(jack2); // Удаление элемента. Если объект там был - вернёт true, если нет - то false.
set.has(leo2); // Возвращаем true, если объект там есть и false, если нет.
set.clear(); // Очищаем множество.

/* Коллекции WeakMap и WeakSet отличаются от Map и Set только тем, что они не припятствуют сборщику мусора удалять свои элементы.
Т.е если объект присутствует только в weakMap или только в weakSet и больше нигде не используется, то он удаляется из памяти.
Используя weakMap и weakSet мы храним только вспомогательные данные, которые должны существовать только пока существует объект. */
let weackMap = new WeakMap();
let weakSet = new WeakSet();


/* МОДУЛИ - https://www.youtube.com/watch?v=q_tHi37EMic&list=PLNkWIWHIRwMGLJXugVvdK7i8UagGQNaXD&index=19 */


// Экспорт - вывоз, импорт - ввоз.
// С помощью ключевого слова export осуществляется экспорт переменных, классов и функций.
export let aboba = 0; // Экспорт с объявлением.
export { jack, leo }; // Экспорт переменных.
export { func, Task } // Экспорт функции и класса. После экспорта класса или функций не ставиться ;
export { jack as jacky, leo as leonard }; // Тут мы говорим, чтобы переменная jack экспортировалась с именем jacky, а leo с именем leonard.

// Также, в модуле можно объявить 1 объект, который будеть экспортироваться по-умолчанию, используя слово default.
export default class User {
    constructor(name) {
        this.name = name;
    }
}

import User from "EcmaScript6.js"; // И в другом файле, его можно импортировать.

/* С помощью ключевого слова import осуществляется импорт экспортированных переменных, классов и функций.
Импортируются переменные one и two из файла tips.js. */
import { one, two } from "tips/js";
console.log(one, two);
// Тут мы говорим, чтобы экспортированная переменная one импортировалась с именем num1, а two с именем num2.
import { one as num1, two as num2 } from "tips/js";
console.log(num1, num2);
// Тут мы говорим, чтобы все ЭКСПОРТИРОВАННЫЕ переменные, классы, функции и тд импортировались из файла tips.js ввиде переменной с именем tips.
import * as tips from "tips.js";
console.log(tips);