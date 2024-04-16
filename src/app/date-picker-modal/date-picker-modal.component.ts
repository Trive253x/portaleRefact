import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-date-picker-modal',
  templateUrl: './date-picker-modal.component.html',
  styleUrls: ['./date-picker-modal.component.scss'],
})
export class DatePickerModalComponent {

  @Input() startDate: string = '';
  @Input() endDate: string = '';

  constructor(private modalController: ModalController) {}

  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true,
      'startDate': this.startDate,
      'endDate': this.endDate
    });
  }

confirm() {
  // Pass the start and end dates when dismissing the modal
  this.modalController.dismiss({
    'startDate': this.startDate,
    'endDate': this.endDate
  });
}
  
  reset() {
    this.startDate = '';
    this.endDate = '';
    this.dismissModal();
  }
}