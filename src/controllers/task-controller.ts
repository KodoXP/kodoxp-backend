import { TaskService } from "@/services/task-service";
import { Request, Response, NextFunction } from "express";

export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  public async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const task = await this.taskService.findById(id);
      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  }

  public async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const tasks = await this.taskService.findAll();
      res.status(200).json(tasks);
    } catch (error) {
      next(error);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await this.taskService.create(req.body);
      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.taskService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
