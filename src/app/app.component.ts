import { Component } from '@angular/core';
import { CoursesComponent } from "./components/courses/courses.component";
import { CalendarComponent } from "./components/calendar/calendar.component";
import { Course } from "./components/courses/course";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  entryComponents: [CoursesComponent, CalendarComponent]
})

export class AppComponent {
  title = 'Coursera Calendar';
  private calendarComponent = new CalendarComponent();

  onCourseClick(course: Course) {
    return this.calendarComponent.onClickFromCourseList(course);
  }
}
