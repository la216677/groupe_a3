import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sale } from './models/sale';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoService {

  baseUrl:string= "http://localhost/test/server/gestion-historique/";

  constructor(private http:HttpClient) { }

  getSaleList(){
    return this.http.get<Sale[]>(`${this.baseUrl}getAllSale`).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  getSaleProductList(saleId:string|null){
    return this.http.get<Sale[]>(`${this.baseUrl}getAllSaleProduct.php?id=${saleId}`).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }
}
