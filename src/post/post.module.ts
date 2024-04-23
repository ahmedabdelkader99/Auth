import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { Posts } from './entities/post.entity';

@Module({
  imports: [SequelizeModule.forFeature([Posts])],
  providers: [PostResolver, PostService],
  exports: [PostService],
})
export class PostModule {}
