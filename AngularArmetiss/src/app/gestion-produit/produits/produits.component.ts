import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { CategoryService } from '../service/category.service';
import { Category } from '../models/category';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  productList: Product[];
  categoryList: Category[];
  modalRef: BsModalRef;

  filteredProductList: Product[]; // Liste des produits filtrés
  selectedCategory: number = 0 ; // Catégorie sélectionnée dans le menu déroulant
  searchTerm: string; // Terme de recherche

  roleId=this.cookieService.get('roleId');

  constructor(
    private router: Router,
    private productService: ProductService,
    private modalService: BsModalService,
    private categoryService: CategoryService,
    private cookieService:CookieService
  ) {}

  ngOnInit() {
    this.getProduct();
    this.getCategory();
  }


  //on récupère tout les produits de la db
  getProduct(){
    this.productService.getProductList()
    .subscribe(
      (data: Product[]) => {
        this.productList = data;
        this.filteredProductList = this.productList; // Affecter la liste de produits filtrés à la liste de produits à afficher initialement
      },
      //en cas d'erreur on affiche le msg dans la console
      (err) => {
        console.log(err);
      }
    );
  }

  //on récupère tout les catégorie de la db
  getCategory(){
    this.categoryService.getCategoryList()
    .subscribe(
      (data: Category[]) => {
        this.categoryList = data;
      },
      //en cas d'erreur on affiche le msg dans la console
      (err) => {
        console.log(err);
      }

    );
  }

  //ouvrir modal pour confirmer suppression
  openConfirmationDeleteModal(productId: number){
  const initialState = {
    productId: productId
  };
  this.modalRef = this.modalService.show(DeleteProductComponent, { initialState }); // on envoie l'id au modal
  if (this.modalRef) { //on verifie si il existe pour eviter des erreur
    //lorsque le modal est fermer on raffraichi la liste de categories
    this.modalRef.onHidden?.subscribe(() => {
      this.getProduct();
    });
  }

  }






  // Fonction pour filtrer les produits par catégorie
  filterByCategory() {
    if (this.selectedCategory == 0) {
      this.filteredProductList = this.productList; // Si aucune catégorie n'est sélectionnée, afficher tous les produits
    } else {
      this.filteredProductList = this.productList.filter(product => product.Id_Category === this.selectedCategory); // Filtrer les produits par catégorie
    }
  }


  // Fonction pour filtrer les produits par terme de recherche
  filterProducts() {
    if (this.searchTerm) {
      this.selectedCategory = 0; //on remet les categories a tout si il y a une recherche
      // Si un terme de recherche est saisi
      this.filteredProductList = this.productList.filter(
        product =>
          product.Product_Name.toLowerCase().replace(/ /, "-").includes(this.searchTerm.toLowerCase().replace(/ /, "-")) // replace(/ /, "-") remplace les tirer par des espaces
      ); // Filtrer les produits par terme de recherche avec correspondance insensible à la casse et aux espaces
    } else {
      this.selectedCategory = 0;
      this.filteredProductList = this.productList; // Si aucun terme de recherche n'est saisi, afficher tous les produits
    }
  }


  //pour aller a la page d'edit
  goToEditProduct(productId:number){
    this.router.navigate([`produits/edit/${productId}`])
  }

  //pour aller a la page d'ajout
  goToAddProduct(){
    this.router.navigate(['produits/add']);
  }

    //pour aller a la page categorie
    goToCategorie(){
      this.router.navigate(['categories']);
    }

}
