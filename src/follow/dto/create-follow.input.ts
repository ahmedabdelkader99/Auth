import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { DataType, Default } from 'sequelize-typescript';

@InputType()
export class CreateFollowInput {
  @Field()
  @IsNotEmpty()
  @IsUUID("4", { message: 'followeeId must be a valid UUID' })
  followeeId: string;
}
