import crypto from "crypto";
import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";

import { jwtConfig } from "@/config/jwt.config";
import { DecodedToken, TokenPair, TokenPayload, TokenType } from "@/dtos/jwt-dto";
import { AppError } from "@/exceptions/AppError";
import {
  BadRequestError,
  InternalServerError,
  TokenExpiredError,
  TokenInvalidError,
} from "@/exceptions";

export class JwtService {
  constructor(private readonly config = jwtConfig) {}

  public generateTokenPair(payload: Omit<TokenPayload, "type" | "jti">): TokenPair {
    const accessToken = this.sign({ ...payload, type: "access" });
    const refreshToken = this.sign({ ...payload, type: "refresh" });

    return { accessToken, refreshToken };
  }

  public sign(payload: Omit<TokenPayload, "jti">): string {
    const { secret, expiresIn } = this.config[payload.type];

    const { sub, ...customClaims } = payload;
    const jti = crypto.randomUUID();

    const options: SignOptions = {
      expiresIn,
      issuer: this.config.issuer,
      audience: this.config.audience,
      subject: sub,
      jwtid: jti,
    };

    try {
      return jwt.sign(customClaims, secret, options);
    } catch (error) {
      throw new InternalServerError("Failed to sign JWT token.", {
        originalMessage: error instanceof Error ? error.message : String(error),
      });
    }
  }

  public verify(token: string, expectedType: TokenType): DecodedToken {
    if (!token || typeof token !== "string") {
      throw new BadRequestError("Token must be a non-empty string.");
    }

    const { secret } = this.config[expectedType];

    const options: VerifyOptions = {
      issuer: this.config.issuer,
      audience: this.config.audience,
    };

    try {
      const decoded = jwt.verify(token, secret, options) as DecodedToken;

      if (decoded.type !== expectedType) {
        throw new TokenInvalidError(
          `Expected a "${expectedType}" token but received a "${decoded.type}" token.`,
          { expectedType, receivedType: decoded.type },
        );
      }

      return decoded;
    } catch (error) {
      if (error instanceof AppError) throw error;

      if (error instanceof jwt.TokenExpiredError) {
        throw new TokenExpiredError("Token has expired.", {
          expiredAt: error.expiredAt,
        });
      }

      if (error instanceof jwt.JsonWebTokenError) {
        throw new TokenInvalidError("Token is invalid or malformed.", {
          originalMessage: error.message,
        });
      }

      if (error instanceof jwt.NotBeforeError) {
        throw new TokenInvalidError("Token is not yet valid.", {
          date: error.date,
        });
      }

      throw new InternalServerError("Unexpected error during token verification.", {
        originalMessage: error instanceof Error ? error.message : String(error),
      });
    }
  }

  public decode(token: string): DecodedToken {
    if (!token || typeof token !== "string") {
      throw new BadRequestError("Token must be a non-empty string.");
    }

    const decoded = jwt.decode(token) as DecodedToken | null;

    if (!decoded) {
      throw new TokenInvalidError("Failed to decode token. It may be malformed.");
    }

    return decoded;
  }

  public rotate(refreshToken: string): TokenPair {
    const decoded = this.verify(refreshToken, "refresh");

    return this.generateTokenPair({
      sub: decoded.sub,
      email: decoded.email,
    });
  }

  public extractJti(token: string): string {
    const decoded = this.decode(token);

    if (!decoded.jti) {
      throw new TokenInvalidError("Token does not contain a JTI claim.");
    }

    return decoded.jti;
  }
}
