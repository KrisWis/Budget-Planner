// Добавление комментариев
const comments__submit = document.getElementById("comments__submit");
let comments = document.getElementById("comments");
const textarea = document.getElementById("comments__textarea");
const comments__author__img = document.getElementById("comments__author__img");
const comments__none = document.getElementById("comments__none");
const comments__author = document.getElementById("comments__author");
let regex = /--(.*?)\*/;

eventsObj.addEvent(comments__submit, "click", async function (e) {
    e.preventDefault();
    function errorFunc(object, error__text, default__text, change__text = false) {
        object.setAttribute("placeholder", error__text);
        if (change__text) { object.textContent = error__text; object.value = error__text }
        object.classList.add("error");
        let errorTimer = setTimeout(function () {
            object.classList.remove("error");
            object.setAttribute("placeholder", default__text);
            if (change__text) { object.textContent = default__text; object.value = error__text }
        }, 3000);
        comments__submit.addEventListener("click", function () {
            clearTimeout(errorTimer);
        }, false);
    }

    if (!getCookie("access-token")) {
        errorFunc(textarea, "Войдите в аккаунт, чтобы оставить комментарий!", "Введите текст..", true);

    } else {
        let comment__text = textarea.value;
        let comment__name = comments__author.textContent;
        if (comment__text.length > 0 && comments__author__img.src) {
            let comment__image = comments__author__img.src;
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
            for (let el of responseRequest) {
                if (el[0].match(/id="([^"]+)"/)[1].split("__")[1] == comment__id) {
                    comment__id = comment__id + Math.floor(Math.random() * 101);
                }
            }
            let comment__request;
            if (answer_id) {
                let answer = document.getElementById(`comment__${comment__id - 1}`);
                answer.style.marginLeft = Number(answer.style.marginLeft.slice(0, -1)) + 2 + "%";
                comment__request =
                    `<div class="comment__answer_comment" id="comment__${comment__id}" style="margin-left: ${answer.style.marginLeft};" itemprop itemtype="https://schema.org/Comment">
                        <div class="comment__header">
                            <div class="comment__author" itemprop="author">
                                <img src="${comment__image}" alt="Изображение комментатора">
                                <h3>${comment__name}</h3>
                            </div>
                            <div class="comment__other">
                                <time class="comment__date">${today}</time>
                                <i id="comment__delete--${comment__id}*${eval(getCookie('access-token'))}" class="fa fa-trash comment__delete reg" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div class="comment__message"> 
                            <p class="comment__text">${comment__text}</p>
                            <p class="comment__answer" id="comment__answer__${comment__id}">Ответить</p>
                        </div>
                    </div>`;
                answered__comment.insertAdjacentHTML(`beforeend`, comment__request);
            } else {
                comment__request =
                    `<div class="comment" id="comment__${comment__id}" itemprop itemtype="https://schema.org/Comment">
                        <div class="comment__header">
                            <div class="comment__author" itemprop="author">
                                <img src="${comment__image}" alt="Изображение комментатора">
                                <h3>${comment__name}</h3>
                            </div>
                            <div class="comment__other">
                                <time class="comment__date">${today}</time>
                                <i id="comment__delete--${comment__id}*${eval(getCookie('access-token'))}" class="fa fa-trash comment__delete reg" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div class="comment__message"> 
                            <p class="comment__text">${comment__text}</p>
                            <p class="comment__answer" id="comment__answer__${comment__id}">Ответить</p>
                        </div>
                    </div>`;
                comments.insertAdjacentHTML(`beforeend`,
                    comment__request
                );
            }
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

            /* Функциональность кнопки ответа на комментарий */
            const comment__answers = document.querySelectorAll(".comment__answer");
            const your__comment = document.getElementById("your__comment");
            for (let answer of comment__answers) {
                eventsObj.addEvent(answer, "click", function () {
                    your__comment.textContent = `Ответ на комментарий пользователя "${document.querySelector(`#comment__${answer.id.split("__")[2]} .comment__author h3`).textContent}"`
                    answered__comment = document.getElementById(`comment__${answer.id.split("__")[2]}`);
                    answer_id = answer.id.split("__")[2];
                    answer_cancel.classList.remove("hide");
                });
            }

        } else {
            if (comment__text.length == 0) {
                errorFunc(textarea, "Вы не можете отправить пустой текст!", "Введите текст..");
            }
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
                const comment__delete = document.querySelector(`#${comment[0].match(/id="([^"]+)"/)[1]} .comment__delete`);
                if (comment__delete.id.includes(eval(getCookie('access-token')))) {
                    comment__delete.classList.add("reg");
                } else {
                    comment__delete.classList.remove("reg");
                }
            });

            delete_comment();
        }
    } else {
        console.log(`Ошибка создания ${responseRequest.status}: ${responseRequest.statusText}`);
    }
}());

// Удаление комментария
async function delete_comment_func(comment__id) {
    let answer_comments = document.querySelectorAll(`#comment__${comment__id} .comment__answer_comment`);
    let responseRequest = await fetch('api/delete-comment', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: comment__id })
    });

    if (responseRequest.ok) { // если HTTP-статус в диапазоне 200-299
        let comment = document.getElementById(`comment__${comment__id}`);
        let preview_comment = document.getElementById(`comment__${comment__id - 1}`);
        if (comment) {
            if (preview_comment) {
                let count = 1;
                while (!preview_comment.contains(comment)) {
                    preview_comment = document.getElementById(`comment__${comment__id - count}`);
                    count += 1;
                    if (!preview_comment) {
                        comments.removeChild(comment);
                        break
                    }
                }
                if (preview_comment.contains(comment)) { preview_comment.removeChild(comment) };
            } else {
                comments.removeChild(comment);
            }
        }

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

    if (answer_comments.length) {
        for (comment of answer_comments) {
            delete_comment_func(comment.outerHTML.match(/id="([^"]+)"/)[1].split("__")[1]); // Берём id комментария, а потом число в его id.
        }
    }
}

function delete_comment() {
    setTimeout(() => {

        let comments__delete = document.getElementsByClassName("comment__delete");

        for (let el of comments__delete) {
            eventsObj.addEvent(el, "click", async function () {
                await delete_comment_func(el.id.match(regex)[1]);
            });
        }
    }, 1000);
}

/* Функциональность кнопки ответа на комментарий */
let answer_id;
let answered__comment;
const answer_cancel = document.getElementById("answer_cancel");
setTimeout(() => {
    const comment__answers = document.querySelectorAll(".comment__answer");
    const your__comment = document.getElementById("your__comment");
    for (let answer of comment__answers) {
        eventsObj.addEvent(answer, "click", function () {
            your__comment.textContent = `Ответ на комментарий пользователя "${document.querySelector(`#comment__${answer.id.split("__")[2]} .comment__author h3`).textContent}"`
            answered__comment = document.getElementById(`comment__${answer.id.split("__")[2]}`);
            answer_id = answer.id.split("__")[2];
            answer_cancel.classList.remove("hide");
        });
    }
}, 2000)

/* Функциональность отмены ответа на комментарий */
eventsObj.addEvent(answer_cancel, "click", function () {
    your__comment.textContent = "Ваш комментарий";
    answer_id = false;
    answer_cancel.classList.add("hide");
})