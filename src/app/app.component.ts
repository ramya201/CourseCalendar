import { Component } from '@angular/core';
import { CoursesComponent } from "./components/courses/courses.component";
import { CalendarComponent } from "./components/calendar/calendar.component";
import { Course } from "./components/courses/course";
import { Calendar } from "./components/calendar/calendar";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  entryComponents: [CoursesComponent, CalendarComponent]
})

export class AppComponent {
  title = 'Coursera Calendar';
  calendar = new Calendar();

  // Adds/removes the course from the calendar when the user selects it.
  onCourseClick(course: Course) {
    if (this.calendar.courseAlreadyPresent(course)) {
      return this.calendar.removeCourse(course);
    } else {
      this.calendar.addCourse(course);
    }
  }
}
