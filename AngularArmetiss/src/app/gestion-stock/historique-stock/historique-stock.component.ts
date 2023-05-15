import { Component, OnInit } from '@angular/core';
import { GestionStockService } from '../gestion-stock.service';
import { ActivatedRoute } from '@angular/router';
import { Stock } from '../stock';

@Component({
  selector: 'app-historique-stock',
  templateUrl: './historique-stock.component.html',
  styleUrls: ['./historique-stock.component.css'],
})
export class HistoriqueStockComponent implements OnInit {
  constructor(private gestionStockService: GestionStockService, private route : ActivatedRoute) {}

  stockList: Stock[];
  totalRecords:number;
  page:number=1;

  ngOnInit() {
    const productId: number = Number(this.route.snapshot.paramMap.get('id'));
    if(productId){
      this.gestionStockService.getHistoriqueStock(productId)
      .subscribe((data: Stock[]) => {
        this.stockList = data;
        this.totalRecords = data.length;
      });

    } else {
    }
  }

  getHistoriqueStock(id: number) {
    this.gestionStockService.getHistoriqueStock(id).subscribe((res) => {
      console.log(res);
    });
  }
}
