import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { ContainerCardsComponent } from './container-cards/container-cards.component';
import { ProduitsComponent } from './gestion-produit/produits/produits.component';

const routes: Routes = [
  {path: 'connexion', component:ConnexionComponent},
  {path: 'menu', component:ContainerCardsComponent},
  {path: 'produits', component:ProduitsComponent},
  {path: '', redirectTo:'connexion',pathMatch:'full'},
  {path: '**', component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
