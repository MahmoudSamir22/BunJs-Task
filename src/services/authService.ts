import User from "../models/userModel";
import type { UserType, UserProfile } from "../types/userType";
import type { LoginType, SignUpType } from "../types/authType";
import ApiError from "../libs/apiError";

class AuthService {

  async signUp(data: SignUpType): Promise<UserProfile> {
    const existedUser = await this.findUserByEmail(data.email);
    if(existedUser) throw new Error("Email already exists");
    const user = new User(data);
    // Triger Mongoose middleware to hash password
    await user.save();
    const {password, ...rest} = user;
    return rest;
  }

  async login(data: LoginType): Promise<UserProfile> {
    const user = await this.findUserByEmail(data.email);
    if (!user || !await Bun.password.verify(data.password, user.password)) {
      throw new ApiError("Invalid credentials", "Unauthorized");
    }
    const {password, ...rest} = user;
    return rest
  }

  async findUserByEmail(email: string): Promise<UserType | null>{
    return await User.findOne({ email });
  }
}

const authService = new AuthService();
export default authService;