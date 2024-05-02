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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { createBookDto } from './dto/create-book.dto';
import { updateBookDto } from './dto/update-book.dto';

import { bookDto } from './dto/book.dto';

@Controller('Book')
@ApiTags('Book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all books' })
  @ApiResponse({
    status: 200,
    description: 'List of all books',
    type: [bookDto],
  })
  getAllBooks() {
    return this.bookService.getAllBooks();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a book by ID' })
  @ApiResponse({ status: 200, description: 'Book details', type: bookDto })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the book to retrieve',
    type: 'number',
  })
  getBookByID(@Param('id') id: string) {
    return this.bookService.getBookByID(Number(id));
  }

  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiBody({ type: createBookDto, description: 'Data to create a new book' })
  @ApiResponse({
    status: 201,
    description: 'Book created successfully',
    type: bookDto,
  })
  async createBook(@Body() post: createBookDto) {
    return this.bookService.createBook(post);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing book' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the book to update',
    type: 'number',
  })
  @ApiBody({
    type: updateBookDto,
    description: 'Data to update an existing book',
  })
  @ApiResponse({
    status: 200,
    description: 'Book updated successfully',
    type: bookDto,
  })
  async updateBook(@Body() post: updateBookDto, @Param('id') id: string) {
    return this.bookService.updateBook(Number(id), post);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the book to delete',
    type: 'number',
  })
  @ApiResponse({ status: 204, description: 'Book deleted successfully' })
  async deleteBook(@Param('id') id: string) {
    return this.bookService.deleteBook(Number(id));
  }
}
