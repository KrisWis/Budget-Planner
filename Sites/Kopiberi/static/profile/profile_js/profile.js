/* Функционал захода пользователя в аккаунт и проверки данных. */
const login__button = document.getElementById("login__button");
const login__email = document.getElementById("login__email");
const login__password = document.getElementById("login__password");
const password__check = document.getElementById("password__check");
const email__check = document.getElementById("email__check");

let loginUser = async function () {
    let remember__checkbox = document.getElementById("remember__checkbox");
    let responseRequest = await fetch('api/login-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: login__email.value, password: login__password.value, remember: remember__checkbox.checked })
    });

    if (responseRequest.ok) { // если HTTP-статус в диапазоне 200-299
        response = await responseRequest.json();
        if (response["EmailError"] == false) {
            if (response["PasswordError"] == false) {
                window.location.href = '/';
            } else {
                password__check.classList.add("password__check--active");
            }
        } else {
            email__check.classList.add("email__check--active");
        }
    } else {
        console.log(`Ошибка создания ${responseRequest.status}: ${responseRequest.statusText}`);
    }
}
eventsObj.addEvent(login__button, "click", loginUser);

/* Функционал того, чтобы ошибки убирались, когда пользователь начинает вводить что-то в текстовые поля. */
let checkInputs = function () {
    if (this === login__password) {
        password__check.classList.remove("password__check--active");

    } else if (this === login__email) {
        email__check.classList.remove("email__check--active");
    }
}

for (const element of [login__password, login__email]) {
    eventsObj.addEvent(element, 'input', checkInputs)
}

/* Функционал скрытия пароля */
const password_eye = document.getElementById("password__eye");

password_eye.addEventListener("click", function () {
    this.classList.toggle("close");
    setTimeout(() => {
        login__password.type = login__password.type === "password" ? "text" : "password";
    }, 125);
});