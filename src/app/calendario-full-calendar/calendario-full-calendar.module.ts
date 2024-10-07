import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PopoverSettingModule } from '../popover-setting/popover-setting.module';
import { IonicModule } from '@ionic/angular';
import { EseguiRicPageModule } from '../esegui-ric/esegui-ric.module';
import { CalendarioFullCalendarPageRoutingModule } from './calendario-full-calendar-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarioFullCalendarPage } from './calendario-full-calendar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarioFullCalendarPageRoutingModule,
    FullCalendarModule,
    PopoverSettingModule,
    EseguiRicPageModule
  ],
  declarations: [CalendarioFullCalendarPage]
})
export class CalendarioFullCalendarPageModule {}
