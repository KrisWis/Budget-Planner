

/* АСИНХРОННОЕ ПРОГРАММИРОВАНИЕ В NODE.JS И JAVASCRIPT - https://www.youtube.com/watch?v=hY6Z6qNYzmc&list=PLHhi8ymDMrQZ0MpTsmi54OkjTbo0cjU1T&index=1&t=28s */


// В callback должна сначала передаваться ошибка, а потом уже входные данные.
/* Не все функции с callback`ом асинхронные. Они асинхронные только если у неё внутри есть вызов другой асинхронной функции,
вызовы setTimeout() и других вещей, которые могут разорвать синхронное выполнение кода. */

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

// Функция реализовывания цепочки. Functor - это функциональный объект. Наша цепочка это как раз functor.
function chain(prev = null) {
    const cur = () => {
        if (cur.prev) { // Если есть предыдущий объект.
            cur.prev.next = cur; // То следующий объект предыдущего объекта и будет нашем cur.
            cur.prev(); // Вызываем предыдущий объект.
        } else { // Если нет
            cur.forward(); // То вызываем следующий объект.
        }
    }

    // Объевляем свойства объекта cur.
    cur.prev = prev;
    cur.fn = null;
    cur.args = null;

    // Объявляем функцию .do
    cur.do = (fn, ...args) => { // Передавание "...args", значит, что можно передать неограниченное число параметров.
        // Объявляем нужные свойства.
        cur.fn = fn;
        cur.args = args;
        return chain(cur); // Вызываем наш chain() и передаём нужный объект.
    }

    // Объявляем функцию .forward
    cur.forward = () => {
        if (cur.fn) { // Если функция есть
            cur.fn(cur.args, () => { // То вызываем её
                if (cur.next) { // Если следующая функция есть
                    cur.next.forward(); // То вызываем forward() для неё.
                }
            })
        }
    }

    return cur; // Возвращаем наш объект cur.
}
// Пример работы цепочки. Когда исполниться f1, то исполниться f2, и потом f3.
const c1 = chain()
    .do(f1, 'step1')
    .do(f2, 'step2')
    .do(f3, 'step3')
c1();

// Существует библиотека Metasync для асинхронного программирования, у которой простой синтаксис и куча разных других штук.
/* Работает так, что ему ввиде массива передаются функции.
И если функции переданы в одних квадратных скобках, то они выполняются синхронно друг за другом, 
а вот если переданы в двойных квадратных скобках, то они выполняются параллельно.
Т.е f1, f2, f3 выполняются синхронно, а f4, f5, f6, f7, f8 параллельно, при этом f6 и f7 выполняются друг за другом, синхронно. */
const fx = metasync(
    [f1, f2, f3, [[f4, f5, [f6, f7], f8]], f9]
)

// Мы можем через metasync сказать программе, чтобы она ждала 3 кусочка кода 5 секунд, и что то делала, когда их получит.
const dc1 = metasync
    .collect(3)
    .timeout(5000)
    .done((err, data) => { });
dc1(item);

/* Метод throttle делает так, что функция должна выполниться за определённый промежуток времени.
В нашем случае, когда мы её просто вызываем то всё нормально, но
когда вызываем с задержкой в 7 секунд, то она просто сгорает. */
const t1 = metasync.throttle(5000, f);
t1();
setTimeout(t1, 7000);

// Метод queue нужен, чтобы наша программа не "захлёбывалась" в функциях и всё выполнялось последовательно.
const cq = metasync.queue(3) // У нас должно создаться 3 очереди.
    .wait(2000) // Перед выполнением каждой функции ждать 2 секунды
    .timeout(5000) // Функция должна выполняться не более чем 5 секунд
    .throttle(100, 1000) // За 1 секунду, в эту очередь должно добавляться максимум 100 запросов.
    .process((item, callback) => callback(err, result)) // .process обрабатывает поступаемые функции
    .success(item => { }) // Если функция выполнилась успешно
    .failure(item => { }) // Если функция потерпела ошибку
    .done((err, item) => { }) // Срабатывает и при ошибке и при успехе
    .drain(() => { }); // Если в очереди ничего больше нету


/* ТАЙМЕРЫ, ТАЙМАУТЫ, EVENTEMITTER В JAVASCRIPT - https://www.youtube.com/watch?v=LK2jveAnRNg&list=PLHhi8ymDMrQZ0MpTsmi54OkjTbo0cjU1T&index=2 */


/* Суть setTimeout() не в том, чтобы вызывать функцию по истечению определённого промежутка времени,
а в том, чтобы вызвать её не раньше определённого промежутка времени. Т.е из-за, например, переполнения стёка, может и позже. */

/* Колбэки работают так, что сначала вызываются синхронные колбэки, потом колбэки с process.nextTick() (это Node.js),
потом колбэки с любым setTimeout(), далее с setInterval(), потом с setImmediate(), 
и только в конце колбэки, которые обращаются к какому-либо устройству ввода-вывода, как чтение файлов. */

// Timeout может немного тормозиться и вызываться позже из-за других процессов и тд.

/* require это функция для включения внешних модулей, которые существуют в отдельных файлах. 
Оператор require() читает файл JavaScript, выполняет его, а затем возвращает экспортированный объект.
Все таймеры и всё, что с ними связанное храниться в этом модуле. */
let timers = require("timers");

// ref() делает так, чтобы цикл событий не завершался, пока timeout активен.
timers.ref();
// unref() делает так, что timeout может быть активным, даже если цикл событий уже завершился.
timers.unref();

/* EventEmitter как бы заранее планирует функцию, а когда её запустить решит уже сам разработчик. */
const events = require("events");
const ee = new events.EventEmitter(); // Создаём экземпляр класса EventEmitter, он часто нужен для EventListener, чтобы уменьшить количество кода.
// Функция emit запускает функцию, имя которой передано в emit(). Тем самым, тут каждая функция вызывает следующую.
const f1 = () => ee.emit('step2');
const f2 = () => ee.emit('step3');
const f3 = () => ee.emit('done');
/* Функция on() принимает 2 параметра: имя, под которым будет использоваться функция и сама функция. Она планирует функцию. 
В функцию on() можно передать несколько функций под одним именем и все они выполняться, 
когда сработает emit() для общего имени этих функций. */
ee.on("step1", f1.bind(null, par));
ee.on("step2", f2.bind(null, par));
ee.on("step3", f3.bind(null, par));
ee.on("step3", f1.bind(null, par)); // Записываем ещё одну функцию в тоже самое имя.
// Запускаем 1 функцию.
ee.emit("step1");

Object.keys(events); // С помощью Object.keys() можно получить все ключи переданного массива.


/* АСИНХРОННОЕ ПРОГРАММИРОВАНИЕ НА CALLBACK`АХ В JAVASCRIPT - https://www.youtube.com/watch?v=z8Hg6zgi3yQ&list=PLHhi8ymDMrQZ0MpTsmi54OkjTbo0cjU1T&index=3 */


/* Не все функции с callback`ом асинхронные. Они асинхронные только если у неё внутри есть вызов другой асинхронной функции,
вызовы setTimeout() и других вещей, которые могут разорвать синхронное выполнение кода. */

/* Колбэки хорошо подходят для того, если нужно асинхронные функции вызвать друг за другом.
Т.е у каждой функции рандомный setTimeout(), но вызваться они обязательно должны друг за другом, 
тогда можно просто каждую следующую функцию делать колбэком. */

/* Во входные данные функции всегда сначала должна передаваться ошибка, а потом уже callback. */

// Функция реализовывания цепочки. Functor - это функциональный объект. Наша цепочка это как раз functor.
function chain(prev = null) {
    const cur = () => {
        if (cur.prev) { // Если есть предыдущий объект.
            cur.prev.next = cur; // То следующий объект предыдущего объекта и будет нашем cur.
            cur.prev(); // Вызываем предыдущий объект.
        } else { // Если нет
            cur.forward(); // То вызываем следующий объект.
        }
    }

    // Объевляем свойства объекта cur.
    cur.prev = prev;
    cur.fn = null;
    cur.args = null;

    // Объявляем функцию .do
    cur.do = (fn, ...args) => { // Передавание "...args", значит, что можно передать неограниченное число параметров.
        // Объявляем нужные свойства.
        cur.fn = fn;
        cur.args = args;
        return chain(cur); // Вызываем наш chain() и передаём нужный объект, который теперь будет prev.
    }

    // Объявляем функцию .forward
    cur.forward = () => {
        if (cur.fn) { // Если функция есть
            cur.fn(cur.args, () => { // То вызываем её
                if (cur.next) { // Если следующая функция есть
                    cur.next.forward(); // То вызываем forward() для неё.
                }
            })
        }
    }

    return cur; // Возвращаем наш объект cur.
}
// Пример работы цепочки. Когда исполниться f1, то исполниться f2, и потом f3.
const c2 = chain()
    .do(f1, 'step1')
    .do(f2, 'step2')
    .do(f3, 'step3')
