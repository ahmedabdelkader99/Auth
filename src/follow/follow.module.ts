import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowResolver } from './follow.resolver';
import { Follow } from './entities/follow.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Follow])],
  providers: [FollowResolver, FollowService],
})
export class FollowModule {}
