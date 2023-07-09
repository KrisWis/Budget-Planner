let counter = 1; // Счётчик того, сколько у нас уже загруженных фотографий.
let limit = 5; // Лимит, сколько всего фотографий можно загрузить.
let photos = document.getElementById("photos");

function download(input) {
    let photo__wrapper = document.querySelector(`.photo__wrapper[for="${input.id}"]`); // Достаём нужный элемент.
    let file = input.files[0]; // Так как, в input передаётся массив files, то берём первый и единственный элемент.
    let reader = new FileReader(); // Создаём экземпляр класса FileReader() для чтения файлов.
    reader.readAsDataURL(file); // Переделываем наш file в url.
    reader.onload = function () { // При загрузке картинки вызываем функцию.
        photo__wrapper.textContent = "";
        let img = document.createElement("img");
        img.src = reader.result; // В атрибут src добавляем путь к нашей загруженной картинке.
        photo__wrapper.appendChild(img);
        /* Если пользователь ещё не загрузил изображений более лимита
        и пользователь кликнул на последний блок загрузки изображения (а мог изменить прошлое, и тогда нам не нужно добавлять новый элемент). */
        if (counter < limit && photo__wrapper == document.querySelector(`.photo__wrapper[for="upload_photo_input${counter}"]`)) {
            counter += 1; // Увеличиваем счётчик.
            /* Дальше, создаём и добавляем элементы, 
            а также делаем им атрибуты с цифрой, соответсвующей порядковому номеру элемента, используя counter. */
            let photo = document.createElement("div");
            photo.classList.add("photo");
            let label = document.createElement("label");
            label.classList.add("photo__wrapper");
            label.id = "photo__wrapper" + counter;
            label.setAttribute('for', 'upload_photo_input' + counter);
            let label__content = document.createTextNode("Photo");
            label.appendChild(label__content);
            photo.appendChild(label);
            let input = document.createElement("input");
            input.setAttribute('type', 'file');
            input.id = "upload_photo_input" + counter;
            input.setAttribute('onchange', 'download(this)');
            input.classList.add("upload_photo_input");
            photo.appendChild(input);
            photos.appendChild(photo);
        }
    }
}
