import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarioFullCalendarPage } from './calendario-full-calendar.page';

const routes: Routes = [
  {
    path: '',
    component: CalendarioFullCalendarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarioFullCalendarPageRoutingModule {}
