import { BsModalRef } from 'ngx-bootstrap/modal';
import { ClientService } from '../client.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Component, Input, ViewChild, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Client } from 'src/app/gestion-ventes/models/client';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-addClientModal',
  templateUrl: './addClientModal.component.html',
  styleUrls: ['./addClientModal.component.css']
})
export class addClientModalComponent implements OnInit {

  clientId: number;
  onClose: Subject<any> = new Subject();
  boutonDesactive: boolean;
  boutonDesactive2: boolean;
  client: Client = new Client();
  @ViewChild('clientForm') clientForm: NgForm; //va nous permettre de vérifier le form
  isAddForm: boolean; // pour verifier si nous somme dans un formulaire d'ajout
  editMode:boolean = false;

  emailExists: boolean = false;
  url: string;


  constructor(
    public modalRef: BsModalRef,
    private clientService : ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService : CookieService,
    private location: Location
    ) {}

    ngOnInit() {
      this.isAddForm = this.router.url.includes('add');
      //on verifie si content, intialState et clientId existe bien, sinon un message d'erreur apparait
      if (this.modalRef.content && this.modalRef.content.initialState && this.modalRef.content.initialState.clientId) {
        this.clientId = this.modalRef.content.initialState.clientId;
      }


    }

  confirm(): void {
    this.onSubmit();

  }



  cancel(): void {
    this.modalRef.hide();
  }

  goToClientList(){
    this.router.navigate(['/client']);
  }




  /*
  *Validation du form
  */
  onSubmit(){
    this.boutonDesactive2 = true;
    this.clientService.addClient(this.client)
    .subscribe(() => {
      this.goToClientList;
      this.modalRef.hide();
    });

    setTimeout(() => { //on bloque le bouton pendant 5 seconde après un click
      this.boutonDesactive = false;
    }, 5000);

  }

  /*
  * on vérifie si l'email existe deja
  */

  checkOriginalEmail(email: string): boolean {
    return email === this.client.Client_Email;
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.clientService.checkEmailExists(email);
  }

  checkEmail(email: string) {
    if (this.checkOriginalEmail(email)) {
      this.emailExists = false;
    } else {
      this.checkEmailExists(email).subscribe(
        (exists: boolean) => {
          this.emailExists = exists;
        }
      );
    }
  }


}
