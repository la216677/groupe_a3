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


  constructor(
    private router: Router,
    private clientService: ClientService,
    private modalService: BsModalService,
    private cookieService : CookieService
  ) {}

  ngOnInit() {
    this.getClient();
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
