/* Отзывчивая навигация */
let navicon = document.getElementById("navicon");
let navicon__container = document.getElementById("navicon__container");

let openNav = function () {

  navicon__container.classList.toggle('open');
}

eventsObj.addEvent(navicon, "click", openNav);

/* Донатеры и комментарии */
let donaters = document.getElementById("donaters");
let comments = document.getElementById("comments");

let changeToActive = function () {

  if (comments.classList.contains("active") && this === donaters) {
    comments.classList.remove("active");

  } else if (donaters.classList.contains("active") && this === comments) {
    donaters.classList.remove("active");
  }

  this.classList.toggle('active');
}

eventsObj.addEvent(donaters, "click", changeToActive);
eventsObj.addEvent(comments, "click", changeToActive);