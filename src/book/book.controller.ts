import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import { BookService } from './book.service';
import { ApiTags } from '@nestjs/swagger';
import { createBookDto } from './dto/create-book.dto';
import { updateBookDto } from './dto/update-book.dto';

@Controller()
@ApiTags('Book')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @Get('/book/hello')
  getHello() {
    return this.bookService.getHello();
  }
  @Get('/book')
  getAllBooks() {
    return this.bookService.getAllBooks();
  }
  @Get('/book/:id')
  getBookByID(@Param('id') id: string) {
    return this.bookService.getBookByID(Number(id));
  }
  @Post('/book')
  async createBook(@Body() post: createBookDto) {
    return this.bookService.createBook(post);
  }

  @Put('/book/:id')
  async updateBook(@Body() post: updateBookDto, @Param('id') id: string) {
    return this.bookService.updateBook(Number(id), post);
  }

  @Delete('/book/:id')
  async deleteBook(@Param('id') id: string) {
    this.bookService.deleteBook(Number(id));
  }
}
