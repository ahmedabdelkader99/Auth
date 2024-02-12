import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FollowService } from './follow.service';
import { Follow } from './entities/follow.entity';
import { CreateFollowInput } from './dto/create-follow.input';
import { CurrentUser } from 'src/user/decorator/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/gql-auth.guards';

@Resolver(() => Follow)
export class FollowResolver {
  constructor(private readonly followService: FollowService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Follow)
  createFollow(
    @CurrentUser() user,
    @Args('createFollowInput') createFollowInput: CreateFollowInput,
  ) {
    console.log(user);
    return this.followService.createFollowRelation(user, createFollowInput);
  }
  @UseGuards(JwtAuthGuard)
  @Query(() => [Follow], { name: 'follow' })
  findAllFollowers(@CurrentUser() user) {
    return this.followService.getUserFollowers(user);
  }
  @UseGuards(JwtAuthGuard)
  @Query(() => [Follow], { name: 'follow' })
  findAllFollowing(@CurrentUser() user) {
    return this.followService.getUserFollowing(user);
  }
  @UseGuards(JwtAuthGuard)
  @Query(() => [Follow], { name: 'follow' })
  followersCount(@CurrentUser() user) {
    return this.followService.getFollowersCount(user);
  }
  @UseGuards(JwtAuthGuard)
  @Query(() => [Follow], { name: 'follow' })
  followingCount(@CurrentUser() user) {
    return this.followService.getFollowingCount(user);
  }
}
