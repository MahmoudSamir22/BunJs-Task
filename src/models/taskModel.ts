import { Schema, model } from "mongoose";
import type { TaskType } from "../types/taskType";

const taskSchema = new Schema<TaskType>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String
  }
});

const Task = model("Task", taskSchema);
export default Task;
