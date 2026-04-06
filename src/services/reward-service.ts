import { RewardAttributes, RewardCreate } from "@/dtos/rewards-dto";
import { NotFoundError } from "@/exceptions";
import { RewardRepository } from "@/repositories/reward-repository";
import Rewards from "@/models/rewards";

export class RewardService {
  constructor(private readonly rewardsRepository: RewardRepository) {}

  public async create(request: RewardCreate): Promise<RewardAttributes> {
    return await this.rewardsRepository.create(request);
  }

  public async findAll(): Promise<RewardAttributes[]> {
    return await this.rewardsRepository.findAll();
  }

  public async findById(id: string): Promise<RewardAttributes> {
    const reward = await this.rewardsRepository.findById(id);
    if (!reward) {
      throw new NotFoundError(`Reward with ID ${id} was not found.`);
    }
    return reward;
  }

  public async delete(id: string): Promise<boolean> {
    const foundReward = await this.rewardsRepository.findById(id);
    if (!foundReward) {
      throw new NotFoundError(`Reward with ID ${id} was not found.`);
    }
    return await this.rewardsRepository.delete(id);
  }
}
