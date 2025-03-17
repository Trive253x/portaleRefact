import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAssetPage } from './view-asset.page';

const routes: Routes = [
  {
    path: '',
    component: ViewAssetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewAssetPageRoutingModule {}
