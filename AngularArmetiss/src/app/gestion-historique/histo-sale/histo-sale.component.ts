import { Component, OnInit } from '@angular/core';
import { Sale } from '../models/sale';
import { HistoService} from '../histo.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-histo-sale',
  templateUrl: './histo-sale.component.html',
  styleUrls: ['./histo-sale.component.css']
})
export class HistoSaleComponent implements OnInit{

  saleList:Sale[];

  constructor(
    private histoService:HistoService,
    private router:Router
  ){}

  ngOnInit(): void {
    this.getSaleList();
  }

  getSaleList(){
    this.histoService.getSaleList()
    .subscribe(
      (data: Sale[]) => {
        this.saleList = data;
        console.table(this.saleList);
      },
      //en cas d'erreur on affiche le msg dans la console
      (err) => {
        console.log(err);
      }

    );
  }

  goToDetailSale(sale: Sale){
    this.router.navigate(['/historique',sale.Id_Sale]);
  }
}
