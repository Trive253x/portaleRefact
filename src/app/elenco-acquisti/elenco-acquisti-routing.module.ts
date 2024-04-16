import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElencoAcquistiPage } from './elenco-acquisti.page';

const routes: Routes = [
  {
    path: '',
    component: ElencoAcquistiPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElencoAcquistiPageRoutingModule {}
