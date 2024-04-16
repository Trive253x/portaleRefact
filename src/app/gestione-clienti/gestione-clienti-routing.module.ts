import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestioneClientiPage } from './gestione-clienti.page';

const routes: Routes = [
  {
    path: '',
    component: GestioneClientiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestioneClientiPageRoutingModule {}
