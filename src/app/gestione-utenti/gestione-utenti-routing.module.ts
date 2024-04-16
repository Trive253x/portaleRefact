import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestioneUtentiPage } from './gestione-utenti.page';

const routes: Routes = [
  {
    path: '',
    component: GestioneUtentiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestioneUtentiPageRoutingModule {}
