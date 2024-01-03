import axios from 'axios';

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

        let response: Survey = await responseRequest.json();
        console.log(response);
        document.querySelector("title").text = `Редактирование опроса | ${response.name}`;
        (create_survey_page_name__input as HTMLInputElement).value = response.name;
        // TODO: Сделать, чтобы все эти полученные данные использовались на этой странице
    } else {
        console.log(`Ошибка создания ${responseRequest.status}: ${responseRequest.statusText}`);
    }
})();

/* Нажатие на конечную кнопку "Cохранить" */
function end_continue(): void {
    window.location.href = "/";
}

ceate_survey__end_continue(end_continue);