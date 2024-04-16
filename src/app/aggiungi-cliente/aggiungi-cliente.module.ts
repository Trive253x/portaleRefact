import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AggiungiClientePageRoutingModule } from './aggiungi-cliente-routing.module';

import { AggiungiClientePage } from './aggiungi-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AggiungiClientePageRoutingModule,
    ReactiveFormsModule 
  ],
  declarations: [AggiungiClientePage]
})
export class AggiungiClientePageModule {}
