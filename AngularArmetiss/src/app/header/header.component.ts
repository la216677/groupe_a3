import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from './header.service';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  datas!: Subscription
  data!: Subscription;
  connected!: boolean;
  flagGoBackArrow: boolean = false;

  constructor(private router:Router, private headerService: HeaderService, private cookieService: CookieService, private location: Location){
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      if(this.router.url == '/home' || this.router.url == '/menu'){
        this.flagGoBackArrow = false;
      }else{
        this.flagGoBackArrow = true;
      }
    });
  }

  ngOnInit(): void {
    // S'abonner aux mises à jour des données
    this.data = this.headerService.searchData$.subscribe(data => {
      this.connected = data;

    });

    if(this.cookieService.get('connected') == '1'){
      this.connected = true;
    }else{
      this.connected = false;
    }


    if(this.router.url == '/menu'){
      this.flagGoBackArrow = false;
    }
    console.log(this.flagGoBackArrow);
  }

  goToMenu(){
    this.flagGoBackArrow = false;
    const logo = document.querySelector('#Logo_ARMETISS') as HTMLElement;
    logo.style.transform = 'scale(1.2)';
    setTimeout(() => {
      logo.style.transform = 'scale(1)';
    }, 300);
    this.router.navigate(['/menu']);
    setTimeout(() => {
      this.ngOnInit();
    }, 10);

  }

  logout(){
    this.cookieService.delete('connected');
    this.cookieService.delete('userId');
    this.cookieService.delete('roleId');
    this.router.navigate(['/connexion']);
    this.headerService.addData(false);

  }

  goBack(){
    if(this.router.url == '/home'){
      this.flagGoBackArrow = false;
    }else{
      this.location.back();
    }
  }

}
