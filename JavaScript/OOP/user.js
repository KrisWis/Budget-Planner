/* Файл для OOP.js. */
let user = {
  login: "",
  password: "",
  validatePassword: function () {
    if (this.password.length > 6) {
      return true;
    } else {
      return false;
    }
  }
}

let test = "testgggg";
console.log(c.font); // Мы можем использовать объекты из OOP.js.