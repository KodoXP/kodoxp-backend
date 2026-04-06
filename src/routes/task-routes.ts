import { TaskController } from "@/controllers/task-controller";
import { TaskService } from "@/services/task-service";
import { TaskRepository } from "@/repositories/task-repository";
import { validateSchema } from "@/middlewares/validate-schema";
import { findByIdSchema, deleteSchema, createTaskSchema } from "@/schemas/task-schemas";
import { Router } from "express";

const router = Router();
const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const controller = new TaskController(taskService);

router.get("/", controller.findAll.bind(controller));
router.get("/:id", validateSchema(findByIdSchema, "params"), controller.findById.bind(controller));
router.post("/", validateSchema(createTaskSchema, "body"), controller.create.bind(controller));
router.delete("/:id", validateSchema(deleteSchema, "params"), controller.delete.bind(controller));

export default router;
