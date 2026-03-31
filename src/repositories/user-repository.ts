import User from "@/models/user";

export class UserRepository {
  public async findAll(): Promise<User[]> {
    return await User.findAll();
  }

  public async findById(id: string): Promise<User | null> {
    return await User.findOne({
      where: { id },
    });
  }
}
