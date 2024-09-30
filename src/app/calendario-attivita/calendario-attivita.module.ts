import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { IonicModule } from '@ionic/angular';

import { CalendarioAttivitaPageRoutingModule } from './calendario-attivita-routing.module';

import { CalendarioAttivitaPage } from './calendario-attivita.page';
registerLocaleData(localeIt);
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarioAttivitaPageRoutingModule
  ],
  declarations: [CalendarioAttivitaPage],
  providers: [{ provide: LOCALE_ID, useValue: 'it' }]
})
export class CalendarioAttivitaPageModule {}
