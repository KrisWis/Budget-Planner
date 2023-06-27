

/* МИФЫ, НАСЛЕДОВАНИЕ, ПОЛИМОРФИЗМ, АБСТРАКЦИИ, НАСЛЕДОВАНИЕ - https://www.youtube.com/watch?v=ZmH262CgLsM&list=PLM7wFzahDYnHyRpmcSGOptXan08CNb9nh&index=3 */


/* ООП - это всего лишь инструмент, который нужно использовать только в проектах, где он нужен, а не всегда и везде. */

/* ООП появилось, т.к программы стали гораздо сложнее, а модульность использовать довольно трудно.
Неправильное ООП гораздно хуже неправильного процедурного программирования. */

/* Процесс ООП происходит так: абстрогируем ненужное, и оставляем только нужное, т.е создаём модель. 
Оставленные важные параметры в будущем станут свойствами.
Потом нужно выявлять, какие действия можно выполнять с этой моделью, т.е закладываем основы методов. 
Пример модели пользователя: user(username, password, email). И методы этой модели: login(), logout(). 
Разработка модели (абстракции) очень важная составляющая ООП, 
и если она построена не правильно или переданы неправильные свойства/методы, то весь код придеться рефакторить. */

/* Наследование, это можно сказать расширение. 
Например, у нас есть модель admin, который имеет всё тоже самое, что и user, но ещё некоторые свои функции. 
И тогда admin будет наследовать все методы, свойства у user, но и иметь некоторое своё. 
Т.е он расширяет функционал модели user. */

/* ООП строиться на правильном понимании модели с чем вы работаете. */

/* Полиморфизм в ООП, это когда один и тот же метод/свойство под одним и тем же именем будет меняться в зависимости от сущности.
Например, у нас есть метод getCourses() у модели user и от этой модели наследуется модель admin, которая наследует и метод getCourses().
Поэтому, мы можем перезаписать метод getCourses() в модели admin и она будет работать по-своему только в этой модели. */

/* Инкапсуляция в ООП это скрытие реализации какой-либо задачи в JavaScript коде не из вредности, а с целью защиты части кода от пользователя или программиста.
Например, у нас есть модель course и у него свойство price. 
И мы можем инкапсулировать свойство price, 
для того чтобы какой-нибудь случайный программист не смог его как-либо изменить, а то это поломает всю экономику сайта.
Программист имеет возможность просматривать инкапсулированное свойство/метод, но не использовать его. */


/* ОБЪЕКТЫ, ПРОТОТИПЫ, НАСЛЕДОВАНИЕ - https://www.youtube.com/watch?v=rWfZAeEnn2I&list=PLM7wFzahDYnHyRpmcSGOptXan08CNb9nh&index=3 */


/* Прототип - это JS объект, от которого другие объекты наследуют его свойства и методы. Проще говоря, это родитель. */
let a = {
  text: "hello",
  num: 1,
  show: function () {
    console.log(this.color); /* this работает так, что в объекте a, она выведет свойство color объекта a,
                                а в объекте b, она выведет свойство color объекта b. */
  },
  //__proto__: c - так делать нельзя, т.к случиться рекурсия цепочки прототипов и выдасться ошибку.
}

// Чтобы задать объекту прототип используется свойство __proto__.
let b = {
  color: "red",
  /* Прототипом объекта b будет объект a, и поэтому объект b унаследует все свойства и методы объекта a. 
  Но все эти свойства и методы будут записаны не в самом объекте b, а в его свойстве __proto__. 
  Но всё равно, через объект b теперь можно будет обращаться к этим свойствам и методам объекта a. */
  __proto__: a
}

/* Объект b теперь может обращаться к свойству text (свойству объекта a) и изменять его.
Но измениться это свойство только для объекта b, а не для объекта a. */
b.text = "Изменил свойство b.";

//b = 5 - Если кардинально изменить тип данных прототипа, то и объект c ничего и не унаследует от объекта b. Прототипом может выступать только объект.

let c = {
  font: "bold",
  /* Прототипом объекта c будет объект b, и поэтому объект c унаследует все свойства и методы объекта b,
  но т.к объект b наследовался от объекта a, то у объекта c будут и все свойства/методы объекта a. 
  Данная схема называется цепочкой прототипов. */
  __proto__: b
}

console.log(c.hasOwnProperty("font")); // Метод hasOwnProperty() выдаёт логическое значение, есть ли переданное свойство в объекте.

/* Так как в файле index.html мы подключили файл user.js раньше, чем OOP.js,
то в файле OOP.js мы можем управлять всеми объектами и тд, что есть в user.js.
Разделение различных функция программы на разные файлы - довольно удобный подход. */
user.password = 'password';
console.log(user.validatePassword()); // Вёрнет true.
console.log(test); // Вернёт "testgggg".
let user_profile = {
  username: "",
  __proto__: user // Также, объект из другого файла мы можем использовать, в качестве прототипа для объекта.
}


/* КЛАССЫ, СВОЙСТВА, МЕТОДЫ - https://www.youtube.com/watch?v=qjl1nZlW9q8&list=PLM7wFzahDYnHyRpmcSGOptXan08CNb9nh&index=4 */


// К коду данного урока также относяться файлы "Person.js", "Student.js".

let username = 'ivan';
let password = "3232";

/* Объект класса обычно создаётся с помощью const.
После объявления константы, присваиваем ей класс с помощью ключевого слова new.
В класс, в качестве параметров передаём параметры, которые передали в метод constructor() при создании класса. 
В данном объекте, в свойстве __proto__ будет указан класс, с помощью которого, он был создан. */
const person = new Person(username, password);
console.log(person.validatePassword());

/* Одно из главных возможностей ООП - это красивое деление на модули.
Поэтому, стоит разные классы держать в разных файлах,
имена которых начинаются с большой буквы. В этих файлах должны находиться только сами классы. */
const testStudent = new Student(); // Так как ничего не было передано, то все значения свойств будут равны undefined.
const student = new Student(username, password, "Nick");
/* Так как класс Student наследуется от класса Person, 
то объект класса Student может использовать все свойства и методы класса Person. */
student.print();


/* НАСЛЕДОВАНИЕ, КЛАССЫ, SUPER, КОНСТРУКТОР - https://www.youtube.com/watch?v=JWwSH92tq7E&list=PLM7wFzahDYnHyRpmcSGOptXan08CNb9nh&index=5 */


// Если вызвать функцию через console.log(), которая просто выводит текст, но ничего не возвращает, то выведеться undefined.
console.log(student.print());

// Также, вполне можно вызвать функцию, в которой будут только методы без свойств и constructor().
class Person2 {
  print() {
    console.log("person")
  }
}

const person2 = new Person2();
person2.print();

class Person3 extends Person2 {
  constructor(name) {
    super(); // super() должен быть вызван в любом случае, если класс от кого на наследуется.
    this.name = name;
  }
}

const person3 = new Person3('nick');


/* GET, SET JAVASCRIPT, ПРИВАТНЫЕ И ЗАЩИЩЕННЫЕ СВОЙСТВА - https://www.youtube.com/watch?v=6KvItbbzi-g&list=PLM7wFzahDYnHyRpmcSGOptXan08CNb9nh&index=6 */


