import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarioAttivitaPage } from './calendario-attivita.page';

describe('CalendarioAttivitaPage', () => {
  let component: CalendarioAttivitaPage;
  let fixture: ComponentFixture<CalendarioAttivitaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CalendarioAttivitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
