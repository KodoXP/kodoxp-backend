import { UserController } from "@/controllers/user-controller";
import { validateSchema } from "@/middlewares/validate-schema";
import { UserRepository } from "@/repositories/user-repository";
import { createUserSchema, findById } from "@/schemas/user-schemas";
import { UserService } from "@/services/user-service";
import { Router } from "express";

const router = Router();
const userRepostiory = new UserRepository();
const userService = new UserService(userRepostiory);
const controller = new UserController(userService);

router.get("/users/:id", validateSchema(findById, "params"), controller.findById.bind(controller));
router.post(
  "/users/",
  validateSchema(createUserSchema, "body"),
  controller.create.bind(controller),
);

export default router;
