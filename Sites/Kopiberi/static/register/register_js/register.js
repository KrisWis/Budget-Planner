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

let reg__button = document.getElementById("reg__button");

let checkboxes = [offer__checkbox, access__checkbox, agree__checkbox, privacy__checkbox, agreement__checkbox, rules__checkbox];
let checkboxes__check = [offer__checkbox__check, access__checkbox__check, agree__checkbox__check, privacy__checkbox__check, agreement__checkbox__check, rules__checkbox__check];

let recaptchaCheck = false;
function recaptchaChecking() {
    recaptchaCheck = true;
};

let checkData = function () {

    let error = false;

    if (login__password.value) {
        if (login__password.value.length < 8) {
            document.getElementById("password__check_length").classList.add("password__check_length--active");
            error = true;
        }
        if (!/(?=.*\d)(?=.*[A-Z])/i.test(login__password.value)) {
            document.getElementById("password__check_data").classList.add("password__check_data--active");
            error = true;
        }
    } else {
        document.getElementById("password__check").classList.add("password__check--active");
        error = true;
    }
    if (login__confirm_password.value !== login__password.value) {
        document.getElementById("confirm_password__check").classList.add("confirm_password__check--active");
        error = true;
    }
    if (!login__confirmation_code.value) {
        document.getElementById("confirmation_code__check").classList.add("confirmation_code__check--active");
        error = true;
    }
    if (!login__name.value) {
        document.getElementById("name__check").classList.add("name__check--active");
        error = true;
    }

    if (!login__email.value) {
        document.getElementById("email__check").classList.add("email__check--active");
        error = true;
    }

    for (const element of checkboxes) {
        if (!element.checked) {
            checkboxes__check[checkboxes.indexOf(element)].classList.add("checkbox__check--active");
            error = true;
        }
    }

    if (error === false && recaptchaCheck) {
        console.log("Вы зарегистрированы!")
        // Код для отправки данных на бекенд для регистрации.
    }
}

let checkInputs = function () {
    if (this === login__password) {
        document.getElementById("password__check").classList.remove("password__check--active");
        document.getElementById("password__check_length").classList.remove("password__check_length--active");
        document.getElementById("password__check_data").classList.remove("password__check_data--active");

    } else if (this === login__confirm_password) {
        document.getElementById("confirm_password__check").classList.remove("confirm_password__check--active");

    } else if (this === login__confirmation_code) {
        document.getElementById("confirmation_code__check").classList.remove("confirmation_code__check--active");

    } else if (this === login__name) {
        document.getElementById("name__check").classList.remove("name__check--active");

    } else if (this === login__email) {
        document.getElementById("email__check").classList.remove("email__check--active");
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