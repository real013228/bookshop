import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Book from './book.entity';
import Genre from '../genre/genre.entity';
import Author from '../author/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Genre, Author])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
