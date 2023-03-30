import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { Users } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = 'http://localhost/test/server/gestion-user';
  constructor(private http: HttpClient) { }

  public addUser(user: Users): Observable<Users> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.post<Users>(`${this.baseUrl}/addUser.php`,user, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null)),
    )

}

checkEmailExists(email: string): Observable<boolean> {
  return this.http.get<boolean>(`${this.baseUrl}/checkEmail.php?email=${email}`);
}

getRole(){
  return this.http.get(`${this.baseUrl}/getRole.php`).pipe(
    // On utilise l'opérateur map pour transformer la réponse HTTP en tableau.
    map((res: any) => {
      return res['data'];
    })
  );
}



private log(response: any) {
  console.table(response);
}

private handleError(error: Error, errorValue: any) {
  console.error(error);
  return of (errorValue); //le of permet de transformer une donnée simple en flux de données, observable qui emmet la donnée en param
}



  }

