import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AggiungiClientePage } from './aggiungi-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: AggiungiClientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AggiungiClientePageRoutingModule {}
