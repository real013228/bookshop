import { Controller, Get } from '@nestjs/common';
import { BookService } from './book.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Book')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @Get('/book/hello')
  getHello() {
    return this.bookService.getHello();
  }
}
