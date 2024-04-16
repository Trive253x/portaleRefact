import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IMieiRicPage } from './i-miei-ric.page';

describe('IMieiRicPage', () => {
  let component: IMieiRicPage;
  let fixture: ComponentFixture<IMieiRicPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(IMieiRicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
