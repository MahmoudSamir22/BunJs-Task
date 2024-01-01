import { Elysia } from "elysia";
import dbConnection from "./src/config/dbConnection";
import { taskController } from "./src/controllers/taskController";
import { authController } from "./src/controllers/authController";
import { swagger } from "@elysiajs/swagger";
import { helmet } from "elysia-helmet";
import { cors } from "@elysiajs/cors";

const port = process.env.PORT || 3000;

//DB Connection
dbConnection();

const app = new Elysia();

app
  .use(
    swagger({
      documentation: {
        servers: [
          {
            url: `http://localhost:${port}`,
            description: "Local server",
          },
        ],
        info: {
          title: "Bun Js Task Documentation",
          version: "1.0.0",
        },
        tags: [
          { name: "Auth", description: "Authentication" },
          {
            name: "Tasks",
            description: "Task management",
          },
        ],
      },
    })
  )
  .use(cors())
  .use(helmet())
  .use(authController)
  .use(taskController)
  .onError(({ error, code, set }) => {
    return {
      status: false,
      message: error.message,
    };
  })
  .listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
