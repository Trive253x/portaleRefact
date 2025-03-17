import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestioneAssetsPage } from './gestione-assets.page';

const routes: Routes = [
  {
    path: '',
    component: GestioneAssetsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestioneAssetsPageRoutingModule {}
