import { Injectable } from '@nestjs/common';
import { UpdatePostInput } from './dto/update-post.input';
import { CreatePostInput } from './dto/create-post.input';
import { User } from 'src/user/entities/user.entity';
import { Posts } from './entities/post.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Posts)
    private postModel: typeof Posts,
  ) {}
  create(createPostInput: CreatePostInput, user: User) {
    const post = this.postModel.create({
      content: createPostInput.content,
      userId: user.id,
    });

    return post;
  }
}
