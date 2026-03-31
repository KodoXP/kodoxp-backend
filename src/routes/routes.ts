import { Router } from "express";
import healthRouters from "@/routes/health";
import userRouters from "@/routes/user-routes";
const router = Router();

router.use(healthRouters);
router.use(userRouters);

export default router;
