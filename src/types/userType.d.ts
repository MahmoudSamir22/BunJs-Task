import type { Document, ObjectId } from "mongoose";

export interface UserType extends Document {
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