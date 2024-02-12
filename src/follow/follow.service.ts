import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from 'src/user/entities/user.entity';
import { Follow } from './entities/follow.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateFollowInput } from './dto/create-follow.input';

@Injectable()
export class FollowService {
  constructor(@InjectModel(Follow) private followModel: typeof Follow) {}
  async createFollowRelation(context, creatFollowInput: CreateFollowInput) {
    const { followeeId } = creatFollowInput;
    const followee = await this.followModel.findOne({
      where: { id: followeeId },
    });
    if (!followee) {
      throw new NotFoundException('User not found');
    }
    return this.followModel.create({
      followeeId: followeeId,
      followerId: context.req.user.id,
    });
  }
  //followers
  async getUserFollowers(user: User): Promise<Follow[]> {
    return this.followModel.findAll({
      where: { id: user.id },
      include: [{ model: User, as: 'followers' }],
    });
  }
  async getFollowersCount(user: User): Promise<number> {
    const followersCount = await this.followModel.count({
      where: { followeeId: user.id },
    });
    return followersCount;
  }
  //following
  async getUserFollowing(user: User): Promise<Follow[]> {
    return this.followModel.findAll({
      where: { id: user.id },
      include: [{ model: User, as: 'follwing' }],
    });
  }
  async getFollowingCount(user: User): Promise<number> {
    const followingCount = await this.followModel.count({
      where: { followerId: user.id },
    });
    return followingCount;
  }
}
