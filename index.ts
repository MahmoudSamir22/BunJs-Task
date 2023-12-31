import {Elysia} from 'elysia';
import dbConnection from "./src/config/dbConnection"
import {taskController} from "./src/controllers/taskController"
const port = process.env.PORT || 3000;

//DB Connection
dbConnection();

const app = new Elysia();
app.use(taskController);
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})