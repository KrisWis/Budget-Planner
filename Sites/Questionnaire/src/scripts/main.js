/* Открытие интерфейса создания опроса */
const create__survey = document.getElementById("create__survey");
const all_elements = document.querySelectorAll("*:not(html, head, meta, link, title, script, header, .header__settings, .fa-gear, body, .create_survey_type, .create_survey)");
const panels = document.getElementById("panels");
const create_survey_page__continue = document.getElementById("create_survey_page__continue");
create__survey.addEventListener("click", function () {
    let Y_coordinate = 0;
    for (let element of all_elements) {
        element.style.transform = `translateY(${Y_coordinate}%)`;
        Y_coordinate += 1;
        setTimeout(() => {
            element.style.transform = 'translateY(100%)';
        }, 250);
    }
    setTimeout(() => {
        panels.style.display = "none";
    }, 400);
    setTimeout(() => {
        create_survey_page__name.style.opacity = '1';
        create_survey_page__name.style.transform = 'translateY(40%)';
        create_survey_page__continue.style.opacity = '1';
    }, 700);
});
/* Нажатие на кнопку продолжения после выбора имени опроса */
const create_survey_page__name = document.getElementById("create_survey_page__name");
const create_survey_page__name_elements = document.querySelectorAll(".create_survey_type:not(.create_survey_page, .create_survey_page__continue)");
const create_survey_page__security = document.getElementById("create_survey_page__security");
create_survey_page__continue.addEventListener("click", function () {
    create_survey_page__name.style.transform = 'translateY(0%)';
    create_survey_page__name.style.opacity = '0';
    setTimeout(() => {
        create_survey_page__name.style.display = "none";
    }, 400);
    setTimeout(() => {
        create_survey_page__security.style.opacity = '1';
        create_survey_page__security.style.transform = 'translateY(0%)';
    }, 700);
});
//# sourceMappingURL=main.js.map