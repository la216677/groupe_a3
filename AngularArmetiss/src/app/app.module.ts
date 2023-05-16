import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './gestion-utilisateur/user.module';

import { ProductManagementModule } from './gestion-produit/product-management.module';
import { ContainerCardsComponent } from './container-cards/container-cards.component';
import { HeaderComponent } from './header/header.component';
import { ProfileDropdownComponent } from './profile-dropdown/profile-dropdown.component';
import { CardPageComponent } from './card-page/card-page.component';
import { UserFormComponent } from './gestion-utilisateur/user-form/user-form.component';
import { AddStockComponent } from './gestion-stock/add-stock-form/add-stock.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GestionVentesModule } from './gestion-ventes/gestion-ventes.module';
import { GestionHistoriqueModule } from './gestion-historique/gestion-historique.module';
import { GestionStockModule } from './gestion-stock/gestion-stock.module';
import { ProfilComponent } from './profil/profil.component';
import { AddClientComponent } from './gestion-client/add-client/add-client.component';
import { ClientFormComponent } from './gestion-client/client-form/client-form.component';
import { ConfirmDeleteComponent } from './gestion-client/confirm-delete/confirm-delete.component';
import { ListClientComponent } from './gestion-client/list-client/list-client.component';
import { EditClientComponent } from './gestion-client/edit-client/edit-client.component';
import { CardPageVenteComponent } from './card-page-vente/card-page-vente.component';
import { addClientModalComponent } from './gestion-client/addClientModal/addClientModal.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    ContainerCardsComponent,
    HeaderComponent,
    ProfileDropdownComponent,
    CardPageComponent,
    CardPageVenteComponent,
    AddStockComponent,
    PageNotFoundComponent,
    ProfilComponent,
    AddClientComponent,
    ClientFormComponent,
    ConfirmDeleteComponent,
    ListClientComponent,
    EditClientComponent,
    addClientModalComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    UserModule,
    ProductManagementModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GestionVentesModule,
    GestionHistoriqueModule,
    GestionStockModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
