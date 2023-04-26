import express from 'express'
import { CourseController } from '../controller/CourseController'

export  const useRouter = express.Router()

const courseController = new CourseController()

useRouter.get("/", courseController.getCourses)
useRouter.post("/", courseController.createCourses)
useRouter.delete("/:id", courseController.deleteCourse)
useRouter.put("/:id",courseController.updateCourse)