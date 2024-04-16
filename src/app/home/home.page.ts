import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router: Router) { } // Inietta il servizio Router

  ngOnInit() {
  }

  // Metodo per aprire la pagina "RichiestaAssistenza"
  openAssistenza() {
    this.router.navigate(['/richiesta-assistenza']);
  }
  openAcquisto() {
    this.router.navigate(['/richiesta-acquisti']);
  }

}