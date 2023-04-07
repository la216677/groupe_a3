import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Category } from '../models/category';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl: string = 'http://localhost/test/server/gestion-categorie';



  constructor(private http: HttpClient) { }

  getCategoryList(): Observable<Category[]> {
    return this.http.get(`${this.baseUrl}/getCategory.php`).pipe(
      // On utilise l'opérateur map pour transformer la réponse HTTP en tableau.
      map((res: any) => {
        return res['data'];
      }),
      catchError((error) => this.handleError(error, []))
    );
  }

/*
* Supprimer une catégorie
*/
deleteCategoryById(categoryId: number): Observable<null>{
  return this.http.delete(`${this.baseUrl}/deleteCategory.php?categoryId=${categoryId}`).pipe(
    catchError((error) => this.handleError(error,null))
  )
}

/*
*Ajouter une catégorie
*/
addCategory(category: Category): Observable<Category>{
  const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  return this.http.post<Category>(`${this.baseUrl}/addCategory.php`,category, httpOptions).pipe(
    catchError((error) => this.handleError(error, null))
  )

}

getCategoryById(categoryId: number): Observable<Category>{
  return  this.http.get<Category>(`${this.baseUrl}/getCategoryById.php?categoryId=${categoryId}`).pipe(
    map((res: any) => {
      return res['data'];
    }),
    catchError((error) => this.handleError(error,undefined))
  );
}

/*
* Méthode pour modifier une categorie
*/

public updateCategory(category: Category): Observable<null> {
  const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  return this.http.put<Category>(`${this.baseUrl}/updateCategory.php`,category, httpOptions).pipe( //put persister modification d'un objet existant
    catchError((error) => this.handleError(error, null))
  )

}


  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of (errorValue); //le of permet de transformer une donnée simple en flux de données, observable qui emmet la donnée en param
  }
}
