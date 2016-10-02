import { Component } from "@angular/core";
import { Calendar } from './calendar';

@Component({
  selector: 'cs-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.css']
})

export class CalendarComponent {
  calendar: Calendar;

  constructor() {
    this.calendar = new Calendar();
  }
}
