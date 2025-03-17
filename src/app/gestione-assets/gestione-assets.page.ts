import { Component, HostListener, OnInit } from '@angular/core';
import { PermessiService } from '../services/permessi.service';
import { NavController, ToastController, ModalController } from '@ionic/angular';
import { GestioneAssetsService } from '../services/gestioneAssets.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AssistenzaService } from '../services/ric.service';
import { AlertController } from '@ionic/angular';
import { forkJoin, of, switchMap, lastValueFrom } from 'rxjs';
import { AggiungiAssetsPage } from '../aggiungi-assets/aggiungi-assets.page';
import { LoadingController } from '@ionic/angular';
import { ModificaUtentePage } from '../modifica-utente/modifica-utente.page';
import { ModificaAssetPage } from '../modifica-asset/modifica-asset.page';
import { AggiungiUtentePage } from '../aggiungi-utente/aggiungi-utente.page';
import { ElencoUtentiService } from '../services/elencoUtenti';
import { paginationLangIt } from '../translate/pagination-lang.it';

interface Assets {
  idAsset: any,
  Utenti: { id: number, name: string }[], 
  Sede: any,
  Tipo: any,
  nomeMacchina: any,
  Processore: any,
  Ram: any,
  Archiviazione: any,
  sistemaOperativo: any,
  Antivirus: any,
  Altro: any,
  Monitor: any,
  Vpn: any,
  Descrizione: any,
  Servizi: any
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
  selector: 'app-gestione-assets',
  templateUrl: './gestione-assets.page.html',
  styleUrls: ['./gestione-assets.page.scss'],
})
export class GestioneAssetsPage implements OnInit {
  assets: any;
  sedi: any;
  utenti: Utente[] = [];
  permessi: String[] = [];
  assets2: Assets[] = [];
  searchTerm = '';
  p: number = 1; // Current page number
  itemsPerPage: number = 10; // Default items per page

  constructor(
    private permessiService: PermessiService,
    private navCtrl: NavController,
    private toastController: ToastController,
    private GestioneAssetsService: GestioneAssetsService,
    private fb: FormBuilder,
    private userService: UserService,
    private ricService: AssistenzaService,
    private alertController: AlertController,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private elencoUtentiService: ElencoUtentiService
  ) { }

  async ngOnInit() {
    this.permessi = await this.userService.getTipoUtente();
    this.getElencoAssets();
    this.utenti = await lastValueFrom(await this.elencoUtentiService.getUtenti());
    const loading = await this.loadingController.create({
      spinner: 'bubbles', // scegli il tipo di spinner che preferisci
      cssClass: 'my-custom-loading-class', // personalizza il css dello spinner
    });
    await loading.present();
    this.GestioneAssetsService.assetsAggiunto.subscribe(async () => {
      if (this.GestioneAssetsService.assetsAggiunto.value !== null) {
        (await this.GestioneAssetsService.getElencoAssets()).subscribe(data => {
          console.log(data);
          this.assets = data;
          this.assets2 = data;

          loading.dismiss();
        });
      }
    });
  }

  async getElencoAssets() {
    (await this.GestioneAssetsService.getElencoAssets()).subscribe((response: Assets[]) => {
      this.assets = response;
      console.log("assets ", this.assets);
    }, error => {
      // gestisci l'errore qui
    });
  }
  async eliminaAsset(id: any) {
    (await this.GestioneAssetsService.eliminaAssets(id)).subscribe(async (response: any) => {
      this.getElencoAssets();

      const toast = await this.toastController.create({
        message: 'Asset eliminato con successo',
        duration: 2000
      });
      toast.present();
    }, async error => {
      const toast = await this.toastController.create({
        message: 'Errore durante l\'eliminazione dell\'asset',
        duration: 2000
      });
      toast.present();
    });
  }
  async confirmDeleteAsset(id: any) {
    const alert = await this.alertController.create({
      header: 'Conferma eliminazione',
      message: 'Sei sicuro di voler eliminare questo asset?',
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          handler: () => {
            console.log('Annulla');
          }
        }, {
          text: 'Conferma',
          handler: () => {
            this.eliminaAsset(id);
          }
        }
      ]
    });
    await alert.present();
  }
  async aggiungiAssetModal() {
    (await this.ricService.getSediClienti()).pipe(
      switchMap(async (sediObservable) => sediObservable),
      switchMap(sedi => forkJoin({
        sedi: of(sedi),
        ruoli: this.permessiService.getRuoli(this.userService.getTipoUtente())
      }))
    ).subscribe(async ({ sedi, ruoli }) => {
      const modal = await this.modalController.create({
        component: AggiungiAssetsPage,
        componentProps: {
          'sedi': sedi,
          'ruoli': ruoli,
          'utenti': this.utenti
        }
      });
      await modal.present();
    });
  }
  async modifica(asset: {
    idAsset: any,
    Utenti: any,   
    Sede: any,
    Tipo: any,
    nomeMacchina: any,
    Processore: any,
    Ram: any,
    Archiviazione: any,
    sistemaOperativo: any,
    Antivirus: any,
    Altro: any,
    Monitor: any,
    Vpn: any,
    Descrizione: any,
    Servizi: any
  }) {
    (await this.ricService.getSediClienti()).pipe(
      switchMap(async (sediObservable) => sediObservable),
      switchMap(sedi => forkJoin({
        sedi: of(sedi),
        ruoli: this.permessiService.getRuoli(this.userService.getTipoUtente())
      }))
    ).subscribe(async ({ sedi, ruoli }) => {
  
      const modal = await this.modalController.create({
        component: ModificaAssetPage,
        componentProps: {
          'utenti': this.utenti,
          'sedi': sedi,
          'ruoli': ruoli,
          'asset': {
            'idAsset': asset.idAsset,
            'Utenti': asset.Utenti,
            'Sede': asset.Sede,
            'Tipo': asset.Tipo,
            'nomeMacchina': asset.nomeMacchina,
            'Processore': asset.Processore,
            'Ram': asset.Ram,
            'Archiviazione': asset.Archiviazione,
            'sistemaOperativo': asset.sistemaOperativo,
            'Antivirus': asset.Antivirus,
            'Altro': asset.Altro,
            'Monitor': asset.Monitor,
            'Vpn': asset.Vpn,
            'Descrizione': asset.Descrizione,
            'Servizi': asset.Servizi,
            'sedi': sedi,
            'ruoli': ruoli
          }
        }
      });
  
      return await modal.present();
    });
  }
  filterAsset() {
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
    
    this.assets = this.assets2.filter(assetFilter =>
      assetFilter.nomeMacchina?.toLowerCase().includes(lowerCaseSearchTerm) ||
      assetFilter.Utenti?.some((utente: any) => utente.name.toLowerCase().includes(lowerCaseSearchTerm)) ||
      assetFilter.Tipo?.toLowerCase().includes(lowerCaseSearchTerm) ||
      assetFilter.Sede?.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }
  getLangLabels() {
    return paginationLangIt;
  }

   @HostListener('window:resize', ['$event'])
    onResize(event: any) {
      this.calculateItemsPerPage(); // Recalculate items per page on window resize
    }
  
    calculateItemsPerPage() {
      const vh = window.innerHeight; // Get the viewport height
      const itemHeight = 100; // Average height for each item row in pixels
      const headerFooterHeight = 150; // Adjust for header/footer height in pixels
      this.itemsPerPage = Math.floor((vh - headerFooterHeight) / itemHeight); // Calculate items per page
    }
    getUtentiNames(utenti: any[]): string {
      return utenti?.map(u => u.name)?.join(', ') || 'Nessun utente';
    }
}