import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RichiestaAssistenzaPageRoutingModule } from './richiesta-assistenza-routing.module';

import { RichiestaAssistenzaPage } from './richiesta-assistenza.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RichiestaAssistenzaPageRoutingModule
  ],
  declarations: [RichiestaAssistenzaPage]
})
export class RichiestaAssistenzaPageModule {}
