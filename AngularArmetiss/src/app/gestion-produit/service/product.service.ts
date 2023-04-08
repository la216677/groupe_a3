import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable, catchError, map, of } from 'rxjs';
import { TVA } from '../models/TVA';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl: string = 'http://localhost/test/server/gestion-produit';

  constructor(private http: HttpClient) { }

  getProductList(): Observable<Product[]> {
    return this.http.get(`${this.baseUrl}/getProduct.php`).pipe(
      // On utilise l'opérateur map pour transformer la réponse HTTP en tableau.
      map((res: any) => {
        return res['data'];
      }),
      catchError((error) => this.handleError(error, []))
    );
  }

  /*
*Ajouter un produit
*/
addProduct(product: Product): Observable<Product>{
  const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  return this.http.post<Product>(`${this.baseUrl}/addProduct.php`,product, httpOptions).pipe(
    catchError((error) => this.handleError(error, null))
  )

}

getProductById(productId: number): Observable<Product> {
  return  this.http.get<Product>(`${this.baseUrl}/getProductById.php?productId=${productId}`).pipe(
    map((res: any) => {
      return res['data'];
    }),
    catchError((error) => this.handleError(error,undefined))
  );

}

/*
* Méthode pour modifier un produit
*/

public updateProduct(product: Product): Observable<null> {
  const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  return this.http.put<Product>(`${this.baseUrl}/updateProduct.php`,product, httpOptions).pipe( //put persister modification d'un objet existant
    catchError((error) => this.handleError(error, null))
  )

}




/*
* Supprimer un produit
*/
deleteProductById(productId: number): Observable<null>{
  return this.http.delete(`${this.baseUrl}/deleteProduct.php?productId=${productId}`).pipe(
    catchError((error) => this.handleError(error,null))
  )
}


/**
 *récupérer la TVA
 */

 getTVAList(): Observable<TVA[]> {
  return this.http.get(`${this.baseUrl}/getTVA.php`).pipe(
    // On utilise l'opérateur map pour transformer la réponse HTTP en tableau.
    map((res: any) => {
      return res['data'];
    }),
    catchError((error) => this.handleError(error, []))
  );

 }




  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of (errorValue); //le of permet de transformer une donnée simple en flux de données, observable qui emmet la donnée en param
  }


}
