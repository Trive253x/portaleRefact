import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ElencoSediService {


  private Url = environment.apiUrl + 'Amministrazione/visualizzazioneSedi.php';

  constructor(
    private http: HttpClient,
    private userService: UserService
    ) { }

  async getElencoSedi(): Promise<Observable<any>> {
    const permesso =  this.userService.getTipoUtente() || [];
    const permessoString = permesso.join(',');
        const codiceCliente = localStorage.getItem('codiceCliente') || '';
    let params = new HttpParams();
        params = params.append('permesso', permessoString);
        params = params.append('codiceCliente', codiceCliente);
      return this.http.post(this.Url, params.toString());
   }
    async getSedi(): Promise<Observable<any>> {
      return this.http.get(this.Url);
  }
}