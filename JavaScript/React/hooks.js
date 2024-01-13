/* REACT HOOKS - https://www.youtube.com/playlist?list=PL0FGkDGJQjJH4Uz-Vsk_91V65Wh88nlXC */


/* Для создания приложения в React, нужно написать в терминале "npx create-react-app my-app".
Для запуска приложения обязательно должны существовать index.html в папке public и index.js в папке src. Наличие остальных файлов необязательно.
Ну а потом уже переходит в папку приложения и пишем в терминале "npm start".
Всю архитектуру приложения можно посмотреть в файле "my-app". */

// Хуки позволяют расширить возможности функциональных компонентов без использования классов.


/* USE STATE - https://www.youtube.com/watch?v=NlrhyypLCm8&list=PL0FGkDGJQjJH4Uz-Vsk_91V65Wh88nlXC */


// Состояния - это данные, которые храняться только в одном компоненте.
// UseState() используется для создания состояний, чтобы конкретные данные были доступны только одному компоненту.

// Файл index.js (основной файл, где мы и подключаем все наши компоненты):
import React from 'react'; // Подключаем React
import ReactDOM from 'react-dom'; // Подключаем DOM дерево реакта
import App from './App'; // Импортируем наш компонент
import './index.css'; // Импортируем файл стилей

ReactDOM.render( // Используем метод render для отображения/рендеринга компонента в DOM дереве
    <React.StrictMode> - основной элемент нашего приложения
        <App /> - наш компонент
    </React.StrictMode>,
    document.getElementById("root"), // Вместо какого DOM элемента будет вся эта конструкция
)


// Файл App.js (файл компонента):
import React from 'react'; // Подключаем React

function App() { // Обозначаем функцию приложения

    // Раньше мы создавали массив чисел:
    // const numbers = [1, 2, 3];

    /* А теперь мы используем хук React.useState() и т.к он возвращает массив, состоящий из хранящихся данных и функции, 
    которая будет сообщать React об изменениях в этом состоянии для ререндеринга страницы. Т.е, в нашем случае, он возвращает [[1, 2, 3], f()].
    Поэтому, мы используем деструктуризацию и присваиваем numbers массив, а setNumbers функцию.
    И теперь, массив [1, 2, 3] храниться, как состояние. А также, мы можем использовать функцию setNumbers для ЗАМЕНЫ этого состояния на другое значение. */
    const [numbers, setNumbers] = React.useState([1, 2, 3]);

    // Создаём функцию, которая добавляет в массив цифру.
    const AddNumber = () => {
        // Просто создаём рандомное число
        const randNumber = Math.floor(Math.random() * 10);

        /* И это число добавиться в массив numbers, но в том то и дело, что мы оповещаем об этом только js, но не React.
        React не знает о том, что массив обновился, поэтому элементы не перерендеривает. */
        // numbers.push(randNumber);

        /* Поэтому, используем функцию setNumbers для замены значения в нашем состоянии, которое храниться в numbers. 
        Мы передаём туда массив, где с помощью spread оператора достаём все цифры из прошлого массива и добавляем новое число, только что созданное. */
        const newArr = [...numbers, randNumber];
        setNumbers(newArr);
    }

    return ( // Функция возвращает JSX разметку (типа HTML)
        <div className="App">
            <ul>
                {
                    /* Проходимся по массиву с помощью map() и генерируем на основе каждого элемента в массиве элемент li.
                    Но также, нужно помнить, что React имеет некое виртуальное дерево и он решает, нужно ли элемент рендерить или нет.
                    Поэтому, нам нужно добавить уникальный ключ для каждого элемента с помощью свойства key, куда мы передаём индекс элемента в массиве.
                    В нашем примере, ключ может быть неуникальным, но вообще, ему нужно быть полностью уникальным и неповторяющимся.
                    И также, этого свойства в DOM дереве мы увидеть не сможем, оно находиться именно в виртуальном дереве React. */
                    numbers.map((num, index) => (
                        <li key={index}>{num}</li>
                    ))}
                В React события нужно писать с большой буквы (т.е не onclick, а onClick) и уже потом в фигурных скобках передаём функцию.
                <button onClick={AddNumber}>Новое число</button>
            </ul>
        </div>
    )
}

