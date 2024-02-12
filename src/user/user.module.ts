import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';
import { FollowModule } from 'src/follow/follow.module';
import { PostModule } from 'src/post/post.module';
@Module({
  imports: [SequelizeModule.forFeature([User]), FollowModule, PostModule],
  providers: [UserResolver, UserService, MailService],
  exports: [UserService],
})
export class UserModule {}
