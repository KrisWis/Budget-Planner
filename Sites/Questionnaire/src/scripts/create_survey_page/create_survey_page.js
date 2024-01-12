/* Функция нажатия на кнопку продолжения после выбора типа опроса */
function page_survey_continue() {
    create_survey_page__security.classList.add("create__survey__page--hidden");
    create_survey_page__continue.classList.add("create__survey__page--hidden");
    body.classList.add("overflow-y-on");
    setTimeout(() => {
        hide(create_survey_page__security);
        unhide(create_survey_page__create_question);
        // Если опция была выбрана, то пусть будет окрашена в синий.
        if (anonim__checkbox.checked && upp_security__checkbox.checked) {
            create_question__types_anonim__icon.classList.add("create_question__type--active");
            create_question__types_upp_security__icon.classList.add("create_question__type--active");
            /* Сохранение типа опроса в Cookie */
            setCookie('survey_security_type', 'all', { secure: true, 'max-age': 3600 });
        }
        else if (anonim__checkbox.checked) {
            create_question__types_anonim__icon.classList.add("create_question__type--active");
            /* Сохранение типа опроса в Cookie */
            setCookie('survey_security_type', 'anonim', { secure: true, 'max-age': 3600 });
        }
        else if (upp_security__checkbox.checked) {
            create_question__types_upp_security__icon.classList.add("create_question__type--active");
            /* Сохранение типа опроса в Cookie */
            setCookie('survey_security_type', 'upp_security', { secure: true, 'max-age': 3600 });
        }
        else {
            setCookie('survey_security_type', 'none', { secure: true, 'max-age': 3600 });
        }
    }, 400);
    setTimeout(() => {
        create_survey_page__create_question.classList.add("opacity-1", "page_name--class");
        /* Функционал того, когда юзер нажимает на добавление подробного описания вопроса. */
        create_question__add_desc(2);
        /* Функционал того, что по нажатию на карандашик, таргет делается на инпут */
        create_question__header__inputs = document.querySelectorAll(".create_question__header--input");
        create_question__header__edits = document.querySelectorAll(".create_question__header--edit");
        edit_click_target();
    }, 700);
}
/* Нажатие на кнопку продолжения после выбора имени опроса */
function page_name_continue() {
    create_survey_page__name.classList.add('opacity-0');
    create_survey_page__name.classList.remove('create__survey--class');
    setTimeout(() => {
        create_survey_page__security.classList.add("opacity-1", "page_name--class");
        hide(create_survey_page__name);
    }, 400);
    unhide(create_survey_page__security);
    create_survey_page__continue.removeEventListener("click", page_name_continue);
    setCookie('survey_name', create_survey_page_name__input.value, { secure: true, 'max-age': 3600 });
    /* Нажатие на кнопку продолжения после выбора типа опроса */
    create_survey_page__continue.addEventListener("click", page_survey_continue);
}
create_survey_page__continue.addEventListener("click", page_name_continue);
/* Добавление меню выбора типа ответа по нажатию соответствующей кнопки. */
if (create_question__add_answer) {
    create_question__add_answer.addEventListener("click", function () {
        create_question__answers_count++;
        /* Создание вопроса */
        const create_question__request = `<div class="create_question__answer_types" id="create_question--2--answer_types--${create_question__answers_count}">
    
                <div class="create_question__answer_types--delete" id="create_question--${create_question__count}--answer_types--delete--${create_question__answers_count}">
                    <i class="fa fa-close" aria-hidden="true"></i>
                </div>
    
                <div class="create_question__answer_type answer_types--preset_answer">
    
                    <div class="create_question--preset_answer__interface">
                        <i class="fa fa-address-book-o create_question__answer_type--icon" aria-hidden="true"></i>
                        <p class="create_question__answer_type--caption">Предустановленный ответ</p>
                        <input class="create_question__answer_type--radio" type="radio" id="create_question__preset_answer--checkbox--${create_question__answers_count}">
                    </div>
    
                    <div class="create_question--preset_answer__menu hidden" id="create_question--preset_answer__menu--${create_question__answers_count}">
    
                        <div class="create_question--preset_answer__text">
                            <input class="create_question__header--input" type="text" placeholder="Введите вариант ответа" id="create_question--preset_answer__input--${create_question__answers_count}">
                            <i class="fa fa-pencil create_question__header--edit" aria-hidden="true" id="create_question--preset_answer__edit--${create_question__answers_count}"></i>
                        </div>
    
                        <div class="create_question--preset_answer__correct_answer">
                            <p>Это правильный ответ</p>
                            <input class="create_question--correct_checkbox create_question__preset_answer--checkbox" type="checkbox" id="preset_answer__correct_answer--checkbox--${create_question__answers_count}">
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
                            <input class="create_question--correct_checkbox create_question__open_answer--checkbox" type="checkbox" id="open_answer__correct_answer--checkbox--${create_question__answers_count}">
                            <label for="open_answer__correct_answer--checkbox" class="create_question__open_answer--label"></label>
                        </div>
    
                    </div>
    
                </div>
    
            </div>`;
        create_question__header.insertAdjacentHTML(`afterend`, create_question__request);
        /* Объявление переменных, созданных после создания опроса и активация функций в создании ответа */
        const create_question__preset_answer__input = document.getElementById(`create_question--preset_answer__input--${create_question__answers_count}`);
        const create_question__preset_answer__edit = document.getElementById(`create_question--preset_answer__edit--${create_question__answers_count}`);
        const create_question__preset_answer__checkbox = document.getElementById(`create_question__preset_answer--checkbox--${create_question__answers_count}`);
        const create_question__preset_answer__menu = document.getElementById(`create_question--preset_answer__menu--${create_question__answers_count}`);
        const create_question__open_answer__checkbox = document.getElementById(`create_question__open_answer--checkbox--${create_question__answers_count}`);
        const create_question__open_answer__menu = document.getElementById(`create_question--open_answer__menu--${create_question__answers_count}`);
        const create_question__delete = document.getElementById(`create_question--${create_question__count}--answer_types--delete--${create_question__answers_count}`);
        const question = document.getElementById(`create_question--${create_question__count}--answer_types--${create_question__answers_count}`);
        const create_question_active = document.getElementById("create_question_active--${create_question__count}");
        answer_functions(create_question__preset_answer__edit, create_question__preset_answer__input, create_question__preset_answer__checkbox, create_question__preset_answer__menu, create_question__open_answer__menu, create_question__open_answer__checkbox, create_question__delete, create_question_active, question);
    });
}
/* Функционал добавления нового вопроса */
create_question.addEventListener("click", function () {
    create_question__count++;
    /* Создание вопроса */
    while (document.getElementById(`create_question_active--${create_question__count}`)) {
        create_question__count++;
    }
    const create_question__request = `<div class="create_question_active" id="create_question_active--${create_question__count}">
            <section class="create_question__header" id="create_question__header--${create_question__count}">

                <address class="create_question__header--name">
                    <input class="create_question__header--input" type="text" value="Вопрос без заголовка">
                    <i class="fa fa-pencil create_question__header--edit" aria-hidden="true"></i>
                </address>

                <i class="fa fa-plus create_question__header--add_desc" id="create_question_header--add_desc--${create_question__count}" aria-hidden="true"></i>

                <address class="create_question__header--desc hidden" id="create_question__header--desc--${create_question__count}">
                    <input class="create_question__header--input create_question__header--desc_input" type="text" value="Подробный текст вопроса">
                    <i class="fa fa-pencil create_question__header--edit" aria-hidden="true"></i>
                </address>

            </section>

            <div class="create_question__add_answer" id="create_question__add_answer--${create_question__count}">
                <i class="fa fa-plus create_question__add_answer--icon" aria-hidden="true"></i>
                <p>Ответ</p>
            </div>
        </div>`;
    create_question.insertAdjacentHTML(`beforebegin`, create_question__request);
    /* Функционал того, когда юзер нажимает на добавление подробного описания вопроса. */
    create_question__add_desc(create_question__count);
    /* Функционал того, что по нажатию на карандашик, таргет делается на инпут */
    create_question__header__inputs = document.querySelectorAll(`#create_question__header--${create_question__count} .create_question__header--input`);
    create_question__header__edits = document.querySelectorAll(`#create_question__header--${create_question__count} .create_question__header--edit`);
    edit_click_target();
    /* Добавление меню выбора типа ответа по нажатию соответствующей кнопки. */
    const create_question__add_answer = document.getElementById(`create_question__add_answer--${create_question__count}`);
    const create_question__header = document.getElementById(`create_question__header--${create_question__count}`);
    create_answer(create_question__add_answer, create_question__header, create_question__count);
});
/* Функция конечного "Сохранить" */
async function page_end_continue() {
    body.classList.remove("overflow-y-on");
    create_survey_page__end.classList.remove("page_name--class");
    create_survey_page__continue.classList.add("page_name--class");
    setTimeout(() => {
        create_survey_page__end.classList.add("opacity-0");
        create_survey_page__continue.classList.add("opacity-0");
    }, 200);
    for (let element of all_elements) {
        document.documentElement.style.setProperty('--Y_coordinate', "0%");
        setTimeout(() => {
            unhide(element);
        }, 500);
        setTimeout(() => {
            element.classList.remove("create__survey--class", "opacity-0");
        }, 700);
    }
    if (create_survey__pop_up_window_survey_created) {
        create_survey__pop_up_window_survey_created.classList.remove("opacity-0");
        setTimeout(() => {
            create_survey__pop_up_window_survey_created.classList.add("opacity-0");
        }, 1500);
        /* Сохранение имени и описания вопросов */
        const questions = document.querySelectorAll(".create_question_active");
        let all_questions = {};
        for (let question of questions) {
            let question_id = question.id;
            let question_name = document.querySelector(`#${question_id} .create_question__header--input`).value;
            let question_desc = document.querySelector(`#${question_id} .create_question__header--desc_input`).value;
            let answers = document.querySelectorAll(`#${question_id} .create_question__answer_types`);
            let all_answers = {};
            for (let answer of answers) {
                let answers_id = Number(answer.id.split("--")[3]);
                let answer_type;
                if (document.querySelector(`#${question_id} #create_question__preset_answer--checkbox--${answers_id}`)) {
                    answer_type = document.querySelector(`#${question_id} #create_question__preset_answer--checkbox--${answers_id}`).checked ? 'preset' : 'open';
                }
                else {
                    answer_type = "open";
                }
                let answer_correct;
                if (answer_type == 'preset') {
                    answer_correct = document.getElementById(`preset_answer__correct_answer--checkbox--${answers_id}`).checked;
                }
                else {
                    answer_correct = document.getElementById(`open_answer__correct_answer--checkbox--${answers_id}`).checked;
                }
                let answer_text = document.getElementById(`create_question--preset_answer__input--${answers_id}`).value;
                all_answers[`${answers_id}`] = { type: answer_type, correct: String(answer_correct), answer_text: answer_text };
            }
            all_questions[question.id] = { name: question_name, desc: question_desc, answers: all_answers };
        }
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
        let responseRequest = await fetch('api/save-survey', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ survey_name: survey_name, survey_security_type: getCookie("survey_security_type"), survey_questions: all_questions, creator_id: user_id })
        });
        if (responseRequest.ok && created_surveys) { // если HTTP-статус в диапазоне 200-299
            let response = await responseRequest.json();
            const survey_edit_link = response["edit_link"];
            const survey_id = response["id"];
            const survey_link = response["survey_link"];
            let existing_surveys_links = getCookie('survey_links');
            if (existing_surveys_links) {
                existing_surveys_links = JSON.parse(existing_surveys_links);
            }
            else {
                existing_surveys_links = {};
            }
            existing_surveys_links[survey_id] = [survey_edit_link, survey_name, survey_link];
            // Добавление ссылки на опрос в "Создать опрос"
            let create_link__request = `<a href="${survey_edit_link}" class="survey opacity-0 hidden create__survey--hide_animation" id="survey--${survey_id}">

                <h3 class="survey--caption">${survey_name}</h3>

                <div class="survey__edit">
                    <p>Редактировать</p>
                    <i class="fa fa-edit" aria-hidden="true"></i>
                </div>
            
            </a>`;
            created_surveys.insertAdjacentHTML(`beforeend`, create_link__request);
            let survey = document.querySelector(".survey");
            survey.classList.remove("opacity-0");
            unhide(survey);
            available_surveys__none.classList.add("hidden");
            let existing_surveys = created_surveys.children;
            create_survey__existing_surveys = {};
            for (let el of existing_surveys) {
                if (Array.from(existing_surveys).indexOf(el) > 1) {
                    create_survey__existing_surveys[el.id] = "unselect";
                }
                else {
                    create_survey__existing_surveys[el.id] = "select";
                }
            }
            // Добавление ссылки на опрос в "доступные вопросы"
            create_link__request =
                `<a href="${survey_link}" class="available_survey opacity-0 hidden" id="available_survey--${survey_id}">
                    <h3 class="available_survey--caption">${survey_name}</h3>
                </a>`;
            available_surveys.insertAdjacentHTML(`afterbegin`, create_link__request);
            let existing_available_surveys = available_surveys.children;
            available_surveys.removeChild(available_surveys__none);
            available_surveys__existing_surveys = {};
            for (let el of existing_available_surveys) {
                if (Array.from(existing_available_surveys).indexOf(el) > 1) {
                    available_surveys__existing_surveys[el.id] = "unselect";
                }
                else {
                    available_surveys__existing_surveys[el.id] = "select";
                }
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
        create_survey_page__continue.removeEventListener("click", page_end_continue);
        setTimeout(() => {
            /* Приводим всё к тому, как и было в начале опроса: обнуляем стили, чекбоксы. */
            create_survey_page__name.classList.remove("opacity-1", "create__survey--class", "page_name--class", "opacity-0", "hidden");
            create_survey_page__continue.classList.remove("page_name--class", "opacity-0", "opacity-1", 'create_survey');
            create_survey_page__security.classList.remove("create__survey__page--hidden", "page_name--class");
            create_survey_page__create_question.classList.remove("opacity-0");
            anonim__checkbox.checked = false;
            upp_security__checkbox.checked = false;
            /* Добавление некоторых новых стилей. */
            create_survey_page__name.classList.add("create_survey_page__name--new");
            create_survey_page__security.classList.add("create_survey_page__security--new");
            create_survey_page__create_question.classList.add("create_survey_page__create_question--new");
            /* Удаляем, созданные в прошлой сессии, ответы на вопросы. */
            const create_question__answer_types = document.querySelectorAll(".create_question__answer_types");
            for (let answer of create_question__answer_types) {
                const question_id = answer.id.split("--")[1];
                const create_question_active = document.getElementById(`create_question_active--${question_id}`);
                if (answer.parentElement == create_question_active) {
                    create_question_active.removeChild(answer);
                }
            }
            /* Удаляем сами, созданные в прошлой сессии, вопросы. */
            const create_questions_active = document.querySelectorAll(".create_question_active:not(#create_question_active--2)");
            create_questions_active.forEach((question) => { create_questions.removeChild(question); });
        }, 500);
        create_survey_page__continue.addEventListener("click", page_name_continue);
    }
}
/* Нажатие на конечную кнопку "Cохранить" */
ceate_survey__end_continue(page_end_continue);
/* Появление оповещения о сохранении ссылки и само сохранение ссылки, по нажатию на кнопку */
create_survey_page__share__link.addEventListener("click", async function () {
    create_survey_page__share__link__pop_up_window.classList.remove("opacity-0");
    setTimeout(() => {
        create_survey_page__share__link__pop_up_window.classList.add("opacity-0");
    }, 1500);
    await navigator.clipboard.writeText(document.URL); // Записываем в буфер обмена ссылку на страницу
});
//# sourceMappingURL=create_survey_page.js.map