export default App; // Экспортируем функцию



/* Таким образом, с помощью useState() мы даём понять JavaScript`у, что нужно производить замену значения в numbers,
а потом и React сказали, что произведено изменение переменной, чтобы он понял, нужно ему ререндерить страницу или нет (зависит от свойства key). */

/* useState() стоит использовать тогда, когда переменная используется в виртуальном дереве React и её значение может изменяться.
Ну а если она не изменяется, то и смысла от использования useState() нет. */


/* USE EFFECT - https://www.youtube.com/watch?v=slaaDOt0ZvM&list=PL0FGkDGJQjJH4Uz-Vsk_91V65Wh88nlXC&index=2 */


/* useEffect нужен для того, чтобы дать понять реакту, что компонент что то сделал.
Например, что кнопка внедрена в страницу или что компонент обновился или был удалён. */

/* В React есть 3 метода для управления жизненным циклом компонента:
componentDidMount - вызывается при отображении компонента на странице;
componentDidUpdate - вызывается, когда в компоненте произошли какие то изменения.
В этот метод передаются два параметра - старое состояние и старые пропсы. Поэтому, мы можем взять потом старые и новые данные и сравнить их;
componentWillUnmount - вызывается перед удалением компонента со страницы. */

// .jsx файлы стоит создавать, если в файле присутствует JSX разметка.
// Мы создали компонент List.jsx и перенесли весь функционал из App.js в него:
import React from "react";

const List = () => {

    const [numbers, setNumbers] = React.useState([1, 2, 3]);

    // Создаём функцию, которая добавляет в массив цифру.
    const AddNumber = () => {
        /* И это число добавиться в массив numbers, но в том то и дело, что мы оповещаем об этом только js, но не React.
        React не знает о том, что массив обновился, поэтому элементы не перерендеривает. */
        // numbers.push(4);

        // Просто создаём рандомное число
        const randNumber = Math.floor(Math.random() * 10);
        /* Используем функцию setNumbers для замены значения в нашем состоянии, которое храниться в numbers. 
        Мы передаём туда массив, где с помощью spread оператора достаём все цифры из прошлого массива и добавляем новое число, только что созданное. */
        const newArr = [...numbers, randNumber];
        setNumbers(newArr);
    }

    return (
        <div>
            <ul>
                {
                    /* Проходимся по массиву с помощью map() и генерируем на основе каждого элемента в массиве элемент li.
                    Но также, нужно помнить, что React имеет некое виртуальное дерево и он решает, нужно ли элемент рендерить или нет.
                    Поэтому, нам нужно добавить уникальный ключ для каждого элемента с помощью свойства key, куда мы передаём индекс элемента в массиве.
                    В нашем примере, ключ может быть неуникальным, но вообще, ему нужно быть полностью уникальным и неповторяющимся.
                    И также, этого свойства в DOM дереве мы увидеть не сможем, оно находиться именно в виртуальном дереве React. */
                    numbers.map((num, index) => (
                        <li key={index}>{num}</li>
                    ))}
                В React события нужно писать с большой буквы (т.е не onclick, а onClick) и уже потом в фигурных скобках передаём функцию.
                <button onClick={AddNumber}>Новое число</button>
            </ul>
        </div>
    )
}
/* export default List; - т.к в файле можно экспортировать дефолтно только один элемент, то дальше буду оборачивать эти конструкции комментариями, 
но на самом деле, это необходимая вещь. */

// А файл App.js теперь выглядит следующим образом:
import React from 'react'; // Подключаем React
import List from './List'; // Импортируем компонент List

function App() { // Обозначаем функцию приложения

    return ( // Она возвращает JSX разметку (типа HTML)
        <div className="App">
            <List /> - отображаем наш компонент в этом компоненте App.
        </div>
    )
}

// export default App; // Экспортируем функцию. Опять же, оборачиваю комментариям только в этом файле, в работе оборачивать не нужно.

