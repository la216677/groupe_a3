import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Panier } from '../models/panier';
import { Client } from '../models/client';

@Component({
  selector: 'app-confirm-commande',
  templateUrl: './confirm-commande.component.html',
  styleUrls: ['./confirm-commande.component.css']
})
export class ConfirmCommandeComponent implements OnInit{
  idConfirm:string|null;

  constructor(private route:ActivatedRoute, private router:Router){}

  ngOnInit(): void {
    this.idConfirm=this.route.snapshot.paramMap.get('id');
  }

  genererPdf() {
    console.log(this.idConfirm);
    //A completer

  }

  goToVentes(){
    this.router.navigate(['/ventes']);
  }
  goToAccueil(){
    this.router.navigate(['/menu']);
  }


}
