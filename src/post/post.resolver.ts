import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Posts } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/gql-auth.guards';
import { CurrentUser } from 'src/user/decorator/current-user.decorator';

@Resolver(() => Posts)
export class PostResolver {
  constructor(private readonly postService: PostService) {}
  @UseGuards(JwtAuthGuard)
  @Mutation(() => Posts)
  createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @CurrentUser() user,
  ) {
    return this.postService.create(createPostInput, user);
  }

  // @Query(() => [Post], { name: 'post' })
  // findAll() {
  //   return this.postService.findAll();
  // }

  // @Query(() => Post, { name: 'post' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.postService.findOne(id);
  // }

  // @Mutation(() => Post)
  // updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
  //   return this.postService.update(updatePostInput.id, updatePostInput);
  // }

  // @Mutation(() => Post)
  // removePost(@Args('id', { type: () => Int }) id: number) {
  //   return this.postService.remove(id);
  // }
}
