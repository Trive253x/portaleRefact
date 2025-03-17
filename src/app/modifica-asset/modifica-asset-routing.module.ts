import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificaAssetPage } from './modifica-asset.page';

const routes: Routes = [
  {
    path: '',
    component: ModificaAssetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificaAssetPageRoutingModule {}
