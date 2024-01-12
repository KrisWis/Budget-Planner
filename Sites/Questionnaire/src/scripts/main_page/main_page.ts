/* Открытие интерфейса создания опроса */
create__survey.addEventListener("click", function (): void {
    create_survey_page.classList.remove("hidden");
    let Y_coordinate: number = Number(document.documentElement.style.getPropertyValue('--Y_coordinate').slice(0, -1));

    for (let element of all_elements) {

        document.documentElement.style.setProperty('--Y_coordinate', String(Y_coordinate) + "%");
        Y_coordinate += 1;

        setTimeout(() => {
            (element as HTMLElement).classList.add("create__survey--class");
            (element as HTMLElement).classList.add("opacity-0");
        }, 250);

        setTimeout(() => {
            hide((element as HTMLElement));
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
            (create_survey_page_name__input as HTMLInputElement).focus();
        });
    }, 700);
})

/* Функционал пагинации в блоке "Создать опрос" (правая стрелочка). */
survey_panel__pagination__right_arrow.addEventListener("click", function (): void {
    create_survey_pagination(survey_panel__pagination__right_arrow, survey_panel__pagination__left_arrow, Object.keys(create_survey__existing_surveys), create_survey__existing_surveys, 2);
});

/* Функционал пагинации в блоке "Создать опрос" (левая стрелочка). */
survey_panel__pagination__left_arrow.addEventListener("click", function (): void {
    create_survey_pagination(survey_panel__pagination__left_arrow, survey_panel__pagination__right_arrow, Object.keys(create_survey__existing_surveys).reverse(), create_survey__existing_surveys, 2);
})


/* Функционал пагинации в блоке "Доступные опросы" (правая стрелочка). */
available_surveys__pagination__right_arrow.addEventListener("click", function (): void {
    create_survey_pagination(available_surveys__pagination__right_arrow, available_surveys__pagination__left_arrow, Object.keys(available_surveys__existing_surveys), available_surveys__existing_surveys, 4);
});

/* Функционал пагинации в блоке "Доступные опросы" (левая стрелочка). */
available_surveys__pagination__left_arrow.addEventListener("click", function (): void {
    create_survey_pagination(available_surveys__pagination__left_arrow, available_surveys__pagination__right_arrow, Object.keys(available_surveys__existing_surveys).reverse(), available_surveys__existing_surveys, 4);
})
