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


// Директива ngFor итерирует некоторые наборы данных, типа массива и тд и создаёт HTML элемент для каждого из предметов HTML шаблона.
// Она используется для повторения части HTML шаблона один раз для каждого элемента в итерируемом объекте.
// Это структурная директива, она может удалять или добавлять элементы.
// Пример использования, делаем перебор по массиву: - и главное, что будет дублировать в цикле не содержимое дива, а сам див тоже. Т.е создаться 6 дивов.
// <div *ngFor="let item of [2, 3, 4, 5, 6, 8]"> - используем директиву в качестве атрибута и передаём туда цикл, написанный на TS.
//     <p>Current: {{ item }}</p> - используем переменную, параграф создаться для каждого из значений.
// </div>

// Мы можем задать массив в .component.ts файле:
let MainMenuItems: string[] = ["Home", "Products", "Sale", "New Arrival", 'Contact'];
// И затем использовать его в .component.html:
// <div class="ekart-menu"> - просто определяем контейнер элементов.
//     <a *ngFor="let menu of MainMenuItems" href="#">{{ menu }}</a> - в теге <a> используем директиву ngFor, что он повторялся с каждым из элементов в MainMenuItems.
// </div>


/* RENDERING LIST OF COMPLEX TYPE - https://www.youtube.com/watch?v=OuRAwzrFQm8&list=PL1BztTYDF-QNlGo5-g65Xj1mINHYk_FM9&index=21 */


// Ещё один пример использования ngFor. Здесь мы прошлись по массиву products,
// а также, использовали let i = index, т.к ngFor сохраняет в переменную index порядковый номер итерируемого элемента.
/* <div class="ekart--products--container">
    <div *ngFor="let prod of products; let i = index;" class="ekart--product--item">
        <div class="ekart-wishlist-sale-container">
            <div class="ekart--add--to--wishlist">
              <i class="fa fa-heart-o" aria-hidden="true">
                <p>{{i}}</p>
          <div class="ekart--product--image">
              <img [src]="prod.imageURL" class="ekart--product--image">
          </div>
          <div class="ekart--add--to--price">
              {{prod.price}}
          </div>
          <div class="ekart--product--name">{{prod.name}}</div>
          <div class="ekart--product--category">{{prod.gender}} . {{prod.category}} . {{prod.brand}}</div>
          <div class="ekart--product--available-colors">{{prod.color.length}} Colors . Best Seller</div> */


/* NGIF DIRECTIVE - https://www.youtube.com/watch?v=RmKnHsUGpPY&list=PL1BztTYDF-QNlGo5-g65Xj1mINHYk_FM9&index=22 */


// Директива NgIf является структурной и удаляет или добавляет элемент на основе заданного условия.
// Пример: Тут мы делаем проверку на то, что элемент отобразиться только если переменная searchText не пуста.
// <p *ngIf="searchText != ''"><strong>Search result for:</strong>{{ searchText }}</p> - если searchText пуста, то элемент будет удален со страницы.

// Отображаем элемент только если у него есть свойство discountPrice:
// <div class="ekart-on-sale-tag" *ngIf="prod.discountPrice">{{ (100 - (prod.discountPrice / prod.price * 100)).toFixed(0) }}% OFF</div>


/* NGSTYLE DIRECTIVE - https://www.youtube.com/watch?v=0q1vA9g1cTM&list=PL1BztTYDF-QNlGo5-g65Xj1mINHYk_FM9&index=23 */


// ngStyle - это директива атрибута, поэтому заключаем её в квадратные скобки. Она позволяет устанавливать инлайновые стили на элемент используя TS выражение.
// Пример: тут мы устанавливаем жирный шрифт статически, а цвет присваивается динамически на основе того, есть ли у элемента свойство prod.is_in_inventory.
// <div class="ekart--product--in-stock" [ngStyle]="{fontWeight: 'bold', color: prod.is_in_inventory ? 'green' : 'red'}">
//     {{ prod.is_in_inventory ? "Available in Stock" : "Not available in stock" }} - использовании интерполяции строк.
// </div>


/* NGCLASS DIRECTIVE - https://www.youtube.com/watch?v=6vIH1Zl8LgE&list=PL1BztTYDF-QNlGo5-g65Xj1mINHYk_FM9&index=24 */


// ngClass - это директива атрибута, поэтому заключаем её в квадратные скобки. Она позволяет устанавливать CSS классы на элемент используя TS выражение.
/* Пример: Мы устанавливаем класс btn статично, чтобы он был всегда.
Остальные 2 класса динамически добавляются или удаляются на основе того, пусто ли значение searchText или нет. */
// <button [ngClass]="{'btn': true, 'btn-search': searchText, 'btn-search-disabled': !searchText}" [disabled]="!searchText">Search</button>


