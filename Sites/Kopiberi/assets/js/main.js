/* Отзывчивая навигация */
let navicon = document.getElementById("navicon");
let navicon__container = document.getElementById("navicon__container");

let openNav = function () {

  navicon__container.classList.toggle('open');
}

eventsObj.addEvent(navicon, "click", openNav);

/* Донатеры и комментарии */
let text_donaters = document.getElementById("text_donaters");
let text_comments = document.getElementById("text_comments");
let donaters = document.getElementById("donaters_section");
let comments = document.getElementById("comments_section");

let changeToActive = function () {
  let text_arr = [text_donaters, text_comments];
  let arr = [donaters, comments];

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

let openFooterNav = function () {

  footer__navicon__container.classList.toggle('open');
}

eventsObj.addEvent(footer__navicon, "click", openFooterNav);