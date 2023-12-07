import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { ProductListComponent } from './product-list/product-list.component';

// Интерфейсы и типы
interface Product {
  name: string,
  price: number,
  color: string,
  discount: number,
  discounted_price(): number,
  inStock: number,
  ItemAvailability(): string,
  onNameChange(event: any): void,
  AddToCart: number,
  decrementCartValue(): void,
  incrementCartValue(): void
}

// Класс и декоратор компонента
@Component({
  selector: 'app-container',
  standalone: true,
  imports: [CommonModule, SearchComponent, ProductListComponent],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})

export class ContainerComponent {
  listOfString: string[] = ["Mark", 'Steve', 'Aboba'];
}
