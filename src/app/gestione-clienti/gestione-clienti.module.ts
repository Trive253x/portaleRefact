import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestioneClientiPageRoutingModule } from './gestione-clienti-routing.module';

import { GestioneClientiPage } from './gestione-clienti.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestioneClientiPageRoutingModule
  ],
  declarations: [GestioneClientiPage]
})
export class GestioneClientiPageModule {}
