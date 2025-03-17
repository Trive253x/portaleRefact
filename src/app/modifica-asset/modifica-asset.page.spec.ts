import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificaAssetPage } from './modifica-asset.page';

describe('ModificaAssetPage', () => {
  let component: ModificaAssetPage;
  let fixture: ComponentFixture<ModificaAssetPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModificaAssetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
