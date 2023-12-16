/* Открытие интерфейса создания опроса */
create__survey.addEventListener("click", function () {
    let Y_coordinate = Number(document.documentElement.style.getPropertyValue('--Y_coordinate').slice(0, -1));
    for (let element of all_elements) {
        document.documentElement.style.setProperty('--Y_coordinate', String(Y_coordinate) + "%");
        Y_coordinate += 1;
        setTimeout(() => {
            element.classList.add("create__survey--class");
            element.classList.add("opacity-0");
        }, 250);
        setTimeout(() => {
            hide(element);
        }, 1000);
    }
    setTimeout(() => {
        hide(panels);
    }, 400);
    setTimeout(() => {
        create_survey_page__name.classList.add("create__survey--class");
        create_survey_page__name.classList.add("opacity-1");
        create_survey_page__continue.classList.add("opacity-1");
        create_survey_page__security.classList.remove("opacity-1");
    }, 700);
});
//# sourceMappingURL=main_page.js.map