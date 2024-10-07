import { Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AtlanteService } from '../services/atlante.service';
import { GestureController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { EseguiRicPage } from '../esegui-ric/esegui-ric.page';
import { RichiesteService } from '../services/elencoRic.service';
import { ElencoClientiService } from '../services/elencoClienti.service';
import { PopoverController } from '@ionic/angular';
import { PopoverContentComponent } from '../popover-setting/popover-setting.component';

@Component({
  selector: 'app-calendario-attivita',
  templateUrl: './calendario-attivita.page.html',
  styleUrls: ['./calendario-attivita.page.scss'],
})
export class CalendarioAttivitaPage implements OnInit {
  showButton: { day: Date, hour: string } | null = null;
  selectedSegment: string = 'attivita'; // Segmento selezionato inizialmente
  longPressActive: boolean = false; // Per tenere traccia del long press
  isSmallScreen: boolean = false;
  displayedHours: any;
  currentDate: Date = new Date();
  currentMonth: Date = new Date();
  weekDays: any[] = [];
  activities: any[] = [];
  selectedActivity: any = null; // Per mantenere traccia dell'attività selezionata
  showSettingsMenu: boolean = false; // Per mostrare o nascondere il menu
  menuPosition = { top: '0px', left: '0px' };

  hours = [
    '00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30',
    '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30',
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'
  ];

  @ViewChild('table') table: any;

  constructor(private atlanteService: AtlanteService, private gestureCtrl: GestureController,
    private modalController: ModalController, private richiesteService: RichiesteService,
    private elencoClientiService: ElencoClientiService, private popoverController: PopoverController
  ) { }

  ngOnInit() {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
    this.getAttivita();
    this.displayedHours = this.hours.slice(0, 48); // Inizialmente dalle 08:00 alle 18:00
  }

  getAttivita() {
    let idAtlante = parseInt(localStorage.getItem('idAtlante') || '0');
    // Ottenere attività dall'API
    this.atlanteService.getActivityForUser(idAtlante).subscribe((data) => {
      console.log(data);
      this.activities = data.map((activity: { PTBRMActvID: any; Object: any; Completed: any; cliente: any; PlannedStartTime: any; PlannedEndTime: any; PlannedLengthMinutes: number; PlannedStartDate: any; }) => ({
       ...activity,
        id: activity.PTBRMActvID,
        cliente: activity.cliente,
        name: activity.Object, // Usa il nome o una descrizione appropriata
        color: activity.Completed === 1 ? '#95b634' : '#3498db', // Usa un colore diverso per le attività completate
        startHour: this.formatTime(activity.PlannedStartTime.date),
        endHour: this.formatTime(activity.PlannedEndTime.date),
        day: new Date(activity.PlannedStartDate.date).getDate(),
        month: new Date(activity.PlannedStartDate.date).getMonth() + 1,
        year: new Date(activity.PlannedStartDate.date).getFullYear()
      }));
      this.updateWeekDays();
    });
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 900;
  }

  formatString(string: string): string {
    if (this.isSmallScreen) {
      return string.slice(0, 1);
    } else {
      return string;
    }
  }

  formatHour(hour: string): string {
    if (this.isSmallScreen) {
      return hour.endsWith(':00') ? hour.substring(0, 2) : ''; // Mostra solo le prime 2 cifre se è un'ora intera
    }
    return hour; // Mostra l'ora completa sugli schermi più grandi
  }

  async showPopover(event: MouseEvent | TouchEvent, activity: any) {
    this.selectedActivity = activity;
  
    // Calculate the position
    let topPosition: number = 0;
    let leftPosition: number = 0;
  
    if (event instanceof MouseEvent) {
      topPosition = event.clientY;
      leftPosition = event.clientX;
    } else if (event instanceof TouchEvent && event.touches.length > 0) {
      topPosition = event.touches[0].clientY;
      leftPosition = event.touches[0].clientX;
    }
  
    // Adjust position to account for scroll offset
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    leftPosition += scrollX;
    topPosition += scrollY;
    console.log(topPosition, leftPosition);
  
    // Pass the position to the popover
    const popover = await this.popoverController.create({
      component: PopoverContentComponent,
      componentProps: {
        'activity': this.selectedActivity,
        'top': `${topPosition}px`,
        'left': `${leftPosition}px`
      },
      cssClass: 'custom-popover', // Add a custom CSS class if needed
      backdropDismiss: true,
      showBackdrop: false // Disable the backdrop if you don't want it
    });
  
    // Handle the result from the popover
    popover.onDidDismiss().then((result) => {
      console.log(result);
      if (result.data) {
        const action = result.data;
        if (action === 'edit') {
          this.editActivity();
        } else if (action === 'creaRilevazione') {
          this.creaRilevazione();
        } else if (action === 'delete') {
          this.deleteActivity();
        }
      }
    });
  
    await popover.present();

    const popoverElement = document.querySelector('ion-popover');
  if (popoverElement) {
    popoverElement.style.position = 'absolute';
    popoverElement.style.top = `${topPosition}px -100`;
    popoverElement.style.left = `${leftPosition}px - 200`;
    popoverElement.style.transform = 'none'; // Disable Ionic's default centering transform
  }
  }

  @HostListener('document:click', ['$event'])
  closeSettingsMenu(event: MouseEvent) {
    const clickedInside = (event.target as HTMLElement).closest('.settings-menu');
    if (!clickedInside && this.showSettingsMenu) {
      this.showSettingsMenu = false; // Nascondi il menu se l'utente clicca fuori
    }
  }

  async deleteActivity() {
    this.showSettingsMenu = false;
    const confirmDelete = confirm('Sei sicuro di voler eliminare questa attività?');
    if (confirmDelete) {
      this.atlanteService.deleteActivity(this.selectedActivity.id).subscribe((response) => {
        this.getAttivita();
      });
    }
  }

  

  creaRilevazione() {
    this.elencoClientiService.getCliente(this.selectedActivity.RegCode).subscribe((response: any) => {
      let idCliente = response.ID;
      let day = this.selectedActivity.day;
    let month = this.selectedActivity.month;
    let year = this.selectedActivity.year;
    let date = new Date(year, month -1, day +1);
    let dateToString = date.toISOString().split('T')[0];
    let hour = this.selectedActivity.startHour;
    this.showSettingsMenu = false;
    console.log(dateToString);
    this.newRilevazione(dateToString, hour, this.selectedActivity, idCliente);
    });
    
  }

  editActivity() {
    this.modifyActivity();
  }

  creaAttivita(day: string, hour: string) {

    let date = new Date(day);
    let dateToString = date.toISOString().split('T')[0];
    let dateHour = `${dateToString}T${hour}`;
    this.showSettingsMenu = false;
    console.log(dateToString);
    this.openNewRichiesta(dateToString, hour);
  }

  async openNewRichiesta(date: string = '', hour: string = '') {
    const modal = await this.modalController.create({
      component: EseguiRicPage,
      cssClass: 'modal-esegui-ric',
      componentProps: {
        'selectedDate': date,
        'startTime': hour,
        'completed': 0,
        'tipo': 'Attività'
      }
    });

    await modal.present();

    let { data } = await modal.onWillDismiss();
    if (data) {
      data.completed = 0;
      this.atlanteService.createAttivita(data).subscribe((response: any) => {
        data.IDRilevazione = null;
        data.IDAzione = null;
        data.IDAttivita = response.data;
        this.richiesteService.modificaRic(data).subscribe((response: any) => {
          console.log(response);
        });
        this.getAttivita();
      });

    }
  }

  async modifyActivity() {
    const modal = await this.modalController.create({
      component: EseguiRicPage,
      cssClass: 'modal-esegui-ric',
      componentProps: {
        'selectedDate': this.selectedActivity.PlannedStartDate.date.split(' ')[0],
        'startTime': this.selectedActivity.startHour,
        'endTime': this.selectedActivity.endHour,
        'note': this.selectedActivity.note,
        'idUtente': this.selectedActivity.PTUsrsGrpsIDAssigned,
        'idTipoAttivita': this.selectedActivity.PTBRMActvTypeID,
        'idTipologiaAttivita': this.selectedActivity.PTBRMActvTypeTypeID,
        'idCommessa': this.selectedActivity.PTPrjID,
        'PTRegID': this.selectedActivity.PTRegID,
        'PTRegAddrID': this.selectedActivity.PTRegAddrID,
        'PTRegAddrLocID': this.selectedActivity.PTRegAddrLocID,
        'PTRegAddrCntID': this.selectedActivity.PTRegAddrCntID,
        'PTRegCntBookID': this.selectedActivity.PTRegCntBookID,
        'sedeAtlante': this.selectedActivity.cliente,
        'descrizione': this.selectedActivity.name,
        'IDAttivitaAssegnata': this.selectedActivity.IDattivitaAssegnata,
        'PTUserIDs': this.selectedActivity.PTUsrsGrpsIDAssigned,
        'completed': this.selectedActivity.Completed,
        'tipo': 'Attività'
      }
    });

    await modal.present();

    let { data } = await modal.onWillDismiss();
    if (data) {
      data.completed = 0;
      data.IDAttivita = this.selectedActivity.id;
      this.atlanteService.createAttivita(data).subscribe((response: any) => {
        data.IDRilevazione = null;
        data.IDAzione = null;
        this.richiesteService.modificaRic(data).subscribe((response: any) => {
          console.log(response);
        });
        this.getAttivita();
      });

    }
  }



  async newRilevazione(date: string, hour: string, attivita: any, idCliente: number) {
    let selectedDate, startTime, endTime;
      selectedDate = date;
      startTime = hour;
      endTime = attivita.endHour;
    console.log(attivita);
    const modal = await this.modalController.create({
      component: EseguiRicPage,
      cssClass: 'modal-esegui-ric',
      componentProps: {
        'selectedDate': selectedDate,
        'startTime': startTime,
        'endTime': endTime,
        'note': attivita.note,
        'idUtente': attivita.PTUsrsGrpsIDAssigned,
        'idTipoAttivita': attivita.PTBRMActvTypeID,
        'idTipologiaAttivita': attivita.PTBRMActvTypeTypeID,
        'idCommessa': attivita.PTPrjID,
        'PTRegID': attivita.PTRegID,
        'PTRegAddrID': attivita.PTRegAddrID,
        'PTRegAddrLocID': attivita.PTRegAddrLocID,
        'PTRegAddrCntID': attivita.PTRegAddrCntID,
        'PTRegCntBookID': attivita.PTRegCntBookID,
        'sedeAtlante': attivita.cliente,
        'descrizione': attivita.name,
        'IDAttivitaAssegnata': attivita.IDattivitaAssegnata,
        'PTUserIDs': attivita.PTUsrsGrpsIDAssigned,
        'completed': attivita.Completed,
        'tipo': 'Rilevazione su attività',
      }
    });
  
    await modal.present();
  
    let { data } = await modal.onWillDismiss();
    if(data){
      data.IDAttivita = attivita.id;
      data.completed = 1;
          this.atlanteService.createAction(data).subscribe((response: any) => {
            data.IDAzione = response.data;
            this.atlanteService.createRilevazione(data).subscribe((response: any) => {
              data.IDRilevazione = response.data;
              this.richiesteService.modificaRic(data).subscribe((response: any) => {
              console.log(response);
            });
          });
          this.getAttivita();
      });
    
    }
  }


  // Funzione per formattare l'ora dal backend
  formatTime(timeString: string): string {
    const timeParts = timeString.split(' ')[1].split(':');
    return `${timeParts[0]}:${timeParts[1]}`;
  }



  ionViewDidEnter() {
    const scrollValue = window.innerWidth < 900 ? 260 : 669; // Se lo schermo è minore di 900px, usa 195, altrimenti 390
    this.table.nativeElement.scrollTop = scrollValue;
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
    this.currentMonth = new Date(this.currentMonth);
    this.currentDate = new Date(this.currentMonth);
    this.updateWeekDays();
  }

  nextMonth() {
    this.currentMonth.setMonth(this.currentMonth.getMonth() + 1);
    this.currentMonth = new Date(this.currentMonth);
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
    const cellHeight = window.innerWidth < 900 ? 19.5 : 40;

    const pixelsPerMinute = 1 / cellHeight;
    const topInPixels = totalMinutes * pixelsPerMinute / cellHeight;

    return `${topInPixels}px`; // Sottrai 5px per spostare leggermente verso l'alto
  }

  calculateCardHeight(startHour: string, endHour: string): string {
    const [startHours, startMinutes] = startHour.split(':').map(Number);
    const [endHours, endMinutes] = endHour.split(':').map(Number);
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;
    const durationMinutes = endTotalMinutes - startTotalMinutes;
    const cellHeight = window.innerWidth < 900 ? 20.5 : 40;

    const pixelsPerMinute = cellHeight / 30; // Supponiamo che ogni mezz'ora sia 50px
    const heightInPixels = durationMinutes * pixelsPerMinute;

    return `${heightInPixels}px`; // Restituiamo l'altezza in pixel
  }

  getActivity(day: Date, hour: string): any {
    return this.activities.find(activity =>
      this.isActivityInCurrentWeek(activity) &&
      new Date(activity.year, activity.month - 1, activity.day).getDate() === day.getDate() &&
      activity.startHour === hour // Mostra solo nell'ora di inizio
    );
  }

  isActivityInCurrentWeek(activity: any): boolean {
    const activityDate = new Date(activity.year, activity.month - 1, activity.day + 1);
    const startOfWeekDate = this.getMonday(this.currentDate);
    const endOfWeekDate = new Date(startOfWeekDate);
    endOfWeekDate.setDate(endOfWeekDate.getDate() + 7);
    return activityDate >= startOfWeekDate && activityDate <= endOfWeekDate;
  }

  checkOverlap(activity1: any, activity2: any): boolean {
    const start1 = this.timeToMinutes(activity1.startHour);
    const end1 = this.timeToMinutes(activity1.endHour);
    const start2 = this.timeToMinutes(activity2.startHour);
    const end2 = this.timeToMinutes(activity2.endHour);

    // Controlla se le due attività si sovrappongono
    return start1 < end2 && start2 < end1;
  }

  timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  getOverlappingActivities(day: Date, hour: string): any[] {
    const hourInMinutes = this.timeToMinutes(hour);

    // Filtra tutte le attività che coprono almeno parte dell'intervallo
    const activitiesAtTime = this.activities.filter(activity =>
      this.isActivityInCurrentWeek(activity) &&
      new Date(activity.year, activity.month - 1, activity.day).getDate() === day.getDate() &&
      this.timeToMinutes(activity.startHour) < hourInMinutes + 30 &&  // Inizia prima della fine di questo intervallo
      this.timeToMinutes(activity.endHour) > hourInMinutes // Termina dopo l'inizio di questo intervallo
    );

    let overlappingGroups: any[] = [];

    activitiesAtTime.forEach(activity => {
      let addedToGroup = false;

      // Cerca se questa attività si sovrappone a un gruppo esistente
      for (let group of overlappingGroups) {
        if (group.some((existingActivity: any) => this.checkOverlap(existingActivity, activity))) {
          group.push(activity);
          addedToGroup = true;
          break;
        }
      }

      // Se non si sovrappone a nessun gruppo, crea un nuovo gruppo
      if (!addedToGroup) {
        overlappingGroups.push([activity]);
      }
    });

    return overlappingGroups;
  }

  onLongPress(activity: any) {
    // Logica per il longpress
    console.log('Long press sull\'attività:', activity);
    // Esegui le azioni desiderate
  }

}
