import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AggiungiAssetsPageRoutingModule } from './aggiungi-assets-routing.module';

import { AggiungiAssetsPage } from './aggiungi-assets.page';
import { ReactiveFormsModule } from '@angular/forms';
import { GestioneAssetsService } from '../services/gestioneAssets.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AggiungiAssetsPageRoutingModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [GestioneAssetsService],
  declarations: [AggiungiAssetsPage]
})
export class AggiungiAssetsPageModule {}
