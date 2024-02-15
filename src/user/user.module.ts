import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';

import { FollowModule } from 'src/follow/follow.module';
import { PostModule } from 'src/post/post.module';
import { DataLoaderModule } from 'src/dataloader/dataLoader.module';
@Module({
  imports: [SequelizeModule.forFeature([User]), FollowModule, PostModule ,DataLoaderModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
