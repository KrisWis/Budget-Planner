/* Функция нажатия на кнопку продолжения после выбора типа опроса */
function page_survey_continue(): void {
    create_survey_page__security.classList.add("create__survey__page--hidden");
    create_survey_page__continue.classList.add("create__survey__page--hidden");
    body.classList.add("overflow-y-on");

    setTimeout(() => {
        hide(create_survey_page__security);
        unhide(create_survey_page__create_question);

        // Если опция была выбрана, то пусть будет окрашена в синий.
        if ((anonim__checkbox as HTMLInputElement).checked && (upp_security__checkbox as HTMLInputElement).checked) {
            if ((anonim__checkbox as HTMLInputElement).checked) {
                create_question__types_anonim__icon.classList.add("create_question__type--active");

                /* Сохранение типа опроса в Cookie */
                setCookie('survey_security_type', 'anonim', { secure: true, 'max-age': 3600 });
            }

            if ((upp_security__checkbox as HTMLInputElement).checked) {
                create_question__types_upp_security__icon.classList.add("create_question__type--active");

                /* Сохранение типа опроса в Cookie */
                setCookie('survey_security_type', 'upp_security', { secure: true, 'max-age': 3600 });
            }
        } else {
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
function page_name_continue(): void {
    create_survey_page__name.classList.add('opacity-0');
    create_survey_page__name.classList.remove('create__survey--class');

    setTimeout(() => {
        create_survey_page__security.classList.add("opacity-1", "page_name--class");
        hide(create_survey_page__name);
    }, 400);

    unhide(create_survey_page__security);

    create_survey_page__continue.removeEventListener("click", page_name_continue);

    setCookie('survey_name', (create_survey_page_name__input as HTMLInputElement).value, { secure: true, 'max-age': 3600 });

    /* Нажатие на кнопку продолжения после выбора типа опроса */
    create_survey_page__continue.addEventListener("click", page_survey_continue);
}

create_survey_page__continue.addEventListener("click", page_name_continue);

/* Добавление меню выбора типа ответа по нажатию соответствующей кнопки. */
create_question__add_answer.addEventListener("click", function (): void {

    create_question__answers_count++;

    /* Создание вопроса */
    const create_question__request: string =
        `<div class="create_question__answer_types" id="create_question--2--answer_types--${create_question__answers_count}">

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

    create_question__header.insertAdjacentHTML(`afterend`,
        create_question__request
    );

    /* Объявление переменных, созданных после создания опроса и активация функций в создании ответа */
    const create_question__preset_answer__input: HTMLElement = document.getElementById(`create_question--preset_answer__input--${create_question__answers_count}`);
    const create_question__preset_answer__edit: HTMLElement = document.getElementById(`create_question--preset_answer__edit--${create_question__answers_count}`);
    const create_question__preset_answer__checkbox: HTMLElement = document.getElementById(`create_question__preset_answer--checkbox--${create_question__answers_count}`);
    const create_question__preset_answer__menu: HTMLElement = document.getElementById(`create_question--preset_answer__menu--${create_question__answers_count}`);
    const create_question__open_answer__checkbox: HTMLElement = document.getElementById(`create_question__open_answer--checkbox--${create_question__answers_count}`);
    const create_question__open_answer__menu: HTMLElement = document.getElementById(`create_question--open_answer__menu--${create_question__answers_count}`);
    const create_question__delete: HTMLElement = document.getElementById(`create_question--${create_question__count}--answer_types--delete--${create_question__answers_count}`);
    const question: HTMLElement = document.getElementById(`create_question--2--answer_types--${create_question__answers_count}`);
    const create_question_active: HTMLElement = document.getElementById("create_question_active--2");

    answer_functions(create_question__preset_answer__edit, create_question__preset_answer__input, create_question__preset_answer__checkbox,
        create_question__preset_answer__menu, create_question__open_answer__menu, create_question__open_answer__checkbox, create_question__delete,
        create_question_active, question);
})


/* Функционал добавления нового вопроса */
create_question.addEventListener("click", function (): void {
    create_question__count++;

    /* Создание вопроса */
    const create_question__request: string =
        `<div class="create_question_active" id="create_question_active--${create_question__count}">
            <section class="create_question__header" id="create_question__header--${create_question__count}">

                <address class="create_question__header--name">
                    <input class="create_question__header--input" type="text" value="Вопрос без заголовка">
                    <i class="fa fa-pencil create_question__header--edit" aria-hidden="true"></i>
                </address>

                <i class="fa fa-plus create_question__header--add_desc" id="create_question_header--add_desc--${create_question__count}" aria-hidden="true"></i>

                <address class="create_question__header--desc hidden" id="create_question__header--desc--${create_question__count}">
                    <input class="create_question__header--input create_question__header--desc" type="text" value="Подробный текст вопроса">
                    <i class="fa fa-pencil create_question__header--edit" aria-hidden="true"></i>
                </address>

            </section>

            <div class="create_question__add_answer" id="create_question__add_answer--${create_question__count}">
                <i class="fa fa-plus create_question__add_answer--icon" aria-hidden="true"></i>
                <p>Ответ</p>
            </div>
        </div>`;

    create_question.insertAdjacentHTML(`beforebegin`,
        create_question__request
    );

    /* Функционал того, когда юзер нажимает на добавление подробного описания вопроса. */
    create_question__add_desc(create_question__count);

    /* Функционал того, что по нажатию на карандашик, таргет делается на инпут */
    create_question__header__inputs = document.querySelectorAll(`#create_question__header--${create_question__count} .create_question__header--input`);
    create_question__header__edits = document.querySelectorAll(`#create_question__header--${create_question__count} .create_question__header--edit`);
    edit_click_target();

    /* Добавление меню выбора типа ответа по нажатию соответствующей кнопки. */
    const create_question__add_answer: HTMLElement = document.getElementById(`create_question__add_answer--${create_question__count}`);
    const create_question__header: HTMLElement = document.getElementById(`create_question__header--${create_question__count}`);
    create_question__answers_count = 0;
    create_question__add_answer.addEventListener("click", function (): void {

        create_question__answers_count++;

        /* Создание вопроса */
        const create_question__request: string =
            `<div class="create_question__answer_types" id="create_question--${create_question__count}--answer_types--${create_question__answers_count}">

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

        create_question__header.insertAdjacentHTML(`afterend`,
            create_question__request
        );


        /* Объявление переменных, созданных после создания опроса и активация функций в создании ответа */
        const create_question__preset_answer__input: HTMLElement = document.getElementById(`create_question--${create_question__count}--preset_answer__input--${create_question__answers_count}`);
        const create_question__preset_answer__edit: HTMLElement = document.getElementById(`create_question--${create_question__count}--preset_answer__edit--${create_question__answers_count}`);
        const create_question__preset_answer__checkbox: HTMLElement = document.getElementById(`create_question--${create_question__count}__preset_answer--checkbox--${create_question__answers_count}`);
        const create_question__preset_answer__menu: HTMLElement = document.getElementById(`create_question--${create_question__count}--preset_answer__menu--${create_question__answers_count}`);
        const create_question__open_answer__checkbox: HTMLElement = document.getElementById(`create_question--${create_question__count}__open_answer--checkbox--${create_question__answers_count}`);
        const create_question__open_answer__menu: HTMLElement = document.getElementById(`create_question--${create_question__count}--open_answer__menu--${create_question__answers_count}`);
        const create_question__delete: HTMLElement = document.getElementById(`create_question--${create_question__count}--answer_types--delete--${create_question__answers_count}`);
        const question: HTMLElement = document.getElementById(`create_question--${create_question__count}--answer_types--${create_question__answers_count}`);
        const create_question_active: HTMLElement = document.getElementById(`create_question_active--${create_question__count}`);

        answer_functions(create_question__preset_answer__edit, create_question__preset_answer__input, create_question__preset_answer__checkbox,
            create_question__preset_answer__menu, create_question__open_answer__menu, create_question__open_answer__checkbox, create_question__delete,
            create_question_active, question);
    })
})


/* Нажатие на конечную кнопку "Cохранить" */
create_questions__save.addEventListener("click", async function (): Promise<void> {

    if (document.querySelectorAll(".create_question__answer_types").length < 2) {
        save__answers_error.classList.remove("hidden");
        setTimeout(() => {
            save__answers_error.classList.add("hidden");
        }, 3000);
        return
    }

    if (Array.from(document.querySelectorAll(".create_question--correct_checkbox")).filter((v: HTMLInputElement) => v.checked).length != 1) {
        save__correct_error.classList.remove("hidden");
        setTimeout(() => {
            save__correct_error.classList.add("hidden");
        }, 3000);
        return
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

    /* Сохранение имени и описания вопроса в Cookie */
    const questions: NodeList = document.querySelectorAll(".create_question_active");

    let all_questions: Question = {};
    for (let question of questions) {
        let question_id: string = (question as HTMLElement).id;
        let question_name: string = (document.querySelector(`#${question_id} .create_question__header--input`) as HTMLInputElement).value;
        let question_desc: string = (document.querySelector(`#${question_id} .create_question__header--desc`) as HTMLInputElement).value;

        let answers: NodeList = document.querySelectorAll(`#${question_id} .create_question__answer_types`);
        let all_answers: Answer = {};
        for (let answer of answers) {
            let answers_id: number = Number((answer as HTMLElement).id.split("--")[3]);
            let answer_type: string = (document.querySelector(`#${question_id} #create_question__preset_answer--checkbox--${answers_id}`) as HTMLInputElement).checked ? 'preset' : 'open';
            let answer_correct: boolean;

            if (answer_type == 'preset') {
                answer_correct = (document.querySelector(`#${question_id} .create_question__open_answer--checkbox`) as HTMLInputElement).checked;
            } else {
                answer_correct = (document.querySelector(`#${question_id} .create_question__preset_answer--checkbox`) as HTMLInputElement).checked;
            }

            let answer_text: string = (document.getElementById(`create_question--preset_answer__input--${answers_id}`) as HTMLInputElement).value;

            all_answers[`${answers_id}`] = { type: answer_type, correct: answer_correct, answer_text: answer_text };
        }

        all_questions[(question as HTMLElement).id] = { name: question_name, desc: question_desc, answers: all_answers }
    }

    // Сохранение опроса в бд
    const survey_name: string = getCookie("survey_name");
    let responseRequest = await fetch('api/save-survey', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ survey_name: survey_name, survey_security_type: getCookie("survey_security_type"), survey_questions: all_questions })
    });

    if (responseRequest.ok) { // если HTTP-статус в диапазоне 200-299

        let response: Response = await responseRequest.json();

        const survey_link: string = response["link"];
        const survey_id: string = response["id"];
        let existing_surveys_links: any = getCookie('survey_links');
        if (existing_surveys_links) {
            existing_surveys_links = JSON.parse(existing_surveys_links);
        } else {
            existing_surveys_links = {};
        }
        existing_surveys_links[survey_id] = [survey_link, survey_name];

        const create_link__request: string =
            `<a href="${survey_link}" class="survey opacity-0 create__survey--hide_animation" id="survey--${survey_id}">

                <h3 class="survey--caption">${survey_name}</h3>

                <div class="survey__edit">
                    <p>Редактировать</p>
                    <i class="fa fa-edit" aria-hidden="true"></i>
                </div>
            
            </a>`;

        created_surveys.insertAdjacentHTML(`beforeend`,
            create_link__request
        );

        setCookie('survey_links', JSON.stringify(existing_surveys_links), { secure: true, 'max-age': 360000000 });

        let existing_surveys: HTMLCollection = created_surveys.children;
        existing_surveys_dict = {};
        for (let el of existing_surveys) {
            if (Array.from(existing_surveys).indexOf(el) > 1) {
                existing_surveys_dict[el.id] = "unselect";
            } else {
                existing_surveys_dict[el.id] = "select";
            }
        }

        if (created_surveys.children.length <= 2) {
            survey_panel__pagination__right_arrow.classList.remove("survey_panel__pagination__arrow--disabled");
        }
    } else {
        console.log(`Ошибка создания ${responseRequest.status}: ${responseRequest.statusText}`);
    }

    /* Нажатие на кнопку "Сохранить" на конечной странице создания опроса */
    create_survey_page__continue.removeEventListener("click", page_survey_continue);

    function page_end_continue(): void {
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
                unhide((element as HTMLElement));
            }, 500);

            setTimeout(() => {
                (element as HTMLElement).classList.remove("create__survey--class", "opacity-0");
            }, 700);
        }

        create_survey__pop_up_window_survey_created.classList.remove("opacity-0");
        setTimeout(() => {
            create_survey__pop_up_window_survey_created.classList.add("opacity-0");
        }, 1500);

        create_survey_page__continue.removeEventListener("click", page_end_continue);

        setTimeout(() => {
            /* Приводим всё к тому, как и было в начале опроса: обнуляем стили, чекбоксы. */
            create_survey_page__name.classList.remove("opacity-1", "create__survey--class", "page_name--class", "opacity-0", "hidden");
            create_survey_page__continue.classList.remove("page_name--class", "opacity-0", "opacity-1", 'create_survey');
            create_survey_page__security.classList.remove("create__survey__page--hidden", "page_name--class");
            create_survey_page__create_question.classList.remove("opacity-0");
            (anonim__checkbox as HTMLInputElement).checked = false;
            (upp_security__checkbox as HTMLInputElement).checked = false;

            /* Добавление некоторых новых стилей. */
            create_survey_page__name.classList.add("create_survey_page__name--new");
            create_survey_page__security.classList.add("create_survey_page__security--new");
            create_survey_page__create_question.classList.add("create_survey_page__create_question--new");

            /* Удаляем, созданные в прошлой сессии, ответы на вопросы. */
            const create_question__answer_types: NodeList = document.querySelectorAll(".create_question__answer_types");

            for (let answer of create_question__answer_types) {

                const question_id: string = (answer as HTMLElement).id.split("--")[1];
                const create_question_active: HTMLElement = document.getElementById(`create_question_active--${question_id}`);

                if (answer.parentElement == create_question_active) {
                    create_question_active.removeChild(answer);
                }
            }

            /* Удаляем сами, созданные в прошлой сессии, вопросы. */
            const create_questions_active: NodeList = document.querySelectorAll(".create_question_active:not(#create_question_active--2)");
            create_questions_active.forEach((question) => { create_questions.removeChild(question) });

        }, 500);

        create_survey_page__continue.addEventListener("click", page_name_continue);
    }
    create_survey_page__continue.addEventListener("click", page_end_continue)
})


/* Появление оповещения о сохранении ссылки и само сохранение ссылки, по нажатию на кнопку */
create_survey_page__share__link.addEventListener("click", async function () {
    create_survey_page__share__link__pop_up_window.classList.remove("opacity-0");
    setTimeout(() => {
        create_survey_page__share__link__pop_up_window.classList.add("opacity-0");
    }, 1500);
    await navigator.clipboard.writeText(document.URL); // Записываем в буфер обмена ссылку на страницу
})


/* Функционал пагинации в блоке "Создать опрос" (правая стрелочка). */
survey_panel__pagination__right_arrow.addEventListener("click", function (): void {
    create_survey_pagination(survey_panel__pagination__right_arrow, survey_panel__pagination__left_arrow, Object.keys(existing_surveys_dict));
});

/* Функционал пагинации в блоке "Создать опрос" (левая стрелочка). */
survey_panel__pagination__left_arrow.addEventListener("click", function (): void {
    create_survey_pagination(survey_panel__pagination__left_arrow, survey_panel__pagination__right_arrow, Object.keys(existing_surveys_dict).reverse());
})