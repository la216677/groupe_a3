import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-add-product',
  template: `
  <app-product-form [product]="product"></app-product-form>
  `,
})
export class AddProductComponent implements OnInit  {

  product: Product;

  ngOnInit() {
    this.product = new Product();
  }
}
