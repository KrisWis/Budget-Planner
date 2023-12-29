/* Объявление всех переменных */
const create__survey: HTMLElement = document.getElementById("create__survey");
const all_elements: NodeList = document.querySelectorAll(".create__survey--hide_animation");
const panels: HTMLElement = document.getElementById("panels");
const create_survey_page__continue: HTMLElement = document.getElementById("create_survey_page__continue");
const create_survey_page__name: HTMLElement = document.getElementById("create_survey_page__name");
const create_survey_page__name_elements: NodeList = document.querySelectorAll(".create_survey_type:not(.create_survey_page, .create_survey_page__continue)");
const create_survey_page__security: HTMLElement = document.getElementById("create_survey_page__security");
const create_survey_page__create_question: HTMLElement = document.getElementById("create_survey_page__create_question");
const anonim__checkbox: HTMLElement = document.getElementById("anonim__checkbox");
const upp_security__checkbox: HTMLElement = document.getElementById("upp_security__checkbox");
const create_question__types_anonim__icon: HTMLElement = document.getElementById("create_question__types--anonim");
const create_question__types_upp_security__icon: HTMLElement = document.getElementById("create_question__types--upp_security");
const body: HTMLElement = document.querySelector("body");
let create_question__header__desc: HTMLElement = document.getElementById("create_question__header--desc");
let create_question__header__inputs: NodeList = document.querySelectorAll(".create_question__header--input");
let create_question__header__edits: NodeList = document.querySelectorAll(".create_question__header--edit");
const create_question__add_answer: HTMLElement = document.getElementById("create_question__add_answer");
const create_question__header: HTMLElement = document.getElementById("create_question__header");
const create_question: HTMLElement = document.getElementById("create_question");
const create_question__icon: HTMLElement = document.getElementById("create_question--icon");
let create_question__answers_count: number = 0;
let create_question__count: number = 2;
const create_questions__save: HTMLElement = document.getElementById("create_questions--save");
const create_survey_page__end: HTMLElement = document.getElementById("create_survey_page__end");
const create_survey_page__share__link: HTMLElement = document.getElementById("create_survey_page__share--link");
const create_survey_page__share__link__pop_up_window: HTMLElement = document.getElementById("create_survey_page__share__link--pop_up_window");
const create_survey_page__share__qr: HTMLElement = document.getElementById("create_survey_page__share--qr");
const create_survey__pop_up_window_survey_created: HTMLElement = document.getElementById("create_survey--pop_up_window-survey_created");
const create_questions: HTMLElement = document.getElementById("create_questions");
const create_survey_page_name__edit: HTMLElement = document.getElementById("create_survey_page_name__edit");
const create_survey_page_name__input: HTMLElement = document.getElementById("create_survey_page_name__input");
const save__answers_error: HTMLElement = document.getElementById("save--answers_error");
const save__correct_error: HTMLElement = document.getElementById("save--correct_error");

/* Объявление всех функций, которые будут использоваться глобально в коде */
function hide(el: HTMLElement): void {
    el.classList.add("hidden");
}

function unhide(el: HTMLElement): void {
    el.classList.remove("hidden");
}

function create_question__add_desc(create_question__count) {
    const create_question_header__add_desc: HTMLElement = document.getElementById(`create_question_header--add_desc--${create_question__count}`);
    const create_question__header__desc: HTMLElement = document.getElementById(`create_question__header--desc--${create_question__count}`);

    create_question_header__add_desc.addEventListener("click", function (): void {
        hide(create_question_header__add_desc);
        unhide(create_question__header__desc);
    });
}

function edit_click_target() {
    for (let edit of create_question__header__edits) {
        let index: number = Array.from(create_question__header__edits).indexOf(edit);
        edit.addEventListener("click", function (): void {
            (create_question__header__inputs[index] as HTMLInputElement).focus();
        })
    }
}

function answer_functions(create_question__preset_answer__edit, create_question__preset_answer__input, create_question__preset_answer__checkbox,
    create_question__preset_answer__menu, create_question__open_answer__menu, create_question__open_answer__checkbox, create_question__delete,
    create_question_active, question) {

    /* Функционал того, что по нажатию на карандашик, таргет делается на инпут */
    create_question__preset_answer__edit.addEventListener("click", function (): void {
        (create_question__preset_answer__input as HTMLInputElement).focus();
    })

    /* Нажатие на кнопку предустановленного ответа и открытие соответствующего меню */
    create_question__preset_answer__checkbox.addEventListener("change", function () {
        unhide(create_question__preset_answer__menu);
        hide(create_question__open_answer__menu);
        (create_question__open_answer__checkbox as HTMLInputElement).checked = false;
    })

    /* Нажатие на кнопку открытого ответа и открытие соответствующего меню */
    create_question__open_answer__checkbox.addEventListener("change", function () {
        unhide(create_question__open_answer__menu);
        hide(create_question__preset_answer__menu);
        (create_question__preset_answer__checkbox as HTMLInputElement).checked = false;
    })

    /* Функцонал того, что по нажатию на крестик, ответ удаляется. */
    create_question__delete.addEventListener("click", function () {
        create_question_active.removeChild(question);
    })
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


/* Наполняем localStorage дефолтными значениями и создаём интерфейсы для типов данных */
interface Survey {
    name: string,
    security_type: string,
    questions: Question[],
}

interface Question {
    name: string,
    desc: string,
    answers: Answer[],
}

interface Answer {
    type: string,
    correct: boolean,
    answer_text: string,
}

localStorage.setItem('surveys', JSON.stringify([]));

/* Функции для работы с куки */
function setCookie(name: string, value: string, options: any = {}): void {

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