import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ModalController, NavParams } from '@ionic/angular';
import { PermessiService } from '../services/permessi.service';
import { GestioneUtentiService } from '../services/gestioneUtenti.service';
import { ToastController } from '@ionic/angular';
import { ElencoUtentiService } from '../services/elencoUtenti';


@Component({
  selector: 'app-aggiungi-utente',
  templateUrl: './aggiungi-utente.page.html',
  styleUrls: ['./aggiungi-utente.page.scss'],
})
export class AggiungiUtentePage implements OnInit {
  form!: FormGroup;
  sedi!: string[];
  ruoli!: string[];

  constructor(
    private permessiService: PermessiService,
    private modalController: ModalController, 
    private navParams: NavParams, 
    private navController: NavController,
    private gestioneUtentiService: GestioneUtentiService,
    private toastController: ToastController,
    private elencoUtentiService: ElencoUtentiService
    ) { }

  ngOnInit() {
    console.log(this.navParams.data);
      this.sedi = this.navParams.get('sedi');
      this.ruoli = this.navParams.get('ruoli');
  
      this.form = new FormGroup({
        nomeUtente: new FormControl('', Validators.required),
        Utente: new FormControl('', Validators.required),
        Password: new FormControl('', Validators.required),
        Ruolo: new FormControl([], Validators.required),
        sede: new FormControl('', Validators.required)
      });
    }

  async onSubmit() {
    console.log(this.form.value);
    if (this.form.valid) {
      console.log(this.form.value);
      this.gestioneUtentiService.creaUtente(this.form.value).subscribe(async response => {
        // Handle the server response
        const toast = await this.toastController.create({
          message: 'Utente aggiunto con successo.',
          duration: 2000
        });
        toast.present();
        this.dismissModal();
      });
    }else{
      console.log("Form non valido");
    }
  }
  
  async dismissModal() {
    await this.modalController.dismiss();
    this.navController.navigateBack('/gestione-utenti');
  }
}
