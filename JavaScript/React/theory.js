

/* React JS c Нуля - Курс для начинающих БЕЗ ВОДЫ [2024] - https://www.youtube.com/watch?v=kz23xxukY5s */


/* Для того, чтобы работать с Vite+React нужно создать проект "npm create vite@latest". Выбрать React и далее TS или JS.
Далее в созданной папке надо установить зависимости с помощью "npm install".
А далее можно запустить проект с помощью npm run dev. */

// Можно сказать, что компоненты в React - это как врапперы в HTML, ставяться по примерно такой же логике, как кирпичики.
// Компоненты нужды для элементов на странице, которые имеют схожую структуру.
// Реактивность - это когда что то меняется в коде, и технология (в нашем случае React) это сразу перерендеривает на странице.
// Имена компонентов пишуться с большой буквы, чтобы реакт не путал их с обычными HTML тегами.

// В динамических данных, которые выводяться с помощью React можно передать только те данные, которые можно привести к строке.

// В JSX, в компонент мы можем передать какой-либо HTML код.
<Button>
    <span>33232</span>
    <h2>erwre</h2>
</Button>

// И функция компонента может принимать специальный параметр children, который и имеет в себе HTML разметку, написанную внутри тегов компонента.
export default function Button({ children }) {
    return <button>{children}</button> // И используем этот параметр
}

// События в React все те же самые, только с префиксом On. Функцию в событие надо передавать без скобок.

// Если элемент является стейтом, то реакт будет его перерисовывать, а если это статика, то нет.

// useState() можно использовать только внутри функции компонента на верхнем уровне.

// При изменении стейта с помощью функции, переменная стейта измениться только при следующем рендере.

// Любая функция, которая использует return может возвращать только что-то одно (либо кортеж/массив и тд с несколькими элементами и тд), так и в реакт.

// JSX разметка во внутренностях реакта создаётся с помощью множества React.createElement().

// Лучше, чтобы стейт был только в корневом компоненте.

// С объектом стилей можно работать только если файл стилей имеет расширение .module. Если нет, то классы используются, как обычно.
// Объект стилей принято называть classes. Принято использовать объект стилей при использовании классов в стилях. Это устраняет коллизию имён.

// Есть специальная библиотека styled-component, из неё надо импортировать объект styled:
import { styled } from 'styled-components';

// Мы можем сделать с помощью этой либы свой собственный компонент с уже встроенными стилями подобным способом:
const Header = styled.header`
    height: 50px;
    display: flex;
    padding: 0 2rem;
`
// А потом также вставить его в код:
// <Header />

// В React в <label> вместо атрибута for используется htmlFor для связи с инпутом.
/* Создаём стейт для последующей связи с инпутом. В инпут, в свойство value передаём его. 
Но если сделать только это, то в инпут не получиться ничего написать, т.к теперь его значение чётко привязано к стейту.
И если не меняется стейт, то и не меняется он. */
const [name, setName] = useState('');

/* Поэтому, мы создаём функцию, которая вызывается при событии писания в инпуте.
И теперь, то что пишеться в инпуте, храниться и в стейте, поэтому инпут работает корректно. */
function handleNameChange(event) {
    setName(event.target.value);
}

// Так и создаётся двухсторонняя привязка данных в React. Инпут зависим от стейта, а стейт зависим от инпута.
<form>
    <label htmlFor='name'>Ваше имя</label>
    <input type='text' id="name" className='control' value={name} onChange={handleNameChange}></input>
</form>

// Делаем стейт для ошибки
const [hasError, sethasError] = useState(false);

function handleNameChange(event) {
    setName(event.target.value);
    /* Стоит помнить, что стейт обновляется только после следующего ререндера функции. 
    Поэтому, тут в name будет храниться прошлое значение. */
    sethasError(name);

    // Поэтому надо следующий синтаксис для точной работы с прошлым значением.
    sethasError((prev) => { prev, name });
}

/* Часто, когда в компонент передаёшь пропсы, то можно передать их как ...props, и в сам компонент также передать их через rest оператор.
Это чтобы не писать много пропсов, а передать их сразу через props. */

// Для того, чтобы каждый раз не писать кучу useState можно написать один и передать в него объект.
const [form, setForm] = useState({
    name: '',
    hasError: true,
    reason: "help"
})

// И так, мы можем обновлять наш стейт. Но т.к стейт изменяет свой объект, а не обновляет. То надо писать каждый раз все свойства, которые прописы в оригинальном стейте.
setForm({
    name: "new",
    hasError: false
    // Тут нету поля reason, поэтому будет ошибка.
})

// Но поле reason нам не нужно менять, поэтому мы можем просто передать весь предыдущий стейт и изменить в нём нужные нам свойства.
setForm(prev => ({
    ...prev,
    name: "new",
    hasError: false
}))

// useRef() определяет значение только после того, как оно было присвоено. Если просмотреть объект до присвоения, то он будет пустым.
// В JS можно написать знак вопроса перед свойством, которое не факт, что есть в объекте и оно тогда не выдаст ошибки.
console.log(input.current?.value)

// Если useState() всегда при изменении вызывает ререндер, то useRef - нет.

// Импортируем специальный createPortal.
import { createPortal } from 'react-dom';

// Создаём реф для диалога, т.к этот элемент имеет специальные методы для отображения и потом присваиваем в jsx.
const dialog = useRef();

// Он нужен для "телепортации" html элементов, туда, куда нам надо.
createPortal(
    <dialog ref={dialog}></dialog>, // Первым аргументом, он принимает саму jsx разметку.
    document.getElementById("modal") // Вторым аргументом - элемент, в который и нужно поместить нашу разметку.
)

// useEffect с [] выполняется после полного рендера страницы.

// useCallback это перехват реакции, который позволяет вам кэшировать определение функции между повторными рендерингами.
/* useCallback принимает в качестве первого параметра функцию и возвращает ее сохраненную версию 
(с точки зрения ее местоположения в памяти, а не вычислений, выполняемых внутри).
Это означает, что возвращаемая функция не воссоздается в новой ссылке на память каждый раз при повторном рендеринге компонента, 
в то время как обычная функция внутри компонента это делает.
Возвращаемая функция воссоздается по новой ссылке на память, если изменяется одна из переменных внутри useCalback массива зависимостей (ее второй параметр). */

import { useCallback } from 'react';

export default function ProductPage({ productId, referrer }) {
    /* useCallback надо, думаю, использовать в связке с useEffect, т.к он кеширует функцию, если она имеет те же самые dependencies, что и в прошлый раз.
    Это список, который передаётся вторым параметром. Проще говоря, useCallback используется в первую очередь для оптимизации. */
    const handleSubmit = useCallback((orderDetails) => {
        post('/product/' + productId + '/buy', {
            referrer,
            orderDetails,
        });
    }, [productId, referrer]); // Реакт вызовет эту функцию при инициализации переданных зависимостей.
}


/* КУРС REACT С НУЛЯ! СОЗДАЙ СВОЁ ПРИЛОЖЕНИЕ КРИПТОВАЛЮТ! СТАНЬ REACT FRONTEND РАЗРАБОТЧИКОМ - https://www.youtube.com/watch?v=am_UiIvha5M */


// Все урлы к апи и прочию подобную данные лучше записывать в файле .env.
// Пример получения данных из .env:
import.meta.env.URL_API;

// Управляемый инпут создаётся с помощью useState, а не управляемый с помощью useRef.

// HOC (High Order Component) - это такой компонент, который оборачивает другой компонент, добавляя ему доп.функциональность.
// Пример создания HOC:
export const WithRuBalance = (Component) => { // Функция принимает компонент
    return (props) => { // Берём все пропсы компонента
        const { balance } = props; // Берём из пропсов баланс
        const ruBalance = balance * 90; // Создаём переменную на основе полученных данных
        return <Component {...props} ruBalance={ruBalance} />; // Возвращаем компонент со всеми прошлыми пропсами и с одним новым.
    };
};
// Пример использования данного HOC`а:
// export default WithRuBalance(Card); - Экспортируем уже не сам компонент, а с обёрткой.

// React.memo - это HOC для оптимизации, который предотвращает повторный рендеринг.
// Иногда, когда что то меняется в корневом компоненте, то он перерисовывается весь, даже когда некоторые компоненты перерисовывать не нужно.
// export default React.memo(FilterBlock); - компонент, который обёрнут в React.memo() будет перерендерен только в том случае, если его пропсы изменяться.

// Хук useMemo() позволяет минимизировать повторные вычисления, оптимизировать.
/* 1 параметром он принимает саму функцию, которую нужно закешировать, а вторым - зависимости, и только при измении их функция будет отрабатывать снова.
Без этого, она бы отрабатывала каждый раз при ререндере компонента. */
const expensiveCoins = useMemo(() => filterExpensiveCoins(), [filteredCoins])

// React.memo нужен для оптимизации рендера компонента, useMemo() для оптимизации сложных вычислений, а useCallback() для оптимизации создания функций.
// Когда компонент перерисовывается, то функция пересоздаётся.
/* Если функция объявлена просто как функция или выражение со стрелкой, оно будет создаваться заново при каждом рендеринге. 
Таким образом, оно будет отличаться по ссылкам. И вложенный дочерний элемент будут повторно отображаться каждый раз, хотя в этом нет необходимости. */
const addBalance = useCallback(() => { // Кешируем эту функцию
    setBalance(prev => prev + 1000)
})
/* Как и в случае с useMemo(), useCallback() мы должны использовать только тогда, когда это действительно нужно при ресурсозатратных функциях,
а в мелких функциях этого делает не стоит, т.к кеширование - это тоже трудозатратный процесс. */

// Деплой React приложения на Vercel в этом же видео с таймкода 1:31:14.

// Redux - это типа стейт менеджера. RTK Query и React Query - нужны для оптимизированных запросов на сервер.
// React Hook Form - для создания и работы над формами.


/* REACTJS ФУНДАМЕНТАЛЬНЫЙ КУРС ОТ А ДО Я - https://www.youtube.com/watch?v=GNrdg3PzpJQ */


/* Virtual DOM - не совсем корректное название, т.к дом создаётся именно в браузере, поэтому теперь это принято называть деревом React элементов.
Но в любом случае, это более легковесная копия DOM дерева в контексте браузера.
Согласование - это когда React строит новое обновленное дерево элементов и сравнивает его со старым, чтобы оптимизированно изменить DOM дерево.
Отрисовка (рендер) - это когда React нашёл разницу между этими двумя деревами элементов и начал переносить все изменения в DOM.
И для каждого изменения, React делает свою приоритетность (что-то вносит быстрее, что-то медленее). */

/* Неуправляемые компоненты похожи на обычные HTML-формы. Они запоминают всё, что вы печатали. Затем вы можете получить их значение, используя ref. 
Например, в обработчике onClick. Другими словами, вам необходимо «вытащить» значения из поля, когда вам это нужно. Это можно сделать при отправке формы. */
// Пример неуправляемого компонента:
class Form extends Component {
    handleSubmitClick = () => {
        const name = this._name.value;
        // do something with `name`
    }
    render() {
        return (
            <div>
                <input type="text" ref={input => this._name = input} />
                <button onClick={this.handleSubmitClick}>Sign up</button>
            </div>
        );
    }
}

/* Управляемый компонент принимает свое текущее значение в качестве пропсов, а также коллбэк для изменения этого значения. 
Вы можете сказать, что это более “реактивный” способ управления компонентом, однако это не означает, что вы всегда должны использовать этот метод. 
Это означает, что ваши данные (state) и пользовательский интерфейс (форма ввода) всегда синхронизированы. 
State дает значение форме, в то время как форма изменяет текущее значение state. */
// Пример управляемого компонента:
class Form extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
        };
    }

    handleNameChange = (event) => {
        this.setState({ name: event.target.value });
    };

    render() {
        return (
            <div>
                <input
                    type="text"
                    value={this.state.name}
                    onChange={this.handleNameChange}
                />
            </div>
        );
    }
}

/* Теперь у меня в Яндексе установлено расширение React Dev Tools. Чтобы его открыть, надо в Dev Tools нажать на стрелочку и нажать Profile. 
Там можно увидеть всё древо компонентов, стейты, пропсы и многое другое. */

// Пример того, как сделать передачу данных ОТ РЕБЁНКА К РОДИТЕЛЮ:
// Функция, которые мы создаём в родительском компоненте.
const createPost = (newPost) => {
    setPosts([...posts, newPost]);
}
// В родительском компоненте, в тег дочернего передаём эту функцию.
<PostForm create={createPost}></PostForm>
// Ну и потом, в дочернем компоненте, просто получаем эту функцию через пропсы и вызываем её в дочернем компоненте, передавая нужные данные.
// Проще говоря, чтобы передать данные из дочернего компонента в родительский надо сделать колбек в родительском и вызвать его в дочернем.

