/* Донатеры и комментарии */
let text_donaters = document.getElementById("text_donaters");
let text_comments = document.getElementById("text_comments");
let donaters__section = document.getElementById("donaters_section");
let comments__section = document.getElementById("comments_section");

let changeToActive = function () {
  let text_arr = [text_donaters, text_comments];
  let arr = [donaters__section, comments__section];

  for (const element of text_arr) {

    if (element.classList.contains("text__active") && this !== element) {
      element.classList.remove("text__active");
      arr[text_arr.indexOf(element)].classList.remove("section__active");
    }

    else if (this.classList.contains("text__active") && this == element) {
      arr[text_arr.indexOf(element)].classList.remove("section__active");

    } else if (!this.classList.contains("text__active") && this == element) {
      arr[text_arr.indexOf(element)].classList.add("section__active");
    }
  }

  this.classList.toggle('text__active');
}

eventsObj.addEvent(text_donaters, "click", changeToActive);
eventsObj.addEvent(text_comments, "click", changeToActive);

/* Favourite */
let favourite_button = document.getElementById("favourite_button");
let favourite_icon = document.getElementById("favourite_icon");

let changeToFavourite = function () {
  this.classList.toggle('favourite__active');
}

let changeToFavouriteBind = changeToFavourite.bind(favourite_icon);

eventsObj.addEvent(favourite_button, "click", changeToFavouriteBind);

/* Link */
let link_button = document.getElementById("link_button");
let link_icon = document.getElementById("link_icon");
let link__modal_wrapper = document.getElementById("link__modal-wrapper");

let changeToLinked = function (e) {
  if (e.target == link_button || e.target == link_icon) {
    new ClipboardJS('#link_button'); // Объект для копирования в буфер обмена.
    link_button.setAttribute("data-clipboard-text", document.URL) // Атрибут, в который передаём то, что скопируется в буфер обмена.
    link_icon.classList.toggle('link__active');
    link__modal_wrapper.classList.add('link__modal-wrapper--active');
    setTimeout(() => {
      link__modal_wrapper.classList.remove('link__modal-wrapper--active');
    }, 1000);
  }
}

eventsObj.addEvent(link_button, "click", changeToLinked);

/* Kopistories hint */
let kopistories__hint = document.getElementById("kopistories__hint");
let kopistories__hint_text = document.getElementById("kopistories__hint_text");

let showHint = function () {
  this.classList.toggle("kopistories__hint_text--active");
}

let showHintBind = showHint.bind(kopistories__hint_text);

eventsObj.addEvent(kopistories__hint, "click", showHintBind);

/* Kopistory switchers */
let kopistory__switchers = document.querySelectorAll("#kopistory__switchers span");
kopistory__switchers.forEach(function (entry) {
  eventsObj.addEvent(entry, "click", function () {
    document.querySelector(".kopistory_switcher__active").classList.remove("kopistory_switcher__active");
    this.classList.toggle("kopistory_switcher__active");
  });
})

/* Открытие КОПИстори */
let kopistory__lock = document.getElementById("kopistory__lock");
let body = document.querySelector("body");
let kopistory__modal_wrapper = document.getElementById("kopistory__modal_wrapper");

let OpenKopistory = function () {

  kopistory__modal_wrapper.classList.add('kopistory__modal_wrapper--active');
}

eventsObj.addEvent(kopistory__lock, "click", OpenKopistory);

/* Закрытие КОПИстори */
let kopistory__modal_wrapper__close = document.getElementById("kopistory__modal_wrapper__close");

let CloseKopistory = function () {

  kopistory__modal_wrapper.classList.remove('kopistory__modal_wrapper--active');
}

eventsObj.addEvent(kopistory__modal_wrapper__close, "click", CloseKopistory);

/* Функциональность кнопки "благодарить" */
let thanks__circles = document.querySelectorAll(".thanks__circle");
let donat__thanks_ways = document.querySelectorAll(".donat__thanks_ways");
let thanks_ways__triangles = document.querySelectorAll(".thanks_ways__triangle");

