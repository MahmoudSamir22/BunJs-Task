export type TaskType = {
  title: string;
  description?: string;
  isFinished?: boolean;
  due_date?: Date;
};

export const TaskSchema = {
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
};
