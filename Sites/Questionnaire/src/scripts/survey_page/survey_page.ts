import axios from 'axios';
import { ObjectType } from 'typescript';

/* Берём данные из бд по id этого опроса и вставляем эти данные в страницу */
const survey_id = window.location.href.split("/")[3].slice(7, 1000);
(async function () {
    let responseRequest = await fetch('api/get-survey', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ survey_id: survey_id })
    });

    if (responseRequest.ok) { // если HTTP-статус в диапазоне 200-299

        let response: any = await responseRequest.json();

        // Присвоение имени
        document.querySelector("title").text = `Редактирование опроса | ${response.name}`;
        (create_survey_page_name__input as HTMLInputElement).value = response.name;

        // Присвоение типа безопасности
        if (response.security_type == "anonim" || response.security_type == "all") {
            (anonim__checkbox as HTMLInputElement).checked = true;
        }

        if (response.security_type == "upp_security" || response.security_type == "all") {
            (upp_security__checkbox as HTMLInputElement).checked = true;
        }

        // Присвоение вопросов
        let survey_questions: any = eval('(' + response.survey_questions + ')');
        console.log(survey_questions)
        for (let id in survey_questions) {
            id = id.split("--")[1];
            const survey_questions_request: string =
                `<div class="create_question_active" id="create_question_active--${id}">
                    <section class="create_question__header" id="create_question__header--${id}">

                        <address class="create_question__header--name">
                            <input class="create_question__header--input" type="text" value="Вопрос без заголовка">
                            <i class="fa fa-pencil create_question__header--edit" aria-hidden="true"></i>
                        </address>

                        <i class="fa fa-plus create_question__header--add_desc" id="create_question_header--add_desc--${id}" aria-hidden="true"></i>

                        <address class="create_question__header--desc hidden" id="create_question__header--desc--${id}">
                            <input class="create_question__header--input create_question__header--desc" type="text" value="Подробный текст вопроса">
                            <i class="fa fa-pencil create_question__header--edit" aria-hidden="true"></i>
                        </address>

                    </section>

                    <div class="create_question__add_answer" id="create_question__add_answer--${id}">
                        <i class="fa fa-plus create_question__add_answer--icon" aria-hidden="true"></i>
                        <p>Ответ</p>
                    </div>
                </div>`

            create_questions.insertAdjacentHTML(`afterbegin`,
                survey_questions_request
            );
        }
    } else {
        console.log(`Ошибка создания ${responseRequest.status}: ${responseRequest.statusText}`);
    }
})();

/* Нажатие на конечную кнопку "Cохранить" */
function end_continue(): void {
    window.location.href = "/";
}

ceate_survey__end_continue(end_continue);