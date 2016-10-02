import { Course } from "./course";
import { CATALOG } from '../../../data/catalog';
import { BIGCATALOG } from '../../../data/bigCatalog';

export class CoursesService {
  static getCatalogOfCourses(): Promise<Course[]> {
    return Promise.resolve(CATALOG);
  }
  static getBigCatalogOfCourses(): Promise<Course[]> {
    return Promise.resolve(BIGCATALOG);
  }
}
