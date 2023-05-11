import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_servives/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HeaderService } from 'src/app/header/header.service';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {

  errorMsg: String = '';

  constructor(
    private api: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private headerService: HeaderService
  ) {}


    flag: boolean = false;

  form = {
    nom: '',
    password: ''
  }

  authentication(login: string, password: string) {

    console.log(login, password);
    this.api.login(login, password).subscribe({
      next: (response) => {
        console.log('ok');
        const userId = response.id;
        const roleId = response.role;
        console.log(roleId);
        this.cookieService.set('connected', '1');
        this.headerService.addData(true);
        this.cookieService.set('userId',userId);
        this.cookieService.set('roleId',roleId);
        this.router.navigate(['home']);
        this.flag = true;
      },
      error: () => {
        console.log("ko");
        this.errorMsg = 'Le nom ou le mot de passe est incorect';
      },
    });
  }
}
