import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestioneAssetsPage } from './gestione-assets.page';

describe('GestioneAssetsPage', () => {
  let component: GestioneAssetsPage;
  let fixture: ComponentFixture<GestioneAssetsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GestioneAssetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