for (let index = 0; index < thanks__circles.length; index++) {
  eventsObj.addEvent(thanks__circles[index], "click", function () { open(donat__thanks_ways[index], thanks_ways__triangles[index]) });
}

// Открытие формы доната
let thanks__comments = document.querySelectorAll(".thanks__comment");
let thanks__cameras = document.querySelectorAll(".thanks__camera");
let thanks__microphones = document.querySelectorAll(".thanks__microphone");
let donats__form = document.getElementById("donats__form");
let donat = document.getElementById("donats__form__donat");
let donat__textarea = document.getElementById("donats__form__textarea");
let donat__buttons = document.getElementById("donats__form__buttons");
let form__image = document.getElementById("form__image");
let form__name = document.getElementById("form__name");
let form__date = document.getElementById("form__date");
let form__money = document.getElementById("form__money");
let donate_comments_form = document.getElementById("donate_comments_form");
let forms__ids = [];
let donate_photos_form = document.getElementById("donate_photos_form");
let donate_voiceMessages_form = document.getElementById("donate_voiceMessages_form");

let openDonateForm = function (id) {
  arguments__arr = Array.prototype.slice.call(arguments);
  arguments__arr.shift();

  for (el of arguments__arr) {
    if (el.classList.contains("open")) {
      setTimeout(function () {
        el.style.display = "none";
      })

      if (forms__ids[forms__ids.length - 1] != id) {

        setTimeout(function () {
          el.classList.toggle('open');
          el.classList.toggle('close');
        }, 500)
      }
    }

    el.style.display = "flex";
    el.classList.toggle('open');
    el.classList.toggle('close');
    setTimeout(function () {
      form__image.src = document.getElementById(`donater__image--${id}`).src;
      form__name.textContent = document.getElementById(`donater__name--${id}`).textContent;
      form__date.textContent = document.getElementById(`donater__date--${id}`).textContent;
      form__money.textContent = document.getElementById(`donater__money--${id}`).textContent;
    }, 200)
  }
  forms__ids.push(id);
}

// Открытие формы донатного комментария
for (let index = 0; index < thanks__comments.length; index++) {
  eventsObj.addEvent(thanks__comments[index], "click", function () { openDonateForm(index + 1, donats__form, donat, donate_comments_form) });
}

// Открытие формы донатной фотографии
for (let index = 0; index < thanks__cameras.length; index++) {
  eventsObj.addEvent(thanks__cameras[index], "click", function () { openDonateForm(index + 1, donats__form, donat, donate_photos_form) });
}

/* Загрузка изображения формы донатной фотографии */
let result;
function download__PhotoForm_image(input) {
  let file = input.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    let donate__img = document.getElementById("donate__img");
    result = reader.result;
    donate__img.src = result;
    donate__img.style.display = "block";
  }
}

// Открытие формы донатного голосового сообщения
for (let index = 0; index < thanks__microphones.length; index++) {
  eventsObj.addEvent(thanks__microphones[index], "click", function () { openDonateForm(index + 1, donats__form, donat, donate_voiceMessages_form) });
}

// Запись голоса для донатного голосового сообщения
const donate__voiceMessage = document.getElementById("donate__voiceMessage")
const donate_voiceMessage__microphone = document.getElementById("donate_voiceMessage__microphone");
const donate_voiceMessage__soundcloud = document.getElementById("donate_voiceMessage__soundcloud");
const donate_voiceMessage__wrapper = document.getElementById("donate_voiceMessage__wrapper");
const audio_track__time = document.getElementById("audio_track--time");
const audio_track__canvas = document.getElementById("audio_track--canvas");
const donate_voiceMessage__audio_track = document.getElementById("donate_voiceMessage--audio_track");
const donate__voiceMessage__record_instruction = document.getElementById("donate__voiceMessage--record_instruction");
let audio_track__canvas__context = audio_track__canvas.getContext("2d");
let record_time_interval_ID;
let record_time_blinks_interval_ID;
let record_time = 0;
let mediaRecorder;

