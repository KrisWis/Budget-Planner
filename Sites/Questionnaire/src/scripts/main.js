/* Открытие интерфейса создания опроса */
const create__survey = document.getElementById("create__survey");
const all_elements = document.querySelectorAll("header, .header__settings, .panels, .first_panels, .create_survey_panel, .create_survey__caption, .created_surveys, .create__survey, .create__survey .fa-plus, .survey_panel__pagination_arrows, .survey_panel__pagination__arrow, .survey_panel__pagination__arrow .fa, .available_surveys_panel, .available_surveys__header, .available_surveys__caption, .available_surveys__search, .available_surveys__search input, .available_surveys__search .fa-search, .available_surveys, .available_surveys_panel__pagination_arrows, .available_surveys_panel__pagination__arrow, .available_surveys_panel__pagination__arrow i, .stats, .stats__caption, .stats_panel, .stats_panel--caption, .stats--answers, .stats--answers__pie_chart, .stats--answers__answers, .stats_panel--participants_amount, #stats_panel--participants_amount, .stats--activity, .stats--activity__caption");
const panels = document.getElementById("panels");
const create_survey_page__continue = document.getElementById("create_survey_page__continue");
create__survey.addEventListener("click", function () {
    let Y_coordinate = 0;
    for (let element of all_elements) {
        element.style.transform = `translateY(${Y_coordinate}%)`;
        Y_coordinate += 1;
        setTimeout(() => {
            element.style.transform = 'translateY(1000%)';
            element.style.opacity = '0';
        }, 250);
    }
    setTimeout(() => {
        panels.style.display = "none";
    }, 400);
    setTimeout(() => {
        create_survey_page__name.style.opacity = '1';
        create_survey_page__name.style.transform = 'translateY(100%)';
        create_survey_page__continue.style.opacity = '1';
    }, 700);
});
/* Нажатие на кнопку продолжения после выбора имени опроса */
const create_survey_page__name = document.getElementById("create_survey_page__name");
const create_survey_page__name_elements = document.querySelectorAll(".create_survey_type:not(.create_survey_page, .create_survey_page__continue)");
const create_survey_page__security = document.getElementById("create_survey_page__security");
const create_survey_page__create_question = document.getElementById("create_survey_page__create_question");
const anonim__checkbox = document.getElementById("anonim__checkbox");
const upp_security__checkbox = document.getElementById("upp_security__checkbox");
const create_question__types_anonim__icon = document.getElementById("create_question__types--anonim");
const create_question__types_upp_security__icon = document.getElementById("create_question__types--upp_security");
function page_name_continue() {
    create_survey_page__name.style.transform = 'translateY(0%)';
    create_survey_page__name.style.opacity = '0';
    setTimeout(() => {
        create_survey_page__name.style.display = "none";
        create_survey_page__security.style.display = "flex";
    }, 400);
    setTimeout(() => {
        create_survey_page__security.style.opacity = '1';
        create_survey_page__security.style.transform = 'translateY(0%)';
    }, 700);
    create_survey_page__continue.removeEventListener("click", page_name_continue);
    /* Нажатие на кнопку продолжения после выбора типа опроса */
    create_survey_page__continue.addEventListener("click", function () {
        create_survey_page__security.style.transform = 'translateY(-10%)';
        create_survey_page__security.style.opacity = '0';
        create_survey_page__continue.style.transform = 'translateY(-10%)';
        create_survey_page__continue.style.opacity = '0';
        setTimeout(() => {
            create_survey_page__security.style.display = "none";
            create_survey_page__create_question.style.display = "flex";
        }, 400);
        setTimeout(() => {
            create_survey_page__create_question.style.opacity = '1';
            create_survey_page__create_question.style.transform = 'translateY(0%)';
            // Если опция была выбрана, то пусть будет окрашена в синий.
            if (anonim__checkbox.checked) {
                create_question__types_anonim__icon.classList.add("create_question__type--active");
            }
            if (upp_security__checkbox.checked) {
                create_question__types_upp_security__icon.classList.add("create_question__type--active");
            }
        }, 700);
    });
}
create_survey_page__continue.addEventListener("click", page_name_continue);
//# sourceMappingURL=main.js.map