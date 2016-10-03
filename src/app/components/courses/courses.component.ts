import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CoursesService } from './courses.service';
import { Course } from './course.model';

@Component({
  selector: 'cs-course-list',
  templateUrl: 'courses.component.html',
  styleUrls: ['courses.component.css'],
  providers: [CoursesService]
})

export class CoursesComponent {
  courses: Course[];
  filteredCourses: Course[];

  @Input()
  selectedCourses: Course[] = [];

  @Input()
  conflictedCourse: Course;

  @Output()
  clicked = new EventEmitter<Course>();

  constructor() {
    // Reading data present in catalog.json currently. This can be changed to bigCatalog.json if required.
    CoursesService.getCatalogOfCourses().then(courses => {
      this.courses = courses;
      this.filteredCourses = courses;
    });
  }

  /*
   * Fires this event handler when a user clicks on a course.
   */
  onClick(course: Course) {
    return this.clicked.emit(course);
  };

  /*
   * Logic to filter courses based on the search field.
   */
  filterCourses(filterValue: string) {
    filterValue = filterValue.toLowerCase();

    if (filterValue) {
      this.filteredCourses = this.courses.filter((course) => {
        return course.name.toLowerCase().includes(filterValue) || course.author.toLowerCase().includes(filterValue);
      });
    } else {
      this.filteredCourses = this.courses;
    }
  };
}
