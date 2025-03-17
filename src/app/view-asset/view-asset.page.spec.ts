import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewAssetPage } from './view-asset.page';

describe('ViewAssetPage', () => {
  let component: ViewAssetPage;
  let fixture: ComponentFixture<ViewAssetPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewAssetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
