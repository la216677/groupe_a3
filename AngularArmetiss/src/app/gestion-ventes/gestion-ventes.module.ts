import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductComponent } from './list-product/list-product.component';
import { VentesComponent } from './ventes/ventes.component';
import { FormsModule } from '@angular/forms';
import { ConfirmCommandeComponent } from './confirm-commande/confirm-commande.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TicketComponent } from './ticket/ticket.component';


@NgModule({
  declarations: [
    ListProductComponent,
    VentesComponent,
    ConfirmCommandeComponent,
    TicketComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class GestionVentesModule { }
