import { Component, OnInit } from '@angular/core';
import { GestionStockService } from '../gestion-stock.service';
import { Product } from 'src/app/gestion-produit/models/product';
import { Category } from 'src/app/gestion-produit/models/category';
import { CategoryService } from 'src/app/gestion-produit/service/category.service';
import { ProductService } from 'src/app/gestion-produit/service/product.service';
import { ActivatedRoute } from '@angular/router';

import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-list-stock',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css'],
})
export class ListProductComponent implements OnInit{
  products:Product[]; //Liste des produit


  categoryList: Category[]; //List des catégories

  filteredProductList: Product[]; // Liste des produits filtrés
  selectedCategory: number = 0 ; // Catégorie sélectionnée dans le menu déroulant
  searchTerm: string; // Terme de recherche

  idProduct: String;

  totalRecords:number;
  page:number=1;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router:Router,
    private route: ActivatedRoute,
    private gestionStockService: GestionStockService,
    ){}
    id: String | null;

  ngOnInit(){
    this.getProducts();
    this.getCategory();

    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
  });

  this.gestionStockService.updateProductQuantity(this.id).subscribe();
}

  getProducts(){
    this.productService.getProductList()
    .subscribe(
      (data: Product[]) => {
        this.products = data;
        this.filteredProductList = this.products;
        this.totalRecords = data.length;
      },
      //en cas d'erreur on affiche le msg dans la console
      (err) => {
        console.log(err);
      }
    );
  }

  goToAddStock(idProduct: number){
    this.router.navigate(['/add-stock',idProduct]);
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


  // Fonction pour filtrer les produits par catégorie
  filterByCategory() {
    if (this.selectedCategory == 0) {
      this.filteredProductList = this.products; // Si aucune catégorie n'est sélectionnée, afficher tous les produits
    } else {
      this.filteredProductList = this.products.filter(product => product.Id_Category == this.selectedCategory); // Filtrer les produits par catégorie
    }
  }


  // Fonction pour filtrer les produits par terme de recherche
  filterProducts() {
    if (this.searchTerm) {
      this.selectedCategory = 0; //on remet les categories a tout si il y a une recherche
      // Si un terme de recherche est saisi
      this.filteredProductList = this.products.filter(
        product =>
          product.Product_Name.toLowerCase().replace(/ /, "-").includes(this.searchTerm.toLowerCase().replace(/ /, "-")) // replace(/ /, "-") remplace les tirer par des espaces
      ); // Filtrer les produits par terme de recherche avec correspondance insensible à la casse et aux espaces
    } else {
      this.selectedCategory = 0;
      this.filteredProductList = this.products; // Si aucun terme de recherche n'est saisi, afficher tous les produits
    }
  }

  goToHistory(id:number){
    this.router.navigate([`historique-stock/${id}`]);
  }


}
