// В синхронной системе задачи выполняются одна за другой. Вот пример, где все задачи выполняться друг за другом.
console.log(" I ");

console.log(" eat ");

console.log(" Ice Cream ");

// В асинхронной системе задачи выполняются независимо друг от друга. Вот пример, где задачи выполняться не друг за другом.
console.log("I"); // 1. Сначала выведеться это.

setTimeout(() => {
    console.log("eat"); // 3. В конце, через 2 секунды выведеться это.
}, 2000)

console.log("Ice Cream") // 2. Потом выведеться это.

/* Когда вы вкладываете функцию в другую функцию в качестве аргумента, это называется обратным вызовом или callback. 
При выполнении сложной задачи мы разбиваем ее на более мелкие шаги. 
Чтобы установить связь между этими шагами по времени (необязательно) и порядку, мы используем обратные вызовы.
Пример: */
function one() {
    console.log("one");
}
function two(callback) {
    callback();
}
two(one);

// Но чаще всего обратные вызовы выглядит примерно так:
let production = () => {

    setTimeout(() => {
        console.log("production has started")
        setTimeout(() => {
            console.log("The fruit has been chopped")
            setTimeout(() => {
                console.log(`${stocks.liquid[0]} and ${stocks.liquid[1]} Added`)
                setTimeout(() => {
                    console.log("start the machine")
                    setTimeout(() => {
                        console.log(`Ice cream placed on ${stocks.holder[1]}`)
                        setTimeout(() => {
                            console.log(`${stocks.toppings[0]} as toppings`)
                            setTimeout(() => {
                                console.log("serve Ice cream")
                            }, 2000)
                        }, 3000)
                    }, 2000)
                }, 1000)
            }, 1000)
        }, 2000)
    }, 0)

};

/* Promises были изобретены для избавления от ада обратных вызовов и для лучшей обработки наших задач.
Promise имеет три состояния:
Ожидание. Это начальная стадия. Здесь ничего не происходит.
Решено. Это означает, что задача выполнена.
Отклонено. Это означает, что задача потерпела ошибку или по какой либо другой причине не выполнилась. */
let is_shop_open = true;

let order = (time, work) => {
    /* Наш Promise состоит из 2 частей:
    Решено [resolve].
    Отклонено [reject]. 
    resolve и reject - callback функции. */
    return new Promise((resolve, reject) => {

        if (is_shop_open) { // Если задача решена

            setTimeout(() => {

                resolve(work()) // В качестве аргумента передаём наш колбэк, который передали функции order.

            }, time)

        }

        else { // Если задача не выполнена.
            reject(console.log("Что то пошло не так!"))
        }

    })
}

// Вызываем функцию order() передавай ей колбэк функцию.
order(2000, () => console.log(`${stocks.Fruits[0]} was selected`)); // Шаг 1

/* Метод then() принимает до двух аргументов: функции обратного вызова для выполненных и отклоненных случаев из Promise.
Обработчик then применяется только к экземплярам объектов Promise() и работает так, 
что возвращает promise, когда наше первое Promise будет выполнено.
Таким образом мы можем создать целую цепочку функций. */

order.then(() => { // Шаг 2
    return order(0, () => console.log('production has started'))
});


order.then(() => { // Шаг 3
    return order(2000, () => console.log("Fruit has been chopped"))
});

order.then(() => { // Шаг 4
    return order(1000, () => console.log(`${stocks.liquid[0]} and ${stocks.liquid[1]} added`))
});

order.then(() => { // Шаг 5
    return order(1000, () => console.log("start the machine"))
});

order.then(() => { // Шаг 6
    return order(2000, () => console.log(`ice cream placed on ${stocks.holder[1]}`))
});

order.then(() => { // Шаг 7
    return order(3000, () => console.log(`${stocks.toppings[0]} as toppings`))
});

order.then(() => { // Шаг 8
    return order(2000, () => console.log("Serve Ice Cream"))
});


is_shop_open = false;
/* Чтобы справиться с ошибкой (теперь функция order() будет возвращать reject() т.к is_shop_open равна false), мы используем обработчик .catch. 
Как и .then, он также возвращает Promise, но только в том случае, если наше первоначальное обещание потерпело ошибку. 
Т.е:
1. .then работает, когда Promise сработал как следует.
2. .catch работает, когда Promise отвергнут. 
Таким образом, между предыдущим обработчиком .then и обработчиком .catch не должно быть вообще ничего. */
order.catch(() => {
    /* Сначала выведеться то, что написано в reject() ("Что то пошло не так!"),
    а потом уже выведеться то, что тут ("Ошибка!"). */
    console.log("Ошибка!");
});


