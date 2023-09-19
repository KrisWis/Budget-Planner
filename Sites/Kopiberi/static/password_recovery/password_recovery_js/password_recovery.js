/* Отправка инструкции по восстановлению пароля на почту */
const recovery_password__button = document.getElementById("recovery_password__button");
let code;
let sendEmail = async function () {
    if (this == recovery_password__button) {
        if (login__email.value) {
            $("body").css("cursor", "progress");

            let user_email = login__email.value;
            let responseRequest = await fetch('api/send-letter-for-recovery-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: user_email })
            })

            if (responseRequest.ok) { // если HTTP-статус в диапазоне 200-299
                response = await responseRequest.json();
                if (response["OK"] == true) {
                    const recovery_password__modal_wrapper = document.getElementById("recovery_password__modal-wrapper");
                    recovery_password__modal_wrapper.classList.add('recovery_password__modal-wrapper--active');
                    setTimeout(() => {
                        recovery_password__modal_wrapper.classList.remove('recovery_password__modal-wrapper--active');
                        window.location.href = '/profile';
                    }, 1000);
                    $("body").css("cursor", "default");
                } else {
                    email__check.classList.add("email__check--active");
                }
            } else {
                console.log(`Ошибка создания ${responseRequest.status}: ${responseRequest.statusText}`);
            }
        } else {
            email__check.classList.add("email__check--active");
        }
    }
}
eventsObj.addEvent(recovery_password__button, "click", sendEmail);

/* Функционал того, чтобы ошибка убиралась, когда пользователь начинает вводить что-то в текстовое поле. */
const login__email = document.getElementById("login__email");
const email__check = document.getElementById("email__check");

eventsObj.addEvent(login__email, 'input', function () {
    email__check.classList.remove("email__check--active");
})