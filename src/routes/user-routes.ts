import { UserController } from "@/controllers/user-controller";
import { validateSchema } from "@/middlewares/validate-schema";
import { UserRepository } from "@/repositories/user-repository";
import {
  createUserSchema,
  deactivateSchema,
  findByEmailSchema,
  findByIdSchema,
} from "@/schemas/user-schemas";
import { UserService } from "@/services/user-service";
import { Router } from "express";

const router = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const controller = new UserController(userService);

router.get("/", controller.findAll.bind(controller));
router.get("//:id", validateSchema(findByIdSchema, "params"), controller.findById.bind(controller));
router.get(
  "/email/:email",
  validateSchema(findByEmailSchema, "params"),
  controller.findByEmail.bind(controller),
);
router.post("/users", validateSchema(createUserSchema, "body"), controller.create.bind(controller));
router.patch(
  "/:id/deactivate",
  validateSchema(deactivateSchema, "params"),
  controller.deactivate.bind(controller),
);

export default router;
