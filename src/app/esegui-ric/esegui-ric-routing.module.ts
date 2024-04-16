import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EseguiRicPage } from './esegui-ric.page';

const routes: Routes = [
  {
    path: '',
    component: EseguiRicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EseguiRicPageRoutingModule {}
