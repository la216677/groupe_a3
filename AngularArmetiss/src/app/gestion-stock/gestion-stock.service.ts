import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Form } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class GestionStockService {

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
}
