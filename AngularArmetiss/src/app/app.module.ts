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
import { AddStockComponent } from './gestion-produit/gestion-stock/add-stock-form/add-stock.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConnexionComponent } from './connexion/connexion.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ListProductComponent } from './list-product/list-product.component';

@NgModule({
  declarations: [
    AppComponent,
    ContainerCardsComponent,
    HeaderComponent,
    ProfileDropdownComponent,
    CardPageComponent,
    AddStockComponent,
    ConnexionComponent,
    PageNotFoundComponent,
    ListProductComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    UserModule,
    ProductManagementModule,
    AppRoutingModule,
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }