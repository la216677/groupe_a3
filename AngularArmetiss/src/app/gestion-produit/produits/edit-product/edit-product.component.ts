import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-edit-product',
  template: `<app-product-form *ngIf="product" [product]="product"></app-product-form>`
})
export class EditProductComponent implements OnInit{

  product: Product |undefined;

  constructor(
    private route : ActivatedRoute,
    private productService: ProductService
    ){}

    ngOnInit() {
      // on récupère l'id du product qui se trouve dans l'url
      const productId: number | null = Number(this.route.snapshot.paramMap.get('id'));

      if(productId){
        this.productService.getProductById(productId)
        .subscribe((data: any) => {
          this.product = data as Product;
        });

      } else {
        this.product = undefined;
      }


    }

}
