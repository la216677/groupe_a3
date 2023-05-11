import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Client } from '../gestion-ventes/models/client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  baseUrl: string = 'http://localhost/test/server/gestion-client';
  constructor(private http: HttpClient) {}

  /*
   * Méthode pour ajouter un client
   */
  public addClient(client: Client): Observable<Client> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http
      .post<Client>(`${this.baseUrl}/addClient.php`, client, httpOptions)
      .pipe(catchError((error) => this.handleError(error, null)));
  }

  /*
   * Méthode pour modifier un client
   */

  public updateClient(client: Client): Observable<null> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http
      .put<Client>(`${this.baseUrl}/updateClient.php`, client, httpOptions)
      .pipe(
        //put persister modification d'un objet existant
        catchError((error) => this.handleError(error, null))
      );
  }

  /*
   *Méthode pour récuperer la liste de Client dans la Db
   */
  getClientList(): Observable<Client[]> {
    return this.http.get(`${this.baseUrl}/getClient.php`).pipe(
      // On utilise l'opérateur map pour transformer la réponse HTTP en tableau.
      map((res: any) => {
        return res['data'];
      }),
      catchError((error) => this.handleError(error, []))
    );
  }

  getClientById(clientId: number): Observable<Client | undefined> {
    return this.http
      .get<Client>(`${this.baseUrl}/getClientById.php?clientId=${clientId}`)
      .pipe(
        map((res: any) => {
          return res['data'];
        }),
        catchError((error) => this.handleError(error, undefined))
      );
  }

  /*
   * Supprimer un client
   */
  deleteClientById(clientId: number): Observable<null> {
    return this.http
      .delete(`${this.baseUrl}/deleteClient.php?clientId=${clientId}`)
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

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue); //le of permet de transformer une donnée simple en flux de données, observable qui emmet la donnée en param
  }
}
