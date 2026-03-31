import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validateSchema =
  (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.params);
      next();
    } catch (err: any) {
      return res.status(400).json({ error: err.errors || "Invalid request" });
    }
  };
