import { Component } from "@angular/core";
import { CommonModule } from '@angular/common';
import { TopMenuComponent } from "./top-menu/top-menu.component";
import { MainMenuComponent } from "./main-menu/main-menu.component";

@Component({
    selector: 'app-header', // Селектор нужно указывать, как "app-имяКомпонента". Но app необязательно.
    // Следующие 2 свойства должны быть у компонента для его корректного использования.
    standalone: true,
    imports: [CommonModule, TopMenuComponent, MainMenuComponent],
    templateUrl: './header.component.html', // Указываем ссылку на наш HTML шаблон.
    styleUrls: ['./styles/header.component.css'] // Указываем наши пути к файлам стилей, можно несколько.
})
export class HeaderComponent { // Класс должен быть назван с префиксом Component.

}