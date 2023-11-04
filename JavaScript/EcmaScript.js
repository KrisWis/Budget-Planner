




/* СТАНДАРТЫ ECMASCRIPT6 */





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





/* СТАНДАРТЫ ECMASCRIPT7-ECMASCRIPT9 */





/* МЕТОДЫ ОБЪЕКТОВ - https://www.youtube.com/watch?v=zXaXzC5U_8c&list=PLNkWIWHIRwMH_05WTvIX419odDtStynm3&index=2 */


// entries() возвращает массив СОБСТВЕННЫХ (без наследования) перечисляемых свойств объекта в формате ключ-значение. 
const user2 = {
    firstName: "Yauhen",
    lastName: "Kavalchuk",
};

Object.entries(user2); // [ [ 'firstName', "Yauhen" ], [ 'lastName', "Kavalchuk" ] ];


// Если entries() применяется к массиву, то на место ключей встанут индексы.
const name3 = ['Y', 'a', 'u', 'h', 'e', 'n'];

Object.entries(name3); // [ [ '0', 'Y' ], [ '1', 'a' ], [ '2', 'u' ], [ '3', 'h' ], [ '4', 'e' ], [ '5', 'n' ] ];


// Свойство, ключом которого является Символ будет проигнорировано entries().
const admin = {
    [Symbol('password')]: '123pass',
    name: 'Yauhen',
};

Object.entries(admin); // [ [ 'name', 'Yauhen' ] ];


// Метод fromEntries() преобразует массив массивов пар ключ-значение в объект.
const arr = [['one', 1], ['two', 2], ['three', 3]];

Object.fromEntries(arr); // { one: 1, two: 2, three: 3 }


// Метод values() возвращает массив всех собственных значений объекта.
const user = {
    firstName: "Yauhen",
    lastName: "Kavalchuk",
};

Object.values(user); // [ "Yauhen", "Kavalchuk" ];


/* OBJECT.GETOWNPROPERTYDESCRIPTORS() - https://www.youtube.com/watch?v=laAjQoMbnPY&list=PLNkWIWHIRwMH_05WTvIX419odDtStynm3&index=3 */


// Этот метод возвращает все сведения для всех свойств заданного объекта.
// Базовый объект со свойствами, геттерами и сеттерами
const person5 = {
    name: 'Max',
    age: 30,
    set personName(name) {
        this.name = name;
    },
    get password() {
        return `${this.name}${this.age}`;
    },
};

console.log(person5); // {name: "Max", age: 30} - выводит свойства объекта, а геттеры и сеттеры нет
console.log(person5.password); // "Max30"

// Пример работы Object.getOwnPropertyDescriptors(). Он был создан для нормального клонирования объекта.
console.log(Object.getOwnPropertyDescriptors(person5));
/*
  age: {value: 30, writable: true, enumerable: true, configurable: true}
    name: {value: "Max", writable: true, enumerable: true, configurable: true}
    password: {get: ƒ, set: undefined, enumerable: true, configurable: true}
    personName: {get: undefined, set: ƒ, enumerable: true, configurable: true}
*/

// Клонирование объекта, используя метод assign(), геттеры и сеттеры превращаются в обычные свойства
const admin5 = Object.assign({}, person5);
console.log(admin5); // {name: "Max", age: 30, personName: undefined, password: "Max30"}
console.log(Object.getOwnPropertyDescriptors(admin6));
/*
    age: {value: 30, writable: true, enumerable: true, configurable: true}
    name: {value: "Max", writable: true, enumerable: true, configurable: true}
    password: {value: "Max30", writable: true, enumerable: true, configurable: true}
    personName: {value: undefined, writable: true, enumerable: true, configurable: true}
*/

// Клонирование объекта, используя .getOwnPropertyDescriptors() и .defineProperties используется для клонирования всех дескрипторов person5 в {}.
const superAdmin6 = Object.defineProperties({}, Object.getOwnPropertyDescriptors(person5));
console.log(Object.getOwnPropertyDescriptors(superAdmin6));
/*
    age: {value: 30, writable: true, enumerable: true, configurable: true}
    name: {value: "Max", writable: true, enumerable: true, configurable: true}
    password: {get: ƒ, set: undefined, enumerable: true, configurable: true}
    personName: {get: undefined, set: ƒ, enumerable: true, configurable: true}
*/


/* TRAILING COMMAS & EXPONENTIATION OPERATOR - https://www.youtube.com/watch?v=gmVLp3ZVYZk&list=PLNkWIWHIRwMH_05WTvIX419odDtStynm3&index=4 */


