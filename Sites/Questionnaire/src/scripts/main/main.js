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
const survey_panel__pagination__left_arrow = document.getElementById("survey_panel__pagination--left_arrow");
const survey_panel__pagination__right_arrow = document.getElementById("survey_panel__pagination--right_arrow");
let survey_panel__pagination__counter = 0;
let existing_surveys_dict = {};
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
    if (create_question_header__add_desc) {
        create_question_header__add_desc.addEventListener("click", function () {
            hide(create_question_header__add_desc);
            unhide(create_question__header__desc);
        });
    }
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
function create_survey_pagination(first_arrow, second_arrow, array) {
    if (!first_arrow.classList.contains("survey_panel__pagination__arrow--disabled")) {
        second_arrow.classList.remove("survey_panel__pagination__arrow--disabled");
        for (let survey_id of array) {
            if (existing_surveys_dict[survey_id] == "select") {
                document.getElementById(survey_id).classList.add("opacity-0");
                existing_surveys_dict[survey_id] = "unselect";
                setTimeout(() => {
                    document.getElementById(survey_id).classList.add("hidden");
                }, 300);
            }
            else {
                if (Object.values(existing_surveys_dict).filter(survey => survey == "select").length < 2) {
                    setTimeout(() => {
                        document.getElementById(survey_id).classList.remove("hidden");
                        setTimeout(() => {
                            document.getElementById(survey_id).classList.remove("opacity-0");
                        }, 300);
                    }, 300);
                    existing_surveys_dict[survey_id] = "select";
                    if (array[array.length - 1] == survey_id) {
                        first_arrow.classList.add("survey_panel__pagination__arrow--disabled");
                        break;
                    }
                }
            }
        }
    }
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
function deleteCookie(name) {
    setCookie(name, "", {
        'max-age': -1
    });
}
// Создание блоков-ссылок на опросы в "Создать опрос"
(function () {
    let survey_links = getCookie('survey_links') || null;
    let create_link__request;
    if (survey_links && created_surveys) {
        survey_links = JSON.parse(survey_links);
        for (let id in survey_links) {
            create_link__request =
                `<a href="${survey_links[id][0]}" class="survey hidden opacity-0 create__survey--hide_animation" id="survey--${id}">
            
                    <h3 class="survey--caption">${survey_links[id][1]}</h3>
            
                    <div class="survey__edit">
                        <p>Редактировать</p>
                        <i class="fa fa-edit" aria-hidden="true"></i>
                    </div>
                    
                </a>`;
            created_surveys.insertAdjacentHTML(`beforeend`, create_link__request);
        }
        let survey = document.querySelector(".survey");
        survey.classList.remove("opacity-0");
        unhide(survey);
        let existing_surveys = created_surveys.children;
        for (let el of existing_surveys) {
            if (Array.from(existing_surveys).indexOf(el) > 1) {
                existing_surveys_dict[el.id] = "unselect";
            }
            else {
                existing_surveys_dict[el.id] = "select";
            }
        }
        survey_panel__pagination__left_arrow.classList.add("survey_panel__pagination__arrow--disabled");
        if (existing_surveys.length <= 2) {
            survey_panel__pagination__right_arrow.classList.add("survey_panel__pagination__arrow--disabled");
        }
    }
}());
/* Функция нажатия на конечную кнопку "Cохранить" */
function ceate_survey__end_continue(func) {
    create_questions__save.addEventListener("click", async function () {
        if (document.querySelectorAll(".create_question__answer_types").length < 2) {
            save__answers_error.classList.remove("hidden");
            setTimeout(() => {
                save__answers_error.classList.add("hidden");
            }, 3000);
            return;
        }
        if (Array.from(document.querySelectorAll(".create_question--correct_checkbox")).filter((v) => v.checked).length != 1) {
            save__correct_error.classList.remove("hidden");
            setTimeout(() => {
                save__correct_error.classList.add("hidden");
            }, 3000);
            return;
        }
        create_survey_page__create_question.classList.add("page_name--class", "opacity-0");
        setTimeout(() => {
            hide(create_survey_page__create_question);
            unhide(create_survey_page__end);
        }, 400);
        setTimeout(() => {
            create_survey_page__end.classList.add("opacity-1", "page_name--class");
            create_survey_page__end.classList.remove("opacity-0");
            create_survey_page__continue.classList.remove("create__survey__page--hidden");
            create_survey_page__continue.classList.add("create_survey_page__continue--end");
        }, 700);
        /* Нажатие на кнопку "Сохранить" на конечной странице создания опроса */
        create_survey_page__continue.removeEventListener("click", page_survey_continue);
        create_survey_page__continue.addEventListener("click", func);
    });
}
// Функция для создания функционала для создания нового ответа
function create_answer(create_question__add_answer, create_question__header, create_question__count) {
    create_question__answers_count = 0;
    create_question__add_answer.addEventListener("click", function () {
        create_question__answers_count++;
        /* Создание вопроса */
        const create_question__request = `<div class="create_question__answer_types" id="create_question--${create_question__count}--answer_types--${create_question__answers_count}">

                <div class="create_question__answer_types--delete" id="create_question--${create_question__count}--answer_types--delete--${create_question__answers_count}">
                    <i class="fa fa-close" aria-hidden="true"></i>
                </div>

                <div class="create_question__answer_type answer_types--preset_answer">

                    <div class="create_question--preset_answer__interface">
                        <i class="fa fa-address-book-o create_question__answer_type--icon" aria-hidden="true"></i>
                        <p class="create_question__answer_type--caption">Предустановленный ответ</p>
                        <input class="create_question__answer_type--radio" type="radio" id="create_question--${create_question__count}__preset_answer--checkbox--${create_question__answers_count}">
                    </div>

                    <div class="create_question--preset_answer__menu hidden" id="create_question--${create_question__count}--preset_answer__menu--${create_question__answers_count}">

                        <div class="create_question--preset_answer__text">
                            <input class="create_question__header--input" type="text" placeholder="Введите вариант ответа" id="create_question--${create_question__count}--preset_answer__input--${create_question__answers_count}">
                            <i class="fa fa-pencil create_question__header--edit" aria-hidden="true" id="create_question--${create_question__count}--preset_answer__edit--${create_question__answers_count}"></i>
                        </div>

                        <div class="create_question--preset_answer__correct_answer">
                            <p>Это правильный ответ</p>
                            <input class="create_question--correct_checkbox create_question__preset_answer--checkbox" type="checkbox" id="question--${create_question__count}__preset_answer__correct_answer--checkbox--${create_question__answers_count}">
                            <label for="preset_answer__correct_answer--checkbox"></label>
                        </div>

                    </div>

                </div>

                <div class="create_question__answer_type answer_types--open_answer">

                    <div class="create_question--open_answer__interface">
                        <i class="fa fa-address-card-o create_question__answer_type--icon" aria-hidden="true"></i>
                        <p class="create_question__answer_type--caption">Форма открытого ответа</p>
                        <input class="create_question__answer_type--radio" type="radio" id="create_question--${create_question__count}__open_answer--checkbox--${create_question__answers_count}">
                    </div>

                    <div class="create_question--open_answer__menu hidden" id="create_question--${create_question__count}--open_answer__menu--${create_question__answers_count}">

                        <div class="create_question--open_answer__text">
                            <input class="create_question__open_answer--input" type="text" placeholder="Тут пользователь сможет ввести свой ответ" id="create_question--${create_question__count}--open_answer__input--${create_question__answers_count}">
                        </div>

                        <div class="create_question--open_answer__correct_answer">
                            <p>Это правильный ответ</p>
                            <input class="create_question--correct_checkbox create_question__open_answer--checkbox" type="checkbox" id="question--${create_question__count}__open_answer__correct_answer--checkbox--${create_question__answers_count}">
                            <label for="open_answer__correct_answer--checkbox" class="create_question__open_answer--label"></label>
                        </div>

                    </div>

                </div>

        </div>`;
        create_question__header.insertAdjacentHTML(`afterend`, create_question__request);
        /* Объявление переменных, созданных после создания опроса и активация функций в создании ответа */
        const create_question__preset_answer__input = document.getElementById(`create_question--${create_question__count}--preset_answer__input--${create_question__answers_count}`);
        const create_question__preset_answer__edit = document.getElementById(`create_question--${create_question__count}--preset_answer__edit--${create_question__answers_count}`);
        const create_question__preset_answer__checkbox = document.getElementById(`create_question--${create_question__count}__preset_answer--checkbox--${create_question__answers_count}`);
        const create_question__preset_answer__menu = document.getElementById(`create_question--${create_question__count}--preset_answer__menu--${create_question__answers_count}`);
        const create_question__open_answer__checkbox = document.getElementById(`create_question--${create_question__count}__open_answer--checkbox--${create_question__answers_count}`);
        const create_question__open_answer__menu = document.getElementById(`create_question--${create_question__count}--open_answer__menu--${create_question__answers_count}`);
        const create_question__delete = document.getElementById(`create_question--${create_question__count}--answer_types--delete--${create_question__answers_count}`);
        const question = document.getElementById(`create_question--${create_question__count}--answer_types--${create_question__answers_count}`);
        const create_question_active = document.getElementById(`create_question_active--${create_question__count}`);
        answer_functions(create_question__preset_answer__edit, create_question__preset_answer__input, create_question__preset_answer__checkbox, create_question__preset_answer__menu, create_question__open_answer__menu, create_question__open_answer__checkbox, create_question__delete, create_question_active, question);
    });
}
//# sourceMappingURL=main.js.map