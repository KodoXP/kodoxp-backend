import { Request, Response, NextFunction } from "express";
import { AppError } from "@/exceptions/AppError";

export function globalErrorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      code: error.errorCode,
      message: error.message,
      details: error.details,
    });
  }

  console.error("UNHANDLED CRITICAL ERROR:", error);

  return res.status(500).json({
    status: "error",
    code: "INTERNAL_SERVER_ERROR",
    message: "Internal server error. Please try again later.",
  });
}
