import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { TopHeaderComponent } from './top-header/top-header.component';
import { TopMenuComponent } from './header/top-menu/top-menu.component';

// Декоратор компонента
@Component({
  // Определяем селектор (app-root используется в index.html)
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, TopHeaderComponent, TopMenuComponent],
  // В templateUrl подключаем файл нашего html компонента, который будет использоваться вместо app-root.
  templateUrl: './app.component.html',
  // В styleURL подключаем файл компонента стилей, который будет использоваться
  styleUrl: './app.component.scss'
})

// Создаём класс компонента нашего приложения. Из него мы можем брать различные свойства для использования в app.component.html.
export class AppComponent {
  title = 'angular-ekart';
}
