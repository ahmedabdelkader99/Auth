import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import './utils/env';
import { Follow } from './follow/entities/follow.entity';
import { PostModule } from './post/post.module';
import { Posts } from './post/entities/post.entity';
import { DataLoaderService } from './dataloader/dataLoader.service';
import { DataLoaderModule } from './dataloader/dataLoader.module';

@Module({
  imports: [
    ConfigModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [DataLoaderModule],
      useFactory: (dataLoaderService: DataLoaderService) => ({
        autoSchemaFile: true,
        context: () => ({
          loaders: {
            userLoader: dataLoaderService.userLoader(),
          },
        }),
      }),
      inject: [DataLoaderService],
    }),
    SequelizeModule.forRootAsync({
      async useFactory(config: ConfigService) {
        return {
          dialect: 'postgres',
          host: 'localhost',
          port: 4000,
          username: 'postgres',
          password: '0000',
          database: 'Authdb',
          models: [User, Follow, Posts],
          autoLoadModels: true,
        };
      },
    }),

    AuthModule,
    UserModule,
    PostModule,
    // LikesModule,
  ],
  providers: [],
})
export class AppModule {}
