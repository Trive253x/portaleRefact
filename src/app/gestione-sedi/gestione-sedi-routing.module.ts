import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestioneSediPage } from './gestione-sedi.page';

const routes: Routes = [
  {
    path: '',
    component: GestioneSediPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestioneSediPageRoutingModule {}
