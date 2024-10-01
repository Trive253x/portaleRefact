import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ElencoClientiService {


  private Url = environment.apiUrl + 'Amministrazione/visualizzazioneClienti.php';
  private Url1 = environment.apiUrl + 'Amministrazione/elencoClienti.php';

  constructor(
    private http: HttpClient, 
    private userService: UserService
    ) { }
 async getElencoClienti(): Promise<Observable<any>> {
  const permesso =  this.userService.getTipoUtente() || [];
  const permessoString = permesso.join(',');
      const codiceCliente = localStorage.getItem('codiceCliente') || '';
  let params = new HttpParams();
      params = params.append('permesso', permessoString);
      params = params.append('codiceCliente', codiceCliente);
    return this.http.post(this.Url1, params.toString());
 }
  async getClienti(): Promise<Observable<any>> {
    return this.http.get(this.Url);
}

getCliente(RegCode: number): Observable<any> {
  return this.http.get<any>(environment.apiUrl + `Rilevazioni/getClienteInfo.php?RegCode=${RegCode}`);
}

}