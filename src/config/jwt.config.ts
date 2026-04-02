import { SignOptions } from "jsonwebtoken";

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `Missing required environment variable: "${key}". ` +
        `Ensure it is set before starting the application.`,
    );
  }
  return value;
}

export interface JwtTokenConfig {
  secret: string;
  expiresIn: SignOptions["expiresIn"];
}

export interface JwtConfig {
  access: JwtTokenConfig;
  refresh: JwtTokenConfig;
  issuer: string;
  audience: string;
}

export const jwtConfig: JwtConfig = {
  access: {
    secret: requireEnv("JWT_ACCESS_SECRET"),
    expiresIn: (process.env.JWT_ACCESS_EXPIRES_IN ?? "15m") as SignOptions["expiresIn"],
  },
  refresh: {
    secret: requireEnv("JWT_REFRESH_SECRET"),
    expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN ?? "7d") as SignOptions["expiresIn"],
  },
  issuer: process.env.JWT_ISSUER ?? "api",
  audience: process.env.JWT_AUDIENCE ?? "client",
};
