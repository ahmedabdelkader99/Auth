import { Injectable } from '@nestjs/common';
import { Posts } from './entities/post.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostInput } from './entities/createPostInput';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Posts)
    private postModel: typeof Posts,
  ) {}
  create(createPostInput: CreatePostInput, user) {
    console.log(user.id);

    const post = this.postModel.create({
      content: createPostInput.content,
      userId: user.id,
    });

    return post;
  }

  async getAllPosts() {
    return await this.postModel.findAll();
  }
}
