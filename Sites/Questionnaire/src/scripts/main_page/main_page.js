/* Открытие интерфейса создания опроса */
create__survey.addEventListener("click", function () {
    create_survey_page.classList.remove("hidden");
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
// Функция для работы пагинации
function create_survey_pagination(first_arrow, second_arrow, array, dict, surveys_amount) {
    if (!first_arrow.classList.contains("survey_panel__pagination__arrow--disabled")) {
        second_arrow.classList.remove("survey_panel__pagination__arrow--disabled");
        for (let survey_id of array) {
            if (dict[survey_id] == "select") {
                document.getElementById(survey_id).classList.add("opacity-0");
                dict[survey_id] = "unselect";
                setTimeout(() => {
                    document.getElementById(survey_id).classList.add("hidden");
                }, 300);
            }
            else {
                if (Object.values(dict).filter(survey => survey == "select").length < surveys_amount) {
                    setTimeout(() => {
                        document.getElementById(survey_id).classList.remove("hidden");
                        setTimeout(() => {
                            document.getElementById(survey_id).classList.remove("opacity-0");
                        }, 300);
                    }, 300);
                    dict[survey_id] = "select";
                    if (array[array.length - 1] == survey_id) {
                        first_arrow.classList.add("survey_panel__pagination__arrow--disabled");
                        break;
                    }
                }
            }
        }
    }
}
/* Функционал пагинации в блоке "Создать опрос" (правая стрелочка). */
survey_panel__pagination__right_arrow.addEventListener("click", function () {
    create_survey_pagination(survey_panel__pagination__right_arrow, survey_panel__pagination__left_arrow, Object.keys(create_survey__existing_surveys), create_survey__existing_surveys, 2);
});
/* Функционал пагинации в блоке "Создать опрос" (левая стрелочка). */
survey_panel__pagination__left_arrow.addEventListener("click", function () {
    create_survey_pagination(survey_panel__pagination__left_arrow, survey_panel__pagination__right_arrow, Object.keys(create_survey__existing_surveys).reverse(), create_survey__existing_surveys, 2);
});
/* Функционал пагинации в блоке "Доступные опросы" (правая стрелочка). */
available_surveys__pagination__right_arrow.addEventListener("click", function () {
    create_survey_pagination(available_surveys__pagination__right_arrow, available_surveys__pagination__left_arrow, Object.keys(available_surveys__existing_surveys), available_surveys__existing_surveys, 4);
});
/* Функционал пагинации в блоке "Доступные опросы" (левая стрелочка). */
available_surveys__pagination__left_arrow.addEventListener("click", function () {
    create_survey_pagination(available_surveys__pagination__left_arrow, available_surveys__pagination__right_arrow, Object.keys(available_surveys__existing_surveys).reverse(), available_surveys__existing_surveys, 4);
});
//# sourceMappingURL=main_page.js.map