import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ElencoRichiestePage } from './elenco-richieste.page';

describe('ElencoRichiestePage', () => {
  let component: ElencoRichiestePage;
  let fixture: ComponentFixture<ElencoRichiestePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ElencoRichiestePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
