import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import type { Payload } from "../types/jwt";
import User from "../models/userModel";

const authMiddleware = (app: Elysia) =>
  app
    .use(
      jwt({
        name: "jwt",
        secret: process.env.JWT_SECRET!,
      })
    )
    .derive(async ({ headers, jwt }) => {
      let token = headers.authorization?.replace("Bearer ", "");
      if (!token) throw new Error("Token not privided");
      const decoded = await jwt.verify(token);
      if (!decoded) throw new Error("Invalid token");
      const user = await User.findById((decoded as any).id);
      return { user };
    });

export default authMiddleware;
