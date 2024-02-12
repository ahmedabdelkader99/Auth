import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class PageInfoType {
  @Field()
  hasNext: boolean;
  @Field()
  hasBefore: boolean;
  @Field()
  page: number;
  @Field()
  limit: number;
  @Field()
  totalCount: number;
}

@ObjectType()
export class UserResponsesType {
  @Field(() => [User])
  items?: [User];
  @Field()
  pageInfo: PageInfoType;
}
