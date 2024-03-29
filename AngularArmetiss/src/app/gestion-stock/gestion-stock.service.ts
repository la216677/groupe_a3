import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Stock } from '../gestion-produit/models/stock';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Form } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class GestionStockService {

  baseUrlStock:string= "http://localhost/test/server/gestion-stock/";

  constructor(private http:HttpClient){

  }

  public addStock(quantity:String, price: String , purchaseDate: String, provider: String, id: String | null): Observable<any> {
    var formData: any = new FormData();
    formData.append('quantity', quantity);
    formData.append('price', price);
    formData.append('purchaseDate', purchaseDate);
    formData.append('provider', provider);
    formData.append('id', id);
    return this.http.post(`${environment.apiAddStock}`, formData);

  }

  public updateProductQuantity(idProduct: String | null): Observable<any> {
    var formData: any = new FormData();
    formData.append('idProduct', idProduct);
    return this.http.post(`${environment.apiGetStockProduct}`, formData);
}


public getHistoriqueStock(id: number): Observable<any> {
  return this.http.get<Stock[]>(`${this.baseUrlStock}getStock.php?id=${id}`).pipe(
    map((res: any) => {
      return res['data'];
    })
  );

}

getImg(id: string | null) {
  return this.http.get(`${environment.apiGetImg}?id=${id}`).pipe(
    map((res: any) => {
      return res['data'];
    })
  );;
}
}
