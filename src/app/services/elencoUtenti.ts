import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ElencoUtentiService {

  private Url = environment.apiUrl + 'Amministrazione/visualizzazioneUtenti.php';
  private UrlOperatori = environment.apiUrl + 'Assistenza/visualizzazioneOperatori.php';

  constructor(
    private http: HttpClient,
    private userService: UserService
    ) { }

    async getUtenti(): Promise<Observable<any>> {
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
    
      const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    
      return this.http.post(this.Url, params.toString(), { headers });
    }

    async getOperatori(): Promise<Observable<any>> {
      const codiceSede = localStorage.getItem('codiceSede') || '';
      const codiceCliente = localStorage.getItem('codiceCliente') || '';
      let params = new HttpParams();
      params = params.append('codiceSede', codiceSede);
      params = params.append('codiceCliente', codiceCliente);
      const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      return this.http.post(this.UrlOperatori, params.toString(), { headers });
  }
}