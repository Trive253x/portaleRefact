import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { NavController, NavParams, ToastController, ModalController } from '@ionic/angular';
import { GestioneAssetsService } from '../services/gestioneAssets.service';
import { UserService } from '../services/user.service';
import { ElencoSediService } from '../services/elencoSedi.service';

@Component({
  selector: 'app-aggiungi-assets',
  templateUrl: './aggiungi-assets.page.html',
  styleUrls: ['./aggiungi-assets.page.scss'],
})
export class AggiungiAssetsPage implements OnInit {
  sedi!: string[];
  ruoli!: string[];
  utenti!: any;
  utentiFiltrati: any;
  assetForm: FormGroup = this.fb.group({});

  constructor(
    private navParams: NavParams,
    private toastController: ToastController,
    private gestioneAssetsService: GestioneAssetsService,
    private fb: FormBuilder,
    private userService: UserService,
    private modalController: ModalController,
    private elencoSediService: ElencoSediService,
    private navCtrl: NavController
  ) {  }

  ngOnInit() {
    this.initializeForm();
    this.loadInitialData();
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

  private async loadInitialData(): Promise<void> {
    this.sedi = this.navParams.get('sedi');
    this.ruoli = this.navParams.get('ruoli');
    this.utenti = this.navParams.get('utenti');
    this.utentiFiltrati = this.utenti;
    (await this.elencoSediService.getElencoSedi()).subscribe();
  }
  filterUtenti(){
    console.log(this.utenti);
    console.log(this.assetForm.get('Sede')?.value);
    this.utentiFiltrati = this.utenti;
      this.utentiFiltrati = this.utentiFiltrati.filter((utente: any) => utente.Sede == this.assetForm.get('Sede')?.value);
  }
  // Gestione Permessi (FormArray)
  get permessiArray(): FormArray {
    return this.assetForm.get('Permesso') as FormArray;
  }

  onRoleChange(event: any): void {
    const selectedRoles: string[] = event.detail.value;
    this.permessiArray.clear();
    
    selectedRoles.forEach((role: string) => {
      this.permessiArray.push(this.fb.control(role));
    });
  }

  isRoleSelected(role: string): boolean {
    return this.permessiArray.value.includes(role);
  }

  // Gestione Servizi (FormArray)
  get serviziArray(): FormArray {
    return this.assetForm.get('Servizi') as FormArray;
  }

  addServizio(): void {
    this.serviziArray.push(this.createServizioGroup());
  }

  removeServizio(index: number): void {
    this.serviziArray.removeAt(index);
  }

  private createServizioGroup(): FormGroup {
    return this.fb.group({
      nomeServizio: ['', Validators.required],
      descrizioneServizio: ['', Validators.required],
      noteServizio: ['']
    });
  }

  // Submit del Form
  async onSubmit(): Promise<void> {
    if (this.assetForm.valid) {
      try {
        await this.gestioneAssetsService.creaAssets(this.assetForm.value).toPromise();
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
}