import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AssistenzaService } from '../services/ric.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { GestioneAssetsService } from '../services/gestioneAssets.service';

interface Assets{
  idAsset: any;
  Utenti: any;
  Sede: any;
  Tipo: any;
  nomeMacchina: any;
  Processore: any;
  Ram: any;
  Archiviazione: any;
  sistemaOperativo: any;
  Antivirus: any;
  Altro: any;
  Monitor: any;
  Vpn: any;
  Descrizione: any;
  Servizi: any;  
}

@Component({
  selector: 'app-richiesta-assistenza',
  templateUrl: './richiesta-assistenza.page.html',
  styleUrls: ['./richiesta-assistenza.page.scss'],
})

export class RichiestaAssistenzaPage implements OnInit {
  username: string = '';
  sede: string = '';
  idAsset: number = -1;
  richiesta: string = '';
  recapito: string = '';
  sedi: any;
  isSedeDisabled: boolean = false;
  permesso: string[] = [];
  file: File | undefined;
  fileName: string = '';
  assets: Assets[] = [];
 
  constructor(
    private userService: UserService, 
    private assistenzaService: AssistenzaService, 
    private router: Router,
    private loginService: LoginService,
    private GestioneAssetsService: GestioneAssetsService
    ) 
    { }

    inviaRichiesta() {

      // Create FormData object and append data
      const formData = new FormData();
      formData.append('sede', this.sede);
      formData.append('idAsset', this.idAsset.toString());
      formData.append('richiesta', this.richiesta);
      formData.append('recapito', this.recapito);
      console.log(this.sede);
      console.log(this.idAsset);
      console.log(this.richiesta);
      console.log(this.recapito);
    
      console.log(formData);
    
      // Append the file if it's present
      if (this.file) {
        formData.append('allegato', this.file, this.file.name);
      }
      console.log(formData);
      // Call the service method to send the request
      this.assistenzaService.inviaRichiesta(this.sede, this.idAsset, this.richiesta, this.file, this.recapito).subscribe(
       
          data => {
            if (data.error) {
              console.log(data);
            } else {
              console.log(data);
            }
          },
          error => {
            console.log(error);
          }
        );
        this.router.navigate(['/elenco-richieste']);
      }

  ngOnInit() {
    this.permesso = this.userService.getTipoUtente();
    this.username = this.userService.getUsername();
    this.sede = this.userService.getSede() || ''; // Retrieve the sede from localStorage
    let permessi = this.userService.getTipoUtente();
    this.getElencoAssets();

    
    if (permessi.includes('1') || permessi.includes('2')) {
      // Ottieni tutte le sedi di tutti i codici clienti o per il codice clienti dell'utente
      this.assistenzaService.getSediClienti().then((observable: Observable<any>) => {
        observable.subscribe((response: any) => {
        this.isSedeDisabled = false;
        console.log(response);
        this.sedi = response; // Store the sedi in the sedi array
      });
      });
    } else if (permessi.includes('3') || permessi.includes('4') || permessi.includes('5')) {
      // Non rendere il campo selezionabile e inserisci in automatico la sede
      this.userService.getSedeName(this.userService.getSede()).subscribe(sede => {
        console.log(sede); // Log the entire sede object
        this.sede = sede;
        this.sedi = [sede];
        this.isSedeDisabled = true;
      }, error => {
        console.error(error); // Log any errors
      });
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.file = file;
      this.fileName = file.name; // Memorizza il nome del file per visualizzarlo nell'interfaccia utente
    }
  }

  removeFile() {
    this.file = undefined;
    this.fileName = ''; // Resetta il nome del file
  }  
  async getElencoAssets() {
    (await this.GestioneAssetsService.getElencoAssets())
      .subscribe((response: Assets[]) => {
        this.assets = response;
  
        // Se c'è solo un asset, selezionalo
        if (this.assets.length === 1) {
          this.idAsset = this.assets[0].idAsset;
        }
      }, error => {
        console.error(error);
      });
  }
  
}