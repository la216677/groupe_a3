import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { ProductManagementService } from '../../product-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html'
})
export class DeleteCategoryComponent {

  categoryId: number;
  onClose: Subject<any> = new Subject();
  boutonDesactive: boolean;

  constructor(
    public modalRef: BsModalRef,
    private categoryService : ProductManagementService,
    private router: Router
    ) {}

    ngOnInit() {
      //on verifie si content, intialState et categoryId existe bien, sinon un message d'erreur apparait
      if (this.modalRef.content && this.modalRef.content.initialState && this.modalRef.content.initialState.categoryId) {
        this.categoryId = this.modalRef.content.initialState.categoryId;
      }
    }

    confirm(): void {
      this.boutonDesactive = true;
      this.categoryService.deleteCategoryById(this.categoryId)
      .subscribe(() => {
        this.goToCategoryList;
        this.modalRef.hide();
      });

      setTimeout(() => { //on bloque le bouton pendant 5 seconde après un click
        this.boutonDesactive = false;
      }, 5000);

    }



    cancel(): void {
      this.modalRef.hide();
    }

    goToCategoryList(){
      this.router.navigate(['/categories']);
    }





}
