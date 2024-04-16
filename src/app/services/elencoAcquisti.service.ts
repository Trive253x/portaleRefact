import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ElencoAcquistiService {
  private Url = environment.apiUrl + 'Acquisti/elencoAcquisti.php';
  private Url2 = environment.apiUrl + 'Acquisti/modificaAcquistiAdmin.php';
  private Url3 = environment.apiUrl + 'Acquisti/modificaAcquistiBase.php';
  private Url4 = environment.apiUrl + 'Acquisti/eliminaAcquisto.php';
  private Url5 = environment.apiUrl + 'Acquisti/elencoStati.php';

  acquisti: any[] = [];
  constructor(private http: HttpClient, private userService: UserService) { }

  getAcquisti(): Observable<any> {
    const permesso =  this.userService.getTipoUtente() || [];
    const permessoString = permesso.join(',');
    const codiceSede = localStorage.getItem('codiceSede') || '';
    const codiceCliente = localStorage.getItem('codiceCliente') || '';
    const ID = this.userService.getID() || '';
  
    let params = new HttpParams();
    params = params.append('permesso', permessoString);
    params = params.append('codiceSede', codiceSede);
    params = params.append('codiceCliente', codiceCliente);
    params = params.append('ID', this.userService.getID());
  
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    console.log(params.toString());
    return this.http.post(this.Url, params.toString(), { headers });
  }

  updateAcquisto(acquisti: any) {
    if (this.userService.getTipoUtente().includes('1')||this.userService.getTipoUtente().includes('6')) {
      console.log(acquisti);
      this.http.post(this.Url2, {
        id: acquisti.ID,
        sede: acquisti.sede,
        descrizione: acquisti.Descrizione,
        stato: acquisti.Stato
      }).subscribe(response => {
        console.log(response);
      }, error => {

        console.log(error);

      });
    } else {
      this.http.post(this.Url3, {
        id: acquisti.ID,
        sede: acquisti.sede,
        descrizione: acquisti.Descrizione,
      }).subscribe(response => {
        console.log(response);
      }, error => {

        console.log(error);

      });
    }
  }
  delateAcquisto(acquisti: any) {
    console.log(acquisti.ID);
    this.http.post(this.Url4,
    
    {
      id: acquisti.ID
    }).subscribe(response => {
      
    }, error => {
      console.log(error);
    });
  }
  getStati(): Observable<any[]> {
    return this.http.get<any[]>(this.Url5);
  }
  
  clearData() {
    this.acquisti = [];
  }
}