/* @INPUT: CURSTOM PROPERTY BINDING - https://www.youtube.com/watch?v=Ynaou7ZtPII&list=PL1BztTYDF-QNlGo5-g65Xj1mINHYk_FM9&index=25 */


// @Input декоратор нужен для связи родительского компонента и дочернего.
/* В .ts файле, в классе дочернего компонента мы устанавливаем декоратор над свойством, 
которое типизируем и мы будем использовать его в .html файле дочернего компонента в качестве свойства из родительского компонента. */
// @Input()
// product: Product;

// Пример использования в html файле дочернего компонента:
// <div class="ekart--product--name">{{product.name}}</div>
// <div class="ekart--product--category">{{product.gender}} . {{product.category}} . {{product.brand}}</div>
// <div class="ekart--product--available-colors">{{product.color.length}} Colors . Best Seller</div>
// <div class="ekart--product--in-stock" [ngStyle]="{fontWeight: 'bold', color: product.is_in_inventory ? 'green' : 'red'}">
//   {{ product.is_in_inventory ? "Available in Stock" : "Not available in stock" }}
// </div>

// Но перед этим мы в .html файле родительского компонента написали такой код:
// <div class="ekart--products--container">
//   <app-product *ngFor="let prod of products" [product]="prod"></app-product>
// </div>
/* Мы используем селектор дочернего компонента, проходимся циклом по объекту, находящимуся в .ts файле родительского компонента с помощью ngFor,
а потом, чтобы связать переменную, определённую в цикле и наше свойство, которое используется в .html файле дочернего компонента,
мы заключаем это свойство в квадратные скобки и используем как атрибут, и привязываем к нему нашу переменную.
И значение этой переменной будет вместо product в .html файле дочернего компонента. */

/* Проще говоря, сначала мы определяем само свойство в .ts файле в классе дочернего компонента, используя декоратор @Input, 
который и говорит Angular, что это свойство можно использовать, как атрибут в .html файле родительского компонента и только в селекторе этого дочернего компонента. 
И затем, в этом .html файле родительского компонента, мы привязываем это свойство из дочернего компонента к переменной из родительского.
И теперь, родительский и дочерний компонент, по своей сути, связаны - мы можем использовать свойство из дочернего компонента в его .html файле. */


/* UNDERSTANDING INPUT DECORATOR - https://www.youtube.com/watch?v=NK5cxlIIins&list=PL1BztTYDF-QNlGo5-g65Xj1mINHYk_FM9&index=26 */


// Пользовательская привязка свойств, это когда мы привязываем свойства из класса компонента к некоторому TS выражению.

// В .ts файле компонента мы определяем некоторые свойства:
// totalProductCount = this.products.length;
// ProductInStockCount = this.products.filter(p => p.is_in_inventory).length;
// ProductOutOfStockCount = this.products.filter(p => !p.is_in_inventory).length;

// И потом используем эти же свойства в .html файле компонента:
// <app-filter [all]="totalProductCount" [inStock]="ProductInStockCount" [outOfStock]="ProductOutOfStockCount"></app-filter>


/* @OUTPUT: CUSTOM EVENT BINDING - https://www.youtube.com/watch?v=PCAS6MUuD-4&list=PL1BztTYDF-QNlGo5-g65Xj1mINHYk_FM9&index=27 */


// В .ts файле мы определили переменную для обозначения дефолтно выбранного radio:
let selectedFilterRadioButton: string = 'all';

// В .html файле, мы у наших radio элементов, можем поставить такой атрибут ngModel:

/* <input type="radio" name="filter" value="all" [(ngModel)]="selectedFilterRadioButton"/>
<input type="radio" name="filter" value="true" [(ngModel)]="selectedFilterRadioButton"/>
<input type="radio" name="filter" value="false" [(ngModel)]="selectedFilterRadioButton"/> */

// И теперь, в зависимости от того, какое значение будет иметь selectedFilterRadioButton, такой radio элемент и будет выбран дефолтным.
// Так как, ngModel создана специальна для инпутов, то видимо у неё есть какой то скрытый функционал для всего этого под капотом.
// В зависимости от того, какой radio мы выберем такое и будет значение selectedFilterRadioButton, т.к это духсторонняя привязка.


// @Output декоратор нужен для связи родительского компонента и дочернего, когда нужно передать данные из родительского компонента в дочерний.
// Также, не стоит забывать, что если у дочернего компонента установлен этот декоратор, то его событие могут использовать любой его родительский компонент.

