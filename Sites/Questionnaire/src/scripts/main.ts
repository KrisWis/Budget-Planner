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

        setTimeout(() => {
            (element as HTMLElement).classList.add("hidden");
        }, 1000);
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
const body: HTMLElement = document.querySelector("body");

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
        body.classList.add("overflow-y-on");

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
    edit.addEventListener("click", function (): void {
        (create_question__header__inputs[index] as HTMLInputElement).focus();
    })
}


/* Добавление меню выбора типа ответа по нажатию соответствующей кнопки. */
const create_question__add_answer: HTMLElement = document.getElementById("create_question__add_answer");
const create_question__header: HTMLElement = document.getElementById("create_question__header");
let create_question__answers_count: number = 0;

create_question__add_answer.addEventListener("click", function (): void {
    create_question__answers_count++;

    const comment__request: string =
        `<div class="create_question__answer_types" id="create_question__answer_types--${create_question__answers_count}">

            <div class="create_question__answer_type answer_types--preset_answer">

                <div class="create_question--preset_answer__interface">
                    <i class="fa fa-address-book-o create_question__answer_type--icon" aria-hidden="true"></i>
                    <p class="create_question__answer_type--caption">Предустановленный ответ</p>
                    <input class="create_question__answer_type--checkbox" type="checkbox" id="create_question__preset_answer--checkbox--${create_question__answers_count}">
                    <label for="create_question__preset_answer--checkbox"></label>
                </div>

                <div class="create_question--preset_answer__menu hidden" id="create_question--preset_answer__menu--${create_question__answers_count}">

                    <div class="create_question--preset_answer__text">
                        <input class="create_question__header--input" type="text" placeholder="Введите вариант ответа" id="create_question--preset_answer__input--${create_question__answers_count}">
                        <i class="fa fa-pencil create_question__header--edit" aria-hidden="true" id="create_question--preset_answer__edit--${create_question__answers_count}"></i>
                    </div>

                    <div class="create_question--preset_answer__correct_answer">
                        <p>Это правильный ответ</p>
                        <input class="create_question__preset_answer--checkbox" type="checkbox" id="preset_answer__correct_answer--checkbox--${create_question__answers_count}">
                        <label for="preset_answer__correct_answer--checkbox"></label>
                    </div>

                </div>

            </div>

            <div class="create_question__answer_type answer_types--open_answer">

                <div class="create_question--open_answer__interface">
                    <i class="fa fa-address-card-o create_question__answer_type--icon" aria-hidden="true"></i>
                    <p class="create_question__answer_type--caption">Форма открытого ответа</p>
                    <input class="create_question__answer_type--radio" type="radio" id="create_question__open_answer--checkbox--${create_question__answers_count}">
                </div>

                <div class="create_question--open_answer__menu hidden" id="create_question--open_answer__menu--${create_question__answers_count}">

                    <div class="create_question--open_answer__text">
                        <input class="create_question__open_answer--input" type="text" placeholder="Тут пользователь сможет ввести свой ответ" id="create_question--open_answer__input--${create_question__answers_count}">
                    </div>

                    <div class="create_question--open_answer__correct_answer">
                        <p>Это правильный ответ</p>
                        <input class="create_question__open_answer--checkbox" type="checkbox" id="open_answer__correct_answer--checkbox--${create_question__answers_count}">
                        <label for="open_answer__correct_answer--checkbox" class="create_question__open_answer--label"></label>
                    </div>

                </div>

            </div>

        </div>`;

    create_question__header.insertAdjacentHTML(`afterend`,
        comment__request
    );

    /* Функционал того, что по нажатию на карандашик, таргет делается на инпут */
    const create_question__preset_answer__input: HTMLElement = document.getElementById(`create_question--preset_answer__input--${create_question__answers_count}`);
    const create_question__preset_answer__edit: HTMLElement = document.getElementById(`create_question--preset_answer__edit--${create_question__answers_count}`);
    create_question__preset_answer__edit.addEventListener("click", function (): void {
        (create_question__preset_answer__input as HTMLInputElement).focus();
    })

    /* Нажатие на кнопку предустановленного ответа и открытие соответствующего меню */
    const create_question__preset_answer__checkbox = document.getElementById(`create_question__preset_answer--checkbox--${create_question__answers_count}`);
    const create_question__preset_answer__menu = document.getElementById(`create_question--preset_answer__menu--${create_question__answers_count}`);

    create_question__preset_answer__checkbox.addEventListener("click", function () {
        create_question__preset_answer__menu.classList.remove("hidden");
    })

    /* Нажатие на кнопку открытого ответа и открытие соответствующего меню */
    const create_question__open_answer__checkbox = document.getElementById(`create_question__open_answer--checkbox--${create_question__answers_count}`);
    const create_question__open_answer__menu = document.getElementById(`create_question--open_answer__menu--${create_question__answers_count}`);

    create_question__open_answer__checkbox.addEventListener("click", function () {
        create_question__open_answer__menu.classList.remove("hidden");
    })

})