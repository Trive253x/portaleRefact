import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IMieiRicPage } from './i-miei-ric.page';

const routes: Routes = [
  {
    path: '',
    component: IMieiRicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IMieiRicPageRoutingModule {}
