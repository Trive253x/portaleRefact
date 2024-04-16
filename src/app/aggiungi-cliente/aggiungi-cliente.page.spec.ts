import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AggiungiClientePage } from './aggiungi-cliente.page';

describe('AggiungiClientePage', () => {
  let component: AggiungiClientePage;
  let fixture: ComponentFixture<AggiungiClientePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AggiungiClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
