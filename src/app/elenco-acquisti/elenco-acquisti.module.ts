import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElencoAcquistiPageRoutingModule } from './elenco-acquisti-routing.module';

import { ElencoAcquistiPage } from './elenco-acquisti.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElencoAcquistiPageRoutingModule
  ],
  declarations: [ElencoAcquistiPage]
})
export class ElencoAcquistiPageModule {}
