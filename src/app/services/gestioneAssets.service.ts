import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class GestioneAssetsService {
  private apiUrl = environment.apiUrl + 'Amministrazione/aggiungiAssets.php';
  private apiUrl2 = environment.apiUrl + 'Amministrazione/modificaAssets.php';
  private apiUrl3 = environment.apiUrl + 'Amministrazione/eliminaAssets.php';
  private apiUrl4 = environment.apiUrl + 'Amministrazione/visualizzazioneAssets.php';
  private apiUrl5 = environment.apiUrl + 'Amministrazione/visualizzazioneAssetsById.php';
  assetsAggiunto = new BehaviorSubject<void>(undefined);

  constructor(private http: HttpClient, private userService: UserService) { 
    this.getElencoAssets();
  }
  creaAssets(dati: any): Observable<any> {
    console.log(dati);
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post( this.apiUrl, dati, {headers: headers}).pipe(
      tap(() => this.assetsAggiunto.next())
    );
  }
  modificaAssets(dati: any): Observable<any> {
    console.log("dati:" + dati);
    const headers = {'Content-Type': 'application/json'};
    return this.http.post(this.apiUrl2, dati, {headers: headers}).pipe(
      tap(() => this.assetsAggiunto.next())
    );
  }
  eliminaAssets(id: number): Observable<any> {
    console.log(id);
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(this.apiUrl3, {idAsset: id});
  }
  async getElencoAssets(): Promise<Observable<any>> {
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

    return this.http.post(this.apiUrl4, params.toString(), { headers });
  }
  getAssetsById(id: number): Observable<any> {
    return this.http.post(this.apiUrl5, {idAsset: id});
  }
}
