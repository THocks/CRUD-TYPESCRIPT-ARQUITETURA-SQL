import { CoursesDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class CoursesDatabase extends BaseDatabase {
    public static TABLE_COURSES = "courses"


    // PROCURAR CURSO
    public async findCourses(q: string | undefined) {
        let CoursesDB

        if (q) {
            const result: CoursesDB[] = await BaseDatabase
                .connection(CoursesDatabase.TABLE_COURSES)
                .where("name", "LIKE", `%${q}%`)

                CoursesDB = result
        } else {
            const result: CoursesDB[] = await BaseDatabase
                .connection(CoursesDatabase.TABLE_COURSES)

                CoursesDB = result
        }

        return CoursesDB
    }

    //PROCURAR CURSO ID
    public async findCourseById(id: string) {
        const [ CoursesDB ]: CoursesDB[] | undefined[] = await BaseDatabase
            .connection(CoursesDatabase.TABLE_COURSES)
            .where({ id })

        return CoursesDB
    }
    
    // VERIFICAR NAME DO CURSO
    public async findCourseByName(name: string) {
        const [ CoursesDB ]: CoursesDB[] | undefined[] = await BaseDatabase
            .connection(CoursesDatabase.TABLE_COURSES)
            .where({ name })

        return CoursesDB
    }

    //INSERIR UM NOVO CURSO
    public async insertCourse(newCourseDB: CoursesDB) {
        await BaseDatabase
            .connection(CoursesDatabase.TABLE_COURSES)
            .insert(newCourseDB)
    }

    // DELETE UM CURSO

    public async deleteCourse(id: string) {
        await BaseDatabase
            .connection(CoursesDatabase.TABLE_COURSES)
            .where({ id })
            .delete()
    }

    // UPDATE CURSO 

    public async updateUserById(id: string, updateCourseDB: CoursesDB) {
        await BaseDatabase
            .connection(CoursesDatabase.TABLE_COURSES)
            .where({ id })
            .update(updateCourseDB)
    }
}
