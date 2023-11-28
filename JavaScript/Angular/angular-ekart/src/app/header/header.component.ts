import { Component } from "@angular/core";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-header', // Селектор нужно указывать, как "app-имяКомпонента".
    // Следующие 2 свойства должны быть у компонента для его корректного использования.
    standalone: true,
    imports: [CommonModule],
    templateUrl: './header.component.html', // Указываем ссылку на наш HTML шаблон.
    styleUrls: ['./styles/header.component.css'] // Указываем наши пути к файлам стилей, можно несколько.
})
export class HeaderComponent { // Класс должен быть назван с префиксом Component.

}