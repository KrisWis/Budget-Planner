

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


