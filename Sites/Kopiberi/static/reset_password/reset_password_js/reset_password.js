/* Функционал скрытия пароля */
const eyes = document.querySelectorAll(".password .password__eye");
const passwords = [login__password, login__confirm_password];

for (let index = 0; index < eyes.length; index++) {
    eyes[index].addEventListener("click", function () {
        this.classList.toggle("close");
        setTimeout(() => {
            passwords[index].type = passwords[index].type === "password" ? "text" : "password";
        }, 125);
    });
}

/* Проверка ввода данных */
const reset_password__button = document.getElementById("reset_password__button");
let checkData = async function () {
    let error = false;

    if (login__password.value) {
        if (login__password.value.length < 8) {
            password__check_length.classList.add("password__check_length--active");
            error = true;
        }
        if (!/(?=.*\d)(?=.*[A-Z])/i.test(login__password.value)) {
            password__check_data.classList.add("password__check_data--active");
            error = true;
        }

        let responseRequest = await fetch('api/check-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: login__email.value, password: login__password.value })
        });

        if (responseRequest.ok) { // если HTTP-статус в диапазоне 200-299
            response = await responseRequest.json();
            if (response["Passwords_equal"] == true) {
                old_password__check.classList.add("old_password__check--active");
                error = true;
            }
        } else {
            console.log(`Ошибка создания ${responseRequest.status}: ${responseRequest.statusText}`);
        }

    } else {
        password__check.classList.add("password__check--active");
        error = true;
    }

    if (login__confirm_password.value !== login__password.value) {
        confirm_password__check.classList.add("confirm_password__check--active");
        error = true;
    }

    if (!login__email.value) {
        email__check.classList.add("email__check--active");
        error = true;
    }

    if (error == false) {
        let responseRequest = await fetch('api/update-user-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: login__email.value, password: login__password.value })
        });

        if (responseRequest.ok) { // если HTTP-статус в диапазоне 200-299
            window.location.href = '/profile';
        } else {
            console.log(`Ошибка создания ${responseRequest.status}: ${responseRequest.statusText}`);
        }
    }
}

eventsObj.addEvent(reset_password__button, "click", checkData);

/* Функционал того, чтобы ошибки убирались, когда пользователь начинает вводить что-то в текстовые поля. */
let checkInputs = function () {
    if (this === login__password) {
        password__check.classList.remove("password__check--active");
        password__check_length.classList.remove("password__check_length--active");
        password__check_data.classList.remove("password__check_data--active");
        old_password__check.classList.remove("old_password__check--active");

    } else if (this === login__confirm_password) {
        confirm_password__check.classList.remove("confirm_password__check--active");
    } else if (this === login__email) {
        email__check.classList.remove("email__check--active");
    }
}

for (const element of [login__email, login__password, login__confirm_password]) {
    eventsObj.addEvent(element, 'input', checkInputs)
}