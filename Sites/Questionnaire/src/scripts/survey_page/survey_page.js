// Объявление переменных
let survey_questions;
// TODO: сделать так, чтобы один и тот же юзер мог пройти опрос только один раз
(async function () {
    // Базовые данные
    const survey_id = window.location.href.split("/")[3].split("--")[1];
    const survey__questions = document.getElementById("survey__questions");
    // Получаем данные опроса из бд
    let responseRequest = await fetch_post('api/get-survey', { survey_id: survey_id });
    if (responseRequest.ok) { // если HTTP-статус в диапазоне 200-299
        let response = await responseRequest.json();
        survey_name = response.name;
        // Присвоение имени
        document.querySelector("title").text = survey_name;
        // Присвоение типа безопасности
        const create_question__types_anonim__icon = document.getElementById("create_question__types--anonim");
        const create_question__types_upp_security__icon = document.getElementById("create_question__types--upp_security");
        if (response.security_type == "anonim" || response.security_type == "all") {
            create_question__types_anonim__icon.classList.add("survey__question_type--active");
        }
        if (response.security_type == "upp_security" || response.security_type == "all") {
            create_question__types_upp_security__icon.classList.add("survey__question_type--active");
        }
        survey_questions = obj_reverse(eval('(' + response.survey_questions + ')'));
        for (let question in survey_questions) {
            let create_question__request = `<div class="survey__question" id="survey__question--${question}">
                    <h3 class="survey__question--caption">${survey_questions[question]["name"]}</h3>
                    <p class="survey__question--desc">${survey_questions[question]["desc"]}</p>
                    
                    <div class="survey__answers" id="survey__answers">
                    </div>
                </div>`;
            survey__questions.insertAdjacentHTML(`afterbegin`, create_question__request);
            const survey__answers = document.getElementById("survey__answers");
            const question__answers = survey_questions[question]["answers"];
            for (let answer in question__answers) {
                let create_answer__request;
                if (question__answers[answer]["type"] == 'preset') {
                    create_answer__request =
                        `<div class="survey__preset_answer survey__answer">
                            <input type="radio" class="survey__preset_answer--checkbox" name="preset_answers--checkboxes" id="survey__preset_answer__checkbox--${answer}">
                            <label class="survey__preset_answer--text" for="survey__preset_answer__checkbox--${answer}">${question__answers[answer]["answer_text"]}</label>
                        </div>`;
                }
                else if (question__answers[answer]["type"] == 'open') {
                    create_answer__request =
                        `<div class="survey__open_answer survey__answer">
                            <input class="survey__open_answer--input" type="text" placeholder="Введите свой вариант ответа">
                        </div>`;
                }
                survey__answers.insertAdjacentHTML(`afterbegin`, create_answer__request);
            }
        }
        // Получение прошлого количества юзеров и добавление к нему одного
        responseRequest = await fetch_post('api/get-survey-users-amount', { survey_id: survey_id });
        let new_users_amount;
        if (responseRequest.ok) { // если HTTP-статус в диапазоне 200-299
            let response = await responseRequest.json();
            new_users_amount = response.users_amount + 1;
        }
        else {
            console.log(`Ошибка создания ${responseRequest.status}: ${responseRequest.statusText}`);
        }
        // TODO: сделать добавление ещё двух параметров статистики сюда
        responseRequest = await fetch_post('api/create-survey-stats', { users_amount: new_users_amount });
    }
    else {
        console.log(`Ошибка создания ${responseRequest.status}: ${responseRequest.statusText}`);
    }
})();
/* Узнавание результатов опроса */
const survey__get_results = document.getElementById("survey__get_results");
function get_results() {
    // Проверка, что на каждый вопрос есть ответ
    let correct_answer = {};
    loop1: for (let question in survey_questions) {
        let survey_preset_answers = document.querySelectorAll(`#survey__question--${question} .survey__preset_answer--checkbox`);
        for (let preset_answer of survey_preset_answers) {
            if (preset_answer.checked) {
                correct_answer[question] = preset_answer;
                break loop1;
            }
        }
        let survey_open_answers = document.querySelectorAll(`#survey__question--${question} .survey__open_answer--input`);
        for (let open_answer of survey_open_answers) {
            if (open_answer.value) {
                correct_answer[question] = open_answer;
                break loop1;
            }
        }
    }
    // Проверка, что правильный ответ есть
    for (let question in survey_questions) {
        if (!correct_answer[question]) {
            alert("У каждого вопроса должен быть выбран правильный ответ!");
            return;
        }
    }
    // Выдача результатов
    for (let question in survey_questions) {
        correct_answer[question].insertAdjacentHTML(`beforebegin`, `<h3>✔ Правильно</h3>`);
    }
    survey__get_results.textContent = "На главную";
    survey__get_results.removeEventListener("click", get_results);
    survey__get_results.addEventListener("click", function () {
        window.location.href = "/";
    });
}
survey__get_results.addEventListener("click", get_results);
//# sourceMappingURL=survey_page.js.map