import { Router } from "express";
import { AuthController } from "@/controllers/auth-controller";
import { validateSchema } from "@/middlewares/validate-schema";
import { loginSchema, registerSchema, refreshSchema } from "@/schemas/auth-schemas";

const router = Router();
const controller = new AuthController();

router.post(
  "/register",
  validateSchema(registerSchema, "body"),
  controller.register.bind(controller),
);

router.post("/login", validateSchema(loginSchema, "body"), controller.login.bind(controller));

router.post(
  "/refresh",
  validateSchema(refreshSchema, "cookies"),
  controller.refresh.bind(controller),
);

router.post("/logout", controller.logout.bind(controller));

export default router;
