import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { UserService } from './user.service';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = environment.apiUrl + 'login/loginIonic.php';

  constructor(private http: HttpClient, private userService: UserService) { } // UserService iniettato qui

  login(username: string, password: string, customerCode: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    body.set('customerCode', customerCode);
  
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
  
    this.userService.setUsername(username);
    this.userService.setCodiceCliente(customerCode);
  
    console.log('Sending:', body.toString());
    return this.http.post(this.url, body.toString(), options).pipe(
      tap((data: any) => {
        if (data && data.permessi && data.ID) {
          console.log('ID:', data.ID);
          this.userService.setTipoUtente(data.permessi); // Imposta permesso nel localStorage
          this.userService.setID(data.ID); // Imposta ID nel localStorage
          console.log('ID', this.userService.getID());
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Server response:', error.error.text);
        throw error;
      })
    );
  }
}