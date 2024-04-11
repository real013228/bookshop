import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { updateAuthorDto } from './dto/update-author.dto';
import { createAuthorDto } from './dto/create-author.dto';
import AuthorEntity from './author.entity';

@Injectable()
export class AuthorService {
  getHello(): string {
    return 'Hello World!';
  }
  private lastAuthorID = 0;
  private authors: AuthorEntity[] = [];

  getAllAuthors() {
    return this.authors;
  }

  getAuthorByID(id: number) {
    const author = this.authors.find((author) => author.id === id);
    if (author) {
      return author;
    }
    throw new HttpException('Author not found', HttpStatus.NOT_FOUND);
  }

  updateAuthor(id: number, author: updateAuthorDto) {
    console.log('replace author', id, author.firstName);
    throw new HttpException('Author not found', HttpStatus.NOT_FOUND);
  }

  createAuthor(author: createAuthorDto) {
    const newAuthor = {
      id: this.lastAuthorID,
      firstName: author.firstName,
      secondName: author.secondName,
    };
    this.lastAuthorID++;
    this.authors.push(newAuthor);
    return newAuthor;
  }

  deleteAuthor(id: number) {
    const authorIndex = this.authors.findIndex((author) => author.id === id);
    if (authorIndex > -1) {
      this.authors.splice(authorIndex, 1);
    } else {
      throw new HttpException('Author not found', HttpStatus.NOT_FOUND);
    }
  }
}