// Функция для обработки событий при записи
function RecordEventListener(e) {
  e.preventDefault(); // Убираем функциональность по-умолчанию.
  try {
    if (e.keyCode == 27) {

      // Выключаем холст
      //audio_track__canvas.style.display = "none";

      // очищаем холст
      //audio_track__canvas__context.clearRect(0, 0, C.width, C.height);

      // Убираем всё, связанное с записью
      clearInterval(record_time_interval_ID);
      clearInterval(record_time_blinks_interval_ID);
      // Останавливаем запись
      mediaRecorder.stop();
      donate__voiceMessage.classList.remove("record");
      record_time = 0;

      // Меняем стили
      for (el of donate_voiceMessage__wrapper__p) {
        el.style.opacity = 1;
      }
      donate_voiceMessages__exit.style.opacity = 0;
      donate_voiceMessage__audio_track.style.opacity = 0;
      setTimeout(() => {
        donate_voiceMessage__audio_track.style.display = "none";
      }, 200);
      donate__voiceMessage__record_instruction.classList.remove("visible");

      eventsObj.addEvent(donate__voiceMessage, "click", dblclick_voiceMessage_event);
    } else if (e.keyCode == 32) { // пробел
      // Если запись активна, то нажатие её останавливает, если не активна, то запускает.
      (donate__voiceMessage.classList.contains("record")) ? ChangeToStop() : ChangeToStart();
    }
  } catch {
    return
  }
};

// Функция запуска
function ChangeToStart() {
  // Включаем запись
  if (mediaRecorder.state != "inactive") {
    mediaRecorder.start();
  }

  // Включаем таймер
  audio_track__time.classList.remove("stop");
  record_time_interval_ID = setInterval(() => {
    record_time += 1;
    audio_track__time.textContent = `${Math.floor(record_time / 60)}:${(record_time % 60 < 10) ? `0${record_time % 60}` : record_time % 60}`;
  }, 1000);
  clearInterval(record_time_blinks_interval_ID);

  // Убираем событие добавления с клавиатуры
  document.removeEventListener("keydown", keyboardListener);

  // Изменяем стили
  donate__voiceMessage.classList.add("record");

  for (el of donate_voiceMessage__wrapper__p) {
    el.style.opacity = 0;
  }

  donate__voiceMessage__record_instruction.classList.add("visible");
  donate_voiceMessages__exit.style.opacity = 1;
  audio_track__time.style.opacity = 1;
  donate_voiceMessage__audio_track.style.opacity = 1;
  setTimeout(() => {
    donate_voiceMessage__audio_track.style.display = "flex";
  }, 300);

  // Добавляем события
  eventsObj.removeEvent(donate__voiceMessage, "click", dblclick_voiceMessage_event);
}

// Функция паузы
function ChangeToStop() {
  // Останавливаем запись
  mediaRecorder.stop();
  donate__voiceMessage.classList.remove("record");

  // Блинкующий таймер
  record_time_blinks_interval_ID = setInterval(() => {
    audio_track__time.classList.toggle("stop");
  }, 1000);
  clearInterval(record_time_interval_ID);
}

navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
    let voice = [];
    mediaRecorder = new MediaRecorder(stream);

    // Вешаем события записи
    document.addEventListener("keydown", RecordEventListener);

    // Когда запись больше не записывается
    mediaRecorder.addEventListener("dataavailable", function (event) {

    });

    // Когда запись остановлена
    mediaRecorder.addEventListener("stop", function () {
      const voiceBlob = new Blob(voice, {
        type: 'audio/wav'
      });
    });
  });

/* Загрузка донатного голосового сообщения */
let donate_voiceMessage__upload_voiceMessage = document.getElementById("donate_voiceMessage__upload_voiceMessage");
function dblclick_voiceMessage_event() {
  donate_voiceMessage__upload_voiceMessage.type = "file";
  eventsObj.addEvent(donate_voiceMessage__upload_voiceMessage, "change", download__VoiceMessage.bind(null, donate_voiceMessage__upload_voiceMessage));
  setTimeout(() => {
    donate_voiceMessage__upload_voiceMessage.type = "";
  }, 5000);
}

