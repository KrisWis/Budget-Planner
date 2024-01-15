(async function () {

    // Базовые данные
    const survey_id: string = window.location.href.split("/")[3].split("--")[1];
    const survey__questions: HTMLElement = document.getElementById("survey__questions");

    // Получаем данные опроса из бд
    let responseRequest = await fetch_post('api/get-survey', { survey_id: survey_id });

    if (responseRequest.ok) { // если HTTP-статус в диапазоне 200-299

        let response: any = await responseRequest.json();

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

        let survey_questions: any = obj_reverse(eval('(' + response.survey_questions + ')'));

        for (let question in survey_questions) {

            let create_question__request: string =
                `<div class="survey__question">
                    <h3 class="survey__question--caption">${survey_questions[question]["name"]}</h3>
                    <p class="survey__question--desc">${survey_questions[question]["desc"]}</p>
                    
                    <div class="survey__answers" id="survey__answers">
                    </div>
                </div>`;

            survey__questions.insertAdjacentHTML(`afterbegin`,
                create_question__request
            );

            const survey__answers: HTMLElement = document.getElementById("survey__answers");
            const question__answers: any = survey_questions[question]["answers"];

            for (let answer in question__answers) {

                let create_answer__request: string;

                if (question__answers[answer]["type"] == 'preset') {
                    create_answer__request =
                        `<div class="survey__preset_answer survey__answer">
                            <input type="radio" class="survey__preset_answer--checkbox" name="preset_answers--checkboxes" id="survey__preset_answer__checkbox--${answer}">
                            <label class="survey__preset_answer--text" for="survey__preset_answer__checkbox--${answer}">${question__answers[answer]["answer_text"]}</label>
                        </div>`;
                } else if (question__answers[answer]["type"] == 'open') {
                    create_answer__request =
                        `<div class="survey__open_answer survey__answer">
                            <input class="survey__open_answer--input" type="text" placeholder="Введите свой вариант ответа">
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

survey__get_results.addEventListener("click", function (): void {
    const all_elements: NodeList = document.querySelectorAll(".survey__element");
    for (let element of all_elements) {

        setTimeout(() => {
            (element as HTMLElement).classList.add("opacity-0");
        }, 250);

        setTimeout(() => {
            hide((element as HTMLElement));
        }, 1000);
    }
})