// Можно использовать только одну структурную директиву для одного элемента.

// Чтобы связать событие, определённое в классе дочернего компонента с родительским компонентом, нужно использовать директиву @Output().
// @Output() - используем эту директиву для того, чтобы использовать selectedFilterRadioButtonChanged в html файле родительского элемента для значения для него.
// selectedFilterRadioButtonChanged: EventEmitter<string> = new EventEmitter<string>(); - Объявляем саму переменную. Значение ей дадим уже в html файле.
// onSelectedFilterRadioButtonChanged() { - Объявляем функцию, которая срабатывает при нажатии на radio элемент.
//   this.selectedFilterRadioButtonChanged.emit(this.selectedFilterRadioButton); - передаём в событие значение выбранной кнопки.
// }

// В классе родительского компонента, пишем уже этот код:
/* selectedFilterRadioButton: string = 'all'; - объявляем тут тоже переменную, просто она тут нужна,
а как перенести свойство из класса дочернего элемента в родительский мы пока не знаем. */
// onFilterChanged(value: string) { - Объявляем функцию
//   this.selectedFilterRadioButton = value; - меняем значение свойства на значение переданной выбранной кнопки.
// }

// В селекторе дочернего компонента, связываем наше событие из класса дочернего компонента с функцией из класса родительского элемента.
// <app-filter
// (selectedFilterRadioButtonChanged)="onFilterChanged($event)"> - событие заключается в круглые скобки.
// </app-filter>

// И теперь, в селекторе родительского компонента делаем условие:
// <app-product [product]="prod" *ngIf="selectedFilterRadioButton == 'all' || prod.is_in_inventory.toString() == selectedFilterRadioButton"></app-product>

/* Т.е мы, с помощью @Output делаем так, чтобы событие, определённое в классе дочернего компонента можно было использовать в html файле родительского компонента
и связать тем самым это событие с функцией из родительского компонента. Теперь это событие и функция связаны и мы используем это для своих целей.
В событие передаётся значение выбранной кнопки, и оно передаётся как $event в функцию родительского элемента.
И там, уже на основе этого полученного значения меняется свойство родительского компонента. */


/* NON-RELATED COMPONENT COMMUNICATION - https://www.youtube.com/watch?v=aIkGXMJFTzM&list=PL1BztTYDF-QNlGo5-g65Xj1mINHYk_FM9&index=28 */


/* Стоит помнить, что @Input нужен для связи дочернего и родительского компонентов и при использовании этого декоратора,
мы данные из родительского компонента, можем использовать в дочернем.
А используя @Output мы можем использовать данные из дочернего компонента в родительском. Эта директива используется как раз таки для передачи событий. */

/* Для того, чтобы связать два несвязных компонента, но у которых один родитель, используется комбинация этих директив:
Сначала с помощью @Output, мы из одного дочернего компонента, передаём данные в родительский,
а потом из родительского, с помощью @Input передаём данные в другой дочерний компонент. */

// 1. Создаём событие с помощью EventEmitter.
// @Output()
// onSearchTextChanged: EventEmitter<string> = new EventEmitter<string>() - используем <string>, т.к событие возвращаем строковое значение того, что ввёл юзер.

// 2. Создаём функцию для ловли нашего события:
//  onSearchTextChanged() {
//     this.SearchTextChanged.emit(this.searchText);
//  }

// 3. Нам в .ts файле родительского компонента нужно создать функцию, чтобы переменная изменялась так, как должна.
// searchText: string = '';
// setSearchText(value: string) {
//   this.searchText = value;
// }

// 4. В .html файле родительского компонента, в селекторе дочернего компонента связываем событие дочернего компонента с функцией из родительского.
// <app-search (searchTextChanged)="setSearchText($event)"></app-search>

// 5. Всё, теперь мы передали данные из дочернего компонента в родительский.

// 6. Теперь в другом дочернем компоненте, мы используем @Input() для получение данных из родительского компонента.
// @Input()
// searchText: string = '';

// 7. И в селекторе этого дочернего компонента мы связываем наше свойство из дочернего компонента ([searchText]) со свойством из родительского ("searchText").
// <product-list [searchText]="searchText"></product-list> - названия одинаковые случайно.

// 8. И теперь, мы можем использовать это свойство в .html файле этого дочернего компонента:
// <app-product [product]="prod" *ngIf="searchText == '' || prod.name.toLowerCase().includes(searchText)"></app-product>

