import { CoursesDatabase } from "../database/UserDatabase";
import { BadRequestError } from "../erros/BadRequestError";
import { Course } from "../models/Course";
import { format } from "date-fns";
import { CoursesDB } from "../types";

export class CourseBusiness {
  public getCourse = async (q: string | undefined) => {
    const userDatabase = new CoursesDatabase();
    const coursesDB = await userDatabase.findCourses(q);

    const courses: Course[] = coursesDB.map(
      (coursesDB) =>
        new Course(
          coursesDB.id,
          coursesDB.name,
          coursesDB.lessons,
          coursesDB.created_at
        )
    );

    return courses;
  };

  public createCourse = async (input: any) => {
    const { id, name, lessons } = input;

    if (typeof id !== "string") {
      throw new BadRequestError("'id' deve ser string");
    }

    if (typeof name !== "string") {
      throw new BadRequestError("'name' deve ser string");
    }

    if (typeof lessons !== "string") {
      throw new BadRequestError("'lessons' deve ser string");
    }

    const courseDatabase = new CoursesDatabase();
    const courseDBExists = await courseDatabase.findCourseById(id);

    if (courseDBExists) {
      throw new BadRequestError("'id' já existe");
    }

    const newCourse = new Course(
      id,
      name,
      lessons,
      format(new Date(), "yyyy-MM-dd'|'HH:mm:ss")
    );
    
    const newCourseDB: CoursesDB = {
      id: newCourse.getId(),
      name: newCourse.getName(),
      lessons: newCourse.getLessons(),
      created_at: newCourse.getCreatedAt(),
    };

    await courseDatabase.insertCourse(newCourseDB);

    const output = {
      message: "Curso Registrado com Sucesso",
      course: newCourse,
    };

    return output;
  };

  public deleteCourse = async (id: string) => {
    const courseDatabase = new CoursesDatabase();
    const courseDBExists = await courseDatabase.findCourseById(id);

    if (!courseDBExists) {
      throw new BadRequestError("Curso não encontrado");
    }

    await courseDatabase.deleteCourse(id);

    const output = {
      message: "Curso deletado com sucesso",
    };

    return output;
  };

  public updateCourse = async (id: string, input: any) => {
    const { name, lessons } = input;

    if (name !== undefined) {
      if (typeof name !== "string") {
        throw new BadRequestError("'name' deve ser string");
      }
    }

    if (lessons !== undefined) {
      if (typeof lessons !== "string") {
        throw new BadRequestError("'lessons' deve ser string");
      }
    }

    const courseDatabase = new CoursesDatabase();
    const courseDBExists = await courseDatabase.findCourseById(id);

    if (!courseDBExists) {
      throw new BadRequestError("Curso não encontrado Verfique o ID Passado");
    }

    if (name !== undefined) {
      const courseByName = await courseDatabase.findCourseByName(name);
      if (courseByName && courseByName.id !== id) {
        throw new BadRequestError(
          `O curso com o nome '${name}' já existe no sistema.`
        );
      }
    }

    const updatedCourse = new Course(
      id,
      name ? courseDBExists.name : name,
      lessons ? courseDBExists.lessons : lessons,
      format(new Date(), "yyyy-MM-dd'|'HH:mm:ss")
    );

    const updatedCourseDB: CoursesDB = {
      id: updatedCourse.getId(),
      name: updatedCourse.getName(),
      lessons: updatedCourse.getLessons(),
      created_at: updatedCourse.getCreatedAt(),
    };

    await courseDatabase.updateUserById(id, updatedCourseDB);

    const output = {
      message: "Curso atualizado com sucesso",
      course: updatedCourse,
    };

    return output;
  };
}
