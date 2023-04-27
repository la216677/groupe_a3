import { Component, Input, OnInit } from '@angular/core';
import { GestionService } from '../gestion.service';
import { Product } from 'src/app/gestion-produit/models/product';
import { Category } from 'src/app/gestion-produit/models/category';
import { CategoryService } from 'src/app/gestion-produit/service/category.service';
import { Client } from '../models/client';
import { Panier } from '../models/panier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit{
  products:Product[]; //Liste des produit

  totalPrice:number=0; //Prix du total de la commande
  totalPriceRounded=""; //Arrondi

  categoryList: Category[]; //List des catégories
  clientList: Client[]; //Liste des clients
  baskets:[Product, number][]=[]; //Panier avec quantité

  filteredProductList: Product[]; // Liste des produits filtrés
  selectedCategory: number = 0 ; // Catégorie sélectionnée dans le menu déroulant
  searchTerm: string; // Terme de recherche

  constructor(
    private gestionService:GestionService,
    private categoryService: CategoryService,
    private router:Router
    ){}

  ngOnInit(){
    this.getProducts();
    this.getCategory();
    this.getClient();
  }

  getProducts(){
    this.gestionService.getProductList()
    .subscribe(
      (data: Product[]) => {
        this.products = data;
        this.filteredProductList = this.products;
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

  getClient(){
    this.gestionService.getClientList()
    .subscribe(
      (data: Client[]) => {
        this.clientList = data;
      },
      //en cas d'erreur on affiche le msg dans la console
      (err) => {
        console.log(err);
      }

    );
    console.table(this.clientList);
  }

  // Fonction pour filtrer les produits par catégorie
  filterByCategory() {
    if (this.selectedCategory == 0) {
      this.filteredProductList = this.products; // Si aucune catégorie n'est sélectionnée, afficher tous les produits
    } else {
      this.filteredProductList = this.products.filter(product => product.Id_Category === this.selectedCategory); // Filtrer les produits par catégorie
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

  addBasket(product:Product){
    let index = -1;
    for (let i = 0; i < this.baskets.length; i++) {
      if (this.baskets[i][0] === product) {
        index = i;
        break;
      }
    }

    if (index !== -1) {
      this.baskets[index][1]++;
    } else { // Sinon, ajouter le produit au tableau avec une quantité initiale de 1
      this.baskets.push([product, 1]);
    }
    this.totalPrice+=+product.Product_Sale_Price_TVAC;
    this.totalPriceRounded=this.totalPrice.toFixed(2);
    console.table(this.baskets);
  }

  deleteBasket(product:Product,quantite:number){
    for (let i = 0; i < this.baskets.length; i++) {
      if (this.baskets[i][0] === product) {
        this.baskets.splice(i, 1);
        break;
      }
    }
    this.totalPrice-=+product.Product_Sale_Price_TVAC*quantite;
    this.totalPriceRounded=this.totalPrice.toFixed(2);
  }

  postBasket(){
    let client=document.getElementById("selectClient") as HTMLSelectElement;
    let clientId:string=client.value;
    let clientData:Client|null;
    let panier:Panier;
    if(clientId=="-1"){
      clientData=null;
    }else{
      clientData=this.clientList[+clientId-1];
    }
    panier={
      basket:this.baskets,
      totalPrice:this.totalPrice,
      client:clientId
    };
    fetch('http://localhost/test/server/gestion-ventes/addBasket.php', {
    method: 'POST',
    body: JSON.stringify(panier),
    headers: {
      'Content-Type': 'application/json'
    }
    }).then(response => response.json())
    .then(data => {
      const lastId: number = data;
      console.log(lastId);
      this.router.navigate(['/ventes/confirm',lastId, {bask:JSON.stringify(panier),donnees:JSON.stringify(clientData)}]);
    })
    .catch(error => {
      console.error(error);
    });
    console.table(clientData);
    console.table(panier);



  }
}
