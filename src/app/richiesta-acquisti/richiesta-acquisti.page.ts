import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AssistenzaService } from '../services/ric.service';
import { Router } from '@angular/router';
import { AcquistoService } from '../services/ricAcquisto.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-richiesta-acquisti',
  templateUrl: './richiesta-acquisti.page.html',
  styleUrls: ['./richiesta-acquisti.page.scss'],
})
export class RichiestaAcquistiPage implements OnInit {
  sedi: any;
  descrizione: string = '';
  username: string = '';
  sede: string = '';
  isSedeDisabled: boolean = false;
  permessi: string[] = [];

  constructor(
    private userService: UserService, 
    private assistenzaService: AssistenzaService,
    private router: Router,
    private acquistoservice: AcquistoService
  ) { }

  ngOnInit() {
    this.permessi = this.userService.getTipoUtente();
    this.username = this.userService.getUsername();
    this.sede = this.userService.getSede() || ''; // Retrieve the sede from localStorage
    let permessi = this.userService.getTipoUtente();
    if (permessi.includes('1') || permessi.includes('2')) {
      // Ottieni tutte le sedi di tutti i codici clienti o per il codice clienti dell'utente
      this.assistenzaService.getSediClienti().then((observable: Observable<any>) => {
        observable.subscribe((response: any) => {
          this.isSedeDisabled = false;
          console.log(response);
          this.sedi = response;
        });
      });
    } else if (permessi.includes('3') || permessi.includes('4') || permessi.includes('5')) {
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


  inviaAcquisto() {
    this.acquistoservice.inviaAcquisto(this.sede, this.descrizione).subscribe(response => {
      // Handle the server response
      console.log(response);
      this.router.navigateByUrl('/elenco-acquisti');
    });
  }
}
