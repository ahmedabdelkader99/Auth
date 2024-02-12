import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, MinLength, IsEmail } from 'class-validator';
@InputType()
export class UserCreateDto {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  password: string;
}
