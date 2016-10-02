import { Component } from '@angular/core';
import { CoursesComponent } from "./components/courses/courses.component";
import { CalendarComponent } from "./components/calendar/calendar.component";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  entryComponents: [CoursesComponent, CalendarComponent]
})

export class AppComponent {
  title = 'Coursera Calendar';
}
