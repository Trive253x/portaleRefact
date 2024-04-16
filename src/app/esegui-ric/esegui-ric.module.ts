import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EseguiRicPageRoutingModule } from './esegui-ric-routing.module';

import { EseguiRicPage } from './esegui-ric.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EseguiRicPageRoutingModule,
  ],
  declarations: [EseguiRicPage]
})
export class EseguiRicPageModule {}
