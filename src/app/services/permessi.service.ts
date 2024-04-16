import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermessiService {
  apiUrl = environment.apiUrl + 'Amministrazione/getPermessi.php';
  constructor(private http: HttpClient) { }

  getRuoli(permesso: any[]): Observable<any> {
    console.log(permesso);
    const permessoString = JSON.stringify(permesso);
    const body = new HttpParams().set('permesso', permessoString);
    return this.http.post<any>(this.apiUrl, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }).pipe(
      catchError(error => {
        console.error('Error processing response:', error);
        return throwError(error);
      })
    );
  }
}