

/* REACT PIZZA V2 [REMASTERED] - https://www.youtube.com/playlist?list=PL0FGkDGJQjJG9eI85xM1_iLIf6BcEdaNl */


/* ДЛЯ КОГО ДАННЫЙ КУРС И КАК ЕГО СМОТРЕТЬ? ЧТО НОВОГО? - https://www.youtube.com/watch?v=_UywBskWJ7Q&list=PL0FGkDGJQjJG9eI85xM1_iLIf6BcEdaNl */


// Ну крч, мне подходит :)


/* РАЗРАБАТЫВАЕМ ЛУЧШУЮ ПИЦЦЕРИЮ НА REACT + TYPESCRIPT + REDUX TOOLKIT + ROUTER V6 - https://www.youtube.com/watch?v=okqptJNYbXg&list=PL0FGkDGJQjJG9eI85xM1_iLIf6BcEdaNl&index=2 */


// Redux Toolkit - это типа бд, но на фронтенде.

// Функция считается функциональным компонентом, если она возвращает JSX разметку.


/* СОЗДАЁМ КОМПОНЕНТ, SCSS, IMPORT/EXPORT, PROPS (ПРОПСЫ) - https://www.youtube.com/watch?v=HAMGGnF7en4&list=PL0FGkDGJQjJG9eI85xM1_iLIf6BcEdaNl&index=3 */


// В React все JSX элементы должны быть закрыты, т.е например, инпут должен выглядеть так - <input />.
// .ejs для файлов написанных на node.js.


/* КАК ХРАНИТЬ ДАННЫЕ В КОМПОНЕНТЕ (USESTATE), ONCLICK, ДЕСТРУКТУРИЗАЦИЯ - https://www.youtube.com/watch?v=EXRqsxBNDzE&list=PL0FGkDGJQjJG9eI85xM1_iLIf6BcEdaNl&index=4 */


// В JSX вызывать функцию стейта нельзя, т.к получиться бесконечный рендер. Поэтому, надо создать отдельную функцию и в ней уже вызывать стейт.


/* СОЗДАЁМ КОМПОНЕНТ ПИЦЦ И КАТЕГОРИИ, РЕНДЕР СПИСКА, SPREAD-ОПЕРАТОР - https://www.youtube.com/watch?v=Y8j2GzMbaAw&list=PL0FGkDGJQjJG9eI85xM1_iLIf6BcEdaNl&index=5 */


// Стоит помнить, что React изначально находиться в папке public, поэтому и пути надо указывать, зная это.

// Чтобы передавать параметры в функцию, можно использовать bind().
<li onClick={onClickCategory.bind(null, 0)} className={activeIndex === 0 ? 'active' : ''}>Все</li>

// Но дучше использовать стрелочную функцию для этого. Т.к это анонимная, но не самовызывающияся функция, т.е бесконечных ререндеров не будет.
// <li onClick={() => onClickCategory(categories[category])} className={activeIndex === categories[category] ? 'active' : ''}>{category}</li>

// Также, стоит помнить, что когда проходимся по массиву с помощью map, то мы также можем брать автоматически и индекс элемента в массиве:
{
    categories.map((category, index) => (
        <li key={index} onClick={() => onClickCategory(index)} className={activeIndex === index ? 'active' : ''}>{category}</li>
    ))
}

// Не всегда есть смысл создавать для onClick() отдельную функцию, тем более если она занимает 1 строчку:
<li key={size} onClick={() => setActiveSize(index)} className={activeSize === index ? 'active' : ''}>{size} см.</li>

// Не стоит забывать про spread оператор для присваивания пропсов:
{/* <PizzaBlock
    key={pizza["id"]}
    {...pizza}
/> */}


/* СОЗДАЁМ POPUP-ОКНО СОРТИРОВКИ, ЧТО ТАКОЕ KEY? - https://www.youtube.com/watch?v=_EiClUmTlNg&list=PL0FGkDGJQjJG9eI85xM1_iLIf6BcEdaNl&index=6 */


// Пример условного рендеринга: если isVisible true, то div отрендериться. Если левая часть true, то будет сделана правая часть.
{
    isVisible &&
        <div className="sort__popup">
            <ul>
                <li>популярности</li>
                <li>цене</li>
                <li>алфавиту</li>
            </ul>
        </div>
}

// if и else нельзя писать в JSX. И впринципе всё, что пишеться не в одну строчку.


/* ПОЛУЧАЕМ ПИЦЦЫ С БЕКЕНДА (FETCH), ИЗУЧАЕМ ХУК USEEFFECT - https://www.youtube.com/watch?v=A_7DhcVwcjg&list=PL0FGkDGJQjJG9eI85xM1_iLIf6BcEdaNl&index=7 */





/* ПОДКЛЮЧАЕМ REACT ROUTER V6, СОЗДАЁМ КОМПОНЕНТ СКЕЛЕТОН - https://www.youtube.com/watch?v=eUt-M-YRjyg&list=PL0FGkDGJQjJG9eI85xM1_iLIf6BcEdaNl&index=8 */


// Стоит помнить, что отражать скелетон при рендеринге массива бессмысленно, т.к массив пустой.

// Пример рендеринга фейкового массива при загрузке и настоящего по её завершению:
<div className="content__items">
    {
        pizzasIsLoading
            // Передаём первым параметром черту, т.к индекс передаётся только вторым.
            ? [...new Array(6)].map((_, index) => <PizzaBlockSkeleton key={index} />)
            : pizzas.map((pizza) => (
                <PizzaBlock
                    key={pizza["id"]}
                    {...pizza}
                />
            ))
    }
