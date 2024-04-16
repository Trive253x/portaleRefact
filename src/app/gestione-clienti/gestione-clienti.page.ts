import { Component, OnInit } from '@angular/core';
import { ElencoClientiService } from '../services/elencoClienti.service';
import { AggiungiClientePage } from '../aggiungi-cliente/aggiungi-cliente.page'; // Assicurati che il percorso sia corretto
import { ModalController } from '@ionic/angular';

interface Cliente {
  Codice_cliente: string;
  Ragione_sociale: string;
  PIVA: string;
  Codice_fiscale: string;
  // Aggiungi qui altre proprietà del cliente se necessario
}
@Component({
  selector: 'app-gestione-clienti',
  templateUrl: './gestione-clienti.page.html',
  styleUrls: ['./gestione-clienti.page.scss'],
})
export class GestioneClientiPage implements OnInit {
  clienti: Cliente[] = []; // Aggiungi questa linea
  searchTerm = '';
  clienti2: Cliente[] = []; // I tuoi dati cliente

  constructor(
    private elencoClientiService: ElencoClientiService,
    private modalController: ModalController
  ) { }
  filterClienti() {
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();

    this.clienti = this.clienti2.filter(cliente =>
      cliente.Codice_cliente.toLowerCase().includes(lowerCaseSearchTerm) ||
      cliente.Ragione_sociale.toLowerCase().includes(lowerCaseSearchTerm) ||
      cliente.PIVA.toLowerCase().includes(lowerCaseSearchTerm) ||
      cliente.Codice_fiscale.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }
  ngOnInit() {
    this.getElencoClienti();
  }

  async getElencoClienti() {
    (await this.elencoClientiService.getClienti()).subscribe((response: Cliente[]) => {
      this.clienti = response;
      this.clienti2 = response; // Aggiungi questa linea
    }, error => {
      // gestisci l'errore qui
    });
  }

  async creaCliente() {
    console.log('Il metodo creaCliente è stato chiamato');
    const modal = await this.modalController.create({
      component: AggiungiClientePage // Usa il tuo componente qui
    });
  
    return await modal.present(); // Presenta il modal
  }
  
}