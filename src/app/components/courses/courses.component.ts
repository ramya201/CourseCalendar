import { Component, EventEmitter, Input, Output} from '@angular/core';
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
  filteredCourses: Course[];

  @Input()
  selectedCourses: Course[] = [];

  @Input()
  conflictedCourse: Course;

  @Output()
  clicked = new EventEmitter<Course>();

  constructor() {
    CoursesService.getCatalogOfCourses().then(courses => {
      this.courses = courses;
      this.filteredCourses = courses;
    });
  }

  onClick(course: Course) {
    return this.clicked.emit(course);
  };

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