/* Существует обработчик .finally, который работает независимо от того, был ли наш Promise выполнен или отклонен. 
Например: независимо от того, обслужили ли мы хотя бы одного клиента или 100 клиентов, наш магазин закроется в конце дня.*/
order.finally(() => {
    console.log("Конец дня.")
})


/* Если написать слово async перед любой обычной функцией, то она станет Promise.
Но, Когда мы используем async/await, мы используем немного другой формат.
При использовании Async/Await вы также можете использовать обработчики .then, .catch и .finally, которые являются основной частью Promises. */
async function test() {

    // В обработчике try нужно писать код, который стоит выполнить.
    try {
        /* Пробуем сделать какое либо действие. Функции в асинхронных функциях вызываются с помощью слова await.
        Ключевое слово await заставляет JavaScript ждать, пока асинхронная функция выполнится и вернет результат. 
        Т.е если после вызова await abc() будет другой код, то он не выполниться, пока не выполниться функция abc(). */
        await abc();
    }

    // В обработчике catch нужно писать код, который выполниться если код в try() потерпет ошибку.
    catch (error) { // Если действие не смогло выполниться, то срабатывает обработчик catch()
        console.log("Функция abc() не запустилась!", error)
    }

    // В обработчике finally нужно писать код, который выполниться в любом случае.
    finally {
        console.log("Я выведусь в любом случае!")
    }
}

test();
console.log("Этот вывод сработает сразу после того, как код в функции test() дойдёт до функции с await.");


/* ЗАПРОСЫ НА СЕРВЕР - https://learn.javascript.ru/fetch */


// Есть несколько способов делать сетевые запросы и получать информацию с сервера.
/* Метод fetch() — современный и очень мощный, поэтому начнём с него. 
url – URL для отправки запроса.
options – дополнительные параметры: метод, заголовки и так далее. 
Без options это простой GET-запрос, скачивающий содержимое по адресу url. */
let promise = fetch(url, [options]);
/* Браузер сразу же начинает запрос и возвращает промис, который внешний код использует для получения результата.
Процесс получения ответа обычно происходит в два этапа:

Во-первых, promise выполняется с объектом встроенного класса Response в качестве результата, как только сервер пришлёт заголовки ответа.
На этом этапе мы можем проверить статус HTTP-запроса и определить, выполнился ли он успешно, а также посмотреть заголовки, но пока без тела ответа.
Промис завершается с ошибкой, если fetch не смог выполнить HTTP-запрос, 
например при ошибке сети или если нет такого сайта. HTTP-статусы 404 и 500 не являются ошибкой.
Мы можем увидеть HTTP-статус в свойствах ответа:
status – код статуса HTTP-запроса, например 200.
ok – логическое значение: будет true, если код HTTP-статуса в диапазоне 200-299. */
let response = await fetch(url);
if (response.ok) { // если HTTP-статус в диапазоне 200-299
    // получаем тело ответа с помощью метода json(), который декодирует ответ в формате JSON.
    let json = await response.json();
} else {
    alert("Ошибка HTTP: " + response.status);
}

/* Вот пара методов для получения тела ответа:
response.text() – читает ответ и возвращает как обычный текст,
response.json() – декодирует ответ в формате JSON,

response.formData() – возвращает ответ как объект FormData - https://learn.javascript.ru/formdata.
Это объект, представляющий данные HTML формы. 
Мы можем создать такой объект уже с данными, передав в конструктор HTML-форму – new FormData(form), 
или же можно создать объект вообще без формы и затем добавить к нему поля с помощью методов.

Объекты FormData всегда отсылаются с заголовком Content-Type: multipart/form-data, этот способ кодировки позволяет отсылать файлы.
Таким образом, поля <input type="file"> тоже отправляются, как это и происходит в случае обычной формы. */
let formData = new FormData([form]);
// Отправка простой формы.
let FormResponse = await fetch('/article/formdata/post/user', {
    method: 'POST',
    body: new FormData(formElem)
});

