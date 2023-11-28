/* Открытие интерфейса создания опроса */
const create__survey = document.getElementById("create__survey");
const all_elements = document.querySelectorAll("*:not(html, head, meta, link, title, script, header, .header__settings, .fa-gear, body)");
const panels = document.getElementById("panels");
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
});
//# sourceMappingURL=main.js.map