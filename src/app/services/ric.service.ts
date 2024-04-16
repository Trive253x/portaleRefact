import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssistenzaService {

  url = environment.apiUrl + 'Assistenza/richiestaAssistenzaIonic.php';
  url2 = environment.apiUrl + 'Assistenza/inviaEmailRichiesta.php';
  url3 = environment.apiUrl + 'Assistenza/elencoSedi.php';

  constructor(
    private http: HttpClient,
    private userService: UserService
    ) { }

    async getSediClienti(): Promise<Observable<any>> {
      const permesso =  this.userService.getTipoUtente() || [];
      const permessoString = permesso.join(',');
      const codiceSede = localStorage.getItem('codiceSede') || '';
      const codiceCliente = localStorage.getItem('codiceCliente') || '';
      const ID = this.userService.getID() || '';
    
      let params = new HttpParams();
      params = params.append('permesso', permessoString);
      params = params.append('codiceSede', codiceSede);
      params = params.append('codiceCliente', codiceCliente);
      params = params.append('ID', ID);
      console.log(params.toString());
      const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      return this.http.post(this.url3, params.toString(), { headers });
}

inviaRichiesta(sede: string, nomePc: string, richiesta: string, file?: File): Observable<any> {
  const formData = new FormData();
  formData.append('sede', sede);
  formData.append('nomePc', nomePc);
  formData.append('richiesta', richiesta);
  formData.append('IDUtente', this.userService.getID() || '');

  // Aggiungi il file solo se è presente
  if (file) {
    formData.append('allegato', file, file.name);
  }

  // Non è necessario impostare l'header 'Content-Type', sarà settato automaticamente
  const options = {
    // headers possono essere omessi o includere headers supplementari se richiesti dal backend
  };


  const postRequest1 = this.http.post(this.url2, formData, options);
  const postRequest2 = this.http.post(this.url, formData, options);

  // forkJoin combinerà entrambe le richieste HTTP in un'unica Observable
  return forkJoin([postRequest1, postRequest2]);
}
}