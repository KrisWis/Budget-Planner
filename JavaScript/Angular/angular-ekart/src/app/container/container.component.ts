import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { FeaturedBrandsComponent } from './featured-brands/featured-brands.component';

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
  imports: [CommonModule, SearchComponent, ProductListComponent, ProductDetailComponent, FeaturedBrandsComponent],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})

export class ContainerComponent {
  listOfString: string[] = ["Mark", 'Steve', 'Aboba'];

  searchText: string = '';

  @ViewChild(ProductListComponent)
  ProductListComponent: ProductListComponent;

  setSearchText(value: string) {
    this.searchText = value;
  }
}
