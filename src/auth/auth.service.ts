import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserCreateDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { JwtPayLoad } from 'src/user/jwt/jwt-payload.interface';
import { MailService } from 'src/mail/mail.service';
const jwt = require('jsonwebtoken');
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private mailService: MailService,
  ) {}
  async register(user: UserCreateDto) {
    const { email, password } = user;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const existUser = await User.findOne({ where: { email: email } });
    if (existUser) {
      throw new UnauthorizedException();
    }
    user.password = hashedPassword;
    await this.userService.createUser(user);
    return { token: await this.generateToken(email) };
  }

  // Login
  async login(user: UserCreateDto) {
    const { email, password } = user;
    const authuser = await this.userService.getUserByEmail(email);
    if (!authuser) {
      const error = new Error('User Not Found');
      throw error;
    }
    const equal = await bcrypt.compare(password, authuser.password);
    if (!equal) {
      const error = new Error('Incorrect Password');
    }
    return { token: this.generateToken(email) };
  }
  async generateToken(email: string): Promise<string> {
    const payload: JwtPayLoad = { email };
    const accessToken: string = await jwt.sign(payload, process.env.JWT_SECRET);
    return accessToken;
  }
}
