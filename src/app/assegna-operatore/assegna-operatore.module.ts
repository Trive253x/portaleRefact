import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssegnaOperatorePageRoutingModule } from './assegna-operatore-routing.module';

import { AssegnaOperatorePage } from './assegna-operatore.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssegnaOperatorePageRoutingModule
  ],
  declarations: [AssegnaOperatorePage]
})
export class AssegnaOperatorePageModule {}
