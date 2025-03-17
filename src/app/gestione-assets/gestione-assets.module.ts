import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgPipesModule } from 'ngx-pipes';
import { GestioneAssetsPageRoutingModule } from './gestione-assets-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { GestioneAssetsPage } from './gestione-assets.page';
import { ReactiveFormsModule } from '@angular/forms';
import { GestioneAssetsService } from '../services/gestioneAssets.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestioneAssetsPageRoutingModule,
    ReactiveFormsModule,
    NgPipesModule,
    NgxPaginationModule
  ],
  providers: [GestioneAssetsService],
  declarations: [GestioneAssetsPage]
})
export class GestioneAssetsPageModule {}
