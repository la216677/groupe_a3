import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html'
})
export class EditCategoryComponent implements OnInit {

  categoryId: number;
  boutonDesactive:boolean;
  category: Category = {
    Category_Name: '',
    Category_Description: '',
    ID_Category: 0,
    Category_Image_URL: '',
    Category_Visibility: false
  };



  constructor(
    public modalRef: BsModalRef,
    private router: Router,
    private categoryService: CategoryService
  ) { }

  ngOnInit(){
    //on verifie si content, intialState et categoryId existe bien, sinon un message d'erreur apparait
    if (this.modalRef.content && this.modalRef.content.initialState && this.modalRef.content.initialState.categoryId) {
      this.categoryId = this.modalRef.content.initialState.categoryId;
    }

    this.categoryService.getCategoryById(this.categoryId)
    .subscribe((data: any) => {
      this.category = data as Category;
    });


  }

  confirm(): void {
    this.boutonDesactive = true;
    this.categoryService.updateCategory(this.category)
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
