import { Elysia } from "elysia";
import taskService from "../services/taskService";
import type { TaskType } from "../types/taskType";

export const taskController = (app: Elysia) =>
  app.group("/tasks", (router) =>
    router
      .post("/", async ({ body }) => {
        const task = await taskService.createTask(body as TaskType);
        return {
          message: "Task created",
          data: task,
        };
      })
      .get("/", async () => {
        const tasks = await taskService.getTasks();
        return {
          message: "Tasks retrieved",
          data: tasks,
        };
      })
  );
