import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Category } from '../../models/category';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html'
})
export class AddCategoryComponent {

  boutonDesactive:boolean;
  category: Category = new Category();


  constructor(
    public modalRef: BsModalRef,
    private router: Router,
    private categoryService: CategoryService
  ) { }

  confirm(): void {
    this.boutonDesactive = true;
    this.category.Category_Image_URL = 'https://image.png';
    this.category.Category_Visibility = true;
    this.categoryService.addCategory(this.category)
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
