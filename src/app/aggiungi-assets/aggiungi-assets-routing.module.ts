import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AggiungiAssetsPage } from './aggiungi-assets.page';

const routes: Routes = [
  {
    path: '',
    component: AggiungiAssetsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AggiungiAssetsPageRoutingModule {}
