// Объявление переменных и функций
let survey_questions: Object;
let survey_page_id: string;
interface Month {
    [key: string]: string
}
const monthes: Month = { "1": "Январь", "2": "Февраль", "3": "Март", "4": "Апрель", "5": "Май", "6": "Июнь", "7": "Июль", "8": "Август", "9": "Сентябрь", "10": "Октябрь", "11": "Ноябрь", "12": "Декабрь" };
const survey_user_id: string = getCookie("user_id");

// Функционал самой страницы
(async function () {

    // Базовые данные
    survey_page_id = window.location.href.split("/")[3].split("--")[1];
    const survey__questions: HTMLElement = document.getElementById("survey__questions");

    // Проверка на то, что юзер не проходил этот опрос ранее
    let get_passed_users_responseRequest = await fetch_post('api/get-passed-users', { survey_id: survey_page_id });

    if (get_passed_users_responseRequest.ok) { // если HTTP-статус в диапазоне 200-299

        let response = await get_passed_users_responseRequest.json();
        let survey_passed_users: string[] = eval('(' + response.passed_users + ')')

        if (survey_passed_users) {

            if (survey_passed_users.includes(survey_user_id)) {
                alert("Вы уже проходили этот опрос!");
                window.location.href = "/";
                return;
            }
        }
    } else {
        console.log(`Ошибка создания ${get_passed_users_responseRequest.status}: ${get_passed_users_responseRequest.statusText}`);
    }

    // Получаем данные опроса из бд
    let responseRequest = await fetch_post('api/get-survey', { survey_id: survey_page_id });

    if (responseRequest.ok) { // если HTTP-статус в диапазоне 200-299

        let response: GetSurvey = await responseRequest.json();

        survey_name = response.name;

        // Присвоение имени
        document.querySelector("title").text = survey_name;

        // Присвоение типа безопасности
        const create_question__types_anonim__icon: HTMLElement = document.getElementById("create_question__types--anonim");
        const create_question__types_upp_security__icon: HTMLElement = document.getElementById("create_question__types--upp_security");

        if (response.security_type == "anonim" || response.security_type == "all") {
            create_question__types_anonim__icon.classList.add("survey__question_type--active");
        }

        if (response.security_type == "upp_security" || response.security_type == "all") {
            create_question__types_upp_security__icon.classList.add("survey__question_type--active");
        }

        survey_questions = obj_reverse(eval('(' + response.survey_questions + ')'));

        for (let question in survey_questions) {

            let create_question__request: string =
                `<div class="survey__question" id="survey__question--${question}">
                    <h3 class="survey__question--caption">${survey_questions[question]["name"]}</h3>
                    <p class="survey__question--desc">${survey_questions[question]["desc"]}</p>
                    
                    <div class="survey__answers" id="survey__answers">
                    </div>
                </div>`;

            survey__questions.insertAdjacentHTML(`afterbegin`,
                create_question__request
            );

            const survey__answers: HTMLElement = document.getElementById("survey__answers");
            const question__answers: QuestionAnswers = survey_questions[question]["answers"];

            for (let answer in question__answers) {

                let create_answer__request: string;

                if (question__answers[answer]["type"] == 'preset') {
                    create_answer__request =
                        `<div class="survey__preset_answer survey__answer">
                            <input type="radio" class="survey__preset_answer--checkbox" name="preset_answers--checkboxes--${question}" id="survey__preset_answer__checkbox--${answer}">
                            <label class="survey__preset_answer--text" for="survey__preset_answer__checkbox--${answer}">${question__answers[answer]["answer_text"]}</label>
                        </div>`;

                } else if (question__answers[answer]["type"] == 'open') {
                    create_answer__request =
                        `<div class="survey__open_answer survey__answer">
                            <input class="survey__open_answer--input" id="survey__open_answer__input--${answer}" type="text" placeholder="Введите свой вариант ответа">
                        </div>`;
                }

                survey__answers.insertAdjacentHTML(`afterbegin`,
                    create_answer__request
                );
            }
        }

    } else {
        console.log(`Ошибка создания ${responseRequest.status}: ${responseRequest.statusText}`);
    }
})();

/* Узнавание результатов опроса */
const survey__get_results: HTMLElement = document.getElementById("survey__get_results");
let checked_answers: CheckedAnswers = {};

