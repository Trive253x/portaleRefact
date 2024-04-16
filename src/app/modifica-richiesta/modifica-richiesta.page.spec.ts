import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificaRichiestaPage } from './modifica-richiesta.page';

describe('ModificaRichiestaPage', () => {
  let component: ModificaRichiestaPage;
  let fixture: ComponentFixture<ModificaRichiestaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModificaRichiestaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
