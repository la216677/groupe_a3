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
  panier:Panier;
  client:Client;

  constructor(private route:ActivatedRoute, private router:Router){}

  ngOnInit(): void {
    const confirmId:string|null=this.route.snapshot.paramMap.get('id');

    const panierJson=this.route.snapshot.paramMap.get('bask')!;
    const clientJson=this.route.snapshot.paramMap.get('donnees')!;
    this.panier=JSON.parse(panierJson);
    this.client=JSON.parse(clientJson);
  }

  genererPdf() {
    console.table(this.client);
    console.table(this.panier);

    const tableData:[number, string, number, number, number][] = [];
    this.panier.basket.forEach((item,index) => {
      const product = item[0];
      const quantity = item[1];
      const totalPrice = product.Product_Sale_Price_TVAC * quantity;
      tableData.push([index + 1, product.Product_Name, product.Product_Sale_Price_TVAC, quantity, totalPrice]);
    });

    //A completer

  }

  goToVentes(){
    this.router.navigate(['/ventes']);
  }
  goToAccueil(){
    this.router.navigate(['/menu']);
  }


}
