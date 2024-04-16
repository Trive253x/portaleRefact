import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RichiestaAcquistiPage } from './richiesta-acquisti.page';

const routes: Routes = [
  {
    path: '',
    component: RichiestaAcquistiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RichiestaAcquistiPageRoutingModule {}