c2(); // Но, как я понял, то при вызове этой функции, всё вернёться в обратном порядке.
// Чтобы не писать всего этого, можно просто написать в терминал "npm install do", чтобы скачать подобную цепочку.


/* НЕБЛОКИРУЮЩЕЕ АСИНХРОННОЕ ИТЕРИРОВАНИЕ В JAVASCRIPT - https://www.youtube.com/watch?v=wYA2cIRYLoA&list=PLHhi8ymDMrQZ0MpTsmi54OkjTbo0cjU1T&index=4 */


/* Если запуститься синхронный цикл по большому массиву, но перед ним будет setTimeout(),
то нужно сначала подождать, чтобы цикл полностью завершился и только потом сработает setTimeout(). 
Это называется блокирующем итерированием. 
Если сделать for await, то итерирование также будет блокирующем. */

/* Можно сделать свой range цикл с помощью вызывания каждый раз setTimeout(), 
чтобы сделать итерирование неблокирующим и асинхронным. */


/* АСИНХРОННОСТЬ С БИБЛИОТЕКОЙ ASYNC.JS - https://www.youtube.com/watch?v=XQ94wQc-erU&list=PLHhi8ymDMrQZ0MpTsmi54OkjTbo0cjU1T&index=5 */


/* async.js это библиотека для работы с асинхронными функциями, 
он также добавляет прочие новшества в JavaScript.
О всех её функциях можно узнать на сайте - https://caolan.github.io/async/v3/docs.html#reduce.
Чтобы установить нужно просто написать "npm install async". */

/* В функцию parallel() передаётся массив или объект из асинхронных функций и функция для результатов, 
и хоть "one" выведется и запишеться позже, чем "two", 
но т.к parallel() каждой асинхронной функции даёт свой индекс, то
результаты этих функций запишуться именно так, как они идут в массиве. */
async.parallel([
    function (callback) {
        setTimeout(function () {
            callback(null, 'one');
        }, 200);
    },
    function (callback) {
        setTimeout(function () {
            callback(null, 'two');
        }, 100);
    }
], function (err, results) {
    console.log(results);
    // Результатом будет ['one','two']
});

// В parallelQueue() мы можем задавать сколько функций могут выполняться параллельно. 

/* В функцию race() передаётся массив или объект из асинхронных функций и функция для результата, 
и та функция, которая выполниться раньше всех из массива, она и запишеться, как result в конечную функцию. */
async.race([
    function (callback) {
        setTimeout(function () {
            callback(null, 'one');
        }, 200);
    },
    function (callback) {
        setTimeout(function () {
            callback(null, 'two');
        }, 100);
    }
],
    // main callback
    function (err, result) {
        // the result will be equal to 'two' as it finishes earlier
    });

// Функция asyncify() делает из функции написанной на колбеках функцию, написанную с помощью async/await.

// Функция memoize() ускоряет функцию, хешируя её.
var slow_fn = function (name, callback) {
    // do something
    callback(null, result);
};
var fn = async.memoize(slow_fn);
// fn can now be used as if it were slow_fn
fn('some name', function () {
    // callback
});

// nextTick() делает так, чтобы переданная ему функция использовалась только тогда, когда синхронный стёк полностью чист.
var call_order = [];
async.nextTick(function () {
    call_order.push('two');
    // call_order now equals ['one','two']
});
call_order.push('one');

// setImmediate() мгновенно вызывает функцию.
async.setImmediate(function (a, b, c) {
    // a, b, and c equal 1, 2, and 3
}, 1, 2, 3);

// async.apply() принимает асинхронную функцию и его параметры, в основном используется для parallel().

/* compose() принимает функции, соединяет их в одну и выполняет их последовательно, СПРАВА НАЛЕВО как они переданы. 
Также, они могут передавать друг другу значения через колбэки. */

/* В функцию series() передаётся массив или объект из асинхронных функций и функция для результата, 
все функции выполняются последовательно. */
async.series([
    function (callback) {
        setTimeout(function () {
            // do some async task
            callback(null, 'one');
        }, 200);
    },
    function (callback) {
        setTimeout(function () {
            // then do another async task
            callback(null, 'two');
        }, 100);
    }
], function (err, results) {
    console.log(results);
    // results is equal to ['one','two']
});


/* АСИНХРОННОСТЬ НА ПРОМИСАХ, PROMISE, ALL, THEN, CATCH, RACE - https://www.youtube.com/watch?v=RMl4r6s1Y8M&list=PLHhi8ymDMrQZ0MpTsmi54OkjTbo0cjU1T&index=6 */


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
        /* Метод .then() принимает до двух аргументов: функции обратного вызова для выполненных и отклоненных случаев из Promise.
        Обработчик .then применяется только к Promise() и работает так, 
        что возвращает promise, когда наше первое Promise будет выполнено.
        Таким образом мы можем создать целую цепочку функций. */

        .then(() => { // Шаг 2
            return order(0, () => console.log('production has started'))
        })


        .then(() => { // Шаг 3
            return order(2000, () => console.log("Fruit has been chopped"))
        })

        .then(() => { // Шаг 4
            return order(1000, () => console.log(`${stocks.liquid[0]} and ${stocks.liquid[1]} added`))
        })

        .then(() => { // Шаг 5
            return order(1000, () => console.log("start the machine"))
        })

        .then(() => { // Шаг 6
            return order(2000, () => console.log(`ice cream placed on ${stocks.holder[1]}`))
        })

        .then(() => { // Шаг 7
            return order(3000, () => console.log(`${stocks.toppings[0]} as toppings`))
        })

        .then(() => { // Шаг 8
            return order(2000, () => console.log("Serve Ice Cream"))
        })

        /* Чтобы справиться с ошибкой (теперь функция order() будет возвращать reject() т.к is_shop_open равна false), мы используем обработчик .catch. 
        Как и .then, он также возвращает Promise, но только в том случае, если наше первоначальное обещание потерпело ошибку. 
        Т.е:
        1. .then работает, когда Promise сработал как следует.
        2. .catch работает, когда Promise отвергнут. 
        Таким образом, между предыдущим обработчиком .then и обработчиком .catch не должно быть вообще ничего. */
        .catch(() => {
            /* Сначала выведеться то, что написано в reject() ("Что то пошло не так!"),
            а потом уже выведеться то, что тут ("Ошибка!"). */
            console.log("Ошибка!");
        })

        /* Существует обработчик .finally, который работает независимо от того, был ли наш Promise выполнен или отклонен. 
        Например: независимо от того, обслужили ли мы хотя бы одного клиента или 100 клиентов, наш магазин закроется в конце дня.*/
        .finally(() => {
            console.log("Конец дня.")
        })
}

// Promise можем принимать и только один resolve или только один reject.
const promise1 = new Promise((resolve) => {
    setTimeout(() => {
        resolve('value1'); // Передаём в resolve значение.
    }, 0);
});
promise1.then(console.log); // Выведеться 'value1', т.к мы передали в .then нужную функцию.

// Также можно писать такие сокращённые виды промисов.
const promise3 = Promise.resolve('value3');
const promise4 = Promise.reject('error');
promise3.then(console.log);
promise4.catch(console.log);

// Пример работы с Промисами.
const fs = require('node:fs');
const readFile = (filename, encoding) =>
    new Promise((resolve, reject) =>
        fs.readFile(filename, encoding, (err, data) => {
            if (err) reject(err);
            else resolve(data.toString());
        }));

readFile('file1.txt', 'utf8')
    .then((data) => { // Этот .then происходит у readFile()
        console.log(data);
        return readFile('file2.txt', 'utf8');
    })
    .then((data) => { // Этот .then происходит у прошлого .then, и принимает данные, которые этот .then вернул с помощью return.
        console.log(data);
        return readFile('file3.txt', 'utf8');
    })
    .then((data) => { // Этот .then тоже происходит у своего прошлого .then, и принимает данные, которые этот .then вернул с помощью return.
        console.log(data);
    });

/* Метод all() вызывается у класса Promise и в него передается массив функций-промиссов.
Все эти функции будут выполнять параллельно, и только когда они все выполняться, то сработает .then или .catch, если обнаружиться ошибка. */
Promise.all([
    f1('step1'),
    f2('step2'),
    f3('done')
]).then(() => {
    console.log("Done")
}).catch(() => {
    console.log("error")
});

/* Метод race() вызывается у класса Promise и в него передается массив функций-промиссов.
Все эти функции будут выполнять параллельно, но .then и .catch сработают лишь у того, кто пришёл раньше всех.
А остальные функции-промисы в массиве просто будут потеряны, и на них .then и .catch не сработает. */
Promise.race([
    f1('step1'),
    f2('step2'),
    f3('done')
]).then(() => {
    console.log("Done")
}).catch(() => {
    console.log("error")
});


/* АСИНХРОННЫЕ ФУНКЦИИ, ASYNC/AWAIT, THENABLE, ОБРАБОТКА ОШИБОК - https://www.youtube.com/watch?v=Jdf_tZuJbHI&list=PLHhi8ymDMrQZ0MpTsmi54OkjTbo0cjU1T&index=7 */


/* Если написать слово async перед любой обычной функцией, то она станет Promise.
Но, Когда мы используем async/await, мы используем немного другой формат.
async перед функцией можно ставить и у метода класса, и у метода объекта, чтобы сделать их асинхронными. */
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

// При использовании Async/Await вы также можете использовать обработчики .then, .catch и .finally, которые являются основной частью Promises.
test().then(console.log("done").catch(console.log("error")));
console.log("Этот вывод сработает сразу после того, как код в функции test() дойдёт до функции с await.");

// instanceof проверяет то, принадлежит объект к конкретному классу. Тут мы проверяем принадлежит функция test к классу Function.
console.log(test instanceof Functiom)

/* Чтобы сделать constructor() асинхронным, нужно просто возвращать у него Promise в return и также, 
когда мы записываем в переменную экземпляр класса, то у него тоже должно быть слово async, если constructor() будет асинхронным. */

// Пример реализации и работы функции sleep() для асинхронных функций.
const sleep = (msec) => new Promise((resolve) => {
    setTimeout(resolve, msec);
});
(async () => {

    console.log('Start sleep: ' + new Date().toISOString());
    console.log('  Sleep about 3 sec');
    await sleep(3000);
    console.log('After sleep: ' + new Date().toISOString());

})();

// В catch можно передавать return и тогда оно присвоиться самой функции, на которой была ошибка (и в catch вернуть уже верное значение).

// for await используется для больших файлов и для оптимизации их чтения.
const fs = require('node:fs');
(async () => {
    const stream = fs.createReadStream('./8-for-await.js', 'utf8');
    for await (const chunk of stream) {
        console.log(chunk);
    }
})();

// Thenable этот тот же Promise, например, потому что он имеет метод then в виде Promise.prototype.then(). Но это не полноценный Promise.
const fs = require('node:fs');
const metasync = require("metasync");
// Пример Thenable.
class Thenable {
    constructor() {
        this.next = null;
        this.fn = null;
    }

    then(fn) {
        this.fn = fn;
        const next = new Thenable();
        this.next = next;
        return next;
    }

    resolve(value) {
        const fn = this.fn;
        if (fn) {
            const next = fn(value);
            if (next) {
                next.then((value) => {
                    this.next.resolve(value);
                });
            }
        }
    }
}

// Пример работы Thenable.
const readFile2 = (filename) => {
    const thenable = new Thenable();
    fs.readFile2(filename, 'utf8', (err, data) => {
        if (err) throw err;
        thenable.resolve(data);
    });
    return thenable;
};
(async () => {

    const file1 = await readFile2('9-thenable.js');
    console.dir({ length: file1.length });

})();


/* АСИНХРОННЫЕ АДАПТЕРЫ: PROMISIFY, CALLBACKIFY, ASYNCIFY - https://www.youtube.com/watch?v=76k6_YkYRmU&list=PLHhi8ymDMrQZ0MpTsmi54OkjTbo0cjU1T&index=8 */


// С помощью async.asyncify() можно синхронную функцию превратить в асинхронную.
async.asyncify(fn);
// Пример создания asyncify().
const asyncify = (fn) => (...args) => {
    const callback = args.pop();
    setTimeout(() => {
        try {
            const result = fn(...args);
            if (result instanceof Error) callback(result);
            else callback(null, result);
        } catch (error) {
            callback(error);
        }
    }, 0);
};

