import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-setting',
  templateUrl: './popover-setting.component.html',
  styleUrls: ['./popover-setting.component.scss'],
})
export class PopoverContentComponent {
  @Input() activity: any;
  @Input() top: string = '0px';
  @Input() left: string = '0px';


  constructor(
    private popoverController: PopoverController,
  ) { }

  editActivity() {
    console.log('editActivity');  
    this.popoverController.dismiss('edit');
  }

  creaRilevazione() {
    console.log('creaRilevazione');
    this.popoverController.dismiss('creaRilevazione');
  }

  deleteActivity() {
    console.log('deleteActivity');
    this.popoverController.dismiss('delete');
  }
}