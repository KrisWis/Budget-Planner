// Этот файл является отправной точкой приложения Angular, который загружает наше приложение.
import { bootstrapApplication } from '@angular/platform-browser'; // Этот модуль нужен для загрузки нашего приложения в браузерах.
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig) // Загрузка приложения, передавая ему компонент и конфиг.
  .catch((err) => console.error(err));
