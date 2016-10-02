import { Course } from '../courses/course';

class Hour {
  startTime: number;
  endTime: number;
  blocked: boolean = false;
  course: Course;

  constructor(start: number) {
    this.startTime = start;
    this.endTime = start + 1;
  }

  isFree() {
    return !this.blocked;
  }

  block(course: Course) {
    this.blocked = true;
    this.course = course;
  }

  unblock() {
    this.blocked = false;
    this.course = null;
  }

  getDisplayString(): string {
    var time = ((this.startTime + 11) % 12 + 1),
        suffix = this.startTime > 12 ? 'PM' : 'AM';
    return  time + ":00 " + suffix;
  }
}

class Day {
  name: string;
  index: number;
  hours: Hour[] = [];
  courses: Course[] = [];

  constructor(name: string, index: number) {
    this.name = name;
    this.index = index;
    for (var i = 0; i < 24; i++) {
      this.hours.push(new Hour(i));
    }
  }

  canAddCourse(course: Course) {
    let [startTime, endTime] = course.timeIndex;

    let result: boolean = ((startTime < endTime) &&
    (startTime >= 0 && startTime <= 23) &&
    (endTime >= 0 && endTime <= 23));

    if (!result) {
      return false;
    }

    for (let i = startTime; i < endTime; i++) {
      if (!this.hours[i].isFree()) {
        return false;
      }
    }
    return true;
  }

  addCourse(course: Course) {
    let [startTime, endTime] = course.timeIndex;

    for (let i = startTime; i < endTime; i++) {
      this.hours[i].block(course);
    }
    this.courses.push(course);
  }

  canRemoveCourse(course: Course) {
    let [startTime, endTime] = course.timeIndex;

    let result: boolean = ((startTime < endTime) &&
    (startTime >= 0 && startTime <= 23) &&
    (endTime >= 0 && endTime <= 23));

    if (!result) {
      return false;
    }

    for (let i = startTime; i < endTime; i++) {
      if (this.hours[i].course !== course) {
        return false;
      }
    }

    return true;
  }

  removeCourse(course: Course) {
    let [startTime, endTime] = course.timeIndex;

    for (let i = startTime; i < endTime; i++) {
      this.hours[i].unblock();
    }
    this.courses.splice(this.courses.indexOf(course), 1);
  }
}

export class Calendar {
  days: Day[] = [];
  selectedCourses: Course[] = [];

  constructor() {
    this.days.push(new Day('Monday', 1));
    this.days.push(new Day('Tuesday', 2));
    this.days.push(new Day('Wednesday', 3));
    this.days.push(new Day('Thursday', 4));
    this.days.push(new Day('Friday', 5));
  }

  canAddCourse(course: Course) {
    return course.dayIndex.every(curr => this.getDayByIndex(curr).canAddCourse(course));
  }

  addCourse(course: Course) {
    if (this.canAddCourse(course)) {
      course.dayIndex.forEach((index) => this.getDayByIndex(index).addCourse(course));
      this.selectedCourses.push(course);
    }
  }

  canRemoveCourse(course: Course) {
    return course.dayIndex.every(curr => this.getDayByIndex(curr).canRemoveCourse(course));
  }

  removeCourse(course: Course) {
    if (this.canRemoveCourse(course)) {
      course.dayIndex.forEach((index) => this.getDayByIndex(index).removeCourse(course));
      this.selectedCourses.splice(this.selectedCourses.indexOf(course), 1);
    }
  }

  courseAlreadyPresent(course: Course) {
    return (this.selectedCourses.indexOf(course) > -1);
  }

  getDayByIndex(index) {
    if (index >= 1 && index <= 5) {
      return this.days[index - 1];
    } else {
      return null;
    }
  }
}

