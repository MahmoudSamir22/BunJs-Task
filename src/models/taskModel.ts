import { Schema, model } from "mongoose";
import type { TaskType } from "../types/taskType";

const taskSchema = new Schema<TaskType>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  isFinished: {
    type: Boolean,
    default: false,
  },
  due_date: {
    type: Date,
  },
});

const Task = model("Task", taskSchema);
export default Task;
