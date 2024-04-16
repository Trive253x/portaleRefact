import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestioneClientiPage } from './gestione-clienti.page';

describe('GestioneClientiPage', () => {
  let component: GestioneClientiPage;
  let fixture: ComponentFixture<GestioneClientiPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GestioneClientiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
