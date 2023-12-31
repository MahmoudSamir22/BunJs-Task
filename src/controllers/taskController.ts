import { Elysia } from "elysia";
import taskService from "../services/taskService";
import type { TaskType } from "../types/taskType";
import response from "../libs/response";

export const taskController = (app: Elysia) =>
  app.group("/tasks", (router) =>
    router
      .post(
        "/",
        async ({ body, set }) => {
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
        }
      )
      .get(
        "/",
        async () => {
          const tasks = await taskService.getTasks();
          return {
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
        async ({ params }) => {
          const task = await taskService.getTask(params.id);
          return {
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
        async ({ params, body }) => {
          const task = await taskService.updateTask(
            params.id,
            body as TaskType
          );
          return {
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
        }
      )
      .delete(
        "/:id",
        async ({ params }) => {
          const task = await taskService.deleteTask(params.id);
          return {
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
