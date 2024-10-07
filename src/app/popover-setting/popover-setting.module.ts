import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverContentComponent } from './popover-setting.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [PopoverContentComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [PopoverContentComponent]
})
export class PopoverSettingModule { }
