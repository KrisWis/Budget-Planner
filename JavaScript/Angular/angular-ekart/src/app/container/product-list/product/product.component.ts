import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Product {
  id: number,
  name: string,
  description: string,
  brand: string,
  gender: string,
  category: string,
  size: number[],
  color: string[],
  price: number,
  discountPrice?: number,
  is_in_inventory: boolean,
  items_left: number,
  imageURL: string,
  slug: string
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})

export class ProductComponent {
  @Input()
  product: Product;
}
