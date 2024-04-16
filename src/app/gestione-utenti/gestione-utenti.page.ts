import { Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import { ElencoUtentiService } from '../services/elencoUtenti';
import { AlertController } from '@ionic/angular';
import { ModificaUtentePage } from '../modifica-utente/modifica-utente.page';
import { AssistenzaService } from '../services/ric.service';
import { ModalController } from '@ionic/angular';
import { AggiungiUtentePage } from '../aggiungi-utente/aggiungi-utente.page'; // Assicurati che il percorso sia corretto
import { forkJoin, of, switchMap } from 'rxjs'
import { PermessiService } from '../services/permessi.service';
import { GestioneUtentiService } from '../services/gestioneUtenti.service';
import { UserService } from '../services/user.service';
import { LoadingController } from '@ionic/angular';


@Pipe({name: 'password'})
export class PasswordPipe implements PipeTransform {
  transform(value: string): string {
    return '*'.repeat(value.length);
  }
}

interface Utente {
  Email: any;
  ID: number;
  nomeUtente: string;
  Utente: string;
  Password: string;
  Sede: string;
  Ruolo: string[];
}

@Component({
  selector: 'app-gestione-utenti',
  templateUrl: './gestione-utenti.page.html',
  styleUrls: ['./gestione-utenti.page.scss'],
})
export class GestioneUtentiPage implements OnInit {
  utenti: any;
  sedi: any;
  permessi: String[] = [];
  searchTerm = '';
  utenti2: Utente[] = []; // I tuoi dati utente
  filteredUtenti: Utente[] =[]; // Copia iniziale dei dati utente
  popoverController: any;
  utente: any;

  constructor(
    private permessiService: PermessiService,
    private modalController: ModalController,
    private elencoUtentiService: ElencoUtentiService,
    private alertController: AlertController,
    private gestioneUtentiService: GestioneUtentiService, 
    private ricService: AssistenzaService,
    private userService: UserService,
    private loadingController: LoadingController
    ) { }

    filterUsers() {
      const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
    
      this.utenti = this.utenti2.filter(utente =>
        utente.nomeUtente.toLowerCase().includes(lowerCaseSearchTerm) ||
        utente.Utente.toLowerCase().includes(lowerCaseSearchTerm) ||
        utente.Password.toLowerCase().includes(lowerCaseSearchTerm) ||
        utente.Sede.toLowerCase().includes(lowerCaseSearchTerm) ||
        (Array.isArray(utente.Ruolo) && utente.Ruolo.some(r => r.toLowerCase().includes(lowerCaseSearchTerm))) ||
        (utente.Email && utente.Email.toLowerCase().includes(lowerCaseSearchTerm))
      );
    }

    async ngOnInit() {
      const loading = await this.loadingController.create({
        spinner: 'bubbles', // scegli il tipo di spinner che preferisci
        cssClass: 'my-custom-loading-class', // personalizza il css dello spinner
      });
      await loading.present();
    
      this.permessi = await this.userService.getTipoUtente();
      console.log(this.permessi);
      this.gestioneUtentiService.utenteAggiunto.subscribe(async () => {
        if (this.gestioneUtentiService.utenteAggiunto.value !== null) {
          (await this.elencoUtentiService.getUtenti()).subscribe(data => {
            console.log(data);
            this.utenti = data;
            this.utenti2 = data; 
    
            loading.dismiss();
          });
        }
      });
    }

    async modifica(utente: { nomeUtente: any; Utente: any; Password: any; Sede: any; Ruolo: String[]; ID: any; Email: any }) {
      (await this.ricService.getSediClienti()).pipe(
        switchMap(async (sediObservable) => sediObservable),
        switchMap(sedi => forkJoin({
          sedi: of(sedi),
          ruoli: this.permessiService.getRuoli(this.userService.getTipoUtente())
        }))
      ).subscribe(async ({ sedi, ruoli }) => {
        const modal = await this.modalController.create({
          component: ModificaUtentePage,
          componentProps: {
            'ID': utente.ID,
            'nomeUtente': utente.nomeUtente,
            'Utente': utente.Utente,
            'Password': utente.Password,
            'Sede': utente.Sede,
            'Ruolo': utente.Ruolo,
            'sedi': sedi,
            'ruoli': ruoli,
            'Email':  utente.Email
          }
        });
    
        return await modal.present();
      });
    }
  //popup eliminazione utente
  async elimina(utente: any) {
  const alert = await this.alertController.create({
    header: 'Conferma',
    message: 'Sei sicuro di voler eliminare questo utente?',
    buttons: [
      {
        text: 'Annulla',
        role: 'cancel',
        cssClass: 'secondary',
      }, {
        text: 'OK',
        handler: () => {
          console.log(utente.ID);
          this.gestioneUtentiService.eliminaUtente(utente.ID).subscribe(response => {
            console.log(response);
            this.ngOnInit();
          });
        }
      }
    ]
  });

  await alert.present();
}

//popup aggiunta utente
async presentAddUserModal() {
  (await this.ricService.getSediClienti()).pipe(
    switchMap(async (sediObservable) => sediObservable),
    switchMap(sedi => forkJoin({
      sedi: of(sedi),
      ruoli: this.permessiService.getRuoli(this.userService.getTipoUtente())
    }))
  ).subscribe(async ({ sedi, ruoli }) => {
    const modal = await this.modalController.create({
      component: AggiungiUtentePage,
      componentProps: {
        'sedi': sedi,
        'ruoli': ruoli
      }
    });

    return await modal.present();
  });
}
  async showPopup(permessi: any) {
    const alert = await this.alertController.create({
      message: permessi.join(', '), // Show the sedi as a comma-separated list
      buttons: ['OK']
    });
    return await alert.present();
  }

}
