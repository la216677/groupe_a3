import { Component, OnInit,ElementRef,ViewChild  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoService } from 'src/app/gestion-historique/histo.service';
import { Sale } from 'src/app/gestion-historique/models/sale';
import { SaleProd } from 'src/app/gestion-historique/models/saleProduct';
// import { Product } from 'src/app/gestion-produit/models/product';
// import { Panier } from '../models/panier';
// import { Client } from '../models/client';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

@Component({
  selector: 'app-confirm-commande',
  templateUrl: './confirm-commande.component.html',
  styleUrls: ['./confirm-commande.component.css']
})
export class ConfirmCommandeComponent implements OnInit{
  @ViewChild('htmlData') htmlData!: ElementRef;
  saleList:Sale[];
  saleProductList:SaleProd[];
  saleId:string|null;
  totalCommande:number
  htmlToPdf: any
  numFacture: number = 0;
  idClient: string | null;
  idClientInt: number = 0;

  constructor(private route:ActivatedRoute, private router:Router, private historiqueService: HistoService, private elementRef: ElementRef){}

  ngOnInit(): void {
    this.saleId=this.route.snapshot.paramMap.get('id');
    this.idClient=this.route.snapshot.paramMap.get('idclient');
    this.idClientInt = parseInt(this.idClient!);
    console.log(this.idClientInt);
    console.log(this.saleId);
    this.getVente();
    this.getTotalCommande();
  }

  goToVentes(){
    this.router.navigate(['/ventes']);
  }
  goToAccueil(){
    this.router.navigate(['/menu']);
  }
  goToFacture(){
    this.router.navigate(['/facture',this.saleId,this.idClient]);
  }

  getVente(){
    this.historiqueService.getSaleProductList(this.saleId)
    .subscribe(
      (data: SaleProd[]) => {
        this.saleProductList = data;
        console.table(this.saleProductList);
      },
      //en cas d'erreur on affiche le msg dans la console
      (err) => {
        console.log(err);
      }

    );
  }

  getTotalCommande(){
    this.historiqueService.getTotalSale(this.saleId)
    .subscribe(
      (data: number) => {
        this.totalCommande = data;
        console.table(this.totalCommande);
      },
      //en cas d'erreur on affiche le msg dans la console
      (err) => {
        console.log(err);
      }

    );
  }
}
