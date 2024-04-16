import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RichiestaAssistenzaPage } from './richiesta-assistenza.page';

describe('RichiestaAssistenzaPage', () => {
  let component: RichiestaAssistenzaPage;
  let fixture: ComponentFixture<RichiestaAssistenzaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RichiestaAssistenzaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
