/* Проверка ввода данных */
let login__name = document.getElementById("login__name");
let login__email = document.getElementById("login__email");
let login__password = document.getElementById("login__password");
let login__confirm_password = document.getElementById("login__confirm_password");
let login__confirmation_code = document.getElementById("login__confirmation_code");

let offer__checkbox = document.getElementById("offer__checkbox");
let access__checkbox = document.getElementById("access__checkbox");
let agree__checkbox = document.getElementById("agree__checkbox");
let privacy__checkbox = document.getElementById("privacy__checkbox");
let agreement__checkbox = document.getElementById("agreement__checkbox");
let rules__checkbox = document.getElementById("rules__checkbox");

let offer__checkbox__check = document.getElementById("offer__checkbox__check");
let access__checkbox__check = document.getElementById("access__checkbox__check");
let agree__checkbox__check = document.getElementById("agree__checkbox__check");
let privacy__checkbox__check = document.getElementById("privacy__checkbox__check");
let agreement__checkbox__check = document.getElementById("agreement__checkbox__check");
let rules__checkbox__check = document.getElementById("rules__checkbox__check");
let recaptcha__check = document.getElementById("recaptcha__check");
let password__check_length = document.getElementById("password__check_length");
let password__check_data = document.getElementById("password__check_data");
let password__check = document.getElementById("password__check");
let confirm_password__check = document.getElementById("confirm_password__check");
let confirmation_code__check = document.getElementById("confirmation_code__check");
let name__check = document.getElementById("name__check");
let email__check = document.getElementById("email__check");
let confirmation_code__rightly = document.getElementById("confirmation_code__rightly");

let reg__button = document.getElementById("reg__button");

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

    if (login__confirmation_code.value != code) {
        confirmation_code__rightly.classList.add("confirmation_code__rightly--active");
        error = true;
    }

    for (const element of checkboxes) {
        if (!element.checked) {
            checkboxes__check[checkboxes.indexOf(element)].classList.add("checkbox__check--active");
            error = true;
        }
    }

    if (error === false) {
        const bcrypt = require('bcrypt');
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(myPlaintextPassword, salt);
        let data = { name: login__name.value, email: login__email.value, password: hash }
        let responseRequest = await fetch('api/create-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (responseRequest.ok) { // если HTTP-статус в диапазоне 200-299
            comments_arr = await responseRequest.json();
            if (comments_arr.length > 0) {
                comments__none.classList.add("inactive")
                comments_arr.forEach(comment => {
                    comments.insertAdjacentHTML(`beforeend`,
                        comment
                    );
                });

                delete_comment();
            }
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
let get_code = document.getElementById("get_code");
let code = 0;
let sendCode = async function () {
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
        let get_code__modal_wrapper = document.getElementById("get_code__modal-wrapper");
        get_code__modal_wrapper.classList.add('get_code__modal-wrapper--active');
        setTimeout(() => {
            get_code__modal_wrapper.classList.remove('get_code__modal-wrapper--active');
        }, 1000);
        $("body").css("cursor", "default");
    } else {
        console.log(`Ошибка создания ${responseRequest.status}: ${responseRequest.statusText}`);
    }
}
eventsObj.addEvent(get_code, "click", sendCode);