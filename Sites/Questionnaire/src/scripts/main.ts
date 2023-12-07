/* Открытие интерфейса создания опроса */
const create__survey: HTMLElement = document.getElementById("create__survey");
const all_elements: NodeList = document.querySelectorAll(".create__survey--hide_animation");
const panels: HTMLElement = document.getElementById("panels");
const create_survey_page__continue: HTMLElement = document.getElementById("create_survey_page__continue");

create__survey.addEventListener("click", function (): void {
    let Y_coordinate: number = Number(document.documentElement.style.getPropertyValue('--Y_coordinate').slice(0, -1));

    for (let element of all_elements) {

        document.documentElement.style.setProperty('--Y_coordinate', String(Y_coordinate) + "%");
        Y_coordinate += 1;

        setTimeout(() => {
            (element as HTMLElement).classList.add("create__survey--class");
            (element as HTMLElement).classList.add("opacity-0");
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
})

/* Нажатие на кнопку продолжения после выбора имени опроса */
const create_survey_page__name: HTMLElement = document.getElementById("create_survey_page__name");
const create_survey_page__name_elements: NodeList = document.querySelectorAll(".create_survey_type:not(.create_survey_page, .create_survey_page__continue)");
const create_survey_page__security: HTMLElement = document.getElementById("create_survey_page__security");
const create_survey_page__create_question: HTMLElement = document.getElementById("create_survey_page__create_question");
const anonim__checkbox: HTMLElement = document.getElementById("anonim__checkbox");
const upp_security__checkbox: HTMLElement = document.getElementById("upp_security__checkbox");
const create_question__types_anonim__icon: HTMLElement = document.getElementById("create_question__types--anonim");
const create_question__types_upp_security__icon: HTMLElement = document.getElementById("create_question__types--upp_security");

function page_name_continue(): void {
    create_survey_page__name.classList.add("page_name--class");
    create_survey_page__name.classList.add("opacity-0")

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
    create_survey_page__continue.addEventListener("click", function (): void {
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
            if ((anonim__checkbox as HTMLInputElement).checked) {
                create_question__types_anonim__icon.classList.add("create_question__type--active");
            }

            if ((upp_security__checkbox as HTMLInputElement).checked) {
                create_question__types_upp_security__icon.classList.add("create_question__type--active");
            }
        }, 700);
    })
}

create_survey_page__continue.addEventListener("click", page_name_continue)


/* Функционал того, когда юзер нажимает на добавление подробного описания вопроса. */
const create_question_header__add_desc: HTMLElement = document.getElementById("create_question_header--add_desc");
const create_question__header__desc: HTMLElement = document.getElementById("create_question__header--desc");

create_question_header__add_desc.addEventListener("click", function (): void {
    create_question_header__add_desc.classList.add("hidden");
    create_question__header__desc.classList.remove("hidden");
});


/* Функционал того, что по нажатию на карандашик, таргет делается на инпут */
const create_question__header__inputs: NodeList = document.querySelectorAll(".create_question__header--input");
const create_question__header__edits: NodeList = document.querySelectorAll(".create_question__header--edit");

for (let edit of create_question__header__edits) {
    let index: number = Array.from(create_question__header__edits).indexOf(edit);
    edit.addEventListener("click", function () {
        (create_question__header__inputs[index] as HTMLInputElement).focus();
    })
}