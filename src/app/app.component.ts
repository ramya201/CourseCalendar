import { Component } from '@angular/core';

import { CoursesComponent } from './components/courses/courses.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { Course } from './components/courses/course.model';
import { Calendar } from './components/calendar/calendar.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  entryComponents: [CoursesComponent, CalendarComponent]
})

export class AppComponent {
  title = 'Coursera';
  calendar = new Calendar();
  conflictedCourse: Course;

  /*
   * Listens for the click event emitted by the courses component.
   * Then adds/removes the course from the calendar.
   */
  onCourseClick(course: Course) {
    let courseConflict;

    if (this.calendar.courseAlreadyPresent(course)) {
      return this.calendar.removeCourse(course);
    }

    courseConflict = !this.calendar.addCourse(course);
    if (courseConflict) {
        this.conflictedCourse = course;
        setTimeout(() => this.conflictedCourse = null, 3000);
    }
  }

  /*
   * Listens for the remove event emitted by the calendar component.
   * Then removes the course from the user's calendar.
   */
  onCourseRemoveFromCalendar(course: Course) {
    if (this.calendar.courseAlreadyPresent(course)) {
      return this.calendar.removeCourse(course);
    }
  }
}
