import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoginService } from '../services/login.service';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  customerCode: string = '';
  office: string = '';
  permesso: string = '';

  ngOnInit() {
    // Resetta i campi del form ogni volta che il componente viene inizializzato
    this.username = '';
    this.password = '';
  }
  constructor(
    public navCtrl: NavController,
    private loginService: LoginService, // Inietta il servizio LoginService
    private userService: UserService,
    private alertController: AlertController,
    private toastController: ToastController,
    private appComponent: AppComponent
  ) { }

  login() {
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    console.log('Customer Code:', this.customerCode);
    this.loginService.login(this.username, this.password, this.customerCode).subscribe(
      data => {
        if (data.error) {
          // Mostra un messaggio di errore
          console.log('Invalid login credentials');
          this.presentToast('Credenziali di accesso non valide'); 
        } else {
          this.userService.setTipoUtente(data.permessi);
          this.showPopup(data.sede);
          this.appComponent.onLogin();
        }
      },
      error => {
        // Gestisci l'errore
        console.log('Error: ', error);
      }
    );
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'danger'
    });
    toast.present();
  }

  async showPopup(sedi: string[]) {
    if (sedi.length === 1) {
      const selectedSede = sedi[0];
      localStorage.setItem('sede', selectedSede);
      this.userService.fetchSedeCode(selectedSede);
      console.log('Sede selezionata:', localStorage.getItem('sede'));
      this.navCtrl.navigateForward('/home');
      return;
    }

    let selectedSede = ''; // Variable to hold the selected sede
  
    const alert = await this.alertController.create({
      header: 'Seleziona una sede',
      inputs: sedi.map(sede => ({
        name: 'sede',
        type: 'radio',
        label: sede,
        value: sede,
        handler: ({value}) => {
          selectedSede = value; // Save the selected value
        }
      })),
      buttons: [{
        text: 'OK',
        handler: () => {
          localStorage.setItem('sede', selectedSede); // Save the selected sede to localStorage
          this.userService.fetchSedeCode(selectedSede); // Fetch the sede code
          this.navCtrl.navigateForward('/home');
        }
      }]
    });
  
    await alert.present();
  }
}