/* С помощью указанных ниже методов мы можем изменять поля в объекте FormData:
formData.append(name, value) – добавляет к объекту поле с именем name и значением value,

formData.append(name, blob, fileName) – добавляет поле, как будто в форме имеется элемент <input type="file">, 
третий аргумент fileName устанавливает имя файла (не имя поля формы), как будто это имя из файловой системы пользователя,

formData.set(name, value) - добавляет к объекту поле с именем name и значением value,
но перед этим удаляет все уже имеющиеся поля с именем name и только затем добавляет новое.

formData.set(name, blob, fileName) – добавляет поле, как будто в форме имеется элемент <input type="file">, 
третий аргумент fileName устанавливает имя файла (не имя поля формы), как будто это имя из файловой системы пользователя,
но перед этим удаляет все уже имеющиеся поля с именем name и только затем добавляет новое.

formData.delete(name) – удаляет поле с заданным именем name,

formData.get(name) – получает значение поля с именем name,

formData.has(name) – если существует поле с именем name, то возвращает true, иначе false */

async function submit() {
    let imageBlob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));

    let formData = new FormData();
    formData.append("firstName", "John");
    /* Пожалуйста, обратите внимание на то, как добавляется изображение Blob:
    Это как если бы в форме был элемент <input type="file" name="image"> (1 аргумент) 
    и пользователь прикрепил бы файл с именем "image.png" (3-й аргумент)
    и данными imageBlob (2-й аргумент) из своей файловой системы. */
    formData.append("image", imageBlob, "image.png");

    let response = await fetch('/article/formdata/post/image-form', {
        method: 'POST',
        body: formData
    });
    let result = await response.json();
    alert(result.message);
}



/* response.blob() – возвращает объект как Blob - https://learn.javascript.ru/blob. 
В то время как ArrayBuffer, Uint8Array и другие BufferSource являются «бинарными данными», Blob представляет собой «бинарные данные с типом».
Это делает Blob удобным для операций загрузки/выгрузки данных, которые так часто используются в браузере.

blobParts – массив значений Blob/BufferSource/String.
options – необязательный объект с дополнительными настройками:
    type – тип объекта, обычно MIME-тип, например. image/png,
    endings – если указан, то окончания строк создаваемого Blob будут изменены в соответствии с текущей операционной системой (\r\n или \n). 
    По умолчанию "transparent" (ничего не делать), но также может быть "native" (изменять).*/
new Blob(blobParts, options);

// создадим Blob из строки в html код
let blob = new Blob(["<html>…</html>"], { type: 'text/html' });
// обратите внимание: первый аргумент должен быть массивом [...]

// создадим Blob из типизированного массива и строк в текст.
let hello = new Uint8Array([72, 101, 108, 108, 111]); // "hello" в бинарной форме
let blob2 = new Blob([hello, ' ', 'world'], { type: 'text/plain' });

/* Мы можем получить срез Blob, используя: 
byteStart – стартовая позиция байта, по умолчанию 0. Отрицательные числа также разрешены.
byteEnd – последний байт, по умолчанию до конца. Отрицательные числа также разрешены.
contentType – тип type создаваемого Blob-объекта, по умолчанию такой же, как и исходный. 
Мы не можем изменять данные напрямую в Blob, но мы можем делать срезы и создавать новый Blob на их основе, объединять несколько объектов в новый и так далее. */
blob.slice([byteStart], [byteEnd], [contentType]);

// Blob может быть использован как URL для <a>, <img> или других тегов, для показа содержимого.
let blobForURL = new Blob(["Hello, world!"], { type: 'text/plain' }); // Создаём файл с текстом "Hello, world!".

/* URL.createObjectURL берёт Blob и создаёт уникальный URL для него в формате blob: <origin>/<uuid>.
Вот как выглядит сгенерированный URL:
"blob:https://javascript.info/1e67e00e-860d-40a5-89ae-6ab0cbee6273". 
Браузер для каждого URL, сгенерированного через URL.createObjectURL, сохраняет внутреннее соответствие URL → Blob. 
Таким образом, такие URL короткие, но дают доступ к большому объекту Blob. 
Но пока в карте соответствия существует ссылка на Blob, он находится в памяти. Браузер не может освободить память, занятую Blob-объектом. 
Таким образом, если мы создадим URL для Blob, он будет висеть в памяти, даже если в нём нет больше необходимости. */
link.href = URL.createObjectURL(blob); // В атрибут href передаём blob переделанный в ссылку.
// Удаляет внутреннюю ссылку на объект, что позволяет удалить его (если нет другой ссылки) сборщику мусора, и память будет освобождена.
URL.revokeObjectURL(link.href);

