import { Elysia } from "elysia";
import taskService from "../services/taskService";
import response from "../libs/response";
import { taskModel } from "../validations/taskValidation";
import authMiddleware from "../middlewares/authMiddleware.ts";
import type { TaskType } from "../types/taskType";
import type { CommonResponseType } from "../types/response.d.ts";

export const taskController = (app: Elysia) =>
  app.group("/tasks", (router) =>
    router
      .use(taskModel)
      .use(authMiddleware)
      .post(
        "/",
        async ({ body, set }): Promise<CommonResponseType<TaskType>> => {
          const task = await taskService.createTask(body as TaskType);
          set.status = "Created";
          return response({
            status: true,
            message: "Task created",
            data: task,
          });
        },
        {
          detail: {
            tags: ["Tasks"],
            security: [
              {
                bearerAuth: [],
              },
            ],
          },
          body: "createTask",
        }
      )
      .get(
        "/",
        async (): Promise<CommonResponseType<TaskType[]>> => {
          const tasks = await taskService.getTasks();
          return {
            status: true,
            message: "Tasks retrieved",
            data: tasks,
          };
        },
        {
          detail: {
            tags: ["Tasks"],
            security: [
              {
                bearerAuth: [],
              },
            ],
          },
        }
      )
      .get(
        "/:id",
        async ({ params }): Promise<CommonResponseType<TaskType>> => {
          const task = await taskService.getTask(params.id);
          return {
            status: true,
            message: "Task retrieved",
            data: task,
          };
        },
        {
          detail: {
            tags: ["Tasks"],
            security: [
              {
                bearerAuth: [],
              },
            ],
          },
        }
      )
      .put(
        "/:id",
        async ({ params, body }): Promise<CommonResponseType<TaskType>> => {
          const task = await taskService.updateTask(
            params.id,
            body as TaskType
          );
          return {
            status: true,
            message: "Task updated",
            data: task,
          };
        },
        {
          detail: {
            tags: ["Tasks"],
            security: [
              {
                bearerAuth: [],
              },
            ],
          },
          body: "updateTask",
        }
      )
      .delete(
        "/:id",
        async ({ params }): Promise<CommonResponseType<TaskType>> => {
          const task = await taskService.deleteTask(params.id);
          return {
            status: true,
            message: "Task deleted",
            data: task,
          };
        },
        {
          detail: {
            tags: ["Tasks"],
            security: [
              {
                bearerAuth: [],
              },
            ],
          },
        }
      )
  );
