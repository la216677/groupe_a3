import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ContainerCardsComponent } from './container-cards/container-cards.component';
import { ProduitsComponent } from './gestion-produit/produits/produits.component';
import { VentesComponent } from './gestion-ventes/ventes/ventes.component';
import { ConfirmCommandeComponent } from './gestion-ventes/confirm-commande/confirm-commande.component';
import { HistoSaleComponent } from './gestion-historique/histo-sale/histo-sale.component';
import { DetailSaleComponent } from './gestion-historique/detail-sale/detail-sale.component';

const routes: Routes = [
  { path: 'ventes', component: VentesComponent },
  { path: 'ventes/confirm/:id', component: ConfirmCommandeComponent },
  { path: 'historique', component: HistoSaleComponent },
  { path: 'historique/:id', component: DetailSaleComponent },
  { path: 'menu', component: ContainerCardsComponent },
  { path: 'produits', component: ProduitsComponent },
  { path: 'home', component: ContainerCardsComponent },
  { path: '', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)},
  { path: '**', component: PageNotFoundComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