</div>

// Пример файла index.js с роутингом:
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    BrowserRouter,
} from "react-router-dom";
import "./index.css";
import App from './App';

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);

// Пример того, как надо указывать пути в App.js:
<div className="container">
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} /> - сработает, если ничто из вышеперечисленных роутингов не сработает
    </Routes>
</div>


/* НАСТРАИВАЕМ АДАПТИВНУЮ ВЁРСТКУ, СОЗДАЁМ СТРАНИЦУ КОРЗИНЫ - https://www.youtube.com/watch?v=7t9_nmg_Yzg&list=PL0FGkDGJQjJG9eI85xM1_iLIf6BcEdaNl&index=9 */


// Адаптивные стили можно писать и для конкретного элемента:
// &__items {
//     display: grid;
//     grid-template-columns: repeat(4, 1fr);
//     grid-template-rows: repeat(2, 1fr);
//     grid-column-gap: 11px;

//     @media (max-width: 1400px) {
//       grid-template-columns: repeat(3, 1fr);
//     }
//   }

// Чтобы проскроллить в самый вверх:
window.scrollTo(0, 0);


/* ДЕЛАЕМ ФУНКЦИОНАЛ СОРТИРОВКИ И ФИЛЬТРАЦИИ ПИЦЦ - https://www.youtube.com/watch?v=X_a-ba9hxwA&list=PL0FGkDGJQjJG9eI85xM1_iLIf6BcEdaNl&index=10 */


// У mockApi и у многих других бекендов есть свои встроенные сортировки и фильтрации с помощью переданных параметров в URL, типа этого:
fetch(`https://65932afdbb12970719906e63.mockapi.io/items?${CategoryIndex > 0 ? `category=${CategoryIndex}` : ''}&sortBy=${SortFilter}&order=${SortFilter === "title" ? "asc" : "desc"}`).then(res => {

    return res.json();

}).then(arr => {

    setPizzas(arr);
    setPizzasIsLoading(false);

})


/* РАЗРАБАТЫВАЕМ ПАГИНАЦИЮ И ПОИСК ПИЦЦ - https://www.youtube.com/watch?v=VHQxz5Cdrc8&list=PL0FGkDGJQjJG9eI85xM1_iLIf6BcEdaNl&index=11 */


// Встроенный поиск с помощью filter() используется, когда предметов на странице немного, а когда много - лучше использовать запрос на бек. Как тут:
React.useEffect(() => {
    setPizzasIsLoading(true);

    fetch(`https://65932afdbb12970719906e63.mockapi.io/items?${CategoryIndex > 0 ? `category=${CategoryIndex}` : ''}&sortBy=${SortFilter}&order=${SortFilter === "title" ? "asc" : "desc"}${searchValue ? `&search=${searchValue}` : ''}`).then(res => {

        return res.json();

    }).then(arr => {

        setPizzas(arr);
        setPizzasIsLoading(false);

    })

    window.scrollTo(0, 0);

}, [CategoryIndex, SortFilter, searchValue]);

// В CSS Modules, если класс имеет в себе какой то другой класс, который надо стилизовать, то нужно использовать флаг :global.
// .root {
//     :global {
//         .previous {
//             background-color: red;
//         }
//     }
// }

// Для создания пагинации есть модуль React Paginate - https://www.npmjs.com/package/react-paginate.
// И для создания пагинации его надо скачать с помощью npm, импортировать, а затем создать компонент ReactPaginate.
import ReactPaginate from 'react-paginate';
<ReactPaginate
    className={styles.root}
    breakLabel="..."
    nextLabel=">"
    onPageChange={(e) => onChangePage(e.selected + 1)} // При смене страницы, увеличиваем текущую страницу на 1 (это функция, переданная пропсом из родителя)
    pageRangeDisplayed={4} // Сколько item`ов отображается
    pageCount={3}
    previousLabel="<"
    renderOnZeroPageCount={null}
/>

React.useEffect(() => {
    // Пример запроса на бек, с указанием страницы и лимита. Но т.к мы используем MockAPI, то он плохо работает со множеством параметров, поэтому некоторые не работают.
    // Но на нормальном беке такого быть не должно.
    fetch(`https://65932afdbb12970719906e63.mockapi.io/items?page=${CurrentPage}&limit=4&${CategoryIndex > 0 ? `category=${CategoryIndex}` : ''}&sortBy=${SortFilter}&order=${SortFilter === "title" ? "asc" : "desc"}${searchValue ? `&search=${searchValue}` : ''}`).then(res => {

        return res.json();
    })

}, [CategoryIndex, SortFilter, searchValue, CurrentPage]);


/* ЧТО ТАКОЕ КОНТЕКСТ В REACT (USECONTEXT) И PROPS DRILLING - https://www.youtube.com/watch?v=dR96e1fq6Mg&list=PL0FGkDGJQjJG9eI85xM1_iLIf6BcEdaNl&index=12 */


// useContext() следит за изменением контекста и если он измениться, то перерендерит компонент, который его использует (компоненты, обёрнутые в Context.Provider).


/* ИЗУЧАЕМ БИБЛИОТЕКУ REDUX TOOLKIT - https://www.youtube.com/watch?v=-pF8SDS-uSc&list=PL0FGkDGJQjJG9eI85xM1_iLIf6BcEdaNl&index=13 */


// Стейт менеджеры - это некая база данных для фронтенда. Обычно большие сайты на контексте не делают. Стейт менеджеры - это некое хранилище.
// Для маленьких приложений контекст впринципе подходит.

/* При использовании useContext, компонент начинает следить за всеми изменениями контекста, и если он их обнаружит, то сделает ререндер компонента.
Но если все компоненты следят за изменением контекста, а измениться значение, которое используется только в одном компоненте,
то перерисуются всё равно все компоненты, т.к контекст изменился. Стейт менеджеры же эту проблему решают. */

// Redux использует специальный хук useSelector(), который следит за конкретным объектом в хранилище, а не за всем контекстом.

// Redux - для больших приложений, Context - для маленьких.

// Redux хранит информацию где то в себе и овер дохера информации в провайдер передовать не нужно.

/* React, Redux Toolkit и React Redux - это всё разные библиотеки. React отвечает просто за создание компонентов, Redux Toolkit за глобальное хранилище, 
а React Redux их как бы объединяет. Redux Toolkit не завязана на React, её можно использовать везде. */

// Данный код нужно написать в папке redux в файле store.js
import { configureStore } from '@reduxjs/toolkit'; // Импортируем специальный объект хранилища configureStore из Redux Toolkit

export const store = configureStore({ // Создаём экзепляр этого объекта
    reducer: {},
})

// Далее в файле index.js импортируем наш файл хранилища и провайдер из React Redux, чтобы как раз связать React и Redux Toolkit.
import { store } from './app/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}> - Оборачиваем весь наш код в провайдер и в качестве store указываем хранилище Redux, чтобы весь код мог к нему обращаться.
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>
    </Provider>
);

// Slices - то некие отдельные несвязанные куски с логикой в Redux, которую обрабатывает хранилище. Это некие склады, которые хранят свою логику.

// Создаём папку slices, в которой будут храниться все файлы слайсов и создаём файл filterSlice.js с таким содержимым:
import { createSlice } from '@reduxjs/toolkit'; // Импортируем объект создания слайса

const initialState = { // Объявляем объект, который будет храниться в нашем хранилище. Объект может быть вообще любым.
    value: 0,
}

export const filterSlice = createSlice({ // Делаем слайс, который будет обрабатывать наш initialState
    name: 'filter', // Имя слайса
    initialState: initialState, // То что будет в нём храниться
    reducers: { // Функции, которые будут изменять хранилище ( в себя принимают объект initialState)
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        // Тут он принимает ещё action, но это просто значение для этой функции, с самим Redux это не связано.
        // А так, все функции тут по умолчанию первым параметром принимают наш стейт, чтобы его изменять.
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    },
})

// Объявляем все действия нашего слайса. Actions хранит в себе все функции слайса. Вытаксиваем все функции, чтобы эскпортировать их.
export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Редюсер как бы обрабатывает весь наш слайс. Он меняет хранилище и взаимодействует с ним.
export default counterSlice.reducer // Экспортируем редюсер, чтобы потом указать его в store.js:

import counterReducer from './slices/FilterSlice';
export const store2 = configureStore({
    reducer: { // Тут будет объектов редюсеров, т.е тех кто, следит за изменениями этого хранилища и влияет на них.
        counter: counterReducer // Вот тут объявляем редюсер, чтобы хранилище знало об этом слайсе
    },
})

// А затем в App.js импортируем необходимые хуки:
import { useSelector, useDispatch } from 'react-redux';

// И используем их:
export function Counter() {
    // useSelector() это типа useContext() но он берёт не всё хранилище, а конкретное значение.
    // Он по умолчанию получает стейт, который хранит все слайсы, и мы обращаемся к нашему по его имени (filter) и берём нужное нам свойство.
    const count = useSelector((state) => state.filter.value)
    const dispatch = useDispatch() // useDispatch() нужен для вызова функций слайса

    return (
        <div>
            <div>
                <button
                    aria-label="Increment value"
                    // Мы не можем просто вызвать функции слайса, они должны быть обёрнуты в dispatch().
                    // Потому что сами эти функции являются объектами, а dispatch этот объект принимает и возвращает уже функцию.
                    onClick={() => dispatch(increment())}
                >
                    Increment
                </button>
                <span>{count}</span>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    Decrement
                </button>
            </div>
        </div>
    )
}


/* ИЗУЧАЕМ ХУКИ USESELECTOR, USEDISPATCH, СОЗДАЁМ СВОЙ SLICE В REDUX TOOLKIT - https://www.youtube.com/watch?v=h1Q2V2Ek0EQ&list=PL0FGkDGJQjJG9eI85xM1_iLIf6BcEdaNl&index=14 */


// У меня получился такой слайс для категорий:
import { createSlice } from '@reduxjs/toolkit'

const initialState3 = {
    categoryIndex: 0,
}

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState3,
    reducers: {
        setCategoryIndex: (state, index) => {
            state.categoryIndex = index;
        }
    },
})

export const { setCategoryIndex } = categoriesSlice.actions

// export default categoriesSlice.reducer

// И потом в компоненте категорий я его использовал:
import React from 'react';
import { categories } from '../pages/Home';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryIndex } from '../redux/slices/CategoriesSlice';

