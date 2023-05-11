import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/gestion-ventes/models/client';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-edit-client',
  template: `<app-client-form *ngIf="client" [client]="client"></app-client-form>`
})
export class EditClientComponent implements OnInit {
 client: Client | undefined;

  constructor(
    private route : ActivatedRoute,
    private clientService: ClientService
    ){}

  ngOnInit() {
    // on récupère l'id de l'user qui se trouve dans l'url
    const userId: number | null = Number(this.route.snapshot.paramMap.get('id'));
    if(userId){
      this.clientService.getClientById(userId)
      .subscribe((data: any) => {
        this.client = data as Client;
        this.client.Client_Email = this.client.Client_Email;
      });

    } else {
      this.client = undefined;
    }

  }

}
