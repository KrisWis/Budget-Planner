/* Открытие интерфейса создания опроса */
const create__survey = document.getElementById("create__survey");
const all_elements = document.querySelectorAll(".create__survey--hide_animation");
const panels = document.getElementById("panels");
const create_survey_page__continue = document.getElementById("create_survey_page__continue");
create__survey.addEventListener("click", function () {
    let Y_coordinate = Number(document.documentElement.style.getPropertyValue('--Y_coordinate').slice(0, -1));
    for (let element of all_elements) {
        document.documentElement.style.setProperty('--Y_coordinate', String(Y_coordinate) + "%");
        Y_coordinate += 1;
        setTimeout(() => {
            element.classList.add("create__survey--class");
            element.classList.add("opacity-0");
        }, 250);
    }
    setTimeout(() => {
        panels.classList.add("hidden");
    }, 400);
    setTimeout(() => {
        create_survey_page__name.classList.add("create__survey--class");
        create_survey_page__name.classList.add("opacity-1");
        create_survey_page__continue.classList.add("opacity-1");
    }, 700);
});
/* Нажатие на кнопку продолжения после выбора имени опроса */
const create_survey_page__name = document.getElementById("create_survey_page__name");
const create_survey_page__name_elements = document.querySelectorAll(".create_survey_type:not(.create_survey_page, .create_survey_page__continue)");
const create_survey_page__security = document.getElementById("create_survey_page__security");
const create_survey_page__create_question = document.getElementById("create_survey_page__create_question");
const anonim__checkbox = document.getElementById("anonim__checkbox");
const upp_security__checkbox = document.getElementById("upp_security__checkbox");
const create_question__types_anonim__icon = document.getElementById("create_question__types--anonim");
const create_question__types_upp_security__icon = document.getElementById("create_question__types--upp_security");
function page_name_continue() {
    create_survey_page__name.classList.add("page_name--class");
    create_survey_page__name.classList.add("opacity-0");
    setTimeout(() => {
        create_survey_page__name.classList.add("hidden");
        create_survey_page__security.classList.remove("hidden");
    }, 400);
    setTimeout(() => {
        create_survey_page__security.classList.add("opacity-1");
        create_survey_page__security.classList.add("page_name--class");
    }, 700);
    create_survey_page__continue.removeEventListener("click", page_name_continue);
    /* Нажатие на кнопку продолжения после выбора типа опроса */
    create_survey_page__continue.addEventListener("click", function () {
        create_survey_page__security.classList.add("create__survey__page--hidden");
        create_survey_page__continue.classList.add("create__survey__page--hidden");
        setTimeout(() => {
            create_survey_page__security.classList.add("hidden");
            create_survey_page__create_question.classList.remove("hidden");
        }, 400);
        setTimeout(() => {
            create_survey_page__create_question.classList.add("opacity-1");
            create_survey_page__create_question.classList.add("page_name--class");
            // Если опция была выбрана, то пусть будет окрашена в синий.
            if (anonim__checkbox.checked) {
                create_question__types_anonim__icon.classList.add("create_question__type--active");
            }
            if (upp_security__checkbox.checked) {
                create_question__types_upp_security__icon.classList.add("create_question__type--active");
            }
        }, 700);
    });
}
create_survey_page__continue.addEventListener("click", page_name_continue);
/* Функционал того, когда юзер нажимает на добавление подробного описания вопроса. */
const create_question_header__add_desc = document.getElementById("create_question_header--add_desc");
const create_question__header__desc = document.getElementById("create_question__header--desc");
create_question_header__add_desc.addEventListener("click", function () {
    create_question_header__add_desc.classList.add("hidden");
    create_question__header__desc.classList.remove("hidden");
});
/* Функционал того, что по нажатию на карандашик, таргет делается на инпут */
const create_question__header__inputs = document.querySelectorAll(".create_question__header--input");
const create_question__header__edits = document.querySelectorAll(".create_question__header--edit");
for (let edit of create_question__header__edits) {
    let index = Array.from(create_question__header__edits).indexOf(edit);
    edit.addEventListener("click", function () {
        create_question__header__inputs[index].focus();
    });
}
//# sourceMappingURL=main.js.map