function Categories() {

    const categoryIndex = useSelector((state) => state.categories.categoryIndex).payload; // Чтобы получить само значение нужно взять свойство payload.
    const dispatch = useDispatch();

    const CategoryOnClick = (index) => {
        dispatch(setCategoryIndex(index));
    }

    return (
        <div className="categories">
            <ul>
                {categories.map((category, index) => (
                    <li key={index} onClick={() => CategoryOnClick(index)} className={categoryIndex === index ? 'active' : ''}>{category}</li>
                ))}
            </ul>
        </div>
    );
}

//export default Categories;

// А в App.js используем так:
const categoryIndex = useSelector((state) => state.categories.categoryIndex).payload;

// state который получает useSelector - это весь объект reducers. И также, тут надо указывать имя слайса в reducers, а не в свойстве name.
const categoryIndex2 = useSelector((state) => state.filters.categoryIndex);

// Лучше делать не несколько слайсов под разные логики, а один, но который объединяет эти логики. Типа для сортировки и категорий можно создать один слайс фильтр.
// Теперь передаём только один редюсер:
import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/FilterSlice';

export const store3 = configureStore({
    reducer: {
        filter
    },
})

// И один слайс - filterSlice.js:
import { createSlice } from '@reduxjs/toolkit'

const initialState5 = {
    categoryIndex: 0,
    sortFilter: { name: "популярности", sort: "rating" },
    searchValue: ""
}

export const filtersSlice = createSlice({
    name: 'filters',
    initialState5,
    reducers: {

        setCategoryIndex: (state, index) => {
            state.categoryIndex = index.payload;
        },

        setSearchValue: (state, value) => {
            state.searchValue = value.payload;
        },

        setSortFiltering: (state, filter) => {
            state.sortFilter = filter.payload;
        }
    },
})

// export const { setCategoryIndex, setSearchValue, setSortFiltering } = filtersSlice.actions;

// export default filtersSlice.reducer;

// Вот так вод передаём объект в стейтменджер:
dispatch(setSortFiltering({ name: sortFilter, sort: sortProperty }));

// Вместо того, чтобы писать всё это:
const categoryIndex3 = useSelector((state) => state.filter.categoryIndex3);
const SortFilter = useSelector((state) => state.filter.sortFilter);
const searchValue = useSelector((state) => state.filter.searchValue);

// Можно просто написать так:
const { categoryIndex4, SortFilter4, searchValue4 } = useSelector((state) => state.filter);


/* ОПТИМИЗИРУЕМ ПОИСК С ПОМОЩЬЮ DEBOUNCE, ПАГИНАЦИЯ ЧЕРЕЗ REDUX TOOLKIT - https://www.youtube.com/watch?v=YAsKVCNqdy4&list=PL0FGkDGJQjJG9eI85xM1_iLIf6BcEdaNl&index=15 */


// Пример запроса с помощью axios:
axios.get(`https://65932afdbb12970719906e63.mockapi.io/items?page=${CurrentPage}&limit=4&${categoryIndex > 0 ? `category=${categoryIndex}` : ''}&sortBy=${SortFilter}&order=${SortFilter === "title" ? "asc" : "desc"}${searchValue ? `&search=${searchValue}` : ''}`).then(res => {

    if (res.data !== "Not found") {
        setPizzas(res.data);
    }

    setPizzasIsLoading(false);

})

// В React обращаться к JSX элементам нужно через useRef, но через querySelector и тому подобные.

// lodash это js библиотека со множеством методов.
// debounce работает так, что принимает функцию и время. И функция жта срабатывает только если с момента её последнего запуска прошло указанное время.
// Т.е если спамить функцией, то она срабатывать не будет.

// npm install lodash.debounce - импортируем только функцию debounce.

// Пример оптимизированного поиска, используя debounce:
const searchDebounce = React.useCallback(debounce((e) => {
    dispatch(setSearchValue(e.target.value));
}, 1000), [])

const onChangeInput = (e) => {
    setSearch(e.target.value);
    searchDebounce(e);
}


/* СОХРАНЯЕМ ПАРАМЕТРЫ ФИЛЬТРАЦИИ В URL - https://www.youtube.com/watch?v=e-sm4OOXHBc&list=PL0FGkDGJQjJG9eI85xM1_iLIf6BcEdaNl&index=16 */


// Сначала нужно сделать npm install qs и импортировать.
import qs from 'qs';

// С помощью данной конструкции можно создать Url, который будет включать в себя все переданные параметры.
const queryString = qs.stringify({
    SortFilter,
    categoryIndex,
    currentPage
})

// Потом импортируем хук useNavigate() и используем его:
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate(); // Обязательно чисто внутри компонента, не в колбеке.
// Передаём нашу строку с параметрами и оно вошьётся в текущий URL страницы.
navigate(`?${queryString}`)

// Чтобы скипнуть первый рендеринг у useEffect() нужно использовать useRef():
const firstUpdate = React.useRef(true);

React.useEffect(() => {

    if (firstUpdate.current) {
        firstUpdate.current = false;
    } else {
        // Действия после первого рендеринга
    }

}, [categoryIndex, sortFilter, searchValue, currentPage]);

// Так, мы можем получать параметры из нашего URL и обновлять данные в редаксе:
React.useEffect(() => {

    if (window.location.search) {

        const params = qs.parse(window.location.search.substring(1));

        dispatch(setFilters({
            categoryIndex: Number(params.categoryIndex),
            currentPage: Number(params.currentPage),
            sortFilter: params.sortFilter,
            searchValue: params.searchValue
        }));

    }
}, [])

