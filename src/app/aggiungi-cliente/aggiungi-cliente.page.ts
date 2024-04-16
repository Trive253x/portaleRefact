import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms'; // Importa FormBuilder, FormGroup e Validators
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { FormControl } from '@angular/forms';
import { AggiungiClientiService } from '../services/aggiungiCliente.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-aggiungi-cliente',
  templateUrl: './aggiungi-cliente.page.html',
  styleUrls: ['./aggiungi-cliente.page.scss'],
})
export class AggiungiClientePage implements OnInit {
  clienteForm: FormGroup = this.formBuilder.group({});

  constructor(
    private formBuilder: FormBuilder,
    private navController: NavController,
    private modalController: ModalController,
    private aggiungiClientiService: AggiungiClientiService,
    private alertController: AlertController
    ) { } // Inietta FormBuilder nel costruttore

    ngOnInit() {
      this.clienteForm = this.formBuilder.group({
        Codice_cliente: ['', [Validators.required, this.codiceClienteValidator]],
        Ragione_sociale: ['', [Validators.required, Validators.minLength(3)]],
        PIVA: ['', this.pivaValidator],
        Codice_fiscale: ['', this.codiceFiscaleValidator],
      });
    
      this.clienteForm.setValidators(this.atLeastOne('PIVA', 'Codice_fiscale') as ValidatorFn);
    }
    
    codiceClienteValidator(control: FormControl) {
      const value = control.value;
      const valid = /^C\d{6}$/.test(value);
      return valid ? null : { codiceCliente: true };
    }
    
    pivaValidator(control: FormControl) {
      const value = control.value;
      if (!value) {
        return null;
      }
      const valid = /^\d{11}$/.test(value);
      return valid ? null : { piva: true };
    }
    
    codiceFiscaleValidator(control: FormControl) {
      const value = control.value;
      if (!value) {
        return null;
      }
      if (/\D/.test(value)) {
        return value.length === 16 ? null : { codiceFiscale: true };
      } else {
        return value.length === 11 ? null : { codiceFiscale: true };
      }
    }
    
    atLeastOne(...fields: string[]) {
      return (group: FormGroup): ValidationErrors | null => {
        let valid = false;
        for (let field of fields) {
          const control = group.controls[field];
          if (control.value && !control.errors) {
            valid = true;
            break;
          }
        }
        return valid ? null : { atLeastOne: true };
      };
    }
  onCancel() {
    this.modalController.dismiss();
  }
  async dismissModal() {
    await this.modalController.dismiss();
    this.navController.navigateBack('/gestione-clienti');
  }
  async showError(error: any) {
    const alert = await this.alertController.create({
      header: 'Errore',
      message: 'Errore durante l\'inserimento nel database: ' + error,
      buttons: ['OK']
    });
  
    await alert.present();
  }
  onSubmit() {
    if (this.clienteForm.valid) {
      this.aggiungiClientiService.insertIntoDatabase(this.clienteForm.value)
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