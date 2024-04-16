import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { GestioneUtentiService } from '../services/gestioneUtenti.service';
import { UserService } from '../services/user.service';
import { ElencoAcquistiService } from '../services/elencoAcquisti.service';

@Component({
  selector: 'app-modifica-acquisto',
  templateUrl: './modifica-acquisto.page.html',
  styleUrls: ['./modifica-acquisto.page.scss'],
})
export class ModificaAcquistoPage implements OnInit {
  sedi!: string[];
  stati: any[] = [];
  form = new FormGroup({});
  permessi = this.userService.getTipoUtente();
  @Output() modalDismissed = new EventEmitter<void>();
  constructor(
    private modalController: ModalController, 
    private navParams: NavParams, 
    private navCtrl: NavController,
    private toastController: ToastController,
    private gestioneUtentiService: GestioneUtentiService,
    private fb: FormBuilder,
    private userService: UserService,
    private elencoAcquistiService: ElencoAcquistiService
    ) {
      this.form = this.fb.group({});
     } 


  ngOnInit() {
    this.loadData();
  }

 loadData() {
  this.sedi = this.navParams.get('sedi');
    //console.log(this.sedi); // Log the sedi array
  
    this.permessi = this.userService.getTipoUtente();
    this.elencoAcquistiService.getStati().subscribe(stati => {
      this.stati = stati.map(stato => stato.Stato);
      //console.log(this.stati);
    });
    
    this.form.addControl('ID', new FormControl(this.navParams.get('ID'), Validators.required));
    this.form.addControl('Utente', new FormControl(this.navParams.get('Utente'), Validators.required));
    this.form.addControl('Descrizione', new FormControl(this.navParams.get('Descrizione'), Validators.required));
    this.form.addControl('Stato', new FormControl(this.navParams.get('Stato'), Validators.required));
    this.form.addControl('sede', new FormControl({value: this.navParams.get('Sede'), disabled: this.isDisabled()}, Validators.required));
  
}
    isDisabled(): boolean {
      return this.permessi.includes('5');
    }
    async onSubmit() {
      console.log(this.form.valid);
      if (this.form.valid) {
        //console.log(this.form.value); // Log the form values
        this.elencoAcquistiService.updateAcquisto(this.form.value);
        this.dismissModal();
        
      }
    }
    async dismissModal() {
      await this.modalController.dismiss();
      this.modalDismissed.emit();
    }
  }