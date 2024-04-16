import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificaAcquistoPageRoutingModule } from './modifica-acquisto-routing.module';

import { ModificaAcquistoPage } from './modifica-acquisto.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificaAcquistoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModificaAcquistoPage]
})
export class ModificaAcquistoPageModule {}
