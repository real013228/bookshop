import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { updateBookDto } from './dto/update-book.dto';
import { createBookDto } from './dto/create-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import Book from './book.entity';
import Genre from '../genre/genre.entity';
import Author from '../author/author.entity';

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

  getAllBooks() {
    return this.booksRepository.find();
  }

  async getBookByID(id: number) {
    const book = await this.booksRepository.findOne({ where: { id: id } });
    if (book) {
      return book;
    }
    throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
  }

  async updateBook(id: number, bookDto: updateBookDto) {
    const book = await this.booksRepository.findOne({
      where: { id },
      relations: ['genres'],
    });

    if (!book) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }

    book.title = bookDto.title || book.title;
    book.description = bookDto.description || book.description;
    book.price = bookDto.price !== null ? bookDto.price : book.price;

    if (bookDto.genres && bookDto.genres.length > 0) {
      const genres = await this.genreRepository.findBy({
        id: In(bookDto.genres),
      });

      if (genres.length !== bookDto.genres.length) {
        throw new HttpException(
          'Some genres not found',
          HttpStatus.BAD_REQUEST,
        );
      }

      book.genres = genres;
    }

    await this.booksRepository.save(book);
    return book;
  }

  async createBook(bookDto: createBookDto) {
    const author = await this.authorRepository.findOne({
      where: { id: bookDto.authorID },
    });
    if (!author) {
      throw new HttpException('Author not found', HttpStatus.BAD_REQUEST);
    }

    let genres: Genre[] = [];
    if (bookDto.genresID && bookDto.genresID.length > 0) {
      genres = await this.genreRepository.findBy({
        id: In(bookDto.genresID),
      });
      if (genres.length !== bookDto.genresID.length) {
        throw new HttpException(
          'One or more genres not found',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const newBook = new Book();
    newBook.title = bookDto.title;
    newBook.description = bookDto.description ?? '';
    newBook.author = author;
    newBook.price = bookDto.price;
    newBook.genres = genres;

    await this.booksRepository.save(newBook);
    return newBook;
  }

  async deleteBook(id: number) {
    const deleteResponse = await this.booksRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}
