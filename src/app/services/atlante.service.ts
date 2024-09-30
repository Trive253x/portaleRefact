import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class AtlanteService {
  apiUrl = environment.apiUrl + 'Rilevazioni/'

  constructor(
    private http: HttpClient
  ) { }

  getTipoAttivita(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}getTipoAttivita.php`);
  }

  getTipologiaAttivita(TipologiaAttivitaID: number): Observable<any> {
    let params = new HttpParams();
        params = params.append('TipoInterventoID', TipologiaAttivitaID);
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      return this.http.post(this.apiUrl + 'getTipologiaAttivita.php', params.toString() , { headers });
  }

  getCommesse(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}getCommesse.php`);
  }

  createAttivita(data: any): Observable<any> {
    console.log(data);
    return this.http.post<any>(`${this.apiUrl}Attivita.php`, data);
  }

  createAction(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}Azione.php`, data);
  }

  createRilevazione(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}Rilevazione.php`, data);
  }

  getActivityForUser(idAtlante: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}getAttivitaUtente.php?idAtlante=${idAtlante}`);
  }
}
