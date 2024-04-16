import { Component, OnInit } from '@angular/core';
import { RichiesteService } from '../services/elencoRic.service';
import { AlertController } from '@ionic/angular'; // Importa AlertController
import { UserService } from '../services/user.service';
import { NavController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AssegnaOperatorePage } from '../assegna-operatore/assegna-operatore.page';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { PopUpImageComponent } from '../pop-up-image/pop-up-image.component';
import { PopUpRichiesteInfoComponent } from '../pop-up-richieste-info/pop-up-richieste-info.component';
import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-elenco-richieste',
  templateUrl: './elenco-richieste.page.html',
  styleUrls: ['./elenco-richieste.page.scss'],
})
export class ElencoRichiestePage implements OnInit {
  permesso: string[] = [];
  richieste: any[] = [];
  searchTerm = '';
  richieste2: any[] = []; // I tuoi dati richiesta
  selectedStato = '';

  imageUrl = environment.imageUrl;
  path = environment.path;
  richiestaOperatore: any[] = [];
  constructor(
    private router: Router, 
    private navController: NavController, 
    private richiesteService: RichiesteService, 
    private alertController: AlertController, 
    private userService: UserService,
    private modalController: ModalController,
    private sanitizer: DomSanitizer,
    private popoverController: PopoverController
    ) {
    this.permesso = this.userService.getTipoUtente();
   } // Inietta AlertController

   ngOnInit() {
    this.getRichieste();
    this.richiesteService.modalClosed.subscribe(() => {
      this.ngOnInit();
    });
  }
  getRichieste() {
    this.richiesteService.getRichieste().subscribe((response: any) => {
      this.richieste = response;
      this.richieste2 = response;
    }
    );
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

  modifica(richiesta: any) {
    this.router.navigateByUrl('/modifica-richiesta', { state: { richiesta: richiesta } });
  }

  async elimina(richiesta: any) {
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
            this.richiesteService.delateRichiesta(richiesta);
            this.richieste = this.richieste.filter((item: any) => item.ID !== richiesta.ID);
            const alert = await this.alertController.create({
              header: 'Successo',
              message: 'Richiesta eliminata con successo',
              buttons: ['OK']
            });
            await alert.present();
          }
        }
      ]
    });
    

    await alert.present();
  }

  async assegnaRichiesta(richiestaId: number) {
    const modal = await this.modalController.create({
      component: AssegnaOperatorePage,
      componentProps: {
        'richiestaId': richiestaId
      }
    });
    return await modal.present();
  }
  
  changeAutorizzazione(richiesta: any) {
    if(richiesta.Stato == 'DA AUTORIZZARE'){
      richiesta.Stato = 'AUTORIZZATA';
      this.richiesteService.updateStato(richiesta);
    }else if(richiesta.Stato == 'AUTORIZZATA'){
      richiesta.Stato = 'DA AUTORIZZARE';
      this.richiesteService.updateStato(richiesta);
    }
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

  filterByStato() {
    if (this.selectedStato === '') {
      this.richieste = this.richieste2;
    } else {
      this.richieste = this.richieste2.filter(richiesta => richiesta.Stato === this.selectedStato);
    }
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

  async infoRichiesta(richiesta: any){
    this.richiesteService.getRichiestaOperatoreInfo(richiesta.ID).subscribe(async (response: any) => {
      console.log(response);
      this.richiestaOperatore = response;
      const modal = await this.modalController.create({
        component: PopUpRichiesteInfoComponent,
        cssClass: 'modal-info',
        componentProps: {
          'richiesta': richiesta,
          'richiestaOperatore': this.richiestaOperatore
        }
      });
      this.richiestaOperatore = [];
      return await modal.present();
    });
  }
}