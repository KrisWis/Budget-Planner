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
let create_question_header__add_desc: HTMLElement = document.getElementById("create_question_header--add_desc");
let create_question__header__desc: HTMLElement = document.getElementById("create_question__header--desc");
let create_question__header__inputs: NodeList = document.querySelectorAll(".create_question__header--input");
let create_question__header__edits: NodeList = document.querySelectorAll(".create_question__header--edit");
const create_question__add_answer: HTMLElement = document.getElementById("create_question__add_answer");
const create_question__header: HTMLElement = document.getElementById("create_question__header");
const create_question: HTMLElement = document.getElementById("create_question");
const create_question__icon: HTMLElement = document.getElementById("create_question--icon");
let create_question__answers_count: number = 0;
let create_question__count: number = 2;
let create_question__preset_answer__input: HTMLElement;
let create_question__preset_answer__edit: HTMLElement;
let create_question__preset_answer__checkbox: HTMLElement;
let create_question__preset_answer__menu: HTMLElement;
let create_question__open_answer__checkbox: HTMLElement;
let create_question__open_answer__menu: HTMLElement;
const create_questions__save: HTMLElement = document.getElementById("create_questions--save");
const create_survey_page__end: HTMLElement = document.getElementById("create_survey_page__end");
const create_survey_page__share__link: HTMLElement = document.getElementById("create_survey_page__share--link");
const create_survey_page__share__link__pop_up_window: HTMLElement = document.getElementById("create_survey_page__share__link--pop_up_window");
const create_survey_page__share__qr: HTMLElement = document.getElementById("create_survey_page__share--qr");


/* Объявление всех функций */
function hide(el: HTMLElement): void {
    el.classList.add("hidden");
}

function unhide(el: HTMLElement): void {
    el.classList.remove("hidden");
}

function create_question__add_desc() {
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

function answer_functions() {
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
}