/* Подводя итог, мы создали событие в дочернем компоненте, создали функцию в родительском и связали их,
чтобы данные из этого дочернего компонента передавались в родительский.
Дальше, мы связали это свойство из родительского компонента со свойством из другого дочернего компонента
и теперь мы можем использовать это свойство в .html файле этого дочернего компонента.
И по итогу, мы создали связь между двумя дочерними компонентами, которые имеют одного родителя. */


/* TEMPLATE REFERENCE VARIABLE - https://www.youtube.com/watch?v=Vcax2zHZGD8&list=PL1BztTYDF-QNlGo5-g65Xj1mINHYk_FM9&index=29 */


/* Ссылочная переменная шаблона - это переменная, которая хранит в себе ссылку на DOM элемент, компонент или директиву.
Для того, чтобы обозначить ссылочную переменную шаблона, нужно использовать "#"". */
// <input class="ekart-search-product-input" #searchInput> - теперь в переменной searchInput храниться ссылка на DOM элемент инпута.
// <button class="btn btn-search" (click)="updateSearchText(searchInput)">Search</button> - используем эту переменную, передавая её в функцию.

// Теперь мы можем использовать эту переданную переменную в функции:
// updateSearchText(inputEL: HTMLInputElement) {
//     this.searchText = inputEL.value;
//     this.searchTextChanged.emit(this.searchText);
//   }


/* REFERENCE VARIABLE ON COMPONENT - https://www.youtube.com/watch?v=LQr9jZkK0e4&list=PL1BztTYDF-QNlGo5-g65Xj1mINHYk_FM9&index=30 */


// У дочернего компонента мы определили такое свойство:
// selectedProduct: Product;

// И в селекторе этого компонента, делаем ссылку на этот компонент:
// <product-list [searchText]="searchText" #ProductListComponent></product-list>

// И теперь мы можем легко брать все свойства этого компонента:
// <product-detail *ngIf="ProductListComponent.selectedProduct"></product-detail>

// Проще говоря, создавая ссылочную переменную для компонента, мы можем использовать все его свойства, функции и тд.


/* VIEWCHILD() IN ANGULAR - https://www.youtube.com/watch?v=jWfNjNvUluA&list=PL1BztTYDF-QNlGo5-g65Xj1mINHYk_FM9&index=31 */


// Директива @ViewChild() используется для получения первого соответсвующего запросу DOM элемента в компоненте.

// В HTML файле у нас есть инпут с ссылочной переменной на него:
// <input class="ekart-search-product-input" #searchInput>

/* И с помощью директивы @ViewChild(), мы можем передать в неё название ссылочной переменной
и она присвоит в переменную, к которой привязана первое найденное соответствие.
Переменной мы задаём тип ElementRef, т.к она будет хранить ссылку на элемент. */
// @ViewChild("searchInput")
// searchInputEl: ElementRef

// Теперь, чтобы через эту ссылку обратиться к самому элементу, нужно использовать свойство nativeElement.
// this.searchText = this.searchInputEl.nativeElement.value;

/* Также, эта директива принимает необязательный параметр - объект, в котором можно перечислить два свойства static и read.
Если static равен true, то переменной присвоиться значение единожды, когда весь шаблон представления будет инициализирован.
Если же static равен false, то значение переменной будет переопределяться после каждого изменения в DOM.
Свойство read используется для чтения различных токенов из требуемых элементов. */
// @ViewChild("searchInput", {static: false})


/* Чтобы передать какое-нибудь свойство между двумя дочерними компонентами,
мы можем использовать ViewChild() и получить ссылку на один дочерний компонент в родительском компоненте.
И потом, используя @Input мы можем присвоить переменной в другом дочернем компоненте эту ссылку, объявленную в родительском. */

// У нас есть компонент с ссылочной переменной в родительском компоненте:
// <product-list [searchText]="searchText" #ProductListComponent></product-list>

// И мы можем получить ссылку на этот компонент, передав его ссылочную переменную, либо же сам компонент в директиву:
// @ViewChild(ProductListComponent)
// ProductListComponent: ProductListComponent;

// Создаём свойство в другом дочернен компоненте и оборачиваем в декоратор:
// @Input()
// ProductListComp: ProductListComponent;

// А затем, в его селекторе, присваиваем свойство из родительского и дочернего компонента:
// <product-detail [ProductListComp]="ProductListComponent" *ngIf="ProductListComponent.selectedProduct"></product-detail>

/* Когда компонент рендериться на странице, он проходит свой жизненный цикл
и мы можем подключать свою логику для разных этапов этого жизненного цикла. */
// Для подобных ситуаций используется, например, ngOnInit() - она вызывается когда весь компонент полностью инициализирован.
// Т.к, нам нужно сохранять ссылку на компонент только при его полной инициализации, то используем ngOnInit():
// ngOnInit() {
//    this.product = this.ProductListComp.selectedProduct;
// }

