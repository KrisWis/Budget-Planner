/* Объявление всех переменных */
const create__survey: HTMLElement = document.getElementById("create__survey");
const all_elements: NodeList = document.querySelectorAll(".create__survey--hide_animation");
const panels: HTMLElement = document.getElementById("panels");
const create_survey_page: HTMLElement = document.getElementById("create_survey_page");
const create_survey_page__continue: HTMLElement = document.getElementById("create_survey_page__continue");
const create_survey_page__name: HTMLElement = document.getElementById("create_survey_page__name");
const create_survey_page__name_elements: NodeList = document.querySelectorAll(".create_survey_type:not(.create_survey_page, .create_survey_page__continue)");
const create_survey_page__security: HTMLElement = document.getElementById("create_survey_page__security");
const create_survey_page__create_question: HTMLElement = document.getElementById("create_survey_page__create_question");
let anonim__checkbox: HTMLElement = document.getElementById("anonim__checkbox");
let upp_security__checkbox: HTMLElement = document.getElementById("upp_security__checkbox");
let create_question__types_anonim__icon: HTMLElement = document.getElementById("create_question__types--anonim");
let create_question__types_upp_security__icon: HTMLElement = document.getElementById("create_question__types--upp_security");
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
const created_surveys: HTMLElement = document.getElementById("created_surveys");
const survey_panel__pagination__left_arrow: HTMLElement = document.getElementById("survey_panel__pagination--left_arrow");
const survey_panel__pagination__right_arrow: HTMLElement = document.getElementById("survey_panel__pagination--right_arrow");
let survey_panel__pagination__counter: number = 0;
let create_survey__existing_surveys: any = {};
let available_surveys__existing_surveys: any = {};
const available_surveys: HTMLElement = document.getElementById("available_surveys");
const available_surveys__none: HTMLElement = document.getElementById("available_surveys__none");
const available_surveys__pagination__left_arrow: HTMLElement = document.getElementById("available_surveys__pagination--left_arrow");
const available_surveys__pagination__right_arrow: HTMLElement = document.getElementById("available_surveys__pagination--right_arrow");


/* Объявление всех функций, которые будут использоваться глобально в коде */

// Функция скрытия элемента
function hide(el: HTMLElement): void {
    el.classList.add("hidden");
}

// Функция видения элемента
function unhide(el: HTMLElement): void {
    el.classList.remove("hidden");
}

// Функция для включения всех функций ответов
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

// Функция для создания HTML опроса
function create_survey(edit_survey_link: string, survey_id: string, survey_name: string, survey_link: string): void {
    // Создание блоков-ссылок на опросы в "Создать опрос"
    let create_link__request: string =
        `<a href="${edit_survey_link}" class="survey hidden opacity-0 create__survey--hide_animation" id="survey--${survey_id}">

            <h3 class="survey--caption">${survey_name}</h3>

            <div class="survey__edit">
                <p>Редактировать</p>
                <i class="fa fa-edit" aria-hidden="true"></i>
            </div>
            
        </a>`;

    created_surveys.insertAdjacentHTML(`beforeend`,
        create_link__request
    );

    // Создание ссылок на все опросы в блоке "доступные опросы"
    create_link__request =
        `<a href="${survey_link}" class="available_survey hidden opacity-0" id="available_survey--${survey_id}">
            <h3 class="available_survey--caption">${survey_name}</h3>
        </a>`;

    available_surveys.insertAdjacentHTML(`afterbegin`,
        create_link__request
    );
}

// Функция для выполнения действий после создания опроса
function after_creating_survey(): void {
    available_surveys__none.classList.add("hidden");
    let survey: HTMLElement = document.querySelector(".survey");
    survey.classList.remove("opacity-0");
    unhide(survey);
}

// Функция для настройки пагинации
function pagination_func(array: HTMLCollection, obj: {}, surveys_length: number): void {
    for (let el of array) {
        if (Array.from(array).indexOf(el) > surveys_length) {
            obj[el.id] = "unselect";
        } else {
            obj[el.id] = "select";
        }
    }
}

// Функция для отправки HTTP запроса 
async function fetch_post(HTTP_URL: string, HTTP_body: Object): Promise<Response> {
    let response = await fetch(HTTP_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(HTTP_body)
    });

    return response;
}

// Функция для сохранения всех данных вопросов
function save_questions(): Question {
    /* Сохранение имени и описания вопросов */
    const questions: NodeList = document.querySelectorAll(".create_question_active");

    let all_questions: Question = {};
    for (let question of questions) {
        let question_id: string = (question as HTMLElement).id;
        let question_name: string = (document.querySelector(`#${question_id} .create_question__header--input`) as HTMLInputElement).value;
        let question_desc: string = (document.querySelector(`#${question_id} .create_question__header--desc_input`) as HTMLInputElement).value;
        let answers: NodeList = document.querySelectorAll(`#${question_id} .create_question__answer_types`);
        let all_answers: Answer = {};

        for (let answer of answers) {
            let answers_id: number = Number((answer as HTMLElement).id.split("--")[3]);
            let answer_type: string;
            if (document.querySelector(`#${question_id} #create_question__preset_answer--checkbox--${answers_id}`)) {
                answer_type = (document.querySelector(`#${question_id} #create_question__preset_answer--checkbox--${answers_id}`) as HTMLInputElement).checked ? 'preset' : 'open';
            } else {
                answer_type = "open";
            }

            let answer_correct: boolean;

            if (answer_type == 'preset') {
                answer_correct = (document.getElementById(`question--${question_id.split("--")[1]}__preset_answer__correct_answer--checkbox--${answers_id}`) as HTMLInputElement).checked;
            } else {
                answer_correct = (document.getElementById(`question--${question_id.split("--")[1]}__open_answer__correct_answer--checkbox--${answers_id}`) as HTMLInputElement).checked;
            }

            let answer_text: string;
            try {
                answer_text = (document.getElementById(`create_question--preset_answer__input--${answers_id}`) as HTMLInputElement).value;
            } catch {
                answer_text = "";
            }

            all_answers[`${answers_id}`] = { type: answer_type, correct: String(answer_correct), answer_text: answer_text };
        }

        all_questions[(question as HTMLElement).id] = { name: question_name, desc: question_desc, answers: all_answers }
    }

    return all_questions;
}

// Функция для реверса объекта
function obj_reverse(obj: Object): Object {
    let new_obj: Object = {}
    let rev_obj: any = Object.keys(obj).reverse();
    rev_obj.forEach(function (i) {
        new_obj[i] = obj[i];
    })
    return new_obj;
}

/* Наполняем localStorage дефолтными значениями и создаём интерфейсы для типов данных */
interface Survey {
    name: string,
    security_type: string,
    questions: Question[],
}

interface Question {
    name?: string,
    desc?: string,
    answers?: Answer[],
}

interface Answer {
    type?: string,
    correct?: boolean,
    answer_text?: string,
}

/* Функции для работы с куки */
function setCookie(name: string, value: any, options: any = {}): void {

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

function getCookie(name: string): any {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function deleteCookie(name) {
    setCookie(name, "", {
        'max-age': -1
    })
}