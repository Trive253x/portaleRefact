import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { ModalController } from '@ionic/angular';
import { AtlanteService } from '../services/atlante.service';
import { PopoverController } from '@ionic/angular';
import { PopoverContentComponent } from '../popover-setting/popover-setting.component';
import { EseguiRicPage } from '../esegui-ric/esegui-ric.page';
import { RichiesteService } from '../services/elencoRic.service';
import { ElencoClientiService } from '../services/elencoClienti.service';
import tippy from 'tippy.js';


@Component({
  selector: 'app-calendario-full-calendar',
  templateUrl: './calendario-full-calendar.page.html',
  styleUrls: ['./calendario-full-calendar.page.scss'],
})
export class CalendarioFullCalendarPage implements OnInit {

  events: any[] = [];
  activities: any[] = []; 

  calendarOptions: CalendarOptions = {
    eventMinHeight: 5,
    allDaySlot: false,
    scrollTime: '08:30:00',
    initialView: 'timeGridWeek',
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    buttonText: { today: 'Oggi', month: 'Mese', week: 'Settimana', day: 'Giorno', list: 'Lista' },
    firstDay: 1,
    locale: 'it',
    height: '80vh',
    slotDuration: '00:15:00', // Passi di 15 minuti
    slotLabelInterval: '00:30:00', // Etichette ogni 30 minuti
    slotLabelFormat: {
      hour: '2-digit',
      minute: '2-digit',
      meridiem: false, // Rimuove AM/PM, imposta in formato 24 ore
      hour12: false,
    },
    nowIndicator: true,
    weekNumbers: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    expandRows: true,
    customButtons: {
      myCustomButton: {
        text: 'Rilevazioni',
        click: function() {
          alert('Rilevazioni');
        }
      }
    },
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek', // myCustomButton
    },

