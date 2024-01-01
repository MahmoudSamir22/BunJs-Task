import Task from "../models/taskModel";
import type { TaskType } from "../types/taskType";

class TaskService {
  async createTask(data: TaskType): Promise<TaskType> {
    const task = await Task.create(data);
    return task;
  }
  async getTasks(): Promise<TaskType[]> {
    const tasks = await Task.find();
    return tasks;
  }
  async getTask(id: string): Promise<TaskType> {
    const task = await Task.findById(id);
    if(!task) throw new Error("Task not found");
    return task;
  }
  async updateTask(id: string, data: TaskType): Promise<TaskType> {
    const task = await Task.findByIdAndUpdate(id, data, { new: true });
    if(!task) throw new Error("Task not found");
    return task;
  }
  async deleteTask(id: string): Promise<TaskType> {
    const task = await Task.findById(id);
    if(!task) throw new Error("Task not found");
    await Task.findByIdAndDelete(id);
    return task;
  }
}

const taskService = new TaskService();
export default taskService;
