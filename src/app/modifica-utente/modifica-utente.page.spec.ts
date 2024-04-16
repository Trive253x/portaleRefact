import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificaUtentePage } from './modifica-utente.page';

describe('ModificaUtentePage', () => {
  let component: ModificaUtentePage;
  let fixture: ComponentFixture<ModificaUtentePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModificaUtentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
