import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificaAssetPageRoutingModule } from './modifica-asset-routing.module';

import { ModificaAssetPage } from './modifica-asset.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificaAssetPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModificaAssetPage]
})
export class ModificaAssetPageModule {}