/* Альтернатива URL.createObjectURL – конвертация Blob-объекта в строку с кодировкой base64.
Оно имеет форму data:[<mediatype>][;base64],<data>. Мы можем использовать такой url где угодно наряду с «обычным» url. Например:
<img src="data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7"> 
Для трансформации Blob в base64 мы будем использовать встроенный в браузер объект типа FileReader. */
let reader = new FileReader();
reader.readAsDataURL(blob); // конвертирует Blob в base64

// Оба варианта могут быть использованы для создания URL с Blob. Но обычно URL.createObjectURL(blob) является более быстрым и безопасным.

// Мы можем создать Blob для изображения, части изображения или даже создать скриншот страницы. Что удобно для последующей загрузки куда-либо.
// берём любое изображение
let img = document.querySelector('img');

// создаём <canvas> того же размера
let canvas = document.createElement('canvas');
canvas.width = img.clientWidth;
canvas.height = img.clientHeight;

let context = canvas.getContext('2d');

// копируем изображение в canvas (метод позволяет вырезать часть изображения)
context.drawImage(img, 0, 0);
// мы можем вращать изображение при помощи context.rotate() и делать множество других преобразований

// toBlob является асинхронной операцией, для которой callback-функция вызывается при завершении
canvas.toBlob(function (blob) {
    // после того, как Blob создан, загружаем его
    let link = document.createElement('a');
    link.download = 'example.png';

    link.href = URL.createObjectURL(blob);
    link.click();

    // удаляем внутреннюю ссылку на Blob, что позволит браузеру очистить память
    URL.revokeObjectURL(link.href);
}, 'image/png');

/* Конструктор Blob позволяет создать Blob-объект практически из чего угодно, включая BufferSource.

Но если нам нужна производительная низкоуровневая обработка, мы можем использовать ArrayBuffer из FileReader: */
let fileReader = new FileReader();

fileReader.readAsArrayBuffer(blob);

fileReader.onload = function (event) {
    let arrayBuffer = fileReader.result;
};



/* response.arrayBuffer() – возвращает ответ как ArrayBuffer - https://learn.javascript.ru/arraybuffer-binary-arrays,
Операции над бинарными данными являются высокопроизводительными и ArrayBuffer является базовым объект для работы с бинарными данными
и представляет собой ссылку на непрерывную область памяти фиксированной длины.
ArrayBuffer не имеет ничего общего с Array:
его длина фиксирована, мы не можем увеличивать или уменьшать её.
ArrayBuffer занимает ровно столько места в памяти, сколько указывается при создании.
Для доступа к отдельным байтам нужен вспомогательный объект-представление, buffer[index] не сработает. */
let buffer = new ArrayBuffer(16); // выделяет непрерывную область памяти размером 16 байт и заполняет её нулями.
alert(buffer.byteLength); // 16

/* Для работы с ArrayBuffer нам нужен специальный объект, реализующий «представление» данных.
Например:

Uint8Array – представляет каждый байт в ArrayBuffer как отдельное число; возможные значения находятся в промежутке от 0 до 255 (в байте 8 бит, отсюда такой набор).
Такое значение называется «8-битное целое без знака».

Uint16Array – представляет каждые 2 байта в ArrayBuffer как целое число; возможные значения находятся в промежутке от 0 до 65535.
Такое значение называется «16-битное целое без знака».

Uint32Array – представляет каждые 4 байта в ArrayBuffer как целое число; возможные значения находятся в промежутке от 0 до 4294967295.
Такое значение называется «32-битное целое без знака».

Float64Array – представляет каждые 8 байт в ArrayBuffer как число с плавающей точкой; 
возможные значения находятся в промежутке между 5.0x10-324 и 1.8x10308. */

/* Общий термин для всех таких представлений (Uint8Array, Uint32Array и т.д.) – это TypedArray, типизированный массив. 
У них имеется набор одинаковых свойств и методов. Есть 5 вариантов создания типизированных массивов: */

