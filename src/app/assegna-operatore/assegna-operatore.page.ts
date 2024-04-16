import { Component, OnInit } from '@angular/core';
import{ ElencoUtentiService } from '../services/elencoUtenti';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { RichiesteService } from '../services/elencoRic.service';
import { ToastController } from '@ionic/angular';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-assegna-operatore',
  templateUrl: './assegna-operatore.page.html',
  styleUrls: ['./assegna-operatore.page.scss'],
})
export class AssegnaOperatorePage implements OnInit {
  modalClosed = new EventEmitter<void>();
  richiestaId: any;
  operatori: any [] = [];
  selectedOperatori: any [] = [];
  constructor(
    private elencoUtentiService: ElencoUtentiService,
    private navParams: NavParams,
    private modalController: ModalController,
    private richiesteService: RichiesteService,
    public toastController: ToastController
  ) { }

  async ngOnInit() {
    this.richiestaId = this.navParams.get('richiestaId');
    console.log(this.richiestaId);
    (await this.elencoUtentiService.getOperatori()).subscribe((response: any) => {
      console.log(response);
      this.operatori = response;
    });
  
    this.richiesteService.getSelectedOperatori(this.richiestaId).subscribe((selectedOperatori: any[]) => {
      this.selectedOperatori = selectedOperatori;
  
      // Imposta la proprietà 'selected' di ogni operatore a true se l'operatore è nell'elenco degli operatori selezionati
      this.operatori.forEach(operatore => {
        if (this.selectedOperatori.find(selectedOperatore => selectedOperatore.ID === operatore.ID)) {
          operatore.selected = true;
        }
      });
    });
  }
  removeUser(operatore: any) {
    operatore.selected = false;
    this.operatori.push(operatore);
  
    // Rimuovi l'operatore dall'elenco degli operatori selezionati
    this.selectedOperatori = this.selectedOperatori.filter(op => op.nomeUtente !== operatore.nomeUtente);
  }
  updateSelectedOperatori(operatore: { selected: boolean; nomeUtente: any; }) {
    operatore.selected = true;
    this.selectedOperatori.push(operatore);
  
    // Rimuovi l'operatore dall'elenco degli operatori
    this.operatori = this.operatori.filter(op => op.nomeUtente !== operatore.nomeUtente);
  }

  conferma() {
    const operatoriId = this.selectedOperatori.map(operatore => operatore.ID);
 
    this.richiesteService.assegnaRichiesta(this.richiestaId, operatoriId).subscribe({
      next: async response => {
        const toast = this.toastController.create({
          message: 'Richiesta assegnata con successo',
          duration: 2000,
          color: 'success'
        });
        (await toast).present();
        this.modalController.dismiss();
        this.richiesteService.modalClosed.emit();
      },
      error: async error => {
        const toast = this.toastController.create({
          message: 'Errore durante l\'assegnazione della richiesta',
          duration: 2000,
          color: 'danger'
        });
        (await toast).present();
      }
    });
    this.modalController.dismiss();
    
    
  }
  
  annulla() {
    this.modalController.dismiss();
  }
  highlight(event: MouseEvent) {
    (event.target as HTMLElement).classList.add('highlight');
  }
  
  unhighlight(event: MouseEvent) {
    (event.target as HTMLElement).classList.remove('highlight');
  }
}
