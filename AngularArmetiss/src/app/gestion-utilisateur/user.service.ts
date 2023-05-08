import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Role } from './models/role';

import { User } from './models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = 'http://localhost/test/server/gestion-user';
  constructor(private http: HttpClient) {}

  /*
   * Méthode pour ajouter un utilisateur
   */
  public addUser(user: User): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http
      .post<User>(`${this.baseUrl}/addUser.php`, user, httpOptions)
      .pipe(catchError((error) => this.handleError(error, null)));
  }

  /*
   * Méthode pour modifier un utilisateur
   */

  public updateUser(user: User): Observable<null> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http
      .put<User>(`${this.baseUrl}/updateUser.php`, user, httpOptions)
      .pipe(
        //put persister modification d'un objet existant
        catchError((error) => this.handleError(error, null))
      );
  }

  /*
   *Méthode pour récuperer la liste de Users dans la Db
   */
  getUserList(): Observable<User[]> {
    return this.http.get(`${this.baseUrl}/getUser.php`).pipe(
      // On utilise l'opérateur map pour transformer la réponse HTTP en tableau.
      map((res: any) => {
        return res['data'];
      }),
      catchError((error) => this.handleError(error, []))
    );
  }

  getUserById(userId: number): Observable<User | undefined> {
    return this.http
      .get<User>(`${this.baseUrl}/getUserById.php?userId=${userId}`)
      .pipe(
        map((res: any) => {
          return res['data'];
        }),
        catchError((error) => this.handleError(error, undefined))
      );
  }

  /*
   * Supprimer un utilisateur
   */
  deleteUserById(userId: number): Observable<null> {
    return this.http
      .delete(`${this.baseUrl}/deleteUser.php?userId=${userId}`)
      .pipe(catchError((error) => this.handleError(error, null)));
  }

  /*
   * Méthode pour vérifier si l'email existe deja en DB
   */
  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.baseUrl}/checkEmail.php?email=${email}`
    );
  }

  /*
   *Méthode pour récuperer la liste des roles dans la DB
   */
  getRole(): Observable<Role[]> {
    return this.http.get(`${this.baseUrl}/getRole.php`).pipe(
      // On utilise l'opérateur map pour transformer la réponse HTTP en tableau.
      map((res: any) => {
        return res['data'];
      }),
      catchError((error) => this.handleError(error, []))
    );
  }

  getMdp(login: string): Observable<any> {
    var formData: any = new FormData();
    formData.append('login', login);
    return this.http.post(`${environment.apiLoginUrl}`, formData);
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue); //le of permet de transformer une donnée simple en flux de données, observable qui emmet la donnée en param
  }
}
