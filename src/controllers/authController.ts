import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import response from "../libs/response";
import authServices from "../services/authService";
import { authModel } from "../validations/authValidation";
import type { UserType, UserProfile } from "../types/userType";
import type { LoginType } from "../types/authType";
import type { CommonResponseType } from "../types/response.d.ts";

export const authController = (app: Elysia) =>
  app.group("/auth", (router) =>
    router
      .use(authModel)
      .post(
        "/signup",
        async ({ body, set }): Promise<CommonResponseType<UserProfile>> => {
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
          },
          body: 'signup'
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
        async ({body, set, jwt,}): Promise<CommonResponseType<{ token: string; user: UserProfile }>> => {
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
          },
          body: 'signin'
        }
      )
  );
