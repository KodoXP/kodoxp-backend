import { Request, Response, NextFunction } from "express";
import { AuthService } from "@/services/auth-service";

export class AuthController {
  constructor(private readonly authService = new AuthService()) {}

  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.authService.register(req.body);

      res.status(201).json({
        message: "User registered successfully.",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { accessToken, refreshToken } = await this.authService.login(req.body);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7 * 1000,
      });

      res.status(200).json({
        message: "Login successful.",
        data: { accessToken },
      });
    } catch (error) {
      next(error);
    }
  }

  public async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies?.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({
          message: "Refresh token not found.",
          errorCode: "TOKEN_MISSING",
        });
      }

      const { accessToken, refreshToken: newRefreshToken } =
        await this.authService.refresh(refreshToken);

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7 * 1000,
      });

      res.status(200).json({
        message: "Token refreshed successfully.",
        data: { accessToken },
      });
    } catch (error) {
      next(error);
    }
  }

  public async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie("refreshToken", { path: "/" });
      res.status(200).json({ message: "Logged out successfully." });
    } catch (error) {
      next(error);
    }
  }
}
