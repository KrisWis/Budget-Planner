// AOS
AOS.init({
  duration: 1000,
})

jQuery(document).ready(function ($) {
  'use strict';


  // Animsition
  $(".animsition").animsition();

  // Scrollax
  $.Scrollax();

  // Smooth scroll
  var $root = $('html, body');

  $('a.js-smoothscroll[href^="#"]').click(function () {
    $root.animate({
      scrollTop: $($.attr(this, 'href')).offset().top - 40
    }, 500);

    return false;
  });

  // Owl
  $('.wide-slider').owlCarousel({
    loop: true,
    autoplay: true,
    margin: 10,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    nav: true,
    autoplayHoverPause: false,
    items: 1,
    autoheight: true,
    navText: ["<span class='ion-chevron-left'></span>", "<span class='ion-chevron-right'></span>"],
    responsive: {
      0: {
        items: 1,
        nav: false
      },
      600: {
        items: 1,
        nav: false
      },
      1000: {
        items: 1,
        nav: true
      }
    }
  });

  // Show menu 
  if ($(window).width() > 768) {
    $('body').removeClass('menu-open');
    $('.js-templateux-menu').css('display', 'block');
  }
  // Window Resize
  $(window).resize(function () {
    var $this = $(this);
    $('.js-templateux-menu li').removeClass('staggard');
    $('.js-toggle-menu').removeClass('is-active');
    if ($this.width() > 768) {
      $('body').removeClass('menu-open');
      $('.js-templateux-menu').css('display', 'block');

    } else {
      if ($this.width() < 768) {
        $('.js-templateux-menu').css('display', 'none');
      }
    }
  });

  // Hamburger Button 
  $('.js-toggle-menu').on('click', function (e) {
    e.preventDefault();

    var $this = $(this);

    if ($('body').hasClass('menu-open')) {
      $this.removeClass('is-active');
      $('body').removeClass('menu-open');
      $('.js-templateux-menu li').removeClass('staggard');
    } else {
      $this.addClass('is-active');
      $('body').addClass('menu-open');

      $('.js-templateux-menu li').each(function (k) {
        var $this = $(this);
        setTimeout(function () {
          $this.addClass('staggard');
        }, 100 * k);
      });

    }

    if ($('.templateux-menu').is(':visible')) {
      $('.js-templateux-menu').fadeOut(300);
    } else {
      $('.js-templateux-menu').fadeIn(300);
    }
  })
});

/* Обращаемся к классу "contacts__form" и если пользователь отправил данные (нажал на кнопку "submit"), то будет срабатывать определённая функция. */
$('.contacts__form').on('submit', () => {
  /* Отменяем обычное состояние формы. */
  e.preventDefault();

  /* Создаём переменную action, и записываем в него текущее действие. */
  let action = $(e.currentTarget).attr("action");
  // Создаём переменную th, в которую кладём текущую цель
  let th = $(e.currentTarget);

  /* Отправляем AJAX запрос. */
  $.ajax({
    // Так как мы отправляем данные post-запросом, то ставим соответствующий тип запроса.
    type: 'POST',
    // Указываем ссылку, куда будем отправлять наш запрос.
    url: action,
    // serialize() - собирает все данные в одно целое.
    data: th.serialize()
    // Следующая функция будет срабатывать тогда, когда ajax-запрос будет успешно отправлен.
  }).done(function () {
    console.log('Отправлено!');
  });
})