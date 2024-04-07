import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { AuthorService } from './author.service';
import { ApiTags } from '@nestjs/swagger';
import { createAuthorDto } from './dto/create-author.dto';
import { updateAuthorDto } from './dto/update-author.dto';

@Controller()
@ApiTags('Author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}
  @Get('/author/hello')
  getHello() {
    return this.authorService.getHello();
  }
  @Get('/author')
  getAllAuthors() {
    return this.authorService.getAllAuthors();
  }
  @Get('/author/:id')
  getAuthorByID(@Param('id') id: string) {
    return this.authorService.getAuthorByID(Number(id));
  }
  @Post('/author')
  async createAuthor(@Body() post: createAuthorDto) {
    return this.authorService.createAuthor(post);
  }

  @Put('/author/:id')
  async updateAuthor(@Body() post: updateAuthorDto, @Param('id') id: string) {
    return this.authorService.updateAuthor(Number(id), post);
  }

  @Delete('/author/:id')
  async deleteAuthor(@Param('id') id: string) {
    this.authorService.deleteAuthor(Number(id));
  }
}
