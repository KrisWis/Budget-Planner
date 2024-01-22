// Функция для показа ошибки
function show_error(error) {
    error.classList.remove("hidden");
    setTimeout(() => {
        error.classList.add("hidden");
    }, 3000);
}
// Функция для дизактивации стрелочкам пагинации
function disable_pagination_arrows(left_arrow, right_arrow, visible_surveys_length, surveys = []) {
    if (left_arrow) {
        left_arrow.classList.add("survey_panel__pagination__arrow--disabled");
        if (surveys.length <= visible_surveys_length) {
            right_arrow.classList.add("survey_panel__pagination__arrow--disabled");
        }
    }
}
// Функция для создания события, при котором, когда мышь наводиться на опрос её статистика отображается
function survey_stats(survey_id, survey_name) {
    document.getElementById(`available_survey--${survey_id}`).addEventListener("mouseover", async function () {
        // Вывод имени опроса в заголовке
        stats_panel__caption.textContent = survey_name;
        let responseRequest = await fetch_post('api/get-survey-stats', { survey_id: survey_id });
        if (responseRequest.ok) { // если HTTP-статус в диапазоне 200-299
            let response = await responseRequest.json();
            // Вывод количества участников
            stats_panel__participants_amount.textContent = String(response.users_amount);
            // Очистка всех детей элемента перед внедрением в него новых
            stats__answers__answers.innerHTML = "";
            // Вывод процентного соотношения ответов
            let answers_percents = eval("(" + response.answers_percents + ")");
            // Создание рандомного списка цветов, в цикле его заполняем
            let answer_colors = [];
            for (let answer in answers_percents) {
                // Генерация случайного цвета для процентного соотношения
                answer_colors.push(getRandomColor());
                // Внедрение ответа в HTML
                const create_stats__answer__request = `<div class="stats--answer__answer">
                        <div class="stats--answer__answer--color" style="background-color: ${answer_colors[answer_colors.length - 1]}"></div>
                        <p class="stats--answer__answer--text">${answer}</p>
                    </div>`;
                stats__answers__answers.insertAdjacentHTML(`beforeend`, create_stats__answer__request);
            }
            // Создание круговой диограммы
            // Делаем стили для холста
            stats__answers__pie_chart.width = 200;
            stats__answers__pie_chart.height = 200;
            // Функция для рисования кусочка круговой диаграммы
            function drawPieSlice(ctx, centerX, centerY, radius, startAngle, endAngle, color, percents, textX, textY) {
                // Рисуем саму дугу
                ctx.fillStyle = color; // Определяем цвет контекста
                ctx.beginPath(); // Начинаем рисование
                ctx.moveTo(centerX, centerY); // Двигаемся к центру
                ctx.arc(centerX, centerY, radius, startAngle, endAngle); // Рисуем дугу с нужными параметрами
                ctx.closePath(); // Заканчиваем рисование
                ctx.fill(); // Заполняем контекст нашим рисунком
                // Рисуем текст (проценты)
                ctx.beginPath(); // Начинаем рисование
                ctx.font = "16px Gilroy bold"; // Делаем стили для текста
                ctx.fillStyle = "#fff"; // Определяем цвет для текста
                ctx.fillText(`${percents}%`, textX, textY); // Пишем проценты
                ctx.closePath(); // Заканчиваем рисование
                ctx.fill(); // Заполняем контекст нашим рисунком
            }
            class Piechart {
                // Объявляем все типы данных для свойств класса
                options;
                canvas;
                ctx;
                colors;
                // В конструкторе объявляем все переменные
                constructor(options) {
                    this.options = options;
                    this.canvas = options.canvas;
                    this.ctx = this.canvas.getContext("2d");
                    this.colors = options.colors;
                }
                draw() {
                    // Определяем базовые переменные
                    let total_value = 0;
                    let color_index = 0;
                    // Проходимся по всему объекту с процентным соотношением и вычисляем сумму
                    for (let categ in this.options.data) {
                        let val = this.options.data[categ];
                        total_value += val;
                    }
                    // Определяем стартовый угол
                    let start_angle = 0;
                    // Проходимся по всему объекту с процентным соотношением ещё раз и по формуле вычисляем для каждого элемента пирога угол среза.
                    for (let categ in this.options.data) {
                        let val = this.options.data[categ];
                        let slice_angle = 2 * Math.PI * val / total_value;
                        let percents = val / total_value * 100;
                        // Определяем центр холста
                        let centerX = this.canvas.width / 2;
                        let centerY = this.canvas.height / 2;
                        // Определяем переменные для позиционирования текста
                        let pieRadius = Math.min(centerX, centerY); // Определяем радиус
                        // В полярных координатах, для определения X используется косинус, а для определения Y - синус.
                        // centerX + (pieRadius / 2) и centerY + (pieRadius / 2) - определяем радиус конкретной дуги нашего пирога (он везде одинаковый).
                        // А дальше определяем косинус и синус по формуле.
                        let textX = centerX + (pieRadius / 2) * Math.cos(start_angle + slice_angle / 2);
                        let textY = centerY + (pieRadius / 2) * Math.sin(start_angle + slice_angle / 2);
                        // Делаем рисование кусочка пирога
                        drawPieSlice(this.ctx, // Передаём контекст
                        // В качестве центра среза будет центр холста
                        centerX, centerY, 
                        /* В качестве радиуса мы используем минимальное значение между половиной ширины холста и половиной высоты холста,
                        так как мы не хотим, чтобы наш пирог выходил из холста. */
                        pieRadius, 
                        // Передаём начальный угол и конечный, вычисленный по формуле, угол
                        start_angle, start_angle + slice_angle, 
                        // Передаём цвета
                        this.colors[color_index % this.colors.length], 
                        // Передаём проценты
                        Math.floor(percents), textX, textY);
                        // К начальному углу прибавляем текущее значение, чтобы срезы не рисовались на одном и том же месте
                        start_angle += slice_angle;
                        // Делаем следующий цвет
                        color_index++;
                    }
                }
            }
            // Создаём экзепляр класса круговой диаграммы
            let myPiechart = new Piechart({
                canvas: stats__answers__pie_chart,
                data: answers_percents,
                colors: answer_colors
            });
            // Рисуем круговую диаграмму
            myPiechart.draw();
            // Делаем вывод активности
            let answers_acitivity = eval("(" + response.activity + ")");
            // Очистка всех детей элемента перед внедрением в него новых
            stats__activities.innerHTML = "";
            for (let answer in answers_acitivity) {
                // Внедрение ответа в HTML
                const create_activity__request = `<div class="stats__activities--activity">
                        <h5 class="stats__activities--count">${answers_acitivity[answer]}</h5>
                        <div class="stats__activities--col" style="height: ${answers_acitivity[answer] / response.users_amount * 100}%"></div>
                        <time class="stats__activities--month">${answer}</time>
                    </div>`;
                stats__activities.insertAdjacentHTML(`beforeend`, create_activity__request);
            }
        }
        else {
            console.log(`Ошибка создания ${responseRequest.status}: ${responseRequest.statusText}`);
        }
    });
}
// Функционал при загрузке страницы
(function () {
    // Получение и обработка ссылок на все опросы
    let cookie_survey_links = getCookie('survey_links') || null;
    if (cookie_survey_links && created_surveys) {
        let survey_links = JSON.parse(cookie_survey_links);
        for (let id in survey_links) {
            // Создание блоков-ссылок на опросы в "Создать опрос" и "Доступные опросы"
            create_survey(survey_links[id][0], id, survey_links[id][1], survey_links[id][2]);
            // Создание события наведения мыши для опроса
            survey_stats(id, survey_links[id][1]);
        }
        // Устанавливаем стили для опросов на первой странице, и делаем функционал для корректной пагинации
        after_creating_survey();
        // Настройка стилей для элементов блока "Доступные опросы" (открываем первые 4 элемента)
        let available_surveys_selectors = document.querySelectorAll(".available_survey");
        for (let index = 0; index < 4; index++) {
            if (available_surveys_selectors[index]) {
                available_surveys_selectors[index].classList.remove("opacity-0");
                unhide(available_surveys_selectors[index]);
            }
        }
        // Настройка пагинации
        let existing_surveys = created_surveys.children;
        pagination_func(existing_surveys, create_survey__existing_surveys, 1);
        let existing_available_surveys = available_surveys.children;
        available_surveys.removeChild(available_surveys__none);
        available_surveys__existing_surveys = {};
        pagination_func(existing_available_surveys, available_surveys__existing_surveys, 3);
        // Дизактивация стрелочек пагинации, если элементов нету
        disable_pagination_arrows(survey_panel__pagination__left_arrow, survey_panel__pagination__right_arrow, 2, existing_surveys);
        disable_pagination_arrows(available_surveys__pagination__left_arrow, available_surveys__pagination__right_arrow, 4, existing_available_surveys);
    }
    else {
        // Дизактивация стрелочек пагинации, если элементов нету
        disable_pagination_arrows(survey_panel__pagination__left_arrow, survey_panel__pagination__right_arrow, 1);
        disable_pagination_arrows(available_surveys__pagination__left_arrow, available_surveys__pagination__right_arrow, 1);
    }
}());
/* Функция нажатия на конечную кнопку "Cохранить" */
function create_survey__end_continue(func, create_survey_page) {
    create_questions__save.addEventListener("click", async function () {
        if (document.querySelectorAll(".create_question__answer_types").length < 2) {
            show_error(save__answers_error);
            return;
        }
        let questions = document.querySelectorAll(".create_question_active");
        for (let question of questions) {
            if (Array.from(document.querySelectorAll(`#${question.id} .create_question--correct_checkbox`)).filter((v) => v.checked).length != 1) {
                show_error(save__correct_error);
                return;
            }
        }
        create_survey_page__create_question.classList.add("page_name--class", "opacity-0");
        setTimeout(() => {
            hide(create_survey_page__create_question);
            unhide(create_survey_page__end);
        }, 400);
        setTimeout(() => {
            create_survey_page__end.classList.add("opacity-1", "page_name--class");
            create_survey_page__end.classList.remove("opacity-0");
            create_survey_page__continue.classList.remove("create__survey__page--hidden");
            create_survey_page__continue.classList.add("create_survey_page__continue--end");
        }, 700);
        // Удаление прошлого кр кода
        let last_qr_img = document.querySelector(`#create_survey_page__share--qr img`);
        if (last_qr_img) {
            create_survey_page__share__qr.removeChild(last_qr_img);
            create_survey_page__share__qr.removeChild(document.querySelector(`#create_survey_page__share--qr canvas`));
        }
        /* Создания qr кода на сайт */
        // @ts-ignore
        new QRCode(create_survey_page__share__qr, {
            text: document.URL + `survey--${create_survey_id}`,
            width: 100,
            height: 105,
            colorDark: '#0084FF',
            colorLight: '#fff',
            // @ts-ignore
            correctLevel: QRCode.CorrectLevel.H
        });
        if (create_survey_page) {
            /* Сохранение имени и описания вопросов */
            let all_questions = save_questions();
            // Сохраняем id юзера в куки
            let user_id = "id-" + Math.random().toString(16).slice(2);
            if (!getCookie("user_id")) {
                setCookie('user_id', JSON.stringify(user_id), { secure: true, 'max-age': 360000000 });
            }
            else {
                user_id = getCookie("user_id");
            }
            // Сохранение опроса в бд
            const survey_name = getCookie("survey_name");
            let responseRequest = await fetch_post('api/save-survey', { survey_name: survey_name, survey_security_type: getCookie("survey_security_type"), survey_questions: all_questions, creator_id: user_id });
            if (responseRequest.ok && created_surveys) { // если HTTP-статус в диапазоне 200-299
                let response = await responseRequest.json();
                const survey_edit_link = response["edit_link"];
                create_survey_id = response["id"];
                const survey_link = response["survey_link"];
                let cookie_existing_surveys_links = getCookie('survey_links');
                let existing_surveys_links;
                if (cookie_existing_surveys_links) {
                    existing_surveys_links = JSON.parse(cookie_existing_surveys_links);
                }
                else {
                    existing_surveys_links = {};
                }
                existing_surveys_links[create_survey_id] = [survey_edit_link, survey_name, survey_link];
                // Создание блоков-ссылок на опросы в "Создать опрос" и "Доступные опросы"
                create_survey(survey_edit_link, create_survey_id, survey_name, survey_link);
                // Создание события наведения мыши для опроса
                survey_stats(create_survey_id, survey_name);
                // Открываем элемент, если он входит в первые 4 элемента
                let available_surveys_selectors = document.querySelectorAll(".available_survey");
                for (let index = 0; index < 4; index++) {
                    if (available_surveys_selectors[index]) {
                        available_surveys_selectors[index].classList.remove("opacity-0");
                        unhide(available_surveys_selectors[index]);
                    }
                }
                // Корректировка стилей
                after_creating_survey();
                // Установка глобальных значений для переменных пагинации
                let existing_surveys = created_surveys.children;
                create_survey__existing_surveys = {};
                pagination_func(existing_surveys, create_survey__existing_surveys, 1);
                let existing_available_surveys = available_surveys.children;
                available_surveys__existing_surveys = {};
                pagination_func(existing_available_surveys, available_surveys__existing_surveys, 3);
                if (available_surveys__none.parentElement == available_surveys) {
                    available_surveys.removeChild(available_surveys__none);
                }
                if (created_surveys.children.length == 3) {
                    survey_panel__pagination__right_arrow.classList.remove("survey_panel__pagination__arrow--disabled");
                }
                if (available_surveys.children.length == 5) {
                    available_surveys__pagination__right_arrow.classList.remove("survey_panel__pagination__arrow--disabled");
                }
                setCookie('survey_links', JSON.stringify(existing_surveys_links), { secure: true, 'max-age': 360000000, path: "/" });
            }
            else {
                console.log(`Ошибка создания ${responseRequest.status}: ${responseRequest.statusText}`);
            }
        }
        /* Нажатие на кнопку "Сохранить" на конечной странице создания опроса */
        create_survey_page__continue.removeEventListener("click", page_survey_continue);
        create_survey_page__continue.addEventListener("click", func);
    });
}
// Функция для создания функционала для создания нового ответа
function create_answer(create_question__add_answer, create_question__header, create_question__count) {
    create_question__answers_count = 0;
    create_question__add_answer.addEventListener("click", function () {
        create_question__answers_count++;
        /* Создание вопроса */
        const create_question__request = `<div class="create_question__answer_types" id="create_question--${create_question__count}--answer_types--${create_question__answers_count}">

                <div class="create_question__answer_types--delete" id="create_question--${create_question__count}--answer_types--delete--${create_question__answers_count}">
                    <i class="fa fa-close" aria-hidden="true"></i>
                </div>

                <div class="create_question__answer_type answer_types--preset_answer">

                    <div class="create_question--preset_answer__interface">
                        <i class="fa fa-address-book-o create_question__answer_type--icon" aria-hidden="true"></i>
                        <p class="create_question__answer_type--caption">Предустановленный ответ</p>
                        <input class="create_question__answer_type--radio" type="radio" id="create_question--${create_question__count}__preset_answer--checkbox--${create_question__answers_count}">
                    </div>

                    <div class="create_question--preset_answer__menu hidden" id="create_question--${create_question__count}--preset_answer__menu--${create_question__answers_count}">

                        <div class="create_question--preset_answer__text">
                            <input class="create_question__header--input" type="text" placeholder="Введите вариант ответа" id="create_question--${create_question__count}--preset_answer__input--${create_question__answers_count}">
                            <i class="fa fa-pencil create_question__header--edit" aria-hidden="true" id="create_question--${create_question__count}--preset_answer__edit--${create_question__answers_count}"></i>
                        </div>

                        <div class="create_question--preset_answer__correct_answer">
                            <p>Это правильный ответ</p>
                            <input class="create_question--correct_checkbox create_question__preset_answer--checkbox" type="checkbox" id="question--${create_question__count}__preset_answer__correct_answer--checkbox--${create_question__answers_count}">
                            <label for="preset_answer__correct_answer--checkbox"></label>
                        </div>

                    </div>

                </div>

                <div class="create_question__answer_type answer_types--open_answer">

                    <div class="create_question--open_answer__interface">
                        <i class="fa fa-address-card-o create_question__answer_type--icon" aria-hidden="true"></i>
                        <p class="create_question__answer_type--caption">Форма открытого ответа</p>
                        <input class="create_question__answer_type--radio" type="radio" id="create_question--${create_question__count}__open_answer--checkbox--${create_question__answers_count}">
                    </div>

                    <div class="create_question--open_answer__menu hidden" id="create_question--${create_question__count}--open_answer__menu--${create_question__answers_count}">

                        <div class="create_question--open_answer__text">
                            <input class="create_question__open_answer--input" type="text" placeholder="Тут пользователь сможет ввести свой ответ" id="create_question--${create_question__count}--open_answer__input--${create_question__answers_count}">
                        </div>

                        <div class="create_question--open_answer__correct_answer">
                            <p>Это правильный ответ</p>
                            <input class="create_question--correct_checkbox create_question__open_answer--checkbox" type="checkbox" id="question--${create_question__count}__open_answer__correct_answer--checkbox--${create_question__answers_count}">
                            <label for="open_answer__correct_answer--checkbox" class="create_question__open_answer--label"></label>
                        </div>

                    </div>

                </div>

        </div>`;
        create_question__header.insertAdjacentHTML(`afterend`, create_question__request);
        /* Объявление переменных, созданных после создания опроса и активация функций в создании ответа */
        const create_question__preset_answer__input = document.getElementById(`create_question--${create_question__count}--preset_answer__input--${create_question__answers_count}`);
        const create_question__preset_answer__edit = document.getElementById(`create_question--${create_question__count}--preset_answer__edit--${create_question__answers_count}`);
        const create_question__preset_answer__checkbox = document.getElementById(`create_question--${create_question__count}__preset_answer--checkbox--${create_question__answers_count}`);
        const create_question__preset_answer__menu = document.getElementById(`create_question--${create_question__count}--preset_answer__menu--${create_question__answers_count}`);
        const create_question__open_answer__checkbox = document.getElementById(`create_question--${create_question__count}__open_answer--checkbox--${create_question__answers_count}`);
        const create_question__open_answer__menu = document.getElementById(`create_question--${create_question__count}--open_answer__menu--${create_question__answers_count}`);
        const create_question__delete = document.getElementById(`create_question--${create_question__count}--answer_types--delete--${create_question__answers_count}`);
        const question = document.getElementById(`create_question--${create_question__count}--answer_types--${create_question__answers_count}`);
        const create_question_active = document.getElementById(`create_question_active--${create_question__count}`);
        answer_functions(create_question__preset_answer__edit, create_question__preset_answer__input, create_question__preset_answer__checkbox, create_question__preset_answer__menu, create_question__open_answer__menu, create_question__open_answer__checkbox, create_question__delete, create_question_active, question);
    });
}
//# sourceMappingURL=main.js.map