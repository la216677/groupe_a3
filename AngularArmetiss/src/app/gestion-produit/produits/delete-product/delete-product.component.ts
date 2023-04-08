import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ProductService } from '../../service/product.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html'
})
export class DeleteProductComponent {

  productId: number;
  onClose: Subject<any> = new Subject();
  boutonDesactive: boolean;

  constructor(
    public modalRef: BsModalRef,
    private productService : ProductService,
    private router: Router
    ) {}

    ngOnInit() {
      //on verifie si content, intialState et productId existe bien, sinon un message d'erreur apparait
      if (this.modalRef.content && this.modalRef.content.initialState && this.modalRef.content.initialState.productId) {
        this.productId = this.modalRef.content.initialState.productId;
      }
    }

    confirm(): void {
      this.boutonDesactive = true;
      this.productService.deleteProductById(this.productId)
      .subscribe(() => {
        this.goToProductList;
        this.modalRef.hide();
      });

      setTimeout(() => { //on bloque le bouton pendant 5 seconde après un click
        this.boutonDesactive = false;
      }, 5000);

    }


    cancel(): void {
      this.modalRef.hide();
    }

    goToProductList(){
      this.router.navigate(['/produits']);
    }




}
