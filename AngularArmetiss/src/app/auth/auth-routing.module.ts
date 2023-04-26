import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { DeconnexionComponent } from './deconnexion/deconnexion.component';

const routes: Routes = [

  {path : '', redirectTo : 'connexion', pathMatch : 'full'},
  {path : 'connexion', component : ConnexionComponent},
  {path : 'deconnexion', component : DeconnexionComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
