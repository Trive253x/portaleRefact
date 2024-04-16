import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, AlertController, ModalController } from '@ionic/angular';
import { RichiesteService } from '../services/elencoRic.service';
import { UserService } from '../services/user.service';
import { EseguiRicPage } from '../esegui-ric/esegui-ric.page';
import { environment } from 'src/environments/environment';
import { PopUpImageComponent } from '../pop-up-image/pop-up-image.component';

@Component({
  selector: 'app-imiei-ric',
  templateUrl: './i-miei-ric.page.html',
  styleUrls: ['./i-miei-ric.page.scss'],
})
export class IMieiRicPage implements OnInit {
  richieste: any[] = [];
  searchTerm = '';
  richieste2: any[] = []; // I tuoi dati richiesta
  showCalendar = false;
selectedDate: string = '';
startTime: string = '';
endTime: string = '';
notes: string = '';
statoRichiesta = '';
imageUrl = environment.imageUrl;
path = environment.path;

  constructor(
    private router: Router, 
    private navController: NavController, 
    private richiesteService: RichiesteService, 
    private alertController: AlertController, 
    private userService: UserService,
    private modalController: ModalController
    ) {
   } // Inietta AlertController

   ngOnInit() {
    this.getRichieste();
    this.richiesteService.modalClosed.subscribe(() => {
      this.ngOnInit();
    });
  }
  getRichieste() {
    this.richiesteService.getRicOperatore().subscribe((response: any) => {
      console.log(response);
      this.richieste = response;
      this.richieste2 = response;
    }
    );
  }

 getStato(richiesta: any) {
    return richiesta;
  }

