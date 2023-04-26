import { Request, Response } from "express";
import { CourseBusiness } from "../business/courseBusiness";
import { BaseError } from "../erros/BaseError";

export class CourseController {

  public getCourses = async (req: Request, res: Response) => {
    try {
      const q = req.query.q as string | undefined;

      const userBusiness = new CourseBusiness();
      const output = await userBusiness.getCourse(q);

      res.status(200).send(output);
    } catch (error) {
      console.log(error);

      if (res.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };

  public createCourses = async (req: Request, res: Response) => {
    try {
      const input = {
        id: req.body.id,
        name: req.body.name,
        lessons: req.body.lessons,
      };

      const courserBusiness = new CourseBusiness();
      const output = await courserBusiness.createCourse(input);

      res.status(201).send(output);
    } catch (error) {
      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message); 
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };


  public deleteCourse = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const courseBusiness = new CourseBusiness();
      await courseBusiness.deleteCourse(id);

      res.status(200).send("Curso deletado com sucesso");
    } catch (error) {
      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
  

  public updateCourse = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const input = {
        name: req.body.name,
        lessons: req.body.lessons,
      };

      const courseBusiness = new CourseBusiness();
      const output = await courseBusiness.updateCourse(id, input);

      res.status(200).send(output);
    } catch (error) {
     
      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

}