/* Пропсы — это данные, доступные только для чтения, которые передаются от родительского компонента дочернему компоненту. 
Они используются для настройки поведения и внешнего вида компонента. */


// Теперь мы переписываем наш прошлый функциональный компонент с помоью класса в List.jsx:
/* Важно, что наш класс наследуется от React.Component, а это значит, что он теперь имеет все методы и функции React компонента.
Например, setState(), и вышеперечисленные методы жизненного цикла. */
class List2 extends React.Component {

    // Теперь, т.к наш класс наследуется от компонента, мы можем определить в нём специальное свойство state, в котором можем хранить данные.
    state = {
        numbers: [1, 2, 3]
    };

    // Создаём функцию для добавления числа в массив, находящийся в состоянии.
    addRandomNumber = () => {
        const randNumber = Math.floor(Math.random() * 10);
        // Т.к, наш класс наследуется от компонента, мы можем использовать метод setState() куда передать новый state с новыми свойствами.
        // Но стоит помнить, что мы лишь заменяем состояние на новое значение, а не обновляем его.
        this.setState({
            numbers: [...this.state.numbers, randNumber]
        })
    }

    // Данный метод будет вызываться при отображении компонента на странице.
    componentDidMount() {
        console.log("Компонент был отображен!")
    }

    /* Этот метод будет вызываться, когда в компоненте произойдёт какое то изменение, например, обновиться состояние.
    В качестве аргументов, в эту функцию передаются предыдущие пропсы и предыдущее состояние и мы можем задать им любое имя в объявлении функции.
    В нашем случае, это будет prevProps и prevState.
    Чтобы обратиться к текущем пропсам или состояниям нужно использовать this.state и this.props. */
    componentDidUpdate(prevProps, prevState) {
        console.log(prevProps, prevState, this.props, this.state)
    }

    // Данный метод будет вызываться перед удалением компонента на странице.
    componentWillUnmount() {
        console.log("Компонент будет удалён!")
    }


    // Для рендеринга компонента, т.к наш класс наследуется от него, то у нас есть свойство render() для этого.
    render() {
        return ( // Возвращаем jsx разметку.
            <div>
                <ul>
                    {
                        this.state.numbers.map((num, index) => (
                            <li key={index}>{num}</li>
                        ))}
                    <button onClick={this.addRandomNumber}>Новое число</button>
                </ul>
            </div>
        )
    }
}

// Изменяем класс в нашем App.js для функционала удаления и появления компонента со страницы:
// Создаём состояние
const [visibleList, setVisibleList] = React.useState(true);

// Создаём функцию, которая будет менять значение состояния.
const toggleVisibleList = () => {
    /* Есть такая особенность, что иногда при использовании функции состояния, она будет возвращать старое значение.
    Чтобы этого избежать, мы можем использовать вызов анонимной самовызывающейся функции внутри функции состояния.
    Мы вызываем её, в её параметры попадает наше состояние, мы присваиваем ей имя visible и потом меняем это значение на обратное. */
    setVisibleList((visible) => !visible);
}


return ( // Она возвращает JSX разметку (типа HTML)
    <div className="App">
        Делаем так, что если visibleList равен true, то компонент отображается, если же он равен false, то он не отображается.
        Если он не отображается, то его и в DOM нету.
        {visibleList && <List />} - отображаем наш компонент в этом компоненте App.
        <button onClick={toggleVisibleList}>Показать / скрыть список</button> - делаем сюда на событие клика функцию изменения видимости компонента.
    </div>
)


// Теперь в App.js, мы можем убрать наш классовый компонент и сделать всё тоже самое, но в старом, функциональном:
// Для этого мы будем юзать хук useEffect. Он первым аргументом принимает анонимную самовызывающуюся функцию, а вторым - зависимости.
// Если в качестве второго аргумента, мы передаём пустой массив, то React`у ни за чем следить не нужно и он вызывает функцию при componentDidMount.
React.useEffect(() => {
    console.log("Компонент был отображён!")
}, []); // [] - componentDidMount(), т.е чтобы он ни за чем не следил.

