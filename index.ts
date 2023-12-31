import { Elysia } from "elysia";
import dbConnection from "./src/config/dbConnection";
import { taskController } from "./src/controllers/taskController";
import { authController } from "./src/controllers/authController";
import { swagger } from "@elysiajs/swagger";
const port = process.env.PORT || 3000;

//DB Connection
dbConnection();

const app = new Elysia();
app
  .use(
    swagger({
      documentation: {
        info: {
          title: "Bun Js Task Documentation",
          version: "1.0.0",
        },
        tags: [
          {
            name: "Tasks",
            description: "Task management",
          },
          { name: "Auth", description: "Authentication" },
          { name: "Users", description: "User management" },
        ],
      },
    })
  )
  .use(taskController)
  .use(authController);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
