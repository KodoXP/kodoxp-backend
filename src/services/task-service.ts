import { NotFoundError } from "@/exceptions";
import { TasksAttributes, TasksCreate } from "@/dtos/tasks-dto";
import { TaskRepository } from "@/repositories/task-repository";

export class TaskService {
  constructor(private readonly tasksRespository: TaskRepository) {}

  public async findById(id: string): Promise<TasksAttributes> {
    const tasks = await this.tasksRespository.findById(id);
    if (!tasks) {
      throw new NotFoundError(`Task with ID ${id} was not found.`);
    }
    return tasks;
  }

  public async findAll(): Promise<TasksAttributes[]> {
    return await this.tasksRespository.findAll();
  }

  public async create(request: TasksCreate): Promise<TasksAttributes> {
    return await this.tasksRespository.create(request);
  }

  public async delete(id: string): Promise<boolean> {
    const foundedTask = await this.tasksRespository.findById(id);
    if (!foundedTask) {
      throw new NotFoundError(`Task with ID ${id} was not found.`);
    }
    return await this.tasksRespository.delete(id);
  }
}