/* Если же ничего не передавать вторым аргументом, то функция будет вызываться при componentDidMount и componentDidUpdate.
Т.е React будет следить за изменением вообще всего. */
React.useEffect(() => {
    console.log("Компонент был отображён!")
});

// Чтобы useEffect() отлавливал изменение чего либо, нужно передать это в массив вторым аргументом.
// В примере, мы передаём туда numbers и поэтому, useEffect() будет вызываться каждый раз, когда numbers будет как либо изменён.
// Если нам нужно фиксировать чьё то ещё изменение, то просто тоже передаём это в массив.
React.useEffect(() => {
    console.log("Компонент был отображён!")
}, [numbers]);

/* Чтобы ловить событие, когда компонент будет удалён, нужно вторым аргументом передать пустой массив, как при componentDidMount(). 
А потом в return передавать анонимную самовызывающуюся функцию, в которой и будут происходить действия при удалении компонента. */
React.useEffect(() => {
    console.log("Компонент был отображён!");
    return () => {
        console.log("Компонент будет удалён!");
    }
}, []);

/* Также, стоит иметь ввиду, что useEffect(), в которых есть зависимости, в которых пустой массив или вообще нету второго аргумента - 
все они запустяться при отображении компонента. */

/* ComponentDidMount можно использовать, когда какой то компонент рендеришь, а в его разметке есть элемент, 
который ты хочешь достать по querySelector(), но он выдаст null, т.к компонент ещё не зарендерился, а ты уже хочешь получить элемент оттуда.
Тогда и поможет ComponentDidMount. */


/* USEREF - https://www.youtube.com/watch?v=8Yy6MDsF-Tg&list=PL0FGkDGJQjJH4Uz-Vsk_91V65Wh88nlXC&index=3 */


/* При любом обновлении компонента, функция его создания вызывается заново. Поэтому, все переменные и тд пересоздаются каждый раз и тд.
Поэтому, если мы в самом начале функции, объявляем переменную, но присваиваем ей значение только при создании компонента, 
то при любом обновлении компонента, функция будет перезапускаться и значение этой переменной будет undefined, т.к значение ей присваиваться не будет. */

// Хук useRef() создаёт объект со свойством current и значением этой переменной (т.е сначала будет {current: undefined}).
// Мы бы могли создавать этот объект и сами, но главное отличие в том, что useRef() не пересоздаёт объект при перезапуске функции.
// Т.е мы можем всегда хранить актуальные данные, независимо от того, обновится компонент или нет.
// useRef() является объектом, т.к в объекте, к значению по свойству можно обратиться в любой части кода.
const ulRef = React.useRef();

/* Нам не нужно писать querySelector() и тд, можно просто в jsx разметке, в элементе, 
на который хотим получить ссылку писать атрибут ref и в него передавать наше свойство, 
и в объекте useRef в свойстве current тоже будет это значение. */
<ul ref={ulRef}></ul>

// Теперь мы можем обращаться к этому элементу в любой части функции.
ulRef.current.addEventListener("click", function () { })

/* Также, стоит иметь ввиду, что если мы создали свойство, которое будет вызываться при каком то событии и хотим удалять eventListener по переменной этой функции,
то не выйдет, т.к когда компонент обновляется, то эта переменная обновляется тоже. И она ссылается уже на совершенно другой объект.
Поэтому мы не сможем использовать эту переменную во время removeEventListener(). Это можно исправить, используя хук useCallback(). */

// Можно сказать, useRef() нужен, чтобы хранить постоянную ссылку на DOM элемент.
// Но также, его можно использовать для постоянной ссылки на переменную, например, таймер:
const timerRef = React.useRef();
timerRef.current = setTimeout(() => { }, 200);

/* Напомню, что есть такая особенность, что иногда при использовании функции состояния, она будет возвращать старое значение.
Чтобы этого избежать, мы можем использовать вызов анонимной самовызывающейся функции внутри функции состояния.
Мы вызываем её, а в её параметры всегда попадает наше прошлое состояние, и мы присваиваем этому состоянию новое значение. */
setNumbers((prev) => [...prev, 1, 2, 3]);

// Проще говоря, useRef() не перезаписывает своё свойство при перезапуске функции/обновлении компонента.