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
    let cookie_survey_links = getCookie('survey_links') || null;
    if (cookie_survey_links && created_surveys) {
        let survey_links = JSON.parse(cookie_survey_links);
        for (let id in survey_links) {
            // Создание блоков-ссылок на опросы в "Создать опрос" и "Доступные опросы"
            create_survey(survey_links[id][0], id, survey_links[id][1], survey_links[id][2]);
            document.getElementById(`available_survey--${id}`).addEventListener("mouseover", async function () {
                let responseRequest = await fetch_post('api/get-survey-stats', { survey_id: id });
                console.log(responseRequest);
                if (responseRequest.ok) { // если HTTP-статус в диапазоне 200-299
                    let response = await responseRequest.json();
                    console.log(response);
                    // TODO: сделать вывод всех этих данных в стате
                }
                else {
                    console.log(`Ошибка создания ${responseRequest.status}: ${responseRequest.statusText}`);
                }
            });
        }
        // Устанавливаем стили для опросов на первой странице, и делаем функционал для корректной пагинации
        after_creating_survey();
        // Настройка стилей для элементов блока "Доступные опросы" (открываем первые 4 элемента)
        let available_surveys_selectors = document.querySelectorAll(".available_survey");
        for (let index = 0; index < 4; index++) {
            if (available_surveys_selectors[index]) {
                available_surveys_selectors[index].classList.remove("opacity-0");
                unhide(available_surveys_selectors[index]);
            }
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
function create_survey__end_continue(func, create_survey_page) {
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
        if (create_survey_page) {
            /* Сохранение имени и описания вопросов */
            let all_questions = save_questions();
            // Сохраняем id юзера в куки
            let user_id = "id-" + Math.random().toString(16).slice(2);
            if (!getCookie("user_id")) {
                setCookie('user_id', JSON.stringify(user_id), { secure: true, 'max-age': 360000000 });
            }
            else {
                user_id = getCookie("user_id");
            }
            // Сохранение опроса в бд
            const survey_name = getCookie("survey_name");
            let responseRequest = await fetch_post('api/save-survey', { survey_name: survey_name, survey_security_type: getCookie("survey_security_type"), survey_questions: all_questions, creator_id: user_id });
            if (responseRequest.ok && created_surveys) { // если HTTP-статус в диапазоне 200-299
                let response = await responseRequest.json();
                const survey_edit_link = response["edit_link"];
                create_survey_id = response["id"];
                const survey_link = response["survey_link"];
                let cookie_existing_surveys_links = getCookie('survey_links');
                let existing_surveys_links;
                if (cookie_existing_surveys_links) {
                    existing_surveys_links = JSON.parse(cookie_existing_surveys_links);
                }
                else {
                    existing_surveys_links = {};
                }
                existing_surveys_links[create_survey_id] = [survey_edit_link, survey_name, survey_link];
                // Удаление прошлого кр кода
                let last_qr_img = document.querySelector(`#create_survey_page__share--qr img`);
                if (last_qr_img) {
                    create_survey_page__share__qr.removeChild(last_qr_img);
                    create_survey_page__share__qr.removeChild(document.querySelector(`#create_survey_page__share--qr canvas`));
                }
                /* Создания qr кода на сайт */
                // @ts-ignore
                new QRCode(create_survey_page__share__qr, {
                    text: document.URL + `survey--${create_survey_id}`,
                    width: 100,
                    height: 105,
                    colorDark: '#0084FF',
                    colorLight: '#fff',
                    // @ts-ignore
                    correctLevel: QRCode.CorrectLevel.H
                });
                // Создание блоков-ссылок на опросы в "Создать опрос" и "Доступные опросы"
                create_survey(survey_edit_link, create_survey_id, survey_name, survey_link);
                document.getElementById(`available_survey--${create_survey_id}`).addEventListener("mouseover", function () {
                    console.log("Мышь над элементом!");
                });
                // Открываем элемент, если он входит в первые 4 элемента
                let available_surveys_selectors = document.querySelectorAll(".available_survey");
                for (let index = 0; index < 4; index++) {
                    if (available_surveys_selectors[index]) {
                        available_surveys_selectors[index].classList.remove("opacity-0");
                        unhide(available_surveys_selectors[index]);
                    }
                }
                // Корректировка стилей
                after_creating_survey();
                // Установка глобальных значений для переменных пагинации
                let existing_surveys = created_surveys.children;
                create_survey__existing_surveys = {};
                pagination_func(existing_surveys, create_survey__existing_surveys, 1);
                let existing_available_surveys = available_surveys.children;
                available_surveys__existing_surveys = {};
                pagination_func(existing_available_surveys, available_surveys__existing_surveys, 3);
                if (available_surveys__none.parentElement == available_surveys) {
                    available_surveys.removeChild(available_surveys__none);
                }
                if (created_surveys.children.length == 3) {
                    survey_panel__pagination__right_arrow.classList.remove("survey_panel__pagination__arrow--disabled");
                }
                if (available_surveys.children.length == 5) {
                    available_surveys__pagination__right_arrow.classList.remove("survey_panel__pagination__arrow--disabled");
                }
                setCookie('survey_links', JSON.stringify(existing_surveys_links), { secure: true, 'max-age': 360000000, path: "/" });
            }
            else {
                console.log(`Ошибка создания ${responseRequest.status}: ${responseRequest.statusText}`);
            }
        }
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