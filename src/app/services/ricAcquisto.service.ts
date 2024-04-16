import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcquistoService {
  

 url = environment.apiUrl + 'Acquisti/richiestaAcquisto.php';
 url2 = environment.apiUrl + 'Acquisti/inviaEmailAcquisto.php'

  constructor(
    private http: HttpClient,
    private userService: UserService
    ) { }


  inviaAcquisto(sede: string, descrizione: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('sede', sede);
    body.set('descrizione', descrizione);
    body.set('IDUtente', this.userService.getID() || '');

    const options = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };

    console.log('Sending:', body.toString());

    const postRequest1 = this.http.post(this.url, body.toString(), options);
    const postRequest2 = this.http.post(this.url2, body.toString(), options);

    return forkJoin([postRequest1, postRequest2]);
  }
}