import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pop-up-richieste-info',
  templateUrl: './pop-up-richieste-info.component.html',
  styleUrls: ['./pop-up-richieste-info.component.scss'],
})
export class PopUpRichiesteInfoComponent  implements OnInit {
@Input() richiesta: any;
@Input() richiestaOperatore: any;
  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  closeModal(){
    this.richiesta = null;
    this.modalController.dismiss();
  }

}
