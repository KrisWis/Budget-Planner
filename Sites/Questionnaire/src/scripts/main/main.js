/* Объявление всех переменных */
const create__survey = document.getElementById("create__survey");
const all_elements = document.querySelectorAll(".create__survey--hide_animation");
const panels = document.getElementById("panels");
const create_survey_page__continue = document.getElementById("create_survey_page__continue");
const create_survey_page__name = document.getElementById("create_survey_page__name");
const create_survey_page__name_elements = document.querySelectorAll(".create_survey_type:not(.create_survey_page, .create_survey_page__continue)");
const create_survey_page__security = document.getElementById("create_survey_page__security");
const create_survey_page__create_question = document.getElementById("create_survey_page__create_question");
const anonim__checkbox = document.getElementById("anonim__checkbox");
const upp_security__checkbox = document.getElementById("upp_security__checkbox");
const create_question__types_anonim__icon = document.getElementById("create_question__types--anonim");
const create_question__types_upp_security__icon = document.getElementById("create_question__types--upp_security");
const body = document.querySelector("body");
let create_question__header__desc = document.getElementById("create_question__header--desc");
let create_question__header__inputs = document.querySelectorAll(".create_question__header--input");
let create_question__header__edits = document.querySelectorAll(".create_question__header--edit");
const create_question__add_answer = document.getElementById("create_question__add_answer");
const create_question__header = document.getElementById("create_question__header");
const create_question = document.getElementById("create_question");
const create_question__icon = document.getElementById("create_question--icon");
let create_question__answers_count = 0;
let create_question__count = 2;
const create_questions__save = document.getElementById("create_questions--save");
const create_survey_page__end = document.getElementById("create_survey_page__end");
const create_survey_page__share__link = document.getElementById("create_survey_page__share--link");
const create_survey_page__share__link__pop_up_window = document.getElementById("create_survey_page__share__link--pop_up_window");
const create_survey_page__share__qr = document.getElementById("create_survey_page__share--qr");
const create_survey__pop_up_window_survey_created = document.getElementById("create_survey--pop_up_window-survey_created");
const create_questions = document.getElementById("create_questions");
const create_survey_page_name__edit = document.getElementById("create_survey_page_name__edit");
const create_survey_page_name__input = document.getElementById("create_survey_page_name__input");
const save__answers_error = document.getElementById("save--answers_error");
const save__correct_error = document.getElementById("save--correct_error");
const created_surveys = document.getElementById("created_surveys");
/* Объявление всех функций, которые будут использоваться глобально в коде */
function hide(el) {
    el.classList.add("hidden");
}
function unhide(el) {
    el.classList.remove("hidden");
}
function create_question__add_desc(create_question__count) {
    const create_question_header__add_desc = document.getElementById(`create_question_header--add_desc--${create_question__count}`);
    const create_question__header__desc = document.getElementById(`create_question__header--desc--${create_question__count}`);
    create_question_header__add_desc.addEventListener("click", function () {
        hide(create_question_header__add_desc);
        unhide(create_question__header__desc);
    });
}
function edit_click_target() {
    for (let edit of create_question__header__edits) {
        let index = Array.from(create_question__header__edits).indexOf(edit);
        edit.addEventListener("click", function () {
            create_question__header__inputs[index].focus();
        });
    }
}
function answer_functions(create_question__preset_answer__edit, create_question__preset_answer__input, create_question__preset_answer__checkbox, create_question__preset_answer__menu, create_question__open_answer__menu, create_question__open_answer__checkbox, create_question__delete, create_question_active, question) {
    /* Функционал того, что по нажатию на карандашик, таргет делается на инпут */
    create_question__preset_answer__edit.addEventListener("click", function () {
        create_question__preset_answer__input.focus();
    });
    /* Нажатие на кнопку предустановленного ответа и открытие соответствующего меню */
    create_question__preset_answer__checkbox.addEventListener("change", function () {
        unhide(create_question__preset_answer__menu);
        hide(create_question__open_answer__menu);
        create_question__open_answer__checkbox.checked = false;
    });
    /* Нажатие на кнопку открытого ответа и открытие соответствующего меню */
    create_question__open_answer__checkbox.addEventListener("change", function () {
        unhide(create_question__open_answer__menu);
        hide(create_question__preset_answer__menu);
        create_question__preset_answer__checkbox.checked = false;
    });
    /* Функцонал того, что по нажатию на крестик, ответ удаляется. */
    create_question__delete.addEventListener("click", function () {
        create_question_active.removeChild(question);
    });
}
/* Создания qr кода на сайт */
// @ts-ignore
new QRCode(create_survey_page__share__qr, {
    text: document.URL,
    width: 100,
    height: 105,
    colorDark: '#0084FF',
    colorLight: '#fff',
    // @ts-ignore
    correctLevel: QRCode.CorrectLevel.H
});
/* Функции для работы с куки */
function setCookie(name, value, options = {}) {
    options = {
        path: '/',
        // при необходимости добавьте другие значения по умолчанию
        ...options
    };
    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }
    document.cookie = updatedCookie;
}
function getCookie(name) {
    let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
// Создание ссылки на опрос в "Создать опрос"
(function () {
    const survey_links = JSON.parse(getCookie('survey_links')) || null;
    let create_link__request;
    if (survey_links) {
        for (let id in survey_links) {
            create_link__request =
                `<a href="${survey_links[0]}" class="survey create__survey--hide_animation" id="survey--${id}">
            
                    <h3 class="survey--caption">${survey_links[1]}</h3>
            
                    <div class="survey__edit">
                        <p>Редактировать</p>
                        <i class="fa fa-edit" aria-hidden="true"></i>
                    </div>
                    
                </a>`;
        }
        created_surveys.insertAdjacentHTML(`beforeend`, create_link__request);
    }
}());
//# sourceMappingURL=main.js.map