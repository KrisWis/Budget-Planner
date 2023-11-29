/* Открытие интерфейса создания опроса */
const create__survey = document.getElementById("create__survey");
const all_elements = document.querySelectorAll("*:not(html, head, meta, link, title, script, header, .header__settings, .fa-gear, body, .create_survey)");
const panels = document.getElementById("panels");
const create_survey_page = document.getElementById("create_survey_page");
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
        create_survey_page.style.opacity = '1';
        create_survey_page.style.transform = 'translateY(-100%)';
    }, 700);
});
//# sourceMappingURL=main.js.map