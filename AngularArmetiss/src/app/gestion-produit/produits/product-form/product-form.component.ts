import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { Category } from '../../models/category';
import { Router } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { CategoryService } from '../../service/category.service';
import { TVA } from '../../models/TVA';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit{

  @Input() product: Product ; // on attend un objet product en entrée
  categoryList: Category[];
  tvaList: TVA[];

  isAddForm: boolean;
  boutonDesactive: boolean;

  constructor(
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit()  {
    this.isAddForm = this.router.url.includes('add');
    this.getCategory();
    this.getTVA();
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

  getTVA(){
    this.productService.getTVAList()
    .subscribe(
      (data: TVA[]) => {
        this.tvaList = data;
      },
      //en cas d'erreur on affiche le msg dans la console
      (err) => {
        console.log(err);
      }

    );

  }

  onSubmit(){
    this.boutonDesactive = true;
    if (!this.product.Product_Image_URL || this.product.Product_Image_URL.trim() === '') {
      this.product.Product_Image_URL = null; // Définir la valeur comme null si elle est nulle ou vide
    }
    if(this.isAddForm){
      this.calculateTVAC();
      this.productService.addProduct(this.product)
      .subscribe(()=>this.router.navigate(['/produits']));
    }else{
      this.calculateTVAC();
      this.productService.updateProduct(this.product)
      .subscribe(()=>this.router.navigate(['/produits']));

    }
    setTimeout(() => { //on bloque le bouton pendant 5 seconde après un click
      this.boutonDesactive = false;
    }, 5000);

  }

  calculateTVAC(){

    const selectedTVA = this.product.Id_TVA;
    const tvaRate = this.tvaList.find(tva => tva.ID_TVA === selectedTVA);

    if (tvaRate) {
      const tvaPercentage = tvaRate.TVA_Rate;
      const productPriceHTVA = this.product.Product_Sale_Price_HTVA;

      if(!isNaN(productPriceHTVA)){
        const tvaAmount = productPriceHTVA * (tvaPercentage);
        const productPriceTVAC = +productPriceHTVA+tvaAmount;
        this.product.Product_Sale_Price_TVAC = productPriceTVAC;
      }else{
        console.error('Le prix HTVA entré n\'est pas un nombre valide.');
        return;
      }
    }
  }
}
