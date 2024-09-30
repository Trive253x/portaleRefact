import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EseguiRicPageRoutingModule } from './esegui-ric-routing.module';

import { EseguiRicPage } from './esegui-ric.page';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';

registerLocaleData(localeIt, 'it');



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EseguiRicPageRoutingModule,
  ],
  declarations: [EseguiRicPage],
  providers: [{ provide: LOCALE_ID, useValue: 'it' }]
})
export class EseguiRicPageModule {}
