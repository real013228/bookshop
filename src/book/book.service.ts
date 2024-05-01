import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { updateBookDto } from './dto/update-book.dto';
import { createBookDto } from './dto/create-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import Book from './book.entity';
import Genre from '../genre/genre.entity';
import Author from '../author/author.entity';
import { plainToClass } from 'class-transformer';
import { bookDto } from './dto/book.dto';

@Injectable()
export class BookService {
  getHello(): string {
    return 'Hello World!';
  }
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  async getAllBooks() {
    const books = await this.booksRepository.find();
    return books.map((book) => plainToClass(bookDto, book));
  }

  async getBookByID(id: number) {
    const book = await this.booksRepository.findOne({ where: { id: id } });
    if (book) {
      return plainToClass(bookDto, book);
    }
    throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
  }

  async updateBook(id: number, bookDTO: updateBookDto) {
    const book = await this.booksRepository.findOne({
      where: { id },
      relations: ['genres'],
    });

    if (!book) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }

    book.title = bookDTO.title || book.title;
    book.description = bookDTO.description || book.description;
    book.price = bookDTO.price !== null ? bookDTO.price : book.price;

    if (bookDTO.genres && bookDTO.genres.length > 0) {
      const genres = await this.genreRepository.findBy({
        id: In(bookDTO.genres),
      });

      if (genres.length !== bookDTO.genres.length) {
        throw new HttpException(
          'Some genres not found',
          HttpStatus.BAD_REQUEST,
        );
      }

      book.genres = genres;
    }

    await this.booksRepository.save(book);
    return plainToClass(bookDto, book);
  }

  async createBook(bookDTO: createBookDto) {
    const author = await this.authorRepository.findOne({
      where: { id: bookDTO.authorId },
    });
    if (!author) {
      throw new HttpException('Author not found', HttpStatus.BAD_REQUEST);
    }

    let genres: Genre[] = [];
    if (bookDTO.genres && bookDTO.genres.length > 0) {
      genres = await this.genreRepository.findBy({
        id: In(bookDTO.genres),
      });
      if (genres.length !== bookDTO.genres.length) {
        throw new HttpException(
          'One or more genres not found',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const newBook = new Book();
    newBook.title = bookDTO.title;
    newBook.description = bookDTO.description ?? '';
    newBook.author = author;
    newBook.price = bookDTO.price;
    newBook.genres = genres;

    await this.booksRepository.save(newBook);
    return plainToClass(bookDto, newBook);
  }

  async deleteBook(id: number) {
    const deleteResponse = await this.booksRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}
