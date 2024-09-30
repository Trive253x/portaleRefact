import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgPipesModule } from 'ngx-pipes';
import { IonicModule } from '@ionic/angular';

import { IMieiRicPageRoutingModule } from './i-miei-ric-routing.module';

import { IMieiRicPage } from './i-miei-ric.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IMieiRicPageRoutingModule,
    NgxPaginationModule,
    NgPipesModule
  ],
  declarations: [IMieiRicPage]
})
export class IMieiRicPageModule {}
