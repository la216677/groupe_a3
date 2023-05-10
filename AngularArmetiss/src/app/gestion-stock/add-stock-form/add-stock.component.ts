import { Component, Input, OnInit } from '@angular/core';
import { Stock } from '../../gestion-produit/models/stock';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
import { GestionStockService } from '../gestion-stock.service';
import { Product } from 'src/app/gestion-produit/models/product';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css'],
})
export class AddStockComponent{

  form = {
    quantity: '',
    price: '',
    purchaseDate: '',
    provider : ''

  }


  constructor(
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private gestionStockService: GestionStockService
  ) {}



  id = this.route.snapshot.paramMap.get('id');
  // Do something with the id and other parameters

  boolAddStock = 0;

  addStock() {
    this.gestionStockService.addStock(this.form.quantity, this.form.price, this.form.purchaseDate, this.form.provider ,this.id).subscribe(success => {
      if (success) {
        this.boolAddStock = 1;
        console.log("success");
        this.UpdateProductQuantity()
      } else {
        this.boolAddStock = -1;
        console.log("error");
      }
    });
  }

  UpdateProductQuantity(){
    this.gestionStockService.updateProductQuantity(this.id).subscribe()
  };

  UpdateAllProductQuantity(id: string | null){
    this.gestionStockService.updateAllProductQuantity(id).subscribe()
  };
}


