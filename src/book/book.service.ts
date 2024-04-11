import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { updateBookDto } from './dto/update-book.dto';
import { createBookDto } from './dto/create-book.dto';
import BookEntity from './book.entity';

@Injectable()
export class BookService {
  getHello(): string {
    return 'Hello World!';
  }
  private lastBookID = 0;
  private books: BookEntity[] = [];

  getAllBooks() {
    return this.books;
  }

  getBookByID(id: number) {
    const book = this.books.find((book) => book.id === id);
    if (book) {
      return book;
    }
    throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
  }

  updateBook(id: number, book: updateBookDto) {
    console.log('replace book', id, book.author);
    throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
  }

  createBook(book: createBookDto) {
    const newBook = {
      id: this.lastBookID,
      title: book.title,
      description: book.description,
      author: book.author,
      price: book.price,
      genres: book.genres,
    };
    this.lastBookID++;
    this.books.push(newBook);
    return newBook;
  }

  deleteBook(id: number) {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex > -1) {
      this.books.splice(bookIndex, 1);
    } else {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }
  }
}
