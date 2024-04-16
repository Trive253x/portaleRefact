import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms'; // Importa FormBuilder, FormGroup e Validators
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { FormControl } from '@angular/forms';
import { AggiungiSediService } from '../services/aggiungiSede.service';
import { AlertController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-aggiungi-sede',
  templateUrl: './aggiungi-sede.page.html',
  styleUrls: ['./aggiungi-sede.page.scss'],
})
export class AggiungiSedePage implements OnInit {
  sedeForm: FormGroup = this.formBuilder.group({});
  sede: any;
  cliente: any;
  constructor(
    private formBuilder: FormBuilder,
    private navController: NavController,
    private modalController: ModalController,
    private aggiungiSediService: AggiungiSediService,
    private alertController: AlertController,
    private userService: UserService
  ) { this.sede = '';} // Inietta FormBuilder nel costruttore
  ngOnInit() {
    this.initializeForm();
    this.codiceSede();
  }
  async codiceSede() {
    if (this.userService.getTipoUtente().includes('2')) {
      console.log('sono un utente di tipo 2');
      (await this.aggiungiSediService.getMAXCodiceSede()).subscribe(sede => {
        console.log(sede);
        if (sede.length > 0) {
          let codice_sede = sede[0].Codice_sede;
          let parts = codice_sede.split('-'); // Split the codice_sede into parts
          let prefix = parts[0]; // Get the prefix part
          let num = parseInt(parts[1]); // Get the numeric part
      
          if (!isNaN(num) && num < 999) {
            num++; // Increment the number
            this.sede = prefix + '-' + ("000" + num).slice(-3); // Join the parts back together
            this.initializeForm();
          }
        }
      });
    } else {
      console.log('sono un utente di tipo 1');
      this.sede = '';
      this.cliente = '';
      this.initializeForm();
    }
  }
  
  initializeForm() {
    this.cliente = localStorage.getItem('codiceCliente');
    this.sedeForm = this.formBuilder.group({
      Codice_sede: [this.sede],
      Sede: ['' ],
      Codice_cliente: [this.cliente]
    });
  }
  onCancel() {
    this.modalController.dismiss();
  }
  async showError(error: any) {
    const alert = await this.alertController.create({
      header: 'Errore',
      message: 'Errore durante l\'inserimento nel database: ' + error,
      buttons: ['OK']
    });
  }
  async dismissModal() {
    await this.modalController.dismiss();
    this.navController.navigateBack('/gestione-sedi');
  }
  onSubmit() {
    if (this.sedeForm.valid) {
      this.aggiungiSediService.insertIntoDatabase(this.sedeForm.value)
        .subscribe(
          response => {
            if (response.success) {
              console.log('Inserimento nel database riuscito');
              this.dismissModal();
            } else {
              this.showError(response.error);
            }
          },
          error => {
            this.showError(error);
          }
        );
    }
  }

}
