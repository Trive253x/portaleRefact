import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificaUtentePage } from './modifica-utente.page';

const routes: Routes = [
  {
    path: '',
    component: ModificaUtentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificaUtentePageRoutingModule {}
