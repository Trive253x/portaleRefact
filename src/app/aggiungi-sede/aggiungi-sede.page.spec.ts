import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AggiungiSedePage } from './aggiungi-sede.page';

describe('AggiungiSedePage', () => {
  let component: AggiungiSedePage;
  let fixture: ComponentFixture<AggiungiSedePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AggiungiSedePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