    eventMouseEnter: function(info) {
      const tooltip = tippy(info.el, {
        content: info.event.extendedProps['Object'],
        placement: 'top',
        arrow: true, // Se vuoi aggiungere la freccia
        theme: 'custom-background', // Usa il tema personalizzato con sfondo
        offset: [0, 10],
        animation: 'none'
      });
    },
    eventMouseLeave: function(info) {
      const tooltip = tippy(info.el, {
        content: info.event.extendedProps['Object'],
        placement: 'top',
        arrow: true, // Se vuoi aggiungere la freccia
        theme: 'custom-background', // Usa il tema personalizzato con sfondo
        offset: [0, 10],
        animation: 'none'
      });
    },
    events: this.events,
    eventClick: this.showPopover.bind(this),
    select: this.showPopover.bind(this),
    eventDrop: this.handleEventDrop.bind(this),
    eventResize: this.handleEventResize.bind(this),
  };

  constructor(
    private modalController: ModalController, 
    private atlanteService: AtlanteService,
    private popoverController: PopoverController,
    private richiesteService: RichiesteService,
    private elencoClientiService: ElencoClientiService
  ) {}

  ngOnInit() {
   this.getAttivita();
  }

  getAttivita(){
    let idAtlante = parseInt(localStorage.getItem('idAtlante') || '0');
    this.atlanteService.getActivityForUser(idAtlante).subscribe((data) => {
      console.log(data);
      this.events = data.map((activity: { 
        PTBRMActvID: any; 
        Object: any; 
        Completed: any; 
        cliente: any; 
        PlannedStartTime: any; 
        PlannedEndTime: any; 
        PlannedLengthMinutes: number; 
        PlannedStartDate: any; 
      }) => ({
        ...activity,
        id: activity.PTBRMActvID,
        title: activity.cliente,
        description: activity.Object, // Usa il nome o una descrizione appropriata
        color: this.getEventColor(activity.Completed), // Imposta il colore dinamicamente
        start: this.formatDate(activity.PlannedStartDate.date, activity.PlannedStartTime.date),
        end: this.formatDate(activity.PlannedStartDate.date, activity.PlannedEndTime.date),
      }));
      this.calendarOptions.events = this.events; // Aggiorna gli eventi nel calendario
      console.log(this.calendarOptions.events);
    });
  }

  // Funzione per determinare il colore in base allo stato di completamento
  getEventColor(completed: number): string {
    return completed === 1 ? '#95b634' : '#3498db'; // Verde per completato, blu per non completato
  }

  // Funzione per formattare la data correttamente
  formatDate(date: string, time: string) {
    const [year, month, day] = date.split(' ')[0].split('-');
    const [hours, minutes, seconds] = time.split(' ')[1].split(':');
    return new Date(+year, +month - 1, +day, +hours, +minutes, +seconds);
  }


  handleEventDrop(info: any) {
    console.log('Evento spostato:', info.event.title, info.event.id);
    let dateString = info.event.startStr.split('T')[0]; 
    let start = info.event.startStr.split('T')[1].split('+')[0];
    let end = info.event.endStr.split('T')[1].split('+')[0];
    console.log(dateString, start, end);
    this.updateDateAttivita(info.event.id, dateString, start, end);
  }

  handleEventResize(info: any) {
    console.log(info);
    console.log('Evento ridimensionato:', info.event.id);
    let dateString = info.event.startStr.split('T')[0]; 
    let start = info.event.startStr.split('T')[1].split('+')[0];
    let end = info.event.endStr.split('T')[1].split('+')[0];
    console.log(dateString, start, end);
    this.updateDateAttivita(info.event.id, dateString, start, end);
  }

  updateDateAttivita(id: number, date: string, start: string, end: string) {
    this.atlanteService.updateDateAttivita(id, date, start, end).subscribe((response) => {
      console.log(response);
    });
  }

  async showPopover(info: any) {
    // Usa jsEvent per ottenere le coordinate del click
    const topPosition: number = info.jsEvent.clientY - window.innerHeight / 2 + window.innerHeight /10;
    const leftPosition: number = info.jsEvent.clientX - window.innerWidth / 2 + window.innerWidth / 10;
  
    // Aggiusta la posizione per compensare lo scorrimento della pagina
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const finalTopPosition = topPosition + scrollY;
    const finalLeftPosition = leftPosition + scrollX;
  if(info.event){
  this.settingPopover(info, finalTopPosition, finalLeftPosition);
}else{
  console.log('Evento non definito');
  console.log(info);
  let dateToString = info.startStr.split('T')[0];
  let start = info.startStr.split('T')[1].split('+')[0];
  let end = info.endStr.split('T')[1].split('+')[0];

  console.log(dateToString, start, end);
  this.openNewRichiesta(dateToString, start, end);
}
  }

  async openNewRichiesta(date: string = '', start: string = '', end: string = '') {
    const modal = await this.modalController.create({
      component: EseguiRicPage,
      cssClass: 'modal-esegui-ric',
      componentProps: {
        'selectedDate': date,
        'startTime': start,
        'endTime': end,
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



async settingPopover(info: any, finalTopPosition: number, finalLeftPosition: number) {
  const popover = await this.popoverController.create({
    component: PopoverContentComponent,
    componentProps: {
      'activity': info.event,
      'top': `${finalTopPosition}px`,
      'left': `${finalLeftPosition}px`
    },
    cssClass: 'my-custom-popover hidden-popover popover-backdrop',
    backdropDismiss: true,
    showBackdrop: false
  });

  await popover.present();

  popover.onDidDismiss().then((result) => {
    console.log(result);
    if (result.data) {
      const action = result.data;
      if (action === 'edit') {
        this.modifyActivity(info.event);
      } else if (action === 'creaRilevazione') {
        this.creaRilevazione(info.event);
      } else if (action === 'delete') {
        this.deleteActivity(info.event);
      }
    }
  });

  // Applica le coordinate al popover
  setTimeout(() => {
  const popoverElement = document.querySelector('ion-popover');
  if (popoverElement) {
    popoverElement.classList.remove('hidden-popover');
    popoverElement.style.position = 'fixed';
    popoverElement.style.top = `${finalTopPosition}px`;
    popoverElement.style.left = `${finalLeftPosition}px`;
    popoverElement.style.transform = 'none'; // Disabilita il centramento predefinito di Ionic
  }
} , 100);
}

async deleteActivity(event: any) {
  console.log('Elimina attività:', event);
  const confirmDelete = confirm('Sei sicuro di voler eliminare questa attività?');
  if (confirmDelete) {
    this.atlanteService.deleteActivity(event.id).subscribe((response) => {
      this.getAttivita();
    });
  }
}


creaRilevazione(event: any) {
  console.log('Crea rilevazione:', event);  
  this.elencoClientiService.getCliente(event.RegCode).subscribe((response: any) => {
    let dateToString = event.startStr.split('T')[0];
    let start = event.startStr.split('T')[1].split('+')[0];
    let end = event.endStr.split('T')[1].split('+')[0];
  this.newRilevazione(dateToString, start, end, event);
  });
  
}

async newRilevazione(date: string, start: string, end: string, attivita: any) {
  let selectedDate, startTime, endTime, cliente;
    selectedDate = date;
    startTime = start;
    endTime = end;
    cliente = attivita.title;
  console.log(attivita);
  attivita = attivita._def.extendedProps;
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
      'descrizione': attivita.Object,
      'IDAttivitaAssegnata': attivita.IDattivitaAssegnata,
      'PTUserIDs': attivita.PTUsrsGrpsIDAssigned,
      'completed': attivita.Completed,
      'tipo': 'Rilevazione su attività',
    }
  });

  await modal.present();

  let { data } = await modal.onWillDismiss();
  if(data){
    data.IDAttivita = attivita.PTBRMActvID;
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


async modifyActivity(event: any) {
  console.log(event);
  let cliente = event.title;
  let dateToString = event.startStr.split('T')[0];
  let start = event.startStr.split('T')[1].split('+')[0];
  let end = event.endStr.split('T')[1].split('+')[0];
  let name = event.description;
  event = event._def.extendedProps;
  console.log('Modifica attività:', event);
  const modal = await this.modalController.create({
    component: EseguiRicPage,
    cssClass: 'modal-esegui-ric',
    componentProps: {
      'selectedDate': dateToString,
      'startTime': start,
      'endTime': end,
      'note': event.note,
      'idUtente': event.PTUsrsGrpsIDAssigned,
      'idTipoAttivita': event.PTBRMActvTypeID,
      'idTipologiaAttivita': event.PTBRMActvTypeTypeID,
      'idCommessa': event.PTPrjID,
      'PTRegID': event.PTRegID,
      'PTRegAddrID': event.PTRegAddrID,
      'PTRegAddrLocID': event.PTRegAddrLocID,
      'PTRegAddrCntID': event.PTRegAddrCntID,
      'PTRegCntBookID': event.PTRegCntBookID,
      'sedeAtlante': cliente,
      'descrizione': event.Object,
      'IDAttivitaAssegnata': event.IDattivitaAssegnata,
      'PTUserIDs': event.PTUsrsGrpsIDAssigned,
      'completed': event.Completed,
      'tipo': 'Attività'
    }
  });

  await modal.present();

  let { data } = await modal.onWillDismiss();
  if (data) {
    data.completed = 0;
    data.IDAttivita = event.id;
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
}

