import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DeleteCategoryComponent } from './delete-category/delete-category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categoryList: Category[];
  modalRef: BsModalRef;

  totalRecords:number;
  page:number=1;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private modalService: BsModalService
  ) {}


  ngOnInit() {
    this.getCategory();
  }

    //on récupère tout les catégorie de la db
    getCategory(){
      this.categoryService.getCategoryList()
      .subscribe(
        (data: Category[]) => {
          this.categoryList = data;
          this.totalRecords = this.categoryList.length;
        },
        //en cas d'erreur on affiche le msg dans la console
        (err) => {
          console.log(err);
        }

      );
    }

    //ouvrir modal pour confirmer suppression
    openConfirmationDeleteModal(categoryId: number){
      const initialState = {
        categoryId: categoryId
      };
      this.modalRef = this.modalService.show(DeleteCategoryComponent, { initialState }); // on envoie l'id au modal
      if (this.modalRef) { //on verifie si il existe pour eviter des erreur
        //lorsque le modal est fermer on raffraichi la liste de categories
        this.modalRef.onHidden?.subscribe(() => {
          this.getCategory();
        });
      }

    }

    //ouvrir modal pour ajouter une categorie
    openAddCatModal(){
      this.modalRef = this.modalService.show(AddCategoryComponent); // on envoie l'id au modal
      if (this.modalRef) { //on verifie si il existe pour eviter des erreur
        //lorsque le modal est fermer on raffraichi la liste de categories
        this.modalRef.onHidden?.subscribe(() => {
          this.getCategory();
        });
      }
    }

    //ouvrir modal pour modifier une categorie
    openEditCatModal(categoryId: number){
      const initialState = {
        categoryId: categoryId
      };

      this.modalRef = this.modalService.show(EditCategoryComponent, {initialState }); // on envoie l'id au modal
      if (this.modalRef) { //on verifie si il existe pour eviter des erreur
        //lorsque le modal est fermer on raffraichi la liste de categories
        this.modalRef.onHidden?.subscribe(() => {
          this.getCategory();
        });
      }

    }



}
