import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class PermessoGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
    ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const permesso = this.userService.getTipoUtente();
    if (permesso.includes('1')) {
      return true;
    } else {
      this.router.navigate(['/']); // reindirizza alla pagina di login o a un'altra pagina
      return false;
    }
  }
}