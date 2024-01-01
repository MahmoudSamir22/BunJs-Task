import User from "../models/userModel";
import type { UserType, LoginType, SignUpType } from "../types/userType";
import ApiError from "../libs/apiError";

class AuthService {

  async signUp(data: SignUpType): Promise<UserType> {
    const existedUser = await this.findUserByEmail(data.email);
    if(existedUser) throw new Error("Email already exists");
    const user = new User(data);
    // Triger Mongoose middleware to hash password
    await user.save();
    return user;
  }

  async login(data: LoginType): Promise<UserType> {
    const user = await this.findUserByEmail(data.email);
    if (!user || !await Bun.password.verify(data.password, user.password)) {
      throw new ApiError("Invalid credentials", "Unauthorized");
    }
    return user
  }

  async findUserByEmail(email: string): Promise<UserType | null>{
    return await User.findOne({ email });
  }
}

const authService = new AuthService();
export default authService;