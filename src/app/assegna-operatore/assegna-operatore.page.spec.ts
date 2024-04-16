import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssegnaOperatorePage } from './assegna-operatore.page';

describe('AssegnaOperatorePage', () => {
  let component: AssegnaOperatorePage;
  let fixture: ComponentFixture<AssegnaOperatorePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AssegnaOperatorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
