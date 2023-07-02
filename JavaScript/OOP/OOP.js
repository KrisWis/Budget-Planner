

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


class Person4 {
  constructor(name) {
    /* Если название свойства начинается с нижнего подчёркивания, то свойство является защищённым.
    JavaScript не будет выдавать никакой ошибки или предупреждения и программист может работать с таким свойством, но
    ему это делать не рекомендуется, т.к прошлый программист "пометил", что к этому свойству обращаться нельзя. */
    this._name = name;
  }
}

class Person5 {
  constructor() {
  }

  /* Сеттеры и геттеры используются для защищённых свойств.
  Они используются, если программист может как то "накосячить" при вводе этих свойств при создании экземпляра класса. */

  /* Пример работы сеттера. 
  Сеттеры нужны для того, чтобы обрабатывать входные данные.
  Т.е те параметры, которые передаются в класс при создании экзампляра класса.
  В constructor() этого делать нельзя, поэтому нужно создавать отдельнии функции.
  Название сеттера создаётся с помощью ключевого слова set и названия свойства, которое мы хотим обработать. */
  set name(name) {
    // Мы обрабатываем входной параметр name, убирая пробельные символы и приводя его к нижнему регистру.
    /* Но имя свойства после this не должно быть таким же, как имя сеттера (не name). 
    Но это не отменяет того факта, что свойство _name менять программисту крайне не желательно. */
    this._name = name.trim().toLowerCase(); // Метод trim() удаляет пробельные символы с начала и конца строки. 
  }

  /* Пример работы геттера.
  Название геттера создаётся с помощью ключевого слово get и названия свойства, которое мы хотим обработать. */
  get name() {
    return this._name; // Возвращаем нужное свойство.
  }

  /* Приватные методы и свойства - это те методы и свойства, которые доступны только внутри класса.
  Они объявляются с помощью "#". */
  #test = "test"; // К данному свойству нельзя обратиться вне класса.
  #testFunc() { // К данному методу нельзя обратиться вне класса.
    console.log("test");
  }

  testing() {
    /* Для обращения к приватным свойствам и методам нужно использовать this. */
    console.log(this.#test);
    this.#testFunc();
  }

}

const person5 = new Person5(); // Ничего не передаём, т.к в constructor() мы ничего не делаем.
person5.name = "     ALEX"; // С помощью сеттера присваиваем свойству значение.
console.log(person5.name); // Применяем геттер, чтобы вернуть свойство.

class Person6 extends Person5 {
  constructor() {
    super();
  }

  test2() {
    // Наследуемый класс не может использовать приватные свойства и методы родительского класса.
    //console.log(this.#test)
    //this.#testFunc();
  }
}
const person6 = new Person6();
//console.log(person6.#test); // Наследуемый класс также не может использовать приватные свойства.


/* СТАТИЧЕСКИЕ МЕТОДЫ И СВОЙСТВА - https://www.youtube.com/watch?v=yOIbvm48S4A&list=PLM7wFzahDYnHyRpmcSGOptXan08CNb9nh&index=7 */


/* Статические методы - это методы, которые прописаны в классе, как и обычные методы, но
их можно вызвать без создания экземпляра класса. 
Они полезны, когда мы знаем почту, id и тд пользователя, н
о создавать новый экзампляр класса нам не нужно, т.к нам хватит и тех данных о нём, которые у нас есть.
По факту, статические методы можно заменить просто функциями вне класса, но
для тех кто пишет чисто ООП код, то они будут крайне полезны.

Когда методы и свойства не привязаны к конкретному экземпляру классу, а привязаны ко всем сущностям класса,
то намного лучше будет сделать их статическими. */
class Person7 {
  constructor() { }

  // Статические методы создаются с помощью ключевого слова static.
  static getRole(email) {
    let roles = {
      "my@email": "admin"
    }
    return roles[email];
  }

  // Статические свойства тоже создаются с помощью ключевого слова static.
  static user_var = "test";
}

/* Статические методы и свойства вызываются просто, обратившись к классу. 
К обычным методам и свойствам так обратиться нельзя, к ним - только с помощью экземпляра класса.
С помощью экземпляра класса нельзя обратиться к статическим методам и свойствам. */
console.log(Person7.getRole("my@email"));
console.log(Person7.user_var);

class Person8 extends Person7 {
  constructor() {
    super();
  }
  static user_var = false; // Перезаписываем статическую переменную из родительского класса.
}