async function get_results(): Promise<void> {
    // Проверка, что на каждый вопрос есть ответ
    for (let question in survey_questions) {

        let survey_preset_answers: NodeListOf<HTMLElement> = document.querySelectorAll(`#survey__question--${question} .survey__preset_answer--checkbox`);
        for (let preset_answer of survey_preset_answers) {
            if ((preset_answer as HTMLInputElement).checked) {
                checked_answers[question] = preset_answer;
                break;
            }
        }
        let survey_open_answers: NodeListOf<HTMLElement> = document.querySelectorAll(`#survey__question--${question} .survey__open_answer--input`);
        for (let open_answer of survey_open_answers) {
            if ((open_answer as HTMLInputElement).value) {
                checked_answers[question] = open_answer;
                break;
            }
        }
    }

    // Проверка, что правильный ответ есть
    for (let question in survey_questions) {
        if (!checked_answers[question]) {
            alert("У каждого вопроса должен быть выбран правильный ответ!");
            return;
        }
    }

    // Получаем данные опроса из бд и проверяем правильность ответов
    let responseRequest = await fetch_post('api/get-survey', { survey_id: survey_page_id });

    if (responseRequest.ok) { // если HTTP-статус в диапазоне 200-299

        let response: GetSurvey = await responseRequest.json();
        let db_survey_questions: SurveyQuestions | Object = obj_reverse(eval('(' + response.survey_questions + ')'));

        for (let survey_question in db_survey_questions) {

            let survey_answers: SurveyAnswers = db_survey_questions[survey_question].answers;

            for (let survey_answer in survey_answers) {

                if (survey_answers[survey_answer].correct == "true") {

                    if (survey_answer == checked_answers[survey_question].id.split("--")[1]) {

                        checked_answers[survey_question].insertAdjacentHTML(`beforebegin`,
                            `<h3>✔ Правильно</h3>`
                        );
                    } else {
                        checked_answers[survey_question].insertAdjacentHTML(`beforebegin`,
                            `<h3>✘ Неправильно</h3>`
                        );
                    }
                }
            }
        }

    } else {
        console.log(`Ошибка создания ${responseRequest.status}: ${responseRequest.statusText}`);
    }

    // Получение прошлой статы и добавление к ней новой
    responseRequest = await fetch_post('api/get-survey-stats', { survey_id: survey_page_id });
    let new_users_amount: number;
    let answers_percents: AnswersPercents;
    let activity: Activity;

    if (responseRequest.ok) { // если HTTP-статус в диапазоне 200-299

        // Получение и добавление к кол-ву участников
        let response: SurveyStats = await responseRequest.json();

        new_users_amount = response.users_amount + 1;

        // Получение и добавление к процентному соотношению ответов
        if (!response.answers_percents) {
            answers_percents = {};
        } else {
            answers_percents = eval('(' + response.answers_percents + ')');
        }

        let preset_answers: NodeListOf<HTMLLabelElement> = document.querySelectorAll(".survey__preset_answer--text");

        // Делаем итерацию для проверки правильности
        for (let answer of preset_answers) {

            if ((document.getElementById(answer.htmlFor) as HTMLInputElement).checked) {
                if (answers_percents[answer.textContent]) {
                    answers_percents[answer.textContent] += 1;
                } else {
                    answers_percents[answer.textContent] = 1;
                }
            }
        }

        let open_answers: NodeListOf<HTMLElement> = document.querySelectorAll(".survey__open_answer--input");

        for (let answer of open_answers) {
            if ((answer as HTMLInputElement).value) {
                if (answers_percents["Другое"]) {
                    answers_percents["Другое"] += 1;
                } else {
                    answers_percents["Другое"] = 1;
                }
            }
        }

        // Получение времени и статы об активности и добавление к ним
        const date: Date = new Date();
        const now_month: string = monthes[String(date.getMonth() + 1)];

        if (!response.activity) {
            activity = { "Январь": 0, "Февраль": 0, "Март": 0, "Апрель": 0, "Май": 0, "Июнь": 0, "Июль": 0, "Август": 0, "Сентябрь": 0, "Октябрь": 0, "Ноябрь": 0, "Декабрь": 0 };
        } else {
            activity = eval('(' + response.activity + ')');
        }

        activity[now_month] += 1;

    } else {
        console.log(`Ошибка создания ${responseRequest.status}: ${responseRequest.statusText}`);
    }

    responseRequest = await fetch_post('api/update-survey-stats', { survey_id: survey_page_id, users_amount: new_users_amount, answers_percents: answers_percents, activity: activity });

    if (responseRequest.ok) { // если HTTP-статус в диапазоне 200-299

        // Записываем юзера в бд, помечая, что он прошёл опрос
        let add_userID_responseRequest = await fetch_post('api/add-userID', { user_id: survey_user_id, survey_id: survey_page_id });

        if (add_userID_responseRequest.ok) { // если HTTP-статус в диапазоне 200-299

            // Кнопка "На главную"
            survey__get_results.textContent = "На главную";

            survey__get_results.removeEventListener("click", get_results);

            survey__get_results.addEventListener("click", function (): void {
                window.location.href = "/";
            })

        } else {
            console.log(`Ошибка создания ${add_userID_responseRequest.status}: ${add_userID_responseRequest.statusText}`);
        }
    } else {
        console.log(`Ошибка создания ${responseRequest.status}: ${responseRequest.statusText}`);
    }
}

survey__get_results.addEventListener("click", get_results)