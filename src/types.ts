export interface CoursesDB {
    id: string,
    name: string,
    lessons: string,
    created_at: string

}

// tipagem para criação (POST) sem created_at
export interface CoursesDBPost {
    id: string,
    name: string,
    lessons: string,
   
}

