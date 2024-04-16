import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class AggiungiClientiService {
  api = environment.apiUrl + 'Amministrazione/aggiungiCliente.php';
  constructor(private http: HttpClient) { } // inietta HttpClient nel costruttore

  insertIntoDatabase(data: any): Observable<any> {
    return this.http.post(this.api, data); // esegue una richiesta POST all'endpoint
  }
}