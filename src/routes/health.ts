import { Router } from "express";
import { Request, Response } from "express";

const router = Router();

router.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "API IS RUNNING !",
    uptime: process.uptime(),
    timeStamp: new Date().toISOString(),
  });
});

export default router;
