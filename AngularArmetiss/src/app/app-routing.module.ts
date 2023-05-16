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
import { ListProductComponent } from './gestion-stock/list-product/list-product.component';
import { AddStockComponent } from './gestion-stock/add-stock-form/add-stock.component';
import { HistoriqueStockComponent } from './gestion-stock/historique-stock/historique-stock.component';
import { AddClientComponent } from './gestion-client/add-client/add-client.component';
import { ClientFormComponent } from './gestion-client/client-form/client-form.component';
import { ConfirmDeleteComponent } from './gestion-client/confirm-delete/confirm-delete.component';
import { ListClientComponent } from './gestion-client/list-client/list-client.component';
import { EditClientComponent } from './gestion-client/edit-client/edit-client.component';
import { TicketComponent } from './gestion-ventes/ticket/ticket.component';
import { SettingComponent } from './setting/setting.component';

const routes: Routes = [
  { path: 'settings', component: SettingComponent, canActivate: [AuthentificattionGuard] },
  { path: 'ventes', component: VentesComponent, canActivate: [AuthentificattionGuard] },
  { path: 'ventes/confirm/:id/:idclient', component: ConfirmCommandeComponent, canActivate: [AuthentificattionGuard] },
  { path: 'historique', component: HistoSaleComponent, canActivate: [AuthentificattionGuard] },
  { path: 'historique/:id', component: DetailSaleComponent, canActivate: [AuthentificattionGuard] },
  { path: 'facture/:id/:idclient', component: TicketComponent, canActivate: [AuthentificattionGuard] },
  { path: 'menu', component: ContainerCardsComponent, canActivate: [AuthentificattionGuard] },
  { path: 'produits', component: ProduitsComponent, canActivate: [AuthentificattionGuard] },
  { path: 'profil', component: ProfilComponent, canActivate: [AuthentificattionGuard] },
  { path: 'gestionStock', component: ListProductComponent, canActivate: [AuthentificattionGuard] },
  { path: 'add-stock/:id', component: AddStockComponent, canActivate: [AuthentificattionGuard] },
  { path: 'home', component: ContainerCardsComponent, canActivate: [AuthentificattionGuard] },
  { path: 'user', component: ListUserComponent, canActivate: [AuthentificattionGuard] },
  { path: 'historique-stock/:id', component: HistoriqueStockComponent, canActivate: [AuthentificattionGuard]},
  { path: 'clients', component: ListClientComponent, canActivate: [AuthentificattionGuard]},
  { path: 'clients/add', component: AddClientComponent, canActivate: [AuthentificattionGuard]},
  { path: 'clients/edit/:id', component: EditClientComponent, canActivate: [AuthentificattionGuard]},
  { path: '', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)},
  { path: '**', component: PageNotFoundComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
