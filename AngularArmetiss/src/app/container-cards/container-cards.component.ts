import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HeaderService } from 'src/app/header/header.service';

@Component({
  selector: 'app-container-cards',
  templateUrl: './container-cards.component.html',
  styleUrls: ['./container-cards.component.css']
})
export class ContainerCardsComponent {
  roleId=this.cookieService.get('roleId');
  constructor(private router:Router, private cookieService: CookieService,private headerService: HeaderService){}

  goToProduct(){
    this.router.navigate(['/produits']);
  }

  goToVentes(){
    this.router.navigate(['/ventes']);
  }

  goToHisto(){
    this.router.navigate(['/historique']);
  }

  goToUser(){
    this.router.navigate(['/user']);
  }

  goToStock(){
    this.router.navigate(['/gestionStock']);
  }
  logout(){
    this.cookieService.delete('connected');
    this.cookieService.delete('userId');
    this.cookieService.delete('roleId');
    this.router.navigate(['/connexion']);
    this.headerService.addData(false);

  }
}