// Теперь мы можем использовать это свойство в html файле дочернего компонента, в котором и определили это свойство:
// <h2>{{ product.name }}</h2>

// Также, у атрибута style мы можем обращаться к конкретным свойствам и задавать им значения:
// <span class="ekart-product-detail-available-color" [style.background-color]="color.toLowerCase()"></span>


/* VIEWCHILDREN() IN ANGULAR - https://www.youtube.com/watch?v=PqBKRoEYbIE&list=PL1BztTYDF-QNlGo5-g65Xj1mINHYk_FM9&index=32 */


// Директива @ViewChildren() работает, почти как @ViewChild(), но используется для получения списка DOM элементов, соответствующих запросу.
// Например, в HTML файле у нас есть 3 элемента с одинаковой ссылочной переменной:
// <input class="firstEl" #inputEl>
// <input class="secondEl" #inputEl>
// <input class="thirdEl" #inputEl>

// И теперь используя @ViewChildren, мы можем передать ссылочную переменную и он запишет в переменную список ссылок на элементы
// @ViewChildren('inputEl')
// inputElements: QueryList<ElementRef>; - тип должен быть QueryList, каждый элемент которого будет ElementRef.

// Теперь мы можем пройтись по этому списку ссылок, и у каждой ссылки получить элемент, используя nativeElement.
// this.inputElements.forEach((el) => {
//     console.log(el.nativeElement);
// })

/* Также, в отличии от @ViewChild() в @ViewChildren() можно указать только свойство read, а static нельзя.
Переменная, декорированная с помощью @ViewChildren() не будет инициализирована сразу, а только когда будет запущен цикл обнаружения изменений.
Поэтому, если попытаться получить к нему доступ с помощью ngOnInit(), то он выдаст undefined,
т.к переменные объявленые с помощью @ViewChildren() не инициализируются сразу при создании компонента. */


/* NG-TEMPLATE IN ANGULAR - https://www.youtube.com/watch?v=FM0KzpsGvIM&list=PL1BztTYDF-QNlGo5-g65Xj1mINHYk_FM9&index=33 */


// ng-template это элемент Angular, который содержит в себе HTML фрагмент, и он может использоваться как шаблон и рендериться в DOM.

// Пример в app.component.html:
// <h2>Learn NG template</h2> - этот элемент будет всегда, в нём ничего необычного нет.
// <ng-template #ngTemplate> - для определения "шаблона", используем селектор ng-template и задаём ему ссылочную переменную.
//     Контент, который находиться в нём, здесь отображаться не будет:
//     <h3>This is a template</h3>
//     <p>Example of template paragraph</p>
// </ng-template>

// <div *ngTemplateOutlet="ngTemplate"></div> - используем структурную директиву ngTemplateOutlet и передаём ей ссылочную переменную шаблона.
// И теперь, в этом диве будет находиться весь контент, который и находиться в нашем шаблоне.

// Ещё один пример использования ng-template:
// <button class="btn-add-to-cart" *ngIf="product.is_in_inventory; else notifyMe">ADD TO CART</button>
// <ng-template #notifyMe>
//     <button class="btn-add-to-cart">NOTIFY ME</button>
// </ng-template>


/* NG-CONTAINER IN ANGULAR - https://www.youtube.com/watch?v=cD53j-TSxbc&list=PL1BztTYDF-QNlGo5-g65Xj1mINHYk_FM9&index=34 */


// ng-container это специальный Angular элемент, который может содержать структурные директивы без добавления новых элементов в DOM.

/* Главная фишка ng-container в том, что в DOM рендериться только его содержимое, а сам он остаётся только в коде.
Поэтому, вешать какие-либо классы или события на него не имеет смысла. */

// Пример использования ng-container:
// <ng-container *ngIf="toggle; else toggleOff">
//     <p>The toggle is on.</p>
// </ng-container>

// <ng-template #toggleOff>
//     <p>The toggle is off.</p>
// </ng-template>

// Обычно директива ngTemplateOutlet используется вместе с ng-container:
// <ng-template #ngTemplate>
//     <h3>This is a template</h3>
//     <p>Example of template paragraph</p>
// </ng-template>
// <ng-container *ngTemplateOutlet="myTemplate"></ng-container>


/* NG-CONTENT IN ANGULAR - https://www.youtube.com/watch?v=X-vlp3XeJAY&list=PL1BztTYDF-QNlGo5-g65Xj1mINHYk_FM9&index=35 */


