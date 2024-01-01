import type { ObjectId } from "mongoose";

export type UserType = {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  role: string;
};

export type UserProfile = {
  _id: ObjectId;
  name: string;
  email: string;
  role: string;
}