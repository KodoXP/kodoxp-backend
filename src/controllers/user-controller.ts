import { UserService } from "@/services/user-service";
import { Request, Response, NextFunction } from "express";

export class UserController {
  constructor(private readonly userService: UserService) {}

  public async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await this.userService.findById(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  public async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.findAll();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  public async findByEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.params;
      const user = await this.userService.findByEmail(email);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userService.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  public async deactivate(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.userService.deactivate(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  public async getPoints(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const points = await this.userService.getPoints(id);
      res.status(200).json({ points });
    } catch (error) {
      next(error);
    }
  }

  public async givePoints(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { points } = req.body;
      const updatedPoints = await this.userService.givePoints({ id, points });
      res.status(200).json({ points: updatedPoints });
    } catch (error) {
      next(error);
    }
  }

  public async removePoints(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { points } = req.body;
      const updatedPoints = await this.userService.removePoints({ id, points });
      res.status(200).json({ points: updatedPoints });
    } catch (error) {
      next(error);
    }
  }
}
