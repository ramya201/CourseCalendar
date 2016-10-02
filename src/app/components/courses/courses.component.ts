import { Component, Input} from '@angular/core';
import { CoursesService } from "./courses.service";
import { Course } from "./course";

@Component({
  selector: 'cs-course-list',
  templateUrl: 'courses.component.html',
  styleUrls: ['courses.component.css'],
  providers: [CoursesService]
})

export class CoursesComponent {
  @Input()
  selectedCourses: Course[] = [];

  courses: Course[];

  constructor() {
    CoursesService.getCatalogOfCourses().then(courses => this.courses = courses);
  }

  onSelect(course: Course) {
    if (this.selectedCourses.indexOf(course) === -1) {
      this.selectedCourses.push(course);
    } else {
      this.selectedCourses.splice(this.selectedCourses.indexOf(course), 1);
    }
  };
}
