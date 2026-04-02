import { RewardService } from "@/services/reward-service";
import { Request, Response, NextFunction } from "express";

export class RewardController {
  constructor(private readonly rewardsService: RewardService) {}

  public async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const reward = await this.rewardsService.findById(id);
      res.status(200).json(reward);
    } catch (error) {
      next(error);
    }
  }

  public async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const rewards = await this.rewardsService.findAll();
      res.status(200).json(rewards);
    } catch (error) {
      next(error);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const reward = await this.rewardsService.create(req.body);
      res.status(201).json(reward);
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction){
    try{
        const { id } = req.params;
        await this.rewardsService.delete(id);
        res.status(204).send()
    } catch (error){
        next(error)
    }
  }
}
