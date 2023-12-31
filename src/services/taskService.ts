import Task from "../models/taskModel";
import type { TaskType } from "../types/taskType";

class TaskService {
  async createTask(data: TaskType) {
    const task = await Task.create(data);
    return task;
  }
  async getTasks() {
    const tasks = await Task.find();
    return tasks;
  }
  async getTask(id: string) {
    const task = await Task.findById(id);
    return task;
  }
  async updateTask(id: string, data: TaskType) {
    const task = await Task.findByIdAndUpdate(id, data, { new: true });
    return task;
  }
  async deleteTask(id: string) {
    const task = await Task.findByIdAndDelete(id);
    return task;
  }
}

const taskService = new TaskService();
export default taskService;
