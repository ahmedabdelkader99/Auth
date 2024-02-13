import { ObjectType, Field } from '@nestjs/graphql';
import {
  Model,
  Column,
  Table,
  Unique,
  PrimaryKey,
  Default,
  DataType,
  Validate,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { Follow } from 'src/follow/entities/follow.entity';
import { Posts } from 'src/post/entities/post.entity';
import { paginate } from 'src/utils/pagination/pagination.service';

@ObjectType()
@Table
export class User extends Model<User> {
  @Field()
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id: string;

  @Validate({ isEmail: true })
  @Unique
  @Column(DataType.STRING)
  @Field()
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Field()
  otp: string;
  @Field()
  otpExpiresAt: Date;
  // users bieng followed by others
  @BelongsToMany(() => User, () => Follow, 'followeeId', 'followerId')
  @Field(() => [User], { nullable: true })
  followers: User[];
  // users following others
  @BelongsToMany(() => User, () => Follow, 'followerId', 'followeeId')
  @Field(() => [User], { nullable: true })
  follwing: User[];

  @HasMany(() => Posts)
  @Field(() => [Posts], { nullable: true })
  post: Posts[];

  static async paginate(page: number, limit: number) {
    return paginate<User>(this, page, limit);
  }
}
