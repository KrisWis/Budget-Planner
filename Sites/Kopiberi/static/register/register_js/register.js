/* Проверка ввода данных */
const login__name = document.getElementById("login__name");
const login__email = document.getElementById("login__email");
const login__password = document.getElementById("login__password");
const login__confirm_password = document.getElementById("login__confirm_password");
const login__confirmation_code = document.getElementById("login__confirmation_code");

const offer__checkbox = document.getElementById("offer__checkbox");
const access__checkbox = document.getElementById("access__checkbox");
const agree__checkbox = document.getElementById("agree__checkbox");
const privacy__checkbox = document.getElementById("privacy__checkbox");
const agreement__checkbox = document.getElementById("agreement__checkbox");
const rules__checkbox = document.getElementById("rules__checkbox");

const offer__checkbox__check = document.getElementById("offer__checkbox__check");
const access__checkbox__check = document.getElementById("access__checkbox__check");
const agree__checkbox__check = document.getElementById("agree__checkbox__check");
const privacy__checkbox__check = document.getElementById("privacy__checkbox__check");
const agreement__checkbox__check = document.getElementById("agreement__checkbox__check");
const rules__checkbox__check = document.getElementById("rules__checkbox__check");
const recaptcha__check = document.getElementById("recaptcha__check");
const password__check_length = document.getElementById("password__check_length");
const password__check_data = document.getElementById("password__check_data");
const password__check = document.getElementById("password__check");
const confirm_password__check = document.getElementById("confirm_password__check");
const confirmation_code__check = document.getElementById("confirmation_code__check");
const name__check = document.getElementById("name__check");
const email__check = document.getElementById("email__check");
const confirmation_code__rightly = document.getElementById("confirmation_code__rightly");

const reg__button = document.getElementById("reg__button");

let checkboxes = [offer__checkbox, access__checkbox, agree__checkbox, privacy__checkbox, agreement__checkbox, rules__checkbox];
let checkboxes__check = [offer__checkbox__check, access__checkbox__check, agree__checkbox__check, privacy__checkbox__check, agreement__checkbox__check, rules__checkbox__check];

let recaptchaCheck = false;
function recaptchaChecking() {
    recaptcha__check.classList.remove("recaptcha__check--active");
    recaptchaCheck = true;
};

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
    } else {
        password__check.classList.add("password__check--active");
        error = true;
    }

    if (login__confirm_password.value !== login__password.value) {
        confirm_password__check.classList.add("confirm_password__check--active");
        error = true;
    }

    if (!login__confirmation_code.value) {
        confirmation_code__check.classList.add("confirmation_code__check--active");
        error = true;
    } else if (login__confirmation_code.value != code) {
        confirmation_code__rightly.classList.add("confirmation_code__rightly--active");
        error = true;
    }

    if (!login__name.value) {
        name__check.classList.add("name__check--active");
        error = true;
    }

    if (!login__email.value) {
        email__check.classList.add("email__check--active");
        error = true;
    }

    if (!recaptchaCheck) {
        recaptcha__check.classList.add("recaptcha__check--active");
        error = true;
    }

    for (const element of checkboxes) {
        if (!element.checked) {
            checkboxes__check[checkboxes.indexOf(element)].classList.add("checkbox__check--active");
            error = true;
        }
    }

    if (error === false) {
        let responseRequest = await fetch('api/register-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: login__name.value, email: login__email.value, password: login__password.value })
        });

        if (responseRequest.ok) { // если HTTP-статус в диапазоне 200-299

        } else {
            console.log(`Ошибка создания ${responseRequest.status}: ${responseRequest.statusText}`);
        }
        // Код для отправки данных на бекенд для регистрации.
    }
}

let checkInputs = function () {
    if (this === login__password) {
        password__check.classList.remove("password__check--active");
        password__check_length.classList.remove("password__check_length--active");
        password__check_data.classList.remove("password__check_data--active");

    } else if (this === login__confirm_password) {
        confirm_password__check.classList.remove("confirm_password__check--active");

    } else if (this === login__confirmation_code) {
        confirmation_code__check.classList.remove("confirmation_code__check--active");
        confirmation_code__rightly.classList.remove("confirmation_code__rightly--active");

    } else if (this === login__name) {
        name__check.classList.remove("name__check--active");

    } else if (this === login__email) {
        email__check.classList.remove("email__check--active");
    }
}

for (const element of [login__name, login__email, login__password, login__confirm_password, login__confirmation_code]) {
    eventsObj.addEvent(element, 'input', checkInputs)
}

checkboxes.forEach(function (element) {
    eventsObj.addEvent(element, 'change', function () {
        if (this.checked) {
            checkboxes__check[checkboxes.indexOf(element)].classList.remove("checkbox__check--active");
        }
    })
})

eventsObj.addEvent(reg__button, "click", checkData);

/* Отправка кода на почту */
const get_code = document.getElementById("get_code");
let code = 0;
let sendCode = async function () {
    if (this == get_code) {
        $("body").css("cursor", "progress");

        let user_email = login__email.value;
        let username = login__name.value;
        let responseRequest = await fetch('api/send-letter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: user_email, username: username })
        })

        if (responseRequest.ok) { // если HTTP-статус в диапазоне 200-299
            code = await responseRequest.json();
            code = code["code"];
            const get_code__modal_wrapper = document.getElementById("get_code__modal-wrapper");
            get_code__modal_wrapper.classList.add('get_code__modal-wrapper--active');
            setTimeout(() => {
                get_code__modal_wrapper.classList.remove('get_code__modal-wrapper--active');
            }, 1000);
            $("body").css("cursor", "default");
        } else {
            console.log(`Ошибка создания ${responseRequest.status}: ${responseRequest.statusText}`);
        }
    }
}
eventsObj.addEvent(get_code, "click", sendCode);

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