import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AggiungiUtentePageRoutingModule } from './aggiungi-utente-routing.module';

import { AggiungiUtentePage } from './aggiungi-utente.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AggiungiUtentePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AggiungiUtentePage]
})
export class AggiungiUtentePageModule {}
