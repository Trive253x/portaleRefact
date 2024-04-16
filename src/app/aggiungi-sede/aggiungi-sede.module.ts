import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AggiungiSedePageRoutingModule } from './aggiungi-sede-routing.module';

import { AggiungiSedePage } from './aggiungi-sede.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AggiungiSedePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AggiungiSedePage]
})
export class AggiungiSedePageModule {}