/* useMemo() нужен для кеширования некоторых сложных вычислений. И при каждом ререндере компонента вычисления вновь производиться не будут,
а будут доставаться из памяти. И функция, переданная в useMemo() будет пересчитывать вычисления вновь только если хотя бы одна из переданных зависимостей измениться.
Если массив зависимостей пустой, то функция отработает лишь один раз, запомнит результат и больше вызвана не будет. */

// Пример того, как добавить несколько модульных классов элементу.
// <div className={[cl.Modal, cl.active].join(" ")}></div>

// Для различных анимаций существует React Transition Group - https://reactcommunity.org/react-transition-group/.
{/* <TransitionGroup> -- весь код, рендерющий массив, который должен использовать анимации должен быть обёрнут в тег <TransitionGroup>.
    {posts.map(({ post, index }) => (
        <CSSTransition - элемент, который рендериться из массива должен быть обёрнут в CSSTransition.
            key={id} // Здесь надо указать key
            timeout={500} // Время анимации в мс
            classNames="item" // Имя класса, которое будет использовано как начальный префикс в именах классов React Transition Group.
        ></CSSTransition>
    ))}
</TransitionGroup> */}

// Стили, которые надо добавить в файл стилей. Вместо начального префикса должно стоять имя указанное в свойстве classNames.
// Каждый класс олицетворяет степень анимации:
// item-enter {
//     opacity: 0; - вместо стилей opacity можно установить любые другие анимации, например на translate.
// }
// .item-enter-active {
//     opacity: 1;
//     transition: opacity 500ms ease-in;
// }
// .item-exit {
//     opacity: 1;
// }
// .item-exit-active {
//     opacity: 0;
//     transition: opacity 500ms ease-in;
// }

// Запросы к API лучше делать в отдельной папке для API.
// Чтобы проверять загрузку с сервера лучше использовать стейты, которые индексируют загрузку.

// При многих http запросах можно передать параметры page (страница) и limit (сколько элементов на странице) для создания пагинации.

// Расширение .tsx стоит использовать тогда, когда в файле используется и TypeScript и JSX.

// Тег <Link> нужен как раз для того, чтобы страница не перезагружалась при переходе по другой ссылке.

// Чтобы проверять событие, когда юзер переходит на несуществующую страницу есть компоненты <Switch> и <Redirect/>.
// В компонент Switch надо обёрнуть все возможные пути, по которым может перейти юзер (т.е тут находяться все Route).
// Т.к данный кусок кода весь касается маршрутизации, то его стоит сделать отдельным компонентом, например <AppRouter>.
<Switch>

    <Route path="/about">
        <About />
    </Route>

    <Route exact path="/posts">
        <Posts />
    </Route>

    Чтобы <Redirect /> отрабатывал корректно, нужно создать Route с путём, на который он перенаправляет.
    <Route path="/error">
        <Posts />
    </Route>

    Тег <Redirect /> будет отрабатывать только тогда, если юзер попал на страницу, которой нету ни в одном из Route.
    И в параметр "to" надо передать путь, на который и будет перенаправлять юзера, если он попал на неизвестную страницу.
    <Redirect to='/error' />
</Switch>

// Также, существует хук useHistory(), который имеет множество свойств и методов, но нас интересует метод push().
const router = useHistory();
// push() позволяет перенаправлять юзера на переданный юрл без нажатия на ссылки и прочее.
// <Button onClick(() => router.push(`/posts/{id}))></Button>

// Для того, чтобы путь был динамическим необходимо указать двоеточие, а затем название параметра.
<Route exact path="/posts/:id"> - для того, чтобы реакт воспринимал пути, как разные и не путал с роутом "/posts", надо добавить exact.
    <Posts />
</Route>

// Хук useParams() выдаст объект с параметрами адреса, по которому перешёл юзер. Т.е если мы в path в параметрах указали id и в пути там идёт двойка, то будет "id": 2.
const params = useParams();

// Все роуты лучше хранить в отдельном файле, например, AppRouter.jsx и хранить их в массиве, типа:
export const routes = [
    { path: '/about', component: About, exact: true }, // Пишем путь, сам компонент (ранее, надо импортировать) и значение атрибута exact.
    { path: '/posts/:id', component: PostIdPage, exact: false }
]

