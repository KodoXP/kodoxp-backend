import { JwtPayload } from "jsonwebtoken";

export type TokenType = "access" | "refresh";

export interface TokenPayload {
  sub: string;
  email: string;
  type: TokenType;
  jti: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface DecodedToken extends Omit<TokenPayload, "jti" | "sub">, JwtPayload {
  sub: string;
  jti: string;
}
