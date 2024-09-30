import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarioAttivitaPage } from './calendario-attivita.page';

const routes: Routes = [
  {
    path: '',
    component: CalendarioAttivitaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarioAttivitaPageRoutingModule {}
