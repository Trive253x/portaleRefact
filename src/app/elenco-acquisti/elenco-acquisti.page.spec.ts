import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElencoAcquistiPage } from './elenco-acquisti.page';

describe('ElencoAcquistiPage', () => {
  let component: ElencoAcquistiPage;
  let fixture: ComponentFixture<ElencoAcquistiPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ElencoAcquistiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
