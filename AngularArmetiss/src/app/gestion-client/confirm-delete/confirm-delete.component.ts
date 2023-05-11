import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ClientService } from '../client.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html'
})
export class ConfirmDeleteComponent implements OnInit {

  clientId: number;
  onClose: Subject<any> = new Subject();
  boutonDesactive: boolean;

  constructor(
    public modalRef: BsModalRef,
    private clientService : ClientService,
    private router: Router
    ) {}

    ngOnInit() {
      //on verifie si content, intialState et clientId existe bien, sinon un message d'erreur apparait
      if (this.modalRef.content && this.modalRef.content.initialState && this.modalRef.content.initialState.clientId) {
        this.clientId = this.modalRef.content.initialState.clientId;
      }


    }

  confirm(): void {
    this.boutonDesactive = true;
    this.clientService.deleteClientById(this.clientId)
    .subscribe(() => {
      this.goToClientList;
      this.modalRef.hide();
    });

    setTimeout(() => { //on bloque le bouton pendant 5 seconde après un click
      this.boutonDesactive = false;
    }, 5000);

  }



  cancel(): void {
    this.modalRef.hide();
  }

  goToClientList(){
    this.router.navigate(['/client']);
  }

}
