/* Функционал захода пользователя в аккаунт */
const login__button = document.getElementById("login__button");
const login__email = document.getElementById("login__email");
const login__password = document.getElementById("login__password");

let loginUser = async function () {
    let responseRequest = await fetch('api/login-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: login__email.value, password: login__password.value })
    });

    if (responseRequest.ok) { // если HTTP-статус в диапазоне 200-299
        window.location.href = '/';
    } else {
        console.log(`Ошибка создания ${responseRequest.status}: ${responseRequest.statusText}`);
    }
}
eventsObj.addEvent(login__button, "click", loginUser);


/* Функционал скрытия пароля */
const password_eye = document.getElementById("password__eye");

password_eye.addEventListener("click", function () {
    this.classList.toggle("close");
    setTimeout(() => {
        login__password.type = login__password.type === "password" ? "text" : "password";
    }, 125);
});