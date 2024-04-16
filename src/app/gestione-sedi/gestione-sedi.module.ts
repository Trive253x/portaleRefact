import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestioneSediPageRoutingModule } from './gestione-sedi-routing.module';

import { GestioneSediPage } from './gestione-sedi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestioneSediPageRoutingModule
  ],
  declarations: [GestioneSediPage]
})
export class GestioneSediPageModule {}