// И в файле приложения уже проходиться по этому массиву и создавать роуты:
{
    routes.map(route =>
        <Route
            path={route.path}
            component={route.component}
            exact={route.exact}
        />
    )
}

/* Ещё лучше создать два массива publicRoutes и privateRoutes, в которых будут храниться публичные и приватные пути соответственно.
И в зависимости от того, авторизован юзер или нет, то делать итерацию по конкретному массиву. */

// Контекстов лучше делать несколько, для конкретной ситуации.

// Функционал Infinity Scrolling можно реализовать с помощью Intersection Observer API.

// Для начала нужно сделать IntersectionObserver и передать в него колбек, который будет отрабатывать, когда переданный элемент будет в зоне видимости юзера.
let observer = new IntersectionObserver(callback);
// Через функцию observe() передаём элемент, за которым и надо следить обсёрверу (когда юзер доскроллит до этого элемента, отработает колбек).
observer.observe(lastElement);

// В этот колбек автоматически первым параметром передаётся поле entries, которое хранит некоторые данные об элементе, за которым следит обсервер.
let callback = function (entries, observer) {
    // И у этого поля есть свойство isIntersecting, которое следит за тем, находиться ли элемент в зоне видимости или нет.
    if (entries[0].isIntersecting) { // По умолчанию, колбек отрабатывает и при входе элемента в зону видимости и при выходе, поэтому делаем проверку.
        console.log("Объект в зоне видимости")
    }
}

// Часто, когда нужно получить все объекты с бека, то нужно в качестве limit указать -1.


/* FEATURE-SLICED DESIGN - ЛУЧШАЯ FRONTEND АРХИТЕКТУРА - https://www.youtube.com/watch?v=O4SDx-aZY5U&t=206s */


/* FSD (Feature-Sliced Design) — это современная архитектура, спроектированная специально для фронтенд-проектов.
Она подходит почти для любых бизнес-условий, позволяет решать повседневные проблемы и интуитивно понятна разработчикам-новичкам.

В FSD-архитектуре проект состоит из уровней, каждый уровень — из срезов, а каждый срез — из сегментов.

Основные достоинства FSD:

— Ориентированность на потребности пользователя и бизнеса;
— Контролируемое повторное использование логики;
— Стабильность при внесении изменений и рефакторинге;
— Высокая масштабируемость как на уровне архитектуры, так и на уровне команды;
— Постепенный переход на эту архитектуру;
— Независимость от технологического стека;
— Высокая стандартизация;
— Отличная документация и большое сообщество. */

/* Layers:
Все слои содержаться в папке src, вне src ничего трогать не нужно.
Сначала идёт app - корневые файлы, подключение роутинга, редакса и тд. Собирается из страниц.
pages - компоненты страниц. Страница собирается из виджетов.
widgets - самостоятельные большие компоненты. Здесь собираются виджеты, соединяющие свои сущности из features и entities.
features - функционал виджета (поиск, пагинация и тд).
Хотя может features никак не связаны с widgets, а это какой универсальный компонент, с которым может взаимодействовать юзер.
entities - бизнес сущность виджета (карточка товара или профиля и тд). Содержит скелет виджета.
shared - какие то общие элементы (общие хуки, функции и тд).
Нижележащий слой не может использовать вышележащий, кроме shared (его можно исппользовать везде).
Каждый слой должен быть представлен отдельной папкой. */

