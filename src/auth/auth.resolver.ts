import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { UserToken } from './user-token';
import { UserCreateDto } from 'src/user/dto/create-user.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserToken)
  @UsePipes(new ValidationPipe())
  register(@Args('user') user: UserCreateDto) {
    return this.authService.register(user);
  }

  @Mutation(() => UserToken)
  @UsePipes(new ValidationPipe())
  login(@Args('user') user: UserCreateDto) {
    return this.authService.login(user);
  }
}
