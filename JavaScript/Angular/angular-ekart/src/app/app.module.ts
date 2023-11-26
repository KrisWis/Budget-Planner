/* Этот файл представляет собой главный модуль приложения, в котором определены все компоненты, сервисы, директивы и другие зависимости.
Начиная, с Angular 17 он больше не создаётся по-умолчанию, поэтому я не уверен, нужен ли он. */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
    imports: [BrowserModule], // Здесь нужно указать все внешние модули, которые нужны для нашего проекта.
    declarations: [AppComponent], // Здесь нам нужно указать компоненты, которые принадлежат к нашему проекту.
    bootstrap: [AppComponent] // Здесь мы указываем компоненты, которые Angular должен загружать при загрузке этого модуля.
})
export class AppModule { }