/* Slices - каждый слой (кроме наверное app и shared) делиться на слайсы. Это распределение на определённые сущности:
Могут быть одинаковые слайсы в разных слоях. Например, слайс карточки юзера, который будет определять его пост и комментарий.
Вообщем, разные слайсы могут использовать один и тот же слайс для разных целей.
У нас не может быть никакого обмена между слайсами.

К примеру, у app слайсы могут быть такие:
appEntry.tsx - создание рендера на элемент root.
appStore.ts - это весь store.ts.
appReducer.ts - это все редюсеры. Т.е создание константы со значением по типу:
export const RootReducer = combineReducers({news: newsReducer, [newsApi.reducerPath]: newsApi.reducer}).
И в appStore.ts в reducer как раз таки добавить наш созданый корневой редюсер.
Также, можно в app создать папку layouts с файлом BaseLayout.tsx, в котором будет наш компонент приложения.
Также, в app можно создать папку context, в которой и будем хранить глобальный контекст.

А у pages:
Папка с названием страницы, в ней папка ui и в ней файлы Page.tsx и styles.module.scss.
И также внутри этой папки ui могут быть ещё папки, которые могут использоваться как обёртки для других компонентов.
И должен быть файл index.ts в папке с названием страницы с экспортами.

У widgets примерно также:
Папка с названием виджета - ui - и папка компонентов и корневой файл виджета index.ts, где и будут экспортироваться компоненты.

У entities:
Папка с названием сущности - папки api, ui, model (это сегменты). В ui надо добавить отдельные компоненты, связанные с этой ентити.
В model подходит слайс и типы с интерфейсами для этого entity, а в api - соответственно обращение к API у этого ентити.
Если какая то из этих папок не нужна, то её спокойно можно удалить.
В папке с названием сущности также надо создать файл index.ts, где будут объявлены все экспорты.

У shared:
Может быть что угодно - utils, helpers, hocs, interfaces, assets, скелетоны и тд. Вообщем, что то такое общее, что используется много где в проекте.
И должен быть файл index.ts в папке с названием страницы с экспортами.

У features:
Папка с названием сущности (пагинация, слайдер - т.е самостоятельные универсальные сущности). Потом папка ui и в ней .ts файл и файл стилей.
В папке с названием сущности также файл index.ts для экспортов. Также, можно сделать в ней специальные папки для хуков и тд. */

/* Segments - каждый слайс делиться на сегменты.
К примеру у слайса юзера, может быть сегмент UI, сегмент API и тд. */

// Добавления алиаса для красивого пути - https://dev.to/tilly/aliasing-in-vite-w-typescript-1lfo. Чтобы не писать лишнего при записи путей.
// Вместо, к примеру src/aboba можно писать просто @ у всех путей.

// FSD ещё в бете и оно зависит от субъективщины, для каждого человека оно своё, но концепция +- одинаковая.


/* EVENT LOOP ОТ А ДО Я. АРХИТЕКТУРА БРАУЗЕРА. ДВИЖКИ И РЕНДЕР - https://www.youtube.com/watch?v=zDlg64fsQow&t=1820s */


/* В архитектуре браузера сначала идёт пользовательский интерфейс (название говорит само за себя).
Потом идёт браузерный движок, который является соединительной частью между пользовательским интерфейсом и механизмом рендеринга.
И последним идёт механизм рендеринга, который отвечает за обработку HTML,CSS,JS кода.
Механизм рендеринга также имеет в себе 3 части:
Работа с сетью - доменные правила, http, обмен пакетами и тд.
Движок JavaScript - обработка JS кода, его компиляция в машинный код.
UI backend - подкопотная логика, т.е бекенд.
Последняя часть архитектуры браузера - это хранилища данных (localStorage, sessionStorage, куки и тд). */

/* Архитектура движка рендера:
Ему приходит HTML и CSS, он их парсит, создаёт DOM дерево и правила CSS стилей.
Потом они объединяются и строется дерево рендера, с ним происходят некоторые процессы и сайт теперь видно на экране.  */

/* EventLoop не входит в JavaScript. Браузерный EventLoop и nodeJS EventLoop - разные.
Браузерный EventLoop - это отдельный механизм, который позволяет использовать неблокирующую модель ввода и вывода. */

/* Существует некоторый стёк вызовов. За него отвечает движок JavaScript. В нём хранятся все вызовы функций и тд в JavaScript.
Например, если функции вызываются друг за другом, то они и выполняться друг за другом.
Если же функция вызывает другую функцию, то сначала вызывается эта другая, а потом уже её родитель и так далее, от ребёнка к родителю.
Стэк вызовов - не бесконечный. */

/* Также, существует очередь задач - в неё попадают функции, которые вызываются не сразу, а например с помощью setTimeout.
За неё отвечает браузерный eventLoop.
И потом, спустя определённое время js берёт из очереди задач функцию и вызывает её.
Но он может взять что-либо из очереди задач только в том случае, если стек вызовов сейчас полностью пустой. */

/* Движок JavaScript отвечает за:
1. Стек вызовов и кучу. Куча - это распределение динамической памяти. Объекты, функции и массивы в JavaScript размещаются в куче. 
Размер кучи определяется во время выполнения программы (а не во время компиляции), что делает ее динамической. Данные хранятся в куче, а ссылки на них — в стеке. 
2. Работу с памятью (сбор мусора и тд). 
3. Компиляция JS кода в машинный.
4. Оптимизация (кеши и прочее). */

/* Event Loop не является частью движков. Он предоставляется средой (nodeJS или браузером). */

/* У каждого браузера есть web API, он предоставляет таймауты, слушатели событий, загрузки изображений, http запросы и тд.
Т.е после того, как таймаут попадает в стэк вызовов, то он попадает в web API, где и считается время.
После того, как таймер иссяк, то функция попадает в очередь задач, где ждёт очищения стэка и после этого попадает в этот стэк и выполняется.
С addEventListener примерно тоже самое - они попадают в стэк, потом регистрируются в webApi.
И после того, как событие этого листенера выполниться, то функция попадает в очередь задач. */

/* Есть две очереди задач:
Очереди событий (макрозадач) и задач (микрозадач). Промисы всегда попадают в очередь задач. А таймауты как раз попадают в очередь событий.
В приоритете у Event Loop всегда задачи, поэтому промисы всегда выполняются быстрее таймаутов.
Сначала выполняются все задачи в очереди микрозадач, а уже потом, когда эта очередь будет пуста, Event Loop перейдёт к очереди макрозадач.
Причём, если макрозадача в результате своего выполнения попродит микрозадачи, 
то приоритет опять будет у них и макрозадачи не будут выполняться, пока не выполняться все микрозадачи.
Т.е, в стеке вызовов сначала выполняется синхронный код, потом микрозадачи, а потом макрозадачи. */

/* Микротаски создаются промисами, queueMicrotask (спец.функция? принимающая колбек, который будет микротаской) и mutationObserver. 
Макротаски создаются таймерами, событиями, браузерными нюансами. 
Ну, как будто микротаски создаётся с помощью именно логики JS, а макротаски это webAPi. */

// Пример создания mutationObserver, в котором мы выводим, то что он получает. Выведет специальеный объект, где можно смотреть изменения элемента и тд.
const mutationObserver = new MutationObserver((mutations) => {
    console.log(mutations)
})

// Говорим ему следить за изменениями хедера.
mutationObserver.observe(header)

/* Отрисовка страницы браузером:
1. Строится DOM дерево.
2. Строится CSSOM дерево.
3. Строится дерево рендера.
4. Калькуляция стилей (применение селекторов к элементам).
5. Размещение (по размерам и элементам расставляет элементы. Типа, чертёж).
6. Разрисовка (рисует из чертежа пиксели).
7. Композиция (деление на слои, создание дерева слоев, т.е в зависимости от z-index и тд).
Рендер - дорогостоящая операция, т.к весь этот цикл идёт по кругу, если что измениться в dom. */

// NodeJS нужен для преобразования JS кода в машинный код.
// Кроссплатформенный ввод-вывод нужен для того, чтобы работать с nodeJS на любой ОС.
/* Т.к при выполнении синхронного кода, следующий код блокируется, пока не выполниться предыдущий, создаются разные потоки для разных задач.
И эти потоки часто могут стоять в простое. При неблокирующем вводе и выводе, сервер работает только с главным потоком.
Системные вызовы при этом вводе и выводе возвращают управление сразу и поток не блокируется, поэтому бездействие потока минимально. */
// Асинхронные операции являются неблокирующими.
/* В nodeJS вообще только один поток, но его библиотека даёт доступ к 4 потокам. Поэтому, 4 разных операции могут происходить паралелльно в разных потоках. */

// Планировщик потоков отвечает за параллельное выполнение задач в потоках. В пуле потоков находяться все потоки.

// Демультиплексор событий создан для сборки и постановки в очередь событий ввода и вывода.

/* Сначала приложение создаёт новый запрос ввода и вывода и передаёт его демультипрексору событий.
После того, как запрос успешно обрабатывается, то новое событие с обработчиком (обработчиком является колбек) добавляется в очередь событий.
После этого, event loop делает обход элементов в очереди событий.
И потом event loop передаёт управление обратно приложению для обработки этого события.
Потом приложение может вернуть управление event loop, если появиться какое то новое событие.
Либо, если событий в event loop больше нету, то приложение просто будет ждать нового запроса на ввод/вывод. */

// Event Loop в NodeJS просто последовательно по фазам выполняет операции, без очередей микрозадач, макрозадач и тд.
// Event Loop решает задачу асинхронности.