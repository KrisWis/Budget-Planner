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


// Чтобы не в ручную создавать компонент, можно использовать команду "ng generate component component-name".
// 1. Она создаст класс компонента с @Component декоратором.
// 2. Сгенерирует html и css файлы компонента.
// 3. Зарегистрирует класс компонента в корневом модуле. (но почему то не регает)

// .component.spec.ts файл нужен для модульных тестов.

// Если мы хотим создать дочерний компонент, например, top-header, нужно перейти в его папку перед написанием команды.


/* TYPES OF COMPONENT SELECTOR - https://www.youtube.com/watch?v=j4KD6xuplsk&list=PL1BztTYDF-QNlGo5-g65Xj1mINHYk_FM9&index=13 */


// Также, ввиде селектора мы можем использовать атрибут, класс или id.

// Ввиде класса:
// @Component({
//     selector: '.top-header',
//     standalone: true,
//     imports: [CommonModule],
//     templateUrl: './top-header.component.html',
//     styleUrl: './top-header.component.scss'
//   })
// Использование селектора ввиде класса .top-header в разметке будет выглядеть, как:
// <div class="top-header"></div> - и в этом диве будет весь код компонента.

// Ввиде атрибута, в основном мы используем это в директивах Angular:
// @Component({
//     selector: '[top-header]',
//     standalone: true,
//     imports: [CommonModule],
//     templateUrl: './top-header.component.html',
//     styleUrl: './top-header.component.scss'
//   })
// Использование селектора ввиде атрибута top-header в разметке будет выглядеть, как:
// <div top-header></div> - и в этом диве будет весь код компонента.

// Ввиде id:
// @Component({
//     selector: '#top-header',
//     standalone: true,
//     imports: [CommonModule],
//     templateUrl: './top-header.component.html',
//     styleUrl: './top-header.component.scss'
//   })
// Использование селектора ввиде id top-header в разметке будет выглядеть, как:
// <div id="top-header"></div> - и в этом диве будет весь код компонента.


/* WHAT IS DATA BINDING - https://www.youtube.com/watch?v=hgMo6ZDcNqE&list=PL1BztTYDF-QNlGo5-g65Xj1mINHYk_FM9&index=14 */


// Data Binding (привязка данных), которая позволяет нам взаимодействовать между классом компонента и его шаблоном представления.

// Например, так выглядит класс в app.component.ts:
export class MyComponent {
    title: string = 'edumy';
    message: string = 'Online learning';
    display: boolean = false;

    onClick() {
        this.display = true;
    }
}

// А так выглядит шаблон представления в app.component.html с привязкой данных из класса:
/* <div class="header">
    <div>{{ title }}</div>
    <div>{{ message }}</div>
    <button (click)="onClick()"></button>
    <div [hidden]="display">
        <p>display</p>
    </div>
</div> */
// Для того, чтобы использовать свойства, объявленные в классе компонента нужно использовать двойные фигурные ковычки.
/* Также, мы используем свойство display, используя для этого скрытый атрибут (ключевое слово hidden для скрытия атрибута),
*оборачиваем его в квадратные скобки* для привязки данных и присваиваем ему значение "display". Это передавание данных из класса в шаблон. */
// Также, мы используем функцию onClick() и для этого оборачиваем событие cliсk в круглые скобки и вызываем функцию. Это передавание данных из шаблона в класс.

/* Мы можем разделить привязку данных на два пути: односторонний и двухсторонний. 
Односторонная - это когда данные передаются из класса в шаблон, или из шаблона в класс.
Двухсторонняя - это когда данные могут одновременно передавать из класса в шаблон и из шаблона в класс.
Т.е при двухсторонней, если мы изменим что-либо в классе, это измениться и на шаблоне и наоборот. Для неё нужно использовать ngModel. */


/* STRING INTERPOLATION - https://www.youtube.com/watch?v=_Kg3JMtncs4&list=PL1BztTYDF-QNlGo5-g65Xj1mINHYk_FM9&index=15 */


// Пример создания интерфейса для объекта в классе компонента:
interface Product {
    name: string,
    price: number,
    color: string,
    discount: number,
    discounted_price(): number,
    inStock: number,
    ItemAvailability(): string,
}

// Пример класса компонента с объектом внутри:
export class ProductListComponent {
    product: Product = {
        name: "IPhone",
        price: 999,
        color: "Red",
        discount: 8.5,
        discounted_price: function () {
            return Math.ceil(this.price - (this.price * this.discount / 100));
        },
        inStock: 5,
        ItemAvailability: function () {
            return this.inStock > 0 ? 'Only ' + this.inStock + ' items left' : "Not in Stock";
        }
    }
}

// Чтобы использовать интерполяцию строк и брать данные из класса компонента можно использовать двойные фигурные скобки:
// <p>Name: {{ product.name }}</p>
// <p>Price: ${{ product.price }}</p>
// <p>Color: {{ product.color }}</p>
// <p>Discounted price: ${{ product.discounted_price() }}</p>
// <p>Availability: {{ product.ItemAvailability() }}</p>


