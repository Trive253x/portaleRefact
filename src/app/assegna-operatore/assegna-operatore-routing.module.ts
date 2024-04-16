import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssegnaOperatorePage } from './assegna-operatore.page';

const routes: Routes = [
  {
    path: '',
    component: AssegnaOperatorePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssegnaOperatorePageRoutingModule {}
