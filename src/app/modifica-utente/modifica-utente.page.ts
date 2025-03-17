// modifica-utente.page.ts
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { GestioneUtentiService } from '../services/gestioneUtenti.service';
import { UserService } from '../services/user.service';
import { switchMap, forkJoin, of } from 'rxjs';

import { AssistenzaService } from '../services/ric.service';
import { PermessiService } from '../services/permessi.service';

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
  selector: 'app-modifica-utente',
  templateUrl: './modifica-utente.page.html',
  styleUrls: ['./modifica-utente.page.scss'],
})



export class ModificaUtentePage implements OnInit {
  utenti: any;
  sedi: any;
  permessi: String[] = [];
  searchTerm = '';
  utenti2: Utente[] = []; // I tuoi dati utente
  filteredUtenti: Utente[] =[]; // Copia iniziale dei dati utente
  popoverController: any;
  utente: any;
  ruoli!: string[];
  form = new FormGroup({});
  
  constructor(
    private permessiService: PermessiService,
    private modalController: ModalController, 
    private navParams: NavParams, 
    private navCtrl: NavController,
    private toastController: ToastController,
    private gestioneUtentiService: GestioneUtentiService,
    private fb: FormBuilder,
    private userService: UserService,
    private ricService: AssistenzaService,
    ) {
      this.form = this.fb.group({});
     }
    isDisabled(): boolean {
      return this.permessi.includes('5');
    }
    ngOnInit() {
      this.sedi = this.navParams.get('sedi');
      this.ruoli = this.navParams.get('ruoli');
      this.permessi = this.userService.getTipoUtente();
      
      this.form.addControl('ID', new FormControl(this.navParams.get('ID'), Validators.required));
            this.form.addControl('nomeUtente', new FormControl(this.navParams.get('nomeUtente'), Validators.required));
            this.form.addControl('Utente', new FormControl(this.navParams.get('Utente'), Validators.required));
            this.form.addControl('Password', new FormControl(this.navParams.get('Password'), Validators.required));
            this.form.addControl('Sede', new FormControl(this.navParams.get('Sede'), Validators.required));
            this.form.addControl('Email', new FormControl(this.navParams.get('Email'), this.emailValidator()));
            let Permesso = this.navParams.get('Ruolo');
      if (Array.isArray(Permesso)) {
        console.log('Permesso è un array:', Permesso);
        let array: any = [];
        Permesso.forEach((r) => {
          array.push(this.fb.control(r));
          
        });
        this.form.addControl('Permesso', this.fb.array(array));
      } else {
        console.error('Ruolo non è un array:', Permesso);
      }
    }

  async onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.gestioneUtentiService.modificaUtente(this.form.value).subscribe(async response => {
        // Handle the server response
        console.log(response);
        const toast = await this.toastController.create({
          message: 'Utente modificato con successo.',
          duration: 2000
        });
        toast.present();
        this.dismissModal();
      });
    }
  }
  
  async dismissModal() {
    await this.modalController.dismiss();
    this.navCtrl.navigateBack('/gestione-utenti');

  }
  onRoleChange(event: { detail: { value: any[]; }; }) {
    const formArray: FormArray = this.form.get('Permesso') as unknown as FormArray;
  
    // Clear the form array
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  
    // Add the selected roles to the form array
    event.detail.value.forEach(role => {
      formArray.push(new FormControl(role));
    });
  }
  
  isRoleSelected(role: string): boolean {
    const formArray: FormArray = this.form.get('Permesso') as unknown as FormArray;
    return formArray.value.includes(role);
  }

  emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const role: any[] = this.form.get('Permesso')?.value ?? [];
      if (Array.isArray(role) && role.length === 1 && role[0] === 'Utente Base') {
        return null; // no validation error
      } else {
        return Validators.required(control); // apply required validator
      }
    };
  }
}