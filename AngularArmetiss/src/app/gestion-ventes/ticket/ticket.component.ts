import { Component, OnInit } from '@angular/core';
import { GestionService } from '../gestion.service';
import { Society } from '../models/society';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import localeFrBe from '@angular/common/locales/fr-BE';
import { registerLocaleData } from '@angular/common';
import { HistoService } from 'src/app/gestion-historique/histo.service';
import { Sale } from 'src/app/gestion-historique/models/sale';
import { SaleProd } from 'src/app/gestion-historique/models/saleProduct';
import { ClientService } from 'src/app/gestion-client/client.service';
import { Client } from '../models/client';
import { Location } from '@angular/common';
registerLocaleData(localeFrBe);

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
  providers: [DatePipe],
})
export class TicketComponent implements OnInit {
  infoSociete: Society[];
  currentDate: Date = new Date();
  sale: Sale;
  saleProductList: SaleProd[];
  saleId: string | null;

  infoSale: Sale[];

  client: Client;

  idClient: number;

  constructor(
    public gestionService: GestionService,
    public datePipe: DatePipe,
    public histoService: HistoService,
    public route: ActivatedRoute,
    public clientService: ClientService,
    private location: Location
  ) {}

  getProductList() {
    this.histoService.getSaleProductList(this.saleId).subscribe(
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

  getTotaleSale() {
    this.histoService.getTotalSale(this.saleId).subscribe(
      (data: Sale) => {
        this.sale = data;
        console.table(this.sale);
      },
      //en cas d'erreur on affiche le msg dans la console
      (err) => {
        console.log(err);
      }
    );
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm', 'fr-BE') || '';
  }

  ngOnInit(): void {
    this.getInfoSociete();
    this.route.paramMap.subscribe((params) => {
      this.saleId = params.get('id');
    });

    this.route.paramMap.subscribe((params) => {
      this.idClient = Number(params.get('idclient'));
    });
    this.getProductList();
    this.getTotaleSale();
    this.getSaleById();
    this.getClientById();
  }

  printTicket() {
    window.print();
    this.location.back();
  }

  getInfoSociete() {
    this.gestionService.getInfoSociete().subscribe(
      (data: Society[]) => {
        this.infoSociete = data;
        console.table(this.infoSociete);
      },
      //en cas d'erreur on affiche le msg dans la console
      (err) => {
        console.log(err);
      }
    );
  }

  getSaleById() {
    this.histoService.getSaleById(this.saleId).subscribe(
      (data: Sale[]) => {
        this.infoSale = data;
        console.table(this.infoSale);
      },
      //en cas d'erreur on affiche le msg dans la console
      (err) => {
        console.log(err);
      }
    );
  }

  getClientById() {
    if (this.idClient > 0) {
      this.clientService.getClientById(this.idClient).subscribe((data: any) => {
        this.client = data as Client;
        this.client.Client_Email = this.client.Client_Email;
      });
      console.log(this.client);
    }
  }
}
