/* Отзывчивая навигация */
let navicon = document.getElementById("navicon");
let navicon__container = document.getElementById("navicon__container");

let open = function () {

  for (el of arguments) {
    el.classList.toggle('open');
    el.classList.toggle('close');
  }
}

eventsObj.addEvent(navicon, "click", function () { open(navicon__container) });

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

let changeToLinked = function () {
  new ClipboardJS('#link_button'); // Объект для копирования в буфер обмена.
  link_button.setAttribute("data-clipboard-text", document.URL) // Атрибут, в который передаём то, что скопируется в буфер обмена.
  link_icon.classList.toggle('link__active');
  link__modal_wrapper.classList.add('link__modal-wrapper--active');
  setTimeout(() => {
    link__modal_wrapper.classList.remove('link__modal-wrapper--active');
  }, 1000);
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

/* Отзывчивая навигация футера */
let footer__navicon = document.getElementById("footer__navicon");
let footer__navicon__container = document.getElementById("footer__navicon__container");

eventsObj.addEvent(footer__navicon, "click", function () { open(footer__navicon__container) });

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

/* Открытие формы */
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

let openForm = function (id) {
  arguments__arr = Array.prototype.slice.call(arguments);
  arguments__arr.shift();

  for (el of arguments__arr) {
    if (el.classList.contains("open") && forms__ids[forms__ids.length - 1] != id) {

      setTimeout(function () {
        el.classList.toggle('open');
        el.classList.toggle('close');
      }, 500)
    }
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

forms__ids = [];
for (el of thanks__comments) {
  eventsObj.addEvent(el, "click", function () { openForm(index + 1, donats__form, donat, donat__textarea, donat__buttons) });
}

/* Загрузка изображения формы */
let result;
function download__form_image(input) {
  let photo__wrapper = document.getElementById('photo__wrapper');
  let file = input.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    photo__wrapper.textContent = "";
    let img = document.createElement("img");
    result = reader.result;
    img.src = result;
    photo__wrapper.appendChild(img);
  }
}

// Уменьшение текста при наведении на поиск.
header__navigation = document.getElementById("header__navigation");
search = document.getElementById("search");
eventsObj.addEvent(search, "mouseover", function () {
  header__navigation.classList.add('navigation__search');
});
eventsObj.addEvent(search, "mouseout", function () {
  header__navigation.classList.remove('navigation__seach')
})