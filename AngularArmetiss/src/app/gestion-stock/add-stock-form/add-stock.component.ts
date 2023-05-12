import { Component, Input, OnInit } from '@angular/core';
import { Stock } from '../../gestion-produit/models/stock';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GestionStockService } from '../gestion-stock.service';


@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css'],
})
export class AddStockComponent implements OnInit{

  form = {
    quantity: '',
    price: '',
    purchaseDate: '',
    provider : ''

  }

  constructor(
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private gestionStockService: GestionStockService,
    private router: Router
  ) {}

  id = this.route.snapshot.paramMap.get('id');
  // Do something with the id and other parameters

  ngOnInit() {
    this.getImg(this.id);
  }
  boolAddStock = 0;

  addStock() {
    this.gestionStockService.addStock(this.form.quantity, this.form.price, this.form.purchaseDate, this.form.provider ,this.id).subscribe(success => {
      if (success) {
        this.boolAddStock = 1;
        console.log("success");
        this.UpdateProductQuantity();
        this.goToListProduct();
      } else {
        this.boolAddStock = -1;
        console.log("error");
      }
    });
  }

  UpdateProductQuantity(){
    this.gestionStockService.updateProductQuantity(this.id).subscribe()
  };

  goToListProduct(){
    this.router.navigate(['/gestionStock'],{ queryParams: { id: String } });
}
  url: string;
  getImg(id: string | null) {
    return this.gestionStockService.getImg(id).subscribe(
      (data: any) => {
        this.url = data;
      },
      //en cas d'erreur on affiche le msg dans la console
      (err) => {
        console.log(err);
      }
    );
  }


}
