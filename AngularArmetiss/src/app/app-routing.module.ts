import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ContainerCardsComponent } from './container-cards/container-cards.component';
import { ProduitsComponent } from './gestion-produit/produits/produits.component';
import { VentesComponent } from './gestion-ventes/ventes/ventes.component';
import { ConfirmCommandeComponent } from './gestion-ventes/confirm-commande/confirm-commande.component';
import { HistoSaleComponent } from './gestion-historique/histo-sale/histo-sale.component';
import { DetailSaleComponent } from './gestion-historique/detail-sale/detail-sale.component';
import { AuthentificattionGuard } from '../app/auth/authentificattion.guard';
import { ListUserComponent } from './gestion-utilisateur/list-user/list-user.component';
import { ProfilComponent } from './profil/profil.component';

const routes: Routes = [
  { path: 'ventes', component: VentesComponent, canActivate: [AuthentificattionGuard] },
  { path: 'ventes/confirm/:id', component: ConfirmCommandeComponent, canActivate: [AuthentificattionGuard] },
  { path: 'historique', component: HistoSaleComponent, canActivate: [AuthentificattionGuard] },
  { path: 'historique/:id', component: DetailSaleComponent, canActivate: [AuthentificattionGuard] },
  { path: 'menu', component: ContainerCardsComponent, canActivate: [AuthentificattionGuard] },
  { path: 'produits', component: ProduitsComponent, canActivate: [AuthentificattionGuard] },
  { path: 'profil', component: ProfilComponent, canActivate: [AuthentificattionGuard] },
  { path: 'home', component: ContainerCardsComponent, canActivate: [AuthentificattionGuard] },
  { path: 'user', component: ListUserComponent, canActivate: [AuthentificattionGuard] },
  { path: '', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)},
  { path: '**', component: PageNotFoundComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
