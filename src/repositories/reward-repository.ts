import { RewardCreate } from "@/dtos/rewards-dto";
import Rewards from "@/models/rewards";

export class RewardRepository {
    public async create(create: RewardCreate): Promise<Rewards> {
        return await Rewards.create(create);
    }

    public async findAll(): Promise<Rewards[]> {
        return await Rewards.findAll();
    }

    public async findById(id: string): Promise<Rewards | null> {
        return await Rewards.findOne({
            where: { id },
        });
    }

    public async delete(id: string): Promise<boolean> {
        const destroyedReward = await Rewards.destroy({
            where: { id },
        });

        return destroyedReward === 1
    }
}


