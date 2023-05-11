import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from './header.service';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  data!: Subscription;
  connected!: boolean;
  constructor(private router:Router, private headerService: HeaderService, private cookieService: CookieService){}

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
  }

  goToMenu(){
    const logo = document.querySelector('#Logo_ARMETISS') as HTMLElement;
    logo.style.transform = 'scale(1.2)';
    setTimeout(() => {
      logo.style.transform = 'scale(1)';
    }, 300);
    this.router.navigate(['/menu']);
  }

  logout(){
    this.cookieService.delete('connected');
    this.cookieService.delete('userId');
    this.cookieService.delete('roleId');
    this.router.navigate(['/connexion']);
    this.headerService.addData(false);

  }
}
