import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AggiungiSediService {
  private url = environment.apiUrl + 'Amministrazione/aggiungiSede.php'; // sostituisci con l'URL del tuo endpoint
  private MAXCodiceSede = environment.apiUrl + 'Amministrazione/getMAXCodiceSede.php';
  constructor(private http: HttpClient) { } // inietta HttpClient nel costruttore
  
 async getMAXCodiceSede(): Promise<Observable<any>> {
          const codiceCliente = localStorage.getItem('codiceCliente') || '';
      let params = new HttpParams();
          params = params.append('codiceCliente', codiceCliente);
        return this.http.post(this.MAXCodiceSede, params.toString());
     }

  insertIntoDatabase(data: any): Observable<any> {
    return this.http.post(this.url, data); // esegue una richiesta POST all'endpoint
  }
}