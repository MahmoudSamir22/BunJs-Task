import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import User from "../models/userModel";

const authMiddleware = (app: Elysia) =>
  app
    .use(
      jwt({
        name: "jwt",
        secret: process.env.JWT_SECRET!,
      })
    )
    .derive(async ({ headers, jwt, set }) => {
      let token = headers.authorization?.replace("Bearer ", "");
      if (!token) {
        set.status = 400;
        throw new Error("No token provided");
      }
      const decoded = await jwt.verify(token);
      if (!decoded) {
        set.status = 400;
        throw new Error("Invalid token");
      }
      const user = await User.findById((decoded as any).id);
      if (!user) {
        set.status = 404;
        throw new Error("User not found");
      }
      const userData = {
        userId: user._id,
        role: user.role,
      };
      return { user: userData };
    });

export default authMiddleware;
