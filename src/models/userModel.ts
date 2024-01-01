import { Schema, model } from "mongoose";
import type { UserType } from "../types/userType";

const userSchema = new Schema<UserType>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await Bun.password.hash(this.password);
    }
    next();
})

const User = model("User", userSchema);
export default User;