// При React.strictMode рендер useEffect`а вызывается два раза, типа для обнаружения багов.


/* СОЗДАЁМ REDUX-ЛОГИКУ ДЛЯ КОРЗИНЫ, СКРЫТИЕ/ПОКАЗ POPUP СОРТИРОВКИ - https://www.youtube.com/watch?v=RhOvu20t0Go&list=PL0FGkDGJQjJG9eI85xM1_iLIf6BcEdaNl&index=17 */


// Чтобы навесить обработчик на весь body можно использовать обычный document.body.addEventListener().
React.useEffect(() => {
    const bodyClickFunc = (event) => {
        if (!event.path.includes(sortRef.current)) {
            setOpen(false);
        }
    }
    document.body.addEventListener("click", bodyClickFunc);

    // Чтобы лисенеры не плодились, их надо удалять при удалении компонента.
    return () => {
        document.body.removeEventListener("click", bodyClickFunc);
    }
}, [])

// Нахождение элемента с тем же id:
const findItem = state.items.find(obj => obj.id === item_id);

// Считаем сумму всех count:
const totalCount = items.reduce((sum, item) => sum + item.count, 0);

// Перед тем как вернуть код, мы можем вернуть какой нибудь другой компонент при условии:
if (!totalPrice) {
    return <CartEmpty />
}


/* АСИНХРОННЫЕ ЭКШЕНЫ В RTK (CREATEASYNCTHUNK), ОТЛАВЛИВАЕМ ОШИБКИ - https://www.youtube.com/watch?v=azf3uk4zOew&list=PL0FGkDGJQjJG9eI85xM1_iLIf6BcEdaNl&index=18 */


// async/await нужен для того, чтобы асинхронный код превратить в синхронный.

/* Бизнес-логика - это вся работа с данными, их получение, изменение и тд.
Бизнес-логику, а то есть fetch и тд лучше писать в отдельном файле, и может сохранять в редаксе. */

// side effects - это плохая практика при работе с редаксом. Т.е когда в его код попадают всякие алерты, скроллы и тд, этого быть не должно.

// В слайсе импортируем createAsyncThunk для создания асинхронного экшена (ну т.е какого то действия):
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPizzas = createAsyncThunk(
    // Путь может быть любым, это просто чтобы он был уникальным и понятным для программиста
    'pizzas/fetchPizzasStatus', // Тут указываем как бы наш путь (вначале идёт имя слайса, а далее название функции)
    // И выполняем какие то асинхронные действия:
    async ({ currentPage, categoryIndex, sortFilter, searchValue }) => {
        const { data } = await axios.get(`https://65932afdbb12970719906e63.mockapi.io/items?page=${currentPage}&limit=4&${categoryIndex > 0 ? `category=${categoryIndex}` : ''}&sortBy=${sortFilter}&order=${sortFilter === "title" ? "asc" : "desc"}${searchValue ? `&search=${searchValue}` : ''}`)

        return data;
    }
)

// А в слайсе потом надо будет передать extraReducers для обработки нашего Thunk.
export const pizzaSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        }
    },
    // reducers нужны просто для того, чтобы менять стейт, а extraReducers для чего то другого.
    extraReducers: (builder) => { // builder нужен для создания каких то действий при состояниях запроса

        // Делаем действия при состоянии отправки, успеха и ошибки.
        // К примеру, fetchPizzas.pending будет получать ссылку fetchPizzas и прикручивать туда pending. Т.е будет 'pizzas/fetchPizzasStatus/pending'
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = 'loading'; // Да, мы в редакс ещё перенесли состояние загрузки.
            state.pizzas = [];
        });

        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.pizzas = action.payload; // В action.payload вернёться сам ответ
            state.status = 'success';
        });

        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = 'error';
            state.pizzas = [];
        });
    },
})

// Вызывается этот метод также с помощью dispatch
dispatch(fetchPizzas({ currentPage, categoryIndex, sortFilter, searchValue }));

// Пример двойной условной проверки:
<div className="content__items">
    {
        status === 'error' ? <div>Ошибка</div> :
            status === 'loading'
                ? [...new Array(6)].map((_, index) => <PizzaBlockSkeleton key={index} />)
                : pizzas.map((pizza) => (
                    <PizzaBlock
                        key={pizza["id"]}
                        {...pizza}
                    />
                ))
    }
</div>

// Если нужно сделать запрос на бек и параллельно что то поменять в редаксе, то createAsyncThunk хорошо подходит.
// Если же просто запрос надо сделать, то можно сделать это и просто fetch`ем.


/* ЧТО ТАКОЕ THUNKAPI В RTK? СОЗДАЁМ СЕЛЕКТОРЫ - https://www.youtube.com/watch?v=4mCR72ug1SE&list=PL0FGkDGJQjJG9eI85xM1_iLIf6BcEdaNl&index=19 */


