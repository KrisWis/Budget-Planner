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
        // Если юзер нажимает на карандашик, то таргет делается на инпут
        create_survey_page_name__edit.addEventListener("click", function () {
            create_survey_page_name__input.focus();
        });
    }, 700);
});
/* Функционал пагинации в блоке "Создать опрос" (правая стрелочка). */
survey_panel__pagination__right_arrow.addEventListener("click", function () {
    create_survey_pagination(survey_panel__pagination__right_arrow, survey_panel__pagination__left_arrow, Object.keys(existing_surveys_dict));
});
/* Функционал пагинации в блоке "Создать опрос" (левая стрелочка). */
survey_panel__pagination__left_arrow.addEventListener("click", function () {
    create_survey_pagination(survey_panel__pagination__left_arrow, survey_panel__pagination__right_arrow, Object.keys(existing_surveys_dict).reverse());
});
//# sourceMappingURL=main_page.js.map