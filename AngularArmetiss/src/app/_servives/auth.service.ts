import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from 'src/users';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(login: string, password: string): Observable<any> {
    var formData: any = new FormData();
    formData.append('login', login);
    formData.append('password', password);
    return this.http.post(`${environment.apiLoginUrl}`, formData);
  }
}
