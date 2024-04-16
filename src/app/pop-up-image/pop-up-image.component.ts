import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pop-up-image',
  templateUrl: './pop-up-image.component.html',
  styleUrls: ['./pop-up-image.component.scss'],
})
export class PopUpImageComponent  implements OnInit {
  @Input() image: string = '';
  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss();
  }


}
