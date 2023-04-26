import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../gestion-produit/models/product';
import { Client } from './models/client';

@Injectable({
  providedIn: 'root'
})
export class GestionService {

  baseUrl:string= "http://localhost/test/server/gestion-ventes/";

  constructor(private http:HttpClient){

  }

  getProductList() : Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}getAllProduct`).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  getClientList() : Observable<Client[]>{
    return this.http.get<Client[]>(`${this.baseUrl}getClient`).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }
}