// С помощью async.promisify() можно асинхронную функцию превратить в функцию-Промис.
async.promisify(fn);
// Пример создания promisify().
const promisify = (fn) => (...args) => new Promise(
    (resolve, reject) => {
        fn(...args, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    }
);

// С помощью async.promisifySync() можно синхронную функцию превратить в функцию-Промис.
async.promisifySync(fn);
// Пример создания promisifySync().
const promisifySync = (fn) => (...args) => {
    try {
        const result = fn(...args);
        if (result instanceof Error) return Promise.reject(result);
        else return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }
};

// Пример создания callbackify().
const callbackify = (fn) => (...args) => {
    const callback = args.pop();
    fn(...args)
        .then((value) => {
            callback(null, value);
        })
        .catch((reason) => {
            callback(reason);
        });
};
// С помощью нашей функции callbackify() можно синхронную или асинхронную функцию превратить в функцию-колбэк.
callbackify(fn);

const promiseToCallbackLast = (promise) => (callback) => {
    promise.then((value) => {
        callback(null, value);
    }).catch((reason) => {
        callback(reason);
    });
};
// С помощью нашей функции promiseToCallbackLast() можно функцию-Промис превратить в функцию-колбэк.
promiseToCallbackLast(promise);


/* АСИНХРОННЫЕ КОЛЛЕКТОРЫ ДАННЫХ - https://www.youtube.com/watch?v=tgodt1JL6II&list=PLHhi8ymDMrQZ0MpTsmi54OkjTbo0cjU1T&index=9 */


/* Синтаксический сахар — это способ написания кода, чтобы сделать его более понятным для программиста.
Иногда сахар нужен для того, чтобы сделать код короче, оставив ту же самую логику. 
При этом на работу программы такое оформление вообще не влияет — при запуске компьютер упрощает код, выбрасывает сахар и исполняет суть программы. */

/* Коллекторы данных это сборщики данных. */
const dc = metasync
    .collect(3) // Передаём, что хотим 3 части данных.
    .collect(['key1', 'key2', 'key3']) // Передаём, какие ключи данных мы хотим получить.
    .distinct() // .distinct() делает так, что данные нельзя перезаписывать.
    .done((err, result) => {
        test.error(err);
        test.StrictSame(result, expectedResult);
        test.end();
    })
    .timeout(1000); // Как только пройдёт секунда, это значит, что мы не успели собрать нужные данные и сразу произойдёт err в .done().
/* Таким образом передаём коллектору данные. Сначала передаётся ключ, под которым будут находится данные, потом ошибка и потом сами данные. */
dc.collect('key1', null, 1);
dc.collect('key2', null, 2);
dc.collect('key3', null, 3);
// Также есть метод pick(), в который необязательно передавать ошибку.
dc.pick('key1', 1);
// Также есть метод take(), в который можно передать функцию, которая выполнится. Все значения, которые идут после данных будут параметрами функции.
dc.take('key1', func, 1, params);

// Пример класса коллектора.
class Collector {
    constructor(expected) {
        this.expectKeys = Array.isArray(expected) ? new Set(expected) : null; // Ожидаемые ключи
        this.expected = this.expectKeys ? expected.length : expected; // Количество ожидаемых ключей
        this.keys = new Set(); // Собранные ключи
        this.count = 0; // Количество собранных ключей
        this.timer = null; // Таймер
        this.doneCallback = () => { }; // Функция done()
        this.finished = false; // Завершён ли коллектор
        this.data = {}; // Сами данные
    }

    collect(key, err, value) {
        if (this.finished) return this;
        if (err) {
            this.finalize(err, this.data);
            return this;
        }
        if (!this.keys.has(key)) {
            this.count++;
        }
        this.data[key] = value;
        this.keys.add(key);
        if (this.expected === this.count) {
            this.finalize(null, this.data);
        }
        return this;
    }

    pick(key, value) {
        this.collect(key, null, value);
        return this;
    }

    fail(key, err) {
        this.collect(key, err);
        return this;
    }

    take(key, fn, ...args) {
        fn(...args, (err, data) => {
            this.collect(key, err, data);
        });
        return this;
    }

    timeout(msec) {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        if (msec > 0) {
            this.timer = setTimeout(() => {
                const err = new Error('Collector timed out');
                this.finalize(err, this.data);
            }, msec);
        }
        return this;
    }

    done(callback) {
        this.doneCallback = callback;
        return this;
    }

    finalize(err, data) {
        if (this.finished) return this;
        if (this.doneCallback) {
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            this.finished = true;
            this.doneCallback(err, data);
        }
        return this;
    }
}


/* ПРОБЛЕМА АСИНХРОННОГО СТЕКТРЕЙСА В JAVASCRIPT - https://www.youtube.com/watch?v=pfiHTx3j87Y&list=PLHhi8ymDMrQZ0MpTsmi54OkjTbo0cjU1T&index=11 */


/* Стектрейс - это то, что пишется в консоли после выполнения программы. Т.е ошибки, выводы и тд. */
/* При асинхронности, в стектрейсе часто очень не понятно, где именно вызвалась ошибка.
Чаще всего это происходит именно при добавлении setTimeout(). */

/* throw генерирует определяемое пользователем исключение. 
Выполнение текущей функции остановится (последующие инструкции throw выполняться не будут), и управление будет передано первому catch блоку в стеке вызовов. 
Если среди вызывающих функций не существует catch блока, программа завершит работу. */
async function getRectArea(width, height) {
    if (isNaN(width) || isNaN(height)) {
        await pause(5); // Также, есть функция pause() для паузы в асинхронных функциях.
        throw new Error('Parameter is not a number!');
    }
}
try {
    getRectArea(3, 'A');
} catch (e) {
    console.error(e);
    // Expected output: Error: Parameter is not a number!
}


/* ГЕНЕРАТОРЫ И АСИНХРОННЫЕ ГЕНЕРАТОРЫ В JAVASCRIPT - https://www.youtube.com/watch?v=kvNm9D32s8s&list=PLHhi8ymDMrQZ0MpTsmi54OkjTbo0cjU1T&index=12 */


/* Генераторы – новый вид функций в современном JavaScript. 
Они отличаются от обычных тем, что могут приостанавливать своё выполнение, возвращать промежуточный результат и далее возобновлять его позже, 
в произвольный момент времени. Чтобы создать функцию-генератор, нужно использовать ключевое слово "function*". */
function* genFn(x) {
    return x * 2;
}

// Чтобы создать метод-генератор в классе, нужно использовать символ "*".
class Multiplier {
    constructor(k) {
        this.value = k;
    }

    * genMethod(a) { // Метод-генератор
        this.value = a * this.value;
        return a * this.value;
    }
}

// В объекте, метод-генератор создаётся точно также.
const m2 = {
    value: 2,
    * genMethod(a) { // Метод-генератор
        this.value = a * this.value;
        return a * this.value;
    }
}

// Пример функции-генератора
function* counter(begin, end, delta = 1) {
    let value = begin;
    while (end > value) { // Создаём цикл
        value += delta;
        if (value > end) return; // Функция завершается
        yield value; // На каждой итерации с помощью слова yield возвращается value. Его можно получить в будущем с помошью функции next().
    }
}
const c = counter(0, 30, 12); // Создаём объект функции генератора.
// Объекты данного типа имеют конструкцию типа "{value: 12, done: false}".
const val1 = c.next(); // Получим {value: 12, done: false}, как первое возвращённое значение, с помощью yield.
const val2 = c.next(); // Получим {value: 24, done: false}, как второе возвращённое значение, с помощью yield.
const val3 = c.next(); // Получим {value: undefined, done: true}, т.к сработало "if (value > end) return".
const val4 = c.next(); // Также получим {value: undefined, done: true}.

function* counter(begin, end, delta) {
    let value = begin;
    while (end > value) {
        value += delta;
        const back = yield value; // Присваиваем в константу переданное значение в next().
        if (back) value += back;
        console.log({ back });
    }
}
const c3 = counter(0, 30, 12);
const val12 = c3.next(); // Ничего не передаем, поэтому в back будет undefined.
const val22 = c3.next(); // Ничего не передаем, поэтому в back будет undefined.
const val32 = c3.next(150); // Передаём 150, поэтому и в back будет 150.
const val42 = c3.next(); // Ничего не передаем, поэтому в back будет undefined.

function* genFn() {
    yield* [10, 20, 30]; // yield* используется для того, чтобы переданный массив начал итерироваться.
    //yield* new Set([10, 20, 30]);
}
const c4 = genFn();
const val14 = c.next(); // Так как, мы используем yield*, то тут будет 10, а не сам массив.
const val24 = c.next(); // Так как, мы используем yield*, то тут будет 20, а не сам массив.
const val34 = c.next(); // Так как, мы используем yield*, то тут будет 30, а не сам массив.
const val44 = c.next(); // Вернёт undefined, так как значений больше не осталось.

/* Чтобы создать асинхронный генератор, нужно просто добавить ключевое слово "async". */
async function* AsyncGenFn(x) {
    return x * 2;
}
// Асинхронный генератор нужно использовать следующим образом, используя await и асинхронную функцию, как обёртку.
(async () => {
    const c42 = genFn();
    const val142 = await c.next();
    const val242 = await c.next();
    const val342 = await c.next();
    const val442 = await c.next();
})();


/* ИТЕРАТОРЫ И АСИНХРОННЫЕ ИТЕРАТОРЫ В JAVASCRIPT - https://www.youtube.com/watch?v=rBGFlWpVpGs&list=PLHhi8ymDMrQZ0MpTsmi54OkjTbo0cjU1T&index=13 */





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


/* РАБОТА С ЛОКАЛЬНОЙ БАЗОЙ ДАННЫХ - https://learn.javascript.ru/localstorage */


/* Объекты веб-хранилища localStorage и sessionStorage позволяют хранить пары ключ/значение в браузере.
Что в них важно – данные, которые в них записаны, сохраняются после обновления страницы (в случае sessionStorage)
и даже после перезапуска браузера (при использовании localStorage). Скоро мы это увидим. */

/* Объекты хранилища localStorage и sessionStorage предоставляют одинаковые методы и свойства:
setItem(key, value) – сохранить пару ключ/значение.
getItem(key) – получить данные по ключу key.
removeItem(key) – удалить данные с ключом key.
clear() – удалить всё.
key(index) – получить ключ на заданной позиции.
length – количество элементов в хранилище. */

/* Основные особенности localStorage:
Этот объект один на все вкладки и окна в рамках источника (один и тот же домен/протокол/порт).
Данные не имеют срока давности, по которому истекают и удаляются. Сохраняются после перезапуска браузера и даже ОС. */

// Перебор ключей localStorage
// Первый вариант
for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    alert(`${key}: ${localStorage.getItem(key)}`);
}
// Второй вариант
let keys = Object.keys(localStorage);
for (let key of keys) {
    alert(`${key}: ${localStorage.getItem(key)}`);
}

/* Обратите внимание, что ключ и значение должны быть строками.
Если мы используем любой другой тип, например число или объект, то он автоматически преобразуется в строку: */
localStorage.user = { name: "John" };
alert(localStorage.user); // [object Object]

// Мы можем использовать JSON для хранения объектов:
localStorage.user = JSON.stringify({ name: "John" });
// немного позже
let user = JSON.parse(localStorage.user);
alert(user.name); // John

// Также возможно привести к строке весь объект хранилища, например для отладки:
alert(JSON.stringify(localStorage, null, 2)); // для JSON.stringify добавлены параметры форматирования, чтобы объект выглядел лучше

/* Объект sessionStorage используется гораздо реже, чем localStorage.
Свойства и методы такие же, но есть существенные ограничения:
sessionStorage существует только в рамках текущей вкладки браузера.
Другая вкладка с той же страницей будет иметь другое хранилище.
Но оно разделяется между ифреймами на той же вкладке (при условии, что они из одного и того же источника).
Данные продолжают существовать после перезагрузки страницы, но не после закрытия/открытия вкладки. */
sessionStorage.setItem('test', 1); // Записываем пару ключ/значение.
alert(sessionStorage.getItem('test')); // Получаем наше значение 1.

/* Когда обновляются данные в localStorage или sessionStorage, генерируется событие storage со следующими свойствами:
key – ключ, который обновился (null, если вызван .clear()).
oldValue – старое значение (null, если ключ добавлен впервые).
newValue – новое значение (null, если ключ был удалён).
url – url документа, где произошло обновление.
storageArea – объект localStorage или sessionStorage, где произошло обновление.
Также storageArea содержит объект хранилища – событие одно и то же для sessionStorage и localStorage,
поэтому storageArea ссылается на то хранилище, которое было изменено. Мы можем захотеть что-то записать в ответ на изменения. */

/* Важно: событие срабатывает на всех остальных объектах window, где доступно хранилище, кроме того окна, которое его вызвало.
Представьте, что у вас есть два окна с одним и тем же сайтом. Хранилище localStorage разделяется между ними.
Теперь, если оба окна слушают window.onstorage, то каждое из них будет реагировать на обновления, произошедшие в другом окне. 
Это позволяет разным окнам одного источника обмениваться сообщениями. */

// срабатывает при обновлениях, сделанных в том же хранилище из других документов
window.onstorage = event => { // можно также использовать window.addEventListener('storage', event => {
    if (event.key != 'now') return;
    alert(event.key + ':' + event.newValue + " at " + event.url);
};

localStorage.setItem('now', Date.now());


/* КУКИ - https://learn.javascript.ru/cookie */


