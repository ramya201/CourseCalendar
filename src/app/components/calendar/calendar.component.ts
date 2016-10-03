import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Calendar } from './calendar.model';
import { Course } from "../courses/course.model";

@Component({
  selector: 'cs-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.css']
})

export class CalendarComponent {
  // Accepts the user's calendar as input from the component displaying the calendar.
  // Assuming the user is going to save their calendar, this can later be read from the backend API through a service.
  @Input()
  calendar: Calendar;

  // Assuming our test user is 'Jane Doe', we can display a default calendar name using the user's first name.
  // This information too would eventually be retrieved from the backend when we start saving user's calendars.
  @Input()
  name = "Jane\'s calendar";

  @Output()
  courseRemoved = new EventEmitter<Course>();

  ctaImgUrls = {
    edit: "../../../assets/images/edit-24x24.png",
    save: "../../../assets/images/save-24x24.png"

  };

  ctaSrc = this.ctaImgUrls.edit;

  onEditName() {
    if (this.ctaSrc === this.ctaImgUrls.edit) {
      this.ctaSrc = this.ctaImgUrls.save;
    } else {
      this.ctaSrc = this.ctaImgUrls.edit;
    }
  }

  getNameLabelDisplay() {
    return (this.ctaSrc === this.ctaImgUrls.edit) ? 'inline-block' : 'none';
  }

  getNameInputDisplay() {
    return (this.ctaSrc === this.ctaImgUrls.save) ? 'inline-block' : 'none';
  }

  isHourBlocked(day, hour) {
    return !day.hours[hour.startTime].isFree()
  }

  getCourseFromDayAndHour(day, hour) {
    return day.hours[hour.startTime].course;
  }

  getSelectedCourseName(day, hour) {
    let hr = day.hours[hour.startTime];
    if (!hr.course) {
      return null;
    }
    if (hr.course.timeIndex[0] !== hr.startTime) {
      return null;
    }
    return hr.course.name;
  }

  onClick(course: Course) {
    return this.courseRemoved.emit(course);
  };
}
