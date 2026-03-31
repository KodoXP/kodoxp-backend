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
}
