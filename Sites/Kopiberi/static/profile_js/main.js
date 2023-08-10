// Уменьшение текста при наведении на поиск.
header__navigation = document.getElementById("header__navigation");
search = document.getElementById("search");
eventsObj.addEvent(search, "mouseover", function () {
  header__navigation.classList.add('navigation__search');
});
eventsObj.addEvent(search, "mouseout", function () {
  header__navigation.classList.remove('navigation__seach')
})

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

/* Отзывчивая навигация футера */
let footer__navicon = document.getElementById("footer__navicon");
let footer__navicon__container = document.getElementById("footer__navicon__container");

eventsObj.addEvent(footer__navicon, "click", function () { open(footer__navicon__container) });