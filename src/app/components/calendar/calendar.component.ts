import { Component, EventEmitter, Input, Output } from '@angular/core';

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
  // This information would be retrieved from the browser cookies or the backend in the production version.
  @Input()
  name = "Jane\'s calendar";

  @Output()
  courseRemoved = new EventEmitter<Course>();

  ctaImgUrls = {
    edit: "../../../assets/images/edit-24x24.png",
    save: "../../../assets/images/save-24x24.png"

  };
  ctaSrc = this.ctaImgUrls.edit;

  /*
   * Fires this event handler when the user clicks on the Edit button to edit the calendar name.
   */
  onEditName() {
    if (this.ctaSrc === this.ctaImgUrls.edit) {
      this.ctaSrc = this.ctaImgUrls.save;
    } else {
      this.ctaSrc = this.ctaImgUrls.edit;
    }
  }

  /*
   * Helper function to get the CSS display property for the label displaying the calendar name.
   */
  getNameLabelDisplay() {
    return (this.ctaSrc === this.ctaImgUrls.edit) ? 'inline-block' : 'none';
  }

  /*
   * Helper function to get the CSS display property for the calendar name input field.
   */
  getNameInputDisplay() {
    return (this.ctaSrc === this.ctaImgUrls.save) ? 'inline-block' : 'none';
  }

  /*
   * Helper function which returns if the particular hour for the particular day is blocked.
   */
  isHourBlocked(day, hour) {
    return !day.hours[hour.startTime].isFree()
  }

  /*
   * Helper function which returns the selected course given the day and hour.
   */
  getCourseFromDayAndHour(day, hour) {
    return day.hours[hour.startTime].course;
  }

  /*
   * Helper function which returns the selected course name given the day and hour.
   */
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

  /*
   * Fires this event handler when the user clicks on the close button attempting to remove a course from the calendar.
   */
  onClick(course: Course) {
    return this.courseRemoved.emit(course);
  };
}