// Раньше для возведения в степень нужно было использовать Math.pow():
Math.pow(7, 2) // 49

// Теперь можно использовать специальный оператор **:
7 ** 2 // 49

// Теперь можно ставить запятую у последнего свойства у объекта и у функции можно ставить точку с запятой у последнего свойства.
const user5 = {
    firstName: "Yauhen",
    lastName: "Kavalchuk",
    age: 30,
};

function Person(
    name,
    age,
    city,
) {
    this.name = name;
    this.age = age;
    this.city = city;
};


/* АСИНХРОННЫЕ ФУНКЦИИ - https://www.youtube.com/watch?v=JtnIU6HemK8&list=PLNkWIWHIRwMH_05WTvIX419odDtStynm3&index=5 */


// Асинхронные функции дали возможность выполнять асинхронный код синхронно.

// Базовая асинхронная функция
const fetchText = () => new Promise(resolve => { setTimeout(() => resolve('ES8'), 2000); });
const showText = async () => {
    const fetchedText = await fetchText();
    console.log(`This is a feature of ${fetchedText}`);
};
showText(); // This is a feature of ES8


// Если сделать прошлый пример с помощью синхронной функции, то она не будет ждать выполнения асинхронного fetchText() и сразу сделает console.log().
showText = () => {
    const fetchedText = fetchText();
    console.log(`This is feature a of ${fetchedText}`);
};

showText(); // This is a feature of [object Promise]


// Асинхронная функция всегда возвращает промис:
showText = async () => {
    const fetchedText = await fetchText();
    return `This is feature a of ${fetchedText}`;
};
// Поэтому можем обратиться к функции через .then().
showText().then(data => console.log(data)); // This is a feature of ES8


// В следующем примере, мы делаем 2 асинхронных функции с задёржкой 2 секунды и получим результат только через 4 секунды.
const fetchDescrText = () => new Promise(resolve => { setTimeout(() => resolve('This is a feature of'), 2000); });
const fetchEsText = () => new Promise(resolve => { setTimeout(() => resolve('ES8'), 2000); });
showText = async () => {
    const fetchedDescrText = await fetchDescrText();
    const fetchedEsText = await fetchEsText();
    return `${fetchedDescrText} ${fetchedEsText}`;
};
showText().then(data => console.log(data)); // This is a feature of ES8


// Пример параллельного вызова функций с помощью Promise.all(). 
showText = async () => {
    const [fetchedDescrText, fetchedEsText] = await Promise.all([fetchDescrText(), fetchEsText()]);
    return `${fetchedDescrText} ${fetchedEsText}`;
};

// Выведется через 2 секунды, т.к Promise.all() вызывает функции паралелльно.
showText().then(data => console.log(data)); // This is a feature of ES8


/* АСИНХРОННАЯ ОБРАБОТКА ОШИБОК - https://www.youtube.com/watch?v=VglJ0Wic2i8&list=PLNkWIWHIRwMH_05WTvIX419odDtStynm3&index=6 */


// Обработка ошибок с try/catch:
showText = async () => {
    try {
        const fetchedText = await fetchText();
        console.log(`This is a feature of ${fetchedText}`);
    } catch (e) {
        console.log(e);
    }
};
showText();


// Аргумент ошибки теперь необязательно передавать в catch
showText = async () => {
    try {
        const fetchedText = await fetchText();
        console.log(`This is a feature of ${fetchedText}`);
    } catch {
        console.log('Something going wrong...');
    }
};
showText();


// Пример обработки ошибок с помощью catch в await конструкциях, т.к любое выражение, помеченное await возвращает промис
showText = async () => {
    const fetchedText = await fetchText().catch(e => console.log(e));
    console.log(`This is a feature of ${fetchedText}`);
};
showText();


// Пример обработки ошибок при вызове асинхронной функции
showText = async () => {
    const fetchedText = await fetchText();
    console.log(`This is a feature of ${fetchedText}`);
};
showText()
    .then(console.log('Everything is OK!'))
    .catch(e => console.log(e));


// Пример использования полной конструкции try/catch/finally. Finally сработает в любом случае.
showText = async () => {
    try {
        showSpiner = true;
        const fetchedText = await fetchText();
        console.log(`This is a feature of ${fetchedText}`);
    } catch {
        console.log('Something going wrong...');
    } finally {
        showSpiner = false;
    }
}
showText();