export const fetchPizzas2 = createAsyncThunk(
    'pizzas/fetchPizzasStatus',
    // ThunkApi это такой объект, который автоматически передаётся вторым аргументом в функцию createAsyncThunk() и имеет множество методов
    async ({ currentPage, categoryIndex, sortFilter, searchValue }, THUNKAPI) => {

        const { data } = await axios.get(`https://65932afdbb12970719906e63.mockapi.io/items?page=${currentPage}&limit=4&${categoryIndex > 0 ? `category=${categoryIndex}` : ''}&sortBy=${sortFilter}&order=${sortFilter === "title" ? "asc" : "desc"}${searchValue ? `&search=${searchValue}` : ''}`)

        // Например, мы можем вызвать у него функцию dispatch(), чтобы вызвать какой то Redux метод из другого редюсера, слайса.
        THUNKAPI.dispatch(setPizzas({ pizzas }));
        // Или с помощью функции getState() мы можем получить текущий стейт (все слайсы, с их initialState).
        THUNKAPI.getState();

        // Также, ThunkApi имеет в себе специальный объект signal типа AbortController, который нужен для остановки HTTP запроса (например, с помощью abort()).
        THUNKAPI.signal.abort();

        if (data.length == 0) {
            // Также, есть метод rejectWithValue, который вернёт ошибку с переданным текстом (состояние запроса станет rejected). Он расширяет немного сам ответ.
            return THUNKAPI.rejectWithValue('Пицц нет')
        }

        // Метод fulfillWithValue делает статус fulfilled и переданное значение возвращает в качестве ответа. Он расширяет немного сам ответ.
        return THUNKAPI.fulfillWithValue(data);
    }
)
// Проще говоря, ThunkApi это такой объект для работы внутри асинхронного экшена, даёт некоторые доп.функции.

/* Селекторы в редакс это обычные стрелочные функции, объявленные внутри файла слайса и они нужны просто чтобы повысить многоиспользованность 
и не писать одно и тоже много раз. Название функции должно содержать слово 'select'. */
export const cartSelector = (state) => state.cart;

// И потом импортируем эту функции и используем также, в useSelector().
const { items, totalPrice } = useSelector(cartSelector);

// Если селектор должен принимать какие то данные, то можно сделать так:
export const selectCartItemById = (id) => (state) => state.cart.items.find(obj => obj.id === id);

// Селекторы нужно создавать только если он будет использоваться несколько раз, если один - то смысла особо нет.


/* РАЗБИРАЕМСЯ ПОДРОБНЕЙ С РОУТЕРОМ (USEPARAMS, USELOCATION, OUTLET) - https://www.youtube.com/watch?v=06bh14iY3dA&list=PL0FGkDGJQjJG9eI85xM1_iLIf6BcEdaNl&index=20 */


// Хуки роутера, которые просто дают какие то данные, они также перерисовывают компонент.
// useLocation() нужен для того, чтобы получить данные о ссылке страницы и тд. В pathname храниться сама ссылка.
import { useLocation } from 'react-router-dom';
const location = useLocation().pathname;

// В файле создаём путь с параметром:
const pizza_URL = `/pizza/${id}`;

// Чтобы сделать путь с параметрами надо сделать так:
<Route path="/pizza/:id" element={<FullPizza />} /> // Это динамические параметры

// Со множеством параметров:
// <Route path="/pizza/:my_id/:my_second_idee" element={<FullPizza />} />

// Потом с помощью useParams() этот id можно достать
const params = useParams();
const id = params.id;

// Пример условного рендеринга при загрузке данных с бека:
if (!pizza) {
    return 'Загрузка..'
}

return (
    <div>{pizza.title}</div>
)

// Бывают случаи, когда у нас на всех страницах, есть какие то статичные компоненты, которые везде одинаковы и тогда стоит создать отдельный компонент для этого:
import Header from '../components/Header'

import React from 'react';
import { Outlet } from 'react-router-dom'; // Outlet это типа childen, но для роутов

function MainLayout() {

    // Вместо <Outlet /> будут все роуты, которые есть в App.js
    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
}
// export default MainLayout;

