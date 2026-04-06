import { NotFoundError } from "@/exceptions";
import { TasksAttributes, TasksCreate } from "@/dtos/tasks-dto";
import { TaskRepository } from "@/repositories/task-repository";

export class TaskService {
  constructor(private readonly taskRespository: TaskRepository) {}

  public async findById(id: string): Promise<TasksAttributes> {
    const task = await this.taskRespository.findById(id);
    if (!task) {
      throw new NotFoundError(`Task with ID ${id} was not found.`);
    }
    return task;
  }

  public async findAll(): Promise<TasksAttributes[]> {
    return await this.taskRespository.findAll();
  }

  public async create(request: TasksCreate): Promise<TasksAttributes> {
    return await this.taskRespository.create(request);
  }

  public async delete(id: string): Promise<boolean> {
    const foundTask = await this.taskRespository.findById(id);
    if (!foundTask) {
      throw new NotFoundError(`Task with ID ${id} was not found.`);
    }
    return await this.taskRespository.delete(id);
  }
}
