import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as DataLoader from 'dataloader';
import { Op } from 'sequelize';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class DataLoaderService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  userLoader() {
    return new DataLoader(async (userIds: Array<number | string>) => {
      const users = await this.userModel.findAll({
        where: { id: { [Op.in]: userIds } },
      });
      const userObj: Record<string, any> = {};
      users.forEach((user) => {
        userObj[user.id] = user;
      });

      return userIds.map((userId: any) => userObj[userId]);
    });
  }
}
//testing github