// Функция для показа ошибки
function show_error(error) {
    error.classList.remove("hidden");
    setTimeout(() => {
        error.classList.add("hidden");
    }, 3000);
}
// Функция для добавления стрелочкам пагинации неактивности
function disable_pagination_arrows(left_arrow, right_arrow, surveys, visible_surveys_length) {
    left_arrow.classList.add("survey_panel__pagination__arrow--disabled");
    if (surveys.length <= visible_surveys_length) {
        right_arrow.classList.add("survey_panel__pagination__arrow--disabled");
    }
}
// Функционал при загрузке страницы
(function () {
    // Получение и обработка ссылок на все опросы
    let survey_links = getCookie('survey_links') || null;
    if (survey_links && created_surveys) {
        survey_links = JSON.parse(survey_links);
        for (let id in survey_links) {
            // Создание блоков-ссылок на опросы в "Создать опрос" и "Доступные опросы"
            create_survey(survey_links[id][0], id, survey_links[id][1], survey_links[id][2]);
        }
        // Устанавливаем стили для опросов на первой странице, и делаем функционал для корректной пагинации
        after_creating_survey();
        // Настройка стилей для элементов блока "Доступные опросы" (открываем первые 4 элемента)
        let available_surveys_selectors = document.querySelectorAll(".available_survey");
        for (let index = 0; index < 4; index++) {
            available_surveys_selectors[index].classList.remove("opacity-0");
            unhide(available_surveys_selectors[index]);
        }
        // Настройка пагинации
        let existing_surveys = created_surveys.children;
        pagination_func(existing_surveys, create_survey__existing_surveys, 1);
        let existing_available_surveys = available_surveys.children;
        available_surveys.removeChild(available_surveys__none);
        available_surveys__existing_surveys = {};
        pagination_func(existing_available_surveys, available_surveys__existing_surveys, 3);
        // Настройка стрелочек пагинации
        disable_pagination_arrows(survey_panel__pagination__left_arrow, survey_panel__pagination__right_arrow, existing_surveys, 2);
        disable_pagination_arrows(available_surveys__pagination__left_arrow, available_surveys__pagination__right_arrow, existing_available_surveys, 4);
    }
}());
/* Функция нажатия на конечную кнопку "Cохранить" */
function create_survey__end_continue(func) {
    create_questions__save.addEventListener("click", async function () {
        if (document.querySelectorAll(".create_question__answer_types").length < 2) {
            show_error(save__answers_error);
            return;
        }
        let questions = document.querySelectorAll(".create_question_active");
        for (let question of questions) {
            if (Array.from(document.querySelectorAll(`#${question.id} .create_question--correct_checkbox`)).filter((v) => v.checked).length != 1) {
                show_error(save__correct_error);
                return;
            }
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