/* Если передан аргумент типа ArrayBuffer, то создаётся объект-представление для него. 
Дополнительно можно указать аргументы byteOffset (0 по умолчанию) и length (до конца буфера по умолчанию),
тогда представление будет покрывать только часть данных в buffer. */
new TypedArray(buffer, [byteOffset], [length]);
/* Если в качестве аргумента передан Array или какой-нибудь псевдомассив, 
то будет создан типизированный массив такой же длины и с тем же содержимым. */
new TypedArray(object);
/* Если в конструктор передан другой объект типа TypedArray, то делается то же самое: 
создаётся типизированный массив с такой же длиной и в него копируется содержимое. */
new TypedArray(typedArray);
/* Если передано число length – будет создан типизированный массив, содержащий именно столько элементов. 
Размер нового массива в байтах будет равен числу элементов length, умноженному на размер одного элемента TypedArray.BYTES_PER_ELEMEN */
new TypedArray(length);
let arr = new Uint16Array(4); // создаём типизированный массив для 4 целых 16-битных чисел без знака
alert(Uint16Array.BYTES_PER_ELEMENT); // 2 байта на число
alert(arr.byteLength); // 8 (размер массива в байтах)
/* При вызове без аргументов будет создан пустой типизированный массив. */
new TypedArray();
/* Список типизированных массивов:
Uint8Array, Uint16Array, Uint32Array – целые беззнаковые числа по 8, 16 и 32 бита соответственно.
Uint8ClampedArray – 8-битные беззнаковые целые, обрезаются по верхней и нижней границе при присвоении (об этом ниже).
Int8Array, Int16Array, Int32Array – целые числа со знаком (могут быть отрицательными).
Float32Array, Float64Array – 32- и 64-битные числа со знаком и плавающей точкой. */

/* Типизированные массивы TypedArray, за некоторыми заметными исключениями, имеют те же методы, что и массивы Array.
Мы можем обходить их, вызывать map, slice, find, reduce и т.д.
Однако, есть некоторые вещи, которые нельзя осуществить:
Нет метода splice – мы не можем удалять значения, потому что типизированные массивы – это всего лишь представления данных из буфера, 
а буфер – это непрерывная область памяти фиксированной длины. Мы можем только записать 0 вместо значения.
Нет метода concat.
Но зато есть два дополнительных метода:
arr.set(fromArr, [offset]) копирует все элементы из fromArr в arr, начиная с позиции offset (0 по умолчанию).
arr.subarray([begin, end]) создаёт новое представление того же типа для данных, начиная с позиции begin до end (не включая).
Это похоже на метод slice (который также поддерживается), но при этом ничего не копируется – просто создаётся новое представление,
чтобы совершать какие-то операции над указанными данными. */

/* DataView – это специальное супергибкое нетипизированное представление данных из ArrayBuffer. 
Оно позволяет обращаться к данным на любой позиции и в любом формате.
Представление DataView отлично подходит, когда мы храним данные разного формата в одном буфере.
В случае типизированных массивов конструктор строго задаёт формат данных. Весь массив состоит из однотипных значений. 
Доступ к i-ому элементу можно получить как arr[i].
В случае DataView доступ к данным осуществляется посредством методов типа .getUint8(i) или .getUint16(i). 
Мы выбираем формат данных в момент обращения к ним, а не в момент их создания.
buffer – ссылка на бинарные данные ArrayBuffer. В отличие от типизированных массивов, DataView не создаёт буфер автоматически. Нам нужно заранее подготовить его самим.
byteOffset – начальная позиция данных для представления (по умолчанию 0).
byteLength – длина данных (в байтах), используемых в представлении (по умолчанию – до конца buffer). */
new DataView(buffer, [byteOffset], [byteLength]);
/* Обычно мы создаём и работаем с типизированными массивами, оставляя ArrayBuffer «под капотом». 
Но мы можем в любой момент получить к нему доступ с помощью .buffer и при необходимости создать другое представление. */
let DataBuffer = new Uint8Array([255, 255, 255, 255]).buffer; // бинарный массив из 4х байт, каждый имеет максимальное значение 255
let dataView = new DataView(DataBuffer);
// получим 8-битное число на позиции 0
alert(dataView.getUint8(0)); // 255
// а сейчас мы получим 16-битное число на той же позиции 0, оно состоит из 2-х байт, вместе составляющих число 65535
alert(dataView.getUint16(0)); // 65535 (максимальное 16-битное беззнаковое целое)
// получим 32-битное число на позиции 0
alert(dataView.getUint32(0)); // 4294967295 (максимальное 32-битное беззнаковое целое)
dataView.setUint32(0, 0); // при установке 4-байтового числа в 0, во все его 4 байта будут записаны нули



