import { Component, EventEmitter, Output } from '@angular/core';
import { CoursesService } from "./courses.service";
import { Course } from "./course";

@Component({
  selector: 'cs-course-list',
  templateUrl: 'courses.component.html',
  styleUrls: ['courses.component.css'],
  providers: [CoursesService]
})

export class CoursesComponent {
  courses: Course[];
  selectedCourses: Course[] = [];

  @Output()
  clicked = new EventEmitter<Course>();

  constructor() {
    CoursesService.getCatalogOfCourses().then(courses => this.courses = courses);
  }

  onClick(course: Course) {
    this.clicked.emit(course);
    if (this.selectedCourses.indexOf(course) === -1) {
      this.selectedCourses.push(course);
    } else {
      this.selectedCourses.splice(this.selectedCourses.indexOf(course), 1);
    }
  };
}
