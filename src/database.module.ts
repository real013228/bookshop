import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import UserEntity from './user/user.entity';
import GenreEntity from './genre/genre.entity';
import AuthorEntity from './author/author.entity';
import BookEntity from './book/book.entity';
import OrderEntity from './order/order.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const connectionString = configService.get('DATABASE_URL');
        const parse = require('pg-connection-string').parse;
        const config = parse(connectionString);
        return {
          type: 'postgres',
          host: config['host'],
          port: config['port'],
          username: config['user'],
          password: config['password'],
          database: config['database'],
          entities: [
            UserEntity,
            AuthorEntity,
            BookEntity,
            OrderEntity,
            GenreEntity,
          ],
          synchronize: true,
          ssl: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
