import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RichiesteService {

  private Url = environment.apiUrl + 'Assistenza/elencoAssistenze.php';
  private Url1 = environment.apiUrl + 'Assistenza/modificaRichiestaAdmin.php';
  private Url2 = environment.apiUrl + 'Assistenza/modificaRichiestaBase.php';
  private Url3 = environment.apiUrl + 'Assistenza/eliminaRichiestaAdmin.php';
  private Url4 = environment.apiUrl + 'Assistenza/modificaStatoRichiesta.php';
  private Url5 = environment.apiUrl + 'Assistenza/visualizzaOperatoriRichiesta.php';
  private Url6 = environment.apiUrl + 'Assistenza/assegnaRichiesta.php';
  private Url7 = environment.apiUrl + 'Operatore/getRICOperatore.php';
  private Url8 = environment.apiUrl + 'Operatore/inizioRICOperatore.php';
  private Url9 = environment.apiUrl + 'Operatore/fineRICOperatore.php';
  private Url10 = environment.apiUrl + 'Operatore/modificaRic.php';
  private Url11 = environment.apiUrl + 'Operatore/getRic.php';
  private Url12 = environment.apiUrl + 'Operatore/getRichiestaOperatoreInfo.php';

  modalClosed = new EventEmitter<void>();
  richieste: any[] = [];
  permessi: string[] = [];
  codiceSede: string = '';
  codiceCliente: string = '';
  constructor(private http: HttpClient, private userService: UserService) { }

  getRichieste(): Observable<any> {
    const permesso =  this.userService.getTipoUtente() || [];
    const permessoString = permesso.join(',');
    const codiceSede = localStorage.getItem('codiceSede') || '';
    const codiceCliente = localStorage.getItem('codiceCliente') || '';
    const ID = this.userService.getID() || '';
  
    let params = new HttpParams();
    params = params.append('permesso', permessoString);
    params = params.append('codiceSede', codiceSede);
    params = params.append('codiceCliente', codiceCliente);
    params = params.append('ID', this.userService.getID());
  
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.Url, params.toString(), { headers });
  }


  updateRichiesta(richiesta: any) {
    if (this.userService.getTipoUtente().includes('1') || this.userService.getTipoUtente().includes('7')) {
      this.http.post(this.Url1, {
        id: richiesta.ID,
        sede: richiesta.Sede,
        nomePc: richiesta.NomePc,
        richiesta: richiesta.Richiesta,
        stato: richiesta.Stato
      }).subscribe(response => {
      }, error => {



      });
    } else {
      this.http.post(this.Url2, {
        id: richiesta.ID,
        sede: richiesta.Sede,
        nomePc: richiesta.NomePc,
        richiesta: richiesta.Richiesta,
      }).subscribe(response => {

      }, error => {

      });
    }
  }
  delateRichiesta(richiesta: any) {

    this.http.post(this.Url3,
    
    {
      id: richiesta.ID
    }).subscribe(response => {
      
    }, error => {

    });
  }
  clearData() {
    this.richieste = [];
  }

  updateStato(richiesta: any) {

    this.http.post(this.Url4, {
      id: richiesta.ID,
      stato: richiesta.Stato,
      sede: richiesta.Sede,
    }).subscribe(response => {

    }, error => {

    });
  }
  getSelectedOperatori(richiestaId: any): Observable<any> {
    return this.http.post(this.Url5, {
      idRichiesta: richiestaId
    });
  }
  assegnaRichiesta(richiesta: any, operatoriId: any[]): Observable<any> {

    return this.http.post(this.Url6, {
      idRichiesta: richiesta,
      idOperatori: operatoriId
    });
  }
  getRicOperatore(): Observable<any> {

    return this.http.post(this.Url7, {
      idOperatore: this.userService.getID()
    });
  }
  inizioRICOperatore(richiesta: any, dataTime: any): Observable<any> {
    let idUtente = this.userService.getID();

    return this.http.post(this.Url8, {
      idRichiesta: richiesta,
      idOperatore: idUtente,
      data: dataTime
    });
  }

  fineRICOperatore(richiesta: any, dataTime: any, note: string, tempMin: string): Observable<any> {
    let idUtente = this.userService.getID();

    return this.http.post(this.Url9, {
      idRichiesta: richiesta,
      idOperatore: idUtente,
      data: dataTime,
      note: note,
      tempMin: tempMin
    });
  }

  modificaRic(data: any): Observable<any> {
    let dataOraInizio = data.selectedDate + ' ' + data.startTime;
    let dataOraFine = data.selectedDate + ' ' + data.endTime;
    let note = data.note;
    let idOperatore = data.idUtente;
    let idRichiesta = data.idRichiesta;
    
    return this.http.post(this.Url10, {
      dataOraInizio: dataOraInizio,
      dataOraFine: dataOraFine,
      note: note,
      idOperatore: idOperatore,
      idRichiesta: idRichiesta
    });
  }

  getRic(idUtente: any , idRichiesta: any): Observable<any>{
    return this.http.post(this.Url11, {
      idOperatore: idUtente,
      idRichiesta: idRichiesta
    });
  }

  getFile(percorso: string){

    return this.http.get(environment.apiUrl + 'Assistenza/downloadFile.php?percorso=' + percorso, {responseType: 'blob'});
  }

  getRichiestaOperatoreInfo(idRichiesta: any): Observable<any> {
    return this.http.post(this.Url12, {
      idRichiesta: idRichiesta
    });
  }

}