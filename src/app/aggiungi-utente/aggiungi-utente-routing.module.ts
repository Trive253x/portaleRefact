import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AggiungiUtentePage } from './aggiungi-utente.page';

const routes: Routes = [
  {
    path: '',
    component: AggiungiUtentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AggiungiUtentePageRoutingModule {}
