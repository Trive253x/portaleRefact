import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificaAcquistoPage } from './modifica-acquisto.page';

const routes: Routes = [
  {
    path: '',
    component: ModificaAcquistoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificaAcquistoPageRoutingModule {}
