import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/gql-auth.guards';
import { Posts } from './entities/post.entity';
import { CurrentUser } from 'src/user/decorator/current-user.decorator';
import { CreatePostInput } from './entities/createPostInput';
import { User } from 'src/user/entities/user.entity';
import { AuthGuard } from 'src/auth/guards/auth.guards';

@Resolver()
export class PostResolver {
  constructor(private readonly postService: PostService) {}
  @UseGuards(AuthGuard)
  @Mutation(() => Posts)
  createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @CurrentUser() user: User,
  ) {
    return this.postService.create(createPostInput, user);
  }
}
