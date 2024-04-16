import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestioneUtentiPageRoutingModule } from './gestione-utenti-routing.module';

import { GestioneUtentiPage, PasswordPipe } from './gestione-utenti.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestioneUtentiPageRoutingModule,
  ],
  declarations: [
    GestioneUtentiPage, 
    PasswordPipe
  ],
  exports: [
    GestioneUtentiPage
  ]
})
export class GestioneUtentiPageModule {}
