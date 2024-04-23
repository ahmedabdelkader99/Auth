import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FollowService } from './follow.service';
import { Follow } from './entities/follow.entity';
import { CreateFollowInput } from './dto/create-follow.input';
import { CurrentUser } from 'src/user/decorator/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/gql-auth.guards';
import { User } from 'src/user/entities/user.entity';
import { AuthGuard } from 'src/auth/guards/auth.guards';

@UseGuards(AuthGuard)
@Resolver(() => Follow)
export class FollowResolver {
  constructor(private readonly followService: FollowService) {}

  @Mutation(() => Follow)
  createFollow(
    @CurrentUser() user: User,
    @Args('createFollowInput') createFollowInput: CreateFollowInput,
  ) {
    console.log(user);
    return this.followService.createFollowRelation(user, createFollowInput);
  }
  @Query(() => [Follow], { name: 'follow' })
  findAllFollowers(@CurrentUser() user) {
    return this.followService.getUserFollowers(user);
  }
  @Query(() => [Follow], { name: 'follow' })
  findAllFollowing(@CurrentUser() user) {
    return this.followService.getUserFollowing(user);
  }
  @Query(() => [Follow], { name: 'follow' })
  followersCount(@CurrentUser() user) {
    return this.followService.getFollowersCount(user);
  }
  @Query(() => [Follow], { name: 'follow' })
  followingCount(@CurrentUser() user) {
    return this.followService.getFollowingCount(user);
  }
}
