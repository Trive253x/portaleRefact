import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EseguiRicPage } from './esegui-ric.page';

describe('EseguiRicPage', () => {
  let component: EseguiRicPage;
  let fixture: ComponentFixture<EseguiRicPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EseguiRicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
