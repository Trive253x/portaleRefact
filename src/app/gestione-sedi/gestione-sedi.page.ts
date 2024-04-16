import { Component, OnInit } from '@angular/core';
import { ElencoSediService } from '../services/elencoSedi.service';
import { ModalController } from '@ionic/angular';
import { AggiungiSedePage } from '../aggiungi-sede/aggiungi-sede.page'; 
interface Sede {
  Codice_cliente: string;
  Codice_sede: string;
  Sede: string;
  
  // Aggiungi qui altre proprietà del cliente se necessario
}
@Component({
  selector: 'app-gestione-sedi',
  templateUrl: './gestione-sedi.page.html',
  styleUrls: ['./gestione-sedi.page.scss'],
})
export class GestioneSediPage implements OnInit {
  sedi: Sede[] = [];
  searchTerm = '';
  sedi2: Sede[] = []; // I tuoi dati sede
  constructor(
    private elencoSediService: ElencoSediService,
    private modalController: ModalController
  ) { }
  filterSedi() {
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();

    this.sedi = this.sedi2.filter(sede =>
      sede.Codice_sede.toLowerCase().includes(lowerCaseSearchTerm) ||
      sede.Sede.toLowerCase().includes(lowerCaseSearchTerm) ||
      sede.Codice_cliente.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }
  ngOnInit() {
    this.getElencoSedi();
  }

  async getElencoSedi() {
    (await this.elencoSediService.getElencoSedi()).subscribe((response: Sede[]) => {
      this.sedi = response;
      this.sedi2 = response; // Aggiungi questa linea
    }, error => {
      // gestisci l'errore qui
    });
  }
  async creaSede() {
    console.log('Il metodo creaCliente è stato chiamato');
    const modal = await this.modalController.create({
      component: AggiungiSedePage
    });
  
    return await modal.present(); // Presenta il modal
  }
}
