/* Объявляем переменные */
let dropZone = document.querySelector("div"),
    input = document.querySelector("input"),
    file,
    text,
    progress,
    volume,
    audio,
    frequencyArray;

/* Получение аудио файла если его перетащят в dropzone. */
dropZone.ondrop = e => {
    // отключаем поведение браузера по умолчанию
    e.preventDefault();
    // осуществляем проверку
    if (e.dataTransfer.items[0].kind == "file") {
        // получаем файл
        file = e.dataTransfer.items[0].getAsFile();
    } else return;
    // передаем файл
    for (let audio of audios) { // Проходимся по всем запущенным аудио файлам и останавливаем их.
        if (!audio.paused) {
            audio.pause();
        }
    }
    playTrack(file); // Передаём файл в функцию для самого плеера.
};

// Событие ondragover запускается, когда элемент "переносят".
dropZone.ondragover = e => {
    // отключаем поведение браузера по умолчанию
    e.preventDefault();
};

// Если пользователь кликнул по зоне
dropZone.onclick = () => {
    // Делаем клик по инпуту
    input.click();
    // при изменении инпута
    input.onchange = () => {
        // получаем файл
        file = input.files[0];
        if (file) {
            for (let audio of audios) { // Проходимся по всем запущенным аудио файлам и останавливаем их.
                if (!audio.paused) {
                    audio.pause();
                }
            }
            // Передаём файл в функцию для самого плеера.
            playTrack(file);
        }
    };
};

// Объявляем переменные для холста:
let C = document.querySelector("canvas"),
    $ = C.getContext("2d"),
    W = (C.width = innerWidth),
    H = (C.height = innerHeight),
    centerX = W / 2,
    centerY = H / 2,
    radius,
    // эту переменную мы будем использовать для определения текущего прогресса
    piece,
    // количество колонок (палочек, которые становяться больше или меньше, когда музыка играет)
    bars = 200,
    x,
    y,
    xEnd,
    yEnd,
    // ширина колонки
    barWidth = 2,
    // высота колонки
    barHeight,
    // цвет колонки
    lineColor;


// Выводим в консоль ниструкцию по управлению
console.log(
    "Используй клавиатуру: \n Пробел для пуска/паузы \n Enter для паузы \n Стрелочки, чтобы изменять \n Время и Громкость \nЧтобы изменить аудио файл кликните по плееру"
);

