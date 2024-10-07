import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AtlanteService } from '../services/atlante.service';
import { AssistenzaService } from '../services/ric.service';

@Component({
  selector: 'app-calendar-modal',
  templateUrl: './esegui-ric.page.html',
  styleUrls: ['./esegui-ric.page.scss']
})
export class EseguiRicPage implements OnInit {
  @Input() selectedDate: string = '';
  @Input() startTime: string = '';
  @Input() endTime: string = '';
  @Input() note: string = '';
  @Input() idUtente: string = '';
  @Input() idRichiesta: string = '';
  @Input() idCommessa: string = '';
  @Input() idTipoAttivita: string = '';
  @Input() idTipologiaAttivita: string = '';
  @Input() PTRegID: number = 0;
  @Input() PTRegAddrID: number = 0;
  @Input() PTRegAddrLocID: number = 0;
  @Input() PTRegAddrCntID: number = 0;
  @Input() PTRegCntBookID: number = 0;
  @Input() oggetto: string = '';
  @Input() sedeAtlante: string = '';
  @Input() descrizione: string = '';
  @Input() IDAttivita: string = '';
  @Input() IDAzione: string = ''; 
  @Input() IDRilevazione: string = '';
  @Input() IDRichiestaAssegnata: number = 0;
  @Input() completed: number | boolean = 0;
  @Input() tipo: string = 'Rilevazione';

  tipoAttivita: any[] = [];
  tipoAttivitaFiltered: any[] = [];
  searchTerm: string = '';
  selectedTipoAttivita: any = null;
  showAutocomplete: boolean = false;
  
  tipologiaAttivita: any[] = [];
  tipologiaAttivitaFiltered: any[] = [];
  searchTermTipologia: string = '';
  selectedTipologiaAttivita: any = null;
  showAutocompleteTipologia: boolean = false;
  tipologiaAttivitaEnabled: boolean = false;
  disableMod: boolean = false;
  commesse: any[] = [];
  commesseFiltered: any[] = [];
  searchTermCommesse: string = '';
  selectedCommessa: any = null;
  showAutocompleteCommesse: boolean = false;

  sedi: any[] = [];
  sediFiltered: any[] = [];
  searchTermSede: string = '';
  selectedSede: any = null;
  showAutocompleteSede: boolean = false;

  constructor(
    private modalController: ModalController, private atlanteService: AtlanteService, 
    private assistenzaService: AssistenzaService
  ) { }

  ngOnInit() {
    console.log(this.startTime, this.endTime);
    this.disableMod = this.tipo === 'Rilevazione su attività' ? true : false;
    if (this.idRichiesta === '' || this.idRichiesta === null || this.idRichiesta === undefined || !this.idRichiesta) {
      this.assistenzaService.getSediWithAtlanteData().subscribe((data) => {
        this.sedi = data.map((item: any) => ({
          id: item.ID,
          codiceCliente: item.Codice_cliente,
          codiceSede: item.Codice_sede,
          PTRegID: item.PTRegID,
          PTRegAddrID: item.PTRegAddrID,
          PTRegAddrCntID: item.PTRegAddrCntID,
          PTRegAddrLocID: item.PTRegAddrLocID,
          PTRegCntBookID: item.PTRegCntBookID,
          sede: item.Sede,
          displayValue: `${item.Codice_sede} - ${item.Sede}`
        }));
        this.sediFiltered = [...this.sedi];
        if(this.sedeAtlante){
          this.selectedSede = this.sedi.find((item) => item.sede === this.sedeAtlante);
          if (this.selectedSede) {
            this.searchTermSede = this.selectedSede.displayValue;
            this.selectSede(this.selectedSede);
          }else{
            if(this.PTRegID){
              this.selectedSede = this.sedi.find((item) => item.PTRegID === this.PTRegID);
              if (this.selectedSede) {
                this.searchTermSede = this.selectedSede.displayValue;
                this.selectSede(this.selectedSede);
              }
            }
          }
        }
      });

     
        

      
    }

    

    this.atlanteService.getTipoAttivita().subscribe((data) => {
      this.tipoAttivita = data.map((item: { PTBRMActvTypeID: any; Code: any; Descr: any; }) => ({
        id: item.PTBRMActvTypeID,
        code: item.Code,
        description: item.Descr,
        displayValue: `${item.Code} - ${item.Descr}`
      }));
      this.tipoAttivitaFiltered = [...this.tipoAttivita];

      if (this.idTipoAttivita) {
        this.selectedTipoAttivita = this.tipoAttivita.find((item) => item.id === parseInt(this.idTipoAttivita));
        if (this.selectedTipoAttivita) {
          this.searchTerm = this.selectedTipoAttivita.displayValue;
          this.getTipologiaAttivita(this.selectedTipoAttivita);
        }
      }
    });

    this.atlanteService.getCommesse().subscribe((data) => {
      this.commesse = data.map((item: { PTPrjID: number; PrjCode: string; Descr: any; }) => ({
        id: item.PTPrjID,
        code: item.PrjCode,
        description: item.Descr,
        displayValue: `${item.PrjCode} - ${item.Descr}`
      }));
      this.commesseFiltered = [...this.commesse];
      console.log(this.idCommessa);
      if (this.idCommessa) {
        this.selectedCommessa = this.commesse.find((item) => item.id === parseInt(this.idCommessa));
        if (this.selectedCommessa) {
          this.searchTermCommesse = this.selectedCommessa.displayValue;
        }
      }
    });
  }

