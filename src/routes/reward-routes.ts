import { Router } from "express";
import { RewardRepository } from "@/repositories/reward-repository";
import { RewardService } from "@/services/reward-service";
import { RewardController } from "@/controllers/reward-controller";
import { validateSchema } from "@/middlewares/validate-schema";
import { findByIdSchema, deleteSchema, createRewardSchema } from "@/schemas/reward-schemas";

const router = Router();
const rewardRepository = new RewardRepository();
const rewardService = new RewardService(rewardRepository);
const controller = new RewardController(rewardService);

router.get("/rewards", controller.findAll.bind(controller));
router.get(
  "/rewards/:id",
  validateSchema(findByIdSchema, "params"),
  controller.findById.bind(controller),
);
router.post(
  "/rewards",
  validateSchema(createRewardSchema, "body"),
  controller.create.bind(controller),
);
router.delete(
  "/rewards/:id",
  validateSchema(deleteSchema, "params"),
  controller.delete.bind(controller),
);

export default router;
