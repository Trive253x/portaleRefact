import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificaRichiestaPage } from './modifica-richiesta.page';

const routes: Routes = [
  {
    path: '',
    component: ModificaRichiestaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificaRichiestaPageRoutingModule {}
