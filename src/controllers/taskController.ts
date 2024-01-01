import { Elysia } from "elysia";
import taskService from "../services/taskService";
import type { TaskType } from "../types/taskType";
import response from "../libs/response";
import { taskModel } from "../validations/taskValidation";
import type { CommonResponseType } from "../types/response.d.ts";

export const taskController = (app: Elysia) =>
  app.group("/tasks", (router) =>
    router
      .use(taskModel)
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
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      title: {
                        type: "string",
                      },
                      description: {
                        type: "string",
                      },
                      due_date: {
                        type: "string",
                        format: "date",
                      },
                    },
                    required: ["title"],
                  },
                },
              },
            },
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
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      title: {
                        type: "string",
                      },
                      description: {
                        type: "string",
                      },
                      due_date: {
                        type: "string",
                        format: "date",
                      },
                    },
                    required: ["title"],
                  },
                },
              },
            },
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
          },
        }
      )
  );
