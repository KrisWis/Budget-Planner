// Добавление комментариев
let comments__submit = document.getElementById("comments__submit");
let comments = document.getElementById("comments");
let textarea = document.getElementById("comments__textarea");
let textarea__author = document.getElementById("comments__textarea--author");
let upload_photo = document.getElementById("comments_form__upload_photo");
let comments__none = document.getElementById("comments__none");

eventsObj.addEvent(comments__submit, "click", async function (e) {
    e.preventDefault();
    let comment__text = textarea.value;
    let comment__name = textarea__author.value;
    if (comment__text.length > 0 && comment__name.length > 0 && result !== undefined) {
        let comment__image = result;
        let today = new Date();
        today = String(today.getMonth() + 1).padStart(2, '0') + '.' + String(today.getDate()).padStart(2, '0') + '.' + String(today.getFullYear()).slice(-2);
        let responseRequest = await fetch('api/get-comments', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        responseRequest = await responseRequest.json();
        let comment__id = responseRequest.length + 1;
        let comment__request =
            `<div class="comment" id="comment__${comment__id}">
            <div class="comment__header">
                <div class="comment__author">
                    <img src="${comment__image}" alt="Изображение комментатора">
                    <h3>${comment__name}</h3>
                </div>
                <div class="comment__other">
                    <time class="comment__date">${today}</time>
                    <i id="comment__delete--${comment__id}" class="fa fa-trash comment__delete" aria-hidden="true"></i>
                </div>
            </div>
            <p class="comment__text">${comment__text}</p>
        </div>`;
        comments.insertAdjacentHTML(`beforeend`,
            comment__request
        );
        comments.scrollTop = comments.scrollHeight;
        textarea.value = "";
        comments__none.classList.add("inactive");
        await fetch('api/create-comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ comment: comment__request })
        });
        delete_comment();

    } else {
        function errorFunc(object, error__text, default__text, change__text = false) {
            object.setAttribute("placeholder", error__text);
            if (change__text) { object.textContent = error__text; }
            object.classList.add("error");
            let errorTimer = setTimeout(function () {
                object.classList.remove("error");
                object.setAttribute("placeholder", default__text);
                if (change__text) { object.textContent = default__text; }
            }, 3000);
            comments__submit.addEventListener("click", function () {
                clearTimeout(errorTimer);
            }, false);
        }
        if (comment__text.length == 0) {
            errorFunc(textarea, "Вы не можете отправить пустой текст!", "Введите текст..");
        }
        if (comment__name.length == 0) {
            errorFunc(textarea__author, "Введите ваше имя!", "Введите ваше имя..");
        }
        if (result === undefined) {
            let photo__wrapper = document.getElementById("photo__wrapper");
            errorFunc(photo__wrapper, "Загрузите фотографию!", "Ваше изображение профиля", true);
        }
    }
});

// Создание комментариев из бд
(async function () {
    let responseRequest = await fetch('api/get-comments', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
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
}());

// Удаление комментария
function delete_comment() {
    setTimeout(() => {

        let comments__delete = document.getElementsByClassName("comment__delete");

        for (let index = 0; index < comments__delete.length; index++) {
            eventsObj.addEvent(comments__delete[index], "click", async function () {
                let comment__id = comments__delete[index].id.slice(comments__delete[index].id.indexOf('--') + 2);
                let responseRequest = await fetch('api/delete-comment', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: comment__id })
                });

                if (responseRequest.ok) { // если HTTP-статус в диапазоне 200-299
                    let comment = document.getElementById(`comment__${comment__id}`);
                    comments.removeChild(comment);
                    let responseRequest = await fetch('api/get-comments', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    if (responseRequest.ok) { // если HTTP-статус в диапазоне 200-299
                        comments_arr = await responseRequest.json();
                        if (comments_arr.length == 0) {
                            comments__none.classList.remove("inactive")
                        }
                    }

                } else {
                    console.log(`Ошибка создания ${responseRequest.status}: ${responseRequest.statusText}`);
                }
            });
        }
    }, 1000);
}