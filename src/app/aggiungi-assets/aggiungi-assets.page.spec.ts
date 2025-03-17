import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AggiungiAssetsPage } from './aggiungi-assets.page';

describe('AggiungiAssetsPage', () => {
  let component: AggiungiAssetsPage;
  let fixture: ComponentFixture<AggiungiAssetsPage>;

  beforeEach((async () => {
    fixture = TestBed.createComponent(AggiungiAssetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
