import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarioFullCalendarPage } from './calendario-full-calendar.page';

describe('CalendarioFullCalendarPage', () => {
  let component: CalendarioFullCalendarPage;
  let fixture: ComponentFixture<CalendarioFullCalendarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CalendarioFullCalendarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
