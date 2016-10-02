import { Component } from "@angular/core";
import { Calendar } from './calendar';
import { Course } from "../courses/course";

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

  onClickFromCourseList(course: Course) {
    // If course is already present, it means user is deselecting the course.
    if (this.calendar.courseAlreadyPresent(course)) {
      console.log('I am here removing ', course.name);
      return this.calendar.removeCourse(course);
    } else {
      console.log('I am here adding ', course.name);
      this.calendar.addCourse(course);
      console.log('Selected courses', JSON.stringify(this.calendar.selectedCourses));
      console.log('Free:', this.calendar.getDayByIndex([course.dayIndex[0]]).hours[course.timeIndex[0]].isFree());
    }
  }

  isHourBlocked(day, hour) {
    console.log('SelectedCourses:', JSON.stringify(this.calendar.selectedCourses));
    return !this.calendar.getDayByIndex(day.index).hours[hour.startTime].isFree();
  }
}
