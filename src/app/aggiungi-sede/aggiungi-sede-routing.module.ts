import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AggiungiSedePage } from './aggiungi-sede.page';

const routes: Routes = [
  {
    path: '',
    component: AggiungiSedePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AggiungiSedePageRoutingModule {}
