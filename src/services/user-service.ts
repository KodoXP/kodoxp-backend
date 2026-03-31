import { UsersAttributes } from "@/dtos/user-dto";
import { NotFoundError } from "@/exceptions";
import { UserRepository } from "@/repositories/user-repository";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async findById(id: string): Promise<UsersAttributes> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundError(`User with ID ${id} was not found.`);
    }

    return user;
  }
}
