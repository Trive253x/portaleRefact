import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { NavController, NavParams, ToastController, ModalController } from '@ionic/angular';
import { GestioneAssetsService } from '../services/gestioneAssets.service';
import { UserService } from '../services/user.service';
import { ElencoSediService } from '../services/elencoSedi.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-modifica-asset',
  templateUrl: './modifica-asset.page.html',
  styleUrls: ['./modifica-asset.page.scss'],
})
export class ModificaAssetPage implements OnInit {
  assetForm: FormGroup = this.fb.group({});
  sedi: any;
  ruoli: any;
  utenti: any;
  utentiFiltrati: any;
  
  constructor(
    private fb: FormBuilder,
    private navParams: NavParams,
    private elencoSediService: ElencoSediService,
    private navCtrl: NavController,
    private modalController: ModalController,
    private userService: UserService,
    private toastController: ToastController,
    private gestioneAssetsService: GestioneAssetsService,

  ) { }
  
  ngOnInit() {
    this.loadInitialData();
    this.filterUtenti();
    this.initializeForm();
    const asset = this.navParams.get('asset');
    console.log('asset:', asset.Utenti);
    // Inizializza il form con i valori dell'asset ricevuto
    this.assetForm = this.fb.group({
      idAsset: [asset?.idAsset || ''],
      nomeUtente: [asset?.Utenti || []],
      Tipo: [asset?.Tipo || '', Validators.required],
      nomeMacchina: [asset?.nomeMacchina || '', Validators.required],
      Processore: [asset?.Processore || ''],
      Ram: [asset?.Ram || ''],
      Archiviazione: [asset?.Archiviazione || ''],
      sistemaOperativo: [asset?.sistemaOperativo || ''],
      Antivirus: [asset?.Antivirus || ''],
      Altro: [asset?.Altro || ''],
      Monitor: [asset?.Monitor || ''],
      Vpn: [asset?.Vpn || ''],
      Descrizione: [asset?.Descrizione || ''],
      Sede: [asset?.Sede || '', Validators.required],
      Servizi: this.fb.array(
        asset?.Servizi && asset.Servizi.length
          ? asset.Servizi.map((servizio: { nomeServizio: any; descrizioneServizio: any; noteServizio: any; }) => this.fb.group({
              nomeServizio: [servizio.nomeServizio || ''],
              descrizioneServizio: [servizio.descrizioneServizio || ''],
              noteServizio: [servizio.noteServizio || '']
            }))
          : []
      )
    });
  }

  private async loadInitialData(): Promise<void> {
    this.sedi = this.navParams.get('sedi');
    this.ruoli = this.navParams.get('ruoli');
    this.utenti = this.navParams.get('utenti');
    (await this.elencoSediService.getElencoSedi()).subscribe();
  }
  // Getter per accedere facilmente al FormArray dei Servizi
  get serviziArray(): FormArray {
    return this.assetForm.get('Servizi') as FormArray;
  }
  
  filterUtenti(){
    console.log(this.utenti);
    console.log(this.assetForm.get('Sede')?.value);
    this.utentiFiltrati = this.utenti;
      this.utentiFiltrati = this.utentiFiltrati.filter((utente: any) => utente.Sede == this.assetForm.get('Sede')?.value);
    console.log(this.utentiFiltrati);
  }
  
  // Aggiunge un nuovo gruppo per un servizio
  addServizio() {
    this.serviziArray.push(this.fb.group({
      nomeServizio: [''],
      descrizioneServizio: [''],
      noteServizio: ['']
    }));
  }

  // Rimuove il servizio in posizione i
  removeServizio(i: number) {
    this.serviziArray.removeAt(i);
  }

  // Gestione del submit del form
  async onSubmit() {
    if (this.assetForm.valid) {
      try {
        await this.gestioneAssetsService.modificaAssets(this.assetForm.value).toPromise();
        await this.showSuccessToast();
        this.dismissModal();
      } catch (error) {
        console.error('Errore durante il salvataggio:', error);
        await this.showErrorToast();
      }
    } else {
      await this.showValidationErrorToast();
    }
  }
  private async showSuccessToast(): Promise<void> {
    const toast = await this.toastController.create({
      message: 'Asset aggiunto con successo!',
      duration: 2000,
      color: 'success'
    });
    await toast.present();
  }

  private async showErrorToast(): Promise<void> {
    const toast = await this.toastController.create({
      message: 'Errore durante il salvataggio!',
      duration: 2000,
      color: 'danger'
    });
    await toast.present();
  }

  private async showValidationErrorToast(): Promise<void> {
    const toast = await this.toastController.create({
      message: 'Compila tutti i campi obbligatori!',
      duration: 2000,
      color: 'warning'
    });
    await toast.present();
  }

  async dismissModal(): Promise<void> {
    await this.modalController.dismiss();
    this.navCtrl.navigateBack('/gestione-assets');
  }

  onCancel(): void {
    this.dismissModal();
  }
  
  private initializeForm(): void {
    this.assetForm = this.fb.group({
      nomeUtente: [''],
      Tipo: ['', Validators.required],
      nomeMacchina: ['', Validators.required],
      Processore: ['', Validators.required],
      Ram: ['', Validators.required],
      Archiviazione: ['', Validators.required],
      sistemaOperativo: ['', Validators.required],
      Antivirus: ['', Validators.required],
      Monitor: ['', Validators.required],
      Descrizione: ['', Validators.required],
      Sede: ['', Validators.required],
      Vpn: ['', Validators.required],
      Altro: [''],
      Servizi: this.fb.array([])
    });
  }
}