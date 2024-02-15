import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { User } from 'src/user/entities/user.entity';
import { DataLoaderService } from './dataLoader.service';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [DataLoaderService],
  exports: [DataLoaderService],
})
export class DataLoaderModule {}
