import { Field, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { User } from 'src/user/entities/user.entity';

@ObjectType()
@Table
export class Posts extends Model<Posts> {
  @Field()
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Field()
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @BelongsTo(() => User)
  @Exclude({ toPlainOnly: true })
  @Field(() => User)
  user: number;
}
