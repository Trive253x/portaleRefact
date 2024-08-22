import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiUrl + 'login/getCodSede.php?sede=';
  apiUrl1 = environment.apiUrl + 'login/getSedeName.php?codiceSede=';
  
  constructor(private http: HttpClient) { }
  permesso: string = '';
  codiceSede: string = '';
  setID(ID: any) {
    localStorage.setItem('ID', ID);
  }
  getID(): string {
    return localStorage.getItem('ID')||'';
  }
  
  setCodiceCliente(customerCode: string) {
    localStorage.setItem('codiceCliente', customerCode);
  }

  getCodiceCliente(): string {
    return localStorage.getItem('codiceCliente')||'';
  }
  
  getSede(): string {
    return localStorage.getItem('sede')||'';
  }

  setUsername(username: string): void {
    localStorage.setItem('username', username);
  }

  setIdAtlante(idAtlante: any) {
    localStorage.setItem('idAtlante', idAtlante);
  }
  
  getUsername(): string {
    return localStorage.getItem('username')||'';
  }
  clearUsername(): void {
    localStorage.removeItem('username');
    localStorage.removeItem('sede');
    localStorage.removeItem('permesso');
    localStorage.removeItem('codiceCliente');
    localStorage.removeItem('codiceSede');
    localStorage.removeItem('ID');
  }
  
  setTipoUtente(permessi: string[]): void {
    if (!permessi) {
      console.warn('Tentativo di impostare permessi a undefined o null');
      return;
    }
    console.log('Imposto i permessi a', permessi);
    localStorage.setItem('permessi', JSON.stringify(permessi));
  }
  
  getTipoUtente(): string[] {
    const permessi = localStorage.getItem('permessi');
    return permessi && permessi !== 'undefined' ? JSON.parse(permessi) : [];
  }
  
  getSedeCode(sede: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${sede}`).pipe(
      map((response: any) => response['Codice_sede'])
    );
  }
  
  fetchSedeCode(sede: string): void {
    this.getSedeCode(sede).subscribe(codice => {
      this.codiceSede = codice;
      localStorage.setItem('codiceSede', codice);
    });
  }
  
  getSedeName(codiceSede: string): Observable<any> {
    return this.http.get(`${this.apiUrl1}${codiceSede}`).pipe(
      map((response: any) => response['Sede'])
    );
  }
}