  onConfermaPressed() {
    this.getRichieste();
  }
  truncate(text: string, length: number): string {
    return text.length > length ? text.substring(0, length) + '...' : text;
  }
  async mostraRichiestaCompleta(richiesta: any) {
    const alert = await this.alertController.create({
      header: 'Richiesta completa',
      message: richiesta.Richiesta,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  filterRichieste() {
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();

    this.richieste = this.richieste2.filter(richiesta =>
      richiesta.nomeUtente.toLowerCase().includes(lowerCaseSearchTerm) ||
      richiesta.Richiesta.toLowerCase().includes(lowerCaseSearchTerm) ||
      richiesta.NomePc.toLowerCase().includes(lowerCaseSearchTerm) ||
      richiesta.Stato.toLowerCase().includes(lowerCaseSearchTerm) ||
      richiesta.Sede.toLowerCase().includes(lowerCaseSearchTerm) ||
      richiesta.Data.toLowerCase().includes(lowerCaseSearchTerm)
      // Aggiungi qui altre proprietà di richiesta se necessario
    );
  }

  
  getColor(stato: string) {
    switch (stato) {
      case 'RISOLTA':
        return 'green';
        case 'IN ELABORAZIONE':
          return '#DAA520';
      case 'DA AUTORIZZARE':
        return 'orange';
      case 'AUTORIZZATA':
        return 'darkblue';
      case 'INVIATA':
        return 'gray';
      default:
        return 'black';
    }
  }
  async openCalendar(richiesta: any) {
    console.log(richiesta);
    let selectedDate, startTime, endTime;
  
    if (richiesta.dataOraInizio) {
      let dataOraInizio = new Date(richiesta.dataOraInizio.date);
      selectedDate = dataOraInizio.toISOString().split('T')[0];
      startTime = dataOraInizio.toTimeString().split(' ')[0];
    } else {
      selectedDate = new Date().toISOString().split('T')[0];
      startTime = '';
    }
  
    if (richiesta.dataOraFine) {
      let dataOraFine = new Date(richiesta.dataOraFine.date);
      endTime = dataOraFine.toTimeString().split(' ')[0];
    } else {
      endTime = '';
    }
    console.log(startTime);
    console.log(endTime);
    console.log(richiesta.note);
    console.log(richiesta.IDUtente);
    const modal = await this.modalController.create({
      component: EseguiRicPage,
      componentProps: {
        'selectedDate': selectedDate,
        'startTime': startTime,
        'endTime': endTime,
        'note': richiesta.note,
        'idUtente': richiesta.IDUtente,
        'idRichiesta': richiesta.ID
      }
    });
  
    await modal.present();
  
    const { data } = await modal.onWillDismiss();
    if(data){
      this.richiesteService.modificaRic(data).subscribe((response: any) => {
        this.getRichieste();
      }
      );
    }
  }
  
  async iniziaRichiesta(richiesta: any) {
    // Ottieni la data e l'ora corrente
    const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0'); // months are 0-indexed in JavaScript
const day = String(now.getDate()).padStart(2, '0');
const hours = String(now.getHours()).padStart(2, '0');
const minutes = String(now.getMinutes()).padStart(2, '0');

const dateTime = `${year}-${day}-${month} ${hours}:${minutes}`;
  
    // Mostra un alert di conferma
    const alert = await this.alertController.create({
      header: 'Conferma',
      message: `Stai per iniziare la richiesta. Data e ora corrente: ${dateTime}. Vuoi procedere?`,
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Conferma',
          handler: () => {
            // Se l'utente conferma, salva la data e l'ora corrente
            this.saveCalendarInizio(richiesta, dateTime);
          }
        }
      ]
    });
  
    await alert.present();
  }
  
  async terminaRichiesta(richiesta: any) {
    // Ottieni la data e l'ora corrente
    const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0'); // months are 0-indexed in JavaScript
const day = String(now.getDate()).padStart(2, '0');
const hours = String(now.getHours()).padStart(2, '0');
const minutes = String(now.getMinutes()).padStart(2, '0');

const dateTime = `${year}-${day}-${month} ${hours}:${minutes}`;
    const dataOraInizio = new Date(richiesta.dataOraInizio.date);
    const diff = Math.abs(dataOraInizio.getTime() - now.getTime());
    const tempMin = Math.floor((diff / 1000) / 60).toString();
    // Mostra un alert con un campo di input per le note
    const alert = await this.alertController.create({
      header: 'Conferma',
      inputs: [
        {
          name: 'note',
          type: 'text',
          placeholder: 'Inserisci le note qui'
        }
      ],
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Conferma',
          handler: (alertData) => {
            // Se l'utente conferma, salva la data e l'ora corrente, le note e tempMin
            this.saveCalendarFine(richiesta, dateTime, alertData.note, tempMin);
          }
        }
      ]
    });
  
    await alert.present();
  }
  
  saveCalendarInizio(richiesta: any, dateTime: string) {
    this.richiesteService.inizioRICOperatore(richiesta.ID, dateTime).subscribe((response: any) => {
      console.log(response);
      this.getRichieste();
    }
    );

  }
  saveCalendarFine(richiesta: any, dateTime: string, note: string, tempMin: string) {
    this.richiesteService.fineRICOperatore(richiesta.ID, dateTime, note, tempMin).subscribe((response: any) => {
      console.log(response);
      this.getRichieste();
    }
    );

  }

  openAllegato(percorso: string) {
    const extension = percorso.split('.').pop() || '';
    let path = percorso.replace(this.path, this.imageUrl);
    console.log(path);
  
    if (['jpg', 'jpeg', 'png', 'gif', 'PNG'].includes(extension)) {
      this.PopUpImage(path);
    } else {
      // Per i file non immagine, utilizza direttamente l'URL senza DomSanitizer
      const link = document.createElement('a');
      document.body.appendChild(link); // Aggiungi al DOM per assicurare il funzionamento
      link.href = path;
      link.download = path.split('/').pop() || 'downloaded_file'; // Imposta un nome file di default
      link.click();
      document.body.removeChild(link); // Rimuovi dopo il click
    }
  }

  async PopUpImage(path: string) {
    const modal = await this.modalController.create({
      component: PopUpImageComponent,
      cssClass: 'modal-photo',
      componentProps: {
        'image': path
      }
    });
    return await modal.present();
  }
}