  filterSedi(event: any) {
    const searchTerm = event.detail.value.toLowerCase();
    if (searchTerm && searchTerm.trim() !== '') {
      this.sediFiltered = this.sedi.filter((item) => {
        return (
          item.codiceCliente.toLowerCase().includes(searchTerm) ||
          item.sede.toLowerCase().includes(searchTerm)
        );
      });
      this.showAutocompleteSede = true;
    } else {
      this.sediFiltered = [];
      this.showAutocompleteSede = false;
    }
  }

  selectSede(item: any) {
    this.selectedSede = item;
    console.log(this.selectedSede);
    this.searchTermSede = item.displayValue;
    this.sediFiltered = []; // Nascondi la lista una volta selezionato un elemento
    this.showAutocompleteSede = false;

    // Assign values to the corresponding variables
    this.PTRegID = item.PTRegID;
    this.PTRegAddrID = item.PTRegAddrID;
    this.PTRegAddrLocID = item.PTRegAddrLocID;
    this.PTRegAddrCntID = item.PTRegAddrCntID;
    this.PTRegCntBookID = item.PTRegCntBookID;
  }

  clearSelectedSede() {
    this.selectedSede = null;
    this.searchTermSede = '';
    this.sediFiltered = [];
    this.showAutocompleteSede = false;
  }

  filterCommesse(event: any) {
    const searchTerm = event.detail.value.toLowerCase();
    if (searchTerm && searchTerm.trim() !== '') {
      this.commesseFiltered = this.commesse.filter((item) => {
        return (
          item.code.toLowerCase().includes(searchTerm) ||
          item.description.toLowerCase().includes(searchTerm)
        );
      });
      this.showAutocompleteCommesse = true;
    } else {
      this.commesseFiltered = [];
      this.showAutocompleteCommesse = false;
    }
  }

  onSearchSedeClick(event: any) {
    event.stopPropagation();
    this.showAutocompleteSede = true;
  }

  selectCommessa(item: any) {
    this.selectedCommessa = item;
    this.searchTermCommesse = item.displayValue;
    this.commesseFiltered = []; // Nascondi la lista una volta selezionato un elemento
    this.showAutocompleteCommesse = false;
  }

  clearSelectedCommessa() {
    this.selectedCommessa = null;
    this.searchTermCommesse = '';
    this.commesseFiltered = [];
    this.showAutocompleteCommesse = false;
  }

  onSearchCommesseClick(event: any) {
    event.stopPropagation();
    this.showAutocompleteCommesse = true;
  }

  

  filterTipoAttivita(event: any) {
    const searchTerm = event.detail.value.toLowerCase();
    if (searchTerm && searchTerm.trim() !== '') {
      this.tipoAttivitaFiltered = this.tipoAttivita.filter((item) => {
        return (
          item.code.toLowerCase().includes(searchTerm) ||
          item.description.toLowerCase().includes(searchTerm)
        );
      });
      this.showAutocomplete = true;
    } else {
      this.tipoAttivitaFiltered = [];
      this.showAutocomplete = false;
    }
  }

  selectTipoAttivita(item: any) {
    this.selectedTipoAttivita = item;
    this.searchTerm = item.displayValue;
    this.tipoAttivitaFiltered = []; // Nascondi la lista una volta selezionato un elemento
    this.showAutocomplete = false;
    this.getTipologiaAttivita(item);
  }

  getTipologiaAttivita(item: any) {
    this.atlanteService.getTipologiaAttivita(item.id).subscribe((data) => {
      this.tipologiaAttivitaEnabled = true;
      this.tipologiaAttivita = data.map((item: { PTBRMActvTypeTypeID: any; Code: any; Descr: any; SurveyTypeCode: string; PTBRMSurveyTypeID: number;
       }) => ({
        PTBRMSurveyTypeID: item.PTBRMSurveyTypeID,
        id: item.PTBRMActvTypeTypeID,
        code: item.SurveyTypeCode,
        description: item.Descr,
        displayValue: `${item.SurveyTypeCode} - ${item.Descr}`
      }));
      this.tipologiaAttivitaFiltered = [...this.tipologiaAttivita];
      if (this.idTipologiaAttivita){
        this.selectedTipologiaAttivita = this.tipologiaAttivita.find((item) => item.id === parseInt(this.idTipologiaAttivita));
        if(this.selectedTipologiaAttivita){
          this.searchTermTipologia = this.selectedTipologiaAttivita.displayValue; // Aggiorna il campo di ricerca
        }
      }
    });
  }

