import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Client } from 'src/app/gestion-ventes/models/client';
import { ClientService } from '../client.service';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {

  modalRef: BsModalRef;

  ClientList: Client[];


  totalRecords:number;
  page:number=1;
  flag: boolean;
  searchTerm: string; // Terme de recherche
  filteredClienList: Client[]; // Liste des produits filtrés


  constructor(
    private router: Router,
    private clientService: ClientService,
    private modalService: BsModalService,
    private cookieService : CookieService
  ) {}

  ngOnInit() {
    this.getClient();
    this.flag = false;
  }


  //on récupère tout les user de la db
  getClient(){
    this.clientService.getClientList()
    .subscribe(
      (data: Client[]) => {
        this.ClientList = data;
        this.totalRecords = data.length;
      },
      //en cas d'erreur on affiche le msg dans la console
      (err) => {
        console.log(err);
      }

    );
  }

  filterUsers() {
    this.flag = true;
    if (this.searchTerm) {
      // Si un terme de recherche est saisi
      this.filteredClienList = this.ClientList.filter(
        client => client.Client_Name.toLowerCase().replace(/ /, "-").includes(this.searchTerm.toLowerCase().replace(/ /, "-")) // replace(/ /, "-") remplace les tirer par des espaces
        || client.Client_Last_Name.toLowerCase().replace(/ /, "-").includes(this.searchTerm.toLowerCase().replace(/ /, "-"))
        || client.Client_Email.toLowerCase().replace(/ /, "-").includes(this.searchTerm.toLowerCase().replace(/ /, "-"))
        || client.Client_NumTel.toLowerCase().replace(/ /, "-").includes(this.searchTerm.toLowerCase().replace(/ /, "-"))

        ); // Filtrer les produits par terme de recherche avec correspondance insensible à la casse et aux espaces
    } else {
      this.filteredClienList = this.ClientList; // Si aucun terme de recherche n'est saisi, afficher tous les produits
    }
  }
  sortDirection: number = 1;
  sort(column: keyof Client) {
    this.ClientList = this.ClientList.sort((a: Client, b: Client) => {
      if (a[column] < b[column]) {
        return -1 * this.sortDirection;
      } else if (a[column] > b[column]) {
        return 1 * this.sortDirection;
      } else {
        return 0;
      }
    });
    this.sortDirection = this.sortDirection * -1;
  }

  //Aller a la page d'ajout
  goToAddClient(){
    this.router.navigate(['clients/add']);
  }

  //aller a la page d'edit
  goToEditClient(id:string){
    this.router.navigate([`clients/edit/${parseInt(id, 10)}`]);
  }


  // ouverture d'un message de confirmation lors de la suppression
  openConfirmationDeleteModal(clientId: string) {
    const initialState = {
      clientId: parseInt(clientId, 10)
    };
    this.modalRef = this.modalService.show(ConfirmDeleteComponent, { initialState }); // on envoie l'id au modal
    if (this.modalRef) { //on verifie si il existe pour eviter des erreur
      //lorsque le modal est fermer on raffraichi la liste d'utilisateur
      this.modalRef.onHidden?.subscribe(() => {
        this.getClient();
      });
    }
  }


}
