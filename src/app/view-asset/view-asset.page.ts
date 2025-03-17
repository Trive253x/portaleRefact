import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { NavController, NavParams, ToastController, ModalController } from '@ionic/angular';
import { GestioneAssetsService } from '../services/gestioneAssets.service';
import { UserService } from '../services/user.service';
import { ElencoSediService } from '../services/elencoSedi.service';

@Component({
  selector: 'app-view-asset',
  templateUrl: './view-asset.page.html',
  styleUrls: ['./view-asset.page.scss'],
})
export class ViewAssetPage implements OnInit {
  assetForm: FormGroup = this.fb.group({});
  ruoli: any;
  
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
    this.initializeForm();
    this.loadInitialData();
    const asset = this.navParams.get('asset');
    console.log('asset:', asset.Utenti);
    // Inizializza il form con i valori dell'asset ricevuto
    this.assetForm = this.fb.group({
      idAsset: [asset?.idAsset || ''],
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
    this.ruoli = this.navParams.get('ruoli');
    (await this.elencoSediService.getElencoSedi()).subscribe();
  }
  // Getter per accedere facilmente al FormArray dei Servizi
  get serviziArray(): FormArray {
    return this.assetForm.get('Servizi') as FormArray;
  }


  async dismissModal(): Promise<void> {
    await this.modalController.dismiss();
    this.navCtrl.navigateBack('/elenco-richieste');
  }

  onCancel(): void {
    this.dismissModal();
  }
  
  private initializeForm(): void {
    this.assetForm = this.fb.group({
      Tipo: ['', Validators.required],
      nomeMacchina: ['', Validators.required],
      Processore: ['', Validators.required],
      Ram: ['', Validators.required],
      Archiviazione: ['', Validators.required],
      sistemaOperativo: ['', Validators.required],
      Antivirus: ['', Validators.required],
      Monitor: ['', Validators.required],
      Descrizione: ['', Validators.required],
      Vpn: ['', Validators.required],
      Altro: [''],
      Servizi: this.fb.array([])
    });
  }
}