import { GivePoints, RemovePoints, UsersAttributes, UsersCreate } from "@/dtos/user-dto";
import { ConflictError, NotFoundError } from "@/exceptions";
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

  public async findAll(): Promise<UsersAttributes[]> {
    return this.userRepository.findAll();
  }

  public async create(request: UsersCreate): Promise<UsersAttributes> {
    const existsByEmail = await this.userRepository.existsByEmail(request.email);
    if (existsByEmail) {
      throw new ConflictError(`There is already a user registered with this email address.`);
    }
    return this.userRepository.create(request);
  }

  public async findByEmail(email: string): Promise<UsersAttributes> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundError(`User with email "${email}" was not found.`);
    }
    return user;
  }

  public async deactivate(id: string): Promise<void> {
    const wasDeactivated = await this.userRepository.desactive(id);
    if (!wasDeactivated) {
      throw new NotFoundError(`User with ID "${id}" was not found or is already inactive.`);
    }
  }

  public async getPoints(id: string): Promise<number> {
    const points = await this.userRepository.getPoints(id);

    if (!points) {
      throw new NotFoundError(`User with ID "${id}" was not found`);
    }

    return points;
  }

  public async givePoints(payload: GivePoints) {
    const affectedCount = await this.userRepository.givePoints(payload);

    if (!affectedCount || affectedCount < 1) {
      throw new NotFoundError(`User with ID "${payload.id}" was not found`);
    }

    return await this.getPoints(payload.id);
  }

  public async removePoints(payload: RemovePoints) {
    const affectedCount = await this.userRepository.removePoints(payload);

    if (!affectedCount || affectedCount < 1) {
      throw new NotFoundError(`User with ID "${payload.id}" was not found`);
    }

    return await this.getPoints(payload.id);
  }
}
