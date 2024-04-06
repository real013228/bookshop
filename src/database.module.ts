import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import UserEntity from './entities/user.entity';
import GenreEntity from './entities/genre.entity';
import AuthorEntity from './entities/author.entity';
import BookEntity from './entities/book.entity';
import OrderEntity from './entities/order.entity';

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
