import { Component, OnInit } from '@angular/core';
import { Sale } from '../models/sale';
import { HistoService} from '../histo.service'
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-histo-sale',
  templateUrl: './histo-sale.component.html',
  styleUrls: ['./histo-sale.component.css']
})
export class HistoSaleComponent implements OnInit{

  saleList:Sale[];
  userId:string;
  roleId:string;
  totalRecords:number;
  page:number=1;

  constructor(
    private histoService:HistoService,
    private router:Router,
    private cookieService : CookieService
  ){}

  ngOnInit(): void {
    this.userId=this.cookieService.get('userId');
    this.roleId=this.cookieService.get('roleId');
    if(this.roleId=="3"){
      this.getSaleList();
    }else{
      this.getSaleListById();
    }
  }

  getSaleList(){
    this.histoService.getSaleList()
    .subscribe(
      (data: Sale[]) => {
        this.saleList = data;
        this.totalRecords = data.length;
      },
      //en cas d'erreur on affiche le msg dans la console
      (err) => {
        console.log(err);
      }

    );
  }

  getSaleListById(){
    this.histoService.getSaleListByUser(this.userId)
    .subscribe(
      (data: Sale[]) => {
        this.saleList = data;
        this.totalRecords = data.length;
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
