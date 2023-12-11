import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from '../product-list/product-list.component';
import { Product } from '../../Models/Product';

@Component({
  selector: 'product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {

  @Input()
  ProductListComp: ProductListComponent = undefined;

  product: Product;

  ngOnInit() {

    this.product = this.ProductListComp.selectedProduct;

  }
}
