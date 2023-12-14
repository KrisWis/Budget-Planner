/* Нажатие на кнопку продолжения после выбора имени опроса */
function page_name_continue(): void {
    create_survey_page__name.classList.add("page_name--class");
    create_survey_page__name.classList.add("opacity-0")

    setTimeout(() => {
        hide(create_survey_page__name);
        unhide(create_survey_page__security);
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
            hide(create_survey_page__security);
            unhide(create_survey_page__create_question);
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

create_survey_page__continue.addEventListener("click", page_name_continue);


/* Функционал того, когда юзер нажимает на добавление подробного описания вопроса. */
create_question__add_desc();


/* Функционал того, что по нажатию на карандашик, таргет делается на инпут */
edit_click_target();

/* Добавление меню выбора типа ответа по нажатию соответствующей кнопки. */
create_question__add_answer.addEventListener("click", function (): void {

    create_question__answers_count++;

    /* Создание вопроса */
    const create_question__request: string =
        `<div class="create_question__answer_types" id="create_question__answer_types--${create_question__answers_count}">

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
        create_question__request
    );


    /* Объявление переменных, созданных после создания опроса */
    create_question__preset_answer__input = document.getElementById(`create_question--preset_answer__input--${create_question__answers_count}`);
    create_question__preset_answer__edit = document.getElementById(`create_question--preset_answer__edit--${create_question__answers_count}`);
    create_question__preset_answer__checkbox = document.getElementById(`create_question__preset_answer--checkbox--${create_question__answers_count}`);
    create_question__preset_answer__menu = document.getElementById(`create_question--preset_answer__menu--${create_question__answers_count}`);
    create_question__open_answer__checkbox = document.getElementById(`create_question__open_answer--checkbox--${create_question__answers_count}`);
    create_question__open_answer__menu = document.getElementById(`create_question--open_answer__menu--${create_question__answers_count}`);

    answer_functions();
})


/* Функционал добавления нового вопроса */
create_question.addEventListener("click", function (): void {
    create_question__count++;

    /* Создание вопроса */
    const create_question__request: string =
        `<div class="create_question_active">
            <section class="create_question__header" id="create_question__header--${create_question__count}">

                <address class="create_question__header--name">
                    <input class="create_question__header--input" type="text" value="Вопрос без заголовка">
                    <i class="fa fa-pencil create_question__header--edit" aria-hidden="true"></i>
                </address>

                <i class="fa fa-plus create_question__header--add_desc" id="create_question_header--add_desc--${create_question__count}" aria-hidden="true"></i>

                <address class="create_question__header--desc hidden" id="create_question__header--desc--${create_question__count}">
                    <input class="create_question__header--input" type="text" value="Подробный текст вопроса">
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
    create_question_header__add_desc = document.getElementById(`create_question_header--add_desc--${create_question__count}`);
    create_question__header__desc = document.getElementById(`create_question__header--desc--${create_question__count}`);
    create_question__add_desc();

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
            `<div class="create_question__answer_types" id="create_question--${create_question__count}__answer_types--${create_question__answers_count}">

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
                        <input class="create_question__preset_answer--checkbox" type="checkbox" id="question--${create_question__count}__preset_answer__correct_answer--checkbox--${create_question__answers_count}">
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
                        <input class="create_question__open_answer--checkbox" type="checkbox" id="question--${create_question__count}__open_answer__correct_answer--checkbox--${create_question__answers_count}">
                        <label for="open_answer__correct_answer--checkbox" class="create_question__open_answer--label"></label>
                    </div>

                </div>

            </div>

        </div>`;

        create_question__header.insertAdjacentHTML(`afterend`,
            create_question__request
        );


        /* Объявление переменных, созданных после создания опроса */
        create_question__preset_answer__input = document.getElementById(`create_question--${create_question__count}--preset_answer__input--${create_question__answers_count}`);
        create_question__preset_answer__edit = document.getElementById(`create_question--${create_question__count}--preset_answer__edit--${create_question__answers_count}`);
        create_question__preset_answer__checkbox = document.getElementById(`create_question--${create_question__count}__preset_answer--checkbox--${create_question__answers_count}`);
        create_question__preset_answer__menu = document.getElementById(`create_question--${create_question__count}--preset_answer__menu--${create_question__answers_count}`);
        create_question__open_answer__checkbox = document.getElementById(`create_question--${create_question__count}__open_answer--checkbox--${create_question__answers_count}`);
        create_question__open_answer__menu = document.getElementById(`create_question--${create_question__count}--open_answer__menu--${create_question__answers_count}`);

        answer_functions();
    })
})


/* Нажатие на конечную кнопку "Cохранить" */
create_questions__save.addEventListener("click", function () {
    create_survey_page__create_question.classList.add("page_name--class");
    create_survey_page__create_question.classList.add("opacity-0");

    setTimeout(() => {
        hide(create_survey_page__create_question);
        unhide(create_survey_page__end);
    }, 400);

    setTimeout(() => {
        create_survey_page__end.classList.add("opacity-1");
        create_survey_page__end.classList.add("page_name--class");
        create_survey_page__continue.classList.remove("create__survey__page--hidden");
        create_survey_page__continue.classList.add("create_survey_page__continue--end");
    }, 700);

    /* Создания qr кода на сайт */
    // @ts-ignore
    const qrcode = new QRCode(create_survey_page__share__qr, {
        text: document.URL,
        width: 100,
        height: 105,
        colorDark: '#0084FF',
        colorLight: '#fff',
        // @ts-ignore
        correctLevel: QRCode.CorrectLevel.H
    });
})


/* Появление оповещения о сохранении ссылки и само сохранение ссылки, по нажатию на кнопку */
create_survey_page__share__link.addEventListener("click", async function () {
    create_survey_page__share__link__pop_up_window.classList.remove("opacity-0");
    setTimeout(() => {
        create_survey_page__share__link__pop_up_window.classList.add("opacity-0");
    }, 1500);
    await navigator.clipboard.writeText(document.URL); // Записываем в буфер обмена ссылку на страницу
})