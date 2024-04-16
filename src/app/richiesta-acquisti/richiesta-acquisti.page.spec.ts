import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RichiestaAcquistiPage } from './richiesta-acquisti.page';

describe('RichiestaAcquistiPage', () => {
  let component: RichiestaAcquistiPage;
  let fixture: ComponentFixture<RichiestaAcquistiPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RichiestaAcquistiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
