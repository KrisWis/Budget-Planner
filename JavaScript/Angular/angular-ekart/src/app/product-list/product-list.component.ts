import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';

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
  selector: 'product-list',
  standalone: true,
  imports: [CommonModule, SearchComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})

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
    },

    onNameChange: function (event) {
      this.name = event.target.value;
    },

    AddToCart: 0,

    decrementCartValue: function () {
      this.AddToCart--;
    },

    incrementCartValue: function () {
      this.AddToCart++;
    }
  }
}
