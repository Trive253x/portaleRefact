import { Component, OnInit, ViewChild } from '@angular/core';
import { AtlanteService } from '../services/atlante.service';
@Component({
  selector: 'app-calendario-attivita',
  templateUrl: './calendario-attivita.page.html',
  styleUrls: ['./calendario-attivita.page.scss'],
})
export class CalendarioAttivitaPage implements OnInit  {
  displayedHours: any;
  currentDate: Date = new Date();
  currentMonth: Date = new Date();
  weekDays: any[] = [];
  activities: any[] = [];

  hours = [
    '00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', 
    '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', 
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', 
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', 
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', 
    '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'
  ];

  @ViewChild('table') table: any;

  constructor(private atlanteService: AtlanteService) { }

  ngOnInit() {
    let idAtlante = parseInt(localStorage.getItem('idAtlante') || '0');
    
    // Ottenere attività dall'API
    this.atlanteService.getActivityForUser(idAtlante).subscribe((data) => {
      console.log(data);
      this.activities = data.map((activity: { PTBRMActvID: any; PlannedStartTime: any; PlannedEndTime: any; PlannedLengthMinutes: number; PlannedStartDate: any; }) => ({
        id: activity.PTBRMActvID,
        name: `Attività ${activity.PTBRMActvID}`, // Usa il nome o una descrizione appropriata
        startHour: this.formatTime(activity.PlannedStartTime.date), 
        endHour: this.formatTime(activity.PlannedEndTime.date),
        day: new Date(activity.PlannedStartDate.date).getDate(),
        month: new Date(activity.PlannedStartDate.date).getMonth() + 1,
        year: new Date(activity.PlannedStartDate.date).getFullYear()
      }));
      this.updateWeekDays();
    });
    
    this.displayedHours = this.hours.slice(0, 48); // Inizialmente dalle 08:00 alle 18:00
  }

   // Funzione per formattare l'ora dal backend
   formatTime(timeString: string): string {
    const timeParts = timeString.split(' ')[1].split(':');
    console.log(`${timeParts[0]}:${timeParts[1]}`);
    return `${timeParts[0]}:${timeParts[1]}`;
  }



  ionViewDidEnter(){
    this.table.nativeElement.scrollTop = 350;
  }

  

  scrollUp() {
    let startIndex = this.hours.indexOf(this.displayedHours[0]);
    if (startIndex > 0) {
      this.displayedHours = this.hours.slice(startIndex - 2, startIndex + 18);
    }
  }
  
  scrollDown() {
    let endIndex = this.hours.indexOf(this.displayedHours[this.displayedHours.length - 1]);
    if (endIndex < this.hours.length - 1) {
      this.displayedHours = this.hours.slice(endIndex - 18, endIndex + 2);
    }
  }

  updateWeekDays() {
    const startOfWeekDate = this.getMonday(this.currentDate);
    this.weekDays = Array.from({ length: 7 }).map((_, i) => ({
      date: new Date(startOfWeekDate.getTime() + i * 24 * 60 * 60 * 1000)
    }));
  }

  previousWeek() {
    this.currentDate.setDate(this.currentDate.getDate() - 7);
    this.updateWeekDays();
  }

  nextWeek() {
    this.currentDate.setDate(this.currentDate.getDate() + 7);
    this.updateWeekDays();
  }

  previousMonth() {
    this.currentMonth.setMonth(this.currentMonth.getMonth() - 1);
    this.currentDate = new Date(this.currentMonth);
    this.updateWeekDays();
  }

  nextMonth() {
    this.currentMonth.setMonth(this.currentMonth.getMonth() + 1);
    this.currentDate = new Date(this.currentMonth);
    this.updateWeekDays();
  }

  getMonday(date: Date): Date {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  calculateCardTop(startHour: string): string {
    const [hours, minutes] = startHour.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    
    const pixelsPerMinute = 1 / 30; // Supponiamo che ogni mezz'ora sia 50px
    const topInPixels = totalMinutes * pixelsPerMinute / 30;
    
    return `${topInPixels}px`; // Sottrai 5px per spostare leggermente verso l'alto
  }

  calculateCardHeight(startHour: string, endHour: string): string {
    const [startHours, startMinutes] = startHour.split(':').map(Number);
    const [endHours, endMinutes] = endHour.split(':').map(Number);
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;
    const durationMinutes = endTotalMinutes - startTotalMinutes;
    
    const pixelsPerMinute = 30 / 30; // Supponiamo che ogni mezz'ora sia 50px
    const heightInPixels = durationMinutes * pixelsPerMinute;
    
    return `${heightInPixels}px`; // Restituiamo l'altezza in pixel
  }

  getActivity(day: Date, hour: string): any {
    return this.activities.find(activity => 
      this.isActivityInCurrentWeek(activity) && 
      new Date(activity.year, activity.month - 1, activity.day).getDate() === day.getDate() &&
      activity.startHour === hour
    );
  }

  isActivityInCurrentWeek(activity: any): boolean {
    const activityDate = new Date(activity.year, activity.month - 1, activity.day + 1);
    const startOfWeekDate = this.getMonday(this.currentDate);
    const endOfWeekDate = new Date(startOfWeekDate);
    endOfWeekDate.setDate(endOfWeekDate.getDate() +  7);
    return activityDate >= startOfWeekDate && activityDate <= endOfWeekDate;
  }

  
}
