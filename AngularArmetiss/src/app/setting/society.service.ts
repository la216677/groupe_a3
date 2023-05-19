import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Society } from './models/society';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocietyService {

  constructor(private http:HttpClient){}

  baseUrlSociety:string= "http://localhost/test/server/gestion-societe/";

  public updateInfoSociete(society: Society): Observable<any> {
    return this.http.post(`${this.baseUrlSociety}/updateInfoSociete.php`, society);
}
}