eventsObj.addEvent(donate__voiceMessage, "click", dblclick_voiceMessage_event);

let donate__voiceMessage__instruction__p = document.querySelectorAll(".donate__voiceMessage--instruction p");
let donate_voiceMessage__wrapper__p = document.querySelectorAll(".donate_voiceMessage__wrapper p");
let donate_voiceMessages__exit = document.getElementById("donate_voiceMessages--exit");
function download__VoiceMessage(input) {
  $("body").css("cursor", "progress");
  let file = input.files[0];
  if (file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      playTrack(file);
      donate_voiceMessage__upload_voiceMessage.type = "";

      for (el of donate__voiceMessage__instruction__p) {
        el.style.opacity = 1;
      }
      donate_voiceMessages__exit.style.opacity = 1;

      for (el of donate_voiceMessage__wrapper__p) {
        el.style.opacity = 0;
      }

      $("body").css("cursor", "default");
    }
  } else {
    donate_voiceMessage__upload_voiceMessage.type = "";
  }
}

/* Функция проигрывания голосового сообщения */
let audios = []; // Массив для хранения всех аудио файлов
let C = document.getElementById("donate__voiceMessage--canvas"),
  canvas_context = C.getContext("2d");

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
    } else if (e.keyCode == 27) { // Esc

      // Выключаем холст
      C.style.display = "none";

      // очищаем холст
      canvas_context.clearRect(0, 0, C.width, C.height);

      for (let audio of audios) { // Останавливаем все аудио файлы
        audio.pause();
      }

      donate_voiceMessage__upload_voiceMessage.type = "";

      for (el of donate__voiceMessage__instruction__p) {
        el.style.opacity = 0;
        donate_voiceMessages__exit.style.opacity = 0;
      }

      for (el of donate_voiceMessage__wrapper__p) {
        el.style.opacity = 1;
      }

      // Вешаем события записи
      document.addEventListener("keydown", RecordEventListener);
    }
  } catch { // Если юзер нажал что-то другое, то ничего не делаем
    return;
  }
}

function playTrack(file) {

  for (let audio of audios) { // Останавливаем все аудио файлы
    audio.pause();
  }

  document.addEventListener("keydown", keyboardListener);

  // Убираем событие записи с клавиатуры
  document.removeEventListener("keydown", RecordEventListener);

  // Объявляем переменные для холста:
  let W = (C.width = 250),
    H = (C.height = 250),
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

  // Включаем холст
  C.style.display = "block";

  // Работа с аудио
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

  // Вызываем функцию для начала анимации
  startAnimation();

  function startAnimation() {

    // Определяем текущий прогресс (текущее время воспроизведения / продолжительность трека)
    piece = audio.currentTime / audio.duration;

    // устанавливаем радиус круга
    // мы будем использовать два радиуса: один для прогресса, другой для визуализации частот
    radius = 55;

    // очищаем холст
    canvas_context.clearRect(0, 0, W, H);

    // рисуем круговой прогресс
    canvas_context.beginPath(); // Начинаем новый путь
    /* arc() добавляет дугу к пути. Определяем координаты центра дуги, радиус, 
    угол начала дуги и угол конца дуги умножая текущий прогресс на 2 и число ПИ. */
    canvas_context.arc(centerX, centerY, radius, 0, Math.PI * (2 * piece));
    canvas_context.lineWidth = 20; // Задаём толщину линий в пикселах.
    canvas_context.stroke(); // Рисуем фигуру, изначально чёрным цветом.

    // копируем данные о частотах в frequencyArray. getByteFrequencyData копирует данные о частоте в frequencyArray.
    analyser.getByteFrequencyData(frequencyArray);

    // увеличиваем радиус
    radius = 64;

    /* переводим количество колонок в радианы. 
    Радианы - это углы, соответствующие дуге, длина которой равна её радиусу. Радианы используется для измерения углов. */
    rads = (Math.PI * 2) / bars;

    // Делаем итерацию по количеству колонок
    for (let i = 0; i < bars; i++) {
      // Определяем высоту колонки, беря частоту из массива и умножая её на число. Чем больше число, тем выше колонки.
      barHeight = frequencyArray[i] * 0.2;

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
    lineColor = `rgb(${130 + frequency / 5}, ${75 + frequency / 3.5}, ${180 + frequency / 5})`;

    // рисуем линии
    canvas_context.strokeStyle = lineColor; // Определяем цвет
    canvas_context.lineWidth = width; // Ширина колонки
    canvas_context.beginPath(); // Начинаем новый путь рисования
    canvas_context.moveTo(xStart, yStart); // Двигаемся к координатам, как к началу точки
    canvas_context.lineTo(xEnd, yEnd); // Рисуем линию до конечных координат
    canvas_context.stroke(); // Отображаем результат
  }
}

/* Получение фотографии пользователя, если у него есть аккаунт */
(async function () {
  if (getCookie("access-token")) {
    let responseRequest = await fetch('api/get-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: getCookie("access-token") })
    });

    if (responseRequest.ok) { // если HTTP-статус в диапазоне 200-299
      let response = await responseRequest.json();
      user_photo = response["user_photo"];
      user_name = response["user_name"];
      document.getElementById("profile").classList.add("hide");
      login_profile.classList.remove("hide");
      document.getElementById("login_profile__img").src = user_photo;
      document.getElementById("login_profile__name").textContent = user_name;
      document.getElementById("photo__wrapper__text").textContent = "";
      document.getElementById("comments__author__img").src = user_photo;
      document.getElementById("comments__author__img").classList.add("comments_form__img")
      comments__author.textContent = user_name;
    } else {
      console.log(`Ошибка создания ${responseRequest.status}: ${responseRequest.statusText}`);
    }
  } else {
    eventsObj.addEvent(photo__wrapper, "click", function () { window.location.href = '/profile'; });
    comments__author.classList.add("comments__author__unreg");
    eventsObj.addEvent(comments__author, "click", function () { window.location.href = '/profile'; });
  }
})();