/* Помимо этого, response.body – это объект ReadableStream, с помощью которого можно считывать тело запроса по частям - 
https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream. */


/* НО - Мы можем выбрать только один метод чтения ответа.
Если мы уже получили ответ с response.text(), тогда response.json() не сработает, так как данные уже были обработаны. */

/* Заголовки ответа хранятся в похожем на Map объекте response.headers. 
Все заголовки - https://developer.mozilla.org/ru/docs/Web/HTTP/Headers. */
// Получить один заголовок
alert(response.headers.get('Content-Type')); // application/json; charset=utf-8
// перебрать все заголовки
for (let [key, value] of response.headers) {
    alert(`${key} = ${value}`);
}

/* Для установки заголовка запроса в fetch мы можем использовать опцию headers. 
Она содержит объект с исходящими заголовками, например: */
let responseHeaders = fetch(protectedUrl, {
    headers: {
        Authentication: 'secret'
    }
});
// Есть список запрещённых заголовков - https://fetch.spec.whatwg.org/#forbidden-header-name.

/* Для отправки POST-запроса или запроса с другим методом, нам необходимо использовать fetch параметры:
method – HTTP метод, например POST,
body – тело запроса, одно из списка:
строка (например, в формате JSON),
объект FormData для отправки данных как form/multipart,
Blob/BufferSource для отправки бинарных данных,
URLSearchParams для отправки данных в кодировке x-www-form-urlencoded, используется редко. */
let responseRequest = await fetch('/article/fetch/post/user', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user) // Преобразует значение в строку JSON.
});

// Объект, на котором можно рисовать мышкой.
canvasElem.onmousemove = function (e) {
    let ctx = canvasElem.getContext('2d');
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
};
async function submit() {
    let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png')); // Переделываем то, что мы нарисовали в изображение.
    let response = await fetch('/article/fetch/post/image', { // Делаем запрос на сервер.
        method: 'POST',
        body: blob
    });

    // Сервер ответит подтверждением и размером изображения.
    let result = await response.json();
    alert(result.message);
}


/* Чтобы отслеживать ход загрузки данных с сервера, можно использовать свойство response.body. Это ReadableStream («поток для чтения») – 
особый объект, который предоставляет тело ответа по частям, по мере поступления. */
// вместо response.json() и других методов
const BodyReader = response.body.getReader();
// бесконечный цикл, пока идёт загрузка
while (true) {
    /* Результат вызова await reader.read() – это объект с двумя свойствами:
    done – true, когда чтение закончено, иначе false.
    value – типизированный массив данных ответа Uint8Array. */
    const { done, value } = await BodyReader.read();

    if (done) {
        break;
    }

    console.log(`Получено ${value.length} байт`)
}

// Вот полный рабочий пример, который получает ответ сервера и в процессе получения выводит в консоли длину полученных данных:
// Шаг 1: начинаем загрузку fetch, получаем поток для чтения
let Newresponse = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100');

const Newreader = Newresponse.body.getReader();

// Шаг 2: получаем длину содержимого ответа
const contentLength = +Newresponse.headers.get('Content-Length');

// Шаг 3: считываем данные:
let receivedLength = 0; // количество байт, полученных на данный момент
let chunks = []; // массив полученных двоичных фрагментов (составляющих тело ответа)
while (true) {
    const { done, value } = await Newreader.read();

    if (done) {
        break;
    }

    chunks.push(value);
    receivedLength += value.length;

    console.log(`Получено ${receivedLength} из ${contentLength}`)
}

// Шаг 4: соединим фрагменты в общий типизированный массив Uint8Array
let chunksAll = new Uint8Array(receivedLength); // (4.1)
let position = 0;
for (let chunk of chunks) {
    chunksAll.set(chunk, position); // (4.2)
    position += chunk.length;
}

// Шаг 5: декодируем Uint8Array обратно в строку
let result = new TextDecoder("utf-8").decode(chunksAll);

// Готово!
let commits = JSON.parse(result);
alert(commits[0].author.login);


/* РАБОТА С БАЗОЙ ДАННЫХ - https://learn.javascript.ru/indexeddb */


