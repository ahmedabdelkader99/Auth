import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { CurrentUser } from './decorator/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { UserResponsesType } from 'src/utils/types/pagination.type';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { DataLoaderService } from 'src/dataloader/dataLoader.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly dataLoaderService: DataLoaderService,
  ) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.createUser(createUserInput);
  }

  @Query(() => UserResponsesType)
  @UseGuards(AuthGuard)
  getAllUsers(
    @CurrentUser() user,
    @Args({ name: 'limit', type: () => Int }) limit: number,
    @Args({ name: 'page', type: () => Int }) page: number,
  ) {
    return this.userService.getUsers(page, limit);
  }
  
}

// @Mutation(() => User)
// updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
//   return this.userService.update(updateUserInput.id, updateUserInput);
// }

// @Mutation(() => User)
// removeUser(@Args('id', { type: () => Int }) id: number) {
//   return this.userService.remove(id);
// }
//@Mutation(() => { success: Boolean, message: String })
// async resetPassword(
//   @Args('email') email: string,
//   @Args('otp') otp: string,
//   @Args('newPassword') newPassword: string
// ) {
//   try {newPassword
//     await this.userService.resetPassword(email, otp, newPassword);
//     return { success: true, message: 'Password reset successfully' };
//   } catch (error) {
//     return { success: false, message: error.message };
//   }
// }
