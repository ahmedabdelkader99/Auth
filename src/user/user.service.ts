import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import otpGenerator from 'otp-generator';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const { email, password } = createUserInput;
    const createdUser = this.userModel.create({ email, password });
    if (!createdUser) {
      const error = new Error('Invalid Inputs');
      throw error;
    }
    return;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = this.userModel.findOne({ where: { email: email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getUsers(page: number, limit: number) {
    return await User.paginate(page, limit);
  }










  

  //otp
  async generateOTP(email: string): Promise<string> {
    const user = await this.userModel.findOne({ where: { email: email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // Generate a unique one-time password (OTP)
    const otp = otpGenerator.generate(6, {
      specialChars: false,
    });
    // Save the OTP to the user record in the database
    user.otp = otp;
    // Set the expiration time for the OTP (e.g., 10 minutes)
    user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await user.save();
    return otp;
  }

  async verifyOTP(email: string, otp: string): Promise<boolean> {
    const user = await this.userModel.findOne({ where: { email: email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // Check if the OTP matches and is not expired
    const isValidOTP = user.otp === otp && user.otpExpiresAt > new Date();
    return isValidOTP;
  }

  async resetPassword(email: string, newPassword: string): Promise<void> {
    const user = await this.userModel.findOne({ where: { email: email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Update the user's password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    // Clear the OTP and expiration time after password is reset
    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();
  }
}
