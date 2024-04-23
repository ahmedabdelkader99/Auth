import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PostService } from './post.service';
import { UseGuards } from '@nestjs/common';
import { Posts } from './entities/post.entity';
import { CurrentUser } from 'src/user/decorator/current-user.decorator';
import { CreatePostInput } from './entities/createPostInput';
import { User } from 'src/user/entities/user.entity';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { IDataLoader } from 'src/dataloader/dataLoader.interface';

@Resolver(() => Posts)
export class PostResolver {
  constructor(private readonly postService: PostService) {}
  @UseGuards(AuthGuard)
  @Mutation(() => Posts)
  createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @CurrentUser() user: User,
  ) {
    console.log(user);
    return this.postService.create(createPostInput, user);
  }

  @ResolveField('user')
  user(@Parent() post: Posts, @Context('loaders') loaders: IDataLoader) {
    return loaders.userLoader.load(post.userId);
  }

  @Query(() => [Posts])
  async allPosts() {
    return await this.postService.getAllPosts();
  }
}
