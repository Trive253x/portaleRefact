import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GestioneUtentiService {
  apiUrl = environment.apiUrl + 'Amministrazione/aggiungiUtente.php';
  apiUrl2 = environment.apiUrl + 'Amministrazione/modificaUtente.php';
  apiUrl3 = environment.apiUrl + 'Amministrazione/eliminaUtente.php';
  utenteAggiunto = new BehaviorSubject<void>(undefined); // Initialize utenteAggiunto as a new BehaviorSubject

  constructor(private http: HttpClient) { }

  creaUtente(dati: any): Observable<any> {
    console.log(dati);
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post( this.apiUrl, dati, {headers: headers}).pipe(
      tap(() => this.utenteAggiunto.next())
    );
  }
  modificaUtente(dati: any): Observable<any> {
    console.log(dati);
    const headers = {'Content-Type': 'application/json'};
    return this.http.post(this.apiUrl2, dati, {headers: headers}).pipe(
      tap(() => this.utenteAggiunto.next())
    );
}
  eliminaUtente(id: number): Observable<any> {
    console.log(id);
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(this.apiUrl3, {ID: id});
  }
}