/* АСИНХРОННЫЕ ИТЕРАТОРЫ - https://www.youtube.com/watch?v=58_qeGUBS2k&list=PLNkWIWHIRwMH_05WTvIX419odDtStynm3&index=8 */


// Массив из промисов
names = [
    new Promise(resolve => resolve('Jack')),
    new Promise(resolve => resolve('Max')),
    new Promise(resolve => resolve('Leo')),
];

// Если бы мы итерировали массив из промисов с помощью обычного for of, то он бы просто вывел нам, что в массиве находяться промисы, но не их значения.
showNames = async () => {
    for (name of names) {
        console.log(name);
    }
};
showNames(); // Promise, Promise, Promise

// А вот когда мы используем for await of, то всё работает так, как нам надо
const showNames = async () => {
    // Цикл ждёт разрешения каждого промиса и только после этого переходит к следующему шагу.
    for await (name of names) {
        console.log(name);
    }
};
showNames(); // 'Jack', 'Max', 'Leo'


// Пример асинхронного генератора. Промежуточное значение здесь возвращается ввиде промиса.
async function* readLines(path) {
    let file = await fileOpen(path);

    try {
        while (!file.EOF) {
            yield await file.readLine();
        }
    } finally {
        await file.close();
    }
};


// Асинхронная итерация по вызову асинхронного генератора
for await (const line of readLines(filePath)) {
    console.log(line);
};


/* МЕТОДЫ МАССИВА - https://www.youtube.com/watch?v=8z1DQqlC78I&list=PLNkWIWHIRwMH_05WTvIX419odDtStynm3&index=7 */


arr = [1, 2, 3, 4, 'five', NaN];

// Проверка на то, есть ли элемент в массиве
if (arr.includes(3)) {
    console.log(true); // true
}

// Можно даже сделать проверку на вхождение NaN в массив
arr.includes(NaN); // true


// .flat() делаем поднятие всех подмассивов на указанный уровень (по началу - это 1)
const arr1 = [1, 2, [3, 4]];
arr1.flat(); // [1, 2, 3, 4]

const arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat(); // [1, 2, 3, 4, [5, 6]]

const arr3 = [1, 2, [3, 4, [5, 6]]];
arr3.flat(2); // [1, 2, 3, 4, 5, 6]

const arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
arr4.flat(Infinity); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


// .flat() также удаляет пустые слоты
const arr6 = [1, 2, , 4, 5, [6, , 8]];
arr6.flat(); // [1, 2, 4, 5, 6, 8]


// Метод .flatMap() сначала применяет функцию к каждому элементу, а потом раскрывает вложенные массивы
const arr7 = [[1], [2], [3], [4]];
arr7.flatMap(x => [x * 2]); // [2, 4, 6, 8]


/* МЕТОДЫ СТРОК - https://www.youtube.com/watch?v=MI_9grIevCE&list=PLNkWIWHIRwMH_05WTvIX419odDtStynm3&index=9 */


str = "test";
// .padStart() подставляет определённое количество символов в начале строки, а .padEnd() в конце.
str.padStart(10, '~'); // '~~~~~~test'
str.padEnd(10, '~'); // 'test~~~~~~'
// .padStart() и .pandEnd() без переданного символа заполяют нужную область пробелами.
str.padStart(10); // '      test'
str.padEnd(10); // 'test      '
// Если переданная строка длиннее, чем заданный параметр длины, то строка останеться неизменной.


str = "Hello, my name is Yauhen";
// .startsWith() проверяет, есть ли переданная строка в начале строки.
str.startsWith("Hello"); // true
str.startsWith("Hi"); // false
// .endsWith() проверяет, есть ли переданная строка в конце строки.
str.endsWith("Yauhen"); // true
str.endsWith("Jack"); // false

// Второй аргумент startsWith() как бы обрезает строку с начала на переданное число символов. В примере, теперь строка это 'my name is Yauhen'.
str.startsWith("my", 7); // true
str.startsWith("name", 7); // false

// Второй аргумент endsWith() как бы обрезает строку ДО заданного количества символов. В примере, теперь это 'Hello, my name'.
str.endsWith("name", 14); // true
// В примере, теперь это 'Hello, my'.
str.endsWith("name", 9); // false


str = "    Just test string     ";
// trim() убирает пробельные символы у начала и конца строки.
str.trim(); // "Just test string"

// .trimStart() убирает пробелы только у начала.
str.trimStart(); // "Just test string     "

// .trimEnd() убирает пробелы только у конца.
str.trimEnd(); // "    Just test string"


