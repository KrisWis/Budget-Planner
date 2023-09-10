let open = function () {

    for (el of arguments) {
        el.classList.toggle('open');
        el.classList.toggle('close');
    }
};

function setCookie(name, value, options = {}) {

    options = {
        path: '/',
        // при необходимости добавьте другие значения по умолчанию
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function deleteCookie(name) {
    setCookie(name, "", {
        'max-age': -1
    })
}

(function () {
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

    eventsObj.addEvent(navicon, "click", function () { open(navicon__container) });

    /* Отзывчивая навигация футера */
    let footer__navicon = document.getElementById("footer__navicon");
    let footer__navicon__container = document.getElementById("footer__navicon__container");

    eventsObj.addEvent(footer__navicon, "click", function () { open(footer__navicon__container) });

    /* Плавный переход между страницами */
    var speed = 'slow';

    $('html, body').hide();

    $(document).ready(function () {
        $('html, body').fadeIn(speed, function () {
            $('a[href], button[href]').click(function (event) {
                var url = $(this).attr('href');
                if (url.indexOf('#') == 0 || url.indexOf('javascript:') == 0) return;
                event.preventDefault();
                $('html, body').fadeOut(speed, function () {
                    window.location = url;
                });
            });
        });
    });
})();