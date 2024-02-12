import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
@Table
export class Follow extends Model {
  @Field()
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id: string;

  @Field()
  @ForeignKey(() => User)
  @Column({ type: DataType.UUIDV4 })
  followerId: string;

  @Field()
  @ForeignKey(() => User)
  @Column({ type: DataType.UUIDV4 })
  followeeId: string;
}
