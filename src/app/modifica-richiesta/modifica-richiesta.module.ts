import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificaRichiestaPageRoutingModule } from './modifica-richiesta-routing.module';

import { ModificaRichiestaPage } from './modifica-richiesta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificaRichiestaPageRoutingModule
  ],
  declarations: [ModificaRichiestaPage]
})
export class ModificaRichiestaPageModule {}
