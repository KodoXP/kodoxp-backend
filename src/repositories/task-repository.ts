import { TasksCreate } from "@/dtos/tasks-dto";
import Tasks from "@/models/tasks";

export class TaskRepository {
  public async create(create: TasksCreate): Promise<Tasks> {
    return await Tasks.create(create);
  }

  public async findAll(): Promise<Tasks[]> {
    return await Tasks.findAll();
  }

  public async findById(id: string): Promise<Tasks | null> {
    return await Tasks.findOne({
      where: { id },
    });
  }

  public async delete(id: string): Promise<boolean> {
    const deletedTask = await Tasks.destroy({
      where: { id },
    });

    return deletedTask >= 1;
  }
}