  clearSelectedTipoAttivita() {
    this.selectedTipoAttivita = null;
    this.searchTerm = '';
    this.tipoAttivitaFiltered = [];
    this.showAutocomplete = false;
    this.tipologiaAttivitaEnabled = false;
    this.selectedTipologiaAttivita = null;
    this.searchTermTipologia = '';
    this.tipologiaAttivitaFiltered = [];
    this.showAutocompleteTipologia = false;
  }

  filterTipologiaAttivita(event: any) {
    const searchTerm = event.detail.value.toLowerCase();
    if (searchTerm && searchTerm.trim() !== '') {
      this.tipologiaAttivitaFiltered = this.tipologiaAttivita.filter((item) => {
        return (
          item.code.toLowerCase().includes(searchTerm) ||
          item.description.toLowerCase().includes(searchTerm)
        );
      });
      this.showAutocompleteTipologia = true;
    } else {
      this.tipologiaAttivitaFiltered = [];
      this.showAutocompleteTipologia = false;
    }
  }

  selectTipologiaAttivita(item: any) {
    this.selectedTipologiaAttivita = item;
    this.searchTermTipologia = item.displayValue;
    this.tipologiaAttivitaFiltered = []; // Nascondi la lista una volta selezionato un elemento
    this.showAutocompleteTipologia = false;
  }

  clearSelectedTipologiaAttivita() {
    this.selectedTipologiaAttivita = null;
    this.searchTermTipologia = '';
    this.tipologiaAttivitaFiltered = [];
    this.showAutocompleteTipologia = false;
  }

  onSearchClick(event: any) {
    event.stopPropagation();
    this.showAutocomplete = true;
  }

  onSearchTipologiaClick(event: any) {
    event.stopPropagation();
    this.showAutocompleteTipologia = true;
  }

  onContentClick(event: any) {
    if (this.showAutocomplete) {
      this.searchTerm = '';
      this.tipoAttivitaFiltered = [];
      this.showAutocomplete = false;
    }
    if (this.showAutocompleteTipologia) {
      this.searchTermTipologia = '';
      this.tipologiaAttivitaFiltered = [];
      this.showAutocompleteTipologia = false;
    }
    if (this.showAutocompleteCommesse) {
      this.searchTermCommesse = '';
      this.commesseFiltered = [];
      this.showAutocompleteCommesse = false;
    }
  }

  onDateChange(event: any) {
    if (event.detail && event.detail.value) {
      this.selectedDate = formatDate(event.detail.value, 'dd/MM/yyyy', 'it-IT');
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }

  execute() {
    console.log(this.selectedTipologiaAttivita);
    console.log(this.descrizione);
    console.log(this.oggetto);
    if(this.completed === true || this.completed === 1){
      this.completed = 1;
    }else{
      this.completed = 0;
    }
    this.modalController.dismiss({
      'selectedDate': this.selectedDate,
      'startTime': this.startTime,
      'endTime': this.endTime,
      'note': this.note,
      'idUtente': this.idUtente,
      'idRichiesta': this.idRichiesta,
      'idCommessa': this.selectedCommessa.id,
      'idTipoAttivita': this.selectedTipoAttivita.id,
      'idTipologiaAttivita': this.selectedTipologiaAttivita.id,
      'PTRegID': this.PTRegID,
      'PTRegAddrID': this.PTRegAddrID,
      'PTRegAddrLocID': this.PTRegAddrLocID,
      'PTRegAddrCntID': this.PTRegAddrCntID,
      'PTRegCntBookID': this.PTRegCntBookID,
      'oggetto': this.oggetto !== '' ? this.oggetto : this.descrizione,
      'PTUserID': localStorage.getItem('idAtlante'),
      'sede': this.selectedSede?.sede ? this.selectedSede.sede : '',
      'descrizione': this.descrizione ?? this.oggetto,
      'IDAzione': this.IDAzione,
      'IDRilevazione': this.IDRilevazione,
      'IDAttivita': this.IDAttivita,
      'IDRichiestaAssegnata': this.IDRichiestaAssegnata,
      'PTBRMSurveyTypeID': this.selectedTipologiaAttivita.PTBRMSurveyTypeID,
      'completed': this.completed
    });
  }
}
