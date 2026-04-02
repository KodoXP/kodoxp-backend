import { jwtConfig } from "@/config/jwt.config";

export class JwtService {
  constructor(private readonly config = jwtConfig) {}
}
