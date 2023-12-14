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
let create_question_header__add_desc = document.getElementById("create_question_header--add_desc");
let create_question__header__desc = document.getElementById("create_question__header--desc");
let create_question__header__inputs = document.querySelectorAll(".create_question__header--input");
let create_question__header__edits = document.querySelectorAll(".create_question__header--edit");
const create_question__add_answer = document.getElementById("create_question__add_answer");
const create_question__header = document.getElementById("create_question__header");
const create_question = document.getElementById("create_question");
const create_question__icon = document.getElementById("create_question--icon");
let create_question__answers_count = 0;
let create_question__count = 2;
let create_question__preset_answer__input;
let create_question__preset_answer__edit;
let create_question__preset_answer__checkbox;
let create_question__preset_answer__menu;
let create_question__open_answer__checkbox;
let create_question__open_answer__menu;
const create_questions__save = document.getElementById("create_questions--save");
const create_survey_page__end = document.getElementById("create_survey_page__end");
const create_survey_page__share__link = document.getElementById("create_survey_page__share--link");
const create_survey_page__share__link__pop_up_window = document.getElementById("create_survey_page__share__link--pop_up_window");
const create_survey_page__share__qr = document.getElementById("create_survey_page__share--qr");
/* Объявление всех функций */
function hide(el) {
    el.classList.add("hidden");
}
function unhide(el) {
    el.classList.remove("hidden");
}
function create_question__add_desc() {
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
function answer_functions() {
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
}
//# sourceMappingURL=main.js.map