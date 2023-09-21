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
for (let index = 0; index < thanks__comments.length; index++) {
  eventsObj.addEvent(thanks__comments[index], "click", function () { openForm(index + 1, donats__form, donat, donat__textarea, donat__buttons) });
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