/* Куки – это небольшие строки данных, которые хранятся непосредственно в браузере. 
Куки обычно устанавливаются веб-сервером при помощи заголовка Set-Cookie. 
Затем браузер будет автоматически добавлять их в (почти) каждый запрос на тот же домен при помощи заголовка Cookie. 
Один из наиболее частых случаев использования куки – это аутентификация:
При входе на сайт сервер отсылает в ответ HTTP-заголовок Set-Cookie для того, 
чтобы установить куки со специальным уникальным идентификатором сессии («session identifier»).
Во время следующего запроса к этому же домену браузер посылает на сервер HTTP-заголовок Cookie.
Таким образом, сервер понимает, кто сделал запрос. 
Мы также можем получить доступ к куки непосредственно из браузера, используя свойство document.cookie. */

/* Значение document.cookie состоит из пар ключ=значение, разделённых ;. Каждая пара представляет собой отдельное куки.
Чтобы найти определённое куки, достаточно разбить строку из document.cookie по ;, и затем найти нужный ключ. 
Для этого мы можем использовать как регулярные выражения, так и функции для обработки массивов.
Запись в document.cookie обновит только упомянутые в ней куки, но при этом не затронет все остальные. 
Например, этот вызов установит куки с именем user и значением John: */
document.cookie = "user=John"; // обновляем только куки с именем 'user'
alert(document.cookie); // показываем все куки

/* Технически, и имя и значение куки могут состоять из любых символов, для правильного форматирования следует использовать встроенную функцию encodeURIComponent.
После encodeURIComponent пара name=value не должна занимать более 4Кб. Таким образом, мы не можем хранить в куки большие данные.
Общее количество куки на один домен ограничивается примерно 20+. Точное ограничение зависит от конкретного браузера. */
// специальные символы (пробелы), требуется кодирование
let name = "my name";
let value = "John Smith"
// кодирует в my%20name=John%20Smith
document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
alert(document.cookie); // ...; my%20name=John%20Smith

/* У куки есть ряд настроек, многие из которых важны и должны быть установлены.

path - URL-префикс пути, куки будут доступны для страниц под этим путём. Должен быть абсолютным. По умолчанию используется текущий путь.
Если куки установлено с path=/admin, то оно будет доступно на страницах /admin и /admin/something, но не на страницах /home или /adminpage.
Как правило, указывают в качестве пути корень path=/, чтобы наше куки было доступно на всех страницах сайта.

domain - Домен определяет, где доступен файл куки. Однако на практике существуют определённые ограничения. Мы не можем указать здесь какой угодно домен.
Нет никакого способа разрешить доступ к файлам куки из другого домена 2-го уровня, поэтому other.com никогда не получит куки, установленный по адресу site.com.
Это ограничение безопасности, позволяющее нам хранить конфиденциальные данные в файлах куки, которые должны быть доступны только на одном сайте.
По умолчанию куки доступны лишь тому домену, который его установил.
Пожалуйста, обратите внимание, что по умолчанию файл куки также не передаётся поддомену, например forum.site.com.
Если мы хотим разрешить поддоменам типа forum.site.com получать куки, установленные на site.com, это возможно.
Чтобы это произошло, при установке файла куки в site.com, мы должны явно установить параметр domain для корневого домена: 
domain=site.com. После этого все поддомены увидят такой файл cookie.

expires, max-age - По умолчанию, если куки не имеют ни одного из этих параметров, 
то они удалятся при закрытии браузера. Такие куки называются сессионными («session cookies»).
expires=Tue, 19 Jan 2038 03:14:07 GMT - дата истечения срока действия куки, когда браузер удалит его автоматически.
Дата должна быть точно в этом формате, во временной зоне GMT. Мы можем использовать date.toUTCString, чтобы получить правильную дату. */
// +1 день от текущей даты
let date = new Date(Date.now() + 86400e3);
date = date.toUTCString();
document.cookie = "user=John; expires=" + date;
// max-age определяет срок действия куки в секундах с текущего момента.
document.cookie = "user=John; max-age=3600"; // куки будет удалено через 1 час

/* secure - Куки следует передавать только по HTTPS-протоколу.
По умолчанию куки, установленные сайтом http://site.com, также будут доступны на сайте https://site.com и наоборот. 
С настройкой secure, если куки будет установлено на сайте https://site.com, то оно не будет доступно на том же сайте с протоколом HTTP, как http://site.com.
Таким образом, если в куки хранится конфиденциальная информация, которую не следует передавать по незашифрованному протоколу HTTP, то нужно установить этот флаг. 

samesite - Это ещё одна настройка безопасности, применяется для защиты от так называемой XSRF-атаки. 
Куки с samesite никогда не отправятся, если пользователь пришёл не с этого же сайта. 
samesite=lax - это более мягкий вариант, который также защищает от XSRF и при этом не портит впечатление от использования сайта. 
Куки с samesite=lax отправляется, если оба этих условия верны:
Используются безопасные HTTP-методы (например, GET, но не POST).
Операция осуществляет навигацию верхнего уровня (изменяет URL в адресной строке браузера). 
Таким образом, режим samesite=lax, позволяет самой распространённой операции «переход по ссылке» передавать куки. 
Но что-то более сложное, например, сетевой запрос с другого сайта или отправка формы, теряет куки.
Если это вам подходит, то добавление samesite=lax, скорее всего, не испортит впечатление пользователей от работы с сайтом и добавит защиту. 
Но samesite игнорируется (не поддерживается) старыми браузерами, выпущенными до 2017 года и ранее. 
Так что, если мы будем полагаться исключительно на samesite, то старые браузеры будут уязвимы. 

httpOnly - Эта настройка не имеет ничего общего с JavaScript, но мы должны упомянуть её для полноты изложения.
Веб-сервер использует заголовок Set-Cookie для установки куки. И он может установить настройку httpOnly. 
Эта настройка запрещает любой доступ к куки из JavaScript. Мы не можем видеть такое куки или манипулировать им с помощью document.cookie.

Эти настройки указываются после пары ключ=значение и отделены друг от друга разделителем ;, вот так: */
document.cookie = "user=John; path=/; domain=site.com; expires=Tue, 19 Jan 2038 03:14:07 GMT; secure; samesite=lax";

// Функция getCookie(name), основанная на регулярных выражениях возвращает куки с указанным name или undefined, если ничего не найдено:
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

/* Функция setCookie(name, value, options) устанавливает куки с именем name и значением value,
с настройкой path=/ по умолчанию (можно изменить, чтобы добавить другие значения по умолчанию): */
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
// Пример использования:
setCookie('user', 'John', { secure: true, 'max-age': 3600 });

// Функция deleteCookie(name) нужна чтобы удалить куки, устанавливая отрицательную дату истечения срока действия:
function deleteCookie(name) {
    setCookie(name, "", {
        'max-age': -1
    })
}

/* Куки называются сторонними, если они размещены с домена, отличающегося от страницы, которую посещает пользователь.
Например:
1. Страница site.com загружает баннер с другого сайта: <img src="https://ads.com/banner.png">.
2. Вместе с баннером удалённый сервер ads.com может установить заголовок Set-Cookie с куки, например, id=1234. 
Такие куки создаются с домена ads.com и будут видны только на сайте ads.com.
3. В следующий раз при доступе к ads.com удалённый сервер получит куки id и распознает пользователя.
4. Что ещё более важно, когда пользователь переходит с site.com на другой сайт other.com, на котором тоже есть баннер, 
то ads.com получит куки, так как они принадлежат ads.com, таким образом ads.com распознает пользователя и может отслеживать его перемещения между сайтами. */


/* РЕГУЛЯРНЫЕ ВЫРАЖЕНИЯ - https://habr.com/ru/companies/ruvds/articles/343798/ */


/* В JavaScript регулярное выражение — это один из типов объектов, который используется для поиска комбинаций символов в строках.
Существует два способа создания регулярных выражений.
Первый заключается в использовании литералов регулярных выражений. При таком подходе шаблон регулярного выражения заключают в слэши. Выглядит это так: */
var regexLiteral = /cat/;
// Второй задействует конструктор объекта RegExp, которому передают строку, из которой он создаёт регулярное выражение:
var regexConstructor = new RegExp("cat");
/* Если вы предполагаете пользоваться регулярным выражением так, что оно остаётся неизменным — лучше использовать литерал. 
Если ваше регулярное выражение является динамическим, оно может меняться в ходе выполнения программы, лучше использовать конструктор RegExp. */

/* Метод test() возвращает true если строка содержит совпадение с заданным шаблоном регулярного выражения. 
Если совпадений не найдено — он возвращает false. */
const str1 = "the cat says meow";
const str2 = "the dog says bark";
const hasCat = /cat/;
hasCat.test(str1); // true
hasCat.test(str2); // false

