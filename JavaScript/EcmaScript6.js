

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


/* ШАБЛОННАЯ СТРОКА (TEMPLATE STRING) - https://www.youtube.com/watch?v=5l_3YabRaGc&list=PLNkWIWHIRwMGLJXugVvdK7i8UagGQNaXD&index=5 */


