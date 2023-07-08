/* Инициализация переменных */
const cardContainer = document.getElementById("card-container");
const cardCountElem = document.getElementById("card-count");
const cardTotalElem = document.getElementById("card-total");
const loader = document.getElementById("loader");

/* Сколько всего будет карт */
const cardLimit = 99;
/* Сколько карт будет грузиться при скролле. */
const cardIncrease = 9;

/* Определяем количество сколько раз будут загружаться карты. */
const pageCount = Math.ceil(cardLimit / cardIncrease);
/* Инициализируем сколько сейчас раз загрузились карты. */
let currentPage = 1;

cardTotalElem.innerHTML = cardLimit;

/* Функция для оптимизации бесконечного скролла. */
var throttleTimer;
const throttle = (callback, time) => {
    if (throttleTimer) return; // Если таймер запущен, то останавливаем функцию.

    throttleTimer = true;

    // Создаём таймер и передаём в него функцию с временем загрузки, после чего останавливаем таймер. 
    setTimeout(() => {
        callback();
        throttleTimer = false;
    }, time);
};

/* Функция получения рандомного цвета. */
const getRandomColor = () => {
    const h = Math.floor(Math.random() * 360);

    return `hsl(${h}deg, 90%, 85%)`;
};

// Функция создания карточки.
const createCard = (index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = index;
    card.style.backgroundColor = getRandomColor();
    cardContainer.appendChild(card);
};

// Функция добавления карточек.
const addCards = (pageIndex) => {
    currentPage = pageIndex;

    // Переменная startRange хранит начальное значения для цикла.
    const startRange = (pageIndex - 1) * cardIncrease;
    // Переменная endRange хранит конечное значение для цикла.
    const endRange =
        currentPage == pageCount ? cardLimit : pageIndex * cardIncrease;

    cardCountElem.innerHTML = endRange;

    // Создаём цикл добавления карточек.
    for (let i = startRange + 1; i <= endRange; i++) {
        createCard(i);
    }
};

const handleInfiniteScroll = () => {
    throttle(() => {
        // Инициализируем переменную куда записываем текущий конец страницы.
        const endOfPage =
            window.innerHeight + window.pageYOffset >= document.body.offsetHeight;

        // Если пользователь достиг конца страницы, то добавляем новую порцию карточек.
        if (endOfPage) {
            addCards(currentPage + 1);
        }

        // Если пользователь достиг лимита карточек, то завершаем бесконечный скролл.
        if (currentPage === pageCount) {
            removeInfiniteScroll();
        }
    }, 1000); // Будет задержка в 1000 мс перед добавлянием новых карточек.
};

// Функция удаления бесконечного скролла.
const removeInfiniteScroll = () => {
    loader.remove();
    window.removeEventListener("scroll", handleInfiniteScroll);
};

// Загрузка начальных карточек.
window.onload = function () {
    addCards(currentPage);
};

// Создаём событие на скролл.
window.addEventListener("scroll", handleInfiniteScroll);