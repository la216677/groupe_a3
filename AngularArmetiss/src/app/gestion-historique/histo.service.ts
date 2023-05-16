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
    return this.http.get<Sale[]>(`${this.baseUrl}getAllSale.php`).pipe(
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

  getSaleListByUser(userId:string|null){
    return this.http.get<Sale[]>(`${this.baseUrl}getSaleByUser.php?id=${userId}`).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  getTotalSale(saleId:string|null){
    return this.http.get<any>(`${this.baseUrl}getTotalSale.php?id=${saleId}`).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  getSaleById(saleId:string|null){
    return this.http.get<Sale[]>(`${this.baseUrl}getSaleById.php?id=${saleId}`).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }
}
