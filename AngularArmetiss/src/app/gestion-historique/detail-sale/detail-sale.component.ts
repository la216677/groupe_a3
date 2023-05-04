import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/gestion-produit/models/product';
import { HistoService } from '../histo.service';
import { ActivatedRoute } from '@angular/router';
import { SaleProd } from '../models/saleProduct';

@Component({
  selector: 'app-detail-sale',
  templateUrl: './detail-sale.component.html',
  styleUrls: ['./detail-sale.component.css']
})
export class DetailSaleComponent implements OnInit{
  saleProductList:SaleProd[];
  saleId:string|null;

  constructor(
    private histoService:HistoService,
    private route:ActivatedRoute
  ){}

  ngOnInit(): void {
    this.saleId=this.route.snapshot.paramMap.get('id');
    this.getProductList();
  }

  getProductList(){
    this.histoService.getSaleProductList(this.saleId)
    .subscribe(
      (data: SaleProd[]) => {
        this.saleProductList = data;
        console.table(this.saleProductList);
      },
      //en cas d'erreur on affiche le msg dans la console
      (err) => {
        console.log(err);
      }

    );
  }


}
