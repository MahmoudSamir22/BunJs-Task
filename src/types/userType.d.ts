import type { ObjectId } from "mongoose";

export type UserType = {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role: string;
};

export type SignUpType = {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role: string;
};

export type LoginType = {
  email: string;
  password: string;
};
