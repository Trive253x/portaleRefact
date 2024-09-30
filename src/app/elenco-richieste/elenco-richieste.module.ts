import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgPipesModule } from 'ngx-pipes';
import { IonicModule } from '@ionic/angular';
import { PopUpRichiesteInfoModule } from '../pop-up-richieste-info/pop-up-richieste-info.module';
import { ElencoRichiestePageRoutingModule } from './elenco-richieste-routing.module';


import { ElencoRichiestePage } from './elenco-richieste.page';
import { PopUpImageModule } from '../pop-up-image/pop-up-image.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElencoRichiestePageRoutingModule,
    PopUpImageModule,
    PopUpRichiesteInfoModule,
    NgxPaginationModule,
    NgPipesModule
  ],
  declarations: [ElencoRichiestePage]
})
export class ElencoRichiestePageModule {}
