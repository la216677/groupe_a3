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


  constructor(private route:ActivatedRoute, private router:Router, private historiqueService: HistoService, private elementRef: ElementRef){}

  ngOnInit(): void {
    this.saleId=this.route.snapshot.paramMap.get('id');
    console.log(this.saleId);
    this.getVente();
    this.getTotalCommande();
  }

  public openPDF(): void {
    // let DATA: any = document.getElementById('htmlData');
    // DATA.style.fontSize = '30px';
    // html2canvas(DATA).then((canvas) => {
    //   let fileWidth = 190;
    //   let fileHeight = (canvas.height * fileWidth) / canvas.width;
    //   const FILEURI = canvas.toDataURL('image/png');
    //   let PDF = new jsPDF('p', 'mm', 'a4');
    //   PDF.text('Armetiss',5,10);
    //   PDF.text('TVA : 0454871210',5,15);
    //   PDF.text('Facture n°' ,5,20);
    //   PDF.text('Commande n°'+this.saleId,5,25);
    //   PDF.text('Date : '+new Date().toLocaleDateString(),5,30);
    //   PDF.text('Client : ',160,10);
    //   PDF.text('Adresse : ',160,15);
    //   PDF.text('Téléphone : ',160,20);
    //   PDF.text('Email : ',160,25);

    //   PDF.addImage(FILEURI, 'PNG', 9, 60, fileWidth, fileHeight);
    //   PDF.addImage('../../../assets/Logo_ARMETISS-blue.png', 'PNG', 80, 5, 50, 25);
    //   PDF.save('angular-demo.pdf');
    // });
    // DATA.style.fontSize = '21px';
  }

  goToVentes(){
    this.router.navigate(['/ventes']);
  }
  goToAccueil(){
    this.router.navigate(['/menu']);
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