/* К счастью (или к несчастью — это уж кому как), основной подход к изучению регулярных выражений заключается в том, 
чтобы запоминать основные конструкции, обозначающие символы и группы символов. 
. — соответствует любому одиночному символу за исключением переноса строки.
* — соответствует предыдущему выражению, которое повторено 0 или более раз.
+ — соответствует предыдущему выражению, которое повторено 1 или более раз.
? — соответствует предыдущему выражению, повторённому 0 или 1 раз.
^ — соответствует началу строки.
$ — соответствует концу строки. 
\d — соответствует любому одиночному цифровому символу.
\w — соответствует любому символу — цифре, букве, или знаку подчёркивания.
[XYZ] — набор символов. Соответствует любому одиночному символу из набора, заданного в скобках. 
Кроме того, похожим образом можно задавать и диапазоны символов, например — [A-Z].
[XYZ]+ — соответствует символу из скобок, повторённому один или более раз.
[^A-Z] — внутри выражений, задающих диапазоны символов, символ ^ используется как знак отрицания. 
В данном примере шаблону соответствует всё, что не является буквами в верхнем регистре. */

/* Существует пять необязательных флагов регулярных выражений. 
Они могут использоваться совместно или раздельно, их помещают после закрывающего слэша. 
Регулярные выражения с флагами выглядят так: /[A-Z]/g. Мы рассмотрим тут лишь два флага:
g — глобальный поиск по строке.
i — поиск, нечувствительный к регистру. */

/* (x) — захватывающие скобки. Это выражение соответствует x и запоминает это соответствие, в результате, мы можем воспользоваться им позже.
(?:x)  — незахватывающие скобки. Выражение соответствует x, но не запоминает это соответствие
x(?=y) — упреждающее соответствие. Соответствует x только если за ним следует y. */

// Данный код возвращает true в тех случаях, когда в исследуемой строке имеется хотя бы одна цифра.
console.log(/\d/.test('12-34'));

// Тут мы проверяем строку на то, имеются ли в ней последовательности одиночных цифр, разделённых чёрточками.
console.log(/\d-\d-\d-\d/.test('1-2-3-4')); // true
console.log(/\d-\d-\d-\d/.test('1-23-4')); // false

// Можно воспользоваться знаком + для того, чтобы указать, что шаблон /d может встречаться один или более раз.
console.log(/\d+-\d+/.test('12-34')); // true
console.log(/\d+-\d+/.test('1-234')); // true
console.log(/\d+-\d+/.test('-34')); // false

/* Скажем, мы хотим проверить, имеется ли в строке нечто, напоминающее мяуканье кошки. 
m — соответствует одиночной букве m.
e+ — соответствует букве e, повторённой один или более раз.
(ow)+ соответствует сочетанию ow, повторённому один или более раз.
w — соответствует одиночной букве w. */
console.log(/me+(ow)+w/.test('meeeeowowoww')); // true

// Вот ещё один пример, он касается использования оператора ?. Знак вопроса указывает на то, что присутствие предшествующего ему символа в строке необязательно.
console.log(/cats? says?/i.test('the Cat says meow')); // true
console.log(/cats? says?/i.test('the Cats say meow')); // true

/* Регулярные выражения заключают в слэши. Кроме того, некоторые символы, вроде +, ?, и другие, имеют особый смысл. 
Если вам нужно организовать поиск в строках этих особых символов, их нужно экранировать с помощью обратного слэша. Вот как это выглядит: */
var slash = /\//;
var qmark = /\?/;
/* Кроме того, важно отметить, что для поиска одних и тех же строковых конструкций можно использовать различные регулярные выражения. Вот пара примеров:
\d — это то же самое, что и [0-9]. Каждое из этих выражений соответствует любому цифровому символу.
\w — это то же самое, что [A-Za-z0-9_]. И то и другое найдёт в строке любой одиночный алфавитно-цифровой символ или знак подчёркивания. */

// Функция, которая принимает на вход строку, вроде CamelCase, и добавляет между отдельными словами, из которой она состоит, пробелы.
function removeCc(str) {
    /* Ищем все заглавные буквы с помощью /([A-Z])/g. А потом мы используем конструкцию $1 для обращения к захваченному значению. 
    Стоит отметить, что если в выражении имеется два набора захватывающих скобок, можно пользоваться выражениями $1 и $2 для того, 
    чтобы ссылаться на захваченные значения в порядке их следования слева направо. 
    При этом захватывающие скобки можно использовать столько раз, сколько нужно в конкретной ситуации.
    Перед $1 мы ставим пробел, чтобы перед каждой найденной заглавной буквой ставился пробел. */
    return str.replace(/([A-Z])/g, ' $1');
}

// Функция для удаления лишних заглавных букв из строки и заменой их на прописные.
function lowerCase(str) {
    /* Ищем все заглавные буквы с помощью /([A-Z])/g. 
    А потом мы используем литерал "u" для обращения к захваченному значению, а потом вызова функции toLowerCase() для него. */
    return str.replace(/[A-Z]/g, u => u.toLowerCase());
}

// Функция для нахождения первой буквы строки и оглавления её.
function capitalize(str) {
    /* С помощью /^[a-z]/, мы находим первую букву в нижнем регистре, 
    а далее с помощью toUpperCase() возводим её в верхний регистр. */
    return str.replace(/^[a-z]/, u => u.toUpperCase());
}

// Функция, которая преобразует переданную ей строку, вроде camelCase, в обычное предложение и добавляет после его последнего слова точку.
function fullFunc(str) {
    let removeCc = str.replace(/([A-Z])/g, ' $1');
    let lowerCase = removeCc.replace(/[A-Z]/g, u => u.toLowerCase());
    let capitalize = lowerCase.replace(/^[a-z]/, u => u.toUpperCase());
    let finaleStr = capitalize + '.';
    return finaleStr;
}


/* РАБОТА С ГЛОБАЛЬНОЙ БАЗОЙ ДАННЫХ - https://learn.javascript.ru/indexeddb */


/* IndexedDB – это встроенная база данных, более мощная, чем localStorage.
Хранит практически любые значения по ключам, несколько типов ключей
Поддерживает транзакции для надёжности.
Поддерживает запросы в диапазоне ключей и индексы.
Позволяет хранить больше данных, чем localStorage. 
Для традиционных клиент-серверных приложений эта мощность обычно чрезмерна. 
IndexedDB предназначена для оффлайн приложений, можно совмещать с ServiceWorkers и другими технологиями. */

/* Для начала работы с IndexedDB нужно открыть базу данных. 
name – название базы данных, строка.
version – версия базы данных, положительное целое число, по умолчанию 1. */
let openRequest = indexedDB.open("name", version);

/* После открытия бд необходимо назначить обработчик событий для объекта openRequest:
success: база данных готова к работе, готов «объект базы данных» openRequest.result, его следует использовать для дальнейших вызовов.
error: не удалось открыть базу данных.
upgradeneeded: база открыта, но её не существует или её версия устарела. */
openRequest.onupgradeneeded = function () {
    // срабатывает, если на клиенте нет базы данных
    // ...выполнить инициализацию...
};

openRequest.onerror = function () {
    console.error("Error", openRequest.error);
};

openRequest.onsuccess = function () {
    let db = openRequest.result;
    // продолжить работу с базой данных, используя объект db
};

/* Мы можем открыть бд с версией 2 и выполнить обновление.
Таким образом, в openRequest.onupgradeneeded мы обновляем базу данных. 
Скоро подробно увидим, как это делается. 
А после того, как этот обработчик завершится без ошибок, сработает openRequest.onsuccess. 
Что если мы попробуем открыть базу с более низкой версией, чем текущая? Например, на клиенте база версии 3, а мы вызываем open(...2).
Возникнет ошибка, сработает openRequest.onerror. */
let openRequest = indexedDB.open("store", 2);
openRequest.onupgradeneeded = function (event) {
    // версия существующей базы данных меньше 2 (или база данных не существует)
    let db = openRequest.result;
    switch (event.oldVersion) { // существующая (старая) версия базы данных
        case 0:
        // версия 0 означает, что на клиенте нет базы данных
        // выполнить инициализацию
        case 1:
        // на клиенте версия базы данных 1
        // обновить
    }
};

// Удалить базу данных:
let deleteRequest = indexedDB.deleteDatabase("name");

openRequest.onsuccess = function () {
    let db = openRequest.result;

    // Обработчик db.onversionchange сообщает нам о попытке параллельного обновления, если текущая версия базы данных устарела.
    db.onversionchange = function () {
        db.close();
        alert("База данных устарела, пожалуйста, перезагрузите страницу.")
    };

    // ...база данных готова, используйте ее...
};