// Код плеера
let audios = []; // Массив для хранения всех аудио файлов
let keyboardEvent;
function playTrack(file) {
    // Убираем зону
    dropZone.classList.add("dropzone_start");

    text = document.querySelector("p");

    text.classList.add("ready");

    // Добавляем и определяем теги и переменные звука и прогресса
    text.innerHTML = `progress: <span class="progress"></span> <br> volume: <span class="volume"></span>`;

    volume = document.querySelector(".volume");

    progress = document.querySelector(".progress");

    audio = new Audio();
    audios.push(audio); // Добавляем аудио файл в массив
    // аудио контекст представляет собой объект, состоящий из аудио модулей
    // он управляет созданием узлов и выполняет обработку (декодирование) аудио данных
    context = new AudioContext();
    // анализатор представляет собой узел, содержащий актуальную (т.е. постоянно обновляющуюся) информацию о частотах и времени воспроизведения
    // он используется для анализа и визуализации аудио данных
    analyser = context.createAnalyser();

    // метод URL.createObjectURL() создает DOMString, содержащий URL с указанием на объект, заданный как параметр
    // он позволяет загружать файлы из любого места на жестком диске
    // время жизни URL - сессия браузера
    audio.src = URL.createObjectURL(file);
    // определяем источник звука
    source = context.createMediaElementSource(audio);
    // подключаем к источнику звука анализатор
    source.connect(analyser);
    // подключаем к анализатору "выход" звука - акустическая система устройства
    analyser.connect(context.destination);

    // получаем так называемый байтовый массив без знака на основе длины буфера
    // данный массив содержит информацию о частотах
    frequencyArray = new Uint8Array(analyser.frequencyBinCount);

    // запускаем воспроизведение
    audio.play();

    // включаем повтор воспроизведения
    audio.loop = true;
    // Вешаем события для обработки запросов с клавиатуры.
    function keyboardListener(e) {
        e.preventDefault(); // Убираем функциональность по-умолчанию.
        // необходимость использования try/catch обусловлена странным поведением Chrome, связанным с вычислением громкости звука
        // попробуйте убрать try/catch и выводить в консоль громкость звука (console.log(audio.volume)) после каждого изменения
        // при приближении к 0 и 1 (согласно спецификации значение громкости звука варьируется от 0 до 1) получаем странные значения, которые нивелируют проверки типа if(audio.volume>0 && audio.volume<1)
        // использование в проверках "неточных" значений вроде 0.1 и 0.9 решает проблему исключений, но приводит к некорректному изменению громкости звука
        // исключения работе плеера не мешают, но раздражают
        try {
            // Каждая кнопка имеет свой код и по нему мы определяем на какую именно кнопку нажал пользователь.
            if (e.keyCode == 32) { // пробел
                audio.paused ? audio.play() : audio.pause(); // Если аудио на паузе, то делаем пуск, в ином случае паузу.
            } else if (e.keyCode == 13) { // enter
                audio.pause(); // Останавливаем аудио
            } else if (e.keyCode == 39) { // стрелка вправо
                audio.currentTime += 5; // Увеличиваем текущее время воспроизведения на 5 секунд
            } else if (e.keyCode == 37) { // стрелка влево
                audio.currentTime -= 5; // Уменьшаем текущее время воспроизведения на 5 секунд
            } else if (e.keyCode == 40) { // стрелка вниз
                audio.volume -= 0.1; // Убавляем громкость звука на 10%
            } else if (e.keyCode == 38) { // стрелка вверх
                audio.volume += 0.1; // Увеличиваем громкость звука на 10%
            }
        } catch { // Если юзер нажал что-то другое, то ничего не делаем
            return;
        }
    }

    if (!keyboardEvent) { // Функция для того, чтобы не накладывалось 2 одинаковых события.
        keyboardEvent = true;
        document.addEventListener("keydown", keyboardListener);
    }

    // Вызываем функцию для начала анимации
    startAnimation();

    function startAnimation() {
        // Включаем холст
        C.style.display = "block";

        // Определяем текущий прогресс (текущее время воспроизведения / продолжительность трека)
        piece = audio.currentTime / audio.duration;

        // устанавливаем радиус круга
        // мы будем использовать два радиуса: один для прогресса, другой для визуализации частот
        radius = 105;

        // очищаем холст
        $.clearRect(0, 0, W, H);

        // рисуем круговой прогресс
        $.beginPath(); // Начинаем новый путь
        /* arc() добавляет дугу к пути. Определяем координаты центра дуги, радиус, 
        угол начала дуги и угол конца дуги умножая текущий прогресс на 2 и число ПИ. */
        $.arc(centerX, centerY, radius, 0, Math.PI * (2 * piece));
        $.lineWidth = 30; // Задаём толщину линий в пикселах.
        $.stroke(); // Рисуем фигуру, изначально чёрным цветом.

        // выводим значение громкости. Math.trunc() округляет число.
        volume.innerText = Math.trunc(audio.volume * 100) + "%";

        // выводим значение прогресса
        progress.innerText = Math.trunc(piece * 100) + "%";

        // копируем данные о частотах в frequencyArray. getByteFrequencyData копирует данные о частоте в frequencyArray.
        analyser.getByteFrequencyData(frequencyArray);

        // увеличиваем радиус
        radius = 150;

        /* переводим количество колонок в радианы. 
        Радианы - это углы, соответствующие дуге, длина которой равна её радиусу. Радианы используется для измерения углов. */
        rads = (Math.PI * 2) / bars;

        // Делаем итерацию по количеству колонок
        for (let i = 0; i < bars; i++) {
            // Определяем высоту колонки, беря частоту из массива и умножая её на число. Чем больше число, тем выше колонки.
            barHeight = frequencyArray[i] * 1;

            // двигаемся от 0 по часовой стрелке
            /* Метод Math.cos() возвращает числовое значение от -1 до 1, которое представляет косинус угла.
            Метод Math.sin() возвращает числовое значение от -1 до 1, которое представляет синус переданного (в радианах) угла. */
            x = centerX + Math.cos(rads * i) * radius;
            y = centerY + Math.sin(rads * i) * radius;
            // Значения конечных координат отличаются от обычных только тем, что к ним прибавлена высота колонки.
            xEnd = centerX + Math.cos(rads * i) * (radius + barHeight);
            yEnd = centerY + Math.sin(rads * i) * (radius + barHeight);

            // Запускаем функцию рисования колонки, передавая координаты, конечные координаты, ширину колонки и частоту.
            drawBar(x, y, xEnd, yEnd, barWidth, frequencyArray[i]);
        }

        // зацикливаем анимацию
        requestAnimationFrame(startAnimation);
    }

    function drawBar(xStart, yStart, xEnd, yEnd, width, frequency) {
        // Определяем цвет колонок, используя частоты.
        lineColor = `rgb(${240 + frequency}, ${124 + frequency / 3.5}, ${38 + frequency / 5})`;

        // рисуем линии
        $.strokeStyle = lineColor; // Определяем цвет
        $.lineWidth = width; // Ширина колонки
        $.beginPath(); // Начинаем новый путь рисования
        $.moveTo(xStart, yStart); // Двигаемся к координатам, как к началу точки
        $.lineTo(xEnd, yEnd); // Рисуем линию до конечных координат
        $.stroke(); // Отображаем результат
    }
}