// Статические методы и свойства спокойно наследуются.
console.log(Person8.getRole("my@email"));
console.log(Person8.user_var);


/* THIS - https://www.youtube.com/watch?v=9_qHG3dKfaw&list=PLM7wFzahDYnHyRpmcSGOptXan08CNb9nh&index=8 */


// Если просто вывести this, то выведеться объект Window.
console.log(this);

// Если вывести this при срабатывании события, то выведеться элемент, на который ПОВЕШЕН обработчик, а не на который он сработал.
function testttt() {
  console.log(this);
}
document.onclick = testttt;
// Тоже выведет элемент, на который повешен обработчик.
document.getElementById("test").addEventListener('click', testttt);

// Если использовать this в стрелочных функциях, то всегда будет выводить объект Window.
document.onclick = () => {
  console.log(this);
};

class Person9 {
  constructor(model) {
    // this в классе указывает на экземпляр созданного класса.
    this.model = model;
  }
  showThis() {
    // Выведет экземпляр класса, который и вызвал данный метод.
    console.log(this);
  }
}

const person9 = new Person9("модель");
person9.showThis();

class Person10 extends Person9 {
  constructor(model, color) {
    super(model);
    this.color = color;
    // Выведет модель экземпляра текущего класса, а не его родителя.
    console.log(this.model); // Выведет "модель10".
  }
}

const person10 = new Person10("модель10", 'красный');


/* BIND, CALL, APPLY - https://www.youtube.com/watch?v=CJ6Txj8leZQ&list=PLM7wFzahDYnHyRpmcSGOptXan08CNb9nh&index=11 */


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

/* Метод apply() работает точно также, как и call, просто аргументы функции передаются в квадратных скобках. */
test5.onclick = function () {
  test3.apply(test4, ['param1', 232])
}

/* Метод bind заранее делает функции нужный, переданный контекст выполнения и нужно сохранить её в новую переменную.
Эти функции не сработают, пока не будут вызваны, но в них заранее записан нужный контекст выполнения.
Данные функции можно использовать также, как и обычные, просто с нужным нам контекстом выполнения.
Параметры функции передаются также, как и в методе call(), через запятую. */
let testFunc1 = test3.bind(test4, 'param1', 232);
let testFunc2 = test3.bind(test5, 'param1', 232);

// При клике на test4 сработает функция testFunc2, где this равен test5.
test4.onclick = testFunc2;


/* ДЕЛАЕМ ВИДЖЕТ GRIDVIEW НА ООП - https://www.youtube.com/watch?v=8FjoHtHY2mQ&list=PLM7wFzahDYnHyRpmcSGOptXan08CNb9nh&index=11 и 
https://www.youtube.com/watch?v=IjoVIS7t9SQ&list=PLM7wFzahDYnHyRpmcSGOptXan08CNb9nh&index=12 */


class GridView {
  /* В начале класса, есть js.doc - это "описательный" язык.
  Будучи внедрённым в класс, он позволяет генерировать документацию.
  Писать его следует в комментариях, используя символы "*", как в примере.
  В нашем js.doc мы перечисляем различные свойства класса, поэтому задаём ему название "properties".
  Чтобы задать свойство нужно использовать медиафункцию @param, 
  а дальше в квадратных скобках передать тип свойство (в нашем случае массив), 
  дальше - название свойства, и потом через тире его описание.
  js.doc пишется примерно следующим образом: */
  /**
   * properties
   * @param [array] _tableClass - css классы, оформление.
   * @param [array] data - входные данные.
   * @param [array] _attribute - что именно выводим из входных данных.
   * @param [array] _element - где в HTML-разметке выводить таблицу.
   * @param [array] _header - заголовок таблицы.
   * @param [array] _headerClass - css классы заголовка таблицы.
   */

  // Конструктор, который просто задаёт свойствам значения по-умолчанию.
  constructor() {
    this._header = '';
    this._headerClass = [];
    this._tableClass = [];
    this._element = 'body';
    this._attribute = [];
  }

  // Следущие 4 метода - это сеттеры хедера и его классов, и то, где в HTML-разметке мы будем выводить таблицу, классов таблицы.

  /**
   * Method set header
   */
  set header(header) {
    // Проверяем входные данные.
    if (typeof header === 'string' && header.trim != '') {
      this._header = header.trim();
      return true;
    }

    return false;
  }

