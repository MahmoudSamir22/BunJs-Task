import { Elysia } from "elysia";
import response from "../libs/response";
import authServices from "../services/authService";
import type { UserType, LoginType } from "../types/userType";
import { jwt } from "@elysiajs/jwt";
import authMiddleware from "../middlewares/authMiddleware";

export const authController = (app: Elysia) =>
  app.group("/auth", (router) =>
    router
      .post(
        "/signup",
        async ({ body, set }) => {
          const user = await authServices.signUp(body as UserType);
          set.status = "Created";
          return response({
            status: true,
            message: "User created",
            data: user,
          });
        },
        {
          detail: {
            tags: ["Auth"],
            requestBody: {
              content: {
                "multipart/form-data": {
                  schema: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string",
                      },
                      email: {
                        type: "string",
                      },
                      password: {
                        type: "string",
                      },
                      avatar: {
                        type: "string",
                      },
                    },
                    required: ["name", "email", "password"],
                  },
                },
              },
            },
          },
        }
      )
      .use(
        jwt({
          name: "jwt",
          secret: process.env.JWT_SECRET!,
        })
      )
      .post(
        "/login",
        async ({ body, set, jwt }) => {
          const user = await authServices.login(body as LoginType);
          const token = await jwt.sign({ id: user._id.toString() });
          set.status = "OK";
          return response({
            status: true,
            message: "User logged in",
            data: { token, user },
          });
        },
        {
          detail: {
            tags: ["Auth"],
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      email: {
                        type: "string",
                      },
                      password: {
                        type: "string",
                      },
                    },
                    required: ["email", "password"],
                  },
                },
              },
            },
          },
        }
      )
      .use(authMiddleware)
      .get("/me", async ({ user }) => user)
  );