// И после этого надо изменить App.js:
function App() {

    // Оборачиваем все роуты в родительский роут, в котором указываем наш статичный MainLayout, который будет одинаков на всех страницах.
    // И т.к его родительский путь равен "/", то он прикручивается ко всем дочерним путям.
    // Все эти роуты и отобразаться в <Outlet />
    return (
        <Routes>
            <Route path='/' element={<MainLayout />}>
                <Route path="" element={<Home />} />
                <Route path="cart" element={<Cart />} />
                <Route path="pizza/:id" element={<FullPizza />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

// export default App;


/* ЧТО ТАКОЕ TYPESCRIPT И ЗАЧЕМ ОН НУЖЕН - https://www.youtube.com/watch?v=9MUudEhpj2A&list=PL0FGkDGJQjJG9eI85xM1_iLIf6BcEdaNl&index=21 */





/* ИСПОЛЬЗУЕМ TYPESCRIPT + REACTJS (практика) - https://www.youtube.com/watch?v=9rA2bXWDLjw&list=PL0FGkDGJQjJG9eI85xM1_iLIf6BcEdaNl&index=22 */


// Чтобы установить TypeScript в существующий проект нужно написать "npm install @types/react @types/react-dom".

// Если мы уверены, что элемент существует:
// const root: HTMLElement = document.getElementById("root")!;

// Чтобы сделать файлы в React с TypeScript и писать в них JSX, то нужно сделать расширение .tsx. Без него JSX разметку писать не получиться.

// Функции компонентов обычно возвращают объект React.JSX.Element.
// function App(): React.JSX.Element {

//     return (
//       <Routes>
//         <Route path='/' element={<MainLayout />}>
//           <Route path="" element={<Home />} />
//           <Route path="cart" element={<Cart />} />
//           <Route path="pizza/:id" element={<FullPizza />} />
//           <Route path="*" element={<NotFound />} />
//         </Route>
//       </Routes>
//     );
//   }

// Обязательно нужно создать файл tsconfig.json при переносе React проекта на TypeScript.
// И там в "compilerOptions" должна быть строчка "jsx": "react".

// Все компоненты лучше типизировать как FC (т.е, Functional Component).
// const FullPizza: React.FC = () => {};

// never - это тип, когда непонятно что.

// Чтобы корректно сделать useState() надо передать тип, который будет там храниться в качестве Generic.
//const [pizza, setPizza] = React.useState<PizzaInterface>();

// Если сделать проверку, что объект равен undefined и сделать return, а после этого писать этот объект, то он теперь не будет undefined.

// useEffect не типизируется.


/* ТИПИЗИРУЕМ ПРОПСЫ (PROPS) И ХУК USEREF (TYPESCRIPT) - https://www.youtube.com/watch?v=7QdQc-KwWKE&list=PL0FGkDGJQjJG9eI85xM1_iLIf6BcEdaNl&index=23 */


// Чтобы типизировать пропсы, можно сделать так:
// function CartItem({ id, imageUrl, title, activeType, activeSize, price, count }: CartItemInterface) {}

// Пример того, как типизировать useRef():
// const sortSpanRef = React.useRef<HTMLSpanElement>();

// Чтобы TS корректно принимал png и svg файлы, которые мы импортируем, как объекты, надо создать папку @types, в которой будут все наши кастомные типы.
// В ней создать файл с расширением .d.ts(например, assets.d.ts) и написать следующий код:

// Этим кодом мы говорим TS, чтобы он нормально воспринимал svg и png файлы:
// declare module "*.svg" {
//     const content: any;
//     export default content;
// }

// declare module "*.png" {
//     const content: any;
//     export default content;
// }

// И подключаем их в tsconfig.json:
// "include": [
//     "src",
//     "src/@types"
// ]

// Пример типизации в слайсе:
// state.pizzas = ((action.payload as unknown) as PizzaInterface[]);

// В store.ts надо взять тип диспатча:
// export type AppDispatch = typeof store.dispatch;

// И диспатч создавать теперь так:
// const dispatch = useDispatch<AppDispatch>();

// Чтобы корректно импортировать .scss файлы, надо в папке @types создать файл typings.d.ts и написать следующий код:
// declare module '*.scss';

// Лучше делать компоненты стрелочными функциями и типизировать следующим образом:
// const CartItem: React.FC<CartItemInterface> = ({ id, imageUrl, title, activeType, activeSize, price, count }) => {}


/* ТИПИЗАЦИЯ ONCLICK, ONCHANGE И EVENT (TYPESCRIPT) - https://www.youtube.com/watch?v=WbrxEPgS83c&list=PL0FGkDGJQjJG9eI85xM1_iLIf6BcEdaNl&index=24 */


// Типизация танка:
// export const fetchPizzas = createAsyncThunk(
//     'pizzas/fetchPizzasStatus',
//     async ({ currentPage, categoryIndex, sortFilter, searchValue }: FetchPizzasInterface) => {

//         const res: AxiosResponse = await axios.get(`https://65932afdbb12970719906e63.mockapi.io/items?page=${currentPage}&limit=4&${categoryIndex > 0 ? `category=${categoryIndex}` : ''}&sortBy=${sortFilter}&order=${sortFilter === "title" ? "asc" : "desc"}${searchValue ? `&search=${searchValue}` : ''}`);

//         const data: PizzaInterface[] = res.data;

//         return data;
//     }
// )

// Чтобы диспатч корректно работал:
import { ThunkDispatch } from "@reduxjs/toolkit";
// const dispatch = useDispatch < ThunkDispatch < any, any, any>> ();

// Пример правильной типизации функций:
// export interface PaginationInterface {
//     currentPage: number,
//     onChangePage: (e: number) => void
// }
//onPageChange={(e: OnPageChangePagination) => onChangePage(e.selected + 1)}

// Подобная штука вызывает функцию, только если она существует:
getCategories?.();

// event, для события клика будет типом MouseEvent:
// const bodyClickFunc = (event: MouseEvent) => {}

// Думаю, лучше типизировать функции таким способом:
// const onChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
//     setSearch((e.target as HTMLInputElement).value);
//     searchDebounce(e);
// }

// Пример, как типизировать событие, которое является событием клика на SVG элемент, навешенном в React (а не с помощью addEventListener):
// const onclickSVG = (e: React.MouseEvent<SVGSVGElement>): void => {
//     setSearch((e.target as HTMLInputElement).value);
//     searchDebounce(e);
// }

// При onChange - ChangeEvent<>, при onClick - MouseEvent<>.

// Знак "&" означает, что мы к нашему типу прибавляем ещё кое какие данные.
// type PopupClick = {
//     event: MouseEvent & {
//         path: Node[]
//     }
// }


/* TYPESCRIPT + REDUX TOOLKIT - https://www.youtube.com/watch?v=cFkSoZVzngo&list=PL0FGkDGJQjJG9eI85xM1_iLIf6BcEdaNl&index=25 */


// Мутация - это изменение свойства в объекте. Неизменяемый объект - это объект, который у которого нельзя изменить свойства.
// Импортируем объект produce
import produce from 'immer';
// Создаём обычный изменяемый объект
const state = { numbers: [1, 2, 3] }
// Создаём новый объект, не изменяя прошлый и этот newState будет уже неизменяемым.
// Мы передаём наш старый объект, как образец и draft становиться равным ему. В newState передаётся уже значение draft.
const newState = produce(state, draft => { // Т.е тут, draft - это лишь черновой вариант нашего объекта
    draft.numbers.push(4, 5, 6);
})

// Глобальный стейт, который объявляется в store.ts и нужен для типизации стейта при использовании useSelector:
// export type RootState = ReturnType<typeof store.getState>; - вытаскиваем тип, который возвращает функция getState().

// Использование:
//const categoryIndex = useSelector((state: RootState) => state.filter.categoryIndex);

// Пример того, как надо типизировать action правильно:
// builder.addCase(fetchPizzas.fulfilled, (state: PizzasInterface, action: PayloadAction<PizzaInterface[]>) => {}

// Чтобы сделать так, чтобы ключ в объекте был строкой, а значение всегда цифрой:
// ype TestType = Record<string, number>

// 1 параметр - возвращаемое значение, 2 - параметры.
//export const fetchPizzas: AsyncThunk<PizzaInterface[], FetchPizzasInterface, any> = createAsyncThunk()

// Как правильно типизировать axios запрос:
// const { data }: AxiosResponse<PizzaInterface[]> = await axios.get(`https://65932afdbb12970719906e63.mockapi.io/items?page=${currentPage}&limit=4&${categoryIndex > 0 ? `category=${categoryIndex}` : ''}&sortBy=${sortFilter}&order=${sortFilter === "title" ? "asc" : "desc"}${searchValue ? `&search=${searchValue}` : ''}`);

// enum нужен тогда, когда надо хранить какие то значения, чтобы в случае изменения не изменять их по всему коду. Пример:
// enum Status {
// Ключи обычно пишуться капсом:
//     LOADING = 'loading',
//     COMPLETED = 'completed',
//     ERROR = 'error'
// }

// И теперь можем использовать этот enum, как тип:
// export interface PizzasInterface {
//     pizzas: PizzaInterface[],
//     status: Status
// }

// И вот так его использовать. Если значение LOADING измениться на 'pending', то это не придётся изменять по всему коду, а только в enum.
// const initialState: PizzasInterface = {
//     pizzas: [],
//     status: Status.LOADING
// }

// В store.js надо создать свой диспатч:
// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = () => useDispatch<AppDispatch | any>();

// И вот так используем:
const dispatch = useAppDispatch();


/* ОПТИМИЗИРУЕМ ПЕРЕРИСОВКУ КОМПОНЕНТОВ С ПОМОЩЬЮ USECALLBACK И REACT.MEMO - https://www.youtube.com/watch?v=KvoWbHHBv88&list=PL0FGkDGJQjJG9eI85xM1_iLIf6BcEdaNl&index=26 */


/* clsx нужен для того, чтобы передавать строчку, а потом объект, в котором ключами будут строки, а значениями - true или false. 
И в зависимости от значения, ключ будет прикручиваться к исходной строчке. */
import clsx from 'clsx';
<button disabled={count === 1} className={clsx("button button--outline button--circle cart__item-count-minus", { 'disabled': count === 1 })} onClick={onClickMinus}></button>

// Пример правильного вызова debounce:
// debounce(() => {
//     dispatch(setSearchValue((e.target as HTMLInputElement).value));
//     setSearch((e.target as HTMLInputElement).value);
// }, 550)();

// Ёбанный useNavigate() всегда вызывает ререндер всего приложения.

// Логику лучше разносить по компонентам, т.к если один компонент в родительском будет зависеть от его логики и перирисовываться, то будут перерисовываться остальные.

// С деструктуризацией работать осторожно, а то он ненароком может начать за всем стейтом следить.
const currentPage = useSelector((state) => state.filter.currentPage);

// Для минимазации повторных ререндеров - надо использовать React.memo. Он создан для этого.
// Всю эту оптимизацию надо настраивать только если это правда имеет смысл и без них приложение тормозит.


/* СОХРАНЯЕМ ПИЦЦЫ В LOCALSTORAGE, ГРАМОТНО СТРУКТУРИРУЕМ ПАПКИ ПРОЕКТА - https://www.youtube.com/watch?v=hWvNWhA5J0M&list=PL0FGkDGJQjJG9eI85xM1_iLIf6BcEdaNl&index=27 */


// В localStorage нельзя хранить прямой js, только json.
// Пример добавления в localStorage значения:
// useRef нужен для того, чтобы локалсторедж не очищался при первом рендере, когда items пусты.
const isMounted = React.useRef < boolean > (false);
React.useEffect(() => {
    if (isMounted.current) {
        localStorage.setItem('cart', JSON.stringify(items));
        localStorage.setItem('totalCount', JSON.stringify(totalPrice));
    }
    isMounted.current = true;
}, [items, totalPrice]);

// А потом, в слайсе можем сразу брать значения из localStorage
const cart = {
    totalPrice: JSON.parse(localStorage.getItem("totalPrice")),
    items: JSON.parse(localStorage.getItem("cart"))
}

// В папке utils храняться все вспомогательные файлы. Всякие вычисления и тд.

// Правильно, в папке slices должны храниться папки слайсов, в которых будет selectors.ts, slice.ts, types.ts.


/* ОПТИМИЗИРУЕМ СБОРКУ JS-ФАЙЛА. CODE SPLITTING, TREE SHAKING, REEXPORT - https://www.youtube.com/watch?v=uEcss7s6vBc&list=PL0FGkDGJQjJG9eI85xM1_iLIf6BcEdaNl&index=28 */


