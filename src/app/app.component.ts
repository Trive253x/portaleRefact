import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';
import { Event as NavigationEvent } from '@angular/router';
import { UserService } from './services/user.service';
import { RichiesteService } from './services/elencoRic.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  permesso: string[] = []; // Cambia la dichiarazione a number[]
  pageTitle = '';
  isLoginPage = false;
  codiceSede: string = '';
  showSubmenu: boolean = false;

  ngOnInit() {
    this.codiceSede = localStorage.getItem('codiceSede') ?? '';
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    public userService: UserService,
    private richiesteService: RichiesteService,
    private menu: MenuController
  ) {
    this.router.events.pipe(
      filter((event: NavigationEvent) => event instanceof NavigationEnd),
    ).subscribe((event: any) => {
      this.isLoginPage = event.urlAfterRedirects === '/login';
    });
    this.router.events.pipe(
      filter((event: NavigationEvent) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter(route => route.outlet === 'primary')
    ).subscribe(route => {
      const title = route.snapshot.data['title'];
      this.pageTitle = title;
      this.titleService.setTitle(title);
    });
    console.log('Permesso:', this.userService.getTipoUtente());
    this.permesso = this.userService.getTipoUtente(); // Rimuovi il tipo di dato
  }
  onLogin() {
    this.permesso = this.userService.getTipoUtente(); // Rimuovi il tipo di dato
    // Do other things that should happen after login
  }
  goHome() {
    this.router.navigate(['/home']);
    this.menu.close('first');
  }
  logout() {
    this.userService.clearUsername();
    this.richiesteService.clearData();
    localStorage.clear();
    location.reload();
    setTimeout(() => {
      location.reload();
    }, 1000);
  }
}