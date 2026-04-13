import { Router } from "express";
import healthRouters from "@/routes/health-routes";
import userRouters from "@/routes/user-routes";
import rewardRoutes from "@/routes/reward-routes";
import authRoutes from "@/routes/auth-routes";

const router = Router();

router.use(healthRouters);
router.use("/users", userRouters);
router.use("/rewards", rewardRoutes);
router.use("/auth", authRoutes);
export default router;
