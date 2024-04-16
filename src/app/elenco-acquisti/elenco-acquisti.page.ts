import { Component, OnInit } from '@angular/core';
import { ElencoAcquistiService } from '../services/elencoAcquisti.service';
import { AlertController } from '@ionic/angular'; // Importa AlertController
import { UserService } from '../services/user.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModificaAcquistoPage } from '../modifica-acquisto/modifica-acquisto.page'; // Adjust the import path as needed
//import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { AssistenzaService } from '../services/ric.service';
//import { mergeAll } from 'rxjs/operators';


@Component({
  selector: 'app-elenco-acquisti',
  templateUrl: './elenco-acquisti.page.html',
  styleUrls: ['./elenco-acquisti.page.scss'],
})
export class ElencoAcquistiPage implements OnInit {
  acquisti: any[] = [];
  permesso: string[] = [];
  searchTerm = '';
  acquisti2: any[] = [];
  constructor(
    //private router: Router,
    //private navController: NavController,
    private elencoAcquistiService: ElencoAcquistiService,
    private alertController: AlertController,
    private userService: UserService,
    private modalController: ModalController,
    private ricService: AssistenzaService
  ) { 
    this.permesso = this.userService.getTipoUtente();
  }

    ngOnInit() {
      this.loadData();
    }
    loadData() {
      this.elencoAcquistiService.getAcquisti().subscribe((response: any) => {
       
        this.acquisti = response;
        this.acquisti2 = response;
      }
      );
  
    }
  
  truncate(text: string, length: number): string {
    return text.length > length ? text.substring(0, length) + '...' : text;
  }
  async mostraRichiestaCompleta(acquisto: any) {
    const alert = await this.alertController.create({
      header: 'Descrizione completa',
      message: acquisto.Descrizione,
      buttons: ['OK']
    });
  
    await alert.present();
  }
  async modifica(acquisto: {nomeUtente: any; Sede: any; Descrizione: any; Stato: any; ID: any}) {
    (await this.ricService.getSediClienti()).subscribe(async (sedi) => {
      const modal = await this.modalController.create({
        component: ModificaAcquistoPage,
        componentProps: {
          ID : acquisto.ID,
          Utente: acquisto.nomeUtente,
          Sede: acquisto.Sede,
          Descrizione: acquisto.Descrizione,
          Stato: acquisto.Stato,
          sedi: sedi
        }
      });
      modal.onDidDismiss().then(() => {
        this.loadData(); // or whatever method you use to load the data
      });
      return await modal.present();
    });
  }
  
  async elimina(acquisto: any) {
    const alert = await this.alertController.create({
      header: 'Conferma',
      message: 'Sei sicuro di voler eliminare questa richiesta?',
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel'
        }, {
          text: 'Elimina',
          handler: async() => {
            this.elencoAcquistiService.delateAcquisto(acquisto);
            this.acquisti = this.acquisti.filter((item: any) => item.ID !== acquisto.ID);
            const alert = await this.alertController.create({
              header: 'Successo',
              message: 'Acquisto eliminata con successo',
              buttons: ['OK']
            });
            await alert.present();
          }
        }
      ]
    });
    

    await alert.present();
  }
  filterRichieste() {
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();

    this.acquisti = this.acquisti2.filter(acquisto =>
      acquisto.nomeUtente.toLowerCase().includes(lowerCaseSearchTerm) ||
      acquisto.Sede.toLowerCase().includes(lowerCaseSearchTerm)||
      acquisto.Descrizione.toLowerCase().includes(lowerCaseSearchTerm)||
      acquisto.Stato.toLowerCase().includes(lowerCaseSearchTerm)||
      acquisto.Data.toLowerCase().includes(lowerCaseSearchTerm)
      // Aggiungi qui altre proprietà di richiesta se necessario
    );
  }
  
  getColor(stato: string) {
    switch (stato) {
      case 'INVIATA':
        return 'gray';
        case 'RIFIUTATA':
          return 'red';
      case 'ACCETTATA':
        return 'green';
      default:
        return 'black';
    }
  }
}
