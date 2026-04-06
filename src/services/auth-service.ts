import { UsersAttributes, UsersCreate } from "@/dtos/user-dto";
import { ArgonService } from "./argon-service";
import { UserService } from "./user-service";
import { JwtService } from "./jwt-service";
import { UserRepository } from "@/repositories/user-repository";
import { LoginDTO } from "@/dtos/auth-dto";
import { TokenPair } from "@/dtos/jwt-dto";
import { UnauthorizedError } from "@/exceptions";

export class AuthService {
  private readonly argonService: ArgonService;
  private readonly userService: UserService;
  private readonly jwtService: JwtService;

  constructor(
    argonService = new ArgonService(),
    userService = new UserService(new UserRepository()),
    jwtService = new JwtService(),
  ) {
    this.argonService = argonService;
    this.userService = userService;
    this.jwtService = jwtService;
  }

  public async register(payload: UsersCreate): Promise<UsersAttributes> {
    const passwordHashed = await this.argonService.hash(payload.password);
    return this.userService.create({ ...payload, password: passwordHashed });
  }

  public async login(payload: LoginDTO): Promise<TokenPair> {
    const user = await this.userService.findByEmail(payload.email);

    const isPasswordValid = await this.argonService.verify(payload.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError("Incorrect email or password.");
    }

    return this.jwtService.generateTokenPair({
      sub: user.id,
      email: user.email,
    });
  }

  public async refresh(refreshToken: string): Promise<TokenPair> {
    return this.jwtService.rotate(refreshToken);
  }
}
