import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificaAcquistoPage } from './modifica-acquisto.page';

describe('ModificaAcquistoPage', () => {
  let component: ModificaAcquistoPage;
  let fixture: ComponentFixture<ModificaAcquistoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModificaAcquistoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
