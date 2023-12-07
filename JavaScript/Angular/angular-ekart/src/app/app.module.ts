/* Этот файл представляет собой главный модуль приложения, в котором определены все компоненты, сервисы, директивы и другие зависимости.
Начиная, с Angular 17 он больше не создаётся по-умолчанию, поэтому я не уверен, нужен ли он. */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component'; // Импортируем наш компонент хедера
import { TopHeaderComponent } from './top-header/top-header.component';
import { TopMenuComponent } from './header/top-menu/top-menu.component';
import { MainMenuComponent } from './header/main-menu/main-menu.component';
import { ContainerComponent } from './container/container.component';

@NgModule({
    imports: [BrowserModule, AppComponent,
        HeaderComponent,
        TopHeaderComponent,
        TopMenuComponent,
        MainMenuComponent,
        ContainerComponent], // Здесь нужно указать все внешние модули, которые нужны для нашего проекта.
    declarations: // Здесь нам нужно указать компоненты, которые принадлежат к нашему проекту.
        [],
    bootstrap: [] // Здесь мы указываем компоненты, которые Angular должен загружать при загрузке этого модуля.
})
export class AppModule { }