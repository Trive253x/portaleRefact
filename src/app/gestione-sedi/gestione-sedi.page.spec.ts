import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestioneSediPage } from './gestione-sedi.page';

describe('GestioneSediPage', () => {
  let component: GestioneSediPage;
  let fixture: ComponentFixture<GestioneSediPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GestioneSediPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
