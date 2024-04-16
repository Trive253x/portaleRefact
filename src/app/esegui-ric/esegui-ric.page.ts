import { formatDate } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-calendar-modal',
  templateUrl: './esegui-ric.page.html',
})
export class EseguiRicPage{
  @Input() selectedDate: string = '';
  @Input() startTime: string = '';
  @Input() endTime: string = '';
  @Input() note: string = '';
  @Input() idUtente: string = '';
  @Input() idRichiesta: string = '';

  constructor(
    private modalController: ModalController
  ) {
  }
  onDateChange(event: any) {
    console.log(event);
    if (event.detail && event.detail.value) {
      this.selectedDate = formatDate(event.detail.value, 'dd/MM/yyyy', 'en-US');
    }
  }
  closeModal() {
    this.modalController.dismiss();
  }
  execute() {
    this.modalController.dismiss({
      'selectedDate': this.selectedDate,
      'startTime': this.startTime,
      'endTime': this.endTime,
      'note': this.note,
      'idUtente': this.idUtente,
      'idRichiesta': this.idRichiesta
    });
  }
}