  /**
   * Method set headerClass
   */
  set headerClass(headerClass) {
    // Проверяем входные данные.
    if (typeof headerClass === 'object') {
      this._headerClass = headerClass;
      return true;
    }

    return false;
  }

  /**
   * Method set tableClass
   */
  set tableClass(tableClass) {
    // Проверяем входные данные.
    if (typeof tableClass === 'object') {
      this._tableClass = tableClass;
      return true;
    }

    return false;
  }


  /**
   * Method set element
   */
  set element(element) {
    // Проверяем входные данные на то, существует ли элемент в разметке.
    if (document.querySelector(element)) {
      this._element = document.querySelector(element);
      return true;
    }

    return false;
  }

  /**
   * Method for show GridViewTable.
   */
  render() {
    // Создаём заголовок таблицы и для начала, проверяем его наличие.
    if (this._header) {
      const header = document.createElement("h1");
      header.textContent = this._header; // Присваиваем элементу текст
      this._headerClass.forEach(cssClass => { // Перебирая, присваиваем все переданные css классы элементу.
        header.classList.add(cssClass);
      });
      document.querySelector(this._element).append(header); // Отрисовываем элемент в нужном элементе.
    }

    // Создаём таблицу
    const table = document.createElement("table");
    this._tableClass.forEach(cssClass => { // Перебирая, присваиваем все переданные css классы элементу.
      table.classList.add(cssClass);
    });

    // Создаём заголовок столбца
    let trHeader = document.createElement("tr");
    for (let key in this._attribute) { // Перебираем все ключи из объекта атрибутов.
      let th = document.createElement("th");
      if (this._attribute[key].label) { // В свойстве label обычно у каждого ключа храниться название соответствующего столбца.
        th.textContent = this._attribute[key].label; // Если оно есть, то присваиваем его, как название столбца.
      }
      else {
        th.textContent = key; // Если его нет, то названием столбца будет ключ.
      }
      trHeader.append(th); // Добавляем наш элемент в заголовки таблицы.
    }
    table.append(trHeader); // Добавляем заголовки таблицы в таблицу.

    // Рисуем данные таблицы
    for (let i = 0; i < this.data.length; i++) { // Перебираем все объекты переданных данных.
      let dataArr = this.data[i]; // Объект данных.
      let tr = document.createElement('tr');
      for (let key in this._attribute) { // Перебираем все ключи атрибутов.
        let td = document.createElement('td');
        let value = dataArr[key]; // Так ключи атрибутов и входных данных у нас одинаковые, то мы можем их так использовать.
        if (this._attribute[key].value) { // Если имеется свойство value.
          value = this._attribute[key].value(dataArr); // value у нас является функцией, поэтому передаём ему необходимые данные.
        }

        if (this._attribute[key].src) { // Если имеется свойство src.
          td.innerHTML = value; // Вставляем в HTML код значение.
        }

        else { // Если нужно вставить просто текст, а не html-код..
          td.textContent = value;
        }
        tr.append(td); // Добавляем значения в столбец.
      }
      table.append(tr); // Добавляем столбец в таблицу.
    }
    document.querySelector(this._element).append(table); // Добавляем таблицу в документ.
  }
}

/* Пример данных, которые могут прийти с backend.
Обычно, это объекты в квадратных скобках. */
const dataExample = [
  {
    company: "aboba1 <b>Example</b>", // Пример входных данных с html тегами.
    chef: 'maria1',
    country: 'germany1'
  },

  {
    company: "aboba2",
    chef: 'maria2',
    country: 'germany2'
  },

  {
    company: "aboba3",
    chef: 'maria3',
    country: 'germany3'
  },

  {
    company: "aboba4",
    chef: 'maria4',
    country: 'germany4'
  },

  {
    company: "aboba5",
    chef: 'maria5',
    country: 'germany5'
  },
]

let gridView = new GridView(); // Создаём экземпляр класса GridView.
gridView.header = 'Заголовок'; // Присваиваем заголовок таблицы.
gridView.headerClass = ['header', 'site-header']; // Присваиваем классы для заголовка.
gridView.tableClass = ['myTable']; // Присваиваем классы для таблицы.
gridView._attribute = { // Присваиваем атрибуты.
  company: {
    label: 'Компания',
    src: 'html'
  },

  chef: {
    label: 'Директор'
  },

  country: {
    label: 'Страна',
    value: (data) => {
      if (data['country'] === 'germany2') {
        return data['country'] + 'map';
      }
      return data['country'];
    }
  }
}
gridView.data = dataExample; // Присваиваем данные.
gridView.render(); // Отрисовываем таблицу.

/* Иногда, лучше использовать не сеттеры, а функции, когда нужна именно проверка и возвращение каких либо результатов, например:
не set name(), а setName(), который уже будет нормально возвращать true или false.
Т.е чаще всего, сеттеры нужно заменить функцией, если эта функция должна и присваивать значение и возвращать что-либо (чаще всего true или false). */


// Немного переделанный класс GridView под удобство программисту.
class GridView2 {
  /**
   * properties
   * @param [array] _tableClass - css классы, оформление.
   * @param [array] data - входные данные.
   * @param [array] _attribute - что именно выводим из входных данных.
   * @param [array] _element - где в HTML-разметке выводить таблицу.
   * @param [array] _header - заголовок таблицы.
   * @param [array] _headerClass - css классы заголовка таблицы.
   */

  constructor() {
    this._header = '';
    this._headerClass = [];
    this._tableClass = [];
    this._element = 'body';
    this._attribute = [];
  }

  // Следущие 4 функции - это теперь методы, а не сетторы.

  /**
   * Method setHeader
   */
  setHeader(header) {
    if (typeof header === 'string' && header.trim != '') {
      this._header = header.trim();
      return true;
    }

    return false;
  }

  /**
   * Method setHeaderClass
   */
  setHeaderClass(headerClass) {
    if (typeof headerClass === 'object') {
      this._headerClass = headerClass;
      return true;
    }

    return false;
  }

  /**
   * Method setTableClass
   */
  setTableClass(tableClass) {
    if (typeof tableClass === 'object') {
      this._tableClass = tableClass;
      return true;
    }

    return false;
  }


  /**
   * Method setElement
   */
  setElement(element) {
    if (document.querySelector(element)) {
      this._element = document.querySelector(element);
      return true;
    }

    return false;
  }

  /**
   * Method for show GridViewTable.
   */
  render(data) { // Теперь render() принимает объект data.
    // Присваиваем переменным значения из объекта data.
    this.setElement(data.element);
    this.setHeaderClass(data.headerClass);
    this.setTableClass(data.tableClass);
    this._attribute = data.attribute;
    this.setHeader(data.header);
    this.data = data.data;

    if (this._header) {
      const header = document.createElement("h1");
      header.textContent = this._header;
      this._headerClass.forEach(cssClass => {
        header.classList.add(cssClass);
      });
      document.querySelector(this._element).append(header);
    }

    const table = document.createElement("table");
    this._tableClass.forEach(cssClass => {
      table.classList.add(cssClass);
    });

    let trHeader = document.createElement("tr");
    for (let key in this._attribute) {
      let th = document.createElement("th");
      if (this._attribute[key].label) {
        th.textContent = this._attribute[key].label;
      }
      else {
        th.textContent = key;
      }
      trHeader.append(th);

      table.append(trHeader);
    }

    for (let i = 0; i < this.data.length; i++) {
      let dataArr = this.data[i];
      let tr = document.createElement('tr');
      for (let key in this._attribute) {
        let td = document.createElement('td');
        let value = dataArr[key];
        if (this._attribute[key].value) {
          value = this._attribute[key].value(dataArr);
        }

        if (this._attribute[key].src) {
          td.innerHTML = value;
        }

        else {
          td.textContent = value;
        }
        tr.append(td);
      }
      table.append(tr);
    }
    document.querySelector(this._element).append(table);
  }
}

let gridView2 = new GridView2();

const data = {
  header: 'Заголовок',
  headerClass: ['header', 'site-header'],
  tableClass: ['myTable'],
  attribute: {
    company: {
      label: 'Компания',
      src: 'html'
    },

    chef: {
      label: 'Директор'
    },

    country: {
      label: 'Страна',
      value: (data) => {
        if (data['country'] === 'germany2') {
          return data['country'] + 'map';
        }
        return data['country'];
      }
    }
  },

  data: dataExample,
}

gridView2.render(data); // Отрисовываем таблицу.


/* КОРЗИНА В ООП СТИЛЕ - https://www.youtube.com/watch?v=ar1p7PxzG8c&list=PLM7wFzahDYnHyRpmcSGOptXan08CNb9nh&index=13 */


