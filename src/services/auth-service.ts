import { UsersAttributes, UsersCreate } from "@/dtos/user-dto";
import { ArgonService } from "./argon-service";
import { UserService } from "./user-service";
import { UserRepository } from "@/repositories/user-repository";
import { LoginDTO } from "@/dtos/auth-dto";
import { BadRequestError, UnauthorizedError } from "@/exceptions";

export class AuthService {
  private readonly argonService: ArgonService;
  private readonly userService: UserService;

  constructor(
    argonService = new ArgonService(),
    userService = new UserService(new UserRepository()),
  ) {
    this.argonService = argonService;
    this.userService = userService;
  }

  public async register(payload: UsersCreate): Promise<UsersAttributes> {
    try {
      const passwordHashed = await this.argonService.hash(payload.password);
      const user = await this.userService.create({
        ...payload,
        password: passwordHashed,
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  public async login(payload: LoginDTO): Promise<string> {
    try {
      const user = await this.userService.findByEmail(payload.email);
      const hashVerify = await this.argonService.verify(payload.password, user.password);
      if (!hashVerify) {
        throw new UnauthorizedError(`Incorrect password or email address`);
      }
      return "";
    } catch (error) {
      throw error;
    }
  }
}