/* Обработчик OpenRequest.onblocked сообщает нам об обратной ситуации: 
в другом месте есть соединение с устаревшей версией, и оно не закрывается, поэтому новое соединение установить невозможно. */
openRequest.onblocked = function () {
    // это событие не должно срабатывать, если мы правильно обрабатываем onversionchange

    // это означает, что есть ещё одно открытое соединение с той же базой данных
    // и он не был закрыт после того, как для него сработал db.onversionchange
};

/* Хранилище объектов – это основная концепция IndexedDB. В других базах данных это «таблицы» или «коллекции». Здесь хранятся данные. 
Хранилище объектов можно создавать/изменять только при обновлении версии базы данных в обработчике upgradeneeded.
В базе данных может быть множество хранилищ: одно для пользователей, другое для товаров и так далее. 
name – это название хранилища, например "books" для книг,
keyOptions – это необязательный объект с одним или двумя свойствами:
keyPath – путь к свойству объекта, которое IndexedDB будет использовать в качестве ключа, например id.
autoIncrement – если true, то ключ будет формироваться автоматически для новых объектов, как постоянно увеличивающееся число. */
db.createObjectStore("name", [keyOptions]);

// создаём хранилище объектов для books, если ешё не существует
openRequest.onupgradeneeded = function () {
    let db = openRequest.result;
    if (!db.objectStoreNames.contains('books')) { // если хранилище "books" не существует
        db.createObjectStore('books', { keyPath: 'id' }); // создаём хранилище c параметром keyPath.
    }
};

// Чтобы удалить хранилище объектов:
db.deleteObjectStore('books');

/* Термин «транзакция» является общеизвестным, транзакции используются во многих видах баз данных.
Транзакция – это группа операций, которые должны быть или все выполнены, или все не выполнены (всё или ничего).
Все операции с данными в IndexedDB могут быть сделаны только внутри транзакций. 
store – это название хранилища, к которому транзакция получит доступ, например, "books". 
Может быть массивом названий, если нам нужно предоставить доступ к нескольким хранилищам.
type – тип транзакции, один из:
readonly – только чтение, по умолчанию.
readwrite – только чтение и запись данных, создание/удаление самих хранилищ объектов недоступно.
Есть ещё один тип транзакций: versionchange. Такие транзакции могут делать любые операции, но мы не можем создать их вручную. 
IndexedDB автоматически создаёт транзакцию типа versionchange, когда открывает базу данных, для обработчика upgradeneeded. 
Вот почему это единственное место, где мы можем обновлять структуру базы данных, создавать/удалять хранилища объектов.
После того, как транзакция будет создана, мы можем добавить элемент в хранилище, вот так: */
let transaction = db.transaction("books", "readwrite");
// получить хранилище объектов для работы с ним
let books = transaction.objectStore("books");
let book = {
    id: 'js',
    price: 10,
    created: new Date()
};
/* Хранилища объектов поддерживают два метода для добавления значений:
put(value, [key]) Добавляет значение value в хранилище. 
Ключ key необходимо указать, если при создании хранилища объектов не было указано свойство keyPath или autoIncrement. 
Если уже есть значение с таким же ключом, то оно будет заменено.
add(value, [key]) То же, что put, но если уже существует значение с таким ключом, то запрос не выполнится, будет сгенерирована ошибка с названием "ConstraintError". */
let request = books.add(book);
/* Аналогично открытию базы, мы отправляем запрос: books.add(book) и после ожидаем события success/error.
request.result для add является ключом нового объекта.
Ошибка находится в request.error (если есть). */
request.onsuccess = function () {
    console.log("Книга добавлена в хранилище", request.result);
};
request.onerror = function () {
    console.log("Ошибка", request.error);
};

/* Когда все запросы завершены и очередь микрозадач пуста, тогда транзакция завершится автоматически.
Такое автозавершение транзакций имеет важный побочный эффект. Мы не можем вставить асинхронную операцию, такую как fetch или setTimeout в середину транзакции. 
IndexedDB никак не заставит транзакцию «висеть» и ждать их выполнения. 
Поэтому лучше выполнять операции вместе, в рамках одной транзакции: отделить транзакции IndexedDB от других асинхронных операций.
Сначала сделаем fetch, подготовим данные, если нужно, затем создадим транзакцию и выполним все запросы к базе данных.
Чтобы поймать момент успешного выполнения, мы можем повесить обработчик на событие transaction.oncomplete: */
let transaction2 = db.transaction("books", "readwrite");
// ...выполнить операции...
// Только complete гарантирует, что транзакция сохранена целиком.
transaction2.oncomplete = function () {
    console.log("Транзакция выполнена");
};

// Чтобы вручную отменить транзакцию, выполните:
transaction.abort(); // Это отменит все изменения, сделанные запросами в транзакции, и сгенерирует событие transaction.onabort.

/* При ошибке в запросе соответствующая транзакция отменяется полностью, включая изменения, сделанные другими её запросами. 
Если мы хотим продолжить транзакцию (например, попробовать другой запрос без отмены изменений), это также возможно. 
Для этого в обработчике request.onerror следует вызвать event.preventDefault(). */
let transaction3 = db.transaction("books", "readwrite");
let book3 = { id: 'js', price: 10 };
let request = transaction3.objectStore("books").add(book3);
request.onerror = function (event) {
    // ConstraintError возникает при попытке добавить объект с ключом, который уже существует
    if (request.error.name == "ConstraintError") {
        console.log("Книга с таким id уже существует"); // обрабатываем ошибку
        event.preventDefault(); // предотвращаем отмену транзакции
        // ...можно попробовать использовать другой ключ...
    } else {
        // неизвестная ошибка
        // транзакция будет отменена
    }
};
transaction3.onabort = function () {
    console.log("Ошибка", transaction3.error);
};

/* События IndexedDB всплывают: запрос → транзакция → база данных. 
Все события являются DOM-событиями с фазами перехвата и всплытия, но обычно используется только всплытие.
Поэтому мы можем перехватить все ошибки, используя обработчик db.onerror, для оповещения пользователя или других целей: */
db.onerror = function (event) {
    let request = event.target; // запрос, в котором произошла ошибка

    console.log("Ошибка", request.error);
};

// Мы можем остановить всплытие и, следовательно, db.onerror, используя event.stopPropagation() в request.onerror.
request.onerror = function (event) {
    if (request.error.name == "ConstraintError") {
        console.log("Книга с таким id уже существует"); // обрабатываем ошибку
        event.preventDefault(); // предотвращаем отмену транзакции
        event.stopPropagation(); // предотвращаем всплытие ошибки
    } else {
        // ничего не делаем
        // транзакция будет отменена
        // мы можем обработать ошибку в transaction.onabort
    }
};

/* Есть два основных вида поиска в хранилище объектов:
По значению ключа или диапазону ключей. В нашем хранилище «books» это будет значение или диапазон значений book.id.
С помощью другого поля объекта, например book.price. Для этого потребовалась дополнительная структура данных, получившая название «index». */

/* Методы поиска поддерживают либо точные ключи, либо так называемые «запросы с диапазоном» – IDBKeyRange объекты, которые задают «диапазон ключей».
Диапозоны работают так, что они включают в себя все значения между определённых границ.
Диапазоны создаются с помощью следующих вызовов:
IDBKeyRange.lowerBound(lower, [open]) означает: >lower (или ≥lower, если open это true)
IDBKeyRange.upperBound(upper, [open]) означает: <upper (или ≤upper, если open это true)
IDBKeyRange.bound(lower, upper, [lowerOpen], [upperOpen]) означает: между lower и upper, включительно, если соответствующий open равен true.
IDBKeyRange.only(key) – диапазон, который состоит только из одного ключа key, редко используется. 
Для выполнения фактического поиска существуют следующие методы. Они принимают аргумент query, который может быть либо точным ключом, либо диапазоном ключей:
store.get(query) – поиск первого значения по ключу или по диапазону.
store.getAll([query], [count]) – поиск всех значений, можно ограничить, передав count.
store.getKey(query) – поиск первого ключа, который удовлетворяет запросу, обычно передаётся диапазон.
store.getAllKeys([query], [count]) – поиск всех ключей, которые удовлетворяют запросу, обычно передаётся диапазон, возможно ограничить поиск, передав count.
store.count([query]) – получить общее количество ключей, которые удовлетворяют запросу, обычно передаётся диапазон. */
// получить одну книгу
books.get('js');
// получить книги с 'css' <= id <= 'html'
books.getAll(IDBKeyRange.bound('css', 'html'));
// получить книги с id < 'html'
books.getAll(IDBKeyRange.upperBound('html', true));
// получить все книги
books.getAll();
// получить все ключи, гдe id > 'js'
books.getAllKeys(IDBKeyRange.lowerBound('js', true));

