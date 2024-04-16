import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RichiestaAcquistiPageRoutingModule } from './richiesta-acquisti-routing.module';

import { RichiestaAcquistiPage } from './richiesta-acquisti.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RichiestaAcquistiPageRoutingModule
  ],
  declarations: [RichiestaAcquistiPage]
})
export class RichiestaAcquistiPageModule {}
