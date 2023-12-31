import User from "../models/userModel";
import type { UserType, LoginType } from "../types/userType";
// import {signToken} from "../libs/jwt";

class AuthService {
  async signUp(data: UserType) {
    const user = new User(data);
    // Triger Mongoose middleware to hash password
    await user.save();
    return user;
  }
  async login(data: LoginType) {
    const user = await User.findOne({ email: data.email });
    if (!user || !await Bun.password.verify(data.password, user.password)) {
      throw new Error("Invalid credentials");
    }
    return user
  }
}

const authService = new AuthService();
export default authService;