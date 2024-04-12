import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { createAuthorDto } from './dto/create-author.dto';
import { updateAuthorDto } from './dto/update-author.dto';
import Author from './author.entity';

@ApiTags('Author')
@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get('hello')
  @ApiOperation({ summary: 'Get hello message from Author Service' })
  @ApiResponse({ status: 200, description: 'Hello message received' })
  getHello() {
    return this.authorService.getHello();
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all authors' })
  @ApiResponse({
    status: 200,
    description: 'List of all authors',
    type: [Author],
  })
  getAllAuthors() {
    return this.authorService.getAllAuthors();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve an author by ID' })
  @ApiResponse({
    status: 200,
    description: 'Author details',
    type: Author,
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the author to retrieve',
    type: 'number',
  })
  getAuthorByID(@Param('id') id: string) {
    return this.authorService.getAuthorByID(Number(id));
  }

  @Post()
  @ApiOperation({ summary: 'Create a new author' })
  @ApiBody({
    type: createAuthorDto,
    description: 'Data for creating a new author',
  })
  @ApiResponse({
    status: 201,
    description: 'Author created successfully',
    type: Author,
  })
  async createAuthor(@Body() post: createAuthorDto) {
    return this.authorService.createAuthor(post);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing author' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the author to update',
    type: 'number',
  })
  @ApiBody({
    type: updateAuthorDto,
    description: 'Data for updating an existing author',
  })
  @ApiResponse({
    status: 200,
    description: 'Author updated successfully',
    type: Author,
  })
  async updateAuthor(@Body() post: updateAuthorDto, @Param('id') id: string) {
    return this.authorService.updateAuthor(Number(id), post);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an author' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the author to delete',
    type: 'number',
  })
  @ApiResponse({
    status: 204,
    description: 'Author deleted successfully',
  })
  async deleteAuthor(@Param('id') id: string) {
    return this.authorService.deleteAuthor(Number(id));
  }
}
