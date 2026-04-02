import { Router } from "express";
import healthRouters from "@/routes/health";
import userRouters from "@/routes/user-routes";
import rewardRoutes from "@/routes/reward-routes";
const router = Router();

router.use(healthRouters);
router.use("/users", userRouters);
router.use("/rewards", rewardRoutes);

export default router;