/* Открытие профильного меню */
let login_profile = document.getElementById("login_profile");
let login_profile__container = document.getElementById("login_profile__container");
let isMouseHover = false;

eventsObj.addEvent(login_profile, "mouseover", function () {
  isMouseHover = true;
  login_profile__container.classList.add('open');
  login_profile__container.classList.remove('close');
});
eventsObj.addEvent(login_profile, "mouseout", function () {
  isMouseHover = false;
  setTimeout(() => {
    if (isMouseHover == false) {
      login_profile__container.classList.remove('open');
      login_profile__container.classList.add('close');
    }
  }, 300)
});
eventsObj.addEvent(login_profile, "click", function () { window.location.href = '/profile'; });

/* Выход из аккаунта пользователем */
let leaveAccount = async function () {
  deleteCookie("access-token");
  window.location.href = '/profile';
}

let leave_account = document.getElementById("leave_account");
eventsObj.addEvent(leave_account, "click", leaveAccount);

/* Удаление аккаунта пользователя */
let deleteAccount = async function () {
  let responseRequest = await fetch('api/delete-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: getCookie("access-token") })
  });
  deleteCookie("access-token");

  if (responseRequest.ok) { // если HTTP-статус в диапазоне 200-299
    window.location.href = '/profile';
  } else {
    console.log(`Ошибка создания ${responseRequest.status}: ${responseRequest.statusText}`);
  }
}

let delete_account = document.getElementById("delete_account");
eventsObj.addEvent(delete_account, "click", deleteAccount);

/* Всплывашка для подтверждения использования куки */
const cookie_modal = document.getElementById("cookie_modal");
(async function () {
  if (!getCookie("cookie_authorisation")) {
    cookie_modal.classList.add("cookie_modal--open");
  }
})();

/* Закрытие всплывающего окна для подтверждения куки */
const cookie_close = document.getElementById("cookie_close");
eventsObj.addEvent(cookie_close, "click", function () {
  cookie_modal.classList.remove("cookie_modal--open");
  setCookie("cookie_authorisation", true, { 'max-age': 30000000 })
});