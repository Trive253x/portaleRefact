import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RichiestaAssistenzaPage } from './richiesta-assistenza.page';

const routes: Routes = [
  {
    path: '',
    component: RichiestaAssistenzaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RichiestaAssistenzaPageRoutingModule {}
