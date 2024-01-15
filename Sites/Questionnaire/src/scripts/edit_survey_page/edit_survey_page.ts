// Базовые данные
let survey_id: string = window.location.href.split("/")[3].split("--")[1];
const user_id: string = getCookie("user_id");

// Функция для выполнения прошлого функционала ответов
function answers_func(answer_checkbox: HTMLElement, question_answers: Object, answer_id: string, question_id: string): void {
    answer_checkbox.click();
    if (question_answers[answer_id]["correct"] == 'true') {
        (document.getElementById(`question--${question_id}__preset_answer__correct_answer--checkbox--${answer_id}`) as HTMLInputElement).checked = true;
    }
    (document.getElementById(`create_question--${question_id}--preset_answer__input--${answer_id}`) as HTMLInputElement).value = question_answers[answer_id]["answer_text"];

}

/* Берём данные из бд по id этого опроса и вставляем эти данные в страницу */
let survey_name: string;
anonim__checkbox = document.getElementById("anonim__checkbox");
upp_security__checkbox = document.getElementById("upp_security__checkbox");
create_question__types_anonim__icon = document.getElementById("create_question__types--anonim");
create_question__types_upp_security__icon = document.getElementById("create_question__types--upp_security");

(async function () {

    // Если id юзера не равно id создателя опроса, то отбираем доступ к странице у этого злоумышленника
    let responseRequest_creatorID = await fetch_post('api/get-survey-creatorID', { survey_id: survey_id });

    if (responseRequest_creatorID.ok) { // если HTTP-статус в диапазоне 200-299

        let response: any = await responseRequest_creatorID.json();

        if (user_id != response.creator_id) {
            alert("Вы не имеете доступа к этой странице!");
            window.location.href = "/";
        }

    } else {
        alert(`Ошибка создания ${responseRequest_creatorID.status}: ${responseRequest_creatorID.statusText}`);
    }

    // Получаем данные опроса из бд
    let responseRequest = await fetch_post('api/get-survey', { survey_id: survey_id });

    if (responseRequest.ok) { // если HTTP-статус в диапазоне 200-299

        let response: any = await responseRequest.json();

        survey_name = response.name;

        // Присвоение имени
        document.querySelector("title").text = `Редактирование опроса | ${survey_name}`;
        (create_survey_page_name__input as HTMLInputElement).value = survey_name;

        // Присвоение типа безопасности
        if (response.security_type == "anonim" || response.security_type == "all") {
            (anonim__checkbox as HTMLInputElement).checked = true;
        }

        if (response.security_type == "upp_security" || response.security_type == "all") {
            (upp_security__checkbox as HTMLInputElement).checked = true;
        }

        // Присвоение вопросов
        let survey_questions: any = eval('(' + response.survey_questions + ')');
        for (let id in obj_reverse(survey_questions)) {
            const question_id: string = id.split("--")[1];
            const survey_questions_request: string =
                `<div class="create_question_active" id="create_question_active--${question_id}">
                    <section class="create_question__header" id="create_question__header--${question_id}">

                        <address class="create_question__header--name">
                            <input class="create_question__header--input" type="text" value="${survey_questions[id]["name"]}">
                            <i class="fa fa-pencil create_question__header--edit" aria-hidden="true"></i>
                        </address>

                        <address class="create_question__header--desc" id="create_question__header--desc--${question_id}">
                            <input class="create_question__header--input create_question__header--desc_input" type="text" value="${survey_questions[id]["desc"]}">
                            <i class="fa fa-pencil create_question__header--edit" aria-hidden="true"></i>
                        </address>

                    </section>

                    <div class="create_question__add_answer" id="create_question__add_answer--${question_id}">
                        <i class="fa fa-plus create_question__add_answer--icon" aria-hidden="true"></i>
                        <p>Ответ</p>
                    </div>
                </div>`

            create_questions.insertAdjacentHTML(`afterbegin`,
                survey_questions_request
            );

            const create_question__add_answer: HTMLElement = document.getElementById(`create_question__add_answer--${question_id}`);
            const create_question__header: HTMLElement = document.getElementById(`create_question__header--${question_id}`);

            create_answer(create_question__add_answer, create_question__header, question_id);

            // Создание старых ответов
            const question_answers = survey_questions[id]["answers"];
            for (let answer_id in question_answers) {
                const survey_answers_request: string =
                    `<div class="create_question__answer_types" id="create_question--${question_id}--answer_types--${answer_id}">

                    <div class="create_question__answer_types--delete" id="create_question--${question_id}--answer_types--delete--${answer_id}">
                        <i class="fa fa-close" aria-hidden="true"></i>
                    </div>

                    <div class="create_question__answer_type answer_types--preset_answer">

                        <div class="create_question--preset_answer__interface">
                            <i class="fa fa-address-book-o create_question__answer_type--icon" aria-hidden="true"></i>
                            <p class="create_question__answer_type--caption">Предустановленный ответ</p>
                            <input class="create_question__answer_type--radio" type="radio" id="create_question--${question_id}__preset_answer--checkbox--${answer_id}">
                        </div>

                        <div class="create_question--preset_answer__menu hidden" id="create_question--${question_id}--preset_answer__menu--${answer_id}">

                            <div class="create_question--preset_answer__text">
                                <input class="create_question__header--input" type="text" placeholder="Введите вариант ответа" id="create_question--${question_id}--preset_answer__input--${answer_id}">
                                <i class="fa fa-pencil create_question__header--edit" aria-hidden="true" id="create_question--${question_id}--preset_answer__edit--${answer_id}"></i>
                            </div>

                            <div class="create_question--preset_answer__correct_answer">
                                <p>Это правильный ответ</p>
                                <input class="create_question--correct_checkbox create_question__preset_answer--checkbox" type="checkbox" id="question--${question_id}__preset_answer__correct_answer--checkbox--${answer_id}">
                                <label for="preset_answer__correct_answer--checkbox"></label>
                            </div>

                        </div>

                    </div>

                    <div class="create_question__answer_type answer_types--open_answer">

                        <div class="create_question--open_answer__interface">
                            <i class="fa fa-address-card-o create_question__answer_type--icon" aria-hidden="true"></i>
                            <p class="create_question__answer_type--caption">Форма открытого ответа</p>
                            <input class="create_question__answer_type--radio" type="radio" id="create_question--${question_id}__open_answer--checkbox--${answer_id}">
                        </div>

                        <div class="create_question--open_answer__menu hidden" id="create_question--${question_id}--open_answer__menu--${answer_id}">

                            <div class="create_question--open_answer__text">
                                <input class="create_question__open_answer--input" type="text" placeholder="Тут пользователь сможет ввести свой ответ" id="create_question--${question_id}--open_answer__input--${answer_id}">
                            </div>

                            <div class="create_question--open_answer__correct_answer">
                                <p>Это правильный ответ</p>
                                <input class="create_question--correct_checkbox create_question__open_answer--checkbox" type="checkbox" id="question--${question_id}__open_answer__correct_answer--checkbox--${answer_id}">
                                <label for="open_answer__correct_answer--checkbox" class="create_question__open_answer--label"></label>
                            </div>

                        </div>

                    </div>

                </div>`

                create_question__header.insertAdjacentHTML(`afterend`,
                    survey_answers_request
                );

                /* Объявление переменных, созданных после создания опроса и активация функций в создании ответа */
                const create_question__preset_answer__input: HTMLElement = document.getElementById(`create_question--${question_id}--preset_answer__edit--${answer_id}`);
                const create_question__preset_answer__edit: HTMLElement = document.getElementById(`create_question--${question_id}--preset_answer__edit--${answer_id}`);
                const create_question__preset_answer__checkbox: HTMLElement = document.getElementById(`create_question--${question_id}__preset_answer--checkbox--${answer_id}`);
                const create_question__preset_answer__menu: HTMLElement = document.getElementById(`create_question--${question_id}--preset_answer__menu--${answer_id}`);
                const create_question__open_answer__checkbox: HTMLElement = document.getElementById(`create_question--${question_id}__open_answer--checkbox--${answer_id}`);
                const create_question__open_answer__menu: HTMLElement = document.getElementById(`create_question--${question_id}--open_answer__menu--${answer_id}`);
                const create_question__delete: HTMLElement = document.getElementById(`create_question--${question_id}--answer_types--delete--${answer_id}`);
                const question: HTMLElement = document.getElementById(`create_question--${question_id}--answer_types--${answer_id}`);
                const create_question_active: HTMLElement = document.getElementById(`create_question_active--${question_id}`);

                answer_functions(create_question__preset_answer__edit, create_question__preset_answer__input, create_question__preset_answer__checkbox,
                    create_question__preset_answer__menu, create_question__open_answer__menu, create_question__open_answer__checkbox, create_question__delete,
                    create_question_active, question);

                // Выполнение старого функционала для ответов
                if (question_answers[answer_id]["type"] == "preset") {
                    answers_func(create_question__preset_answer__checkbox, question_answers, answer_id, question_id);

                } else if (question_answers[answer_id]["type"] == "open") {
                    answers_func(create_question__open_answer__checkbox, question_answers, answer_id, question_id);
                }
            }
        }
    } else {
        console.log(`Ошибка создания ${responseRequest.status}: ${responseRequest.statusText}`);
    }
})();

/* Нажатие на конечную кнопку "Cохранить" */
async function end_continue(): Promise<void> {
    /* Сохранение имени и описания вопросов */
    let all_questions: Question = save_questions();

    // Сохранение опроса в куки
    let existing_surveys_links: any = getCookie('survey_links');
    if (existing_surveys_links) {
        existing_surveys_links = JSON.parse(existing_surveys_links);
    } else {
        existing_surveys_links = {};
    }
    survey_name = (create_survey_page_name__input as HTMLInputElement).value;
    existing_surveys_links[survey_id] = [window.location.href, survey_name];
    setCookie('survey_links', JSON.stringify(existing_surveys_links), { secure: true, 'max-age': 360000000, path: "/" });

    // Сохранение опроса в бд
    let responseRequest = await fetch_post('api/update-survey', { survey_name: survey_name, survey_security_type: getCookie("survey_security_type"), survey_questions: all_questions, survey_id: survey_id });

    if (responseRequest.ok) { // если HTTP-статус в диапазоне 200-299
        window.location.href = "/";
    } else {
        console.log(`Ошибка создания ${responseRequest.status}: ${responseRequest.statusText}`);
    }
}

create_survey__end_continue(end_continue, false);