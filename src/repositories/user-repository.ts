import { GivePoints, UsersCreate } from "@/dtos/user-dto";
import User from "@/models/user";
type IncrementResult = [User[], number];
export class UserRepository {
  public async create(create: UsersCreate): Promise<User> {
    return await User.create(create);
  }

  public async findAll(): Promise<User[]> {
    return await User.findAll();
  }

  public async findById(id: string): Promise<User | null> {
    return await User.findOne({
      where: { id },
    });
  }

  public async existsByEmail(email: string): Promise<boolean> {
    const count = await User.count({
      where: { email },
    });

    return count > 0;
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await User.findOne({
      where: { email },
    });
  }

  public async desactive(id: string): Promise<boolean> {
    const [affectedRows] = await User.update(
      { is_active: false },
      { where: { id, is_active: true } },
    );

    return affectedRows > 0;
  }

  public async getPoints(id: string): Promise<number | undefined> {
    const user = await User.findOne({
      where: { id },
    });

    return user?.points;
  }

  public async givePoints(payload: GivePoints): Promise<number> {
    const [, affectedCount] = (await User.increment("points", {
      by: payload.points,
      where: { id: payload.id },
    })) as IncrementResult;

    return affectedCount ?? 0;
  }

  public async removePoints(payload: GivePoints): Promise<number> {
    const [, affectedCount] = (await User.decrement("points", {
      by: payload.points,
      where: { id: payload.id },
    })) as IncrementResult;

    return affectedCount ?? 0;
  }
}
