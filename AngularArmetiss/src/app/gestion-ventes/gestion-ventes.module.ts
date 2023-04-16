import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductComponent } from './list-product/list-product.component';
import { VentesComponent } from './ventes/ventes.component';
import { FormsModule } from '@angular/forms';
import { ConfirmCommandeComponent } from './confirm-commande/confirm-commande.component';



@NgModule({
  declarations: [
    ListProductComponent,
    VentesComponent,
    ConfirmCommandeComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class GestionVentesModule { }
