import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificaUtentePageRoutingModule } from './modifica-utente-routing.module';

import { ModificaUtentePage } from './modifica-utente.page';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificaUtentePageRoutingModule,
    RouterModule.forChild([
  {
    path: '',
    component: ModificaUtentePage
  }
]),
ReactiveFormsModule
  ],
  declarations: [ModificaUtentePage]
})
export class ModificaUtentePageModule {}
