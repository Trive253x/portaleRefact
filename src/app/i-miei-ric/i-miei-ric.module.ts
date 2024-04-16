import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IMieiRicPageRoutingModule } from './i-miei-ric-routing.module';

import { IMieiRicPage } from './i-miei-ric.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IMieiRicPageRoutingModule
  ],
  declarations: [IMieiRicPage]
})
export class IMieiRicPageModule {}
