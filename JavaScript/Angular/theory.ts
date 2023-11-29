/* В этом файле будет писать вся основная теория из видео курса. */


/* BOOTSTRAPPING ANGULAR APPLICATION - https://www.youtube.com/watch?v=zVX1vgsXelo&list=PL1BztTYDF-QNlGo5-g65Xj1mINHYk_FM9&index=5 */


// Angular использует WebPack для сборки. Он объединяет все .js файлы в один.
// Все CSS и JS файлы подключаются к index.html, чтобы когда загрузился index.html, стили и скрипты были загружены тоже.
// Все основные файлы определяются в angular.json.


/* ANGULAR COMPONENTS & DIRECTIVES */


/* UNDERSTANDING COMPONENT - https://www.youtube.com/watch?v=uTsYQ7UYx5k&list=PL1BztTYDF-QNlGo5-g65Xj1mINHYk_FM9&index=7 */


// Компонент - это небольшой фрагмент пользовательского интерфейса.
// Сначала мы создаём несколько маленьких компонентов, а потом объединяем их всех в цельное приложение.

/* Каждое приложение в Angular должно иметь хотя-бы один компонент и он называется корневым (компонент приложения).
Он представляет всё приложение и содержит дочерние компоненты, поэтому каждое приложение в Angular, по сути, является деревом компонентов.
И объединение всех этих компонентов представляет из себя пользовательский интерфейс приложения. */

/* Подразделение на компоненты в Angular работает также, как и разметка в HTML,
т.е компонент приложения можно разбить на компонент хедера, компонент мейна и компонент футера.
Компонент хедера можно разбить на компонент навигации, в компоненте навигации каждый элемент разбить на отдельный компонент и тд.
Т.е любой обособленный фрагмент приложения является компонентом. */

/* В файловой архитектуре, папки и файлы компонентов создаются в такой же последовательности, как и само дерево компонентов.
Т.е все компоненты будут находиться в папке app, в ней например будет папка header, в header будет nav и тд.
Файлы компонента строяться так: название компонента.component.расширение. Например, header.component.ts, в котором храниться вся основная инфа о компоненте. */

// Чтобы создать компонент нам нужно:
// 1. Создать класс в TypeScript с префиксом Component (например, HeaderComponent) и экспортировать его.
// 2. Нужно повесить декоратор компонента (@Component) на этот класс. В этом декораторе, нужно указать селектор (app-имяКомпонента), а также HTML шаблон.
// 3. Нужно объявить этот класс в файле основного модуля (app.module.ts), т.е импортировать его и записать в свойство declarations.
// @Component({
//     selector: "app-header", // Селектор нужно указывать, как "app-имяКомпонента".
//     template: '<h3>Тест</h3>' // В качестве HTML шаблона мы юзаем просто разметку, поэтому используем "template", а не "templateUrl".
// })
// export class HeaderComponent {} // Класс должен быть назван с префиксом Component.

// Использовать компонент нужно с помощью его селектора:
// <app-header></app-header>


/* VIEW TEMPLATE OF COMPONENT - https://www.youtube.com/watch?v=2zz8jhRWXAc&list=PL1BztTYDF-QNlGo5-g65Xj1mINHYk_FM9&index=8&pp=iAQB */


// Лучше использовать свойство templateUrl в .ts файле компонента, а не просто template. И указывать в templateUrl ссылку на HTML компонент хедера.


/* STYLING VIEW TEMPLATE - https://www.youtube.com/watch?v=oCErWaNOu3w&list=PL1BztTYDF-QNlGo5-g65Xj1mINHYk_FM9&index=9 */


// Чтобы указать стили для компонента, нужно использовать свойство styleUrls в .ts файле компонента и записать туда пути к файлам стилей в массиве.
// Эти стили применяться только к этому компоненту, ни к каким дочерним компонентам и тд.
// Проще говоря, стили указанные в styleUrls применяются только к конкретному компоненту и ни к какому другому.


/* ADDING CSS STYLES GLOBALLY - https://www.youtube.com/watch?v=ckbsKtnnHFo&list=PL1BztTYDF-QNlGo5-g65Xj1mINHYk_FM9&index=10 */


// Чтобы добавлять стили глобально для всех элементов, нужно использовать styles.css.


/* USING BOOTSTRAP FOR STYLING - https://www.youtube.com/watch?v=9pE5t0CcoOM&list=PL1BztTYDF-QNlGo5-g65Xj1mINHYk_FM9&index=11 */


// Чтобы установить bootstrap в наш проект, нужно использовать команду "npm i --save bootstrap".
// Чтобы установить .css файл бутстрапа, нужно в angular.json, в 'styles' добавить соответсвующий путь, например:
/* "styles": [
    "node_modules/bootstrap/dist/css/bootstrap.min.css",
    "src/styles.scss"
], */
// Также, после загрузки бутсрапа, проект надо перезагрузить.
// Мы удалили его с помощью "npm uninstall bootstrap".


/* CREATE COMPONENT USING ANGULAR CLI - https://www.youtube.com/watch?v=--Du9-iT78E&list=PL1BztTYDF-QNlGo5-g65Xj1mINHYk_FM9&index=12 */


