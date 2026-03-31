import { UsersAttributes, UsersCreate } from "@/dtos/user-dto";
import { BadRequestError, ConflictError, NotFoundError } from "@/exceptions";
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
    const users = await this.userRepository.findAll();
    if (!users) {
      return [];
    }
    return users;
  }

  public async create(request: UsersCreate): Promise<UsersAttributes> {
    if (!request) {
      throw new BadRequestError(`Payload is empty`);
    }
    const existsByEmail = await this.userRepository.existsByEmail(request.email);
    if (existsByEmail) {
      throw new ConflictError(`There is already a person registered with this email address`);
    }

    const create = await this.userRepository.create(request);
    return create;
  }
}
