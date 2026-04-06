import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

type Target = "body" | "params" | "query" | "cookies";

export const validateSchema =
  (schema: ZodSchema, target: Target = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const validData = schema.parse(req[target]);
      req[target] = validData;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          message: "Validation Error",
          errors: err.flatten().fieldErrors,
        });
      }

      next(err);
    }
  };
