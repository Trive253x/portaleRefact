import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RichiesteService } from '../services/elencoRic.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modifica-richiesta',
  templateUrl: './modifica-richiesta.page.html',
  styleUrls: ['./modifica-richiesta.page.scss'],
})
export class ModificaRichiestaPage implements OnInit {
  richiesta: any;
  permesso: string[] = [];
  route: any;

  constructor(private router: Router, private userService: UserService, private alertController: AlertController, private richiesteService: RichiesteService) { }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    this.richiesta = (navigation && navigation.extras && navigation.extras.state && navigation.extras.state['richiesta']) ? navigation.extras.state['richiesta'] : {};
    this.permesso = this.userService.getTipoUtente();
    console.log(this.richiesta.Stato);
  }
  annulla() {
    this.router.navigateByUrl('/elenco-richieste');
  }
  async modifica(richiesta: any) {
    const alert = await this.alertController.create({
      header: 'Conferma',
      message: 'Sei sicuro di voler modificare questa richiesta?',
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
        }, {
          text: 'Conferma',
          handler: () => {
            this.richiesteService.updateRichiesta(richiesta);
            this.router.navigateByUrl('/elenco-richieste');
          }
        }
      ]
    });
  
    await alert.present();
  }
}
