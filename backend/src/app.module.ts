import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from './jwt/jwt.module';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import * as Joi from 'joi';
import { User } from './user/entities/user.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('dev', 'prod', 'test')
          .required(),
        DB_HOST: Joi.string()
          .valid()
          .required(),
        DB_PORT: Joi.string()
          .valid()
          .required(),
        DB_USERNAME: Joi.string()
          .valid()
          .required(),
        DB_PASSWORD: Joi.string()
          .valid()
          .required(),
        DB_NAME: Joi.string()
          .valid()
          .required(),
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      logging:
        process.env.NODE_ENV !== 'prod' && process.env.NODE_ENV !== 'test',
      entities: [User],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      context: ({ req, connection }) => {
        const TOKEN_KEY = 'x-jwt';
        if (req) {
          return { token: req.headers[TOKEN_KEY] };
        } else if (connection) {
          return { token: connection.context[TOKEN_KEY] };
        }
      },
    }),
    AuthModule,
    JwtModule,
    CommonModule,
    UserModule,
    JwtModule.forRoot({
      accessTokenPrivateKey: process.env.JWT_ACCESS_TOKEN_SECRET,
      accessTokenExpire: +process.env.JWT_ACCESS_TOKEN_EXPIRE,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
