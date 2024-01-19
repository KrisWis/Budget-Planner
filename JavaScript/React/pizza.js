

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


