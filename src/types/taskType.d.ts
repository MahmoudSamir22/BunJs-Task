export type TaskType = {
  title: string;
  description?: string;
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
  },
  required: ["title"],
};
