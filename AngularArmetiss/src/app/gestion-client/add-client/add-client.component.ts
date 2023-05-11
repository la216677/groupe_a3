import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/gestion-ventes/models/client';

@Component({
  selector: 'app-add-client',
  template: `
  <app-client-form [client]="client"></app-client-form>
  `
})
export class AddClientComponent implements OnInit {

  client: Client;

  ngOnInit() {
    this.client = new Client();
  }

}
