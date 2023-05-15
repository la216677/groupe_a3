import { Component, Input, ViewChild, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/gestion-ventes/models/client';
import { ClientService } from '../client.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {

  @Input() client: Client ; // on attend un objet client en entrée
  @ViewChild('clientForm') clientForm: NgForm; //va nous permettre de vérifier le form
  isAddForm: boolean; // pour verifier si nous somme dans un formulaire d'ajout
  editMode:boolean = false;

  emailExists: boolean = false;
  boutonDesactive: boolean;
  url: string;
  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService : CookieService,
    private location: Location
     ) {

     }


  ngOnInit() {
    this.isAddForm = this.router.url.includes('add');
  }

  /*
  *Validation du form
  */
  onSubmit(){
    this.boutonDesactive = true;
    if (this.isAddForm) {
      this.clientService.addClient(this.client).subscribe(() => {
        this.location.back();
      });
    }
   else {
      console.log(this.client);
      this.clientService.updateClient(this.client)
      .subscribe(()=>this.location.back());

    }
    setTimeout(() => { //on bloque le bouton pendant 5 seconde après un click
      this.boutonDesactive = false;
    }, 5000);

  }

  /*
  * on vérifie si l'email existe deja
  */

  checkEmailExists(email: string){
    const regex = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
    if (regex.test(email)) {
      this.clientService
        .checkEmailExists(email)
        .subscribe((exists: boolean) => {
          this.emailExists = exists;
          this.boutonDesactive = exists;
        });
      } else {
        this.boutonDesactive = true;
      }
  }

  }