/* Для поиска по другим полям объекта нам нужно создать дополнительную структуру данных, называемую «индекс» (index).
Индекс является «расширением» к хранилищу, которое отслеживает данное поле объекта. 
Для каждого значения этого поля хранится список ключей для объектов, которые имеют это значение. Ниже будет более подробная картина.
name – название индекса,
keyPath – путь к полю объекта, которое индекс должен отслеживать (мы собираемся сделать поиск по этому полю),
option – необязательный объект со свойствами:
unique – если true, тогда в хранилище может быть только один объект с заданным значением в keyPath. 
Если мы попытаемся добавить дубликат, то индекс сгенерирует ошибку.
multiEntry – используется только, если keyPath является массивом. В этом случае, по умолчанию, индекс обрабатывает весь массив как ключ. 
Но если мы укажем true в multiEntry, тогда индекс будет хранить список объектов хранилища для каждого значения в этом массиве. 
Таким образом, элементы массива становятся ключами индекса. */
objectStore.createIndex("name", keyPath, [options]);
/* Допустим, мы хотим сделать поиск по полю price.
Сначала нам нужно создать индекс. Индексы должны создаваться в upgradeneeded, как и хранилище объектов.
Индекс будет отслеживать поле price.
Поле price не уникальное, у нас может быть несколько книг с одинаковой ценой, поэтому мы не устанавливаем опцию unique.
Поле price не является массивом, поэтому флаг multiEntry не применим. */
openRequest.onupgradeneeded = function () {
    // мы должны создать индекс здесь, в versionchange транзакции
    let books = db.createObjectStore('books', { keyPath: 'id' });
    let index = books.createIndex('price_idx', 'price');
};
/* Входные данные:
id: 'html',
price: 3
id: 'css',
price: 5
id: 'js',
price: 10
id: 'nodejs',
price: 10. 
Выходные данные: 
3: ['html'] 5: ['css'] 10: ['js','nodejs']. */

// Мы также можем использовать IDBKeyRange, чтобы создать диапазон и найти дешёвые/дорогие книги:
let request = priceIndex.getAll(IDBKeyRange.upperBound(5)); // найдём книги, где цена < 5

/* Метод delete удаляет значения по запросу, формат вызова такой же как в getAll:
delete(query) – производит удаление соответствующих запросу значений. */
books.delete('js'); // удалить книгу с id='js'

// Если нам нужно удалить книги, основываясь на цене или на любом другом поле, сначала нам надо найти ключ в индексе, а затем выполнить delete:
let request = priceIndex.getKey(5); // найдём ключ, где цена = 5
request.onsuccess = function () {
    let id = request.result;
    let deleteRequest = books.delete(id);
};

// Чтобы удалить всё:
books.clear(); // очищаем хранилище.

/* Объект cursor идёт по хранилищу объектов с заданным запросом (query) и возвращает пары ключ/значение по очереди, а не все сразу. 
Это позволяет экономить память.
Так как хранилище объектов внутренне отсортировано по ключу, курсор проходит по хранилищу в порядке хранения ключей (по возрастанию по умолчанию).
query ключ или диапазон ключей, как для getAll.
direction необязательный аргумент, доступные значения:
"next" – по умолчанию, курсор будет проходить от самого маленького ключа к большему.
"prev" – обратный порядок: от самого большого ключа к меньшему.
"nextunique", "prevunique" – то же самое, но курсор пропускает записи с тем же ключом, 
что уже был (только для курсоров по индексам, например, для нескольких книг с price=5, будет возвращена только первая). 
чтобы получить ключи, не значения (как getAllKeys): store.openKeyCursor. */
let request = store.openCursor([query], [direction]); // как getAll, но с использованием курсора:
/* Основным отличием курсора является то, что request.onsuccess генерируется многократно: один раз для каждого результата.
Вот пример того, как использовать курсор: */
let transaction6 = db.transaction("books");
let books6 = transaction.objectStore("books");
let request = books6.openCursor();
// вызывается для каждой найденной курсором книги
request.onsuccess = function () {
    let cursor = request.result;
    if (cursor) {
        let key = cursor.key; // ключ книги (поле id)
        let value = cursor.value; // объект книги
        console.log(key, value);
        cursor.continue();
    } else {
        console.log("Книг больше нет");
    }
};

/* Основные методы курсора:
advance(count) – продвинуть курсор на count позиций, пропустив значения.
continue([key]) – продвинуть курсор к следующему значению в диапазоне соответствия (или до позиции сразу после ключа key, если указан). */

/* Независимо от того, есть ли ещё значения, соответствующие курсору или нет – вызывается onsuccess, 
затем в result мы можем получить курсор, указывающий на следующую запись или равный undefined.
Также можем создать курсор для индексов. Как мы помним, индексы позволяют искать по полю объекта. 
Курсоры для индексов работают так же, как для хранилищ объектов – они позволяют экономить память, возвращая одно значение в единицу времени.
Для курсоров по индексам cursor.key является ключом индекса (например price), нам следует использовать свойство cursor.primaryKey как ключ объекта: */
let request = priceIdx.openCursor(IDBKeyRange.upperBound(5));
// вызывается для каждой записи
request.onsuccess = function () {
    let cursor = request.result;
    if (cursor) {
        let key = cursor.primaryKey; // следующий ключ в хранилище объектов (поле id)
        let value = cursor.value; // следующее значение в хранилище объектов (объект "книга")
        let keyIndex = cursor.key; // следующий ключ индекса (price)
        console.log(key, value);
        cursor.continue();
    } else {
        console.log("Книг больше нет");
    }
};

/* Добавлять к каждому запросу onsuccess/onerror немного громоздко. 
Мы можем сделать нашу жизнь проще, используя делегирование событий, например, установить обработчики на все транзакции, но использовать async/await намного удобнее.
Давайте далее в главе использовать небольшую обёртку над промисами https://github.com/jakearchibald/idb (с помощью "npm install idb"). 
Она создаёт глобальный idb объект с промисифицированными IndexedDB методами. 
Тогда вместо onsuccess/onerror мы можем писать примерно так: */
let db = await idb.openDb('store', 1, db => {
    if (db.oldVersion == 0) {
        // выполняем инициализацию
        db.createObjectStore('books', { keyPath: 'id' });
    }
});
let transaction4 = db.transaction('books', 'readwrite');
let books4 = transaction4.objectStore('books');
try {
    await books4.add(book);
    await transaction4.complete;
    console.log('сохранено');
} catch (err) {
    console.log('ошибка', err.message);
}

/* Если мы не перехватим ошибку, то она «вывалится» наружу, вверх по стеку вызовов, до ближайшего внешнего try..catch.
Необработанная ошибка становится событием «unhandled promise rejection» в объекте window.
Мы можем обработать такие ошибки вот так: */
window.addEventListener('unhandledrejection', event => {
    let request = event.target; // объект запроса IndexedDB
    let error = event.reason; //  Необработанный объект ошибки, как request.error
    /*...сообщить об ошибке...*/
});

/* Как мы уже знаем, транзакции автоматически завершаются, как только браузер завершает работу с текущим кодом и макрозадачу. 
Поэтому, если мы поместим макрозадачу наподобие fetch в середину транзакции, транзакция не будет ожидать её завершения. Произойдёт автозавершение транзакции. */
let transaction5 = db.transaction("inventory", "readwrite");
let inventory = transaction5.objectStore("inventory");
await inventory.add({ id: 'js', price: 10, created: new Date() });
await fetch("...");
/* Следующий inventory.add после fetch (*) не сработает, сгенерируется ошибка «inactive transaction», потому что транзакция уже завершена и закрыта к этому времени.
Решение такое же, как при работе с обычным IndexedDB: либо создать новую транзакцию, либо разделить задачу на части.
Подготовить данные и получить всё, что необходимо.
Затем сохранить в базу данных. */
await inventory.add({ id: 'js', price: 10, created: new Date() }); // Ошибка

// В некоторых редких случаях, когда нам нужен оригинальный объект request, мы можем получить к нему доступ, используя свойство promise.request:
let promise2 = books.add(book); // получаем промис (без await, не ждём результата)
let request = promise.request; // встроенный объект запроса
let transaction2 = request.transaction; // встроенный объект транзакции
// ...работаем с IndexedDB...
let result2 = await promise; // если ещё нужно

/* Использование indexedDB можно описать в нескольких фразах:
1. Подключить обёртку над промисами, например idb.
2. Открыть базу данных: idb.openDb(name, version, onupgradeneeded)
    Создайте хранилища объектов и индексы в обработчике onupgradeneeded или выполните обновление версии, если это необходимо.
3. Для запросов:
    Создать транзакцию db.transaction('books') (можно указать readwrite, если надо).
    Получить хранилище объектов transaction.objectStore('books').
4. Затем для поиска по ключу вызываем методы непосредственно у хранилища объектов.
    Для поиска по любому полю объекта создайте индекс.
5. Если данные не помещаются в памяти, то используйте курсор. */