/* FUNCTION.TOSTRING() & SYMBOL DESCRIPTION & JSON.STRINGIFY() - https://www.youtube.com/watch?v=gvxCKEtCJaM&list=PLNkWIWHIRwMH_05WTvIX419odDtStynm3&index=11 */


function /* just a comment */ test() { }

// Теперь метод .toString() выдаёт полный код переданной функции, вместе с комментариями.
test.toString(); // 'function /* just a comment */ test () {}'

function greeting() {
    const name = 'webDev';
    console.log(`hello from ${name}`);
};
// Также, теперь соблюдены все отступы и табуляции.
test.toString();
/*  'function greeting() {\n' +
    "  const name = 'webDev'\n" +
    '  console.log(`hello from ${name}`)\n' +
    '}'
*/


const mySymbol = Symbol('Symbol description');

// Теперь у Символов есть свойство description для того, чтобы узнать, что в них храниться.
mySymbol.description; // 'Symbol description'
mySymbol.description === 'Symbol description'; // true

// Если у символа нет значения, то оно будет равно undefined
const myNewSymbol = Symbol();
myNewSymbol.description; // undefined


// .stringify() раньше работал плохо с символами Unicode, но теперь всё хорошо.
// Раньше:
JSON.stringify("\uD800"); // '"�"'
// Сейчас:
JSON.stringify("\uD800"); // '"\\ud800"'


/* НОВЫЕ ВОЗМОЖНОСТИ РЕГУЛЯРНЫХ ВЫРАЖЕНИЙ - https://www.youtube.com/watch?v=dv_iHGJbVZQ&list=PLNkWIWHIRwMH_05WTvIX419odDtStynm3&index=10 */


/* Точка в регулярных выражениях обозначает любой символ. Но раньше она не засчитывала спецсимволы типа \n. 
Теперь засчитывает, но для этого нужно поставить специальный флаг /s. */
/one.two/.test('one\ntwo'); // false
/one.two/s.test('one\ntwo'); // true


/* Данное регулярное выражение ищется в падение по строке, 
в которой идёт 4 цифры, затем тире, затем 2 цифры, потом опять тире, и опять 2 цифры. */
regEx = /(\d{4})-(\d{2})-(\d{2})/;

// Метод exec возвращает массив с результатами по вхождению строки в регулярное выражение.
result = regEx.exec('2019-08-23');

console.log(result); // ["2019-08-23", "2019", "08", "23", index: 0, input: "2019-08-23", groups: undefined]

/* Тоже самое регулярное выражение, но с именнованными группами. 
Это названия для групп (частей) в регулярном выражении, которые станут словарём в свойстве groups. */
regEx = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;

result = regEx.exec('2019-08-23');

console.log(result); // ["2019-08-23", "2019", "08", "23", index: 0, input: "2019-08-23", groups: {...}];

// Теперь мы можем работать с частями строки, входящей в регулярное выражение.
console.log(result.groups); // { year: "2019", month: "08", day: "23" }


// Использование .replace() и регулярного выражения.
const str = 'Kavalchuk Yauhen';

// Создаём регулярное выражение с именноваными группами.
const repl = /(?<firstName>[A-Za-z]+) (?<lastName>[A-Za-z]+$)/u;

// Меняем именновые группы местами.
const newStr = str.replace(repl, '$<lastName>, $<firstName>');

console.log(newStr); // "Yauhen, Kavalchuk"


// Использование именованной группы внутри регулярного выражения возможно с помощью флага \k.
let sameWords = /(?<fruit>apple|orange) === \k<fruit>/u;

sameWords.test('apple === apple');  //true
sameWords.test('orange === orange');  //true
sameWords.test('apple === orange');  //false


// ?<=[symbol] делает проверку на то, есть ли конкретный символ перед строкой (в нашем случае это - #).
/(?<=#).*/.test('#frontend'); // true
/(?<=#).*/.test('frontend'); // false

// Возврат строки осуществляется без этого символа.
'#frontend'.match(/(?<=#).*/)[0]; // 'frontend'


// ?>![symbol]) делает проверку на то, чтобы перед строкой был обязательно не переданный символ, а любой другой.
// В следующем примере, делаем проверку на то, чтобы вернуло любое число, перед которым стоит НЕ $.
'course coasts $20'.match(/(?<!\$)\d+\.?\d+/) // null
'use hash-tag #20'.match(/(?<!\$)\d+\.?\d+/)[0] // 20
'email@404.com'.match(/(?<!\$)\d+\.?\d+/)[0] // 404