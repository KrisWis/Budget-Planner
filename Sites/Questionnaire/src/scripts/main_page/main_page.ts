/* Открытие интерфейса создания опроса */
create__survey.addEventListener("click", function (): void {
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
    }, 700);
})

