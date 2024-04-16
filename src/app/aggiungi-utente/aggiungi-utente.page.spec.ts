import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AggiungiUtentePage } from './aggiungi-utente.page';

describe('AggiungiUtentePage', () => {
  let component: AggiungiUtentePage;
  let fixture: ComponentFixture<AggiungiUtentePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AggiungiUtentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
