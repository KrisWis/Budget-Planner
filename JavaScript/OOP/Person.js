// Файл, созданный специально для класса всегда называется с большой буквы.

class Person {
  /* Метод constructor() обязателен в классе и нужен для инициализации переменных внутри класса и свойств объекта класса.
  Он запускается всегда, сразу при создание объекта класса.
  Передаём в эту функцию то, что будем передавать в качестве параметров во время создания класса. */
  constructor(username, password) {
    /* И следующим образом инициализируем каждую переменную.
    this здесь обращается к объекту, созданном на основе данного класса. */
    this.username = username;
    this.password = password;
  }

  // Внутри класса можно объявлять методы, в которых можно использовать свойства, объявленные ранее уже без this.
  validatePassword() {
    if (password.length < 6) {
      return true;
    } else {
      return false;
    }
  }

  print() {
    console.log("person")
  }
}