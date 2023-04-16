import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-container-cards',
  templateUrl: './container-cards.component.html',
  styleUrls: ['./container-cards.component.css']
})
export class ContainerCardsComponent {
  constructor(private router:Router){}

  goToProduct(){
    this.router.navigate(['/produits']);
  }

  goToVentes(){
    this.router.navigate(['/ventes']);
  }

  goToHisto(){
    this.router.navigate(['/historique']);
  }
}
