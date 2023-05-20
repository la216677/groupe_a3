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
import { ListClientComponent } from './gestion-client/list-client/list-client.component';
import { EditClientComponent } from './gestion-client/edit-client/edit-client.component';
import { TicketComponent } from './gestion-ventes/ticket/ticket.component';
import { SettingComponent } from './setting/setting.component';
import { AllGestionComponent } from './all-gestion/all-gestion.component';
import { AdminGuard } from './admin.guard';
import { ResponsableGuard } from './responsable.guard';

const routes: Routes = [
  { path: 'gestion', component: AllGestionComponent, canActivate: [AuthentificattionGuard,AdminGuard] },
  { path: 'settings', component: SettingComponent, canActivate: [AuthentificattionGuard,AdminGuard] },
  { path: 'ventes', component: VentesComponent, canActivate: [AuthentificattionGuard] },
  { path: 'ventes/confirm/:id/:idclient', component: ConfirmCommandeComponent, canActivate: [AuthentificattionGuard] },
  { path: 'historique', component: HistoSaleComponent, canActivate: [AuthentificattionGuard] },
  { path: 'historique/:id', component: DetailSaleComponent, canActivate: [AuthentificattionGuard] },
  { path: 'facture/:id/:idclient', component: TicketComponent, canActivate: [AuthentificattionGuard] },
  { path: 'menu', component: ContainerCardsComponent, canActivate: [AuthentificattionGuard] },
  { path: 'produits', component: ProduitsComponent, canActivate: [AuthentificattionGuard,AdminGuard] },
  { path: 'profil', component: ProfilComponent, canActivate: [AuthentificattionGuard] },
  { path: 'gestionStock', component: ListProductComponent, canActivate: [AuthentificattionGuard,ResponsableGuard] },
  { path: 'add-stock/:id', component: AddStockComponent, canActivate: [AuthentificattionGuard,ResponsableGuard] },
  { path: 'home', component: ContainerCardsComponent, canActivate: [AuthentificattionGuard] },
  { path: 'user', component: ListUserComponent, canActivate: [AuthentificattionGuard,AdminGuard] },
  { path: 'historique-stock/:id', component: HistoriqueStockComponent, canActivate: [AuthentificattionGuard, ResponsableGuard]},
  { path: 'clients', component: ListClientComponent, canActivate: [AuthentificattionGuard,AdminGuard]},
  { path: 'clients/add', component: AddClientComponent, canActivate: [AuthentificattionGuard,AdminGuard]},
  { path: 'clients/edit/:id', component: EditClientComponent, canActivate: [AuthentificattionGuard,AdminGuard]},
  { path: '', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)},
  { path: '**', component: PageNotFoundComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