/* PROPERTY BINDING - https://www.youtube.com/watch?v=LEkFi15qr1o&list=PL1BztTYDF-QNlGo5-g65Xj1mINHYk_FM9&index=16 */


// Мы можем добавить в класс свойство, хранящее путь к картинке и использовать это свойство в тегах src и это всё с помощью интерполяции строк.
// Но обычно атрибуты не добавляют с помощью интерполяции строк, а с помощью привязки свойств:
// <img [src]="product.pathImage"> - для этого заключаем атрибут в квадратные скобки и в кавычках пишем уже .ts код.

// Также, мы можем присваивать значения HTML атрибутам исходя из привязки свойств.
// <button [disabled]="!(product.inStock > 0)">Buy Now</button>

// Интерполяция строк не работает для атрибутов disabled, hidden, checked.

// Еще один пример использования привязки свойств:
// <input [value]="product.name">

// Также, для привязки свойств можно использовать префикс bind вместо квадратных скобок, но приняты квадратные скобки.
// <input bind-value="product.name">

/* Главное различие HTML атрибута и HTML свойства в том,
что атрибут представляет начальное значение и не изменяется,
а свойство представляет определённое значение и может меняться. */

// Например, если мы следующим способом попытаемся сделать привязку свойства с атрибутом aria-label или любым другим атрибутом, то выдаст ошибку:
// <input [aria-label]="">
// Поэтому, чтобы осуществлять привязку атрибута нужно использовать префикс attr.
// <input [attr.aria-label]="product.name">


/* EVENT BINDING - https://www.youtube.com/watch?v=vGuPDWgg4Io&list=PL1BztTYDF-QNlGo5-g65Xj1mINHYk_FM9&index=17 */


// Пример привязки события с помощью заключения события в круглые скобки:
// <input (input)="onNameChange()">

// Такой метод у нас находиться в .ts файле:
// onNameChange: function () {
//     this.name = "Mark";
//   }

// Также, мы можем передавать в функцию объект события:
// <input (input)="onNameChange($event)">

// И изменяем нашу функцию в .ts файле:
// onNameChange: function (event) {
//     this.name = event.target.value;
//   }


/* TWO WAY DATA BINDING - https://www.youtube.com/watch?v=THrWqRi2usg&list=PL1BztTYDF-QNlGo5-g65Xj1mINHYk_FM9&index=18 */


/* Двухстороняя привязка данных означает, что когда мы меняем свойство в классе компонента, это значение будет отражаться в шаблоне
и также, когда значение меняется в шаблоне, оно меняется и в классе компонента.
Она представляет из себя комбинацию привязки свойств и привязки событий, которую мы использовали в прошлом уроке,
но обычно, для двухсторонней привязки используют ngModel - сначала в .ts файл компонента нужно добавить следующий импорт: */
//import { FormsModule } from '@angular/forms'; - это именно для использования двухсторонней привязки в формах.

// И в импортах его нужно указать:
/* imports: [CommonModule, FormsModule], */

// А в HTML файле компонента, нужно вот так вот использовать NgModel:
// <input class="ekart-search-product-input" [(ngModel)]="searchText">

// В классе компонента, мы просто объявили данное свойство:
// searchText: string = "";

/* Если я правильно понял, то NgModel тут привязывает свойство searchText к инпуту,
и уже под капотом, с помощью formsModule делает так, что оно меняется в зависимости от того, что вводиться в инпут.
Проще говоря, это двухсторонняя привязка данных, которая реализована изначально в Angular конкретно для форм и инпутов. */


/* UNDERSTANDING DIRECTIVES - https://www.youtube.com/watch?v=syxyAINjP84&list=PL1BztTYDF-QNlGo5-g65Xj1mINHYk_FM9&index=19 */


// Директива - это инструкция для управления DOM. Директивы могут манипулировать DOM, изменять поведение, добавлять/удалять DOM элементы.
// Есть 3 вида директив: директива компонента, директива атрибута, структурная директива.

// Директива компонента - это компонент в Angular с шаблоном представления. Другие типы директив шаблона не имеют.

// Директива атрибута используется, чтобы изменить поведение или представление DOM элемента, но не удалять или добавлять.
// <div changeToGreen></div> - пример кастомной директивы атрибута. Мы создали кастомный атрибут, который с помощью TS меняет фон на зелёный.
// Пример его создания в TS:
// @Directive({
//     selector: '[changeToGreen]'
// })
// export class ChangeToGreen {}
// Есть также, встроенные директивы атрибута, например ngStyle или ngClass.

// Структурная директива используется для удаления или добавления DOM элементов.
// Есть парочка встроенный в Angular структурных директив, такие как ngIf, ngFor, ngSwitch.
// Перед каждым применением любой структурной директивы нужно использовать звёздочку:
// <div *ngIf></div>


/* NGFOR DIRECTIVE - https://www.youtube.com/watch?v=5D16OClJ1Cw&list=PL1BztTYDF-QNlGo5-g65Xj1mINHYk_FM9&index=20 */


