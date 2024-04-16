import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/authGuard.service'; 
import { GestioneClientiPage } from './gestione-clienti/gestione-clienti.page';
import { PermessoGuard } from './guards/permesso.guard'; // aggiusta il percorso se necessario


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'gestione-clienti',
    component: GestioneClientiPage,
    canActivate: [PermessoGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    data: { title: 'Login' } 
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard], 
    data: { title: 'Home' } 
  },
  {
    path: 'richiesta-assistenza',
    loadChildren: () => import('./richiesta-assistenza/richiesta-assistenza.module').then( m => m.RichiestaAssistenzaPageModule),
    canActivate: [AuthGuard], 
    data: { title: 'Richiesta Assistenza' } 
  },
  {
    path: 'elenco-richieste',
    loadChildren: () => import('./elenco-richieste/elenco-richieste.module').then( m => m.ElencoRichiestePageModule),
    canActivate: [AuthGuard], 
    data: { title: 'Elenco Richieste' } 
  },
  {
    path: 'richiesta-acquisti',
    loadChildren: () => import('./richiesta-acquisti/richiesta-acquisti.module').then( m => m.RichiestaAcquistiPageModule),
    canActivate: [AuthGuard], 
    data: { title: 'Richiesta Acquisti' }
  },
  {
    path: 'elenco-acquisti',
    loadChildren: () => import('./elenco-acquisti/elenco-acquisti.module').then( m => m.ElencoAcquistiPageModule),
    canActivate: [AuthGuard], 
    data: { title: 'Elenco Acquisti' } 
  },
  {
    path: 'modifica-richiesta',
    loadChildren: () => import('./modifica-richiesta/modifica-richiesta.module').then( m => m.ModificaRichiestaPageModule),
    canActivate: [AuthGuard],
    data: { title: 'Modifica Richiesta' }
  },
  {
    path: 'gestione-utenti',
    loadChildren: () => import('./gestione-utenti/gestione-utenti.module').then( m => m.GestioneUtentiPageModule),
    canActivate: [AuthGuard],
    data: { title: 'Gestione Utenti' }
  },
  {
    path: 'modifica-utente',
    loadChildren: () => import('./modifica-utente/modifica-utente.module').then( m => m.ModificaUtentePageModule),
    canActivate: [AuthGuard],
    data: { title: 'Modifica Utente' }
  },
  {
    path: 'aggiungi-utente',
    loadChildren: () => import('./aggiungi-utente/aggiungi-utente.module').then( m => m.AggiungiUtentePageModule),
    canActivate: [AuthGuard],
    data: { title: 'Aggiungi Utente' }
  },
  {
    path: 'gestione-clienti',
    loadChildren: () => import('./gestione-clienti/gestione-clienti.module').then( m => m.GestioneClientiPageModule),
    canActivate: [AuthGuard],
    data: { title: 'Gestione Clienti' }
  },
  {
    path: 'aggiungi-cliente',
    loadChildren: () => import('./aggiungi-cliente/aggiungi-cliente.module').then( m => m.AggiungiClientePageModule),
    canActivate: [AuthGuard],
    data: { title: 'Aggiungi Cliente' }
  },
  {
    path: 'gestione-sedi',
    loadChildren: () => import('./gestione-sedi/gestione-sedi.module').then( m => m.GestioneSediPageModule),
    canActivate: [AuthGuard],
    data: { title: 'Gestione Sedi' }
  },
  {
    path: 'modifica-acquisto',
    loadChildren: () => import('./modifica-acquisto/modifica-acquisto.module').then( m => m.ModificaAcquistoPageModule),
    canActivate: [AuthGuard],
    data: { title: 'Modifica Acquisto' }
  },
  {
    path: 'aggiungi-sede',
    loadChildren: () => import('./aggiungi-sede/aggiungi-sede.module').then( m => m.AggiungiSedePageModule),
    canActivate: [AuthGuard],
    data: { title: 'Aggiungi Sede' }
  },
  {
    path: 'i-miei-ric',
    loadChildren: () => import('./i-miei-ric/i-miei-ric.module').then( m => m.IMieiRicPageModule),
    canActivate: [AuthGuard],
    data: { title: 'I Miei Ric' }
  },
  {
    path: 'assegna-operatore',
    loadChildren: () => import('./assegna-operatore/assegna-operatore.module').then( m => m.AssegnaOperatorePageModule)
  },
  {
    path: 'esegui-ric',
    loadChildren: () => import('./esegui-ric/esegui-ric.module').then( m => m.EseguiRicPageModule)
  },
  // Aggiungi canActivate: [AuthGuard] a tutte le altre rotte che vuoi proteggere
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }